#!/usr/bin/env python3
"""
Convertit les caches JSON en fichiers JS chargeables via <script> (contourne
le blocage CORS de Firefox quand l'app est ouverte en file://).

A relancer apres chaque mise a jour des JSON (scrape, fusion).
"""
import json
import pathlib

HERE = pathlib.Path(__file__).resolve().parent

TARGETS = [
    # NOTE: sispea_france.json n'est PLUS converti ici (13 Mo = trop lourd a charger
    # en bloc). Il est sharde par departement via split_sispea_by_dept.py -> 101
    # fichiers sispea/dept_XX.js (~130 Ko chacun), charges a la demande par le front.
    ('ore_conso_dept.json', 'ore_conso_dept.js', '_ORE_CACHE'),
]

for src, dst, var in TARGETS:
    src_path = HERE / src
    dst_path = HERE / dst
    if not src_path.exists():
        print(f'SKIP: {src} not found')
        continue
    with open(src_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    # Un JSON valide est aussi du JS valide. On prepend simplement l'affectation.
    payload = json.dumps(data, ensure_ascii=False, separators=(',', ':'))
    with open(dst_path, 'w', encoding='utf-8') as f:
        f.write(f'window.{var} = {payload};\n')
    print(f'OK: {src} -> {dst} ({dst_path.stat().st_size // 1024} KB, {len(data)} entries)')
