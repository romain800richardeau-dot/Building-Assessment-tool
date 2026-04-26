// ============================================================
// HQE BD V4.1 — Documents de la preuve par thème
// Phases : Programme | Conception | Réalisation | Exploitation
// Types : Document projet | Étude | Note de calcul | Mesure | PV / Rapport | Plan | Procédure / Maintenance
// ============================================================
const HQE_EVIDENCE_DOCS = {

  // ============================================================
  // QDV — Qualité de vie
  // ============================================================

  "QAIR": [
    { "doc": "Notice de programmation QAI (objectifs, polluants ciblés, BH visés)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Cahier des charges QAI (CDC QAI) si retenu", "phase": "Programme", "type": "Document projet" },
    { "doc": "Liste des matériaux et produits en contact avec l'air intérieur (FDS, étiquetage A+)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Rapport de simulation QAI (Mathis QAI, Indalo, CONTAM ou équivalent)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note de calcul des débits d'air neuf hygiéniques (RT, EN 16798)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plan de ventilation (réseaux, bouches, prises d'air, rejets)", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude de la pollution extérieure et stratégie de prises d'air", "phase": "Conception", "type": "Étude" },
    { "doc": "Mesures formaldéhyde (ISO 16000-3 / 16000-4)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures COVT (ISO 16000-6 / EN ISO 16017 / ISO 16200)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures CO₂ (ISO 16000-26)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures benzène (ISO 16017-2 / EN 14662)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures NO₂ (ISO 8761)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures PM₂.₅ et PM₁₀ (EN 12341 / ISO 23210)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures radon (selon zonage IRSN)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "PV de réception et d'équilibrage de la ventilation", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Rapport d'inspection des installations de ventilation", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Programme de maintenance ventilation et filtration", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Mesures périodiques QAI (fréquence selon CDC QAI)", "phase": "Exploitation", "type": "Mesure" }
  ],

  "QEAU": [
    { "doc": "Notice de programmation Qualité de l'eau (cibles sanitaires, traitements éventuels)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Plans des réseaux EFS / ECS / eau non potable", "phase": "Conception", "type": "Plan" },
    { "doc": "Note de calcul de dimensionnement et de bouclage ECS", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude de prévention du risque légionellose (DTU 60.11, guide CSTB)", "phase": "Conception", "type": "Étude" },
    { "doc": "Schéma de principe et choix des matériaux (NF EN 12502, ACS)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Étude des risques de retours d'eau (disconnecteurs, clapets EA/EB)", "phase": "Conception", "type": "Étude" },
    { "doc": "Certificats d'attestation de conformité sanitaire (ACS) des matériaux", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Plans de récolement (as-built) des réseaux d'eau", "phase": "Réalisation", "type": "Plan" },
    { "doc": "Procédure de désinfection et rinçage des réseaux avant mise en service", "phase": "Réalisation", "type": "Procédure / Maintenance" },
    { "doc": "Analyses microbiologiques de mise en service (légionnelles, coliformes)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "PV de mise en service des installations sanitaires", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Carnet sanitaire de l'eau (suivi T°, purges, analyses)", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Analyses légionnelles annuelles (NF T90-431)", "phase": "Exploitation", "type": "Mesure" },
    { "doc": "Analyses plomb / nickel / cuivre périodiques", "phase": "Exploitation", "type": "Mesure" },
    { "doc": "Plan de maintenance des installations sanitaires", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "ONDE": [
    { "doc": "Notice de programmation CEM (objectifs d'exposition basse)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude d'exposition aux champs électromagnétiques (50 Hz et radiofréquences)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan d'implantation des sources (transformateurs, TGBT, antennes, Wi-Fi)", "phase": "Conception", "type": "Plan" },
    { "doc": "Note technique sur les distances de protection autour des sources", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Stratégie de câblage (séparation forte/faible, blindage)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Mesures CEM 50 Hz (champs électriques et magnétiques)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures radiofréquences (DAS, niveau ambiant Wi-Fi/GSM)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Plans de récolement des installations électriques et télécoms", "phase": "Réalisation", "type": "Plan" },
    { "doc": "Procédure de gestion et d'information sur les sources CEM", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "HYGR": [
    { "doc": "Notice de programmation confort hygrothermique (températures cibles été / hiver)", "phase": "Programme", "type": "Document projet" },
    { "doc": "STD / SED été (suivant guide HQE)", "phase": "Conception", "type": "Étude" },
    { "doc": "STD / SED hiver", "phase": "Conception", "type": "Étude" },
    { "doc": "Calcul Tic (RT 2012) ou DH selon RE2020", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Note de calcul humidité relative et condensation (Glaser ou WUFI)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plans CVC (chauffage, refroidissement, ventilation)", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude des protections solaires (course du soleil, masques)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note de stratégie de surventilation nocturne / inertie", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "PV d'équilibrage des réseaux CVC", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Mesures de température opérative et humidité (campagne in situ)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "PV de réception des installations CVC", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de maintenance CVC et instrumentation", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Mesures périodiques T° / HR (capteurs in situ ou GTB)", "phase": "Exploitation", "type": "Mesure" }
  ],

  "ACOU": [
    { "doc": "Notice de programmation acoustique (cibles DnT,A, L'nT,w, T20, isolement façade)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude acoustique du bâtiment (BE acoustique)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note de calcul des isolements aux bruits aériens, de chocs, équipements", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plans de dispositions constructives acoustiques", "phase": "Conception", "type": "Plan" },
    { "doc": "Choix des matériaux et systèmes (FT, PV laboratoire)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Étude du bruit extérieur (cartographie, classement voies)", "phase": "Conception", "type": "Étude" },
    { "doc": "Mesures DnT,A (isolement aux bruits aériens, NF EN ISO 16283-1)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures L'nT,w (bruits de chocs, NF EN ISO 16283-2)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures T20 / TR (durée de réverbération)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures DnT,A,tr (isolement façade)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Mesures de bruits d'équipements (LnAT)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Rapport acoustique final de l'opération", "phase": "Réalisation", "type": "PV / Rapport" }
  ],

  "VISU": [
    { "doc": "Notice de programmation confort visuel (FLJ, autonomie lumineuse, UGR cibles)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude d'éclairage naturel — FLJ moyen et autonomie lumineuse (sDA / DA300)", "phase": "Conception", "type": "Étude" },
    { "doc": "Étude des vues sur l'extérieur (pourcentage de surface utile avec vue)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan d'éclairage artificiel et choix des luminaires (FT, photométrie)", "phase": "Conception", "type": "Plan" },
    { "doc": "Calcul UGR par zone d'usage (DIALux ou équivalent)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Note de calcul d'éclairement (Em, U0) par local", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude des protections solaires et stores (gestion éblouissement DGP)", "phase": "Conception", "type": "Étude" },
    { "doc": "PV de mesures d'éclairement à la livraison", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Photos as-built (luminaires, finitions, vues)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de maintenance éclairage (relamping, nettoyage)", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "ACES": [
    { "doc": "Notice de programmation accessibilité (handicaps visés, niveau d'ambition)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Notice d'accessibilité PMR au permis de construire", "phase": "Conception", "type": "Document projet" },
    { "doc": "Plans cotés des cheminements, sanitaires, circulations verticales", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude des parcours et de la signalétique (handicaps moteur, visuel, auditif, mental)", "phase": "Conception", "type": "Étude" },
    { "doc": "Détails techniques (rampes, mains courantes, sanitaires PMR, contrastes visuels)", "phase": "Conception", "type": "Plan" },
    { "doc": "Note technique sur les ascenseurs PMR (NF EN 81-70)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude de l'éclairage des cheminements", "phase": "Conception", "type": "Étude" },
    { "doc": "Attestation de prise en compte de l'accessibilité (avant travaux)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Attestation finale d'accessibilité (Loi 2005-102, Art R 111-19-21)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV de réception des ascenseurs et équipements PMR", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Photos as-built (sanitaires PMR, cheminements, signalétique)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de maintenance des équipements d'accessibilité", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "TRAN": [
    { "doc": "Notice de programmation mobilités (objectifs report modal)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Plan d'accessibilité aux transports en commun (carte, fréquences, distances)", "phase": "Conception", "type": "Plan" },
    { "doc": "Note de distances aux arrêts TC, gares, services (calcul isochrones)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plan du local et stationnement vélos (sécurisé, abrité, accessible)", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude de l'offre en mobilités douces (vélos, trottinettes, autopartage)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan d'implantation des bornes de recharge VE (dimensionnement, puissance)", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude covoiturage et stationnement réservé", "phase": "Conception", "type": "Étude" },
    { "doc": "Photos as-built des aménagements vélos et VE", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV de réception des bornes de recharge VE", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de mobilité employeur / occupants", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Communication aux usagers (livret d'accueil mobilité)", "phase": "Exploitation", "type": "Document projet" }
  ],

  "SERV": [
    { "doc": "Notice de programmation services (services internes et de proximité visés)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Carte des services à proximité (commerces, soins, éducation, sports, culture)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note d'analyse des distances aux services (isochrones piétonnes)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plan des services internes (restauration, conciergerie, salles partagées)", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude des services numériques (couverture haut débit, équipement collectif)", "phase": "Conception", "type": "Étude" },
    { "doc": "Photos as-built des services internes", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Liste détaillée des services proposés aux occupants", "phase": "Exploitation", "type": "Document projet" },
    { "doc": "Communication aux usagers (livret d'accueil services)", "phase": "Exploitation", "type": "Document projet" }
  ],

  // ============================================================
  // ENV — Respect de l'environnement
  // ============================================================

  "ENER": [
    { "doc": "Notice de programmation énergie (objectifs Bbio / Cep / DH, recours EnR)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude thermique réglementaire (RE2020 ou RT 2012 si applicable)", "phase": "Conception", "type": "Étude" },
    { "doc": "Récapitulatif standardisé d'étude thermique (RSET / RSEE)", "phase": "Conception", "type": "Document projet" },
    { "doc": "STD / SED hiver et été (consommations réelles prévisionnelles)", "phase": "Conception", "type": "Étude" },
    { "doc": "Étude de faisabilité en énergies renouvelables (FAEER, art. L. 122-1 CCH)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note de dimensionnement des équipements CVC et ECS", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plans CVC / électricité / éclairage (réseaux, productions, distribution)", "phase": "Conception", "type": "Plan" },
    { "doc": "Note de récupération de chaleur (sur extraction, sur eaux grises, etc.)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plan de comptage énergétique (sous-comptages par usage / poste)", "phase": "Conception", "type": "Plan" },
    { "doc": "Test d'étanchéité à l'air (Q4Pa-surf selon NF EN 13829)", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "PV d'équilibrage des réseaux CVC", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Cahier de réception des installations énergétiques (PV équipements, GTB)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Mesures de consommations à la mise en service", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Plan de comptage et procédure de suivi des consommations", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Rapport annuel des consommations énergétiques (par usage, ratio kWhEP/m²)", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Plan de maintenance des équipements et de la GTB", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "EAU": [
    { "doc": "Notice de programmation eau (cibles consommation, gestion EP)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Note de calcul des consommations d'eau prévisionnelles (par usage)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plans des réseaux EP / EU / EV", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude de récupération et réutilisation des eaux pluviales (REUP)", "phase": "Conception", "type": "Étude" },
    { "doc": "Étude de désimperméabilisation et d'infiltration (note hydraulique)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note de calcul de gestion des eaux pluviales à la parcelle (pluie décennale / centennale)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plan des dispositifs de gestion EP (noues, bassins, toitures végétalisées, puits)", "phase": "Conception", "type": "Plan" },
    { "doc": "Choix des équipements sanitaires hydro-économes (FT, débits)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Plans de récolement (as-built) des réseaux d'eau et dispositifs EP", "phase": "Réalisation", "type": "Plan" },
    { "doc": "PV de mise en service des ouvrages de gestion EP (noues, bassins)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV de mise en service du système de récupération d'eau pluviale", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de maintenance des ouvrages EP et REUP", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Bilan annuel des consommations d'eau (compteurs par usage)", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Procédure de détection des fuites", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "DECH": [
    { "doc": "Notice de programmation déchets (objectifs valorisation chantier + exploitation)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Plan du local déchets (dimensionnement, accessibilité, ventilation)", "phase": "Conception", "type": "Plan" },
    { "doc": "Étude des flux de déchets en exploitation (typologies, volumes, fréquences)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan du dispositif de tri sélectif (par flux : OMR, recyclables, biodéchets, DEEE)", "phase": "Conception", "type": "Plan" },
    { "doc": "Note d'organisation de la collecte (interne et collecte externe)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "SOGED — Schéma d'organisation et de gestion des déchets de chantier", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Bordereaux de suivi des déchets (BSD, BSDA, BSDND) — collecte chantier", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Bilan déchets de chantier (taux de valorisation, traçabilité)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Photos as-built du local déchets et de la signalétique tri", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Procédure de tri en exploitation et formation des occupants", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Bilan annuel des déchets en exploitation (volumes, valorisation)", "phase": "Exploitation", "type": "PV / Rapport" }
  ],

  "CARB": [
    { "doc": "Notice de programmation carbone (cibles Ic_construction, biosourcés, réemploi)", "phase": "Programme", "type": "Document projet" },
    { "doc": "ACV bâtiment selon NF EN 15978 et arrêté RE2020 (Ic_construction, Ic_énergie)", "phase": "Conception", "type": "Étude" },
    { "doc": "Récapitulatif standardisé d'étude environnementale (RSEnv)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Note de calcul du Temps de Retour Carbone (TRC) pour rénovation (Alliance HQE-GBC)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Note sur les matériaux biosourcés (taux d'incorporation, label biosourcé)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude de réemploi et matières premières secondaires (audit, gisement)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan d'approvisionnement matériaux (origine, distance, mode transport)", "phase": "Conception", "type": "Plan" },
    { "doc": "FDES / PEP des produits prescrits (justificatifs des données utilisées)", "phase": "Conception", "type": "Document projet" },
    { "doc": "RSEnv finale post-construction (avec produits réellement mis en œuvre)", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Bordereaux et fiches techniques des produits de réemploi", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV de réception des matériaux biosourcés / réemploi", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Bilan carbone d'exploitation (consommations réelles)", "phase": "Exploitation", "type": "PV / Rapport" }
  ],

  "ACCL": [
    { "doc": "Notice de programmation ACCL (scénarios climatiques retenus, RCP / DRIAS)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude de vulnérabilité climatique (chaleur, sécheresse, inondation, vent, ICU)", "phase": "Conception", "type": "Étude" },
    { "doc": "Étude d'îlot de chaleur urbain (ICU) — simulations microclimatiques (ENVI-met ou équivalent)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan des dispositifs de protection solaire et de surventilation", "phase": "Conception", "type": "Plan" },
    { "doc": "Plan des aménagements végétalisés (ombrage, évapotranspiration, perméabilité)", "phase": "Conception", "type": "Plan" },
    { "doc": "Note de simulation thermique en année climatique extrême (canicule projetée)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude des risques inondation (PPRI, gestion pluies extrêmes)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan d'implantation des dispositifs résilients (réservoirs, équipements surélevés)", "phase": "Conception", "type": "Plan" },
    { "doc": "Photos as-built des dispositifs d'adaptation (protections solaires, végétalisation)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV de mise en service des équipements de résilience climatique", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de maintenance des dispositifs d'adaptation (végétation, drainage)", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "ACV": [
    { "doc": "Notice de programmation ACV (méthode EN 15978, indicateurs ciblés)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Note méthodologique ACV (périmètre, durée de vie, scénarios)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "ACV complète du bâtiment selon NF EN 15978 / NF EN 15643", "phase": "Conception", "type": "Étude" },
    { "doc": "ACV par lot ou composant (gros œuvre, second œuvre, équipements)", "phase": "Conception", "type": "Étude" },
    { "doc": "Justificatifs des FDES / PEP utilisées (base INIES) ou données par défaut", "phase": "Conception", "type": "Document projet" },
    { "doc": "Note de calcul des indicateurs environnementaux (PRG, EP, ressources, eau, déchets)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Note d'analyse de variantes / éco-conception (comparaison de scénarios)", "phase": "Conception", "type": "Étude" },
    { "doc": "ACV finale post-réalisation (mise à jour avec produits réellement installés)", "phase": "Réalisation", "type": "Étude" },
    { "doc": "FDES / PEP réelles des produits mis en œuvre", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Recalcul ACV en exploitation avec consommations réelles", "phase": "Exploitation", "type": "Étude" }
  ],

  "BIOD": [
    { "doc": "Notice de programmation biodiversité (objectifs CBS, espèces ciblées)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Diagnostic écologique initial — état des lieux faune / flore (écologue)", "phase": "Conception", "type": "Étude" },
    { "doc": "Étude des continuités écologiques (trame verte et bleue, SRCE / SCoT)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan de gestion écologique du site (mesures ERC : éviter, réduire, compenser)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Plan paysager et d'aménagement végétal (essences locales, strates végétales)", "phase": "Conception", "type": "Plan" },
    { "doc": "Plan des toitures et façades végétalisées", "phase": "Conception", "type": "Plan" },
    { "doc": "Note de calcul du coefficient de biotope par surface (CBS) ou équivalent", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Plan des dispositifs favorables à la faune (nichoirs, hôtels à insectes, mares)", "phase": "Conception", "type": "Plan" },
    { "doc": "Bilan écologique post-travaux (relevés faune / flore)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Bordereaux des essences plantées (origine locale, label Végétal Local si pertinent)", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Photos as-built des aménagements écologiques (plantations, dispositifs faune)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de gestion écologique différenciée (entretien sans phyto, fauche tardive)", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Suivi écologique pluriannuel (relevés naturalistes périodiques)", "phase": "Exploitation", "type": "Mesure" }
  ],

  // ============================================================
  // ECO — Performance économique
  // ============================================================

  "COUT": [
    { "doc": "Notice de programmation coûts (cibles coût global, ratios €/m²)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Coût d'objectif programme (estimation phase amont)", "phase": "Programme", "type": "Note de calcul" },
    { "doc": "Estimation des coûts d'investissement (€/m² SU/SDP) par phase APS / APD", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude de coût global (CG) ou coût global élargi selon ISO 15686-5", "phase": "Conception", "type": "Étude" },
    { "doc": "Note de coût d'exploitation prévisionnel (énergies, eau, maintenance, GER)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude comparative variantes (analyse cycle de vie économique)", "phase": "Conception", "type": "Étude" },
    { "doc": "Bordereau quantitatif estimatif (DPGF, DQE)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Note de provisions pour aléas et risques", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Bilan financier final (coût réel investissement)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "DGD — Décompte général définitif", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Bilan annuel des coûts d'exploitation (réels vs prévisionnels)", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Mise à jour du coût global en exploitation (POE économique)", "phase": "Exploitation", "type": "Étude" }
  ],

  "DEVT": [
    { "doc": "Notice de programmation économie locale (objectifs filières courtes, insertion)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude des filières locales mobilisables (matériaux, entreprises, savoir-faire)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note d'analyse des fournisseurs et entreprises locales (rayon < 250 km / national)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan d'allotissement favorisant les TPE/PME et insertion sociale", "phase": "Conception", "type": "Document projet" },
    { "doc": "Clauses sociales et environnementales dans les marchés (CCAP, CCTP)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Note d'estimation des heures d'insertion professionnelle visées", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Bilan des entreprises locales engagées (rayon, CA local généré)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Suivi des heures d'insertion réalisées (bordereaux SIAE)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Bilan retombées économiques locales (% CA local, emplois locaux)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Suivi des contrats de maintenance avec entreprises locales", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  // ============================================================
  // SMR_PIL — Système de Management Responsable : Pilotage maîtrisé
  // ============================================================

  "ADAP": [
    { "doc": "Notice de programmation adaptabilité (durée de vie, scénarios d'évolution, flexibilité d'usage)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude d'évolutivité du bâtiment (réversibilité, transformation, surélévation)", "phase": "Conception", "type": "Étude" },
    { "doc": "Plan modulaire et trame structurelle (cloisons amovibles, libre disposition)", "phase": "Conception", "type": "Plan" },
    { "doc": "Plan des réservations techniques (gaines, circulations, nourrices)", "phase": "Conception", "type": "Plan" },
    { "doc": "Note de stratégie maintenance / démontabilité des équipements et composants", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Étude de réversibilité d'usage (changement de destination)", "phase": "Conception", "type": "Étude" },
    { "doc": "Note BIM et référentiels d'échange (LOD, IFC, niveau de détail DOE numérique)", "phase": "Conception", "type": "Document projet" },
    { "doc": "DOE numérique (BIM as-built) selon convention BIM", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Carnet de santé numérique du bâtiment", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Photos as-built des réseaux et réservations techniques", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan d'évolution / extension du bâtiment", "phase": "Exploitation", "type": "Document projet" },
    { "doc": "Mise à jour du carnet de vie / DOE numérique", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "CHAN": [
    { "doc": "Notice de programmation chantier propre (cibles bruit, poussière, déchets, eaux)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Charte chantier propre / chantier à faibles nuisances", "phase": "Conception", "type": "Document projet" },
    { "doc": "Plan d'installation de chantier (PIC) — bases vie, accès, stockage, circulation", "phase": "Conception", "type": "Plan" },
    { "doc": "Note d'organisation des nuisances (bruit, poussières, vibrations, salissures)", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Note de communication aux riverains (livret information, panneaux)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Plan de circulation des engins et accès pompiers", "phase": "Conception", "type": "Plan" },
    { "doc": "SOGED — Schéma d'organisation et de gestion des déchets de chantier", "phase": "Conception", "type": "Document projet" },
    { "doc": "PGC SPS / DIUO (sécurité travailleurs et exploitation ultérieure)", "phase": "Conception", "type": "Document projet" },
    { "doc": "PV d'engagement des entreprises à la charte chantier propre", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Bordereaux de suivi des déchets (BSD, BSDA, BSDND)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Mesures de bruit et poussières en limite de chantier", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "PV de visites OPR et mises au point des nuisances", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Photos chantier (hebdo / mensuelles)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Bilan final chantier propre (taux valorisation, plaintes traitées, indicateurs)", "phase": "Réalisation", "type": "PV / Rapport" }
  ],

  "COMM": [
    { "doc": "Notice de programmation commissionnement (lots concernés, périmètre, planning)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Lettre de mission du Cx (Commissioning Authority) / Responsable de mise en service", "phase": "Programme", "type": "Document projet" },
    { "doc": "Plan de commissionnement (Cx Plan) — fonctionnel et exigences propriétaire (OPR)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Cahier des charges des essais (Test Plans) par lot / système", "phase": "Conception", "type": "Document projet" },
    { "doc": "Liste détaillée des paramètres et points de mesure à vérifier", "phase": "Conception", "type": "Document projet" },
    { "doc": "Procédures écrites des tests fonctionnels et de performance", "phase": "Conception", "type": "Procédure / Maintenance" },
    { "doc": "Revue Cx en phase APD / DCE", "phase": "Conception", "type": "PV / Rapport" },
    { "doc": "Programme de formation des exploitants et occupants", "phase": "Conception", "type": "Document projet" },
    { "doc": "Rapports de commissionnement par lot (CVC, plomberie, électricité, GTB, sécurité)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV des essais fonctionnels et de performance", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV de mise au point et levée des réserves Cx", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Cahier de réception des installations (dossier final Cx)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Manuel d'exploitation et de maintenance (DOE / DEM)", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "PV des sessions de formation des exploitants et occupants", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan de Re-Commissioning / Continuous Commissioning sur la 1ère année", "phase": "Exploitation", "type": "Procédure / Maintenance" },
    { "doc": "Évaluation post-occupation (POE) — mesures de performance réelle", "phase": "Exploitation", "type": "Mesure" },
    { "doc": "Rapports de Re-Cx périodiques (re-tuning des installations)", "phase": "Exploitation", "type": "PV / Rapport" }
  ],

  "GD": [
    { "doc": "Note d'applicabilité du thème GD (axe Bâtiment vs axe Gestion en exploitation)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Politique de gestion durable de l'exploitant (RSE, environnement, social)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Plan de gestion durable (objectifs ESG, indicateurs de pilotage)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Note d'achats responsables (critères fournisseurs)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Procédures de gestion durable adaptées à l'exploitant", "phase": "Réalisation", "type": "Procédure / Maintenance" },
    { "doc": "Charte exploitant / livret RSE", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Bilan annuel RSE / ESG de l'exploitant", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Bilan énergétique et environnemental d'exploitation", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Plan d'amélioration continue de l'exploitation", "phase": "Exploitation", "type": "Document projet" },
    { "doc": "Communication aux occupants (rapport durabilité, écogestes)", "phase": "Exploitation", "type": "Document projet" },
    { "doc": "Suivi des indicateurs ESG (énergie, eau, déchets, satisfaction occupants)", "phase": "Exploitation", "type": "Mesure" }
  ],

  // ============================================================
  // SMR_SYS — Système de Management Responsable : Chapitres du système
  // (Structure ISO 9001 / 14001 — Ch. 4 à 10)
  // ============================================================

  "SMR1": [
    { "doc": "Note d'analyse du contexte interne et externe du projet (PESTEL, SWOT)", "phase": "Programme", "type": "Étude" },
    { "doc": "Cartographie des parties prenantes (MOA, MOE, BE, entreprises, riverains, exploitant, occupants)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Étude des attentes et exigences des parties prenantes", "phase": "Programme", "type": "Étude" },
    { "doc": "Définition du périmètre et des limites du SMR", "phase": "Conception", "type": "Document projet" },
    { "doc": "Note d'identification des enjeux de durabilité du projet", "phase": "Conception", "type": "Document projet" },
    { "doc": "Mise à jour de l'analyse du contexte (au fil de l'avancement)", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Revue annuelle du contexte et des parties prenantes", "phase": "Exploitation", "type": "PV / Rapport" }
  ],

  "SMR2": [
    { "doc": "Lettre d'engagement du commanditaire / direction MOA", "phase": "Programme", "type": "Document projet" },
    { "doc": "Politique HQE / RSE du projet (signée par le commanditaire)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Organigramme du projet et matrice des rôles & responsabilités (RACI)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Fiches de poste et lettres de mission des intervenants HQE (référent HQE, AMO, BE)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Charte d'engagement signée par les intervenants (MOE, BE, entreprises)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Comité de pilotage HQE — composition, fréquence, attributions", "phase": "Conception", "type": "Document projet" },
    { "doc": "Comptes rendus des comités de pilotage HQE", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Revue de direction (validation des engagements et des résultats)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Revues de direction périodiques en exploitation", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Communication interne et externe de la politique HQE", "phase": "Exploitation", "type": "Document projet" }
  ],

  "SMR3": [
    { "doc": "Plan de management environnemental (PME) du projet", "phase": "Programme", "type": "Document projet" },
    { "doc": "Définition des objectifs HQE quantifiés par cible", "phase": "Programme", "type": "Document projet" },
    { "doc": "Registre des risques et opportunités (analyse, cotation, plan d'actions)", "phase": "Conception", "type": "Étude" },
    { "doc": "Planning détaillé des cibles et engagements HQE par phase", "phase": "Conception", "type": "Document projet" },
    { "doc": "Plan d'actions HQE (qui fait quoi, quand, livrables)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Tableau d'indicateurs de suivi (KPIs) par engagement", "phase": "Conception", "type": "Note de calcul" },
    { "doc": "Mise à jour du plan d'actions et du registre des risques", "phase": "Réalisation", "type": "Document projet" },
    { "doc": "Suivi périodique des indicateurs HQE", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan d'amélioration continue en exploitation", "phase": "Exploitation", "type": "Document projet" }
  ],

  "SMR4": [
    { "doc": "Note d'allocation des ressources (financières, humaines, techniques) au SMR", "phase": "Programme", "type": "Document projet" },
    { "doc": "Plan de formation des intervenants à la démarche HQE", "phase": "Conception", "type": "Document projet" },
    { "doc": "Liste des compétences requises et identification des intervenants", "phase": "Conception", "type": "Document projet" },
    { "doc": "Procédures de communication interne du projet", "phase": "Conception", "type": "Procédure / Maintenance" },
    { "doc": "Plan documentaire du projet (référentiel, structure, accès)", "phase": "Conception", "type": "Document projet" },
    { "doc": "PV des sessions de formation et de sensibilisation HQE", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Note des ressources mobilisées (heures/personnes, équipements)", "phase": "Réalisation", "type": "Note de calcul" },
    { "doc": "Procédures de gestion documentaire et d'archivage", "phase": "Réalisation", "type": "Procédure / Maintenance" },
    { "doc": "Plan de formation continue des exploitants", "phase": "Exploitation", "type": "Document projet" },
    { "doc": "Procédure de mise à jour de la documentation HQE", "phase": "Exploitation", "type": "Procédure / Maintenance" }
  ],

  "SMR5": [
    { "doc": "Plan d'évaluation des performances (méthodes, fréquences, responsables)", "phase": "Programme", "type": "Document projet" },
    { "doc": "Tableau de bord du SMR (indicateurs et cibles)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Plan d'audits internes du SMR", "phase": "Conception", "type": "Document projet" },
    { "doc": "Procédures d'audit interne (méthode, grille, restitution)", "phase": "Conception", "type": "Procédure / Maintenance" },
    { "doc": "Rapports d'audits internes périodiques", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Mesures de performance HQE en cours de chantier", "phase": "Réalisation", "type": "Mesure" },
    { "doc": "Évaluation des résultats des engagements HQE par phase (revue)", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Bilan annuel de performance du SMR", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Audits externes (revues de certification ou re-certification)", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Revue de direction sur la performance du SMR", "phase": "Exploitation", "type": "PV / Rapport" }
  ],

  "SMR6": [
    { "doc": "Procédure de gestion des non-conformités et actions correctives", "phase": "Programme", "type": "Procédure / Maintenance" },
    { "doc": "Plan d'amélioration continue (logique PDCA)", "phase": "Conception", "type": "Document projet" },
    { "doc": "Registre des non-conformités, actions correctives et préventives", "phase": "Conception", "type": "Document projet" },
    { "doc": "Suivi du traitement des non-conformités constatées en chantier", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "PV des actions correctives mises en œuvre", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Retour d'expérience (REX) du projet — leçons apprises", "phase": "Réalisation", "type": "PV / Rapport" },
    { "doc": "Plan d'amélioration continue de l'exploitation", "phase": "Exploitation", "type": "Document projet" },
    { "doc": "Bilan annuel des actions correctives et préventives", "phase": "Exploitation", "type": "PV / Rapport" },
    { "doc": "Capitalisation des bonnes pratiques (base de connaissances projet)", "phase": "Exploitation", "type": "Document projet" }
  ]

};
