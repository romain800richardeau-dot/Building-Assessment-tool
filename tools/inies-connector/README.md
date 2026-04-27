# Connecteur INIES Webservice V4

Récupère les FDES (Fiches de Déclaration Environnementale et Sanitaire) depuis le webservice officiel INIES V4 (CSTB) pour enrichir la base `data/INIES_FDES.js` du Feasibility Tool BBCA.

## Prérequis

- Abonnement actif au **webservice INIES V4** auprès du CSTB
  - Demande d'accès : https://www.inies.fr/programmes-et-services/le-webservice-des-donnees-numerisees/
  - Tarif : payant, sur devis (variable selon profil — fabricant, BE, AMO, plateforme)
  - Délai d'obtention : ~2-4 semaines (validation CSTB)
- Node.js 18+ installé localement
- Identifiants reçus du CSTB après validation : URL endpoint, login, mot de passe

## Installation

```bash
cd tools/inies-connector
npm install
```

## Configuration

1. Copier le template :
   ```bash
   cp config.example.json config.json
   ```

2. Éditer `config.json` avec les credentials reçus du CSTB :
   ```json
   {
     "endpoint": "https://www.inies.fr/api/v4/...",
     "login": "VOTRE_LOGIN",
     "password": "VOTRE_PASSWORD",
     "outputFile": "../../data/INIES_FDES.js",
     "mergeWithExisting": true,
     "rateLimit": 500
   }
   ```

3. **IMPORTANT** : ne jamais commiter `config.json` (déjà dans `.gitignore`)

## Utilisation

### Mode list — lister les FDES disponibles

```bash
node inies-connector.js list --filter "béton" --limit 50
```

Affiche les FDES correspondant au filtre dans la console (sans téléchargement complet).

### Mode fetch — récupérer un détail FDES précis

```bash
node inies-connector.js fetch --id 12345
```

Récupère le détail d'une FDES par son identifiant et affiche le JSON.

### Mode update — mettre à jour `data/INIES_FDES.js`

```bash
# Récupérer toutes les FDES validées
node inies-connector.js update

# Filtré (ex: uniquement les FDES bois)
node inies-connector.js update --filter "bois"

# Limité aux N premières
node inies-connector.js update --limit 100

# Forcer le re-téléchargement (sinon skip si déjà en base)
node inies-connector.js update --force
```

Le script :
1. Charge `data/INIES_FDES.js` existant (49 FDES Donatello + éventuelles ajouts précédents)
2. Récupère la liste des FDES depuis le webservice
3. Skip les FDES déjà présentes (sauf `--force`)
4. Pour chaque nouvelle FDES, récupère le détail complet (phases A1→D, biogénique)
5. Mappe vers le schéma unifié
6. Sauvegarde `data/INIES_FDES.js` avec le merge

### Mode demo — sans credentials (test du pipeline)

```bash
node inies-connector.js demo
```

Génère 5 FDES factices avec décomposition complète A1-D pour tester l'intégration dans l'app sans avoir d'abonnement actif. Ne pas utiliser en production.

## Schéma de sortie

Chaque FDES est mappée vers ce schéma (compatible `INIES_FDES.fdes[]`) :

```json
{
  "id": "12345",
  "name": "Béton C25/30 - Lafarge - Holcim",
  "statut": "1",
  "version": "2.0",
  "declType": "DEP",
  "cat": ["Bâtiment", "Gros oeuvre", "Béton", "Béton armé", "C25/30"],
  "commercialRef": "Lafarge BetonGreen",
  "dvt": 100,
  "ufQty": 1,
  "ufUnit": "m³",
  "ufDesc": "1 m³ de béton C25/30 mis en œuvre",
  "organism": "Lafarge Holcim France",
  "norme": "NF EN 15804+A1 + NF EN 15804/CN",
  "eges": {
    "A1": 245.3, "A2": 12.1, "A3": 78.5,
    "A4": 8.2, "A5": 5.1,
    "B1": 0, "B2": 0, "B3": 0, "B4": 0, "B5": 0, "B6": 0, "B7": 0,
    "C1": 2.3, "C2": 4.1, "C3": 1.8, "C4": 0.9,
    "D": -15.2,
    "total": 343.0
  },
  "biogenic": { "storage": 0, "packaging": 0.5 }
}
```

## Limitations connues

- Le webservice INIES V4 a un **rate limit** (~2 requêtes/seconde côté CSTB). Le script applique 500ms par défaut entre requêtes (paramétrable via `config.rateLimit`).
- Récupérer la base complète (~324 000 fiches) prend plusieurs heures. Préférer un filtre par catégorie.
- Le schéma SOAP retourné par le webservice peut évoluer ; en cas d'erreur de mapping, voir `mapping.js` et adapter.
- Le script n'effectue PAS de validation tierce des données (statut "vérifié" est lu tel quel depuis l'API).

## Mise à jour trimestrielle (recommandé)

Mettre en place une tâche cron (Linux/Mac) ou scheduler (Windows) pour relancer `update` tous les 3 mois :

```bash
# crontab -e (1er du trimestre à 3h du matin)
0 3 1 1,4,7,10 * cd /path/to/tools/inies-connector && node inies-connector.js update >> update.log 2>&1
```

## Dépannage

- **HTTP 401** : credentials invalides → vérifier `config.json`
- **HTTP 429** : rate limit dépassé → augmenter `rateLimit` (en ms)
- **Timeout SOAP** : le webservice est lent ou indisponible → réessayer plus tard
- **XML parse error** : le schéma a changé → adapter `mapping.js`

## Référence

- Documentation INIES : https://www.inies.fr/
- Norme NF EN 15804+A1 : https://www.boutique.afnor.org/fr-fr/norme/nf-en-15804a1
- E+C- ministériel : http://www.batiment-energiecarbone.fr/
