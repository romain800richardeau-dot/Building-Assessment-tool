#!/usr/bin/env python3
"""
Shard sispea_france.json (13 Mo, 35 k communes) en un fichier .js par département.

Chaque fichier expose window._SISPEA_CACHE enrichi avec uniquement les communes
du département concerné. Permet au front de charger 50-500 Ko au lieu de 13 Mo.

Convention INSEE :
  - métropole   : 2 premiers chiffres (ex: "50174" -> "50")
  - Corse       : 2 premiers caractères (ex: "2B353" -> "2B")
  - DROM        : 3 premiers chiffres   (ex: "97227" -> "972")

A relancer après chaque mise à jour de sispea_france.json.
"""
import json
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
SRC = HERE / 'sispea_france.json'
OUT_DIR = HERE / 'sispea'


def insee_to_dept(insee):
    if not insee:
        return None
    if insee[:2] == '97':
        return insee[:3]
    return insee[:2]


def main():
    with open(SRC, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f'Loaded {len(data)} communes from {SRC.name}')

    # Bucket by département
    buckets = {}
    for insee, entry in data.items():
        dept = insee_to_dept(insee)
        if dept is None:
            continue
        buckets.setdefault(dept, {})[insee] = entry

    OUT_DIR.mkdir(exist_ok=True)
    # Clean old shards
    for old in OUT_DIR.glob('dept_*.js'):
        old.unlink()

    sizes = []
    for dept, communes in sorted(buckets.items()):
        # Compact JSON -> JS qui merge dans window._SISPEA_CACHE
        payload = json.dumps(communes, ensure_ascii=False, separators=(',', ':'))
        js = f'window._SISPEA_CACHE=Object.assign(window._SISPEA_CACHE||{{}},{payload});\n'
        out_path = OUT_DIR / f'dept_{dept}.js'
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(js)
        sizes.append((dept, len(communes), out_path.stat().st_size))

    # Summary
    sizes.sort(key=lambda x: x[2], reverse=True)
    total = sum(s[2] for s in sizes)
    print(f'\nWrote {len(sizes)} shards into {OUT_DIR.relative_to(HERE.parent)}/')
    print(f'  Total : {total//1024} KB')
    print(f'  Mean  : {total//len(sizes)//1024} KB/shard')
    print(f'\nTop 5 (largest) :')
    for dept, n, sz in sizes[:5]:
        print(f'  {dept}: {n:5d} communes, {sz//1024:4d} KB')
    print(f'\nBottom 5 (smallest) :')
    for dept, n, sz in sizes[-5:]:
        print(f'  {dept}: {n:5d} communes, {sz//1024:4d} KB')


if __name__ == '__main__':
    main()
