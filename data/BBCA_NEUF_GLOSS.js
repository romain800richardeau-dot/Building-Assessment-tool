// ============================================================
// BBCA NEUF V3.2 — Glossaire spécifique
// Sigles, acronymes et termes techniques propres au label BBCA et à l'ACV bâtiment
// Source : Référentiel BBCA Neuf v3.2 + Méthode E+C- + base INIES
// ============================================================

const BBCA_NEUF_GLOSS = {

  ACV: {
    libelle: "Analyse de Cycle de Vie",
    definition: "Méthode normalisée (ISO 14040/14044) d'évaluation des impacts environnementaux d'un produit ou bâtiment sur l'ensemble de son cycle de vie : extraction, fabrication, transport, mise en œuvre, utilisation, fin de vie.",
    contexteBBCA: "Méthode socle du label BBCA, basée sur la méthode E+C- avec spécificités BBCA"
  },

  Eges: {
    libelle: "Émissions de Gaz à Effet de Serre",
    definition: "Total des émissions équivalent CO₂ d'un bâtiment, exprimé en kg CO₂ éq/m² SDP sur 50 ans (période d'étude de référence).",
    formuleProjet: "Eges projet = Eges Déconstruction + Eges PCE + Eges LivréEnBlanc + Eges Énergie + Eges Chantier + Eges Eau + Stockage Carbone"
  },

  EgesPCE: {
    libelle: "Eges Produits de Construction et Équipements",
    definition: "Émissions liées aux 14 lots E+C- (de la VRD aux courants faibles) sur l'ensemble du cycle de vie. C'est le contributeur le plus important pour un bâtiment neuf (~60% des émissions).",
    seuils: "Plafonné à 650 (résidentiel), 800 (hôtel) ou 900 (bureaux/autres) kg CO₂/m² SDP"
  },

  EgesEnergie: {
    libelle: "Eges Énergie",
    definition: "Émissions liées aux consommations d'énergie tous usages sur 50 ans (RT2012/RE2020 + usages non réglementés). S'appuie sur les coefficients d'émission CO₂ de la Base Carbone.",
    moduleBBCA: "Modulé par mBBCA selon zone climatique, altitude, surface (formule dépendant de αBBCA, Mgctype, Mgcgéo, Mgcalt, Mgcsurf)"
  },

  StockageCarbone: {
    libelle: "Stockage Carbone (biogénique)",
    definition: "Quantité de carbone séquestrée par les matériaux biosourcés du bâtiment (bois, paille, chanvre, etc.). Calculée selon la norme EN 16 449. S'exprime en valeur négative (émissions évitées).",
    perimetre: "Lots 1 à 7 du référentiel E+C-",
    condition: "Matières d'origine labellisée FSC, PEFC ou autre label de gestion durable"
  },

  FDES: {
    libelle: "Fiche de Déclaration Environnementale et Sanitaire",
    definition: "Document normalisé (NF EN 15804+A2) qui décrit les impacts environnementaux d'un produit de construction. Indispensable à toute ACV bâtiment.",
    typesPrioriteBBCA: [
      "Spécifique individuelle (rang 1, idéal)",
      "Spécifique individuelle équivalente (rang 2, sous justification)",
      "Spécifique collective (rang 3)",
      "Spécifique collective équivalente (rang 4)",
      "DED — Donnée Environnementale par Défaut (rang 5, à éviter)"
    ],
    base: "Base INIES — www.inies.fr",
    validite: "5 ans pour les FDES sous norme NF EN 15 804"
  },

  DED: {
    libelle: "Donnée Environnementale par Défaut",
    definition: "Valeur conventionnelle utilisée à défaut de FDES disponible pour un produit. Pénalisante par construction (jusqu'à +30% par rapport à une FDES réelle).",
    usage: "Toujours autorisée mais à éviter au maximum"
  },

  EplusCmoins: {
    libelle: "E+C- (Bâtiment à Énergie Positive et Réduction Carbone)",
    definition: "Expérimentation lancée en 2017 par les pouvoirs publics pour préparer la RE2020. Définit la méthode de calcul ACV bâtiment et les niveaux Énergie (E1 à E4) et Carbone (C1, C2).",
    role: "Méthode socle du référentiel BBCA"
  },

  RE2020: {
    libelle: "Réglementation Environnementale 2020",
    definition: "Réglementation française entrée en vigueur en 2022 pour les constructions neuves. Issue de l'expérimentation E+C-. Impose un calcul ACV pour le permis de construire.",
    rapportBBCA: "BBCA est compatible RE2020 mais va plus loin sur l'exigence (méthodes et seuils)"
  },

  CarboneE1: { libelle: "Niveau Énergie 1 (E+C-)", definition: "Premier niveau de performance énergétique selon E+C-, niveau d'exigence intermédiaire entre RT2012 et BEPOS. Prérequis BBCA Neuf en tertiaire." },
  CarboneE2: { libelle: "Niveau Énergie 2 (E+C-)", definition: "Niveau intermédiaire vers le BEPOS." },
  CarboneE3: { libelle: "Niveau Énergie 3 (E+C-)", definition: "Niveau proche du BEPOS." },
  CarboneE4: { libelle: "Niveau Énergie 4 (E+C-)", definition: "Niveau BEPOS (Bâtiment à Énergie Positive)." },
  CarboneC1: { libelle: "Niveau Carbone 1 (E+C-)", definition: "Premier niveau de performance carbone selon E+C-. Prérequis BBCA Neuf." },
  CarboneC2: { libelle: "Niveau Carbone 2 (E+C-)", definition: "Niveau carbone plus exigeant que C1." },

  SDP: {
    libelle: "Surface De Plancher",
    definition: "Surface de référence du calcul ACV BBCA. Définie par l'article L.331-10 du Code de l'Urbanisme : somme des surfaces de tous les niveaux construits, clos et couverts, dont la hauteur de plafond est supérieure à 1,80 m.",
    note: "Exclut parkings en infrastructure, locaux techniques, balcons et terrasses"
  },

  SDPHotel: {
    libelle: "Cas particulier hôtel",
    definition: "Pour un hôtel, les calculs sont effectués en m² SDP mais le seuil d'émissions est exprimé en kg CO₂/chambre (unité de pilotage habituelle des actifs hôteliers).",
    formule: "Surface moyenne chambre = SDP / nombre de chambres"
  },

  Mstationnement: {
    libelle: "Modulation Stationnement (BBCA)",
    definition: "Modulation BBCA spécifique qui réduit Eges PCE projet en fonction de la surface de stationnement clos/couvert. Remplace le coefficient Mpark E+C-, généralement plus favorable.",
    formule: "(Surface_stationnement * 170) / SDP",
    plafondRatio: "30% SDP en tertiaire, 40% en résidentiel/hôtel"
  },

  Magrement: {
    libelle: "Modulation Surfaces d'Agrément Extérieur (BBCA)",
    definition: "Modulation pour valoriser les balcons, loggias, terrasses en épannelage et coursives en débord (hors toiture-terrasse).",
    formule: "(Surface_agrement * 200) / SDP",
    plafondRatio: "15% SDP en tertiaire, 4-10 m²/logement en résidentiel"
  },

  mBBCA: {
    libelle: "Modulation BBCA Énergie",
    definition: "Coefficient de modulation soustrait d'Eges Énergie en fonction du type de bâtiment, de la zone climatique, de l'altitude et de la surface.",
    formule: "αBBCA × [Mgctype × (Mgcgéo + Mgcalt + Mgcsurf) − 1]",
    alphaBBCA: "Résidentiel: 400, Bureaux: 210, Autres RT: 310, Hôtels: 300"
  },

  TitreV: {
    libelle: "Titre V BBCA — Ouvrages Particuliers",
    definition: "Procédure de dérogation permettant de neutraliser tout ou partie des Eges PCE d'un ouvrage particulier (PPRI, mutualisation, géotechnique, etc.). Validation par la Commission Technique BBCA dans un délai de 2 mois.",
    seuilApplicabilite: "Émissions de l'ouvrage > 5% de l'Eges PCE du projet"
  },

  LivreEnBlanc: {
    libelle: "Bâtiment Livré en Blanc",
    definition: "Bâtiment de bureaux livré sans cloisonnement (Cas 1) ou sans second œuvre (Cas 2), aménagé ultérieurement par le preneur. Le référentiel BBCA impose des valeurs forfaitaires pour les lots 5 et 7 (HQE Performance 9e décile) afin d'avoir un bilan complet.",
    note: "Mention 'Livré en blanc' apparaît sur l'attestation Certivea délivrée"
  },

  PCE: {
    libelle: "Produits de Construction et Équipements",
    definition: "L'un des 4 contributeurs principaux du calcul ACV bâtiment selon E+C- (avec Énergie, Eau, Chantier). Recouvre les 14 lots de la nomenclature E+C-.",
    poids: "Représente ~60% des émissions d'un bâtiment neuf"
  },

  PIC: {
    libelle: "Points Innovation Climat",
    definition: "Points complémentaires (max 10) attribués aux dispositions valorisées par BBCA et non comptabilisées dans l'ACV : déconstruction sélective, réemploi, mutualisation, changement d'usage, extension, SED, commissionnement, sensibilisation."
  },

  SED: {
    libelle: "Simulation Énergétique Dynamique",
    definition: "Calcul thermique heure par heure basé sur un scénario d'usage réaliste, prenant en compte tous les postes (réglementaires et non réglementaires). Plus précise qu'une STD classique.",
    pointBBCA: "+1 point Innovation Climat en tertiaire"
  },

  Commissionnement: {
    libelle: "Commissionnement",
    definition: "Ensemble des tâches pour mener à terme une installation neuve afin qu'elle atteigne le niveau de performances contractuelles et créer les conditions pour les maintenir (Mémento du commissionnement, COSTIC/ADEME/FFB 2008).",
    pointBBCA: "+1 point Innovation Climat si réalisé par tierce partie"
  },

  CERTIVEA: {
    libelle: "CERTIVEA",
    definition: "Filiale du CSTB, organisme certificateur leader en France pour la labélisation des bâtiments tertiaires, infrastructures et aménagement des territoires. Délivre BBCA, HQE, BREEAM (en partenariat BRE), etc."
  },

  AssociationBBCA: {
    libelle: "Association pour le Développement du Bâtiment Bas Carbone",
    definition: "Association porteuse du référentiel technique BBCA, créée en 2015. Rassemble une centaine de membres (promoteurs, investisseurs, collectivités, architectes, BE, constructeurs).",
    role: "Élabore et fait évoluer les référentiels techniques BBCA via sa Commission Technique"
  },

  CalculetteBBCA: {
    libelle: "Calculette BBCA",
    definition: "Outil Excel officiel fourni par l'Association BBCA, à compléter et déposer dans le dossier d'évaluation Certivea. Centralise les indicateurs ACV par contributeur et calcule le score BBCA.",
    note: "Indispensable au dossier de candidature (Conception et Réalisation)"
  },

  BEPOS: {
    libelle: "Bâtiment à Énergie Positive",
    definition: "Bâtiment dont la production d'énergie renouvelable annuelle (sur site et locale) dépasse les consommations en énergie primaire. Niveau Énergie 4 du référentiel E+C-."
  },

  Bilan_Bepos: {
    libelle: "Bilan BEPOS",
    definition: "Indicateur en kWh/m²SRT.an traduisant la balance énergétique du bâtiment (consommations - productions EnR). Demandé par BBCA en complément, avec calcul 'modulé EnR' pour anticiper futures évolutions."
  },

  ZoneClimatique: {
    libelle: "Zone Climatique RT (H1a, H1b, H1c, H2a, H2b, H2c, H2d, H3)",
    definition: "Découpage du territoire français en 8 zones climatiques selon la sévérité de l'hiver et de l'été. Conditionne les seuils Cep, Cepmax, et le coefficient mBBCA."
  }
};

if (typeof window !== 'undefined') {
  window.BBCA_NEUF_GLOSS = BBCA_NEUF_GLOSS;
}
