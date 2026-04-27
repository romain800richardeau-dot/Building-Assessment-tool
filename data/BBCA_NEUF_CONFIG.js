// ============================================================
// BBCA NEUF V3.2 — Configuration centrale du référentiel
// Source : Référentiel BBCA Neuf V3.2 (Association BBCA / CSTB - 01/03/2024)
// + Règles de labélisation BBCA Rénovation et BBCA Neuf V1 (Certivea - 15/06/2023)
// Mise en application Certivea : 15/06/2023
// ============================================================

const BBCA_NEUF_CONFIG = {

  meta: {
    label: "BBCA Neuf",
    version: "3.2",
    publicationDate: "2024-03-01",
    organisme: "CERTIVEA",
    porteurReferentiel: "Association BBCA",
    accreditation: "Hors COFRAC",
    siteOfficiel: "https://www.batimentbascarbone.org/"
  },

  // ----------------------------------------------------------
  // 1. TYPOLOGIES couvertes par le référentiel
  // ----------------------------------------------------------
  // Plafonds Eges en kg CO2 éq / m² SDP sur 50 ans (sauf hôtels : voir formules dédiées)
  // Sources : §4.3 (Eges max), §4.4 (Eges PCE max) du référentiel v3.2
  typologies: {
    "bureaux": {
      label: "Bâtiments à usage de bureaux",
      egesMax: 1250,
      egesPceMax: 900,
      mStationnementRatioMax: 0.30,    // §2.1.2.b.ii
      mAgrementExtRatioMax: 0.15,       // §2.1.2.b.iii
      mBBCAalpha: 210,                  // §2.2.1.b
      preRequisCarbone: "C1",           // §4.2
      preRequisEnergie: "E1",
      preRequisDeRogationE: false,
      uniteSeuil: "kg CO2/m² SDP",
      categorieEC: "tertiaire"
    },
    "residentiel-collectif": {
      label: "Bâtiments collectifs d'habitation",
      egesMax: 1150,
      egesPceMax: 650,
      mStationnementRatioMax: 0.40,
      mAgrementExtRatioMax: null,        // règle spécifique : 4-10 m²/logement
      mAgrementExtRangeParLogement: { min: 4, max: 10 },
      mBBCAalpha: 400,
      preRequisCarbone: "C1",
      preRequisEnergie: "RT2012-ou-E1",  // §4.2 : dérogation maintenue, RT2012 accepté
      preRequisDeRogationE: true,
      uniteSeuil: "kg CO2/m² SDP",
      categorieEC: "residentiel"
    },
    "hotels": {
      label: "Immeubles hôteliers (hors village vacances)",
      egesMax: null,                     // formule à la chambre, voir hotelEgesMaxFormula()
      egesMoyenChambre: 28,              // tonnes CO2 / chambre / 50 ans (3 étoiles)
      egesPceMax: 800,
      mStationnementRatioMax: 0.40,
      mAgrementExtRatioMax: 0.15,
      mBBCAalpha: 300,
      preRequisCarbone: "C1",
      preRequisEnergie: "E1",
      preRequisDeRogationE: false,
      uniteSeuil: "kg CO2/chambre",
      uniteCalcul: "kg CO2/m² SDP",
      categorieEC: "tertiaire",
      surfaceChambreReference: 28,       // m²
      classification: ["1 étoile", "2 étoiles", "3 étoiles", "4 étoiles", "5 étoiles", "Palace"],
      noteEquipementsSpa: "Si présence piscine/spa : SED obligatoire pour justifier efficacité < 80 gCO2/kWh"
    },
    "autres-rt": {
      label: "Autres bâtiments soumis à la RT (hors maison individuelle)",
      egesMax: 1250,
      egesPceMax: 900,
      mStationnementRatioMax: 0.30,
      mAgrementExtRatioMax: 0.15,
      mBBCAalpha: 310,
      preRequisCarbone: "C1",
      preRequisEnergie: "E1",
      preRequisDeRogationE: false,
      uniteSeuil: "kg CO2/m² SDP",
      categorieEC: "autres-tertiaire",
      noteAvertissement: "Seuils établis sur un nombre limité de références - peuvent être révisés en fonction des retours d'expérience"
    }
  },

  // ----------------------------------------------------------
  // 2. NIVEAUX de performance
  // ----------------------------------------------------------
  // Score BBCA = (Eges max - Eges projet) / 10 + Points Innovation Climat (max 10)
  niveaux: {
    standard:    { scoreMin: 0,  label: "BBCA Standard",   ordre: 1, couleur: "#94A3B8" },
    performance: { scoreMin: 15, label: "BBCA Performance", ordre: 2, couleur: "#A0823F" },
    excellence:  { scoreMin: 30, label: "BBCA Excellence",  ordre: 3, couleur: "#C9A227" }
  },

  // ----------------------------------------------------------
  // 3. LOTS E+C- (14 lots) avec poids carbone moyens
  // ----------------------------------------------------------
  // Source : §2.1.2.a du référentiel v3.2 (tableau de répartition par typologie)
  // Le poids cumulé des 5 premiers lots représente ~80% du carbone du bâtiment
  lotsEcMoinsC: [
    { code: "01", name: "VRD et aménagements extérieurs de la parcelle",                    poidsRelatif: { bureaux: 0.05, residentiel: 0.04, hotel: 0.01 } },
    { code: "02", name: "Fondations et infrastructures",                                     poidsRelatif: { bureaux: 0.16, residentiel: 0.15, hotel: 0.04 }, deconstructionRatioBureauxHotels: 110, deconstructionRatioResidentiel: 87 },
    { code: "03", name: "Superstructure et maçonnerie",                                       poidsRelatif: { bureaux: 0.28, residentiel: 0.40, hotel: 0.24 }, deconstructionRatioBureauxHotels: 198, deconstructionRatioResidentiel: 229 },
    { code: "04", name: "Couverture - Étanchéité - Charpente - Zinguerie",                  poidsRelatif: { bureaux: 0.02, residentiel: 0.03, hotel: 0.03 } },
    { code: "05", name: "Cloisonnement - Doublage - Plafonds suspendus - Menuiseries int.", poidsRelatif: { bureaux: 0.04, residentiel: 0.07, hotel: 0.07 }, livreEnBlanc9eDecile: { bureaux: 67, residentiel: 70 } },
    { code: "06", name: "Façades et menuiseries extérieures",                                poidsRelatif: { bureaux: 0.13, residentiel: 0.09, hotel: 0.07 } },
    { code: "07", name: "Revêtements sols/murs/plafonds - Chape - Peintures - Décoration",  poidsRelatif: { bureaux: 0.09, residentiel: 0.07, hotel: 0.20 }, livreEnBlanc9eDecile: { bureaux: 107, residentiel: 56 } },
    { code: "08", name: "CVC (chauffage, ventilation, refroidissement, eau chaude san.)",   poidsRelatif: { bureaux: 0.10, residentiel: 0.05, hotel: 0.15 }, modelisationSimplifiee: true },
    { code: "09", name: "Installations sanitaires",                                          poidsRelatif: { bureaux: 0.01, residentiel: 0.03, hotel: 0.01 }, modelisationSimplifiee: true },
    { code: "10", name: "Réseaux d'énergie (courant fort)",                                  poidsRelatif: { bureaux: 0.08, residentiel: 0.04, hotel: 0.11 }, modelisationSimplifiee: true },
    { code: "11", name: "Réseaux de communication (courant faible)",                         poidsRelatif: { bureaux: 0.01, residentiel: 0.00, hotel: 0.01 }, modelisationSimplifiee: true },
    { code: "12", name: "Appareils élévateurs et autres équipements de transport int.",     poidsRelatif: { bureaux: 0.04, residentiel: 0.02, hotel: 0.04 }, modelisationSimplifiee: true },
    { code: "13", name: "Équipements de production locale d'électricité (PV, etc.)",        poidsRelatif: { bureaux: 0.00, residentiel: 0.00, hotel: 0.00 }, noteAttention: "Poids potentiellement très significatif si présent - à considérer avec attention" },
    { code: "14", name: "Fluides frigorigènes",                                               poidsRelatif: { bureaux: 0.00, residentiel: 0.00, hotel: 0.02 } }
  ],

  // ----------------------------------------------------------
  // 4. MODULATIONS BBCA spécifiques
  // ----------------------------------------------------------
  // Toutes en kg CO2 éq / m² SDP, à soustraire d'Eges PCE projet
  modulations: {

    mStationnement: {
      label: "Modulation surfaces de stationnement",
      facteur: 170,                                    // kg CO2 / m² SDP
      formuleTexte: "(Surface_stationnement * 170) / SDP",
      remplaceMpark: true,                             // soit Mstationnement, soit Mpark, pas les deux
      bornesRatio: { tertiaire: 0.30, residentiel: 0.40, hotel: 0.40 },
      noteUsage: "Surface clos/couverte affectée au stationnement (VL, 2 roues, vélos, aires de manoeuvre/livraison)"
    },

    mAgrementExterieur: {
      label: "Modulation surfaces d'agrément extérieur",
      facteur: 200,
      formuleTexte: "(Surface_agrement * 200) / SDP",
      bornesRatioTertiaire: 0.15,
      bornesRangeLogement: { min: 4, max: 10, unite: "m²/logement" },
      noteUsage: "Balcons, loggias, terrasses en épannelage, coursives en débord (HORS toiture-terrasse)",
      noteContrainteUrbaine: "Si contrainte d'urbanisme locale plus contraignante : la contrainte locale prévaut"
    },

    fondationsSpeciales: {
      label: "Forfait fondations spéciales",
      forfait: 40,                                     // kg CO2 / m² SDP
      formuleTexte: "Si I_2.1_partiel_calcule > 40 alors I_2.1_partiel_retenu = 40 ; sinon valeur calculée",
      perimetre: "Sous-lot 2.1 partiel : ouvrages de fondations sous l'arase supérieure de la dalle basse + comblements de carrière",
      exclusions: "Parois moulées au-dessus de la dalle basse"
    },

    livreEnBlanc: {
      label: "Bâtiment livré en blanc (bureaux)",
      cas1: { description: "Bureaux sans cloisonnement", lots: ["05"] },
      cas2: { description: "Bureaux sans second oeuvre", lots: ["05", "07"] },
      noteValeursForfaitaires: "Utiliser les valeurs forfaitaires HQE Performance 9e décile (cf. lotsEcMoinsC[].livreEnBlanc9eDecile)",
      noteEC: "Pour vérifier C1 : prendre des hypothèses d'aménagement intérieur, les forfaits BBCA ne s'appliquent pas au calcul E+C-"
    },

    titreVOuvragesParticuliers: {
      label: "Titre V BBCA - Ouvrages particuliers",
      conditionPrealable: "Émissions de l'ouvrage > 5% de l'EGES PCE du projet",
      casApplicables: [
        "Adaptation aux contraintes géotechniques/morphologiques (hors fondations spéciales)",
        "Adaptation aux exigences PPRI",
        "Création d'un ouvrage à destination plus large que le projet (mutualisation)",
        "Couverture d'ouvrages particuliers"
      ],
      validationRequise: "Commission Technique Association BBCA (délai 2 mois max)",
      modeAcalculer: "Neutralisation pour tout ou partie des EGES PCE de la partie d'ouvrage concernée"
    }
  },

  // ----------------------------------------------------------
  // 5. POINTS INNOVATION CLIMAT (max 10 points)
  // ----------------------------------------------------------
  // Source : §3 du référentiel v3.2
  pointsInnovationClimat: {
    capTotal: 10,

    deconstructionSelective: {
      label: "Déconstruction sélective in-situ préalable",
      max: 1,
      regle: "1 pt si diagnostic ressource ET exigences spécifiques de dépose méthodique intégrées au DCE",
      preuves: ["Diagnostic ressources", "DCE déconstruction sélective", "Documents de gestion opérationnelle de la dépose"]
    },

    reemploi: {
      label: "Réemploi de produits de construction et équipements",
      formule: "masse_reemployee_kg / (SDP * 5)",
      noteCalcul: "1 point BBCA pour 5 kg/m² SDP de matériau réemployé",
      preuves: ["Bordereau de suivi du produit attestant origine et mise en oeuvre"],
      max: null
    },

    mutualisationParkings: {
      label: "Mutualisation de places de parking",
      formule: "(Surface_stationnement_evitee * 170) / (10 * SDP)",
      preuves: [
        "Solutions techniques mises en place",
        "Solutions juridiques garantissant mutualisation long terme (min 10 ans)"
      ]
    },

    mutualisationEspaces: {
      label: "Mutualisation d'autres espaces (ex : salles de réunion)",
      formule: "(EgesPCE * Surface_complementaire_equivalente) / (10 * SDP)",
      noteCalcul: "1 point BBCA pour 10 kg d'émissions évitées par m² SDP"
    },

    changementUsage: {
      label: "Potentiel de changement d'usage du bâtiment",
      paliers: [
        { points: 1, condition: "Principe d'évolution défini" },
        { points: 2, condition: "Dimensionnement de l'ouvrage et des composants intègre l'évolution" },
        { points: 3, condition: "Dossier complet décrivant le process de changement d'usage" }
      ],
      noteProrata: "Si le changement d'usage ne porte que sur une partie des surfaces, points attribués au prorata",
      max: 3
    },

    extensionBatiment: {
      label: "Potentiel d'extension du bâtiment",
      formule: "min(10 * Surface_complementaire / SDP, 3)",
      noteCalcul: "1 point chaque fois que l'extension permet d'augmenter la surface de 10%, plafonné à 3 points",
      max: 3
    },

    sed: {
      label: "Simulation Énergétique Dynamique (SED)",
      points: { tertiaire: 1, residentiel: 0 },
      conditions: [
        "Logiciel adapté au calcul",
        "Mise à jour cohérente avec le bâtiment au stade d'avancement",
        "Scénario réaliste",
        "Prise en compte des postes non réglementaires"
      ]
    },

    commissionnement: {
      label: "Mission de commissionnement",
      points: 1,
      conditions: [
        "Couvre tous les systèmes énergétiques (chauffage, clim, ventilation, auxiliaires, éclairage, ECS, EnR locales, GTB)",
        "Test d'étanchéité à l'air de l'enveloppe",
        "Mesure d'étanchéité à l'air des réseaux aérauliques",
        "Plan + Rapport de commissionnement documentés",
        "Réalisé par une tierce partie"
      ]
    },

    sensibilisation: {
      label: "Sensibilisation des usagers",
      points: 1,
      conditions: [
        "Thématiques : équipements consommateurs, éco-gestes",
        "Périmètre min : éclairage, chauffage/rafraichissement, équipements informatiques",
        "Justifiée par attestation de formation / feuille de présence",
        "Documentée (livret, présentation, support de communication)"
      ]
    }
  },

  // ----------------------------------------------------------
  // 6. PRÉREQUIS pour accès au label
  // ----------------------------------------------------------
  // Source : §4.2 du référentiel v3.2
  prerequis: {
    eMoinsC: {
      label: "Niveaux Energie 1 et Carbone 1 selon E+C-",
      tertiaire: { energie: "E1", carbone: "C1", obligatoire: true },
      residentiel: { energie: "RT2012-ou-E1", carbone: "C1", obligatoire: true, derogationActive: true, noteDerogation: "Dérogation 2017 prolongée : E1 recommandé mais RT2012 accepté" }
    },
    artificialisation: {
      label: "Artificialisation des sols / Végétalisation",
      noteVersion: "Non pris en compte dans cette version - sera intégré dès qu'une méthode scientifique sera disponible"
    }
  },

  // ----------------------------------------------------------
  // 7. STOCKAGE CARBONE
  // ----------------------------------------------------------
  // Source : §2.1.4 du référentiel v3.2
  stockageCarbone: {
    label: "Stockage carbone biogénique",
    perimetre: "Lots 1 à 7 du référentiel E+C-",
    sourceCalcul: "Valeur du carbone biogénique (kg eq CO2) inscrite dans les FDES, calculée selon la norme EN 16 449",
    signe: "Valeur négative (émissions évitées)",
    conditionLabellisationOrigine: "Matières d'origine biosourcée labellisée FSC, PEFC ou autre label de gestion durable",
    noteAbsenceValeur: "Si la valeur n'est pas dans la FDES, se rapprocher du déclarant pour mise à jour"
  },

  // ----------------------------------------------------------
  // 8. FORMULES de calcul (pour référence dans le code)
  // ----------------------------------------------------------
  formules: {
    egesPceBBCA: "Eges PCE projet (avec correctifs I_2.1_partiel et Titre V) - Mstationnement (ou Mpark) - MagrementExt + EgesLivreEnBlanc",
    egesEnergieBBCA: "Eges Energie - mBBCA",
    mBBCA: "alphaBBCA * (Mgctype * (Mgcgeo + Mgcalt + Mgcsurf) - 1)",
    egesProjetTotal: "Eges Deconstruction + Eges PCE BBCA + Eges LivreEnBlanc + Eges Energie BBCA + Eges Chantier + Eges Eau + Stockage Carbone",
    scoreCarbone: "(Eges max - Eges projet) / 10",
    scoreTotal: "Points Carbone + min(Points Innovation Climat, 10)"
  },

  // ----------------------------------------------------------
  // 9. TABLES DE MODULATION mBBCA (Mgctype, Mgcgeo, Mgcalt, Mgcsurf)
  // ----------------------------------------------------------
  // TODO : compléter avec les tables de l'annexe E+C- (Référentiel "Energie-Carbone" pour les bâtiments neufs - Méthode d'évaluation)
  // Source à récupérer : http://www.batiment-energiecarbone.fr/wp-content/uploads/2017/06/referentiel-energie-carbone-methode-evaluation-2017-07-01.pdf
  // Tables à intégrer pour : Mgctype (par destination usage CE1/CE2), Mgcgeo (zones H1a-H3), Mgcalt (par tranche d'altitude), Mgcsurf (par tranche de SDP)
  tablesModulationMBBCA: {
    Mgctype: { _todo: "Tables E+C- annexe à récupérer (CE1/CE2 par destination usage)" },
    Mgcgeo:  { _todo: "Modulations par zone climatique H1a, H1b, H1c, H2a, H2b, H2c, H2d, H3" },
    Mgcalt:  { _todo: "Modulations par tranche d'altitude" },
    Mgcsurf: { _todo: "Modulations par tranche de SDP (logements résidentiel)" }
  },

  // ----------------------------------------------------------
  // 10. FORMULES SPÉCIFIQUES HÔTELS
  // ----------------------------------------------------------
  // Source : §1.3 et §4.3 du référentiel v3.2
  hotelEgesMaxFormula: {
    siClassificationInferieureA3etoiles: "(Surface_moyenne_chambre * 800 + 200 * 28) / 1000",                      // résultat en t CO2 / chambre / 50 ans
    siClassificationSuperieureA3EtSmoyInferieurA70: "Surface_moyenne_chambre * 1000 * 0.8 / 1000",
    siClassificationSuperieureA3EtSmoySuperieurA70: "56",                                                            // t CO2 / chambre fixe (palace)
    surfaceMoyenneChambre: "SDP_batiment / nombre_de_chambres",
    notePiscineSpa: "Si présence : SED obligatoire pour justifier efficacité carbone < 80 gCO2/kWh",
    facteurEmissionEnergies: "Cohérent avec la méthode Energie-Carbone"
  },

  // ----------------------------------------------------------
  // 11. CHAMP D'APPLICATION et exclusions
  // ----------------------------------------------------------
  champApplication: {
    geographie: "France métropolitaine (hors France métropolitaine : principes d'équivalence à valider par Association BBCA)",
    typologiesAdmissibles: ["bureaux (RE2020)", "résidentiel collectif", "hôtels", "enseignement primaire et secondaire (RE2020)", "autres bâtiments soumis à la RT (hors maison individuelle)"],
    delaiDemandeApresLivraison: { valeur: 6, unite: "mois", reference: "PV de réception de la totalité des lots" },
    casMixteNeufRenovation: {
      seuilSurfaceNeuveSans2Demandes: 150,
      regle: "Si surface neuve > 150 m² : 2 demandes de label obligatoires (BBCA Neuf + BBCA Rénovation)"
    },
    versionReferentielRequise: "v4.1 minimum pour les règles de labélisation v1.0 - les versions antérieures relèvent du Label Energie Carbone"
  },

  // ----------------------------------------------------------
  // 12. SOURCES de données environnementales (FDES)
  // ----------------------------------------------------------
  sourcesFDES: {
    base: "INIES (www.inies.fr)",
    hierarchiePriorite: [
      { rang: 1, type: "FDES spécifique individuelle",  validitePhase: "Conception et Réalisation" },
      { rang: 2, type: "FDES spécifique individuelle équivalente", validitePhase: "Conception uniquement (sous justification)" },
      { rang: 3, type: "FDES spécifique collective",    validitePhase: "Conception et Réalisation (si réf. commerciale couverte)" },
      { rang: 4, type: "FDES spécifique collective équivalente", validitePhase: "Conception uniquement (sous justification)" },
      { rang: 5, type: "DED (Donnée Environnementale par Défaut)", validitePhase: "Conception et Réalisation" }
    ],
    configurateursAutorises: ["DE Bois", "BETie", "SAVE", "Environnement IB"],
    noteValiditeFDES: "5 ans pour les FDES sous norme NF EN 15 804 - une donnée archivée ne peut plus être utilisée",
    regleDonnneeArchivee5Pourcent: "Si donnée archivée entre Conception et Réalisation et somme totale des éléments non justifiés < 5% du total PCE : conservation autorisée sans justification"
  }
};

// Exposition globale (pour cohérence avec le pattern de l'app)
if (typeof window !== 'undefined') {
  window.BBCA_NEUF_CONFIG = BBCA_NEUF_CONFIG;
}
