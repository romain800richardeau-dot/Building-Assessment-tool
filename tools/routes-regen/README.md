# Régénération des fichiers ROUTES_<dept>.js

Deux scripts complémentaires :
- **`regen_routes.py`** — décime un GTFS officiel (avec `shapes.txt`) avec une
  tolérance Douglas-Peucker calibrée par mode.
- **`merge_osm_rail.py`** — combine **OSM (rails physiques) pour tram/métro/funi**
  + **GTFS (bus)**. À utiliser quand le GTFS disponible n'a pas les shapes
  tram/métro (cas du Google mirror Lyon TCL).

Approche **OSM + GTFS** recommandée pour Lyon (et tout réseau dont le GTFS
public est incomplet sur les rails).

## Pourquoi ?

Les fichiers `ROUTES_<dept>.js` actuels ont été générés avec une décimation
trop agressive sur tous les modes confondus. Résultat : la ligne **T1 du
réseau TCL** (Lyon, dépt 69) est représentée par seulement 27 points pour
9 km de tracé, ce qui la fait apparaître en lignes droites peu fidèles aux
rues qu'elle suit (ex. Cours Charlemagne au quartier Confluence).

Ce script regénère le fichier avec une tolérance Douglas-Peucker calibrée par
mode :

| Mode | Tolérance | Effet |
|---|---|---|
| Tram (0) | 4 m | Suit les virages de rues |
| Métro (1) | 4 m | Préserve la courbure |
| Train (2) | 12 m | Courbes amples des voies ferrées |
| Bus (3) | 25 m | Compromis lisibilité/taille |
| Funiculaire (7) | 3 m | Court et précis |

## Pré-requis

- Python 3.8+ (stdlib uniquement, aucune dépendance externe à installer)
- Un fichier GTFS officiel (`.zip`) pour le département / réseau visé

## Sources GTFS recommandées

| Département / réseau | URL | Note |
|---|---|---|
| **69 — Lyon (TCL/Sytral)** | https://transport.data.gouv.fr/datasets/horaires-theoriques-et-temps-reel-du-reseau-tcl | Telecharger le ZIP "Statique" |
| 75/77/78/91/92/93/94/95 — Île-de-France | https://transport.data.gouv.fr/datasets/horaires-prevus-sur-les-lignes-de-transport-en-commun-d-ile-de-france | RATP + Optile + Transilien |
| 31 — Toulouse (Tisséo) | https://transport.data.gouv.fr/datasets/horaires-theoriques-et-temps-reel-du-reseau-tisseo | |
| 33 — Bordeaux (TBM) | https://transport.data.gouv.fr/datasets/horaires-theoriques-du-reseau-tbm | |
| 13 — Marseille (RTM) | https://transport.data.gouv.fr/datasets/horaires-theoriques-du-reseau-rtm | |
| Tous les autres | https://transport.data.gouv.fr/datasets?type=public-transit | Filtrer par région |

Le GTFS doit contenir `shapes.txt` (sinon le script ne peut pas reconstruire
les tracés). C'est le cas pour la quasi-totalité des feeds urbains français.

## Utilisation

### Cas A — GTFS complet (avec shapes tram/métro)

```bash
cd tools/routes-regen
python regen_routes.py <chemin/vers/gtfs.zip> <code_dept> [output_dir]
```

### Cas B — GTFS sans shapes rail (Lyon TCL Google mirror)

1. **Télécharger le GTFS bus** (Google mirror, public) :
   ```bash
   curl -o tcl.zip 'https://gtech-transit-prod.apigee.net/v1/google/gtfs/odbl/lyon_tcl.zip?apikey=BasyG6OFZXgXnzWdQLTwJFGcGmeOs204&secret=gNo6F5PhQpsGRBCK'
   ```

2. **Récupérer les rails depuis OSM** (Overpass API) :
   ```bash
   cat > query.txt <<'EOF'
   [out:json][timeout:120];
   (
     relation["route"="tram"](45.5,4.5,46.0,5.2);
     relation["route"="subway"](45.5,4.5,46.0,5.2);
     relation["route"~"funicular|cable_car"](45.5,4.5,46.0,5.2);
   );
   out body; >; out skel qt;
   EOF
   curl --data-urlencode "data@query.txt" 'https://overpass-api.de/api/interpreter' -o rail.json
   ```

3. **Fusionner et écrire ROUTES_69.js** :
   ```bash
   PYTHONIOENCODING=utf-8 python merge_osm_rail.py tcl.zip rail.json 69 ../../data/bus
   ```

   La bbox `(45.5, 4.5, 46.0, 5.2)` couvre la métropole de Lyon. Adapter pour
   d'autres villes (utiliser bboxfinder.com pour générer les coords).

### Exemple : régénérer le dépt 69 (Lyon)

1. Télécharger le GTFS TCL depuis `transport.data.gouv.fr` :
   - Fichier : `tcl-statique.zip` (ou nom équivalent)
   - Le sauvegarder dans ce dossier

2. Lancer :
   ```bash
   python regen_routes.py tcl-statique.zip 69 ../../data/bus
   ```

3. Le fichier `data/bus/ROUTES_69.js` est remplacé.

4. Hard-refresh dans le navigateur (Ctrl+Shift+R), activer la couche Lignes TC,
   vérifier que T1 suit bien le Cours Charlemagne.

## Sortie console (extrait)

```
[1/4] Lecture du GTFS : tcl-statique.zip
      routes : 200
      trips  : 12340
      shape pts : 1058432
[2/4] Reconstitution des polylines par shape_id
[3/4] Décimation adaptative (Douglas-Peucker)

Statistiques par mode :
  tram        12 tracés    18450 →    340 pts  (1.8% conservés)  tol=4m
  metro        8 tracés    24800 →    220 pts  (0.9% conservés)  tol=4m
  bus        920 tracés  1015000 →  72400 pts  (7.1% conservés)  tol=25m
  funicular    4 tracés      980 →     45 pts  (4.6% conservés)  tol=3m

Total entrées : 944 → 920 après dédup.
[4/4] Écriture du fichier JS

✅ Écrit : ../../data/bus/ROUTES_69.js  (1842.3 KB)
```

## Ajuster les tolérances

Si le fichier produit est trop volumineux, augmenter les valeurs dans
`TOLERANCE_M` au début du script. Inversement, baisser pour plus de précision.

Conseils :
- **Tram urbain** : ne pas dépasser 5 m, au-delà les virages disparaissent
- **Bus** : 25-40 m est un bon compromis
- **Train régional** : 15-20 m suffit (les voies sont rectilignes ou en grandes courbes)

## Compatibilité

Le format de sortie est identique aux fichiers existants (variable globale
`SA_ROUTES_<dept>`, format `[short, long, color, type, points]`). Aucune
modification du code applicatif n'est nécessaire.
