const EVIDENCE_DOCS = {
  "Man01": [
    {
      "doc": "Programme du projet (brief)",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Matrice de responsabilités (RACI ou équivalent)",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Comptes rendus de réunions de l\'équipe projet",
      "phase": "Conception",
      "type": "CR / PV"
    },
    {
      "doc": "Rapport de consultation des parties prenantes",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Stratégie de communication",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Lettre de nomination du BREEAM AP",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Justificatif du statut AP valide",
      "phase": "Conception",
      "type": "Certificat"
    },
    {
      "doc": "Planning du projet (phases clés)",
      "phase": "Conception",
      "type": "Planning"
    },
    {
      "doc": "Extrait du contrat ou CCTP mentionnant les cibles BREEAM",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Rapports d\'avancement du BREEAM AP (par phase)",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "PV de réunions montrant la participation du BREEAM AP",
      "phase": "Post-construction",
      "type": "CR / PV"
    },
    {
      "doc": "Rapport d\'inspection sur site de l\'évaluateur + photos",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    },
    {
      "doc": "Certificat d\'évaluation BREEAM interim",
      "phase": "Post-construction",
      "type": "Certificat"
    }
  ],
  "Man02": [
    {
      "doc": "Rapport d\'analyse ACG élémentaire (ISO 15686-5:2017)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport d\'analyse ACG par composant",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Note démontrant l\'influence de l\'ACG sur la conception",
      "phase": "Conception",
      "type": "Note technique"
    },
    {
      "doc": "Plans ou spécifications illustrant les choix d\'ACG",
      "phase": "Conception",
      "type": "Plans / Spécifications"
    },
    {
      "doc": "Coût d\'investissement prévisionnel (€/m²)",
      "phase": "Conception",
      "type": "Bilan financier"
    },
    {
      "doc": "Plans d\'exécution définitifs confirmant les choix",
      "phase": "Post-construction",
      "type": "Plans"
    },
    {
      "doc": "Rapport d\'inspection sur site + photos",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    },
    {
      "doc": "Coût d\'investissement final (€/m²)",
      "phase": "Post-construction",
      "type": "Bilan financier"
    }
  ],
  "Man03": [
    {
      "doc": "Extrait CCTP ou contrat (clauses construction responsable)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Lettre d\'engagement signée et datée",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Certificat EMS/EMAS de l\'entreprise principale",
      "phase": "Post-construction",
      "type": "Certificat"
    },
    {
      "doc": "Checklist de prévention des pollutions (Table 11 du manuel)",
      "phase": "Post-construction",
      "type": "Checklist"
    },
    {
      "doc": "Plan de management environnemental de chantier",
      "phase": "Post-construction",
      "type": "Plan"
    },
    {
      "doc": "Procédures et politiques de prévention des pollutions",
      "phase": "Post-construction",
      "type": "Procédure"
    },
    {
      "doc": "Photos de chantier",
      "phase": "Post-construction",
      "type": "Photos"
    },
    {
      "doc": "Registres de suivi chantier (énergie, eau, déchets, transport)",
      "phase": "Post-construction",
      "type": "Registre"
    },
    {
      "doc": "Certificats bois légal (FSC, PEFC, chaîne de traçabilité)",
      "phase": "Post-construction",
      "type": "Certificat"
    },
    {
      "doc": "Bons de livraison / factures bois",
      "phase": "Post-construction",
      "type": "Justificatif d\'achat"
    },
    {
      "doc": "Rapport CCS et certificat (le cas échéant)",
      "phase": "Post-construction",
      "type": "Rapport / Certificat"
    },
    {
      "doc": "Évaluation d\'impact sur la qualité de l\'eau (Taxonomie UE)",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Man04": [
    {
      "doc": "Extrait CCTP ou contrat (exigences de mise en service)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Lettre d\'engagement du maître d\'ouvrage",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Planning de mise en service",
      "phase": "Conception",
      "type": "Planning"
    },
    {
      "doc": "Lettre de désignation du responsable de mise en service",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Programme entreprise et budget (provisions mise en service)",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Dossier de mise en service (registres, rapports)",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Enregistrements de mise en service GTC/GTB",
      "phase": "Post-construction",
      "type": "Registre"
    },
    {
      "doc": "Relevé thermographique + rapport test étanchéité à l\'air",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Qualifications des professionnels (thermographe, etc.)",
      "phase": "Post-construction",
      "type": "CV / Certificat"
    },
    {
      "doc": "Guide utilisateur du bâtiment",
      "phase": "Post-construction",
      "type": "Guide"
    },
    {
      "doc": "Plannings de formation + confirmation de réalisation",
      "phase": "Post-construction",
      "type": "Planning"
    }
  ],
  "Man05": [
    {
      "doc": "Engagement ou contrat de suivi post-livraison",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Extrait CCTP (mise en service en exploitation)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Engagement signé pour l\'évaluation post-occupation (POE)",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Registres de suivi post-livraison (aftercare)",
      "phase": "Post-construction",
      "type": "Registre"
    },
    {
      "doc": "Rapports de mise en service en exploitation",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Comptes rendus d\'entretiens avec les occupants",
      "phase": "Post-construction",
      "type": "CR / PV"
    },
    {
      "doc": "Rapport POE (si 15 mois écoulés depuis l\'occupation)",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Plan de transition zéro carbone",
      "phase": "Post-construction",
      "type": "Plan"
    }
  ],
  "Hea01": [
    {
      "doc": "Plans de conception (coupes, plans d\'étage)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Note de calcul éclairage naturel (FLJ)",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Étude d\'éblouissement (le cas échéant)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Tableaux des menuiseries",
      "phase": "Conception",
      "type": "Tableau"
    },
    {
      "doc": "Plans d\'exécution définitifs",
      "phase": "Post-construction",
      "type": "Plans"
    },
    {
      "doc": "Rapport d\'inspection sur site + photos",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    },
    {
      "doc": "Calculs mis à jour (si modifications)",
      "phase": "Post-construction",
      "type": "Note de calcul"
    },
    {
      "doc": "Fiches techniques produits (protections solaires)",
      "phase": "Post-construction",
      "type": "Fiche technique"
    }
  ],
  "Hea02": [
    {
      "doc": "Plans de conception + tableaux d\'éclairage",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Stratégie de contrôle de l\'éclairage",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Lettre de conformité de l\'ingénieur CVC/éclairagiste",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Fiches techniques des luminaires",
      "phase": "Conception",
      "type": "Fiche technique"
    },
    {
      "doc": "Plans d\'exécution éclairage définitifs",
      "phase": "Post-construction",
      "type": "Plans"
    },
    {
      "doc": "Rapport d\'inspection sur site + photos",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    },
    {
      "doc": "Résultats des tests d\'éclairage",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Hea03": [
    {
      "doc": "Lettre de conformité de l\'ingénieur CVC/éclairagiste",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Fiches techniques des luminaires + tableaux",
      "phase": "Conception",
      "type": "Fiche technique"
    },
    {
      "doc": "Calculs lux mélanopique EDI",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Plans d\'exécution définitifs",
      "phase": "Post-construction",
      "type": "Plans"
    },
    {
      "doc": "Rapport d\'inspection sur site + photos",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    }
  ],
  "Hea04": [
    {
      "doc": "Extrait CCTP (absence d\'amiante)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Plan de qualité de l\'air intérieur (QAI)",
      "phase": "Conception",
      "type": "Plan"
    },
    {
      "doc": "Plans de conception (ventilation)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Fiches produits (émissions COV, formaldéhyde)",
      "phase": "Conception",
      "type": "Fiche technique"
    },
    {
      "doc": "Lettre de l\'équipe projet confirmant l\'absence d\'amiante",
      "phase": "Post-construction",
      "type": "Lettre"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    },
    {
      "doc": "Rapport de test QAI (formaldéhyde, COVT)",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Documentation fabricant (normes d\'essais, émissions)",
      "phase": "Post-construction",
      "type": "Fiche technique"
    }
  ],
  "Hea05": [
    {
      "doc": "Rapport de modélisation thermique (STD conforme)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Données PMV/PPD",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Stratégie de confort thermique",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Plans de conception (zonage CVC)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Rapport STD mis à jour (si modifications)",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution CVC + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Hea06": [
    {
      "doc": "CV de l\'acousticien qualifié (ex. OPQIBI 1602)",
      "phase": "Conception",
      "type": "CV / Certificat"
    },
    {
      "doc": "Rapport / étude acoustique préliminaire",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Extrait CCTP (normes acoustiques visées)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Résultats des essais acoustiques in situ",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Rapport d\'isolation acoustique (résidentiel)",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Hea07": [
    {
      "doc": "Plans de conception (implantation, accès piétons/vélos)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Stratégie d\'accessibilité (checklist A3)",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Checklist A4 signée (résidentiel)",
      "phase": "Conception",
      "type": "Checklist"
    },
    {
      "doc": "Rapport SBD ou équivalent (sécurité)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution définitifs + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Hea09": [
    {
      "doc": "Plans de conception montrant les espaces privatifs",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Hea10": [
    {
      "doc": "Évaluation des risques naturels",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport de conception montrant les mesures d\'atténuation",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Hea11": [
    {
      "doc": "Extrait CCTP (qualité de l\'eau)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Plans de conception (réseau d\'eau)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    },
    {
      "doc": "Résultats d\'analyse d\'eau",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Ene01": [
    {
      "doc": "Résultats du logiciel de calcul réglementaire approuvé",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Calculs de proportion d\'énergie bas carbone (LZC)",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Certificat de Performance Énergétique (CPE) tel que conçu",
      "phase": "Conception",
      "type": "Certificat"
    },
    {
      "doc": "CPE tel que construit",
      "phase": "Post-construction",
      "type": "Certificat"
    },
    {
      "doc": "Calculs mis à jour reflétant la construction réelle",
      "phase": "Post-construction",
      "type": "Note de calcul"
    }
  ],
  "Ene02": [
    {
      "doc": "Déclaration de stratégie énergétique",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Rapport de modélisation énergétique (SED/STD)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Évaluation des risques énergétiques",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport de validation par un tiers",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Documentation contractuelle (engagement mesure in-use)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Rapport de modélisation mis à jour",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Lien web de publication de l\'objectif de performance",
      "phase": "Post-construction",
      "type": "Justificatif"
    }
  ],
  "Ene03": [
    {
      "doc": "Estimations de consommation par source d\'énergie",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Stratégie de comptage / planning de comptage",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Plans montrant les zones fonctionnelles / locataires",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Spécification du système de suivi énergétique",
      "phase": "Conception",
      "type": "Spécification"
    },
    {
      "doc": "Plans d\'exécution comptage + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    },
    {
      "doc": "Documentation O&M du système de suivi installé",
      "phase": "Post-construction",
      "type": "Documentation technique"
    }
  ],
  "Ene04": [
    {
      "doc": "Analyse de la forme du bâtiment (conception passive)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Analyse de performance de l\'enveloppe",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Résultats de modélisation (réduction des besoins)",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Spécifications techniques des systèmes LZC",
      "phase": "Conception",
      "type": "Spécification"
    },
    {
      "doc": "Plans avec implantation des panneaux PV",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    },
    {
      "doc": "Résultats tests étanchéité à l\'air",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Ene05": [
    {
      "doc": "Plans de conception + tableaux d\'équipements",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Calculs de consommation par équipement",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Fiches techniques des équipements",
      "phase": "Conception",
      "type": "Fiche technique"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    },
    {
      "doc": "Calculs mis à jour",
      "phase": "Post-construction",
      "type": "Note de calcul"
    }
  ],
  "Ene06": [
    {
      "doc": "Documentation des systèmes consommateurs d\'énergie",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Calculs de consommation par système",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Spécifications des ascenseurs, escaliers mécaniques",
      "phase": "Conception",
      "type": "Spécification"
    },
    {
      "doc": "Plans d\'éclairage extérieur",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Analyse de transport (sorbonnes laboratoire)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    },
    {
      "doc": "Fiches techniques des équipements installés",
      "phase": "Post-construction",
      "type": "Fiche technique"
    }
  ],
  "Ene07": [
    {
      "doc": "Plans de conception + extrait CCTP",
      "phase": "Conception",
      "type": "Plans / Pièce contractuelle"
    },
    {
      "doc": "Fiches techniques des équipements de réponse à la demande",
      "phase": "Conception",
      "type": "Fiche technique"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Ene08": [
    {
      "doc": "Extrait CCTP (contrôles CVC installés)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Plans de conception CVC avec contrôles",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Tra01": [
    {
      "doc": "Étude transport ou déclaration",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Données de calcul PTAI",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Carte à l\'échelle (localisation transports en commun)",
      "phase": "Conception",
      "type": "Plan / Carte"
    },
    {
      "doc": "Plan de déplacements",
      "phase": "Conception",
      "type": "Plan"
    },
    {
      "doc": "Accord écrit du propriétaire (mise en œuvre plan de déplacements)",
      "phase": "Post-construction",
      "type": "Lettre"
    }
  ],
  "Tra02a": [
    {
      "doc": "Étude transport et plan de déplacements",
      "phase": "Conception",
      "type": "Rapport / Plan"
    },
    {
      "doc": "Calculs PTAI + carte à l\'échelle",
      "phase": "Conception",
      "type": "Note de calcul / Carte"
    },
    {
      "doc": "Spécification système d\'information transport",
      "phase": "Conception",
      "type": "Spécification"
    },
    {
      "doc": "Plans montrant les places de recharge VE",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Documentation covoiturage / autopartage",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Plan de site avec aménités locales identifiées",
      "phase": "Conception",
      "type": "Plan / Carte"
    },
    {
      "doc": "Calculs stockage vélos",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Rapport d\'inspection + photos (post-construction)",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    },
    {
      "doc": "Calculs PTAI finaux confirmant l\'amélioration",
      "phase": "Post-construction",
      "type": "Note de calcul"
    }
  ],
  "Tra02b": [
    {
      "doc": "Étude transport et plan de déplacements",
      "phase": "Conception",
      "type": "Rapport / Plan"
    },
    {
      "doc": "Calculs PTAI + carte à l\'échelle",
      "phase": "Conception",
      "type": "Note de calcul / Carte"
    },
    {
      "doc": "Contrats / lettres d\'engagement",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Rapport d\'inspection + photos (post-construction)",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    }
  ],
  "Wat01": [
    {
      "doc": "Extrait CCTP + plans de conception sanitaire",
      "phase": "Conception",
      "type": "Plans / Pièce contractuelle"
    },
    {
      "doc": "Calculs de consommation d\'eau",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Plans d\'exécution sanitaire + tableau des appareils",
      "phase": "Post-construction",
      "type": "Plans"
    },
    {
      "doc": "Fiches techniques des appareils sanitaires",
      "phase": "Post-construction",
      "type": "Fiche technique"
    }
  ],
  "Wat02": [
    {
      "doc": "Calculs de demande d\'eau significative",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Stratégie de comptage d\'eau",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Plans de comptage + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Wat03": [
    {
      "doc": "Extrait CCTP (détection de fuites)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Plans de conception + schémas de comptage",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    },
    {
      "doc": "Fiches techniques des dispositifs installés",
      "phase": "Post-construction",
      "type": "Fiche technique"
    }
  ],
  "Wat04": [
    {
      "doc": "Plans de conception + extrait CCTP",
      "phase": "Conception",
      "type": "Plans / Pièce contractuelle"
    },
    {
      "doc": "Documentation de conformité des équipements",
      "phase": "Conception",
      "type": "Fiche technique"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Wat05": [
    {
      "doc": "Stratégie eau du bâtiment",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Rapport de modélisation prédictive de la consommation d\'eau",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport mis à jour (post-construction)",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Engagement de mesure de la consommation en exploitation",
      "phase": "Post-construction",
      "type": "Lettre"
    }
  ],
  "Mat01": [
    {
      "doc": "Rapport ACV du bâtiment (superstructure)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport ACV équipements techniques",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport ACV bâtiment complet",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport ACV mis à jour (tel que construit)",
      "phase": "Post-construction",
      "type": "Rapport"
    },
    {
      "doc": "Spécifications matériaux confirmant les choix ACV",
      "phase": "Post-construction",
      "type": "Spécification"
    }
  ],
  "Mat02": [
    {
      "doc": "Tableau des produits avec DEP (EPD)",
      "phase": "Conception",
      "type": "Tableau"
    },
    {
      "doc": "Copies des DEP (EPD) des produits",
      "phase": "Conception",
      "type": "Certificat"
    },
    {
      "doc": "Tableau mis à jour (produits installés)",
      "phase": "Post-construction",
      "type": "Tableau"
    }
  ],
  "Mat03": [
    {
      "doc": "Extrait CCTP (approvisionnement responsable)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Objectifs d\'approvisionnement responsable",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Certificats de chaîne de traçabilité / labels",
      "phase": "Post-construction",
      "type": "Certificat"
    },
    {
      "doc": "Bons de livraison / factures / photos",
      "phase": "Post-construction",
      "type": "Justificatif d\'achat"
    }
  ],
  "Mat04": [
    {
      "doc": "Rapport de durabilité et résilience",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Extrait CCTP (protection des éléments vulnérables)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Mat05": [
    {
      "doc": "Rapport d\'efficacité matérielle",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Confirmation des mesures d\'efficacité mises en œuvre",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Wst01": [
    {
      "doc": "Audit de pré-démolition/curage",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plan de gestion des déchets de chantier",
      "phase": "Conception",
      "type": "Plan"
    },
    {
      "doc": "Objectifs de valorisation (détournement de la décharge)",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Registres de suivi des déchets de chantier",
      "phase": "Post-construction",
      "type": "Registre"
    },
    {
      "doc": "Bordereaux de suivi des déchets (BSD)",
      "phase": "Post-construction",
      "type": "Justificatif"
    },
    {
      "doc": "Rapport final de gestion des déchets",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Wst02": [
    {
      "doc": "Extrait CCTP (granulats recyclés)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Bons de livraison + certificats granulats recyclés",
      "phase": "Post-construction",
      "type": "Justificatif d\'achat"
    }
  ],
  "Wst03a": [
    {
      "doc": "Plans de conception (locaux déchets)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Extrait CCTP (bacs étiquetés)",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Wst03b": [
    {
      "doc": "Plans de conception (espaces déchets résidentiel)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Wst04": [
    {
      "doc": "Plans + tableaux de finitions",
      "phase": "Conception",
      "type": "Plans / Tableau"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Wst05": [
    {
      "doc": "Évaluation de la stratégie d\'adaptation au changement climatique",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Wst06": [
    {
      "doc": "Étude de démontabilité et d\'adaptabilité",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Lue01": [
    {
      "doc": "Plans de conception (site existant et projeté)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Photographies du site existant",
      "phase": "Conception",
      "type": "Photos"
    },
    {
      "doc": "Rapport du professionnel sol contaminé",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Lue02": [
    {
      "doc": "Rapport d\'étude écologique préliminaire",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Rapport d\'étude écologique complémentaire",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Cartographie des habitats et espèces",
      "phase": "Conception",
      "type": "Plan / Carte"
    },
    {
      "doc": "Calcul de la valeur écologique du site",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Rapport d\'écologue confirmant les résultats post-construction",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Lue03": [
    {
      "doc": "Rapport de l\'écologue (mesures de gestion écologique)",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Documents d\'appel d\'offres intégrant les exigences écologiques",
      "phase": "Conception",
      "type": "Pièce contractuelle"
    },
    {
      "doc": "Preuves de mise en œuvre sur site (photos, procédures)",
      "phase": "Post-construction",
      "type": "Photos / Rapport"
    },
    {
      "doc": "Déclaration de l\'écologue confirmant les résultats",
      "phase": "Post-construction",
      "type": "Rapport"
    }
  ],
  "Lue04": [
    {
      "doc": "Rapport de recommandations d\'amélioration écologique",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'aménagement écologique",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Calcul UGF (coefficient de végétalisation urbaine)",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Rapport d\'inspection + photos (mesures réalisées)",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    },
    {
      "doc": "Calcul de la valeur écologique post-travaux",
      "phase": "Post-construction",
      "type": "Note de calcul"
    }
  ],
  "Lue05": [
    {
      "doc": "Plan de gestion écologique à long terme (PGEL)",
      "phase": "Conception",
      "type": "Plan"
    },
    {
      "doc": "Engagement de financement du PGEL",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "PGEL mis à jour (post-construction)",
      "phase": "Post-construction",
      "type": "Plan"
    }
  ],
  "Pol01": [
    {
      "doc": "Lettre de l\'ingénieur CVC (absence/type de fluides frigorigènes)",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Spécifications des systèmes frigorifiques",
      "phase": "Conception",
      "type": "Spécification"
    },
    {
      "doc": "Calcul d\'impact des fluides frigorigènes (TEWI/DELC)",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Fiches techniques des équipements installés",
      "phase": "Post-construction",
      "type": "Fiche technique"
    },
    {
      "doc": "Rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    }
  ],
  "Pol02": [
    {
      "doc": "Plans de conception + extrait CCTP",
      "phase": "Conception",
      "type": "Plans / Pièce contractuelle"
    },
    {
      "doc": "Rapport qualité de l\'air local",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Spécification des systèmes de réduction des émissions",
      "phase": "Conception",
      "type": "Spécification"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Pol03": [
    {
      "doc": "Rapport d\'évaluation du risque d\'inondation",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Stratégie de gestion des eaux de surface (SuDS)",
      "phase": "Conception",
      "type": "Document projet"
    },
    {
      "doc": "Calculs hydrauliques (débits, volumes de rétention)",
      "phase": "Conception",
      "type": "Note de calcul"
    },
    {
      "doc": "Plans de drainage",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution définitifs drainage",
      "phase": "Post-construction",
      "type": "Plans"
    },
    {
      "doc": "Rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Rapport / Photos"
    },
    {
      "doc": "Calculs mis à jour confirmant les performances",
      "phase": "Post-construction",
      "type": "Note de calcul"
    }
  ],
  "Pol04": [
    {
      "doc": "Confirmation écrite (stratégie éclairage nocturne)",
      "phase": "Conception",
      "type": "Lettre"
    },
    {
      "doc": "Plans de conception éclairage extérieur",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Pol05": [
    {
      "doc": "Plans de conception (sources de bruit identifiées)",
      "phase": "Conception",
      "type": "Plans"
    },
    {
      "doc": "Étude acoustique environnementale",
      "phase": "Conception",
      "type": "Rapport"
    },
    {
      "doc": "Plans d\'exécution + rapport d\'inspection + photos",
      "phase": "Post-construction",
      "type": "Plans / Photos"
    }
  ],
  "Inn01": [
    {
      "doc": "Proposition soumise et confirmation du BRE",
      "phase": "Conception",
      "type": "Lettre / Rapport"
    },
    {
      "doc": "Preuves selon les mesures d\'amélioration proposées",
      "phase": "Post-construction",
      "type": "Variable"
    }
  ]
};
