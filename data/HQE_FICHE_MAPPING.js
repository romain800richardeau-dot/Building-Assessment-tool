/* HQE_FICHE_MAPPING.js — Mapping sous-thèmes HQE → fiches ALEC T1-T15.
   Granularité : sous-thème (l=1) du référentiel HQE.
   Structure : { "<code-sous-theme>": [{ fiche, chap, title }, ...] }
   Associations basées sur affinité technique réelle uniquement —
   un sous-thème sans fiche pertinente reste vide (pas de badge affiché). */

window.HQE_FICHE_MAPPING = {
  "QAIR1.1": [
    {
      "fiche": "T3-C1",
      "chap": "I",
      "title": "Enjeux QAI et cadre réglementaire"
    },
    {
      "fiche": "T3-C2",
      "chap": "I",
      "title": "Les polluants intérieurs"
    }
  ],
  "QAIR1.2": [
    {
      "fiche": "T3-C1",
      "chap": "I",
      "title": "Enjeux QAI et cadre réglementaire"
    },
    {
      "fiche": "T3-C2",
      "chap": "I",
      "title": "Les polluants intérieurs"
    },
    {
      "fiche": "T3-C7",
      "chap": "I",
      "title": "Maintenance et pathologies"
    }
  ],
  "QAIR2.1": [
    {
      "fiche": "T3-C3",
      "chap": "I",
      "title": "Principes de la ventilation"
    },
    {
      "fiche": "T3-C4",
      "chap": "I",
      "title": "VMC simple flux hygroréglable"
    },
    {
      "fiche": "T3-C5",
      "chap": "I",
      "title": "VMC double flux à haut rendement"
    },
    {
      "fiche": "T3-C6",
      "chap": "I",
      "title": "Dimensionnement et mise en œuvre"
    },
    {
      "fiche": "T3-C7",
      "chap": "I",
      "title": "Maintenance et pathologies"
    }
  ],
  "QEAU1.1": [
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment (réseaux et matériaux)"
    }
  ],
  "QEAU1.2": [
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment (organisation des réseaux)"
    }
  ],
  "QEAU2.1": [
    {
      "fiche": "T4-C5",
      "chap": "I",
      "title": "L'ECS : production, distribution, pertes (légionelles)"
    },
    {
      "fiche": "T4-C6",
      "chap": "I",
      "title": "Le chauffe-eau thermodynamique (production ECS)"
    },
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment"
    }
  ],
  "QEAU2.2": [
    {
      "fiche": "T13-C1",
      "chap": "I",
      "title": "Économies d'eau et équipements aux points d'usage"
    },
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment"
    },
    {
      "fiche": "T13-C6",
      "chap": "I",
      "title": "Sécheresse et restrictions d'usage de l'eau"
    }
  ],
  "QEAU2.3": [
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment (réseaux non potables)"
    },
    {
      "fiche": "T13-C3",
      "chap": "I",
      "title": "Gérer les eaux pluviales à la parcelle (récupération)"
    },
    {
      "fiche": "T13-C4",
      "chap": "I",
      "title": "Désimperméabilisation : retours d'expérience"
    },
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité dans le bâtiment"
    },
    {
      "fiche": "T13-C6",
      "chap": "I",
      "title": "Sécheresse et restrictions d'usage (réutilisation)"
    }
  ],
  "QEAU2.4": [
    {
      "fiche": "T4-C5",
      "chap": "I",
      "title": "L'ECS : production, distribution, pertes (bouclage, légionelles)"
    },
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment"
    }
  ],
  "QEAU3.1": [
    {
      "fiche": "T4-C5",
      "chap": "I",
      "title": "L'ECS : traitements thermiques pour légionelles"
    }
  ],
  "QEAU3.2": [
    {
      "fiche": "T4-C5",
      "chap": "I",
      "title": "L'ECS : performance des traitements"
    }
  ],
  "QEAU4.1": [
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment"
    },
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité (qualité écologique)"
    }
  ],
  "QEAU4.2": [
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment"
    },
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité (qualité écologique)"
    }
  ],
  "ONDE1.1": [],
  "ONDE2.1": [],
  "ONDE3.1": [],
  "HYGR1.1": [
    {
      "fiche": "T2-C1",
      "chap": "I",
      "title": "Les fondamentaux de l'isolation thermique"
    },
    {
      "fiche": "T2-C3",
      "chap": "I",
      "title": "Performance thermique : λ, R, U"
    },
    {
      "fiche": "T2-C5",
      "chap": "I",
      "title": "Isolation et gestion de l'humidité"
    },
    {
      "fiche": "T2-C6",
      "chap": "I",
      "title": "Confort d'été et isolation"
    },
    {
      "fiche": "T2-C7",
      "chap": "I",
      "title": "Rénovation du bâti ancien (confort hygro)"
    },
    {
      "fiche": "T14-C1",
      "chap": "I",
      "title": "Confort d'été : comprendre et agir"
    },
    {
      "fiche": "T2-C8",
      "chap": "I",
      "title": "Le pisé et les matériaux en terre crue (perf hygro)"
    }
  ],
  "HYGR2.1": [
    {
      "fiche": "T2-C6",
      "chap": "I",
      "title": "Confort d'été et isolation"
    },
    {
      "fiche": "T14-C1",
      "chap": "I",
      "title": "Confort d'été : comprendre et agir"
    },
    {
      "fiche": "T14-C2",
      "chap": "I",
      "title": "Rafraîchissement passif et actif"
    },
    {
      "fiche": "T14-C4",
      "chap": "I",
      "title": "Méthodologie : fichier météo"
    },
    {
      "fiche": "T14-C5",
      "chap": "I",
      "title": "Caractériser le fichier dimensionnant"
    },
    {
      "fiche": "T14-C7",
      "chap": "I",
      "title": "Outils STD et alternatives"
    }
  ],
  "HYGR2.2-REU": [
    {
      "fiche": "T14-C1",
      "chap": "I",
      "title": "Confort d'été : comprendre et agir"
    },
    {
      "fiche": "T14-C2",
      "chap": "I",
      "title": "Rafraîchissement passif et actif"
    },
    {
      "fiche": "T14-C4",
      "chap": "I",
      "title": "Méthodologie : fichier météo"
    },
    {
      "fiche": "T14-C5",
      "chap": "I",
      "title": "Caractériser le fichier dimensionnant"
    },
    {
      "fiche": "T14-C6",
      "chap": "I",
      "title": "Indicateurs de confort adaptatif"
    },
    {
      "fiche": "T14-C7",
      "chap": "I",
      "title": "Outils STD et alternatives"
    }
  ],
  "ACOU1.1": [
    {
      "fiche": "T5-C3",
      "chap": "I",
      "title": "PAC : implantation et acoustique"
    }
  ],
  "ACOU2.1": [
    {
      "fiche": "T5-C3",
      "chap": "I",
      "title": "PAC : implantation et acoustique"
    }
  ],
  "VISU1.1": [],
  "VISU2.1": [],
  "ACES2.1": [],
  "ACES2.2": [],
  "ACES2.3": [],
  "ACES2.4": [],
  "ACES2.5": [],
  "ACES3.2": [],
  "ACES3.3": [],
  "ACES3.4": [],
  "ACES4.1": [],
  "ACES4.2": [],
  "ACES4.3": [],
  "TRAN1.1": [],
  "TRAN1.2": [],
  "TRAN1.3": [],
  "TRAN2.1": [],
  "TRAN2.2": [],
  "TRAN2.3": [],
  "TRAN2.4": [],
  "TRAN2.5": [],
  "TRAN2.6": [],
  "SERV1.1": [],
  "ENER1.1": [
    {
      "fiche": "T11-C1",
      "chap": "I",
      "title": "Lire et comprendre un DPE (3CL-DPE 2021)"
    },
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide des consommations"
    },
    {
      "fiche": "T11-C4",
      "chap": "I",
      "title": "Baromètre OID 2024 : où en est le parc bâti ?"
    },
    {
      "fiche": "T2-C1",
      "chap": "I",
      "title": "Les fondamentaux de l'isolation thermique"
    },
    {
      "fiche": "T2-C3",
      "chap": "I",
      "title": "Performance thermique : λ, R, U"
    },
    {
      "fiche": "T2-C7",
      "chap": "I",
      "title": "Rénovation du bâti ancien"
    },
    {
      "fiche": "T4-C1",
      "chap": "I",
      "title": "Choisir son énergie de chauffage"
    },
    {
      "fiche": "T4-C3",
      "chap": "I",
      "title": "La chaudière à condensation"
    },
    {
      "fiche": "T4-C5",
      "chap": "I",
      "title": "L'ECS : production, distribution, pertes"
    },
    {
      "fiche": "T4-C6",
      "chap": "I",
      "title": "Le chauffe-eau thermodynamique"
    },
    {
      "fiche": "T5-C1",
      "chap": "I",
      "title": "Principe thermodynamique et COP"
    },
    {
      "fiche": "T6-C1",
      "chap": "I",
      "title": "Bois énergie : ressource, carbone, labels"
    },
    {
      "fiche": "T7-C1",
      "chap": "I",
      "title": "Solaire thermique : principe et composants"
    },
    {
      "fiche": "T8-C1",
      "chap": "I",
      "title": "Principe du PV et composants"
    },
    {
      "fiche": "T9-C1",
      "chap": "I",
      "title": "Géothermie : principes et typologies"
    },
    {
      "fiche": "T10-C1",
      "chap": "I",
      "title": "Réseaux de chaleur : principes, mix, raccordement"
    },
    {
      "fiche": "T2-C2",
      "chap": "I",
      "title": "Familles de matériaux isolants"
    },
    {
      "fiche": "T2-C4",
      "chap": "I",
      "title": "Étanchéité à l'air et infiltrométrie"
    },
    {
      "fiche": "T4-C2",
      "chap": "I",
      "title": "Le chauffage électrique et les radiateurs"
    },
    {
      "fiche": "T4-C4",
      "chap": "I",
      "title": "Les chauffages d'appoint"
    },
    {
      "fiche": "T5-C2",
      "chap": "I",
      "title": "Typologies de PAC : air/air, air/eau, eau/eau, sol/eau"
    },
    {
      "fiche": "T5-C3",
      "chap": "I",
      "title": "Dimensionnement et installation"
    },
    {
      "fiche": "T5-C4",
      "chap": "I",
      "title": "Rafraîchissement et PAC réversible"
    },
    {
      "fiche": "T6-C2",
      "chap": "I",
      "title": "Le chauffage au bois bûche"
    },
    {
      "fiche": "T6-C3",
      "chap": "I",
      "title": "Les appareils indépendants : choisir et installer"
    },
    {
      "fiche": "T6-C4",
      "chap": "I",
      "title": "Le chauffage automatique au bois"
    },
    {
      "fiche": "T7-C2",
      "chap": "I",
      "title": "Dimensionner et choisir : CESI et SSC"
    },
    {
      "fiche": "T7-C3",
      "chap": "I",
      "title": "Surchauffe, intégration, maintenance"
    },
    {
      "fiche": "T8-C2",
      "chap": "I",
      "title": "Étude d'opportunité PV : gisement, production, rentabilité"
    },
    {
      "fiche": "T8-C3",
      "chap": "I",
      "title": "Autoconsommation, revente, intégration au réseau"
    },
    {
      "fiche": "T8-C4",
      "chap": "I",
      "title": "PV en copropriétés"
    },
    {
      "fiche": "T8-C5",
      "chap": "I",
      "title": "Solaire hybride et aérovoltaïque"
    },
    {
      "fiche": "T8-C6",
      "chap": "I",
      "title": "Contribuer au développement des EnR"
    },
    {
      "fiche": "T9-C2",
      "chap": "I",
      "title": "Dimensionnement des sondes géothermiques verticales"
    },
    {
      "fiche": "T9-C3",
      "chap": "I",
      "title": "Géothermie de surface, aérothermie et financement"
    },
    {
      "fiche": "T9-C4",
      "chap": "I",
      "title": "Étude technico-économique géothermique"
    },
    {
      "fiche": "T10-C2",
      "chap": "I",
      "title": "Chaleur fatale : valoriser un gisement"
    },
    {
      "fiche": "T10-C3",
      "chap": "I",
      "title": "Méthanisation : principe, intrants, biogaz"
    }
  ],
  "ENER1.2": [
    {
      "fiche": "T11-C1",
      "chap": "I",
      "title": "Lire et comprendre un DPE (3CL-DPE 2021)"
    },
    {
      "fiche": "T11-C3",
      "chap": "I",
      "title": "Le label BEPOS-Effinergie 2017 : règles techniques"
    },
    {
      "fiche": "T2-C3",
      "chap": "I",
      "title": "Performance thermique : λ, R, U"
    },
    {
      "fiche": "T2-C4",
      "chap": "I",
      "title": "Étanchéité à l'air et infiltrométrie"
    },
    {
      "fiche": "T8-C1",
      "chap": "I",
      "title": "Principe du PV (production EnR contributive RE2020)"
    },
    {
      "fiche": "T6-C1",
      "chap": "I",
      "title": "Bois énergie (contribution EnR au RT/RE)"
    },
    {
      "fiche": "T7-C1",
      "chap": "I",
      "title": "Solaire thermique (contribution EnR)"
    },
    {
      "fiche": "T9-C1",
      "chap": "I",
      "title": "Géothermie (contribution EnR)"
    },
    {
      "fiche": "T10-C1",
      "chap": "I",
      "title": "Réseaux de chaleur (contribution EnR)"
    },
    {
      "fiche": "T8-C6",
      "chap": "I",
      "title": "Contribuer au développement des EnR"
    }
  ],
  "ENER2.1": [
    {
      "fiche": "T2-C2",
      "chap": "I",
      "title": "Familles de matériaux isolants (entrepôts frigo)"
    },
    {
      "fiche": "T5-C2",
      "chap": "I",
      "title": "Typologies de PAC (refroidissement)"
    },
    {
      "fiche": "T5-C4",
      "chap": "I",
      "title": "Rafraîchissement et PAC réversible"
    },
    {
      "fiche": "T11-C1",
      "chap": "I",
      "title": "Lire et comprendre un DPE"
    }
  ],
  "ENER2.2": [
    {
      "fiche": "T2-C2",
      "chap": "I",
      "title": "Familles de matériaux isolants"
    },
    {
      "fiche": "T5-C2",
      "chap": "I",
      "title": "Typologies de PAC (refroidissement DC)"
    },
    {
      "fiche": "T10-C2",
      "chap": "I",
      "title": "Chaleur fatale : valoriser un gisement (DC)"
    }
  ],
  "EAU1.1": [
    {
      "fiche": "T13-C1",
      "chap": "I",
      "title": "Économies d'eau dans le logement"
    },
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment"
    },
    {
      "fiche": "T13-C6",
      "chap": "I",
      "title": "Sécheresse et restrictions d'usage de l'eau"
    }
  ],
  "EAU2.1": [
    {
      "fiche": "T13-C3",
      "chap": "I",
      "title": "Gérer les eaux pluviales à la parcelle"
    },
    {
      "fiche": "T13-C4",
      "chap": "I",
      "title": "Désimperméabilisation : retours d'expérience"
    },
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité dans le bâtiment"
    }
  ],
  "EAU2.2": [
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment (eaux usées)"
    },
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité (qualité écologique)"
    }
  ],
  "DECH1.1": [
    {
      "fiche": "T15-C1",
      "chap": "I",
      "title": "Définitions et cadre réglementaire"
    },
    {
      "fiche": "T15-C2",
      "chap": "I",
      "title": "Diagnostics PEMD et Ressources"
    },
    {
      "fiche": "T15-C8",
      "chap": "I",
      "title": "Coût global et logistique"
    }
  ],
  "DECH1.2": [
    {
      "fiche": "T15-C2",
      "chap": "I",
      "title": "Diagnostics PEMD et Ressources"
    },
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels"
    }
  ],
  "DECH2.1": [
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels (entretien)"
    }
  ],
  "DECH3.1": [
    {
      "fiche": "T15-C1",
      "chap": "I",
      "title": "Définitions et cadre réglementaire"
    },
    {
      "fiche": "T15-C2",
      "chap": "I",
      "title": "Diagnostics PEMD et Ressources"
    },
    {
      "fiche": "T15-C3",
      "chap": "I",
      "title": "Sourcing et plateformes"
    },
    {
      "fiche": "T15-C4",
      "chap": "I",
      "title": "Le lot réemploi dédié"
    },
    {
      "fiche": "T15-C5",
      "chap": "I",
      "title": "Cession des matériaux"
    },
    {
      "fiche": "T15-C6",
      "chap": "I",
      "title": "Assurance et responsabilité"
    },
    {
      "fiche": "T15-C7",
      "chap": "I",
      "title": "Bureau de contrôle et performance technique"
    },
    {
      "fiche": "T15-C8",
      "chap": "I",
      "title": "Coût global et logistique"
    },
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels"
    }
  ],
  "CARB1.1": [
    {
      "fiche": "T12-C1",
      "chap": "I",
      "title": "Neutralité carbone : de quoi parle-t-on ?"
    },
    {
      "fiche": "T12-C2",
      "chap": "I",
      "title": "Le référentiel Net Zero Initiative (NZI)"
    },
    {
      "fiche": "T12-C3",
      "chap": "I",
      "title": "Feuille de route de décarbonation du bâtiment"
    },
    {
      "fiche": "T12-C4",
      "chap": "I",
      "title": "Rénovation bas carbone : leviers"
    },
    {
      "fiche": "T12-C7",
      "chap": "I",
      "title": "Puits de carbone et compensation"
    }
  ],
  "CARB1.2": [
    {
      "fiche": "T12-C1",
      "chap": "I",
      "title": "Neutralité carbone : de quoi parle-t-on ?"
    },
    {
      "fiche": "T12-C2",
      "chap": "I",
      "title": "Le référentiel Net Zero Initiative (NZI)"
    }
  ],
  "ACCL1.1": [
    {
      "fiche": "T14-C1",
      "chap": "I",
      "title": "Confort d'été : comprendre et agir (canicules)"
    },
    {
      "fiche": "T14-C5",
      "chap": "I",
      "title": "Caractériser le fichier dimensionnant (canicules)"
    },
    {
      "fiche": "T13-C4",
      "chap": "I",
      "title": "Désimperméabilisation : risque inondations"
    },
    {
      "fiche": "T13-C6",
      "chap": "I",
      "title": "Sécheresse et restrictions d'usage de l'eau"
    }
  ],
  "ACCL1.2": [
    {
      "fiche": "T14-C1",
      "chap": "I",
      "title": "Confort d'été : comprendre et agir"
    },
    {
      "fiche": "T14-C2",
      "chap": "I",
      "title": "Rafraîchissement passif et actif"
    },
    {
      "fiche": "T14-C4",
      "chap": "I",
      "title": "Méthodologie : fichier météo"
    },
    {
      "fiche": "T14-C5",
      "chap": "I",
      "title": "Caractériser le fichier dimensionnant"
    },
    {
      "fiche": "T14-C6",
      "chap": "I",
      "title": "Indicateurs de confort adaptatif"
    }
  ],
  "ACV1.1": [
    {
      "fiche": "T12-C1",
      "chap": "I",
      "title": "Neutralité carbone : cadre conceptuel ACV"
    },
    {
      "fiche": "T12-C5",
      "chap": "I",
      "title": "Béton bas carbone et solutions chantier"
    },
    {
      "fiche": "T12-C6",
      "chap": "I",
      "title": "Doubles façades ventilées : classification"
    },
    {
      "fiche": "T12-C7",
      "chap": "I",
      "title": "Puits de carbone et compensation"
    },
    {
      "fiche": "T15-C2",
      "chap": "I",
      "title": "Diagnostics PEMD et Ressources (ACV)"
    },
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels (FDES)"
    }
  ],
  "BIOD1.1": [
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité dans le bâtiment"
    }
  ],
  "BIOD1.2": [
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité dans le bâtiment"
    }
  ],
  "COUT1.1": [
    {
      "fiche": "T1-C5",
      "chap": "I",
      "title": "Maîtriser le budget : coût global et enveloppe"
    },
    {
      "fiche": "T4-C1",
      "chap": "I",
      "title": "Choisir son énergie de chauffage (charges)"
    },
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide des consommations"
    },
    {
      "fiche": "T11-C4",
      "chap": "I",
      "title": "Baromètre OID : retours d'expérience"
    },
    {
      "fiche": "T13-C1",
      "chap": "I",
      "title": "Économies d'eau (charges eau)"
    }
  ],
  "COUT​1.2": [
    {
      "fiche": "T1-C5",
      "chap": "I",
      "title": "Maîtriser le budget : coût global et enveloppe"
    },
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide des consommations"
    }
  ],
  "COUT2.1": [
    {
      "fiche": "T1-C5",
      "chap": "I",
      "title": "Maîtriser le budget : coût global et enveloppe"
    },
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide des consommations"
    }
  ],
  "COUT2.2": [
    {
      "fiche": "T2-C7",
      "chap": "I",
      "title": "Rénovation du bâti ancien (entretien enveloppe)"
    },
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Faire vivre le bâtiment (entretien)"
    }
  ],
  "COUT2.3": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Faire vivre le bâtiment"
    },
    {
      "fiche": "T3-C7",
      "chap": "I",
      "title": "Maintenance et pathologies (ventilation)"
    },
    {
      "fiche": "T4-C5",
      "chap": "I",
      "title": "ECS : maintenance et performance"
    }
  ],
  "COUT2.4": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Faire vivre le bâtiment"
    }
  ],
  "COUT3.1": [
    {
      "fiche": "T1-C5",
      "chap": "I",
      "title": "Maîtriser le budget : coût global et enveloppe"
    },
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Faire vivre le bâtiment (renouvellements)"
    }
  ],
  "COUT4.1": [
    {
      "fiche": "T1-C5",
      "chap": "I",
      "title": "Maîtriser le budget : coût global et enveloppe"
    },
    {
      "fiche": "T9-C4",
      "chap": "I",
      "title": "Étude technico-économique géothermique"
    },
    {
      "fiche": "T8-C2",
      "chap": "I",
      "title": "Étude d'opportunité PV : rentabilité"
    }
  ],
  "DEVT1.1": [
    {
      "fiche": "T15-C3",
      "chap": "I",
      "title": "Sourcing et plateformes (filières locales)"
    },
    {
      "fiche": "T6-C1",
      "chap": "I",
      "title": "Bois énergie : ressource, carbone, labels (filière locale)"
    }
  ],
  "DEVT1.2": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés (clauses sociales)"
    }
  ],
  "DEVT1.3": [
    {
      "fiche": "T1-C3",
      "chap": "I",
      "title": "Se faire accompagner : mandataire, conducteur, AMO"
    }
  ],
  "DEVT2.1": [
    {
      "fiche": "T15-C3",
      "chap": "I",
      "title": "Sourcing et plateformes"
    },
    {
      "fiche": "T6-C1",
      "chap": "I",
      "title": "Bois énergie : filière locale"
    }
  ],
  "DEVT2.2": [
    {
      "fiche": "T15-C1",
      "chap": "I",
      "title": "Définitions et cadre réglementaire (réemploi)"
    },
    {
      "fiche": "T15-C2",
      "chap": "I",
      "title": "Diagnostics PEMD et Ressources"
    },
    {
      "fiche": "T15-C3",
      "chap": "I",
      "title": "Sourcing et plateformes"
    },
    {
      "fiche": "T15-C4",
      "chap": "I",
      "title": "Le lot réemploi dédié"
    },
    {
      "fiche": "T15-C5",
      "chap": "I",
      "title": "Cession des matériaux"
    },
    {
      "fiche": "T15-C6",
      "chap": "I",
      "title": "Assurance et responsabilité"
    },
    {
      "fiche": "T15-C7",
      "chap": "I",
      "title": "Bureau de contrôle et performance technique"
    },
    {
      "fiche": "T15-C8",
      "chap": "I",
      "title": "Coût global et logistique"
    },
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels"
    }
  ],
  "DEVT2.3": [
    {
      "fiche": "T15-C3",
      "chap": "I",
      "title": "Sourcing et plateformes (filières locales)"
    },
    {
      "fiche": "T6-C1",
      "chap": "I",
      "title": "Bois énergie : ressource, carbone, labels"
    },
    {
      "fiche": "T6-C4",
      "chap": "I",
      "title": "Chauffage automatique au bois (filière)"
    },
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels"
    }
  ],
  "DEVT2.4": [
    {
      "fiche": "T1-C3",
      "chap": "I",
      "title": "Se faire accompagner : mandataire, conducteur, AMO"
    },
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés (clauses compétences locales)"
    }
  ],
  "ADAP1.1": [
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet : du besoin au programme"
    }
  ],
  "ADAP1.2": [
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet : du besoin au programme"
    },
    {
      "fiche": "T1-C6",
      "chap": "I",
      "title": "Suivre la conception : rôle de la MOA"
    }
  ],
  "AD​AP2.1": [
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet (adaptabilité)"
    },
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Faire vivre le bâtiment"
    }
  ],
  "ADAP2.2": [
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet (transformabilité)"
    },
    {
      "fiche": "T2-C7",
      "chap": "I",
      "title": "Rénovation du bâti ancien (transformabilité)"
    }
  ],
  "ADAP3.1": [],
  "ADAP4.1": [],
  "ADAP4.2": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Réceptionner et faire vivre le bâtiment"
    }
  ],
  "CHAN1.1": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés et piloter le chantier"
    }
  ],
  "CHAN1.2": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés et piloter le chantier"
    }
  ],
  "CHAN1.3": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés et piloter le chantier"
    },
    {
      "fiche": "T1-C3",
      "chap": "I",
      "title": "Se faire accompagner (formation/sensibilisation)"
    }
  ],
  "CHAN2.1": [
    {
      "fiche": "T15-C1",
      "chap": "I",
      "title": "Définitions et cadre réglementaire (déchets)"
    },
    {
      "fiche": "T15-C2",
      "chap": "I",
      "title": "Diagnostics PEMD et Ressources"
    },
    {
      "fiche": "T15-C4",
      "chap": "I",
      "title": "Le lot réemploi dédié (réduction à la source)"
    },
    {
      "fiche": "T15-C8",
      "chap": "I",
      "title": "Coût global et logistique"
    }
  ],
  "CHAN2.2": [
    {
      "fiche": "T15-C2",
      "chap": "I",
      "title": "Diagnostics PEMD et Ressources"
    },
    {
      "fiche": "T15-C8",
      "chap": "I",
      "title": "Coût global et logistique (tri, regroupement)"
    }
  ],
  "CHAN3.1": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés (clauses environnementales chantier)"
    },
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels"
    }
  ],
  "CHAN3.2": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés (clauses limitation nuisances)"
    }
  ],
  "CHAN3.3": [
    {
      "fiche": "T13-C5",
      "chap": "I",
      "title": "Eau et biodiversité (préservation site chantier)"
    },
    {
      "fiche": "T15-C9",
      "chap": "I",
      "title": "Impact environnemental et labels"
    }
  ],
  "CHAN3.4": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés (communication riverains)"
    }
  ],
  "CHAN4.1": [
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide des consommations"
    },
    {
      "fiche": "T13-C1",
      "chap": "I",
      "title": "Économies d'eau"
    },
    {
      "fiche": "T13-C2",
      "chap": "I",
      "title": "Gestion de l'eau dans le bâtiment"
    }
  ],
  "CHAN4.2": [
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide des consommations"
    },
    {
      "fiche": "T11-C4",
      "chap": "I",
      "title": "Baromètre OID : suivi du parc"
    },
    {
      "fiche": "T13-C1",
      "chap": "I",
      "title": "Économies d'eau"
    }
  ],
  "CHAN4.3": [
    {
      "fiche": "T1-C5",
      "chap": "I",
      "title": "Maîtriser le budget (consommations chantier)"
    },
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide des consommations"
    }
  ],
  "CHAN5.1": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Faire vivre le bâtiment (bilan chantier)"
    }
  ],
  "COMM1.1": [
    {
      "fiche": "T1-C6",
      "chap": "I",
      "title": "Suivre la conception : rôle de la MOA"
    },
    {
      "fiche": "T1-C3",
      "chap": "I",
      "title": "Se faire accompagner : AMO commissionnement"
    }
  ],
  "COMM1.2": [
    {
      "fiche": "T1-C6",
      "chap": "I",
      "title": "Suivre la conception : rôle de la MOA"
    }
  ],
  "COMM2.1": [
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet (objectifs commissionnement)"
    },
    {
      "fiche": "T1-C6",
      "chap": "I",
      "title": "Suivre la conception"
    },
    {
      "fiche": "T11-C1",
      "chap": "I",
      "title": "Lire et comprendre un DPE (objectifs perf)"
    },
    {
      "fiche": "T11-C3",
      "chap": "I",
      "title": "Le label BEPOS-Effinergie (objectifs)"
    }
  ],
  "COMM2.2": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Réceptionner et faire vivre le bâtiment"
    },
    {
      "fiche": "T3-C7",
      "chap": "I",
      "title": "Maintenance et pathologies (ventilation)"
    },
    {
      "fiche": "T11-C2",
      "chap": "I",
      "title": "Diagnostic rapide (recommissionnement)"
    },
    {
      "fiche": "T11-C4",
      "chap": "I",
      "title": "Baromètre OID (suivi)"
    }
  ],
  "GD1.1": [],
  "GD1.2": [],
  "GD1.3": [],
  "GD1.4": [],
  "GD1.5": [],
  "GD2.1": [],
  "GD2.2": [],
  "GD2.3": [],
  "GD3.1": [],
  "GD3.2": [],
  "GD​3.3": [],
  "GD4.1": [],
  "GD4.2": [],
  "GD4.3": [],
  "SMR1.1": [
    {
      "fiche": "T1-C1",
      "chap": "I",
      "title": "Être maître d'ouvrage public"
    },
    {
      "fiche": "T1-C2",
      "chap": "I",
      "title": "Qui fait quoi sur une opération ?"
    }
  ],
  "SMR1.2": [
    {
      "fiche": "T1-C2",
      "chap": "I",
      "title": "Qui fait quoi sur une opération ?"
    },
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet : du besoin au programme"
    }
  ],
  "SMR1.3": [
    {
      "fiche": "T1-C2",
      "chap": "I",
      "title": "Qui fait quoi sur une opération ?"
    },
    {
      "fiche": "T1-C3",
      "chap": "I",
      "title": "Se faire accompagner : mandataire, conducteur, AMO"
    }
  ],
  "SMR2.1": [
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet : du besoin au programme"
    }
  ],
  "SMR2.2": [
    {
      "fiche": "T1-C1",
      "chap": "I",
      "title": "Être maître d'ouvrage public"
    }
  ],
  "SMR2.3": [
    {
      "fiche": "T1-C2",
      "chap": "I",
      "title": "Qui fait quoi sur une opération ?"
    },
    {
      "fiche": "T1-C3",
      "chap": "I",
      "title": "Se faire accompagner : mandataire, conducteur, AMO"
    }
  ],
  "SMR3.1": [
    {
      "fiche": "T1-C5",
      "chap": "I",
      "title": "Maîtriser le budget (gestion des risques)"
    },
    {
      "fiche": "T1-C9",
      "chap": "I",
      "title": "Garanties, assurances et recours"
    }
  ],
  "SMR3.2": [
    {
      "fiche": "T1-C4",
      "chap": "I",
      "title": "Cadrer son projet : du besoin au programme"
    },
    {
      "fiche": "T1-C6",
      "chap": "I",
      "title": "Suivre la conception : rôle de la MOA"
    }
  ],
  "SMR4.1": [
    {
      "fiche": "T1-C3",
      "chap": "I",
      "title": "Se faire accompagner : mandataire, conducteur, AMO"
    }
  ],
  "SMR4.2": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés et piloter le chantier"
    }
  ],
  "SMR4.3": [
    {
      "fiche": "T1-C7",
      "chap": "I",
      "title": "Passer les marchés et piloter le chantier"
    },
    {
      "fiche": "T1-C2",
      "chap": "I",
      "title": "Qui fait quoi (parties intéressées)"
    }
  ],
  "SMR4.4": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Réceptionner et faire vivre le bâtiment"
    }
  ],
  "SMR5.1": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Réceptionner et faire vivre le bâtiment"
    },
    {
      "fiche": "T1-C9",
      "chap": "I",
      "title": "Garanties, assurances et recours"
    }
  ],
  "SMR6.1": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Réceptionner et faire vivre le bâtiment"
    },
    {
      "fiche": "T1-C9",
      "chap": "I",
      "title": "Garanties, assurances et recours"
    }
  ],
  "SMR6.2": [
    {
      "fiche": "T1-C8",
      "chap": "I",
      "title": "Réceptionner et faire vivre le bâtiment"
    }
  ]
};
