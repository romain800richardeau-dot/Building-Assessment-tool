"""
Régénère un fichier ROUTES_<dept>.js à partir d'un GTFS officiel,
avec décimation adaptative (préserve les courbes de tram/métro,
agrège plus agressivement les bus pour limiter la taille du fichier).

Usage :
    python regen_routes.py <gtfs.zip> <dept_code> [output_dir]

Exemple :
    python regen_routes.py tcl.zip 69 ../../data/bus

Le fichier produit `ROUTES_<dept>.js` est compatible avec le loader
existant dans data/SITE_ANALYSIS.js (variable globale SA_ROUTES_<dept>).

Sources de GTFS :
    - TCL Sytral (Lyon, dépt 69)  : https://transport.data.gouv.fr/datasets/horaires-theoriques-et-temps-reel-du-reseau-tcl
    - RATP (Paris, dépt 75/...)  : https://transport.data.gouv.fr/datasets/horaires-prevus-sur-les-lignes-de-transport-en-commun-d-ile-de-france
    - Tisséo (Toulouse, dépt 31) : https://transport.data.gouv.fr/datasets/horaires-theoriques-et-temps-reel-du-reseau-tisseo
    - Tous les feeds : https://transport.data.gouv.fr/datasets?type=public-transit

Format de sortie :
    var SA_ROUTES_<dept> = [
        [route_short_name, route_long_name, color_hex, route_type, [[lat,lon],...]],
        ...
    ];
    route_type : 0=tram 1=metro 2=train 3=bus 4=ferry 5=cablecar 6=gondola 7=funicular

Aucune dépendance externe (stdlib uniquement).
"""

import csv
import json
import math
import os
import sys
import zipfile
from collections import defaultdict
from io import StringIO


# ── Tolérance de simplification Ramer-Douglas-Peucker (en mètres) ──
# Plus la valeur est basse, plus le tracé conserve de points (= courbes fines).
# On vise : tram/métro fidèle au tracé des rails, bus assez détaillé pour
# rester lisible mais sans gonfler le fichier.
TOLERANCE_M = {
    0: 4,    # tram        — préserve les virages dans les rues
    1: 4,    # métro       — souterrain mais souvent courbe
    2: 12,   # train       — voies longues, courbes amples
    3: 25,   # bus         — agrégation modérée
    4: 60,   # ferry       — long, peu de virages
    5: 5,    # téléphérique
    6: 5,    # gondole
    7: 3,    # funiculaire — court et précis
}

# Conversion du route_type étendu (Google extended) vers le type de base GTFS
def normalize_route_type(rtype):
    if 100 <= rtype < 200:  return 2  # rail
    if 200 <= rtype < 300:  return 3  # coach (= bus)
    if 400 <= rtype < 500:  return 1  # urban rail / metro
    if 700 <= rtype < 800:  return 3  # bus
    if 900 <= rtype < 1000: return 0  # tram
    if 1300 <= rtype < 1400: return 6  # gondola
    if 1400 <= rtype < 1500: return 7  # funicular
    return rtype


# ── Géométrie ──
EARTH_R = 6371000.0

def point_to_segment_dist_m(p, a, b):
    """Distance perpendiculaire (m) du point p au segment a-b, projection equirect."""
    lat0 = (a[0] + b[0]) * 0.5
    cos_lat = math.cos(math.radians(lat0))
    def to_xy(pt):
        return (math.radians(pt[1]) * EARTH_R * cos_lat,
                math.radians(pt[0]) * EARTH_R)
    px, py = to_xy(p)
    ax, ay = to_xy(a)
    bx, by = to_xy(b)
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx*dx + dy*dy)))
    proj_x = ax + t * dx
    proj_y = ay + t * dy
    return math.hypot(px - proj_x, py - proj_y)


def rdp(points, tol_m):
    """Ramer-Douglas-Peucker itératif (évite la récursion sur de longues lignes).
    points = [[lat, lon], ...]"""
    if len(points) < 3:
        return list(points)
    keep = [False] * len(points)
    keep[0] = True
    keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        i0, i1 = stack.pop()
        if i1 - i0 < 2:
            continue
        a = points[i0]
        b = points[i1]
        max_d = 0.0
        max_i = i0
        for i in range(i0 + 1, i1):
            d = point_to_segment_dist_m(points[i], a, b)
            if d > max_d:
                max_d = d
                max_i = i
        if max_d > tol_m:
            keep[max_i] = True
            stack.append((i0, max_i))
            stack.append((max_i, i1))
    return [points[i] for i in range(len(points)) if keep[i]]


# ── Lecture GTFS ──
def parse_csv_zip(zf, name):
    with zf.open(name) as f:
        text = f.read().decode('utf-8-sig')
    return list(csv.DictReader(StringIO(text)))


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    gtfs_path = sys.argv[1]
    dept = sys.argv[2]
    output_dir = sys.argv[3] if len(sys.argv) > 3 else '.'

    if not os.path.isfile(gtfs_path):
        print(f"ERREUR : fichier GTFS introuvable : {gtfs_path}")
        sys.exit(1)

    print(f"[1/4] Lecture du GTFS : {gtfs_path}")
    with zipfile.ZipFile(gtfs_path) as zf:
        names = set(zf.namelist())
        if 'shapes.txt' not in names:
            print("ERREUR : ce GTFS n'a pas de shapes.txt — impossible de régénérer les tracés.")
            sys.exit(1)
        routes = parse_csv_zip(zf, 'routes.txt')
        trips = parse_csv_zip(zf, 'trips.txt')
        shapes_raw = parse_csv_zip(zf, 'shapes.txt')

    print(f"      routes : {len(routes)}")
    print(f"      trips  : {len(trips)}")
    print(f"      shape pts : {len(shapes_raw)}")

    # ── Reconstitution des shapes ──
    print("[2/4] Reconstitution des polylines par shape_id")
    shapes_acc = defaultdict(list)
    for r in shapes_raw:
        try:
            seq = int(r['shape_pt_sequence'])
            lat = float(r['shape_pt_lat'])
            lon = float(r['shape_pt_lon'])
        except (ValueError, KeyError):
            continue
        shapes_acc[r['shape_id']].append((seq, lat, lon))

    shapes = {}
    for sid, pts in shapes_acc.items():
        pts.sort()
        shapes[sid] = [[p[1], p[2]] for p in pts]

    # ── Map route_id -> set of shape_ids ──
    route_to_shapes = defaultdict(set)
    for t in trips:
        sid = t.get('shape_id')
        rid = t.get('route_id')
        if sid and rid:
            route_to_shapes[rid].add(sid)

    # ── Décimation et émission ──
    print("[3/4] Décimation adaptative (Douglas-Peucker)")
    out = []
    stats_per_type = defaultdict(lambda: {'shapes': 0, 'pts_in': 0, 'pts_out': 0})

    for route in routes:
        rid = route['route_id']
        short = (route.get('route_short_name') or '').strip()
        long_ = (route.get('route_long_name') or '').strip()
        color = (route.get('route_color') or '').strip().upper().lstrip('#')
        if not color or len(color) != 6:
            color = '4F46E5'
        try:
            rtype_raw = int(route.get('route_type', 3))
        except ValueError:
            rtype_raw = 3
        rtype = normalize_route_type(rtype_raw)
        tol = TOLERANCE_M.get(rtype, 25)

        # Affichage : si pas de short_name, prendre le long_name
        if not short:
            short = long_ or 'unknown'

        for sid in route_to_shapes.get(rid, []):
            pts = shapes.get(sid)
            if not pts or len(pts) < 2:
                continue
            simplified = rdp(pts, tol)
            simplified = [[round(p[0], 5), round(p[1], 5)] for p in simplified]
            out.append([short, long_, color, rtype, simplified])

            stats_per_type[rtype]['shapes'] += 1
            stats_per_type[rtype]['pts_in'] += len(pts)
            stats_per_type[rtype]['pts_out'] += len(simplified)

    # ── Déduplication (entrées avec même short_name + même tracé exact) ──
    seen = set()
    deduped = []
    for entry in out:
        key = (entry[0], entry[3], tuple(tuple(p) for p in entry[4]))
        if key in seen:
            continue
        seen.add(key)
        deduped.append(entry)

    # ── Trie : tram/metro/train d'abord, puis bus (cohérent avec les priorités d'affichage) ──
    type_priority = {0: 0, 1: 1, 2: 2, 7: 3, 5: 4, 6: 5, 3: 6, 4: 7}
    deduped.sort(key=lambda e: (type_priority.get(e[3], 99), e[0]))

    # ── Stats ──
    print("\nStatistiques par mode :")
    type_labels = {0: 'tram', 1: 'metro', 2: 'train', 3: 'bus', 4: 'ferry',
                   5: 'cablecar', 6: 'gondola', 7: 'funicular'}
    for rt, s in sorted(stats_per_type.items()):
        ratio = (s['pts_out'] / s['pts_in'] * 100) if s['pts_in'] else 0
        label = str(type_labels.get(rt, f'type{rt}'))
        print(f"  {label:10s}  {s['shapes']:4d} traces  "
              f"{s['pts_in']:>8d} -> {s['pts_out']:>6d} pts  ({ratio:.1f}% conserves)  tol={TOLERANCE_M.get(rt, 25)}m")

    print(f"\nTotal entrées : {len(out)} -> {len(deduped)} après dédup.")

    # ── Écriture ──
    print("[4/4] Écriture du fichier JS")
    var_name = f'SA_ROUTES_{dept}'
    out_path = os.path.join(output_dir, f'ROUTES_{dept}.js')
    os.makedirs(output_dir, exist_ok=True)

    tol_summary = ' / '.join(f'{type_labels.get(k, k)}={v}m' for k, v in sorted(TOLERANCE_M.items()))

    with open(out_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(f'// Lignes de transports - Departement {dept} ({len(deduped)} lignes)\n')
        f.write(f'// Format : [route_short_name, route_long_name, color_hex, route_type, [[lat,lon],...]]\n')
        f.write(f'// route_type : 0=tram 1=metro 2=train 3=bus 4=ferry 5=cablecar 6=gondola 7=funicular\n')
        f.write(f'// Source: GTFS regenere via tools/routes-regen/regen_routes.py\n')
        f.write(f'// Tolerance Douglas-Peucker (m) : {tol_summary}\n')
        f.write(f'var {var_name} = [')
        for i, entry in enumerate(deduped):
            line = json.dumps(entry, separators=(',', ':'), ensure_ascii=False)
            sep = '' if i == 0 else ','
            f.write(f'{sep}\n{line}')
        f.write('\n];\n')

    size_kb = os.path.getsize(out_path) / 1024
    print(f"\n[OK] Ecrit : {out_path}  ({size_kb:.1f} KB)")


if __name__ == '__main__':
    main()
