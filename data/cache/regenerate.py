#!/usr/bin/env python3
"""
Régénère les caches locaux utilisés par l'outil BREEAM Feasibility :
  - data/cache/sispea_france.json (Hub'Eau SISPEA — eau potable + assainissement)
  - data/cache/ore_conso_dept.json (Agence ORE — conso gaz/élec par département)

Usage depuis le dossier racine de l'outil :
    python3 data/cache/regenerate.py

Dépendance : pip install requests
"""
import csv
import json
import os
import sys
import time
from collections import Counter

try:
    import requests
except ImportError:
    print("Erreur : pip install requests", file=sys.stderr)
    sys.exit(1)

HERE = os.path.dirname(os.path.abspath(__file__))
OUT_SISPEA = os.path.join(HERE, "sispea_france.json")
OUT_ORE    = os.path.join(HERE, "ore_conso_dept.json")

SISPEA_API = "https://hubeau.eaufrance.fr/api/v0/indicateurs_services/communes"
ORE_CSV = "https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/conso-departement-annuelle/exports/csv?limit=-1&timezone=UTC&use_labels=false&epsg=4326"

DEPTS = [f"{i:02d}" for i in range(1, 20)] + [f"{i:02d}" for i in range(21, 96)] + ["2A", "2B", "971", "972", "973", "974", "976"]

EAU_IND = {"D102.0", "P104.3", "P108.3", "VP.177", "P101.1", "P102.1"}
ASS_IND = {"D204.0", "P201.1", "P203.3", "P204.3", "P205.3", "P258.1"}


# ── 1) SISPEA ──────────────────────────────────────────────────────────────────
def fetch_sispea():
    sess = requests.Session()
    sess.headers["User-Agent"] = "BREEAM-Feasibility-Tool/1.0 (cache-regen)"
    all_recs = {}
    for i, d in enumerate(DEPTS):
        page = 1
        recs = []
        while True:
            url = f"{SISPEA_API}?code_departement={d}&size=5000&page={page}&format=json"
            for attempt in range(4):
                try:
                    r = sess.get(url, timeout=120)
                    if r.status_code >= 400 and r.status_code != 206:
                        if r.status_code == 400 and page > 1:
                            break  # pagination limit reached
                        raise Exception(f"HTTP {r.status_code}")
                    data = r.json()
                    recs.extend(data.get("data") or [])
                    if not data.get("next"):
                        raise StopIteration
                    break
                except StopIteration:
                    recs_done = True
                    break
                except Exception as e:
                    if attempt == 3: raise
                    time.sleep(3 * (attempt + 1))
            else:
                continue
            if not data.get("next"): break
            page += 1
            if page > 5: break
            time.sleep(0.15)

        new = 0
        for row in recs:
            noms = row.get("noms_service") or []
            st = "unknown"
            if noms:
                ns = noms[0].lower()
                if "eau potable" in ns: st = "eau"
                elif "assainissement collectif" in ns: st = "assain_c"
                elif "non collectif" in ns: st = "assain_nc"
            key = (row["code_commune_insee"], st)
            existing = all_recs.get(key)
            if existing is None or (row.get("annee") or 0) > (existing.get("annee") or 0):
                all_recs[key] = row
                if existing is None: new += 1
        print(f"[{i+1:3d}/{len(DEPTS)}] dept {d}: {len(recs)} records (+{new}) — total {len(all_recs)}")

    # Compact
    compact = {}
    for row in all_recs.values():
        insee = row.get("code_commune_insee")
        if not insee: continue
        noms = row.get("noms_service") or []
        nom = noms[0] if noms else ""
        nom_lower = nom.lower()
        inds = row.get("indicateurs") or {}
        if "eau potable" in nom_lower:
            keep = {k: v for k, v in inds.items() if k in EAU_IND and v is not None}
            if not keep: continue
            compact.setdefault(insee, {})["eau"] = {"annee": row.get("annee"), "ind": keep, "service": nom}
        elif "assainissement collectif" in nom_lower:
            keep = {k: v for k, v in inds.items() if k in ASS_IND and v is not None}
            if not keep: continue
            compact.setdefault(insee, {})["assain"] = {"annee": row.get("annee"), "ind": keep, "service": nom}
    compact = {k: v for k, v in compact.items() if v}

    with open(OUT_SISPEA, "w", encoding="utf-8") as f:
        json.dump(compact, f, ensure_ascii=False, separators=(",", ":"))
    print(f"\nSISPEA compact: {len(compact)} communes → {OUT_SISPEA} ({os.path.getsize(OUT_SISPEA)/1024/1024:.2f} Mo)")


# ── 2) ORE ────────────────────────────────────────────────────────────────────
def fetch_ore():
    print("Téléchargement ORE CSV…")
    r = requests.get(ORE_CSV, timeout=300)
    r.raise_for_status()
    r.encoding = "utf-8"
    import io
    rows = list(csv.DictReader(io.StringIO(r.text), delimiter=";"))
    print(f"  {len(rows)} lignes CSV")

    by_dept = {}
    for row in rows:
        try: annee = int(row["annee"])
        except: continue
        dept = (row.get("code_departement") or "").strip()
        if not dept: continue

        def f(k):
            v = (row.get(k) or "").strip()
            if not v: return None
            try: return float(v)
            except: return None

        g_tot = f("g_consototale")
        e_tot = f("e_consototale")
        if g_tot is None and e_tot is None: continue

        cur = by_dept.get(dept) or {"annee": 0}
        if annee <= cur["annee"]: continue

        entry = {
            "annee": annee,
            "libelle": (row.get("libelle_departement") or "").strip(),
            "code_region": (row.get("code_region") or "").strip(),
            "libelle_region": (row.get("libelle_region") or "").strip(),
        }
        if g_tot is not None:
            entry["gaz"] = {"total": g_tot, "r": f("g_consor"), "t": f("g_consot"),
                            "i": f("g_consoi"), "a": f("g_consoa"), "na": f("g_consona")}
        if e_tot is not None:
            entry["elec"] = {"total": e_tot, "r": f("e_consor"), "t": f("e_consot"),
                             "i": f("e_consoi"), "a": f("e_consoa"), "na": f("e_consona")}
        by_dept[dept] = entry

    with open(OUT_ORE, "w", encoding="utf-8") as f:
        json.dump(by_dept, f, ensure_ascii=False, separators=(",", ":"))
    yrs = Counter(v["annee"] for v in by_dept.values())
    print(f"ORE compact: {len(by_dept)} départements — années {dict(sorted(yrs.items()))} → {OUT_ORE} ({os.path.getsize(OUT_ORE)/1024:.1f} Ko)")


if __name__ == "__main__":
    t0 = time.time()
    fetch_sispea()
    fetch_ore()
    print(f"\nTerminé en {(time.time()-t0)/60:.1f} min")
