# Cache local — données externes

Ce dossier contient des extracts pré-calculés des APIs externes utilisées par l'outil.
Il permet à l'application de fonctionner **offline-first** et d'éviter les blocages CORS
quand l'app est ouverte directement (`file://`) plutôt que via un serveur HTTP.

## Fichiers

| Fichier | Contenu | Source | Couverture | Taille |
|---|---|---|---|---|
| `sispea_france.json` | Prix et indicateurs SISPEA (D102.0, D204.0, P104.3, P108.3, P101.1, P102.1, VP.177, P201.1, P203.3, P204.3, P205.3, P258.1) par code INSEE | [Hub'Eau SISPEA](https://hubeau.eaufrance.fr/page/api-indicateurs-services) | 34 673 communes — années 2017 à 2019 (les plus récentes publiées par Hub'Eau) | ~6 Mo |
| `ore_conso_dept.json` | Consommation annuelle gaz + électricité par département (totale + ventilation R/T/I/A) | [Agence ORE (ODRÉ)](https://odre.opendatasoft.com/explore/dataset/conso-departement-annuelle/) | 102 départements — année 2024 | ~32 ko |

## Comment l'app utilise ce cache

1. Au premier besoin, l'app charge `sispea_france.json` et `ore_conso_dept.json` une fois.
2. Pour chaque commune/département consultée :
   - **D'abord** : le cache local est interrogé.
   - **Ensuite** (en parallèle) : l'API live est aussi interrogée.
   - **Résultat** : l'entrée avec l'année la plus récente est conservée.
3. En cas d'échec de l'API live (ex. : blocage CORS sous `file://`), le cache prend le relais silencieusement.

## Régénération

Le script `data/cache/regenerate.py` refait ces deux fichiers à partir des sources publiques.
Exécution typique : 2 minutes, ~100 requêtes Hub'Eau + 1 téléchargement ORE.

```bash
cd "BREEAM V7"
python3 data/cache/regenerate.py
```

Recommandé **tous les 6 mois** — les données SISPEA sont publiées avec 2-3 ans de retard,
donc pas besoin de rafraîchir trop souvent.
