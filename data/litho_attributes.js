// ============================================================================
// SA_LITHO_ATTRIBUTES V2.1 — Dictionnaire lithologie -> attributs geotechniques
// ============================================================================
// V2.1 (avril 2026) : +3 familles (formations_glissees, marbres, tourbes_marais),
// +1 famille utilitaire (non_geologique), +4 attributs (fondation_cost_typical,
// typical_regions_france, g1_cost_indicative, presence_nappe_probability),
// matching ameliore pour notations "pyjama" (LP/c5 -> LP).
// ============================================================================
// Objectif : donner a chaque famille lithologique rencontree sur la carte
// geologique harmonisee BRGM BD Charm-50 les attributs utiles pour :
//   - la faisabilite geotechnique (portance, type de fondation, cout indicatif)
//   - la strategie d'eaux pluviales (permeabilite)
//   - les risques naturels (karst, retrait-gonflement, radon, liquefaction)
//   - la sismique (amplification, classe de sol Eurocode 8)
//   - l'excavation (cout, categorie dechets)
//   - les materiaux locaux valorisables (Mat 03 BREEAM)
//   - les credits BREEAM impactes (traçabilite narratif)
//
// Sources :
//   - DTU 13.11 / 13.12 (fondations superficielles / profondes)
//   - NF P 94-500 : classification missions geotechniques (G1, G2, G3...)
//   - Eurocode 7 (EN 1997-1) et son annexe nationale francaise
//   - Eurocode 8 (EN 1998-1) classes de sol S1 a S5
//   - IRSN / BRGM : cartographie potentiel radon
//   - Recommandations AFNOR NF P18-594 (reactivite alcali-granulats)
//   - BRGM BD Charm-50 : descriptif des cartes 1/50 000 vecteur (2004)
//   - Retours d'experience BE geotech francais (indicatifs, toujours a valider
//     par G1 PGC sur site reel).
//
// MATCHING :
//   1) Mots-cles dans le champ DESCR (priorite, plus robuste)
//   2) Regex sur la notation (fallback, flag /i case-insensitive)
//   Retourne null si aucun match (l'appelant affiche "indetermine").
//
// COUTS : fourchettes INDICATIVES, France 2025, HT, chantier moyen 1000-10000 m² SHON.
// A ajuster selon region, complexite du projet, et conditions de sol reelles.
// ============================================================================

// ============================================================================
// SA_DTU_13_12_TYPES — Typologie sols du DTU 13.12 (abaques Kp pressiometre / Kc penetro)
// ============================================================================
// Source : DTU 13.12 (DTU P11-711, mars 1988) §3.2.2 Essais pressiometriques
//          et §3.2.3.1 Penetrometre statique (abaques Kp et Kc)
// ============================================================================
var SA_DTU_13_12_TYPES = {
    'I':   { label: 'Argile, Limon',                                              kp_max: 1.1,  kc_max: 0.5  },
    'II':  { label: 'Sables, Graviers',                                           kp_max: 1.3,  kc_max: 0.22 },
    'III': { label: 'Craie, Marnes, Marno-calcaire, Roches alt\u00e9r\u00e9es ou fragment\u00e9es', kp_max: 1.85, kc_max: 0.5  }
};

// ============================================================================
// SA_DTU_13_12_CONTRAINTES — Tableau §3.1 des contraintes admissibles
// ============================================================================
// Source : DTU 13.12 (mars 1988) §3.1 « Contrainte de calcul d\u00e9duite de l\u2019exp\u00e9rience »
// Valeurs indicatives en l\u2019absence de problemes geotechniques particuliers.
// ============================================================================
var SA_DTU_13_12_CONTRAINTES = {
    'roches_peu_fissurees_saines': {
        q_min: 0.75, q_max: 4.5, unit: 'MPa',
        libelle: 'Roches peu fissur\u00e9es saines, non d\u00e9sagr\u00e9g\u00e9es, stratification favorable',
        ref: 'DTU 13.12 \u00a73.1'
    },
    'terrain_non_coherent_bonne_compacite': {
        q_min: 0.35, q_max: 0.75, unit: 'MPa',
        libelle: 'Terrains non coh\u00e9rents \u00e0 bonne compacit\u00e9',
        ref: 'DTU 13.12 \u00a73.1'
    },
    'terrain_non_coherent_compacite_moyenne': {
        q_min: 0.2, q_max: 0.4, unit: 'MPa',
        libelle: 'Terrains non coh\u00e9rents \u00e0 compacit\u00e9 moyenne',
        ref: 'DTU 13.12 \u00a73.1'
    },
    'argiles': {
        q_min: 0.1, q_max: 0.3, unit: 'MPa',
        libelle: 'Argiles (hors tr\u00e8s plastiques)',
        ref: 'DTU 13.12 \u00a73.1'
    },
    'hors_typologie': {
        q_min: null, q_max: null, unit: 'MPa',
        libelle: 'Hors typologie DTU 13.12 \u2014 sols organiques, remblais anthropiques, formations en mouvement',
        ref: 'DTU 13.12 \u00a73.1 (non applicable)'
    }
};

// ============================================================================
// SA_SNBPE_SEUILS — Seuils beton bas carbone (SNBPE avril 2021)
// ============================================================================
// Source : SNBPE « Beton Bas Carbone \u2014 Definition » (avril 2021, 8 p.),
// conformite NF EN 206/CN, calcul impact selon NF EN 15804 via configurateur
// BETie, rendu chantier (hors armatures beton arme).
// Distance moyenne retenue camion malaxeur BPE \u2192 chantier : 18,5 km.
// Unite : kgCO2eq/m3 de beton (hors armatures).
// ============================================================================
var SA_SNBPE_SEUILS = {
    'fondations_superficielles': {
        classe_resistance: 'C25/30', classe_exposition: 'XC1-XC2',
        seuil_bas_carbone: 180, classique_min: 200, classique_max: 230,
        usage: 'Fondations superficielles (semelles, radiers en milieu non agressif)'
    },
    'dalles_voiles_interieurs': {
        classe_resistance: 'C25/30', classe_exposition: 'XC3-XC4-XF1',
        seuil_bas_carbone: 195, classique_min: 210, classique_max: 240,
        usage: 'Dalles et voiles int\u00e9rieurs/ext\u00e9rieurs courants'
    },
    'batiment_courant_C30_37': {
        classe_resistance: 'C30/37', classe_exposition: 'XC-XF1-XD1',
        seuil_bas_carbone: 200, classique_min: 220, classique_max: 250,
        usage: 'B\u00e2timent courant (voiles, planchers RDC \u00e0 R+3)'
    },
    'batiment_courant_C35_45': {
        classe_resistance: 'C35/45', classe_exposition: 'XC-XF1-XD1',
        seuil_bas_carbone: 230, classique_min: 260, classique_max: 290,
        usage: 'B\u00e2timent courant haute r\u00e9sistance (voiles porteurs, poutres)'
    },
    'zone_montagne': {
        classe_resistance: 'C30/37', classe_exposition: 'XF3',
        seuil_bas_carbone: 235, classique_min: 250, classique_max: 280,
        usage: 'B\u00e2timents en zone de montagne (gel s\u00e9v\u00e8re)'
    },
    'bord_de_mer_XS1_XS2': {
        classe_resistance: 'C30/37', classe_exposition: 'XS1-XS2',
        seuil_bas_carbone: 230, classique_min: 250, classique_max: 280,
        usage: 'B\u00e2timents en bord de mer (br\u00fbme saline)'
    },
    'bord_de_mer_XS3': {
        classe_resistance: 'C35/45', classe_exposition: 'XS3',
        seuil_bas_carbone: 260, classique_min: 280, classique_max: 310,
        usage: 'B\u00e2timents en bord de mer (zones de mar\u00e9e)'
    },
    'voirie_legere_XF4': {
        classe_resistance: 'C30/37', classe_exposition: 'XF4',
        seuil_bas_carbone: 240, classique_min: 260, classique_max: 300,
        usage: 'Voiries l\u00e9g\u00e8res en zone salage fr\u00e9quent'
    },
    'agricole_XA3': {
        classe_resistance: 'C40/50', classe_exposition: 'XA3',
        seuil_bas_carbone: 270, classique_min: 280, classique_max: 320,
        usage: 'B\u00e2timent agricole forte agression chimique (ensilages, dalles \u00e9levage)'
    },
    'exemples_reels': [
        { nom: '\u00c9cole Jean Zay (Toulouse)',     classe: 'C25/30 XC1', valeur: 135 },
        { nom: 'Tour La Marseillaise (Marseille)',   classe: 'C35/45 XF1', valeur: 178 }
    ],
    'beton_reference': {
        kgco2_m3: 215,
        note: 'Moyenne des fourchettes \u00ab b\u00e9ton classique \u00bb SNBPE pour un usage fondation/voile courant (C25/30 \u00e0 C30/37 en classe d\'exposition XC). Utilis\u00e9 comme d\u00e9nominateur pour le champ carbone_ratio_vs_beton. Hors armatures B.A. (~60-80 kgCO\u2082eq/m\u00b3 suppl\u00e9mentaires selon taux d\'acier).',
        norme: 'NF EN 206/CN + NF EN 15804'
    }
};

var SA_LITHO_ATTRIBUTES = {

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       DEPOTS SUPERFICIELS                             ║
    // ╚══════════════════════════════════════════════════════════════════════╝

    'alluvions_recentes': {
        label: 'Alluvions fluviatiles recentes (Holocene)',
        descr_keywords: ['alluvion récente', 'alluvions récentes', 'alluvions actuelles',
                         'limon alluv', 'tourbe', 'tourbes', 'vase', 'vases',
                         'sable fluviatile', 'marais', 'delta', 'estuaire'],
        notation_regex: /^Fz|^Fa|^Fr|^Tz|^Mz/i,
        periode: 'Holocene',
        rock_type: 'meuble',
        eurocode_soil_class: 'D',
        dtu_13_12_type: 'I',
        dtu_13_12_contrainte_mpa: [0.05, 0.15],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 sous le seuil des argiles courantes (0,1-0,3 MPa) du fait des tourbes/vases. G1 PGC + oedom\u00e8tre imp\u00e9ratifs.',
        portance: 'faible_a_mediocre',
        portance_note: 'Sols compressibles, saturés, tres sensibles a l\'eau. Nappe affleurante frequente.',
        fondation_type: 'profondes_pieux_ou_amelioration',
        fondation_cost_min: 200, fondation_cost_max: 350,  // €/m² SHON
        fondation_cost_note: 'Pieux ø400-600 profonds 8-15 m ou amelioration sol (jet grouting, colonnes ballastees).',
        permeabilite: 'variable',
        permeabilite_k: [1e-7, 1e-4],  // m/s
        strategy_ep: 'retention_obligatoire',
        strategy_ep_note: 'Nappe proche : aucune infiltration. Bassin etanche ou rejet exutoire.',
        karst_risk: false,
        rga_risk: 'variable',
        radon_potential: 'faible',
        amplification_sismique: 1.8,  // classe D-E Eurocode 8
        amplification_note: 'Classe sol D-E : amplification forte en zones sismiques ≥ 3.',
        liquefaction_risk: 'eleve_si_zone_sismique',
        cout_excavation_ratio: 1.0,     // standard
        dechet_category: 'inerte_ou_K2',
        aar_risk: 'faible',              // granulats alluviaux generalement inertes
        stabilite_pente_max_deg: 15,
        g1_required: true,
        g1_note: 'Imperatif (loi ELAN). Sondages sous nappe + piezometre + essais de gonflement.',
        etudes_complementaires: ['piezometrie', 'CPT_pressiometre', 'analyse_liquefaction_si_zone_3+'],
        geothermie_potentiel: 'doublet_sur_nappe_alluviale_excellent',
        materiaux_locaux: ['granulats_fluviatiles', 'sable_a_beton'],
        risques_bati: ['tassements_differentiels', 'liquefaction', 'inondation', 'agressivite_eau'],
        breeam_credits: ['Pol 03', 'LE 04', 'Wat 01'],
        commentaire_expert: 'Zone a proscrire pour implantations lourdes sans amelioration. Ideale pour espaces verts, parkings, bassins.'
    },

    'alluvions_anciennes': {
        label: 'Alluvions fluviatiles anciennes (basses a hautes terrasses)',
        descr_keywords: ['basse terrasse', 'moyenne terrasse', 'haute terrasse',
                         'alluvion ancienne', 'alluvions anciennes', 'terrasse de ',
                         'alluvions indifférenciées', 'alluvions fluviatiles anciennes',
                         'nappe d\'épandage à gros galets', 'formation détritique résiduelle',
                         'épandages fluviatiles', 'formations détritiques des plateaux'],
        notation_regex: /^F[yxwvutsq]|^FT|^F[IVX]|^FO\b|^Hm-p|^RFv/i,
        periode: 'Pleistocene',
        rock_type: 'meuble_consolide',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'II',
        dtu_13_12_contrainte_mpa: [0.25, 0.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Terrains non coh\u00e9rents \u00e0 compacit\u00e9 moyenne (0,2-0,4 MPa) \u00e0 bonne compacit\u00e9 (0,35-0,75 MPa) selon densit\u00e9 des terrasses.',
        portance: 'moyenne_a_bonne',
        portance_note: 'Sables et graviers plus denses que les alluvions recentes. Verifier lentilles argileuses.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 90, fondation_cost_max: 140,
        permeabilite: 'bonne',
        permeabilite_k: [1e-5, 1e-3],
        strategy_ep: 'infiltration_recommandee',
        karst_risk: false,
        rga_risk: 'faible',
        radon_potential: 'faible',
        amplification_sismique: 1.35,
        liquefaction_risk: 'faible',
        cout_excavation_ratio: 1.0,
        dechet_category: 'inerte',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 25,
        g1_required: 'recommande',
        etudes_complementaires: ['essai_infiltration_k'],
        geothermie_potentiel: 'sondes_ou_nappe_si_presente',
        materiaux_locaux: ['granulats_beton', 'sable_de_construction'],
        risques_bati: ['heterogeneite_lentilles_argileuses'],
        breeam_credits: ['Pol 03', 'LE 04', 'Mat 03'],
        commentaire_expert: 'Excellent substrat pour infiltration EP (SUDS). Bonne portance pour fondations courantes.'
    },

    'colluvions': {
        label: 'Colluvions et dépôts de pente',
        descr_keywords: ['colluvion', 'colluv', 'depot de pente', 'dépôt de pente',
                         'bas de pente', 'apports de versant'],
        notation_regex: /^C[FvVyzR]?\b|^CF\b|^CR\b|^Cy\b|^Cz\b|^CE\b|^CP/i,
        periode: 'Holocene',
        rock_type: 'meuble',
        eurocode_soil_class: 'D',
        dtu_13_12_type: 'I',
        dtu_13_12_contrainte_mpa: [0.1, 0.25],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Argiles (0,1-0,3 MPa), matrice argileuse h\u00e9t\u00e9rog\u00e8ne. Fourchette \u00e0 confirmer par sondages (heterogeneite verticale).',
        portance: 'faible_a_moyenne',
        portance_note: 'Tres heterogenes selon materiau source. Epaisseurs variables (0,5 a 5 m).',
        fondation_type: 'semelles_superficielles_avec_purge_ou_ameliorees',
        fondation_cost_min: 120, fondation_cost_max: 220,
        permeabilite: 'moyenne',
        permeabilite_k: [1e-6, 1e-4],
        strategy_ep: 'infiltration_possible_a_analyser',
        karst_risk: false,
        rga_risk: 'variable',
        radon_potential: 'depend_du_substrat_source',
        amplification_sismique: 1.4,
        liquefaction_risk: 'faible',
        cout_excavation_ratio: 1.1,
        dechet_category: 'inerte_ou_K2',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 20,
        g1_required: true,
        g1_note: 'Sondages requis pour caracteriser l\'heterogeneite verticale.',
        etudes_complementaires: ['sondages_destructifs', 'piezometrie'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: [],
        risques_bati: ['glissements_en_pente', 'tassements_differentiels'],
        breeam_credits: ['Pol 03'],
        commentaire_expert: 'Vigilance en forte pente : instabilites possibles lors de terrassements.'
    },

    'eboulis': {
        label: 'Eboulis, grèzes litées, pierrailles',
        descr_keywords: ['éboulis', 'eboulis', 'groize', 'grèze', 'grezes', 'grèzes',
                         'scree', 'pierraille', 'cailloutis calcaire', 'cônes éboulis'],
        notation_regex: /^E\d?\b|^GZ\b|^GL\b|^GN\b/i,
        periode: 'Pleistocene_a_Holocene',
        rock_type: 'meuble_grossier',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'II',
        dtu_13_12_contrainte_mpa: [0.3, 0.6],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Terrains non coh\u00e9rents \u00e0 compacit\u00e9 moyenne (0,2-0,4 MPa) \u00e0 bonne compacit\u00e9 (0,35-0,75 MPa). Gros blocs : ancrage sur substrat rocheux si affleurant.',
        portance: 'moyenne_a_bonne',
        portance_note: 'Bonne drainance, portance correcte. Attention aux gros blocs en excavation.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 80, fondation_cost_max: 130,
        permeabilite: 'tres_bonne',
        permeabilite_k: [1e-4, 1e-2],
        strategy_ep: 'infiltration_excellente',
        karst_risk: false,
        rga_risk: 'nul',
        radon_potential: 'depend_du_substrat_source',
        amplification_sismique: 1.2,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.3,
        dechet_category: 'inerte',
        aar_risk: 'a_verifier_selon_source',
        stabilite_pente_max_deg: 30,
        g1_required: 'recommande',
        etudes_complementaires: [],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['granulat_concasse', 'pierre_seche'],
        risques_bati: ['glissements_en_forte_pente', 'gros_blocs_terrassement'],
        breeam_credits: ['Pol 03', 'LE 04', 'Mat 03'],
        commentaire_expert: 'Excellent pour infiltration EP. Reutilisation des blocs en soutenement ecologique.'
    },

    'limons_loess': {
        label: 'Limons de plateau, loess',
        descr_keywords: ['limon de plateau', 'limons des plateaux', 'lœss', 'loess',
                         'limons éoliens', 'limon loessique', 'limon calcaire'],
        notation_regex: /^LP\b|^OE\b|^Lp\b/i,
        periode: 'Pleistocene',
        rock_type: 'meuble_fin',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'I',
        dtu_13_12_contrainte_mpa: [0.15, 0.3],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Classe Argiles (0,1-0,3 MPa) pour limons. Types I DTU (abaques Kp/Kc limons/argiles). Sensibles \u00e0 l\'humidit\u00e9.',
        portance: 'moyenne',
        portance_note: 'Sensible a l\'humidite (effondrabilité pour loess secs imbibes). Retrait possible.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 90, fondation_cost_max: 140,
        permeabilite: 'faible',
        permeabilite_k: [1e-8, 1e-6],
        strategy_ep: 'retention_recommandee',
        karst_risk: false,
        rga_risk: 'moyen',
        radon_potential: 'faible',
        amplification_sismique: 1.35,
        liquefaction_risk: 'faible_a_moyen',
        cout_excavation_ratio: 1.0,
        dechet_category: 'inerte',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 25,
        g1_required: true,
        g1_note: 'Loi ELAN + essais oedometriques pour gonflement et effondrabilité.',
        etudes_complementaires: ['essai_oedometrique', 'essai_gonflement'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: [],
        risques_bati: ['retrait_gonflement', 'effondrabilite_par_imbibition', 'erosion_ravinement'],
        breeam_credits: ['Pol 03', 'Hea 02'],
        commentaire_expert: 'Specifique Nord, Est, Centre France. Prevoir drainage peripherique.'
    },

    'moraines': {
        label: 'Moraines glaciaires, cônes fluvio-glaciaires, dépôts torrentiels',
        // NB : 'postglaciaire' et 'tardiglaciaire' sont des qualificatifs d'age qui apparaissent
        // dans les descriptions BRGM d'alluvions, colluvions, tourbes… — retires pour eviter les
        // faux positifs. Les moraines stricto sensu sont deja captees par les autres mots-cles.
        descr_keywords: ['moraine', 'moraine glaciaire', 'till', 'fluvio-glaciaire',
                         'glaciaire', 'cône de déjection', 'cones de dejection',
                         'banquette alluvionnaire',
                         'mindel', 'würm', 'wurm', 'riss', 'sandur', 'esker', 'drumlin',
                         'dépôt torrentiel', 'depot torrentiel', 'torrentiel',
                         'nappe d\'épandage fluvio-glaciaire'],
        notation_regex: /^G[lmxfg]\b|^Gx|^Gy|^Gz|^Gw\b|^FJ[yzxw]|^FJza?/i,
        periode: 'Pleistocene',
        rock_type: 'meuble_heterogene',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'II',
        dtu_13_12_contrainte_mpa: [0.35, 0.75],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Terrains non coh\u00e9rents \u00e0 bonne compacit\u00e9 (moraines compactes denses, blocs engag\u00e9s dans matrice argilo-sableuse). H\u00e9t\u00e9rog\u00e9n\u00e9it\u00e9 forte \u2192 sondages indispensables.',
        portance: 'variable_moyenne_a_bonne',
        portance_note: 'Alpes, Jura, Pyrénées. Blocs erratiques pouvant gener excavation.',
        fondation_type: 'semelles_superficielles_ou_radier',
        fondation_cost_min: 110, fondation_cost_max: 180,
        permeabilite: 'variable',
        permeabilite_k: [1e-7, 1e-4],
        strategy_ep: 'a_analyser_au_cas_par_cas',
        karst_risk: false,
        rga_risk: 'faible_a_moyen',
        radon_potential: 'depend_du_substrat',
        amplification_sismique: 1.3,
        liquefaction_risk: 'faible',
        cout_excavation_ratio: 1.4,
        dechet_category: 'inerte',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 20,
        g1_required: true,
        etudes_complementaires: ['sondages_destructifs', 'essai_lugeon_si_permeable'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['blocs_erratiques', 'granulats_grossiers'],
        risques_bati: ['heterogeneite', 'blocs', 'instabilites_en_pente'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        commentaire_expert: 'Sondages indispensables : heterogeneite forte meme a faible distance.'
    },

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       ROCHES SEDIMENTAIRES                            ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    // NB : craie testee AVANT calcaires_massifs pour capter C2-C6 du Crétacé sup.

    'craie': {
        label: 'Craie (Bassin parisien, Picardie, Champagne, Artois)',
        descr_keywords: ['craie', 'crayeux', 'dièves', 'inoceramus', 'bélemnite',
                         'belemnite', 'micraster', 'actinocamax'],
        notation_regex: /^C[2-6]/i,
        periode: 'Cretace_superieur',
        rock_type: 'roche_tendre',
        eurocode_soil_class: 'B',
        dtu_13_12_type: 'III',
        dtu_13_12_contrainte_mpa: [0.35, 0.75],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Craie \u00e9quivalente \u00e0 Terrains non coh\u00e9rents \u00e0 bonne compacit\u00e9 (Type III DTU explicitement list\u00e9 dans abaques Kp/Kc). Sensible \u00e0 l\'eau (dissolution \u2192 cavit\u00e9s).',
        portance: 'bonne',
        portance_note: 'Attention poches altérées en surface et CAVITES DE MARNIERES (anciennes exploitations agricoles).',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 70, fondation_cost_max: 110,
        permeabilite: 'bonne_par_fissuration',
        permeabilite_k: [1e-5, 1e-3],
        strategy_ep: 'infiltration_possible_avec_pretraitement',
        strategy_ep_note: 'Infiltration OK mais aquifere vulnerable : separateur hydrocarbures obligatoire.',
        karst_risk: true,
        karst_note: 'Cavités de marnières (puits + galeries d\'extraction de craie) très fréquentes Nord, Picardie, Seine-Maritime.',
        rga_risk: 'faible',
        radon_potential: 'faible',
        amplification_sismique: 1.15,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.2,
        dechet_category: 'inerte',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 60,
        g1_required: 'recommande',
        g1_note: 'Reconnaissance geoRadar OBLIGATOIRE pour detecter marnieres.',
        etudes_complementaires: ['geoRadar_cavites', 'microgravimetrie_si_cavites_suspectees'],
        geothermie_potentiel: 'doublet_sur_nappe_craie',
        materiaux_locaux: ['chaux_aerienne', 'amendement_agricole'],
        risques_bati: ['effondrement_marniere', 'dissolution_karstique'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        commentaire_expert: 'Le risque cavités de marnières est MAJEUR dans Nord, Somme, Oise, Seine-Maritime. Consulter BDCavité + geoRadar.'
    },

    'calcaires_massifs': {
        label: 'Calcaires massifs, dolomies, travertins, calcaires bioclastiques',
        descr_keywords: ['calcaire', 'calcaires', 'biocalcarenite', 'oolith', 'oolithique',
                         'marnes calcaires', 'calcaire lithographique', 'calcarenite',
                         'dolomie', 'dolomitique', 'cipolin', 'travertin', 'tuf calcaire',
                         'rudiste', 'polypier', 'récif', 'recifal', 'lithophages',
                         'muschelkalk', 'wellenkalk', 'hauptmuschelkalk',
                         'hettangien', 'sinémurien', 'pliensbachien', 'toarcien',
                         'aalénien', 'bajocien', 'bathonien', 'callovien', 'oxfordien',
                         'kimméridgien', 'portlandien', 'tithonique', 'valanginien',
                         'barrémien', 'hauterivien', 'jurassique',
                         'faciès recristallisés', 'carbonaté'],
        notation_regex: /^[j][1-9]?|^jp|^cC|^DA\b|^Cip\b|^UCM\b|^t[345]\b|^I[1-3]/i,
        periode: 'Mesozoique_a_Cenozoique',
        rock_type: 'roche',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [1.0, 4.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines, non d\u00e9sagr\u00e9g\u00e9es, stratification favorable (0,75-4,5 MPa). Cas des calcaires massifs sains. V\u00e9rifier altered surface.',
        portance: 'excellente',
        portance_note: 'Portance max en rocher sain. Attention poches decompressees en surface et karst.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 60, fondation_cost_max: 100,
        permeabilite: 'par_fissuration',
        permeabilite_k: [1e-6, 1e-2],  // très variable selon karst
        strategy_ep: 'infiltration_possible_avec_pretraitement',
        strategy_ep_note: 'Infiltration OK mais vulnerabilité aquifere karstique : pretraiter hydrocarbures.',
        karst_risk: true,
        karst_note: 'Cavités possibles (Jura, Provence, Quercy, Causses). GeoRadar recommandé.',
        rga_risk: 'faible',
        radon_potential: 'faible',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 2.0,  // rocher, surcout sciage/brise-roche
        dechet_category: 'inerte',
        aar_risk: 'a_verifier_certains_calcaires_reactifs',
        stabilite_pente_max_deg: 70,
        g1_required: 'recommande_si_karstique',
        etudes_complementaires: ['geoRadar_ou_sismique_refraction', 'microgravi_si_cavites'],
        geothermie_potentiel: 'doublet_sur_aquifere_karstique',
        materiaux_locaux: ['pierre_de_taille', 'granulat_concasse', 'chaux_aerienne', 'ciment_naturel'],
        risques_bati: ['effondrement_karstique', 'heterogeneite_poches', 'surcout_excavation'],
        breeam_credits: ['Pol 03', 'Mat 03', 'LE 04'],
        commentaire_expert: 'Meilleure portance mais surcout excavation 30-50%. Ressource locale privilégiée.'
    },

    'argiles_marnes': {
        label: 'Argiles, marnes, pélites, formations argileuses',
        descr_keywords: ['argile', 'argiles', 'marne', 'marnes', 'argilo-marneu',
                         'pelite', 'pélite', 'pelites', 'silt', 'silts', 'argilite',
                         'argileux', 'marneux', 'argile verdatre', 'glaise',
                         'smectite', 'montmorillonite', 'claystone'],
        notation_regex: /^[em][1-9]a?|\¡/i,
        periode: 'Mesozoique_a_Cenozoique',
        rock_type: 'roche_meuble',
        eurocode_soil_class: 'D',
        dtu_13_12_type: 'I',
        dtu_13_12_contrainte_mpa: [0.1, 0.3],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Argiles (0,1-0,3 MPa) pour les termes argileux ; les marnes plus consolid\u00e9es peuvent approcher le type III (0,35-0,75 MPa). Risque RGA majeur.',
        portance: 'mediocre_a_moyenne',
        portance_note: 'Sensibilite forte a l\'eau, gonflement-retrait important (SMECTITES).',
        fondation_type: 'semelles_profondes_avec_beche_ou_radier',
        fondation_cost_min: 110, fondation_cost_max: 180,
        fondation_cost_note: 'Beche >1m, semelles elargies, ou radier si charges faibles.',
        permeabilite: 'tres_faible',
        permeabilite_k: [1e-11, 1e-8],
        strategy_ep: 'retention_obligatoire',
        strategy_ep_note: 'Aucune infiltration possible. Bassin + rejet en exutoire controle.',
        karst_risk: false,
        rga_risk: 'eleve',
        rga_note: 'Substrat argileux : retrait-gonflement TOUJOURS a prendre en compte (loi ELAN).',
        radon_potential: 'faible',
        amplification_sismique: 1.35,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.1,
        dechet_category: 'inerte_ou_K2_si_pyriteuses',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 12,
        g1_required: true,
        g1_note: 'OBLIGATOIRE (loi ELAN) + essais gonflement (oedometre, Atterberg).',
        etudes_complementaires: ['essai_gonflement', 'oedometrique', 'limites_Atterberg'],
        geothermie_potentiel: 'sondes_verticales_uniquement',
        materiaux_locaux: ['argile_briqueterie', 'tuile', 'carreau'],
        risques_bati: ['retrait_gonflement', 'fissures_differentielles', 'glissement_pente'],
        breeam_credits: ['Pol 03', 'Hea 02'],
        commentaire_expert: 'Formation N°1 responsable de sinistres RGA en France. Prevoir > 1,0 m d\'encrage semelles.'
    },

    'gres': {
        label: 'Grès, arkoses, poudingues, quartzites, conglomérats',
        descr_keywords: ['gres', 'grès', 'greseux', 'gréseux', 'sable cimenté',
                         'quartzite', 'arkose', 'arkoses', 'poudingue', 'poudingues',
                         'conglomerat', 'conglomérat'],
        notation_regex: /^[tj][1-9]G|^e5G|^d[1-3]|^Sg\b/i,
        periode: 'Paleozoique_a_Cenozoique',
        rock_type: 'roche',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [0.75, 3.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines (0,75-4,5 MPa). Cas des gr\u00e8s et quartzites bien ciment\u00e9s ; descend vers la cat\u00e9gorie III (0,35-0,75 MPa) si altered/fragment\u00e9.',
        portance: 'bonne_a_excellente',
        portance_note: 'Portance elevee. Verifier etat de fracturation et cimentation.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 70, fondation_cost_max: 110,
        permeabilite: 'moyenne_a_bonne_par_porosite_et_fissures',
        permeabilite_k: [1e-6, 1e-4],
        strategy_ep: 'infiltration_bonne',
        karst_risk: false,
        rga_risk: 'faible',
        radon_potential: 'faible_a_moyen',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.8,
        dechet_category: 'inerte',
        aar_risk: 'variable_selon_source',
        stabilite_pente_max_deg: 65,
        g1_required: 'recommande',
        etudes_complementaires: ['sismique_refraction_profondeur_rocher'],
        geothermie_potentiel: 'doublet_si_aquifere',
        materiaux_locaux: ['pierre_de_taille', 'granulats', 'paves'],
        risques_bati: ['heterogeneite_fracturation'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        commentaire_expert: 'Excellent pour fondations. Surcout excavation 80% vs meuble.'
    },

    'sables_meubles': {
        label: 'Sables et formations sableuses non consolidées',
        descr_keywords: ['sable', 'sableux', 'formation sableuse', 'sable eolien',
                         'sable éolien', 'dune', 'dunes', 'placages sableux',
                         'détritique', 'détritiques', 'alios', 'grison',
                         'mio-pliocène', 'pliocène', 'miocène',
                         'sables de Fontainebleau', 'sables de Cuise'],
        notation_regex: /^e7a?S\b|^e4S\b|^m[0-9]?S\b|^Oe\b|^Hm-p|^æ\b/i,
        periode: 'Cenozoique',
        rock_type: 'meuble_granulaire',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'II',
        dtu_13_12_contrainte_mpa: [0.2, 0.4],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Terrains non coh\u00e9rents \u00e0 compacit\u00e9 moyenne (0,2-0,4 MPa). Monte \u00e0 0,35-0,75 MPa si DR > 65 %. Abaques Kp/Kc type II.',
        portance: 'moyenne',
        portance_note: 'Correcte en sables denses (DR > 50%), mediocre en sables laches.',
        fondation_type: 'semelles_superficielles_ou_radier',
        fondation_cost_min: 90, fondation_cost_max: 140,
        permeabilite: 'bonne_a_tres_bonne',
        permeabilite_k: [1e-5, 1e-3],
        strategy_ep: 'infiltration_excellente',
        karst_risk: false,
        rga_risk: 'nul',
        radon_potential: 'faible',
        amplification_sismique: 1.35,
        liquefaction_risk: 'moyen_si_satures_et_zone_sismique',
        cout_excavation_ratio: 1.0,
        dechet_category: 'inerte',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 30,
        g1_required: 'recommande',
        etudes_complementaires: ['CPT_densite_relative', 'analyse_liquefaction_zone_3+'],
        geothermie_potentiel: 'doublet_si_aquifere',
        materiaux_locaux: ['sable_beton', 'sable_enrobes'],
        risques_bati: ['tassements_si_laches', 'liquefaction_si_sature'],
        breeam_credits: ['Pol 03', 'LE 04', 'Mat 03'],
        commentaire_expert: 'Excellent pour gestion EP (infiltration). Attention stabilite lors de terrassements.'
    },

    'charbons_lignites': {
        label: 'Charbons, lignites, formations houillères',
        descr_keywords: ['charbon', 'lignite', 'houill', 'houiller', 'Stéphanien',
                         'westphalien', 'anthracite'],
        notation_regex: /^h[1-9]|^h[ab]\b/i,
        periode: 'Carbonifere',
        rock_type: 'roche_tendre',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'hors_typologie',
        dtu_13_12_contrainte_mpa: [null, null],
        dtu_13_12_ref: 'Non trait\u00e9 par le tableau DTU 13.12 \u00a73.1 \u2014 mati\u00e8re organique carbon\u00e9e, comportement instable (feu, gonflement par hydratation de pyrite). \u00c9tude sp\u00e9cifique + historique minier BRGM/GEODERIS imp\u00e9ratifs.',
        portance: 'variable',
        portance_note: 'Risque d\'affaissements miniers dans les bassins houillers exploites.',
        fondation_type: 'superficielles_ou_profondes_selon_historique',
        fondation_cost_min: 120, fondation_cost_max: 300,
        permeabilite: 'faible',
        permeabilite_k: [1e-9, 1e-6],
        strategy_ep: 'retention',
        karst_risk: false,
        cavite_risk: 'anciennes_galeries_minieres',
        rga_risk: 'faible',
        radon_potential: 'moyen_a_eleve',
        amplification_sismique: 1.2,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.3,
        dechet_category: 'variable_selon_polluants',
        aar_risk: 'non_pertinent',
        stabilite_pente_max_deg: 30,
        g1_required: true,
        g1_note: 'ETUDE HISTORIQUE miniere obligatoire + sondages + BRGM GEODERIS.',
        etudes_complementaires: ['etude_historique_minière', 'analyse_polluants', 'microgravi'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: [],
        risques_bati: ['affaissements_miniers', 'pollution', 'feu_de_houillere'],
        breeam_credits: ['Pol 03', 'LE 01', 'Wst 01'],
        commentaire_expert: 'Nord-Pas-de-Calais, Lorraine, Massif Central. Consulter GEODERIS + plans anciens.'
    },

    'evaporites_gypse': {
        label: 'Gypses, anhydrites, sels, évaporites',
        descr_keywords: ['gypse', 'anhydrite', 'sel', 'evaporite', 'évaporite',
                         'saumures', 'halite', 'formation salifère'],
        notation_regex: /^e[2-4]g|^k[1-4]g|^t[1-3]g/i,
        periode: 'Trias_a_Tertiaire',
        rock_type: 'roche_soluble',
        eurocode_soil_class: 'B',
        dtu_13_12_type: 'III',
        dtu_13_12_contrainte_mpa: [0.5, 1.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Type III (roches alt\u00e9r\u00e9es ou fragment\u00e9es) pour le gypse massif. Contrainte r\u00e9duite vis-\u00e0-vis du potentiel de dissolution. Protection hydraulique imp\u00e9rative.',
        portance: 'bonne_mais_risque_dissolution',
        portance_note: 'Dissolution possible → cavités évolutives, affaissements progressifs.',
        fondation_type: 'superficielles_avec_precautions_specifiques',
        fondation_cost_min: 150, fondation_cost_max: 350,
        permeabilite: 'faible_sauf_si_fissures',
        permeabilite_k: [1e-9, 1e-6],
        strategy_ep: 'retention_obligatoire',
        strategy_ep_note: 'AUCUNE infiltration : risque accéleration dissolution et effondrement.',
        karst_risk: true,
        karst_note: 'Karst évaporitique : cavités évolutives plus rapides que karst calcaire.',
        rga_risk: 'faible',
        radon_potential: 'faible',
        amplification_sismique: 1.1,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.5,
        dechet_category: 'K2_K3',  // sulfates pour gypse
        aar_risk: 'risque_sulfatage_betons',
        stabilite_pente_max_deg: 40,
        g1_required: true,
        g1_note: 'Reconnaissance geoRadar + etude hydrogeologique dissolution.',
        etudes_complementaires: ['geoRadar_cavites', 'traceur_hydrogeologique', 'sondages_profonds'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['platre', 'enduits_gypse'],
        risques_bati: ['affaissement_progressif', 'effondrement_soudain', 'attaque_sulfatique_betons'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        commentaire_expert: 'Paris Nord-Est, Provence, Lorraine. Ciment sulfo-resistant (CEM III) obligatoire pour fondations.'
    },

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       ROCHES MAGMATIQUES PLUTONIQUES                  ║
    // ╚══════════════════════════════════════════════════════════════════════╝

    'granites': {
        label: 'Granites, leucogranites, granodiorites, microgranites, pegmatites, lamprophyres',
        descr_keywords: ['granite', 'granitique', 'leucogranite', 'monzogranite',
                         'granodiorite', 'microgranite', 'pegmatite', 'aplite',
                         'quartz (filon)', 'filon de quartz', 'brèche',
                         'lamprophyre', 'lamprophyres', 'tonalite', 'diabase',
                         'filon', 'filons', 'porphyroïde'],
        notation_regex: /γ|ξ|μ|^P\b|^aã|^Q\b|^br\d|^fbr\b|λ|^Qz\b/i,
        periode: 'Precambrien_a_Hercynien',
        rock_type: 'roche_dure',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [1.5, 4.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines (0,75-4,5 MPa). Haut de fourchette pour granites massifs sains. Ar\u00e8ne superficielle \u00e0 traiter comme sol non coh\u00e9rent (0,35-0,75 MPa).',
        portance: 'excellente',
        portance_note: 'Portance max en rocher sain. Arene granitique superficielle peut etre mediocre.',
        fondation_type: 'semelles_superficielles_si_rocher_proche',
        fondation_cost_min: 70, fondation_cost_max: 130,
        fondation_cost_note: 'Si rocher <2m sous terrain, surcoût excavation mais fondations économiques.',
        permeabilite: 'faible_par_fissuration',
        permeabilite_k: [1e-9, 1e-6],
        strategy_ep: 'retention_ou_infiltration_par_arene',
        karst_risk: false,
        rga_risk: 'nul_en_rocher',
        radon_potential: 'tres_eleve',
        radon_note: 'Uranium dans granites : VMC double flux + membrane anti-radon OBLIGATOIRE en zone 3.',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 3.0,  // tres cher (brise-roche, explosifs)
        dechet_category: 'inerte',
        aar_risk: 'potentiellement_reactif',  // certains granites alcalins
        stabilite_pente_max_deg: 75,
        g1_required: 'recommande',
        etudes_complementaires: ['mesure_radon_air_interieur', 'essais_fracturation'],
        geothermie_potentiel: 'sondes_verticales_profondes_ou_EGS',
        materiaux_locaux: ['pierre_de_taille', 'granulat_concasse', 'paves', 'moellons'],
        risques_bati: ['excavation_cout_majeur', 'chutes_blocs_falaise', 'radon_interieur'],
        breeam_credits: ['Hea 02', 'Pol 03', 'Mat 03'],
        commentaire_expert: 'Bretagne, Massif Central, Vosges, Corse. Priorité Hea 02 pour radon.'
    },

    'roches_basiques': {
        label: 'Gabbros, diorites, dolérites, norites',
        descr_keywords: ['gabbro', 'diorite', 'dolerite', 'dolérite', 'norite'],
        notation_regex: /σ|ζ|η|ν/i,
        periode: 'Varie',
        rock_type: 'roche_dure',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [1.5, 4.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines (0,75-4,5 MPa). Haut de fourchette pour gabbros/diorites massifs sains.',
        portance: 'excellente',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 80, fondation_cost_max: 140,
        permeabilite: 'tres_faible',
        permeabilite_k: [1e-10, 1e-7],
        strategy_ep: 'retention_obligatoire',
        karst_risk: false,
        rga_risk: 'nul',
        radon_potential: 'faible_a_moyen',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 3.5,
        dechet_category: 'inerte',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 80,
        g1_required: 'recommande',
        etudes_complementaires: [],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['granulat_concasse_qualite_superieure'],
        risques_bati: ['excavation_cout_tres_eleve'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        commentaire_expert: 'Massifs ophiolitiques alpins, Vosges. Granulats d\'excellente qualite.'
    },

    'serpentinites': {
        label: 'Serpentinites, péridotites, roches ultrabasiques',
        descr_keywords: ['serpentinite', 'péridotite', 'peridotite', 'ophiolite',
                         'dunite', 'harzburgite', 'lherzolite'],
        notation_regex: /^θ|^Σ/,
        periode: 'Varie',
        rock_type: 'roche_dure_mais_alterée',
        eurocode_soil_class: 'B',
        dtu_13_12_type: 'III',
        dtu_13_12_contrainte_mpa: [0.75, 2.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es \u00e0 fissur\u00e9es (0,75-4,5 MPa) pour les parties saines. Descend vers type III (0,35-0,75 MPa) pour les zones serpentinis\u00e9es/alt\u00e9r\u00e9es.',
        portance: 'bonne',
        portance_note: 'Alteration en surface fréquente. Chrome et asbeste possibles dans certaines.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 90, fondation_cost_max: 160,
        permeabilite: 'faible',
        permeabilite_k: [1e-9, 1e-7],
        strategy_ep: 'retention',
        karst_risk: false,
        rga_risk: 'faible_en_rocher',
        radon_potential: 'faible',
        amplification_sismique: 1.1,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 2.5,
        dechet_category: 'K2_si_amiante_chromite',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 60,
        g1_required: true,
        g1_note: 'ANALYSE AMIANTE obligatoire (amiante naturel en contexte serpentineux).',
        etudes_complementaires: ['analyse_amiante', 'mineralogie_fine'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: [],
        risques_bati: ['amiante_naturel', 'heterogeneite'],
        breeam_credits: ['Pol 03', 'Hea 02', 'LE 01'],
        commentaire_expert: 'Alpes, Corse (ophiolites). Risque AMIANTE environnemental : protocole specifique.'
    },

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       ROCHES VOLCANIQUES                              ║
    // ╚══════════════════════════════════════════════════════════════════════╝

    'basaltes': {
        label: 'Basaltes et roches volcaniques basiques',
        descr_keywords: ['basalte', 'basaltique', 'trapp', 'dolerite',
                         'volcanisme basaltique', 'coulée basaltique'],
        notation_regex: /β/i,
        periode: 'Varie_Mesozoique_a_Recent',
        rock_type: 'roche_dure',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [1.5, 4.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines (0,75-4,5 MPa). Haut de fourchette pour basaltes massifs. \u00c0 minorer drastiquement si tubes de lave ou vacuoles d\u00e9tect\u00e9s.',
        portance: 'excellente',
        portance_note: 'Vacuoles et tubes de lave possibles en basaltes recents (Auvergne, Velay).',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 80, fondation_cost_max: 140,
        permeabilite: 'faible_globale_mais_fissurations',
        permeabilite_k: [1e-8, 1e-5],
        strategy_ep: 'a_analyser_au_cas_par_cas',
        karst_risk: false,
        cavite_risk: 'possible_en_coulee_recente',
        rga_risk: 'nul',
        radon_potential: 'moyen',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 3.0,
        dechet_category: 'inerte',
        aar_risk: 'potentiellement_reactif_opaline',
        stabilite_pente_max_deg: 80,
        g1_required: 'recommande',
        etudes_complementaires: ['geoRadar_si_coulee_recente'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['granulat_concasse', 'pouzzolane', 'pierre_volcanique'],
        risques_bati: ['effondrement_tube_de_lave', 'excavation_cout'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        commentaire_expert: 'Massif Central, Velay, Aubrac. Pouzzolanes = liant cimentaire local (Mat 03).'
    },

    'rhyolites_trachytes': {
        label: 'Rhyolites, trachytes, dacites, ignimbrites',
        descr_keywords: ['rhyolite', 'trachyte', 'dacite', 'ignimbrite', 'phonolite'],
        notation_regex: /ρ|τ|π/,
        periode: 'Varie',
        rock_type: 'roche_dure',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [1.0, 4.0],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines (0,75-4,5 MPa). Variations selon degr\u00e9 de fissuration. Ignimbrites tendres \u00e0 traiter comme type III.',
        portance: 'excellente',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 80, fondation_cost_max: 140,
        permeabilite: 'faible',
        permeabilite_k: [1e-10, 1e-7],
        strategy_ep: 'retention',
        karst_risk: false,
        rga_risk: 'nul',
        radon_potential: 'moyen_a_eleve',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 3.0,
        dechet_category: 'inerte',
        aar_risk: 'reactif_frequent',  // silice amorphe
        stabilite_pente_max_deg: 80,
        g1_required: 'recommande',
        etudes_complementaires: ['mesure_radon'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['granulat_concasse'],
        risques_bati: ['excavation_cout'],
        breeam_credits: ['Hea 02', 'Mat 03'],
        commentaire_expert: 'Silice amorphe REACTIVE : NF P18-594 avant utilisation en granulats beton.'
    },

    'cendres_tuffs_volcaniques': {
        label: 'Cinérites, tuffs volcaniques, projections, formations volcano-sédimentaires',
        descr_keywords: ['cinérite', 'cinerite', 'tuff', 'tufs', 'tuf volcanique',
                         'projection volcanique', 'projections', 'lapilli',
                         'strombolien', 'stromboliennes', 'volcano-sédimentaire',
                         'volcanisme', 'formations volcaniques', 'groupe volcano'],
        notation_regex: /^vt|^Tph/i,
        periode: 'Cenozoique_a_Recent',
        rock_type: 'roche_tendre',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'III',
        dtu_13_12_contrainte_mpa: [0.35, 1.0],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Type III (roches alt\u00e9r\u00e9es ou fragment\u00e9es, 0,35-0,75 MPa) extensible vers 1,0 MPa pour tuffs coh\u00e9rents. Chute \u00e0 Type I si argilification secondaire.',
        portance: 'moyenne',
        portance_note: 'Sensibilité eau. Altération en argiles expansives (smectites).',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 90, fondation_cost_max: 150,
        permeabilite: 'moyenne',
        permeabilite_k: [1e-7, 1e-5],
        strategy_ep: 'retention_si_argilise',
        karst_risk: false,
        rga_risk: 'moyen_si_altere',
        radon_potential: 'moyen',
        amplification_sismique: 1.2,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.3,
        dechet_category: 'inerte',
        aar_risk: 'reactif_frequent',
        stabilite_pente_max_deg: 30,
        g1_required: true,
        etudes_complementaires: ['analyse_mineralogique'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['pouzzolane'],
        risques_bati: ['retrait_gonflement_si_altere'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        commentaire_expert: 'Massif Central, Cantal. Pouzzolane historique des Romains (aqueduc, mortier).'
    },

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       ROCHES METAMORPHIQUES                           ║
    // ╚══════════════════════════════════════════════════════════════════════╝

    'gneiss_migmatites': {
        label: 'Gneiss, migmatites, cornéennes, amphibolites, granulites',
        descr_keywords: ['gneiss', 'migmatite', 'orthogneiss', 'paragneiss',
                         'amphibolite', 'granulite', 'cornéenne', 'cornéennes',
                         'métatexite', 'metatexite', 'sillimanite', 'hornblende',
                         'domaine magmatique', 'domaine métamorphique'],
        notation_regex: /ζ|^G\d?G|^USG\b/i,
        periode: 'Precambrien_a_Paleozoique',
        rock_type: 'roche_dure',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [1.0, 4.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines (0,75-4,5 MPa). Anisotropie de foliation \u00e0 v\u00e9rifier : orientation des plans critique pour pentes et pieux.',
        portance: 'tres_bonne',
        portance_note: 'Anisotropie possible selon foliation.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 75, fondation_cost_max: 130,
        permeabilite: 'faible_par_fissuration',
        permeabilite_k: [1e-9, 1e-6],
        strategy_ep: 'retention',
        karst_risk: false,
        rga_risk: 'nul_en_rocher',
        radon_potential: 'eleve',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 2.8,
        dechet_category: 'inerte',
        aar_risk: 'variable',
        stabilite_pente_max_deg: 75,
        g1_required: 'recommande',
        etudes_complementaires: ['mesure_radon', 'mesure_foliation'],
        geothermie_potentiel: 'sondes_verticales_profondes',
        materiaux_locaux: ['granulat_concasse', 'pierre_de_taille'],
        risques_bati: ['glissement_selon_foliation'],
        breeam_credits: ['Hea 02', 'Mat 03'],
        commentaire_expert: 'Massif Central, Vosges, Alpes. Vigilance radon (U dans leucosomes migmatites).'
    },

    'schistes_ardoises': {
        label: 'Schistes, ardoises, micaschistes, phyllades, formations épimétamorphiques',
        descr_keywords: ['schiste', 'schisteux', 'ardoise', 'micaschiste', 'phyllade',
                         'chloritoschiste', 'sericite', 'séricite',
                         'schisto-gréseuse', 'schisto-greseuse', 'épimétamorphique',
                         'epimetamorphique', 'briovérien', 'brioverien',
                         'série schisto', 'ride calcaire'],
        notation_regex: /^[sk][1-9]S?|^aS/i,
        periode: 'Paleozoique',
        rock_type: 'roche_dure_anisotrope',
        eurocode_soil_class: 'A_ou_B',
        dtu_13_12_type: 'III',
        dtu_13_12_contrainte_mpa: [0.5, 2.0],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Schistes et micaschistes : roches fractur\u00e9es (Type III, 0,35-0,75 MPa) \u00e0 peu fissur\u00e9es selon degr\u00e9 de diaclasage. Anisotropie forte de schistosit\u00e9 \u2192 orientation critique.',
        portance: 'bonne',
        portance_note: 'ANISOTROPIE FORTE : portance tres variable selon direction de la schistosité.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 75, fondation_cost_max: 130,
        permeabilite: 'faible',
        permeabilite_k: [1e-9, 1e-6],
        strategy_ep: 'retention',
        karst_risk: false,
        rga_risk: 'nul_en_rocher',
        radon_potential: 'moyen_a_eleve',  // schistes noirs a U
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 2.0,
        dechet_category: 'inerte_sauf_schistes_noirs_pyriteux',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 45,
        g1_required: 'recommande',
        etudes_complementaires: ['mesure_radon_si_schistes_noirs', 'orientation_schistosite'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['ardoise_toiture', 'granulat_schiste', 'pierre_de_construction'],
        risques_bati: ['glissement_selon_schistosite', 'dalles_instables', 'radon_si_noirs'],
        breeam_credits: ['Hea 02', 'Mat 03'],
        commentaire_expert: 'Bretagne (ardoises), Massif Armoricain, Montagne Noire. Reutilisation ardoises.'
    },

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       CAS PARTICULIERS                                ║
    // ╚══════════════════════════════════════════════════════════════════════╝

    'remblais': {
        label: 'Remblais anthropiques, X',
        descr_keywords: ['remblai', 'remblaiement', 'anthropique', 'rapport de terre',
                         'decharge', 'décharge', 'ancien site industriel'],
        notation_regex: /^X\b|^Rm\b/i,
        periode: 'Historique',
        rock_type: 'anthropique',
        eurocode_soil_class: 'E',
        dtu_13_12_type: 'hors_typologie',
        dtu_13_12_contrainte_mpa: [null, null],
        dtu_13_12_ref: 'Non trait\u00e9 par le tableau DTU 13.12 \u00a73.1 \u2014 remblais anthropiques non compact\u00e9s, par d\u00e9finition non caract\u00e9ris\u00e9s. Exclure comme assise de fondation sans am\u00e9lioration/purge ou ancrage profond sur substrat naturel.',
        portance: 'tres_variable_souvent_mediocre',
        portance_note: 'CRITIQUE : investigation obligatoire + suspicion pollution.',
        fondation_type: 'profondes_apres_purge_ou_amelioration',
        fondation_cost_min: 250, fondation_cost_max: 450,
        permeabilite: 'variable',
        permeabilite_k: [1e-8, 1e-3],
        strategy_ep: 'etude_specifique',
        karst_risk: false,
        rga_risk: 'variable',
        radon_potential: 'variable',
        amplification_sismique: 1.8,
        liquefaction_risk: 'eleve',
        cout_excavation_ratio: 1.5,
        dechet_category: 'a_caracteriser_potentiellement_K3',
        aar_risk: 'non_pertinent',
        stabilite_pente_max_deg: 15,
        g1_required: true,
        g1_note: 'IMPERATIF + etude historique de pollution + ESQR si besoin.',
        etudes_complementaires: ['etude_historique_pollution', 'analyse_polluants_sol', 'essais_compacite_panda'],
        geothermie_potentiel: 'a_evaluer_cas_par_cas',
        materiaux_locaux: [],
        risques_bati: ['tassements_majeurs', 'pollution', 'liquefaction', 'combustion_dechets', 'venues_gaz'],
        breeam_credits: ['Pol 03', 'LE 01', 'Wst 01', 'Mat 03'],
        commentaire_expert: 'Site SIGNAL (brownfield) BREEAM = bonus LE 01. Mais implique dépollution.'
    },

    'marines_terrasses': {
        label: 'Terrasses marines, depots littoraux anciens',
        descr_keywords: ['terrasse marine', 'depots littoraux', 'dépôts littoraux',
                         'plage fossile', 'cordon littoral'],
        notation_regex: /^M[1-9]?\b/i,
        periode: 'Pleistocene',
        rock_type: 'meuble_a_consolide',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'II',
        dtu_13_12_contrainte_mpa: [0.25, 0.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Terrains non coh\u00e9rents \u00e0 compacit\u00e9 moyenne (0,2-0,4 MPa) \u00e0 bonne compacit\u00e9 (0,35-0,75 MPa) pour les terrasses marines densifi\u00e9es.',
        portance: 'moyenne_a_bonne',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 90, fondation_cost_max: 140,
        permeabilite: 'bonne',
        permeabilite_k: [1e-5, 1e-3],
        strategy_ep: 'infiltration_possible',
        karst_risk: false,
        rga_risk: 'faible',
        radon_potential: 'faible',
        amplification_sismique: 1.2,
        liquefaction_risk: 'faible',
        cout_excavation_ratio: 1.0,
        dechet_category: 'inerte',
        aar_risk: 'faible',
        stabilite_pente_max_deg: 25,
        g1_required: 'recommande',
        etudes_complementaires: [],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['sable_littoral'],
        risques_bati: [],
        breeam_credits: ['Pol 03'],
        commentaire_expert: 'Cote atlantique et mediterraneenne. Vigilance coquillages/sels dans sables.'
    },

    'flysch_molasse': {
        label: 'Flysch, molasse (alternances détritiques Pyrénées/Alpes)',
        descr_keywords: ['flysch', 'molasse', 'alternance', 'alternances gréso-pélitiques'],
        notation_regex: /^[eo][56]fl|^M[1-9]?M/i,
        periode: 'Cenozoique',
        rock_type: 'roche_alternance',
        eurocode_soil_class: 'B',
        dtu_13_12_type: 'III',
        dtu_13_12_contrainte_mpa: [0.4, 1.2],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Alternances gr\u00e9so-marneuses : marnes/marno-calcaires Type III (0,35-0,75 MPa) avec niveaux gr\u00e9seux plus comp\u00e9tents. Variation lat\u00e9rale rapide.',
        portance: 'variable_moyenne',
        portance_note: 'Alternance gres-argile : etude dediee requise pour chaque niveau.',
        fondation_type: 'semelles_superficielles_ou_radier',
        fondation_cost_min: 100, fondation_cost_max: 170,
        permeabilite: 'heterogene',
        permeabilite_k: [1e-8, 1e-5],
        strategy_ep: 'retention_recommandee',
        karst_risk: false,
        rga_risk: 'moyen_selon_bancs_argileux',
        radon_potential: 'faible_a_moyen',
        amplification_sismique: 1.15,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 1.6,
        dechet_category: 'inerte',
        aar_risk: 'variable',
        stabilite_pente_max_deg: 30,
        g1_required: true,
        etudes_complementaires: ['sondages_carotte'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['granulat_concasse'],
        risques_bati: ['glissements_a_pendage_defavorable', 'heterogeneite'],
        breeam_credits: ['Pol 03'],
        commentaire_expert: 'Pyrénées (Béarn, Pays Basque), Alpes externes. Pendages à analyser obligatoire.'
    },

    'bauxites_laterites': {
        label: 'Bauxites, latérites, altérites rougeâtres',
        descr_keywords: ['bauxite', 'laterite', 'latérite', 'altérite rouge', 'sidérolithique'],
        notation_regex: /^Ba\b|^Lat\b/i,
        periode: 'Cretace_a_Cenozoique',
        rock_type: 'roche_meuble',
        eurocode_soil_class: 'C',
        dtu_13_12_type: 'I',
        dtu_13_12_contrainte_mpa: [0.2, 0.6],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Argiles (0,1-0,3 MPa) \u00e0 Terrains non coh\u00e9rents \u00e0 compacit\u00e9 moyenne (0,2-0,4 MPa) pour les bauxites densifi\u00e9es. Gonflement mod\u00e9r\u00e9 possible.',
        portance: 'moyenne',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 90, fondation_cost_max: 140, fondation_cost_typical: 115,
        permeabilite: 'faible_a_moyenne',
        permeabilite_k: [1e-8, 1e-5],
        strategy_ep: 'retention_recommandee',
        karst_risk: false,
        rga_risk: 'moyen',
        radon_potential: 'faible_a_moyen',
        amplification_sismique: 1.2,
        liquefaction_risk: 'faible',
        cout_excavation_ratio: 1.2,
        dechet_category: 'inerte_mais_metaux_lourds_possibles',
        aar_risk: 'non_reactif',
        stabilite_pente_max_deg: 25,
        g1_required: true,
        g1_cost_indicative: [1500, 3500],
        presence_nappe_probability: 'moderee',
        etudes_complementaires: ['analyse_metaux_lourds'],
        geothermie_potentiel: 'sondes_verticales',
        materiaux_locaux: ['argile_bauxitique_aluminium'],
        risques_bati: ['retrait_gonflement_modere'],
        breeam_credits: ['Pol 03', 'Mat 03'],
        typical_regions_france: ['Provence', 'Hérault', 'Var'],
        commentaire_expert: 'Provence (Vars, Var), Hérault. Formation riche en aluminium (ex-exploitations).'
    },

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       NOUVELLES FAMILLES V2.1                         ║
    // ╚══════════════════════════════════════════════════════════════════════╝

    'formations_glissees': {
        label: 'Formations remaniées par glissement (colluvions de glissement)',
        descr_keywords: ['formation glissée', 'formations glissées', 'glissement',
                         'coulée de matériel', 'coulée boueuse', 'masse glissée',
                         'matériel glissé', 'slump'],
        notation_regex: /^Gl\d?\b|^Kgl\b|^Cgl\b/i,
        periode: 'Holocene',
        rock_type: 'meuble_remanie',
        eurocode_soil_class: 'D',
        dtu_13_12_type: 'hors_typologie',
        dtu_13_12_contrainte_mpa: [null, null],
        dtu_13_12_ref: 'Non trait\u00e9 par le tableau DTU 13.12 \u00a73.1 \u2014 formations instables par d\u00e9finition (glissements actifs ou dormants). Fondations superficielles contre-indiqu\u00e9es ; ancrage obligatoire sur substrat stable.',
        portance: 'mediocre_tres_heterogene',
        portance_note: 'Formation INSTABLE par définition. Eviter toute construction sur zone active.',
        fondation_type: 'a_proscrire_ou_ancrage_profond_substrat',
        fondation_cost_min: 300, fondation_cost_max: 600, fondation_cost_typical: 450,
        fondation_cost_note: 'Pieux ancrés dans substrat stable + étude stabilité de site.',
        permeabilite: 'variable',
        permeabilite_k: [1e-8, 1e-5],
        strategy_ep: 'retention_externe_a_la_zone',
        strategy_ep_note: 'AUCUNE infiltration : aggraverait la stabilité du glissement.',
        karst_risk: false,
        rga_risk: 'eleve',
        radon_potential: 'variable',
        amplification_sismique: 1.6,
        liquefaction_risk: 'eleve_sur_pente',
        cout_excavation_ratio: 1.2,
        dechet_category: 'variable',
        aar_risk: 'non_pertinent',
        stabilite_pente_max_deg: 8,
        g1_required: true,
        g1_cost_indicative: [4000, 8000],
        g1_note: 'IMPERATIF + étude de stabilité de versant (inclinométrie, modélisation).',
        presence_nappe_probability: 'frequente',
        etudes_complementaires: ['inclinometrie', 'modelisation_stabilite', 'piezometres_long_terme'],
        geothermie_potentiel: 'deconseille',
        materiaux_locaux: [],
        risques_bati: ['glissement_actif_ou_reactivable', 'tassements_lents', 'cisaillement'],
        breeam_credits: ['Pol 03', 'LE 01'],
        typical_regions_france: ['Pyrénées', 'Alpes', 'Préalpes', 'Jura'],
        commentaire_expert: 'Zone à éviter sauf contraintes fortes. Site rarement compatible BREEAM (risque Pol 03).'
    },

    'marbres': {
        label: 'Marbres (calcaires métamorphisés)',
        descr_keywords: ['marbre', 'marbres', 'calcaire métamorphique', 'calcaire cristallin'],
        notation_regex: /^Mb\b|^Cc\b/i,
        periode: 'Paleozoique_a_Mesozoique',
        rock_type: 'roche_dure',
        eurocode_soil_class: 'A',
        dtu_13_12_type: 'roche_peu_fissuree',
        dtu_13_12_contrainte_mpa: [1.5, 4.5],
        dtu_13_12_ref: 'DTU 13.12 \u00a73.1 \u2014 Roches peu fissur\u00e9es saines (0,75-4,5 MPa). Haut de fourchette pour marbres massifs. Sensibilit\u00e9 aux eaux acides (alt\u00e9ration superficielle).',
        portance: 'excellente',
        portance_note: 'Excellente portance en rocher sain. Fracturation locale possible.',
        fondation_type: 'semelles_superficielles',
        fondation_cost_min: 75, fondation_cost_max: 130, fondation_cost_typical: 100,
        permeabilite: 'faible_sauf_fissures',
        permeabilite_k: [1e-9, 1e-6],
        strategy_ep: 'retention',
        karst_risk: 'possible',
        karst_note: 'Karst local possible dans marbres altérés (Pyrénées, Alpes).',
        rga_risk: 'nul',
        radon_potential: 'faible',
        amplification_sismique: 1.0,
        liquefaction_risk: 'nul',
        cout_excavation_ratio: 2.8,
        dechet_category: 'inerte',
        aar_risk: 'non_reactif',
        stabilite_pente_max_deg: 65,
        g1_required: 'recommande',
        g1_cost_indicative: [2000, 4000],
        presence_nappe_probability: 'rare',
        etudes_complementaires: ['analyse_fracturation'],
        geothermie_potentiel: 'sondes_verticales_profondes',
        materiaux_locaux: ['pierre_ornementale', 'granulat_noble', 'blocs_taille'],
        risques_bati: ['surcout_excavation', 'fragment_en_forte_pente'],
        breeam_credits: ['Mat 03', 'LE 04'],
        typical_regions_france: ['Pyrénées (Carrare)', 'Alpes', 'Corse', 'Massif Central'],
        commentaire_expert: 'Ressource noble de valorisation (Mat 03). Marbres des Pyrénées très recherchés.'
    },

    'tourbes_marais': {
        label: 'Tourbes, vases organiques, formations de marais',
        descr_keywords: ['tourbe', 'tourbes', 'tourbeux', 'tourbière', 'marais',
                         'vase organique', 'vase noire', 'sapropèle', 'gyttja'],
        notation_regex: /^T[abc]\b|^Ts\b/i,
        periode: 'Holocene',
        rock_type: 'organique',
        eurocode_soil_class: 'E',
        dtu_13_12_type: 'hors_typologie',
        dtu_13_12_contrainte_mpa: [0.02, 0.08],
        dtu_13_12_ref: 'Hors tableau DTU 13.12 \u00a73.1 (les argiles y plafonnent \u00e0 0,1-0,3 MPa). Les tourbes et vases organiques ne peuvent supporter aucune construction sans pr\u00e9chargement long ou pieux ancr\u00e9s dans substrat min\u00e9ral.',
        portance: 'tres_faible',
        portance_note: 'Substrat INCOMPATIBLE avec construction lourde sans amélioration de sol.',
        fondation_type: 'pieux_ancres_substrat_ou_prechargement_long',
        fondation_cost_min: 350, fondation_cost_max: 600, fondation_cost_typical: 480,
        permeabilite: 'faible',
        permeabilite_k: [1e-9, 1e-6],
        strategy_ep: 'preservation_hydrique_obligatoire',
        strategy_ep_note: 'Zone humide protégée (loi sur l\'eau). Rejet contrôlé obligatoire.',
        karst_risk: false,
        rga_risk: 'eleve',
        radon_potential: 'faible',
        amplification_sismique: 1.8,
        liquefaction_risk: 'eleve_si_zone_sismique',
        cout_excavation_ratio: 0.8,
        dechet_category: 'K2_voire_K3_si_contamine',
        aar_risk: 'non_pertinent',
        stabilite_pente_max_deg: 3,
        g1_required: true,
        g1_cost_indicative: [3500, 7000],
        g1_note: 'IMPERATIF + études environnementales ZONE HUMIDE (inventaire faune/flore).',
        presence_nappe_probability: 'systematique',
        etudes_complementaires: ['datation_C14_tourbe', 'inventaire_faune_flore', 'profondeur_substrat'],
        geothermie_potentiel: 'deconseille',
        materiaux_locaux: [],
        risques_bati: ['tassements_secondaires_decennaux', 'oxydation_retrait', 'seisme_liquefaction'],
        breeam_credits: ['LE 04', 'Pol 03', 'LE 01'],
        typical_regions_france: ['Marais poitevin', 'Camargue', 'Dombes', 'Vosges', 'Sologne'],
        commentaire_expert: 'Site BREEAM très favorable en LE 04 (biodiversité) si préservation. Construction = contrainte extreme.'
    },

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║                       FAMILLE UTILITAIRE : NON GEOLOGIQUE             ║
    // ╚══════════════════════════════════════════════════════════════════════╝

    'non_geologique': {
        label: 'Non géologique (eau, bâti, carrière en eau...)',
        descr_keywords: ['réseau hydrologique', 'réseau hydrographique',
                         'étangs', 'lacs', 'gravières inondées', 'zone en eau',
                         'exploitation de gravière', 'affleurement rocheux sous-marins',
                         'zone urbanisée', 'carrière'],
        notation_regex: /^Hydro\b|^F\b|^Eau\b|^Zone\b/i,
        periode: 'N/A',
        rock_type: 'non_applicable',
        eurocode_soil_class: 'N/A',
        dtu_13_12_type: 'hors_typologie',
        dtu_13_12_contrainte_mpa: [null, null],
        dtu_13_12_ref: 'Non applicable \u2014 eau, b\u00e2ti existant, carri\u00e8re en eau.',
        portance: 'non_applicable',
        fondation_type: 'non_applicable',
        fondation_cost_min: 0, fondation_cost_max: 0, fondation_cost_typical: 0,
        permeabilite: 'non_applicable',
        permeabilite_k: [0, 0],
        strategy_ep: 'non_applicable',
        karst_risk: false,
        rga_risk: 'non_applicable',
        radon_potential: 'non_applicable',
        amplification_sismique: 0,
        liquefaction_risk: 'non_applicable',
        cout_excavation_ratio: 0,
        dechet_category: 'non_applicable',
        aar_risk: 'non_pertinent',
        stabilite_pente_max_deg: 0,
        g1_required: false,
        g1_cost_indicative: [0, 0],
        presence_nappe_probability: 'systematique',
        etudes_complementaires: [],
        geothermie_potentiel: 'non_applicable',
        materiaux_locaux: [],
        risques_bati: [],
        breeam_credits: [],
        typical_regions_france: [],
        commentaire_expert: 'Pas une formation géologique. Exclue de la synthèse géotechnique.'
    }
};

// ============================================================================
// Fonction de matching : donne la famille lithologique d'une formation BRGM
// Priorite : 1) regex sur notation (precise, codifiee BRGM), 2) mots-cles DESCR (fallback)
// ----------------------------------------------------------------------------
// ATTENTION : la notation BRGM (Fz, LP, C4...) est plus fiable que les mots-cles
// de description, car certaines descriptions contiennent des qualificatifs d'age
// (ex. "Postglaciaire") partages par plusieurs familles. Un polygone Fz dont la
// descr est "Alluvions ... (Postglaciaire a Actuel)" doit etre classe en
// 'alluvions_recentes' (notation Fz), pas en 'moraines' (mot-cle postglaciaire).
// ============================================================================
function saCartoLithoProfile(notation, descr) {
    notation = (notation || '').trim();
    descr = (descr || '').toLowerCase();
    var families = Object.keys(SA_LITHO_ATTRIBUTES);
    // 1. Regex sur notation (precision maximale)
    // Gestion des notations "pyjama" (ex. "LP/c5") : tenter la forme complete, puis gauche, puis droite
    if (notation) {
        var notationsToTry = [notation];
        if (notation.indexOf('/') > 0) {
            notationsToTry.push(notation.split('/')[0].trim());
            notationsToTry.push(notation.split('/')[1].trim());
        }
        for (var n = 0; n < notationsToTry.length; n++) {
            var notaTry = notationsToTry[n];
            for (var k = 0; k < families.length; k++) {
                var f = SA_LITHO_ATTRIBUTES[families[k]];
                if (f.notation_regex && f.notation_regex.test(notaTry)) {
                    return { family: families[k], attrs: f, match_type: 'notation', match_value: notaTry };
                }
            }
        }
    }
    // 2. Mots-cles dans DESCR (fallback si notation inconnue ou absente du dictionnaire)
    if (descr) {
        for (var i = 0; i < families.length; i++) {
            var fam = SA_LITHO_ATTRIBUTES[families[i]];
            if (!fam.descr_keywords) continue;
            for (var j = 0; j < fam.descr_keywords.length; j++) {
                if (descr.indexOf(fam.descr_keywords[j].toLowerCase()) >= 0) {
                    return { family: families[i], attrs: fam, match_type: 'descr', match_value: fam.descr_keywords[j] };
                }
            }
        }
    }
    return null;
}

// ============================================================================
// HELPERS METIER (alimente la synthese geotechnique, le rapport et les reco)
// ============================================================================

// Enrichit une feature GeoJSON BRGM en lui ajoutant son profil litho
// Mute feature.properties.profile = { family, attrs, ... }. Retourne la feature.
function saCartoEnrichFeature(feature, legendMap) {
    if (!feature || !feature.properties) return feature;
    var p = feature.properties;
    var notation = p.n || p.NOTATION || '';
    var descr = p.descr || (legendMap && legendMap[notation] && legendMap[notation].descr) || '';
    var profile = saCartoLithoProfile(notation, descr);
    if (profile) {
        p.profile = profile;
        p.family = profile.family;
    }
    return feature;
}

// Trouve le profil lithologique d'un point (lat, lon) dans un dataset BRGM local
// dataset = { features: FeatureCollection, legend: {notation -> {descr, color}} }
// Retourne le profile + feature du polygone englobant, ou null.
function saCartoProfileAtPoint(lat, lon, dataset) {
    if (!dataset || !dataset.features || !dataset.features.features) return null;
    var fc = dataset.features.features;
    var legendMap = dataset.legend || {};
    // Point-in-polygon sur chaque feature (premier match gagne : la couche du dessus)
    for (var i = 0; i < fc.length; i++) {
        var f = fc[i];
        if (_saCartoPointInFeature([lon, lat], f)) {
            var p = f.properties || {};
            var notation = p.n || '';
            var descr = (legendMap[notation] && legendMap[notation].descr) || '';
            var profile = saCartoLithoProfile(notation, descr);
            if (profile) {
                return {
                    profile: profile,
                    notation: notation,
                    descr: descr,
                    color: (legendMap[notation] && legendMap[notation].color) || '#888',
                    feature: f
                };
            }
            return { profile: null, notation: notation, descr: descr, color: '#888', feature: f };
        }
    }
    return null;
}

// Calcule la famille lithologique dominante dans un rayon (en degres approx)
// autour d'un point. Utile pour "substrat principal autour du site".
// Retourne : [{ family, label, count, percent }, ...] trie par frequence
function saCartoDominantFamilies(lat, lon, dataset, radiusDeg) {
    if (!dataset || !dataset.features || !dataset.features.features) return [];
    var fc = dataset.features.features;
    var legendMap = dataset.legend || {};
    radiusDeg = radiusDeg || 0.02;  // ~2 km
    var bbox = [lon - radiusDeg, lat - radiusDeg, lon + radiusDeg, lat + radiusDeg];
    var counts = {};
    var total = 0;
    for (var i = 0; i < fc.length; i++) {
        var f = fc[i];
        // Intersection bbox rapide (optimization avant point-in-polygon)
        var fb = _saCartoFeatureBbox(f);
        if (!fb) continue;
        if (fb[2] < bbox[0] || fb[0] > bbox[2] || fb[3] < bbox[1] || fb[1] > bbox[3]) continue;
        var p = f.properties || {};
        var n = p.n || '';
        var descr = (legendMap[n] && legendMap[n].descr) || '';
        var profile = saCartoLithoProfile(n, descr);
        if (!profile) continue;
        var fam = profile.family;
        if (!counts[fam]) counts[fam] = { family: fam, label: profile.attrs.label, count: 0 };
        counts[fam].count++;
        total++;
    }
    var arr = Object.keys(counts).map(function(k) {
        counts[k].percent = total ? Math.round(counts[k].count / total * 100) : 0;
        return counts[k];
    });
    arr.sort(function(a, b) { return b.count - a.count; });
    return arr;
}

// --- Utilitaires internes ---

// Point-in-polygon (ray casting), coord = [lon, lat]
function _saCartoPointInFeature(coord, feature) {
    if (!feature.geometry) return false;
    var g = feature.geometry;
    if (g.type === 'Polygon') return _saCartoPointInPolygon(coord, g.coordinates);
    if (g.type === 'MultiPolygon') {
        for (var i = 0; i < g.coordinates.length; i++) {
            if (_saCartoPointInPolygon(coord, g.coordinates[i])) return true;
        }
    }
    return false;
}
function _saCartoPointInPolygon(pt, rings) {
    // rings[0] = exterieur, rings[1..] = trous
    if (!rings.length || !_saCartoPointInRing(pt, rings[0])) return false;
    for (var i = 1; i < rings.length; i++) {
        if (_saCartoPointInRing(pt, rings[i])) return false;  // dans un trou
    }
    return true;
}
function _saCartoPointInRing(pt, ring) {
    var inside = false;
    var x = pt[0], y = pt[1];
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var xi = ring[i][0], yi = ring[i][1];
        var xj = ring[j][0], yj = ring[j][1];
        var intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Bbox [minLon, minLat, maxLon, maxLat] d'une feature
function _saCartoFeatureBbox(feature) {
    if (!feature.geometry) return null;
    var g = feature.geometry;
    var coords = [];
    if (g.type === 'Polygon') coords = g.coordinates[0];  // ring exterieur
    else if (g.type === 'MultiPolygon') {
        g.coordinates.forEach(function(poly) { poly[0].forEach(function(c) { coords.push(c); }); });
    } else return null;
    if (!coords.length) return null;
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (var i = 0; i < coords.length; i++) {
        var c = coords[i];
        if (c[0] < minX) minX = c[0]; if (c[0] > maxX) maxX = c[0];
        if (c[1] < minY) minY = c[1]; if (c[1] > maxY) maxY = c[1];
    }
    return [minX, minY, maxX, maxY];
}

// ============================================================================
// SA_MATERIAUX_INFO — Fiche descriptive par ressource locale valorisable
// ============================================================================
// Chaque cle correspond a un identifiant utilise dans SA_LITHO_ATTRIBUTES
// (champ materiaux_locaux[]). Les fiches ci-dessous fournissent les donnees
// necessaires pour le rendu detaille dans la synthese geotechnique et pour
// l'evidence BREEAM Mat 03 (sourcing local) / Mat 01 (ACV).
//
// REFERENCE CARBONE : le ratio `carbone_ratio_vs_beton` compare l'empreinte
// kgCO2eq/m3 du materiau a celle d'un beton arme courant de reference
// (~300 kgCO2eq/m3). Cette reference se decompose en :
//   - beton non arme : ~215 kgCO2eq/m3 (moyenne des fourchettes classiques
//     SNBPE pour C25/30 a C30/37 en classe d'exposition XC, avril 2021,
//     conforme NF EN 206/CN + NF EN 15804 via configurateur BETie).
//   - armatures aciers B500B : +60 a +85 kgCO2eq/m3 selon taux d'acier
//     (FDES INIES aciers).
// Pour les materiaux beton/granulats, le champ `empreinte_snbpe` donne les
// valeurs absolues SNBPE (seuil bas-carbone vs fourchette classique) par
// classe d'exposition/resistance du beton fabrique avec ce granulat.
// ============================================================================

var SA_MATERIAUX_INFO = {

    'pierre_de_taille': {
        label: 'Pierre de taille',
        description: 'Bloc calibr\u00e9 extrait d\'une carri\u00e8re locale (calcaire, gr\u00e8s, granite, marbre) utilis\u00e9 brut ou finement appareill\u00e9.',
        usages: ['Fa\u00e7ades et parements', 'Soubassements', 'Murs porteurs traditionnels', 'Encadrements et corniches', 'Am\u00e9nagements ext\u00e9rieurs (murs de sout\u00e8nement, bordures)'],
        carbone_ratio_vs_beton: 0.15,
        carbone_note: '~15\u202f% du bilan carbone du b\u00e9ton arm\u00e9 (ACV INIES), gr\u00e2ce \u00e0 l\'absence de cuisson.',
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03, Mat 01, Hea 07',
        note: 'Les carri\u00e8res de pierre de taille sont g\u00e9n\u00e9ralement dans un rayon de 30 \u00e0 80 km du site si la famille lithologique est abondante dans la r\u00e9gion. V\u00e9rifier disponibilit\u00e9 via le BRGM (base CARMEN-Carri\u00e8res) ou l\'UNICEM.'
    },

    'granulat_concasse': {
        label: 'Granulats concass\u00e9s',
        description: 'Blocs de roche concass\u00e9s (0/80 mm selon l\'usage) issus d\'une carri\u00e8re locale.',
        usages: ['B\u00e9ton structurel (sables et gravillons)', 'Grave routi\u00e8re (corps de chauss\u00e9e)', 'Ballast', 'Enrochements'],
        carbone_ratio_vs_beton: 0.05,
        carbone_note: 'Tr\u00e8s faible bilan carbone au granulat lui-m\u00eame (extraction + concassage ~15-20 kgCO\u2082eq/m\u00b3). L\'impact majeur du b\u00e9ton vient du ciment et non du granulat.',
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03, Tra 05',
        empreinte_snbpe: {
            usage_type: 'fondations_superficielles',
            beton_classe: 'C25/30 XC1-XC2',
            seuil_bas_carbone_kgco2_m3: 180,
            classique_min_kgco2_m3: 200, classique_max_kgco2_m3: 230,
            note: 'Seuil SNBPE pour b\u00e9ton de fondations superficielles (C25/30 XC1-XC2) fabriqu\u00e9 avec ces granulats. Conforme NF EN 206/CN, calcul NF EN 15804 via BETie. Hors armatures BA.',
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        },
        note: 'Attention r\u00e9activit\u00e9 alcali-granulats (AAR) : faire tester selon NF P18-594 avant usage en b\u00e9ton structurel, surtout pour les granites alcalins et les rhyolites.'
    },

    'granulat_concasse_qualite_superieure': {
        label: 'Granulats concass\u00e9s de qualit\u00e9 sup\u00e9rieure',
        description: 'Granulats issus de roches basiques (gabbros, dol\u00e9rites, diorites) r\u00e9put\u00e9s pour leur r\u00e9sistance m\u00e9canique et leur r\u00e9sistance au polissage.',
        usages: ['B\u00e9tons hautes performances (B35+)', 'Couche de roulement des chauss\u00e9es autorouti\u00e8res', 'Ballast ferroviaire'],
        carbone_ratio_vs_beton: 0.05,
        carbone_note: 'Tr\u00e8s faible bilan carbone. La qualit\u00e9 m\u00e9canique permet de r\u00e9duire les dosages en ciment, ce qui peut rapprocher le b\u00e9ton produit des seuils « bas carbone » SNBPE m\u00eame sur classes de r\u00e9sistance \u00e9lev\u00e9es.',
        distance_approvisionnement_km: 50,
        breeam_credit: 'Mat 03, Mat 01',
        empreinte_snbpe: {
            usage_type: 'batiment_courant_C35_45',
            beton_classe: 'C35/45 XC-XF1-XD1',
            seuil_bas_carbone_kgco2_m3: 230,
            classique_min_kgco2_m3: 260, classique_max_kgco2_m3: 290,
            note: 'Seuil SNBPE pour b\u00e9ton haute r\u00e9sistance utilis\u00e9 en voiles porteurs, poutres, poteaux. Tour La Marseillaise r\u00e9f\u00e9rence : 178 kgCO\u2082eq/m\u00b3 atteint (C35/45 XF1) avec granulats et ciments optimis\u00e9s.',
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        },
        note: 'Gisements rares en France m\u00e9tropolitaine (Vosges, ophiolites alpines). G\u00e9n\u00e9ralement transport\u00e9s au-del\u00e0 de 50 km.'
    },

    'granulats': {
        label: 'Granulats',
        description: 'Mat\u00e9riaux granulaires de tailles vari\u00e9es destin\u00e9s aux b\u00e9tons et aux remblais techniques.',
        usages: ['B\u00e9ton', 'Remblais', 'Voiries'],
        carbone_ratio_vs_beton: 0.05,
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03',
        note: 'Disponibilit\u00e9 courante. Pr\u00e9f\u00e9rer les sources de proximit\u00e9 (<30 km).'
    },

    'granulats_fluviatiles': {
        label: 'Granulats fluviatiles (alluvionnaires)',
        description: 'Sables et graviers rond\u00e9s extraits en gravi\u00e8re, issus de d\u00e9p\u00f4ts fluviaux.',
        usages: ['B\u00e9ton de qualit\u00e9 courante', 'Mortiers', 'Remblais drainants', 'Filtres'],
        carbone_ratio_vs_beton: 0.04,
        carbone_note: 'Granulats roul\u00e9s faciles \u00e0 travailler : dosage ciment optimis\u00e9.',
        distance_approvisionnement_km: 20,
        breeam_credit: 'Mat 03, LE 04',
        empreinte_snbpe: {
            usage_type: 'dalles_voiles_interieurs',
            beton_classe: 'C25/30 XC3-XC4-XF1',
            seuil_bas_carbone_kgco2_m3: 195,
            classique_min_kgco2_m3: 210, classique_max_kgco2_m3: 240,
            note: 'Seuil SNBPE pour b\u00e9ton de dalles/voiles int\u00e9rieurs courants (C25/30 XC3-XC4-XF1). Granulats alluvionnaires particuli\u00e8rement adapt\u00e9s.',
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        },
        note: 'Attention : les gravi\u00e8res en activit\u00e9 sont soumises \u00e0 autorisation pr\u00e9fectorale et peuvent \u00eatre en conflit avec la protection des eaux souterraines et des zones humides.'
    },

    'granulats_beton': {
        label: 'Granulats \u00e0 b\u00e9ton',
        description: 'Granulats s\u00e9lectionn\u00e9s et calibr\u00e9s pour la fabrication de b\u00e9ton structurel conforme NF EN 12620.',
        usages: ['B\u00e9ton structurel', 'Pr\u00e9fabrication'],
        carbone_ratio_vs_beton: 0.05,
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03, Mat 01',
        empreinte_snbpe: {
            usage_type: 'batiment_courant_C30_37',
            beton_classe: 'C30/37 XC-XF1-XD1',
            seuil_bas_carbone_kgco2_m3: 200,
            classique_min_kgco2_m3: 220, classique_max_kgco2_m3: 250,
            note: 'Seuil SNBPE pour b\u00e9ton courant (voiles, planchers RDC \u00e0 R+3). L\'exemple \u00c9cole Jean Zay Toulouse atteint 135 kgCO\u2082eq/m\u00b3 sur un C25/30 XC1 gr\u00e2ce \u00e0 un ciment optimis\u00e9.',
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        },
        note: 'Priorit\u00e9 absolue \u00e0 la proximit\u00e9 pour r\u00e9duire le poste transport (distance moyenne SNBPE retenue : 18,5 km par camion malaxeur).'
    },

    'granulats_grossiers': {
        label: 'Granulats grossiers',
        description: 'Graviers et gros galets issus de d\u00e9p\u00f4ts morainiques ou torrentiels.',
        usages: ['Remblais', 'Couches de forme routi\u00e8re', 'Drainage', 'Enrochements paysagers'],
        carbone_ratio_vs_beton: 0.03,
        distance_approvisionnement_km: 20,
        breeam_credit: 'Mat 03',
        note: 'Peuvent \u00eatre r\u00e9utilis\u00e9s in situ s\'ils sont excav\u00e9s lors du terrassement.'
    },

    'sable_beton': {
        label: 'Sable \u00e0 b\u00e9ton',
        description: 'Sable calibr\u00e9 (0/4 mm) conforme aux normes NF EN 12620.',
        usages: ['B\u00e9ton structurel', 'Mortiers', 'Enduits'],
        carbone_ratio_vs_beton: 0.03,
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03',
        empreinte_snbpe: {
            usage_type: 'fondations_superficielles',
            beton_classe: 'C25/30 XC1-XC2',
            seuil_bas_carbone_kgco2_m3: 180,
            classique_min_kgco2_m3: 200, classique_max_kgco2_m3: 230,
            note: 'Composant essentiel des b\u00e9tons de fondation et de dalle. Impact carbone domin\u00e9 par le ciment, pas par le sable.',
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        },
        note: 'Ressource strat\u00e9gique : tension croissante sur les sables de construction en France. Privil\u00e9gier les sables locaux.'
    },

    'sable_enrobes': {
        label: 'Sable pour enrob\u00e9s bitumineux',
        description: 'Sable pour enrob\u00e9s routiers.',
        usages: ['Couches de roulement', 'Couches de liaison'],
        carbone_ratio_vs_beton: 0.04,
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03'
    },

    'sable_a_beton': {
        label: 'Sable \u00e0 b\u00e9ton',
        description: 'Sable \u00e0 b\u00e9ton (0/4 mm) normalis\u00e9 NF EN 12620.',
        usages: ['B\u00e9ton structurel', 'Mortiers'],
        carbone_ratio_vs_beton: 0.03,
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03',
        empreinte_snbpe: {
            usage_type: 'fondations_superficielles',
            beton_classe: 'C25/30 XC1-XC2',
            seuil_bas_carbone_kgco2_m3: 180,
            classique_min_kgco2_m3: 200, classique_max_kgco2_m3: 230,
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        }
    },

    'sable_de_construction': {
        label: 'Sable de construction',
        description: 'Sable tout-venant pour usages secondaires.',
        usages: ['Couches de forme', 'Drainage', 'Pose de canalisations'],
        carbone_ratio_vs_beton: 0.02,
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03'
    },

    'sable_littoral': {
        label: 'Sable littoral',
        description: 'Sable issu de terrasses marines anciennes.',
        usages: ['Remblais', 'Voiries secondaires'],
        carbone_ratio_vs_beton: 0.03,
        distance_approvisionnement_km: 30,
        breeam_credit: 'Mat 03',
        note: 'Attention aux \u00e9ventuelles teneurs en sels et coquilles : lavage n\u00e9cessaire avant usage en b\u00e9ton.'
    },

    'chaux_aerienne': {
        label: 'Chaux a\u00e9rienne (CL)',
        description: 'Liant obtenu par cuisson de calcaires purs \u00e0 environ 900\u202f\u00b0C.',
        usages: ['Mortiers de r\u00e9habilitation', 'B\u00e2timents patrimoniaux', 'Enduits respirants'],
        carbone_ratio_vs_beton: 0.55,
        carbone_note: 'Carbonatation naturelle post-application qui recapture ~50\u202f% du CO2 \u00e9mis \u00e0 la cuisson (apr\u00e8s ~50 ans).',
        distance_approvisionnement_km: 100,
        breeam_credit: 'Mat 03, Hea 02',
        note: 'Seulement quelques sites de production en France (Calcia, Lhoist). Privil\u00e9gier la chaux hydraulique naturelle (NHL) pour le b\u00e2ti neuf.'
    },

    'chaux': {
        label: 'Chaux',
        description: 'Liant traditionnel obtenu par cuisson des calcaires.',
        usages: ['Mortiers', 'Enduits', 'Stabilisation de sols'],
        carbone_ratio_vs_beton: 0.55,
        distance_approvisionnement_km: 100,
        breeam_credit: 'Mat 03'
    },

    'ciment_naturel': {
        label: 'Ciment naturel (ou "prompt")',
        description: 'Ciment obtenu par cuisson de marnes calcaires. Prise rapide (5 \u00e0 15 min).',
        usages: ['Scellements', 'Restauration de b\u00e2ti ancien', 'Ouvrages marins'],
        carbone_ratio_vs_beton: 0.65,
        distance_approvisionnement_km: 150,
        breeam_credit: 'Mat 03',
        note: 'Production tr\u00e8s limit\u00e9e en France (Vicat, Grenoble). Usage sp\u00e9cialis\u00e9.'
    },

    'pouzzolane': {
        label: 'Pouzzolane',
        description: 'Cendres volcaniques r\u00e9actives (silicates d\'alumine) exploit\u00e9es en Auvergne.',
        usages: ['Addition cimentaire (r\u00e9duction du clinker)', 'Drainage de toitures v\u00e9g\u00e9talis\u00e9es', 'Mat\u00e9riau l\u00e9ger isolant'],
        carbone_ratio_vs_beton: 0.10,
        carbone_note: 'Substitut direct du ciment en addition pouzzolanique (norme NF EN 197-1 pour ciments CEM II/B-P et CEM IV). \u00c9conomie potentielle de 20-30\u202f% de CO\u2082 dans un b\u00e9ton selon le taux de substitution.',
        distance_approvisionnement_km: 50,
        breeam_credit: 'Mat 03, Mat 01, LE 04',
        empreinte_snbpe: {
            usage_type: 'reduction_ciment',
            principe: 'Substitution partielle du clinker par addition pouzzolanique',
            impact_beton: 'Un b\u00e9ton C25/30 XC1-XC2 avec 15-25\u202f% de pouzzolane en substitution du ciment peut passer de la fourchette classique (200-230 kgCO\u2082eq/m\u00b3) sous le seuil SNBPE bas-carbone (180 kgCO\u2082eq/m\u00b3).',
            normes: ['NF EN 197-1 (ciments)', 'NF EN 206/CN (b\u00e9ton)', 'NF EN 15804 (ACV)'],
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        },
        note: 'Ressource exceptionnelle du Massif Central. Utilis\u00e9e par les Romains depuis 2000 ans. Potentiel Mat 01 significatif en substitution partielle du ciment.'
    },

    'ardoise_toiture': {
        label: 'Ardoise de toiture',
        description: 'Schistes ardoisiers d\u00e9bit\u00e9s en tuiles (2,5 \u00e0 5 mm d\'\u00e9paisseur).',
        usages: ['Couverture traditionnelle', 'Bardage', 'Am\u00e9nagement paysager'],
        carbone_ratio_vs_beton: 0.20,
        carbone_note: 'Dur\u00e9e de vie 100+ ans et recyclabilit\u00e9 \u00e9lev\u00e9e : ACV tr\u00e8s favorable sur le long terme.',
        distance_approvisionnement_km: 200,
        breeam_credit: 'Mat 03, Mat 01',
        note: 'Production fran\u00e7aise limit\u00e9e aux Ardoisi\u00e8res d\'Angers et de Travassac (Corr\u00e8ze). Ailleurs, import Espagne (Galice) ou Br\u00e9sil. Retour historique sur le local encourag\u00e9.'
    },

    'granulat_schiste': {
        label: 'Granulats de schiste',
        description: 'Schistes concass\u00e9s utilis\u00e9s en remblais ou pour drainage.',
        usages: ['Remblais de voirie', 'Drainage', 'B\u00e9tons l\u00e9gers'],
        carbone_ratio_vs_beton: 0.05,
        distance_approvisionnement_km: 50,
        breeam_credit: 'Mat 03',
        note: 'Attention aux schistes noirs potentiellement sulfur\u00e9s (oxydation + acidification).'
    },

    'moellons': {
        label: 'Moellons',
        description: 'Pierres brutes calibr\u00e9es pour ma\u00e7onnerie traditionnelle.',
        usages: ['Murs de sout\u00e8nement', 'Ma\u00e7onnerie apparente', 'Am\u00e9nagements paysagers'],
        carbone_ratio_vs_beton: 0.12,
        distance_approvisionnement_km: 40,
        breeam_credit: 'Mat 03, LE 04'
    },

    'paves': {
        label: 'Pav\u00e9s',
        description: 'Pierres calibr\u00e9es pour espaces publics et voiries basse vitesse.',
        usages: ['Rev\u00eatements voirie', 'Espaces publics', 'All\u00e9es pi\u00e9tonnes'],
        carbone_ratio_vs_beton: 0.15,
        carbone_note: 'Dur\u00e9e de vie >80 ans et r\u00e9utilisabilit\u00e9 totale : ACV imbattable.',
        distance_approvisionnement_km: 80,
        breeam_credit: 'Mat 03, Mat 01, Tra 03',
        note: 'Combine avec surface perm\u00e9able : joint \u00e9largi permet l\'infiltration (SUDS / LE 04 / Pol 03).'
    },

    'pierre_ornementale': {
        label: 'Pierre ornementale',
        description: 'Pierres d\'exception (marbres, granites color\u00e9s) pour parements d\'apparat.',
        usages: ['Parements prestige', 'Sols int\u00e9rieurs', '\u00c9l\u00e9ments de mobilier urbain'],
        carbone_ratio_vs_beton: 0.20,
        distance_approvisionnement_km: 200,
        breeam_credit: 'Mat 03, Hea 07',
        note: 'Ressource valorisante mais \u00e0 consommer avec mod\u00e9ration (impact extraction).'
    },

    'granulat_noble': {
        label: 'Granulats nobles',
        description: 'Granulats de marbre ou de roches d\u00e9coratives pour b\u00e9tons architectoniques.',
        usages: ['B\u00e9tons polis', 'B\u00e9tons d\u00e9coratifs', 'Enduits de finition'],
        carbone_ratio_vs_beton: 0.10,
        distance_approvisionnement_km: 150,
        breeam_credit: 'Mat 03',
        empreinte_snbpe: {
            usage_type: 'batiment_courant_C35_45',
            beton_classe: 'C35/45 XC-XF1-XD1',
            seuil_bas_carbone_kgco2_m3: 230,
            classique_min_kgco2_m3: 260, classique_max_kgco2_m3: 290,
            note: 'B\u00e9tons architectoniques polis n\u00e9cessitent souvent haute r\u00e9sistance (C35/45) et ciments clairs. Seuil SNBPE plus difficile \u00e0 atteindre sur cette classe.',
            source: 'SNBPE « B\u00e9ton Bas Carbone — D\u00e9finition », avril 2021, docs/SNBPE_beton-bas-carbone.pdf'
        }
    },

    'blocs_taille': {
        label: 'Blocs taill\u00e9s',
        description: 'Blocs de marbre ou pierre dure d\u00e9coup\u00e9s en tranches ou blocs calibr\u00e9s.',
        usages: ['Revetement sol et mur', 'Escaliers', 'Plans de travail'],
        carbone_ratio_vs_beton: 0.18,
        distance_approvisionnement_km: 150,
        breeam_credit: 'Mat 03'
    },

    'blocs_erratiques': {
        label: 'Blocs erratiques',
        description: 'Gros blocs de roches cristallines transport\u00e9s et d\u00e9pos\u00e9s par les glaciers pleistoc\u00e8nes (essentiellement Alpes, Jura).',
        usages: ['Murs de sout\u00e8nement', 'Enrochements paysagers', 'Am\u00e9nagements hydrauliques (perr\u00e9s)'],
        carbone_ratio_vs_beton: 0.05,
        carbone_note: 'Aucune cuisson, transport minimal\u00a0: empreinte CO2 quasi nulle.',
        distance_approvisionnement_km: 10,
        breeam_credit: 'Mat 03, LE 04, Pol 03',
        note: 'Si pr\u00e9sents sur le site lors du terrassement, leur r\u00e9utilisation in situ \u00e9limine tout transport. Excellent support pour la biodiversit\u00e9 (habitats lithophiles).'
    },

    'pierre_volcanique': {
        label: 'Pierre volcanique',
        description: 'Basaltes ou trachytes calibr\u00e9s, pierre dense et sombre.',
        usages: ['Parements', 'Pav\u00e9s', 'Mobilier urbain'],
        carbone_ratio_vs_beton: 0.18,
        distance_approvisionnement_km: 80,
        breeam_credit: 'Mat 03'
    },

    'argile_briqueterie': {
        label: 'Argile \u00e0 briqueterie',
        description: 'Argiles smectitiques ou illitiques cuites vers 1000\u202f\u00b0C pour fabrication briques et tuiles.',
        usages: ['Briques de parement et porteuses', 'Tuiles canal et m\u00e9caniques', 'Pav\u00e9s d\'argile'],
        carbone_ratio_vs_beton: 0.40,
        carbone_note: 'Cuisson \u00e9nergivore mais dur\u00e9e de vie >100 ans compense sur ACV.',
        distance_approvisionnement_km: 80,
        breeam_credit: 'Mat 03, Mat 01',
        note: 'Fili\u00e8re fran\u00e7aise encore tr\u00e8s active (plus de 60 briqueteries). Priorit\u00e9 \u00e0 l\'approvisionnement r\u00e9gional.'
    },

    'tuile': {
        label: 'Tuiles',
        description: 'Tuiles c\u00e9ramiques issues des argiles locales.',
        usages: ['Couverture'],
        carbone_ratio_vs_beton: 0.40,
        distance_approvisionnement_km: 100,
        breeam_credit: 'Mat 03'
    },

    'carreau': {
        label: 'Carreaux c\u00e9ramiques',
        description: 'Carreaux de sol ou mur issus de l\'argile locale.',
        usages: ['Sols int\u00e9rieurs', 'Fa\u00efences', 'Bardages c\u00e9ramiques'],
        carbone_ratio_vs_beton: 0.35,
        distance_approvisionnement_km: 100,
        breeam_credit: 'Mat 03'
    },

    'argile_bauxitique_aluminium': {
        label: 'Argile bauxitique',
        description: 'Argiles ferro-alumineuses, ressource historique pour l\'extraction de l\'aluminium.',
        usages: ['Mati\u00e8re premi\u00e8re aluminium (anciennement)', 'Pigments rouges', 'Charges min\u00e9rales'],
        carbone_ratio_vs_beton: null,
        distance_approvisionnement_km: 100,
        breeam_credit: 'Mat 03',
        note: 'Exploitation intensive en Provence au XX\u00e8 si\u00e8cle (Brignoles, Bari\u00e8res). Aujourd\'hui quasi \u00e9puis\u00e9e. Int\u00e9r\u00eat patrimonial plus qu\'\u00e9conomique.'
    },

    'platre': {
        label: 'Pl\u00e2tre',
        description: 'Mat\u00e9riau obtenu par cuisson du gypse \u00e0 140\u202f\u00b0C environ.',
        usages: ['Cloisons int\u00e9rieures', 'Enduits', 'Plafonds'],
        carbone_ratio_vs_beton: 0.30,
        carbone_note: 'Cuisson moins \u00e9nergivore que la chaux ou le ciment.',
        distance_approvisionnement_km: 100,
        breeam_credit: 'Mat 03, Mat 01',
        note: 'Paris bassin de production historique (Montmartre, Cormeilles-en-Parisis). Recyclable en cycle ferm\u00e9 (cradle-to-cradle).'
    },

    'enduits_gypse': {
        label: 'Enduits de gypse',
        description: 'Enduits traditionnels \u00e0 base de pl\u00e2tre.',
        usages: ['Enduits int\u00e9rieurs', 'Protection feu'],
        carbone_ratio_vs_beton: 0.30,
        distance_approvisionnement_km: 100,
        breeam_credit: 'Mat 03'
    },

    'craie_amendement': {
        label: 'Craie d\'amendement agricole',
        description: 'Craie broy\u00e9e pour corriger l\'acidit\u00e9 des sols agricoles.',
        usages: ['Amendement calcaire (agriculture)'],
        carbone_ratio_vs_beton: 0.02,
        distance_approvisionnement_km: 30,
        breeam_credit: 'LE 04 (s\'il y a contexte agricole)',
        note: 'Valorisation non b\u00e2timent\u00a0: r\u00e9utilisation des d\u00e9blais de chantier en amendement (circuit court).'
    },

    'amendement_agricole': {
        label: 'Amendement agricole',
        description: 'D\u00e9blais calcaires utilisables en amendement agricole.',
        usages: ['Agriculture (correction acidit\u00e9)'],
        carbone_ratio_vs_beton: 0.02,
        distance_approvisionnement_km: 30,
        breeam_credit: 'LE 04'
    },

    'pierre_de_construction': {
        label: 'Pierre de construction',
        description: 'Pierres locales pour ma\u00e7onnerie traditionnelle.',
        usages: ['Ma\u00e7onnerie', 'Parements', 'Am\u00e9nagements'],
        carbone_ratio_vs_beton: 0.15,
        distance_approvisionnement_km: 40,
        breeam_credit: 'Mat 03'
    },

    'pierre_seche': {
        label: 'Pierre s\u00e8che',
        description: 'Blocs irr\u00e9guliers mont\u00e9s sans mortier, technique ancestrale.',
        usages: ['Murs de sout\u00e8nement paysagers', 'Cl\u00f4tures', 'Cabanons'],
        carbone_ratio_vs_beton: 0.03,
        carbone_note: 'Mat\u00e9riaux uniquement, aucun liant = bilan carbone tr\u00e8s favorable.',
        distance_approvisionnement_km: 10,
        breeam_credit: 'Mat 03, LE 04, Mat 01',
        note: 'Savoir-faire inscrit au patrimoine immat\u00e9riel de l\'UNESCO (2018). Exp\u00e9rience d\u00e9montr\u00e9e en sout\u00e8nement +\u00e9cosyst\u00e8me biodivers.'
    }
};

// ============================================================================
// Expose en global
// ============================================================================
if (typeof window !== 'undefined') {
    window.SA_LITHO_ATTRIBUTES = SA_LITHO_ATTRIBUTES;
    window.SA_MATERIAUX_INFO = SA_MATERIAUX_INFO;
    window.SA_DTU_13_12_TYPES = SA_DTU_13_12_TYPES;
    window.SA_DTU_13_12_CONTRAINTES = SA_DTU_13_12_CONTRAINTES;
    window.SA_SNBPE_SEUILS = SA_SNBPE_SEUILS;
    window.saCartoLithoProfile = saCartoLithoProfile;
    window.saCartoEnrichFeature = saCartoEnrichFeature;
    window.saCartoProfileAtPoint = saCartoProfileAtPoint;
    window.saCartoDominantFamilies = saCartoDominantFamilies;
}
