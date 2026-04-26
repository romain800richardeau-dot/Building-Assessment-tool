"""Enrichissement via API Pappers Open Data.

Pour chaque acteur ayant un SIREN (deja matche via SIRENE), appelle
  https://api.pappers.fr/v2/entreprise?siren=<siren>&api_token=<token>
pour recuperer des champs complementaires : dirigeants, beneficiaires
effectifs, categorie juridique detaillee, capital, date de creation precise.

USAGE :
    export PAPPERS_TOKEN='xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    python3 enrich_pappers.py

    # ou avec clef en argument :
    python3 enrich_pappers.py <api_token>

Pappers Open Data - plan gratuit : 100 req/jour (1000 avec inscription).
Signup : https://www.pappers.fr/api

Le script fait du rate-limit a 2 req/s pour rester poli, sauvegarde
incrementalement tous les 20 acteurs dans pappers_checkpoint.json.
"""
import os
import sys
import re
import json
import time
import urllib.request
import urllib.parse

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ENRICHED_PATH = os.path.join(SCRIPT_DIR, "acteurs_reemploi_enriched.js")
OUT_RAW = os.path.join(SCRIPT_DIR, "pappers_results.json")
CHECKPOINT = os.path.join(SCRIPT_DIR, "pappers_checkpoint.json")

API_URL = "https://api.pappers.fr/v2/entreprise"
SLEEP_SECONDS = 0.5  # 2 req/s max, tres en dessous du quota

# Champs a extraire du payload Pappers
FIELDS_KEEP = [
    "denomination",
    "nom_entreprise",
    "date_creation",
    "date_creation_formate",
    "date_cessation",
    "statut_rcs",
    "forme_juridique",
    "capital",
    "devise_capital",
    "categorie_juridique",
    "code_naf",
    "libelle_code_naf",
    "tranche_effectif",
    "annee_effectif",
    "categorie_entreprise",
    "numero_tva_intracommunautaire",
    "convention_collective",
    "dirigeants",
    "beneficiaires_effectifs",
    "representants",
    "objet_social",
    "sites_internet",
    "telephone",
    "email",
    "capital_formate",
    "derniere_mise_a_jour_sirene",
    "derniere_mise_a_jour_rcs",
    "finances",  # CA, resultat net si publies
]


def load_enriched():
    with open(ENRICHED_PATH, encoding="utf-8") as f:
        src = f.read()
    m = re.search(r"window\.ACTEURS_REEMPLOI_ENRICHED\s*=\s*(\{.*\});", src, re.DOTALL)
    return src, json.loads(m.group(1))


def api_get(siren, token):
    q = urllib.parse.urlencode({"siren": siren, "api_token": token})
    url = f"{API_URL}?{q}"
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            if r.status != 200:
                return None, f"http-{r.status}"
            return json.loads(r.read().decode("utf-8")), None
    except urllib.error.HTTPError as e:
        return None, f"http-{e.code}"
    except Exception as e:
        return None, type(e).__name__


def filter_fields(raw):
    return {k: raw[k] for k in FIELDS_KEEP if k in raw}


def main():
    token = os.environ.get("PAPPERS_TOKEN") or (sys.argv[1] if len(sys.argv) > 1 else None)
    if not token:
        print("ERREUR : jeton API Pappers non fourni.", file=sys.stderr)
        print("Ajouter via `export PAPPERS_TOKEN='xxx'` ou en argument du script.", file=sys.stderr)
        sys.exit(1)

    src, enriched = load_enriched()

    # SIREN a requeter : seulement ceux presents + pas deja resolus
    already = {}
    if os.path.exists(CHECKPOINT):
        with open(CHECKPOINT) as f:
            already = json.load(f)
        print(f"Reprise checkpoint : {len(already)} deja requetes")

    todo = []
    for aid, e in enriched.items():
        siren = e.get("siren")
        if siren and aid not in already:
            todo.append((aid, str(siren).replace(" ", "")))

    print(f"Total acteurs avec SIREN : {sum(1 for e in enriched.values() if e.get('siren'))}")
    print(f"A requeter : {len(todo)}")
    print(f"Temps estime : {len(todo) * SLEEP_SECONDS:.0f}s ({len(todo) * SLEEP_SECONDS / 60:.1f} min)")

    done = 0
    start = time.time()
    for aid, siren in todo:
        raw, err = api_get(siren, token)
        if err:
            already[aid] = {"_error": err}
            if err == "http-401":
                print("ERREUR : jeton API invalide. Arret.", file=sys.stderr)
                break
        else:
            already[aid] = filter_fields(raw)
        done += 1
        if done % 10 == 0:
            elapsed = time.time() - start
            rate = done / elapsed if elapsed > 0 else 0
            eta = (len(todo) - done) / rate if rate > 0 else 0
            print(f"  [{done}/{len(todo)}] rate={rate:.1f}/s eta={eta:.0f}s")
        if done % 20 == 0:
            with open(CHECKPOINT, "w") as f:
                json.dump(already, f, ensure_ascii=False)
        time.sleep(SLEEP_SECONDS)

    # Sauvegarder tous les resultats
    with open(OUT_RAW, "w", encoding="utf-8") as f:
        json.dump(already, f, ensure_ascii=False, indent=1)

    # Merger dans acteurs_reemploi_enriched.js
    n_merge = 0
    for aid, papdata in already.items():
        if "_error" in papdata or aid not in enriched:
            continue
        e = enriched[aid]
        # Ne pas ecraser les champs deja verifies manuellement
        if papdata.get("date_creation_formate") and not e.get("annee_creation"):
            try:
                e["annee_creation"] = int(papdata["date_creation_formate"][-4:])
            except (ValueError, TypeError):
                pass
        if papdata.get("forme_juridique") and not e.get("nature_juridique"):
            e["nature_juridique"] = papdata["forme_juridique"]
        if papdata.get("categorie_entreprise") and not e.get("categorie_entreprise"):
            e["categorie_entreprise"] = papdata["categorie_entreprise"]
        if papdata.get("dirigeants"):
            # Premiers 3 dirigeants
            noms = []
            for d in papdata["dirigeants"][:3]:
                nom = d.get("nom_complet") or d.get("nom") or ""
                qualite = d.get("qualite") or ""
                if nom:
                    noms.append(f"{nom} ({qualite})" if qualite else nom)
            if noms:
                e["dirigeants"] = noms
        if papdata.get("capital_formate"):
            e["capital"] = papdata["capital_formate"]
        # Finances (CA)
        if papdata.get("finances"):
            fin = papdata["finances"]
            if isinstance(fin, list) and fin:
                # Plus recent = premier en general
                f0 = fin[0]
                if f0.get("chiffre_affaires"):
                    e["ca"] = f"{f0['chiffre_affaires']:,} EUR ({f0.get('annee','')})"
        sources = e.setdefault("_sources", [])
        if "pappers" not in sources:
            sources.append("pappers")
        n_merge += 1

    # Reecrire enriched.js
    m = re.search(r"(window\.ACTEURS_REEMPLOI_ENRICHED\s*=\s*)(\{.*\})(;)", src, re.DOTALL)
    prefix, _, suffix = m.group(1), m.group(2), m.group(3)
    new_body = json.dumps(enriched, ensure_ascii=False, indent=1)
    new_src = src[: m.start()] + prefix + new_body + suffix + src[m.end():]
    with open(ENRICHED_PATH, "w", encoding="utf-8") as f:
        f.write(new_src)

    # Nettoyer checkpoint si tout OK
    if os.path.exists(CHECKPOINT):
        os.remove(CHECKPOINT)

    elapsed = time.time() - start
    n_err = sum(1 for v in already.values() if v.get("_error"))
    print()
    print("=== DONE ===")
    print(f"  total requetes : {len(already)}")
    print(f"  succes : {len(already) - n_err}")
    print(f"  erreurs : {n_err}")
    print(f"  merge enrichment : {n_merge} acteurs")
    print(f"  duree : {elapsed:.0f}s")
    print(f"  ==> bump cache ?v=20260423b dans index.html")


if __name__ == "__main__":
    main()
