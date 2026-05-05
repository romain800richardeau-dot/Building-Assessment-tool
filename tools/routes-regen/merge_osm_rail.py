"""
Combine les tracés tram/métro/funiculaire d'OSM (via Overpass) avec les
lignes de bus du GTFS Google mirror, et produit un ROUTES_<dept>.js cohérent.

Usage :
    python merge_osm_rail.py <gtfs_bus.zip> <osm_rail.json> <dept_code> <output_dir>

OSM est utilisé pour les modes ferrés (tram=0, metro=1, funicular=7) car
le GTFS Google mirror n'inclut pas leurs shapes. La précision OSM (~1-2m)
est meilleure que celle des shapes GTFS officiels de toute façon.

Le GTFS bus est traité avec la décimation Douglas-Peucker existante.
"""

import csv
import json
import math
import os
import sys
import zipfile
from collections import defaultdict
from io import StringIO

# Reuse RDP from regen_routes
sys.path.insert(0, os.path.dirname(__file__))
from regen_routes import rdp, normalize_route_type, parse_csv_zip, TOLERANCE_M, point_to_segment_dist_m


def rdp_capped(points, tol_m, max_seg_m):
    """RDP avec contrainte de longueur max de corde : si la corde a-b
    dépasse max_seg_m, on FORCE un split même si tous les points
    intermédiaires sont sur la ligne droite. Évite les segments géants
    (typ. tunnels de métro) que le renderer rejetterait."""
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
        # Calcul de la corde a-b
        # On utilise haversine pour la longueur réelle
        chord_m = haversine_m(a, b)
        max_d = 0.0
        max_i = i0
        for i in range(i0 + 1, i1):
            d = point_to_segment_dist_m(points[i], a, b)
            if d > max_d:
                max_d = d
                max_i = i
        # On conserve max_i si:
        #   (a) sa distance perpendiculaire excède tol_m
        #   (b) OU la corde a-b excède max_seg_m (force un split visuel)
        if max_d > tol_m or chord_m > max_seg_m:
            keep[max_i] = True
            stack.append((i0, max_i))
            stack.append((max_i, i1))
    return [points[i] for i in range(len(points)) if keep[i]]


# Mapping OSM route -> GTFS route_type
OSM_ROUTE_TO_TYPE = {
    'tram': 0,
    'subway': 1,
    'light_rail': 0,
    'train': 2,
    'rail': 2,
    'funicular': 7,
    'cable_car': 5,
    'gondola': 6,
    'bus': 3,
    'trolleybus': 3,
    'ferry': 4,
}

# Couleurs TCL officielles (par préfixe de ref de ligne)
TCL_COLORS = {
    'A': 'C53E55',  'B': '004F95',  'C': 'F18B00',  'D': '00A14B',
    'T1': '863E96', 'T2': '932E89', 'T3': '9F5BAF', 'T4': '7B2D7E',
    'T5': '8E388C', 'T6': 'C71F8C', 'T7': 'C71F8C', 'TGS': '00A39F',
    'F1': 'EB6909', 'F2': 'EB6909',
}


def build_way_polyline(way, nodes):
    """Returns list of [lat, lon] from a way's node refs."""
    return [list(nodes[nid]) for nid in way.get('nodes', []) if nid in nodes]


def split_polyline_on_jumps(poly, max_jump_m):
    """Découpe une polyline en sous-polylines quand un segment > max_jump_m apparaît
    (cas OSM : nodes manquants en tunnel, donc gros saut entre 2 nodes consécutifs)."""
    if len(poly) < 2:
        return [poly] if poly else []
    parts = []
    current = [poly[0]]
    for i in range(1, len(poly)):
        d = haversine_m(poly[i-1], poly[i])
        if d > max_jump_m:
            if len(current) >= 2:
                parts.append(current)
            current = [poly[i]]
        else:
            current.append(poly[i])
    if len(current) >= 2:
        parts.append(current)
    return parts


def haversine_m(a, b):
    """Distance haversine en mètres entre 2 points [lat, lon]."""
    R = 6371000.0
    phi1 = math.radians(a[0]); phi2 = math.radians(b[0])
    dphi = math.radians(b[0] - a[0])
    dlam = math.radians(b[1] - a[1])
    x = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlam/2)**2
    return 2 * R * math.atan2(math.sqrt(x), math.sqrt(1 - x))


def build_route_polylines(rel, ways, nodes, max_jump_m=80):
    """Chain a relation's way members into ONE OR MORE polylines.
    Uses greedy nearest-neighbor: at each step, picks the unused way that
    best continues from the current endpoint. If the smallest gap exceeds
    max_jump_m, starts a new polyline (handles disconnected metros, etc.).

    Returns list of polylines [[[lat,lon], ...], ...]."""
    way_polys = []
    for m in rel.get('members', []):
        if m.get('type') != 'way':
            continue
        role = m.get('role', '')
        if role in ('platform', 'platform_exit_only', 'platform_entry_only',
                    'stop', 'stop_exit_only', 'stop_entry_only'):
            continue
        way = ways.get(m['ref'])
        if not way:
            continue
        poly = build_way_polyline(way, nodes)
        if len(poly) >= 2:
            way_polys.append(poly)

    if not way_polys:
        return []

    polylines = []
    current = list(way_polys.pop(0))

    while way_polys:
        last = current[-1]
        best_idx = -1
        best_dist = float('inf')
        best_reverse = False
        for i, w in enumerate(way_polys):
            d_start = haversine_m(last, w[0])
            d_end = haversine_m(last, w[-1])
            if d_start < best_dist:
                best_dist = d_start
                best_idx = i
                best_reverse = False
            if d_end < best_dist:
                best_dist = d_end
                best_idx = i
                best_reverse = True

        if best_dist <= max_jump_m and best_idx >= 0:
            # Continuité OK : on chaîne
            next_w = way_polys.pop(best_idx)
            if best_reverse:
                next_w = list(reversed(next_w))
            if current[-1] == next_w[0]:
                current.extend(next_w[1:])
            else:
                current.extend(next_w)
        else:
            # Saut trop grand : on commence une nouvelle polyline
            polylines.append(current)
            current = list(way_polys.pop(0))

    polylines.append(current)
    # Filtre les segments trop courts (artefacts)
    return [p for p in polylines if len(p) >= 2]


def color_for_ref(ref, osm_color):
    """Pick best color : OSM colour tag if valid hex, else TCL official, else default."""
    if osm_color:
        c = osm_color.strip().upper().lstrip('#')
        if len(c) == 6 and all(ch in '0123456789ABCDEF' for ch in c):
            return c
    return TCL_COLORS.get(ref, '4F46E5')


def main():
    if len(sys.argv) < 5:
        print(__doc__)
        sys.exit(1)
    bus_gtfs = sys.argv[1]
    osm_json = sys.argv[2]
    dept = sys.argv[3]
    output_dir = sys.argv[4]

    # ── 1. Lire OSM rail ──
    print("[1/4] Lecture OSM rail :", osm_json)
    with open(osm_json, encoding='utf-8') as f:
        osm = json.load(f)
    rels = [e for e in osm['elements'] if e['type'] == 'relation']
    ways = {e['id']: e for e in osm['elements'] if e['type'] == 'way'}
    nodes = {e['id']: (e['lat'], e['lon']) for e in osm['elements'] if e['type'] == 'node'}
    print(f"      relations={len(rels)} ways={len(ways)} nodes={len(nodes)}")

    # ── 2. Construire les polylines rail ──
    print("[2/4] Construction polylines rail")
    rail_entries = []  # [short, long, color, type, points]
    rail_keys_seen = set()  # déduplication par (ref, dir)

    for rel in rels:
        tags = rel.get('tags', {})
        route_kind = tags.get('route', '')
        rtype = OSM_ROUTE_TO_TYPE.get(route_kind, 3)
        ref = (tags.get('ref') or '').strip()
        name = (tags.get('name') or tags.get('to') or '').strip()
        # Direction info (from / to)
        from_ = (tags.get('from') or '').strip()
        to_ = (tags.get('to') or '').strip()
        if from_ and to_:
            long_name = f"{from_} - {to_}"
        else:
            long_name = name
        color = color_for_ref(ref, tags.get('colour') or tags.get('color'))

        polys = build_route_polylines(rel, ways, nodes, max_jump_m=80)
        if not polys:
            continue

        # Re-split chaque polyline si elle contient un segment > 1500m
        # (sécurité : élimine les sauts internes dus à des nodes manquants en tunnel)
        polys_clean = []
        for p in polys:
            polys_clean.extend(split_polyline_on_jumps(p, 1500))

        tol = TOLERANCE_M.get(rtype, 5)
        # Cap segment max à 1500m (en deçà du seuil 2000m du renderer)
        for poly in polys_clean:
            simplified = rdp_capped(poly, tol, 1500)
            simplified = [[round(p[0], 5), round(p[1], 5)] for p in simplified]
            if len(simplified) < 2:
                continue
            # Clé unique = ref + direction + endpoints (pour dédup multi-polylines)
            key = (ref, rtype, tuple(simplified[0]), tuple(simplified[-1]))
            if key in rail_keys_seen:
                continue
            rail_keys_seen.add(key)
            rail_entries.append([ref, long_name, color, rtype, simplified])

    # Stats rail
    by_type = defaultdict(int)
    by_pts = defaultdict(int)
    for e in rail_entries:
        by_type[e[3]] += 1
        by_pts[e[3]] += len(e[4])
    type_names = {0: 'tram', 1: 'metro', 7: 'funicular', 5: 'cablecar', 6: 'gondola', 2: 'train'}
    print("Rail extrait :")
    for t in sorted(by_type):
        print(f"  {type_names.get(t, t):10s} : {by_type[t]:3d} traces, {by_pts[t]:5d} points")

    # ── 3. Lire bus GTFS et décimer ──
    print(f"\n[3/4] Lecture GTFS bus : {bus_gtfs}")
    with zipfile.ZipFile(bus_gtfs) as zf:
        routes = parse_csv_zip(zf, 'routes.txt')
        trips = parse_csv_zip(zf, 'trips.txt')
        shapes_raw = parse_csv_zip(zf, 'shapes.txt')

    shapes_acc = defaultdict(list)
    for r in shapes_raw:
        try:
            seq = int(r['shape_pt_sequence'])
            lat = float(r['shape_pt_lat']); lon = float(r['shape_pt_lon'])
        except (ValueError, KeyError):
            continue
        shapes_acc[r['shape_id']].append((seq, lat, lon))
    shapes = {sid: [[p[1], p[2]] for p in sorted(pts)] for sid, pts in shapes_acc.items()}

    route_to_shapes = defaultdict(set)
    for t in trips:
        sid = t.get('shape_id')
        rid = t.get('route_id')
        if sid and rid:
            route_to_shapes[rid].add(sid)

    bus_entries = []
    for route in routes:
        rid = route['route_id']
        rtype_raw = int(route.get('route_type', 3) or 3)
        rtype = normalize_route_type(rtype_raw)
        if rtype != 3:  # GTFS bus uniquement (rail vient d'OSM)
            continue
        short = (route.get('route_short_name') or '').strip() or 'unknown'
        long_ = (route.get('route_long_name') or '').strip()
        color = (route.get('route_color') or '').strip().upper().lstrip('#') or '4F46E5'
        if len(color) != 6:
            color = '4F46E5'
        for sid in route_to_shapes.get(rid, []):
            pts = shapes.get(sid)
            if not pts or len(pts) < 2:
                continue
            simplified = rdp(pts, TOLERANCE_M[3])
            simplified = [[round(p[0], 5), round(p[1], 5)] for p in simplified]
            bus_entries.append([short, long_, color, rtype, simplified])

    # Dédup bus
    seen = set()
    bus_dedup = []
    for e in bus_entries:
        k = (e[0], e[3], tuple(tuple(p) for p in e[4]))
        if k in seen:
            continue
        seen.add(k)
        bus_dedup.append(e)
    total_bus_pts = sum(len(e[4]) for e in bus_dedup)
    print(f"Bus extrait : {len(bus_dedup)} traces, {total_bus_pts} points")

    # ── 4. Fusion + écriture ──
    print(f"\n[4/4] Ecriture ROUTES_{dept}.js")
    type_priority = {0: 0, 1: 1, 2: 2, 7: 3, 5: 4, 6: 5, 3: 6, 4: 7}
    all_entries = rail_entries + bus_dedup
    all_entries.sort(key=lambda e: (type_priority.get(e[3], 99), e[0]))

    out_path = os.path.join(output_dir, f'ROUTES_{dept}.js')
    os.makedirs(output_dir, exist_ok=True)
    var_name = f'SA_ROUTES_{dept}'
    with open(out_path, 'w', encoding='utf-8', newline='\n') as f:
        f.write(f'// Lignes de transports - Departement {dept} ({len(all_entries)} lignes)\n')
        f.write(f'// Format : [route_short_name, route_long_name, color_hex, route_type, [[lat,lon],...]]\n')
        f.write(f'// route_type : 0=tram 1=metro 2=train 3=bus 4=ferry 5=cablecar 6=gondola 7=funicular\n')
        f.write(f'// Source : Tram/metro/funi -> OSM via Overpass (precision rail) ; bus -> GTFS Google mirror Lyon TCL\n')
        f.write(f'var {var_name} = [')
        for i, entry in enumerate(all_entries):
            line = json.dumps(entry, separators=(',', ':'), ensure_ascii=False)
            sep = '' if i == 0 else ','
            f.write(f'{sep}\n{line}')
        f.write('\n];\n')

    size_kb = os.path.getsize(out_path) / 1024
    print(f"\n[OK] Ecrit : {out_path}  ({size_kb:.1f} KB)")
    print(f"     Total entries : {len(all_entries)}")


if __name__ == '__main__':
    main()
