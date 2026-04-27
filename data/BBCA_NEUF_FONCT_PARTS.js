// ============================================================
// BBCA NEUF V3.2 — Contenu de la page "Fonctionnement du référentiel"
// Format aligné BREEAM NC V7 : [{tab, title, subtitle, groups:[{name, items:[{title, content}]}]}]
// Formules : pattern BREEAM (div centré + .formula-var avec tooltip)
// Sources :
//   - Référentiel BBCA Neuf V3.2 (Association BBCA / CSTB - 01/03/2024)
//   - Règles de labélisation BBCA Rénovation et BBCA Neuf v1.0 (CERTIVEA - 15/06/2023)
//   - Fiche solution Client Labels BBCA Neuf et Rénovation (CERTIVEA - 23/10/2023)
// ============================================================

const BBCA_NEUF_FONCT_PARTS = [

  {
    tab: "À propos",
    title: "À propos du label BBCA Neuf",
    subtitle: "Présentation, leviers, acteurs et différences avec les autres référentiels",
    groups: [
      {
        name: "Présentation",
        items: [
          {
            title: "Origine et mission",
            content: "<p>Le secteur du bâtiment représente plus du quart des émissions de gaz à effet de serre de la France, juste devant les transports (25 %) et l'alimentation (19 %). En intégrant le tertiaire, le bâtiment devient la première source d'émissions de GES du pays (Commissariat Général au Développement Durable, novembre 2015).</p><p>Les réglementations thermiques successives ont permis de réduire les consommations énergétiques en phase d'exploitation, mais la vie d'un bâtiment s'inscrit dans un cycle plus large, de sa construction à sa fin de vie. Dans ce contexte, l'<strong>impact carbone des phases construction et fin de vie a été longtemps ignoré</strong>.</p><p>L'<strong>Association BBCA</strong> (Bâtiment Bas Carbone), créée en 2015 par les principaux intervenants de l'acte de construire, a publié dès 2016 la première méthode au monde de mesure de l'empreinte carbone du bâtiment neuf sur tout son cycle de vie (construction-exploitation-fin de vie). Cette méthode est devenue le socle du label BBCA, qui fixe des plafonds d'émissions à ne pas dépasser, encourage la mise en œuvre de bonnes pratiques bas carbone et met en lumière les bâtiments bas carbone exemplaires.</p>"
          },
          {
            title: "Méthode pionnière et lien avec la RE 2020",
            content: "<p>L'Association BBCA a participé activement, dès 2016, à l'expérimentation <strong>Énergie positive — Réduction Carbone (E+C-)</strong> qui a conduit à la <strong>RE 2020</strong>, lancée en 2022. Le référentiel BBCA est en cohérence avec la RE 2020 mais va plus loin en termes de méthodes et d'exigences, avec l'ambition d'accélérer la transition bas carbone au-delà de la réglementation.</p><p>L'objectif quantifié de l'Association BBCA : <strong>diviser par 2 les émissions de CO<sub>2</sub> dans le bâtiment</strong>. Aujourd'hui, 1 m² de bâtiment neuf construit représente 1,5 tonne de CO<sub>2</sub> émis.</p><p>Le label est délivré par <strong>CERTIVEA</strong> (filiale du CSTB), <strong>hors accréditation COFRAC</strong>.</p>"
          },
          {
            title: "Historique des versions",
            content: "<ul><li><strong>2016</strong> — Version 1.0</li><li><strong>2017</strong> — Version 2.1</li><li><strong>2018</strong> — Version 3.0</li><li><strong>2021</strong> — Version 3.1</li><li><strong>2022</strong> — Version 4.0</li><li><strong>2023</strong> — Version 4.1 (compatible RE 2020 — résidentiel collectif, bureaux, enseignement primaire et secondaire)</li><li><strong>2024</strong> — Version 3.2 (intègre les usages non soumis à la RE 2020 et exigences spécifiques pour les hôtels)</li></ul>"
          }
        ]
      },
      {
        name: "Les 4 leviers du label",
        items: [
          {
            title: "Construction Raisonnée et Stockage Carbone",
            content: "<p>Couvre les émissions liées à la déconstruction préalable, aux produits et équipements (lots E+C-), au chantier et au stockage carbone biogénique. Le label valorise simultanément :</p><ul><li>l'utilisation de produits faiblement émetteurs (<strong>éco-conception des produits</strong>) ;</li><li>l'utilisation de ces produits en <strong>quantité limitée</strong> (sobriété) ;</li><li>le <strong>stockage carbone</strong> via les matériaux biosourcés (vers la neutralité carbone) ;</li><li>le <strong>réemploi de matériaux</strong> et le recours à des matériaux recyclables en fin de vie.</li></ul>"
          },
          {
            title: "Exploitation Maîtrisée",
            content: "<p>Couvre les émissions liées aux consommations d'énergie tous usages du bâtiment en phase exploitation, sur la <strong>période d'étude conventionnelle de 50 ans</strong>. Le label fait porter les efforts à la fois sur :</p><ul><li>la <strong>sobriété des consommations</strong> (efficacité passive et active) ;</li><li>l'usage d'<strong>énergies peu émettrices de GES</strong>, en valorisant les contenus EnR dans les flux entrants au niveau local.</li></ul><p>Le contributeur eau (consommations et rejets) est également comptabilisé pour valoriser les réductions liées à l'adduction et au traitement.</p>"
          },
          {
            title: "Économie Circulaire",
            content: "<p>Au-delà de ce qui est déjà valorisé dans l'ACV (matériaux recyclés intégrés aux FDES), le label complète par <strong>5 leviers complémentaires</strong> non intégrés à l'ACV :</p><ul><li>la <strong>déconstruction sélective</strong> sur site plutôt que tri en plateforme ;</li><li>le <strong>réemploi</strong> de produits lors de la construction ;</li><li>la <strong>mutualisation des espaces</strong> (parkings, salles de réunion…) ;</li><li>le <strong>potentiel de changement d'usage</strong> du bâtiment (logement → bureaux par exemple) ;</li><li>le <strong>potentiel d'extension</strong> (horizontale ou verticale).</li></ul>"
          },
          {
            title: "Optimisation des consommations énergétiques",
            content: "<p>Levier transversal valorisé en <em>Points Innovation Climat</em>, qui couvre les démarches mises en œuvre dès la construction pour garantir la performance réelle en exploitation :</p><ul><li><strong>Simulation Énergétique Dynamique (SED)</strong> en phase conception (tertiaire) ;</li><li>mission de <strong>commissionnement</strong> par tierce partie ;</li><li><strong>sensibilisation des occupants</strong> aux éco-gestes.</li></ul><p>Note : la répartition typique des émissions sur le cycle de vie d'un bâtiment neuf est environ <strong>60 % en construction</strong> (PCE + chantier) et <strong>40 % en exploitation</strong> (50 ans), selon le test HQE Performance.</p>"
          }
        ]
      },
      {
        name: "Les acteurs",
        items: [
          {
            title: "Association BBCA",
            content: "<p>L'Association pour le Développement du Bâtiment Bas Carbone rassemble depuis 2015 les principaux intervenants de l'acte de construire — plus d'une centaine de membres : promoteurs immobiliers, investisseurs, collectivités, aménageurs, architectes de renom, bureaux d'études et constructeurs. <strong>Reconnue d'intérêt général</strong>, elle a quatre missions :</p><ul><li>faire prendre conscience de l'urgence à diminuer l'empreinte carbone des bâtiments ;</li><li>développer la connaissance sur le bâtiment bas carbone ;</li><li>valoriser les bonnes pratiques (label BBCA) ;</li><li>inciter à construire bas carbone.</li></ul><p>Depuis 2017, l'Association BBCA accompagne l'État dans la mise au point de la RE 2020.</p><p>Site officiel : <a href=\"https://www.batimentbascarbone.org\" target=\"_blank\">www.batimentbascarbone.org</a></p>"
          },
          {
            title: "CERTIVEA — organisme certificateur",
            content: "<p>CERTIVEA (filiale du CSTB) est l'organisme certificateur leader en France pour la labellisation des bâtiments tertiaires, infrastructures et aménagement des territoires. En tant qu'<strong>Entreprise à Mission</strong>, CERTIVEA s'engage sur 4 objectifs sociétaux et environnementaux : interagir avec un réseau de parties prenantes, s'assurer que chaque référentiel répond à un ODD de l'ONU, diffuser des connaissances, organiser des audits par tierces parties indépendantes.</p><p>CERTIVEA écrit les <strong>règles de labellisation</strong>, désigne les vérificateurs et prend la décision d'attribution.</p><p>Adresse : 4 avenue du Recteur Poincaré, 75016 Paris — Tél : +33 (0)1 40 50 29 09<br>Site : <a href=\"https://www.certivea.fr\" target=\"_blank\">www.certivea.fr</a> — Carte : <a href=\"https://certimap.certivea.fr\" target=\"_blank\">certimap.certivea.fr</a></p>"
          },
          {
            title: "Vérificateur",
            content: "<p>Le vérificateur est <strong>qualifié et missionné par CERTIVEA</strong>. Pour assurer la <strong>tierce partie intégrale</strong> :</p><ul><li>il <strong>ne peut pas être partie prenante au projet</strong> ;</li><li>il <strong>ne peut ni conseiller ni former le Demandeur</strong> ;</li><li>il établit un rapport d'intervention, mais <strong>n'a pas de pouvoir de décision</strong>.</li></ul><p>Sa mission consiste à analyser <strong>par échantillonnage</strong> les documents techniques fournis par l'équipe auditée pour vérifier la cohérence des résultats avec les exigences du référentiel.</p>"
          },
          {
            title: "Demandeur (Maître d'Ouvrage)",
            content: "<p>Tout maître d'ouvrage, propriétaire ou représentant dûment mandaté est habilité à demander le droit d'usage du bloc-marque « BBCA Neuf — délivré par CERTIVEA » pour son opération.</p><p>Le demandeur peut aussi <strong>poser des questions techniques</strong> à CERTIVEA (interprétation des critères) ou <strong>proposer des principes d'équivalence</strong> — une méthode alternative basée sur d'autres critères mais répondant à l'enjeu de l'exigence (validation obligatoire par l'Association BBCA).</p>"
          }
        ]
      },
      {
        name: "Comparaison avec BREEAM et HQE",
        items: [
          {
            title: "Tableau comparatif",
            content: "<table><thead><tr><th></th><th>BBCA Neuf</th><th>BREEAM v7 / HQE BD v4.1</th></tr></thead><tbody><tr><td><strong>Approche</strong></td><td>Monocritère carbone</td><td>Multicritère (énergie, santé, eau, matériaux, gestion, déchets, transports, biodiversité, pollution…)</td></tr><tr><td><strong>Indicateur final</strong></td><td>Eges projet en kg CO<sub>2</sub>/m² sur 50 ans</td><td>Score global pondéré entre catégories</td></tr><tr><td><strong>Méthode</strong></td><td>ACV bâtiment selon E+C- / RE 2020 + modulations BBCA</td><td>Grille de crédits avec preuves documentaires</td></tr><tr><td><strong>Outil principal</strong></td><td>Logiciel ACV (Elodie, COMETH, OneClickLCA)</td><td>Outil AMO Quality Environnement, suivi par crédit</td></tr><tr><td><strong>Acteur central</strong></td><td>BET ACV</td><td>AMO QE</td></tr><tr><td><strong>Niveaux</strong></td><td>Standard / Performance / Excellence</td><td>BREEAM : Pass → Outstanding<br>HQE : 1 → 6 étoiles</td></tr><tr><td><strong>Accréditation COFRAC</strong></td><td>Hors COFRAC</td><td>BREEAM : agréé BRE Global<br>HQE : accrédité par CERTIVEA</td></tr></tbody></table>"
          },
          {
            title: "Pourquoi BBCA n'est pas une grille AMO QE classique",
            content: "<p>BBCA ne se « remplit » pas dans une interface comme on coche des crédits BREEAM ou HQE. Il <strong>importe le résultat d'une ACV</strong> (faite dans Elodie, COMETH ou équivalent) et lui applique une couche méthodologique propre (modulations, prérequis, score, niveaux). C'est un outil <strong>d'ingénieur ACV</strong>, pas un référentiel de qualité environnementale globale.</p>"
          },
          {
            title: "Quand cumuler BBCA avec BREEAM ou HQE ?",
            content: "<p>BBCA est souvent ajouté à un projet qui vise déjà BREEAM ou HQE pour <strong>valoriser explicitement la démarche bas carbone</strong> du projet, qui est noyée parmi d'autres thématiques. C'est aussi un argument de différenciation immobilière. CERTIVEA propose la combinaison via des « demandes multi-produits ».</p>"
          }
        ]
      }
    ]
  },

  {
    tab: "Périmètre",
    title: "Périmètre et typologies couvertes",
    subtitle: "Champ d'application, plafonds Eges max et niveaux de performance",
    groups: [
      {
        name: "Champ d'application",
        items: [
          {
            title: "Périmètre du label",
            content: "<p>Le périmètre du label correspond à celui du <strong>permis de construire</strong> et comprend :</p><ul><li>le bâtiment et sa parcelle ;</li><li>la <strong>déconstruction des constructions existantes</strong> s'il y a lieu ;</li><li>l'ensemble des consommations d'énergie sur la phase exploitation (postes RT et hors RT) ;</li><li>la consommation d'eau, le chantier, les produits de construction et les équipements.</li></ul><p>La <strong>période d'étude de référence</strong> est conventionnellement de <strong>50 ans</strong>. L'indicateur retenu est le <strong>kg équivalent CO<sub>2</sub> par m² de SDP</strong> (Surface De Plancher).</p>"
          },
          {
            title: "Typologies admissibles",
            content: "<p>Dans la version V3.2, le label BBCA Neuf s'applique aux opérations situées en <strong>France métropolitaine</strong> (ou hors métropole sur principes d'équivalence validés par l'Association BBCA), pour les typologies suivantes :</p><ul><li>Bâtiments à usage de <strong>bureaux</strong> de type Code du travail ;</li><li>Bâtiments <strong>résidentiels collectifs</strong> ;</li><li><strong>Hôtels</strong> (hors village vacances), introduits dans la V3.2 avec un raisonnement à la chambre ;</li><li><strong>Enseignement primaire et secondaire</strong> (cohérence avec la RE 2020) ;</li><li>Autres bâtiments soumis à la RT (hors maison individuelle).</li></ul>"
          },
          {
            title: "Spécificité des hôtels",
            content: "<p>Pour un actif hôtelier, un <strong>raisonnement à la chambre</strong> s'est imposé naturellement comme l'indicateur habituel de pilotage de ce type d'actif. Les calculs sont effectués en m² SDP en cohérence avec les autres usages, mais le <strong>seuil d'émissions globales est fixé en kg CO<sub>2</sub>/chambre</strong>.</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:18px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Surface moyenne d'une chambre\">S<sub style=\"font-size:11px;\">moy</sub></span> = <span class=\"formula-var\" data-tooltip=\"Surface De Plancher du bâtiment\">SDP</span> / <span class=\"formula-var\" data-tooltip=\"Nombre de chambres de l'hôtel\">N<sub style=\"font-size:11px;\">chambres</sub></span></span></div>"
          },
          {
            title: "Cas d'un ouvrage réalisé par un tiers",
            content: "<p>Lorsque le projet immobilier prévoit l'utilisation d'un ouvrage réalisé en dehors de la parcelle et sous la responsabilité d'un tiers (par exemple : places de stationnement dans un parking public à proximité), cet ouvrage doit être <strong>exclu du périmètre du label</strong> et du calcul du coefficient M<sub>Stationnement</sub>.</p><p>Les démarches de mutualisation sont en revanche valorisées par des Points Innovation Climat (voir onglet Méthode).</p>"
          },
          {
            title: "Cas mixte Neuf — Rénovation",
            content: "<ul><li>Si la <strong>surface neuve est inférieure à 150 m²</strong> : il est possible de déclarer un seul objet en rénovation.</li><li>Si la <strong>surface neuve est supérieure à 150 m²</strong> : il faut faire obligatoirement <strong>2 demandes de label</strong> (BBCA Neuf + BBCA Rénovation).</li></ul>"
          },
          {
            title: "Délai de demande",
            content: "<p>La demande de labellisation doit être déposée <strong>au plus tard 6 mois après l'achèvement des travaux</strong>, caractérisé par le procès-verbal de réception de la totalité des lots de l'opération.</p><p>Note : les versions du référentiel BBCA Neuf antérieures à la V4.1 relèvent du Label Énergie Carbone et non des présentes règles de labélisation v1.0 de Certivea.</p>"
          }
        ]
      },
      {
        name: "Plafonds Eges max",
        items: [
          {
            title: "Tableau des plafonds par typologie",
            content: "<p>Les plafonds Eges max sont définis pour chaque typologie. Le bâtiment doit respecter <strong>simultanément</strong> :</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:17px;font-weight:700;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Émissions du projet en kg CO₂ éq/m² SDP sur 50 ans\">Eges<sub style=\"font-size:11px;\">projet</sub></span> ≤ <span class=\"formula-var\" data-tooltip=\"Plafond Eges max selon typologie\">Eges<sub style=\"font-size:11px;\">max</sub></span> &nbsp;&nbsp;<span style=\"color:#94A3B8;\">et</span>&nbsp;&nbsp; <span class=\"formula-var\" data-tooltip=\"Émissions PCE du projet avec modulations BBCA\">Eges PCE<sub style=\"font-size:11px;\">BBCA projet</sub></span> ≤ <span class=\"formula-var\" data-tooltip=\"Plafond Eges PCE max selon typologie\">Eges PCE<sub style=\"font-size:11px;\">max</sub></span></span></div><table><thead><tr><th>Typologie</th><th>Eges max (kg CO<sub>2</sub>/m² SDP / 50 ans)</th><th>Eges PCE max</th></tr></thead><tbody><tr><td>Bâtiments collectifs d'habitation</td><td><strong>1 150</strong></td><td>650</td></tr><tr><td>Bâtiments à usage de bureau</td><td><strong>1 250</strong></td><td>900</td></tr><tr><td>Autres bâtiments soumis à la RT</td><td><strong>1 250</strong></td><td>900</td></tr><tr><td>Hôtels</td><td>Formule à la chambre (28 t CO<sub>2</sub>/chambre médian)</td><td>800</td></tr></tbody></table>"
          },
          {
            title: "Cas particulier des hôtels",
            content: "<p>BBCA souhaite valoriser la mise en œuvre de pratiques bas carbone exemplaires <em>dans toutes les catégories</em> (étoiles) et encourager un « haut de gamme raisonnable ». Le seuil de base est défini pour un hôtel <strong>3 étoiles</strong> avec une surface de chambre de <strong>28 m²</strong>. Pour le très grand luxe (palaces), le seuil est bridé à un niveau équivalent à une chambre de <strong>70 m²</strong>.</p><p style=\"color:#475569;font-size:13px;margin-bottom:6px;\"><strong>Si classification ≤ 3 étoiles :</strong></p><div style=\"text-align:center;margin:8px 0 18px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:17px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Plafond Eges max BBCA pour hôtel\">Eges max<sub style=\"font-size:11px;\">hôtel</sub></span> = ( <span class=\"formula-var\" data-tooltip=\"Surface moyenne d'une chambre en m²\">S<sub style=\"font-size:11px;\">moy</sub></span> × 800 + 200 × 28 ) / 1000</span></div><p style=\"color:#475569;font-size:13px;margin-bottom:6px;\"><strong>Si classification &gt; 3 étoiles et S<sub>moy</sub> ≤ 70 m² :</strong></p><div style=\"text-align:center;margin:8px 0 18px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:17px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Plafond Eges max BBCA pour hôtel\">Eges max<sub style=\"font-size:11px;\">hôtel</sub></span> = <span class=\"formula-var\" data-tooltip=\"Surface moyenne d'une chambre en m²\">S<sub style=\"font-size:11px;\">moy</sub></span> × 1000 × 0,8 / 1000</span></div><p style=\"color:#475569;font-size:13px;margin-bottom:6px;\"><strong>Si classification &gt; 3 étoiles et S<sub>moy</sub> &gt; 70 m² (palace) :</strong></p><div style=\"text-align:center;margin:8px 0 18px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:17px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Plafond Eges max BBCA pour hôtel\">Eges max<sub style=\"font-size:11px;\">hôtel</sub></span> = 56 t CO<sub style=\"font-size:11px;\">2</sub> / chambre</span></div><p>Note : le seuil pour la catégorie « Autres bâtiments soumis à la RT » a été établi sur peu de références ; il pourra être révisé dans les futures versions du référentiel.</p>"
          }
        ]
      },
      {
        name: "Niveaux de performance",
        items: [
          {
            title: "Les trois niveaux",
            content: "<table><thead><tr><th>Niveau</th><th>Score requis</th><th>Description</th></tr></thead><tbody><tr><td><strong>BBCA Standard</strong></td><td>Score ≥ 0</td><td>Bâtiments qui font de réels efforts de limitation de leurs émissions globales tant sur la phase construction que sur l'exploitation, et qui peuvent intégrer le stockage carbone dans leurs systèmes constructifs.</td></tr><tr><td><strong>BBCA Performance</strong></td><td>Score ≥ 15</td><td>Valorise les bâtiments qui font des efforts supplémentaires par rapport à BBCA Standard sur la construction et l'exploitation. Des points Innovation Climat contribuent également à l'atteinte de ce niveau.</td></tr><tr><td><strong>BBCA Excellence</strong></td><td>Score ≥ 30</td><td>Valorise les bâtiments qui font des efforts particulièrement importants et vont au-delà du niveau BBCA Performance. C'est l'<em>excellence en termes de Construction Bas Carbone</em>.</td></tr></tbody></table><p>Le label BBCA est délivré pour les 3 niveaux <strong>au stade Conception</strong> (label provisoire) et <strong>à la Réalisation</strong> (label définitif).</p>"
          },
          {
            title: "Prérequis non négociables",
            content: "<p>Les seuils de score ne peuvent être atteints que <strong>si les prérequis suivants sont respectés</strong> :</p><ul><li><strong>Tertiaire</strong> : niveau Énergie 1 (E1) <em>et</em> Carbone 1 (C1) selon E+C-.</li><li><strong>Résidentiel collectif</strong> : niveau Carbone 1 (C1) obligatoire ; niveau Énergie 1 recommandé mais <em>RT 2012 accepté par dérogation</em>.</li><li>Eges projet ≤ Eges max (plafond global de la typologie).</li><li>Eges PCE BBCA projet ≤ Eges PCE max.</li></ul>"
          }
        ]
      }
    ]
  },

  {
    tab: "Méthode",
    title: "Méthode de calcul",
    subtitle: "Formule du score, modulations BBCA spécifiques et points Innovation Climat",
    groups: [
      {
        name: "Calcul du score",
        items: [
          {
            title: "Évaluation en deux étapes",
            content: "<ol><li><strong>Étape 1 — Émissions de GES et stockage carbone</strong> : calcul des émissions par contributeur (Déconstruction, PCE, Chantier, Eau, Énergie) et soustraction du stockage carbone biogénique.</li><li><strong>Étape 2 — Innovation Climat</strong> : ajout de points pour les démarches d'économie circulaire et d'optimisation énergétique non comptabilisées dans l'ACV.</li></ol><p>Le calcul s'appuie sur la <strong>méthode E+C-</strong> (préfiguratrice de la RE 2020) et utilise les <strong>FDES</strong> de la base INIES.</p>"
          },
          {
            title: "Formule centrale Eges projet",
            content: "<p>Le bâtiment doit présenter des émissions totales <strong>inférieures ou égales</strong> au plafond Eges max de sa typologie. La formule complète d'agrégation est :</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:16px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;line-height:2;\"><span class=\"formula-var\" data-tooltip=\"Émissions totales du projet en kg CO₂/m² SDP sur 50 ans\">Eges<sub style=\"font-size:11px;\">projet</sub></span> = <span class=\"formula-var\" data-tooltip=\"Émissions liées à la déconstruction préalable\">Eges<sub style=\"font-size:11px;\">déconstruction</sub></span> + <span class=\"formula-var\" data-tooltip=\"Émissions PCE avec modulations BBCA\">Eges PCE<sub style=\"font-size:11px;\">BBCA projet</sub></span> + <span class=\"formula-var\" data-tooltip=\"Forfait pour bâtiment livré nu (lots 5 et 7)\">Eges<sub style=\"font-size:11px;\">livré en blanc</sub></span><br>+ <span class=\"formula-var\" data-tooltip=\"Émissions énergie sur 50 ans avec modulation mBBCA\">Eges<sub style=\"font-size:11px;\">énergie BBCA</sub></span> + <span class=\"formula-var\" data-tooltip=\"Émissions du chantier de construction\">Eges<sub style=\"font-size:11px;\">chantier</sub></span> + <span class=\"formula-var\" data-tooltip=\"Émissions liées à la consommation d'eau\">Eges<sub style=\"font-size:11px;\">eau</sub></span> + <span class=\"formula-var\" data-tooltip=\"Carbone biogénique stocké (valeur négative)\">Stockage Carbone</span></span></div>"
          },
          {
            title: "Formule du score BBCA",
            content: "<p>Plus le projet est <strong>sous le plafond</strong>, plus il marque de points carbone. Les Points Innovation Climat (max 10) viennent compléter.</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:18px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Score global BBCA du projet\">Score BBCA</span> = ( <span class=\"formula-var\" data-tooltip=\"Plafond Eges max selon typologie\">Eges<sub style=\"font-size:11px;\">max</sub></span> − <span class=\"formula-var\" data-tooltip=\"Émissions totales du projet\">Eges<sub style=\"font-size:11px;\">projet</sub></span> ) / 10 + <span class=\"formula-var\" data-tooltip=\"Points Innovation Climat (plafonné à 10)\">Points<sub style=\"font-size:11px;\">IC</sub></span></span></div>"
          },
          {
            title: "Contributeur PCE — 14 lots E+C-",
            content: "<p>14 lots de la nomenclature E+C- sont considérés. Les <strong>5 premiers lots représentent ~80 % du poids carbone</strong> d'un bâtiment et doivent être traités en priorité :</p><ol><li><strong>Lot 03</strong> — Superstructure et maçonnerie (~40 % en résidentiel, 28 % en bureaux)</li><li><strong>Lot 02</strong> — Fondations et infrastructures (~15-16 %)</li><li><strong>Lot 06</strong> — Façades et menuiseries extérieures (~9-13 %)</li><li><strong>Lot 08</strong> — CVC : chauffage, ventilation, refroidissement, ECS (~5-15 %)</li><li><strong>Lot 07</strong> — Revêtements sols/murs/plafonds, chape, peintures, décoration (~7-20 %)</li></ol>"
          },
          {
            title: "Contributeur Énergie",
            content: "<p>S'adosse à la méthode RT 2012 (ou RE 2020 selon la typologie) pour les usages réglementés (chauffage, refroidissement, ECS, auxiliaires, éclairage), et à la méthode E+C- pour les usages non réglementés (CAUE).</p><p>Le contenu CO<sub>2</sub> des énergies est fixé par le ministère et inscrit dans la <strong>Base Carbone</strong>, en cohérence avec la méthode E+C-.</p>"
          },
          {
            title: "Stockage carbone biogénique",
            content: "<p>Le stockage carbone reprend la valeur du carbone biogénique inscrite dans les FDES, calculée conformément à la <strong>norme EN 16 449</strong>. La somme à l'échelle du bâtiment constitue le « stockage carbone » du projet, à intégrer dans le calcul de l'Eges projet en valeur <strong>négative</strong> (émissions évitées).</p><p>L'indicateur Stockage Carbone ne concerne que les <strong>matières d'origine biosourcée</strong> dont l'origine est labellisée (FSC, PEFC ou autres labels attestant d'une gestion durable). Il se calcule sur les lots 1 à 7.</p>"
          }
        ]
      },
      {
        name: "Modulations BBCA spécifiques",
        items: [
          {
            title: "M_stationnement",
            content: "<p>La réalisation de surfaces de stationnement répond souvent à une <strong>obligation réglementaire</strong>. En zones urbaines denses, ces surfaces peuvent représenter <strong>jusqu'à 20 %</strong> de l'empreinte carbone d'un projet.</p><p>Le coefficient M<sub>park</sub> de la méthode E+C- étant sous-évalué selon les retours d'expérience BBCA, l'Association autorise une modulation BBCA dédiée :</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:18px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Modulation BBCA pour les surfaces de stationnement\">M<sub style=\"font-size:11px;\">stationnement</sub></span> = ( <span class=\"formula-var\" data-tooltip=\"Surface clos couverte affectée au stationnement (VL, 2 roues, vélos, manœuvre)\">S<sub style=\"font-size:11px;\">stationnement</sub></span> × 170 ) / <span class=\"formula-var\" data-tooltip=\"Surface De Plancher du bâtiment\">SDP</span></span></div><p><strong>Plafonds</strong> du ratio Surface_stationnement / SDP : <strong>40 %</strong> en résidentiel et hôtel, <strong>30 %</strong> en tertiaire.</p>"
          },
          {
            title: "M_agrément extérieur",
            content: "<p>Permet de valoriser les <strong>balcons, loggias, terrasses en épannelage et coursives en débord</strong> (hors toiture-terrasse) qui sont des m² productifs participant à la qualité d'usage.</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:18px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Modulation BBCA pour les surfaces d'agrément extérieur\">M<sub style=\"font-size:11px;\">agrément</sub></span> = ( <span class=\"formula-var\" data-tooltip=\"Surface d'agrément extérieur (balcons, loggias, terrasses, coursives)\">S<sub style=\"font-size:11px;\">agrément</sub></span> × 200 ) / <span class=\"formula-var\" data-tooltip=\"Surface De Plancher du bâtiment\">SDP</span></span></div><p><strong>Limites :</strong></p><ul><li><strong>Logement</strong> : 4 m² &lt; surface d'agrément extérieur &lt; 10 m² par logement (calcul cumulatif pour l'immeuble) ;</li><li><strong>Tertiaire et hôtel</strong> : 15 % SDP.</li></ul><p>Si une contrainte d'urbanisme locale est plus contraignante, elle prévaut sur la limite de modulation.</p>"
          },
          {
            title: "Forfait fondations spéciales",
            content: "<p>Les fondations spéciales nécessaires à la consolidation d'un mauvais sol ne sont pas du choix de la maîtrise d'ouvrage et peuvent peser pour <strong>~10 % des émissions Eges PCE</strong> (~65 kg CO<sub>2</sub>/m² SDP).</p><p>BBCA permet d'utiliser un <strong>forfait carbone de 40 kg CO<sub>2</sub>/m² SDP</strong> sur le sous-lot 2.1 partiel (fondations + comblements de carrière) si le calcul réel dépasse ce forfait :</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:16px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;line-height:2;\">Si <span class=\"formula-var\" data-tooltip=\"Indicateur du sous-lot 2.1 partiel calculé en ACV\">I<sub style=\"font-size:11px;\">2.1 calculé</sub></span> ≤ 40 kg CO<sub>2</sub>/m² SDP : <span class=\"formula-var\" data-tooltip=\"Valeur retenue pour le calcul\">I<sub style=\"font-size:11px;\">2.1 retenu</sub></span> = <span class=\"formula-var\" data-tooltip=\"Indicateur calculé en ACV\">I<sub style=\"font-size:11px;\">2.1 calculé</sub></span><br>Si <span class=\"formula-var\" data-tooltip=\"Indicateur du sous-lot 2.1 partiel calculé en ACV\">I<sub style=\"font-size:11px;\">2.1 calculé</sub></span> &gt; 40 kg CO<sub>2</sub>/m² SDP : <span class=\"formula-var\" data-tooltip=\"Valeur retenue pour le calcul\">I<sub style=\"font-size:11px;\">2.1 retenu</sub></span> = 40 kg CO<sub>2</sub>/m² SDP</span></div><p><strong>Périmètre :</strong> ouvrages de fondations situés sous l'arase supérieure de la dalle basse + comblements de carrières. Sont exclus : parois moulées au-dessus de la dalle basse.</p>"
          },
          {
            title: "Bâtiment livré en blanc (bureaux)",
            content: "<p>Lorsqu'un bâtiment de bureaux est livré nu (aménagement par le preneur), BBCA impose des <strong>valeurs forfaitaires</strong> (HQE Performance 9<sup>e</sup> décile) pour les lots 5 et 7 afin d'avoir un bilan complet :</p><table><thead><tr><th>Cas</th><th>Lot 05 — Cloisonnement, doublage, menuiseries int.</th><th>Lot 07 — Revêtements, chape, peintures, décoration</th></tr></thead><tbody><tr><td>Cas 1 — Bureaux sans cloisonnement</td><td>67 kg CO<sub>2</sub>/m² SDP</td><td>—</td></tr><tr><td>Cas 2 — Bureaux sans second œuvre</td><td>67 kg CO<sub>2</sub>/m² SDP</td><td>107 kg CO<sub>2</sub>/m² SDP</td></tr></tbody></table><p>La mention « Livré en blanc » apparaît sur l'attestation Certivea délivrée.</p>"
          },
          {
            title: "Titre V BBCA — Ouvrages particuliers",
            content: "<p>Pour les ouvrages particuliers non couverts par les modulations standard, une <strong>sollicitation de dérogation</strong> peut être adressée à la Commission Technique de l'Association BBCA, à condition que les émissions de l'ouvrage <strong>excèdent 5 % de l'Eges PCE</strong> du projet. Cas applicables :</p><ul><li>adaptation aux contraintes géotechniques ou morphologiques (hors fondations spéciales) ;</li><li>adaptation aux exigences d'une zone PPRI ;</li><li>création d'un ouvrage à destination plus large que celui des bâtiments faisant l'objet de la demande (mutualisation) ;</li><li>couverture d'ouvrages particuliers.</li></ul><p>La Commission Technique se réunit pour étudier et statuer dans un <strong>délai de 2 mois maximum</strong>.</p>"
          }
        ]
      },
      {
        name: "Innovation Climat",
        items: [
          {
            title: "Déconstruction sélective in-situ",
            content: "<p>Le retour d'expérience terrain montre qu'une déconstruction sélective in-situ (plutôt qu'externalisée vers une plateforme) demande un effort supplémentaire à l'entreprise et au MOA, mais renvoie un <strong>taux de valorisation des déchets plus réaliste</strong> et permet de pérenniser les filières de recyclage.</p><p><strong>1 point</strong> est attribué si :</p><ul><li>un <strong>diagnostic ressources</strong> a été réalisé ;</li><li>des <strong>exigences spécifiques de dépose méthodique</strong> ont été intégrées dans le DCE.</li></ul>"
          },
          {
            title: "Réemploi de produits",
            content: "<p>Les produits réemployés sont déjà valorisés dans l'ACV (émissions considérées comme nulles). En complément, des points Innovation Climat sont attribués selon la masse réemployée :</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:17px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Points Innovation Climat pour le réemploi\">Point IC<sub style=\"font-size:11px;\">réemploi</sub></span> = <span class=\"formula-var\" data-tooltip=\"Masse de produits/équipements réemployés en kg\">m<sub style=\"font-size:11px;\">réemployés</sub></span> / ( <span class=\"formula-var\" data-tooltip=\"Surface De Plancher du bâtiment\">SDP</span> × 5 )</span></div><p>Soit <strong>1 point pour 5 kg/m² SDP</strong> de matériau réemployé. Le mode de preuve est un <strong>bordereau de suivi</strong> attestant de l'origine du produit et de sa mise en œuvre réelle sur le chantier.</p>"
          },
          {
            title: "Mutualisation des espaces",
            content: "<p><strong>Mutualisation des parkings</strong> — points calculés à partir des places évitées :</p><div style=\"text-align:center;margin:12px 0 18px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:17px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Points Innovation Climat pour la mutualisation des parkings\">Point IC<sub style=\"font-size:11px;\">parking mutualisé</sub></span> = ( <span class=\"formula-var\" data-tooltip=\"Surface de stationnement évitée par la mutualisation, en m²\">S<sub style=\"font-size:11px;\">évitée</sub></span> × 170 ) / ( 10 × <span class=\"formula-var\" data-tooltip=\"Surface De Plancher du bâtiment\">SDP</span> )</span></div><p>La forme juridique choisie doit garantir une mutualisation de <strong>long terme (minimum 10 ans)</strong>.</p><p><strong>Mutualisation d'autres espaces</strong> (salles de réunion, etc.) :</p><div style=\"text-align:center;margin:12px 0 18px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:16px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Points Innovation Climat pour la mutualisation d'espaces\">Point IC<sub style=\"font-size:11px;\">mutualisation</sub></span> = ( <span class=\"formula-var\" data-tooltip=\"Émissions PCE du projet\">Eges PCE</span> × <span class=\"formula-var\" data-tooltip=\"Surface complémentaire équivalente liée à la mutualisation\">S<sub style=\"font-size:11px;\">complémentaire éq.</sub></span> ) / ( 10 × <span class=\"formula-var\" data-tooltip=\"Surface De Plancher du bâtiment\">SDP</span> )</span></div><p>Soit <strong>1 point pour 10 kg d'émissions évitées par m² SDP</strong>.</p>"
          },
          {
            title: "Potentiel de changement d'usage",
            content: "<p>Vise à augmenter la durée de vie du bâtiment en permettant une transformation plutôt qu'une démolition-reconstruction :</p><ul><li><strong>1 point</strong> si le principe d'évolution a été défini (par exemple : passage logements → bureaux) ;</li><li><strong>2 points</strong> si le dimensionnement de l'ouvrage et de ses composants intègre cette évolution ;</li><li><strong>3 points</strong> si un dossier complet décrivant le process de changement d'usage a été défini.</li></ul><p>Si le changement d'usage ne porte que sur une partie des surfaces, les points sont attribués <strong>au prorata</strong>.</p>"
          },
          {
            title: "Potentiel d'extension",
            content: "<p>Le dimensionnement du bâtiment permet de rajouter une extension horizontale ou verticale, et les dispositions constructives sont définies pour anticiper cette évolution :</p><div style=\"text-align:center;margin:16px 0;padding:18px 24px;background:#f8f9fa;border-radius:8px;border:1px solid #e2e8f0;\"><span style=\"font-size:18px;font-weight:700;font-style:italic;font-family:serif;letter-spacing:0.5px;\"><span class=\"formula-var\" data-tooltip=\"Points Innovation Climat pour le potentiel d'extension\">Point IC<sub style=\"font-size:11px;\">extension</sub></span> = min ( 10 × <span class=\"formula-var\" data-tooltip=\"Surface complémentaire potentielle d'extension\">S<sub style=\"font-size:11px;\">complémentaire</sub></span> / <span class=\"formula-var\" data-tooltip=\"Surface De Plancher du bâtiment\">SDP</span> , 3 )</span></div><p>Soit <strong>1 point chaque fois que l'extension permet d'augmenter la surface de 10 %</strong>, plafonné à 3 points.</p>"
          },
          {
            title: "SED, Commissionnement, Sensibilisation",
            content: "<table><thead><tr><th>Démarche</th><th>Tertiaire</th><th>Logement</th></tr></thead><tbody><tr><td><strong>Simulation Énergétique Dynamique (SED)</strong> en phase conception</td><td>1 pt</td><td>—</td></tr><tr><td><strong>Mission de commissionnement</strong> par tierce partie</td><td>1 pt</td><td>1 pt</td></tr><tr><td><strong>Sensibilisation des usagers</strong></td><td>1 pt</td><td>1 pt</td></tr></tbody></table><p>Conditions :</p><ul><li><strong>SED</strong> : logiciel adapté, scénario réaliste, prise en compte des postes non réglementaires.</li><li><strong>Commissionnement</strong> : couvre tous les systèmes énergétiques, test d'étanchéité à l'air enveloppe + réseaux aérauliques, plan + rapport documentés, réalisé par tierce partie.</li><li><strong>Sensibilisation</strong> : périmètre min éclairage/chauffage/rafraîchissement/informatique, justifié par attestation/feuille de présence, livret ou support documenté.</li></ul><p>Le total Innovation Climat est plafonné à <strong>10 points</strong>.</p>"
          }
        ]
      }
    ]
  },

  {
    tab: "Process",
    title: "Processus de labellisation Certivea",
    subtitle: "Phase Conception, phase Réalisation, dossier d'évaluation et acteurs mobilisés",
    groups: [
      {
        name: "Phase Conception",
        items: [
          {
            title: "Étapes de la phase Conception",
            content: "<p>La phase Conception se déroule à la fin de la phase DCE et avant le démarrage des travaux. Vérification documentaire uniquement.</p><ol><li>Le <strong>Demandeur</strong> constitue le dossier d'évaluation et le dépose sur l'espace SharePoint dédié à l'opération.</li><li><strong>CERTIVEA</strong> vérifie la complétude du dossier, organise et notifie la vérification.</li><li>Le <strong>Vérificateur</strong> réalise la vérification documentaire et envoie son rapport provisoire <strong>sous 4 semaines</strong>, incluant points sensibles et écarts à lever.</li><li>Le <strong>Demandeur</strong> répond aux écarts en apportant les preuves du respect des exigences.</li><li>Le <strong>Vérificateur</strong> rédige et envoie son rapport définitif à CERTIVEA.</li><li><strong>CERTIVEA</strong> prononce la décision : délivre l'attestation provisoire (valable jusqu'à la phase Réalisation), ou demande un complément de preuve.</li></ol>"
          },
          {
            title: "Outils de la candidature",
            content: "<p>Le dossier d'évaluation comprend impérativement :</p><ul><li>la <strong>calculette BBCA</strong> (Excel) dûment complétée — disponible sur le site de l'Association BBCA ;</li><li>la <strong>note d'accompagnement ACV</strong> et l'export complet de l'étude (Elodie / COMETH) ;</li><li>la liste des FDES utilisées avec justifications des équivalences ;</li><li>la note thermique RT 2012 / RE 2020 (Bbio, Cep, vérification E1 et C1) ;</li><li>plans architecte et DCE des lots à fort impact carbone ;</li><li>justifications des modulations utilisées (Mstationnement, Magrément, fondations spéciales, livré en blanc, Titre V).</li></ul>"
          },
          {
            title: "Sortie : attestation provisoire",
            content: "<p>La décision favorable conduit à l'attribution d'une <strong>attestation provisoire</strong>, valable jusqu'à la phase Réalisation. Elle confirme l'engagement bas carbone du projet en phase conception.</p><p>En cas d'écarts non levés, CERTIVEA peut demander un complément de preuve avant décision.</p>"
          }
        ]
      },
      {
        name: "Phase Réalisation",
        items: [
          {
            title: "Étapes de la phase Réalisation",
            content: "<p>La phase Réalisation se déroule après la réception des travaux et avant l'expiration de la garantie de parfait achèvement. Vérification <strong>sur site + documentaire</strong>.</p><ol><li>Le <strong>Demandeur</strong> met à jour le dossier d'évaluation (avec données réelles, bons de livraison, factures) et le dépose sur SharePoint.</li><li><strong>CERTIVEA</strong> vérifie la complétude, sélectionne un vérificateur, organise et notifie la vérification.</li><li>Le <strong>Vérificateur</strong> réalise la <strong>visite sur site</strong> et la vérification documentaire ; il envoie son rapport provisoire <strong>sous 4 semaines</strong>, incluant points forts et écarts à lever.</li><li>Le <strong>Demandeur</strong> répond aux écarts en apportant les preuves.</li><li>Le <strong>Vérificateur</strong> rédige et envoie son rapport définitif.</li><li><strong>CERTIVEA</strong> délivre l'attestation valable <strong>1 an</strong>, ou demande un complément de preuve.</li></ol>"
          },
          {
            title: "Visite sur site et collecte des preuves",
            content: "<p>L'insistance forte de Certivea porte sur les <strong>bons de livraison et factures justifiant les quantitatifs réels</strong> mis en œuvre. La collecte rigoureuse de ces pièces doit être organisée dès le début du chantier.</p><p>La visite sur site permet au vérificateur de constater l'adéquation entre les hypothèses Conception et la réalité du chantier (matériaux mis en œuvre, équipements installés, dispositions constructives).</p>"
          },
          {
            title: "Sortie : attestation 1 an",
            content: "<p>La décision favorable conduit à l'attribution d'une <strong>attestation définitive valable 1 an</strong>. Elle atteste de la performance bas carbone effectivement réalisée du bâtiment.</p><p>Note : si la vérification de fin de phase Conception n'a pu être réalisée en phase avec le planning du projet, celle-ci est <strong>fusionnée avec la vérification en fin de phase Réalisation</strong>, sans ouvrir droit à une demande de modification de l'offre tarifaire.</p>"
          }
        ]
      },
      {
        name: "Personnes mobilisées",
        items: [
          {
            title: "Vérification sur site",
            content: "<p>La vérification sur site mobilise les personnes suivantes :</p><ul><li><strong>AMO</strong> (Assistance à Maîtrise d'Ouvrage) ;</li><li>représentant du <strong>MOA</strong> (Maître d'Ouvrage) ;</li><li>représentant du <strong>BET Thermique</strong> ;</li><li>représentant du <strong>BET ACV</strong>.</li></ul><p>Ces acteurs accompagnent le vérificateur lors de sa visite, présentent l'opération et apportent les éléments de preuve nécessaires à la vérification documentaire associée.</p>"
          }
        ]
      }
    ]
  },

  {
    tab: "Ressources",
    title: "Ressources et liens utiles",
    subtitle: "Sites officiels, données environnementales, méthode E+C-, réglementation et autres référentiels BBCA",
    groups: [
      {
        name: "Sites officiels",
        items: [
          {
            title: "Liens institutionnels",
            content: "<ul><li><strong>Association BBCA</strong> (référentiels, calculettes, actualités) : <a href=\"https://www.batimentbascarbone.org\" target=\"_blank\">www.batimentbascarbone.org</a></li><li><strong>CERTIVEA</strong> (organisme certificateur, demande de labellisation) : <a href=\"https://www.certivea.fr\" target=\"_blank\">www.certivea.fr</a></li><li><strong>Carte des opérations labellisées BBCA</strong> : <a href=\"https://certimap.certivea.fr\" target=\"_blank\">certimap.certivea.fr</a></li></ul>"
          }
        ]
      },
      {
        name: "Données environnementales",
        items: [
          {
            title: "Base INIES et configurateurs",
            content: "<ul><li><strong>Base INIES</strong> (FDES de produits de construction, PEP, configurateurs) : <a href=\"https://www.inies.fr\" target=\"_blank\">www.inies.fr</a></li><li>Configurateurs autorisés par BBCA : DE Bois, BETie, SAVE, Environnement IB</li><li>Validité d'une FDES sous norme NF EN 15 804 : <strong>5 ans</strong></li></ul>"
          }
        ]
      },
      {
        name: "Méthode E+C-",
        items: [
          {
            title: "Référentiel Énergie-Carbone",
            content: "<ul><li>Référentiel <strong>« Énergie-Carbone »</strong> pour les bâtiments neufs (méthode d'évaluation) : <a href=\"http://www.batiment-energiecarbone.fr/\" target=\"_blank\">www.batiment-energiecarbone.fr</a></li><li>Niveaux de performance E+C- (E1-E4, C1-C2)</li></ul>"
          }
        ]
      },
      {
        name: "Réglementation",
        items: [
          {
            title: "RE 2020 et autres textes",
            content: "<ul><li><strong>RE 2020</strong> (Réglementation Environnementale 2020) — entrée en vigueur en 2022 pour les constructions neuves, issue de l'expérimentation E+C-</li><li><strong>Loi de transition énergétique pour la croissance verte</strong> (LTECV, août 2015) — encourage l'utilisation des matériaux biosourcés (Art. L. 111-11-3)</li><li><strong>Stratégie Nationale Bas Carbone</strong> (SNBC) — objectif neutralité carbone à l'horizon 2050</li></ul>"
          }
        ]
      },
      {
        name: "Décrets et normes",
        items: [
          {
            title: "Textes cités dans le référentiel",
            content: "<ul><li>Décret n° 2011-610 du 31 mai 2011 — diagnostic déchets pour les démolitions &gt; 1 000 m²</li><li>Norme <strong>EN 16 449</strong> — calcul du carbone biogénique des matériaux biosourcés</li><li>Norme <strong>NF EN 15 804+A2</strong> — règles de catégories de produits pour les FDES</li><li>Article L. 331-10 du Code de l'Urbanisme — définition de la surface de construction</li></ul>"
          }
        ]
      },
      {
        name: "Autres référentiels BBCA",
        items: [
          {
            title: "Famille BBCA complète",
            content: "<ul><li><strong>BBCA Neuf v4.1</strong> — version compatible RE 2020 (résidentiel collectif, bureaux, enseignement)</li><li><strong>BBCA Neuf v4.1 + Option Contribution Neutralité</strong> — pour aller au-delà du label, vers la neutralité carbone du projet</li><li><strong>BBCA Rénovation v1.1</strong> — pour les opérations de rénovation lourde ou thermique de bureaux</li><li><strong>BBCA Exploitation v1.1</strong> — pour valoriser une exploitation bas carbone d'un actif (bureaux, résidentiel, hôtel)</li><li><strong>BBCA Quartier</strong> — pour les opérations d'aménagement à l'échelle d'un quartier</li></ul>"
          }
        ]
      }
    ]
  }

];

if (typeof window !== 'undefined') {
  window.BBCA_NEUF_FONCT_PARTS = BBCA_NEUF_FONCT_PARTS;
}
