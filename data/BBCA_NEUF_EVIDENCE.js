// ============================================================
// BBCA NEUF V3.2 — Documents de la preuve par phase de candidature
// Phases : Conception (DCE) | Réalisation (livraison)
// Types  : Calculette | Note ACV | Plan | Document projet | Étude | PV / Rapport | Bon de livraison / Facture
// Source : Référentiel BBCA Neuf v3.2 + Mode d'emploi du dossier d'évaluation Certivea
// ============================================================

const BBCA_NEUF_EVIDENCE = {

  // ----------------------------------------------------------
  // I. PIÈCES OBLIGATOIRES — Phase CONCEPTION (DCE)
  // ----------------------------------------------------------
  conception: [
    { doc: "Calculette BBCA Neuf v4.1 (Excel) renseignée", phase: "Conception", type: "Calculette", obligatoire: true, source: "Téléchargée sur le site de l'Association BBCA" },
    { doc: "Note d'accompagnement ACV (commentaire de l'étude, hypothèses, justifications FDES équivalentes)", phase: "Conception", type: "Note ACV", obligatoire: true },
    { doc: "Export complet de l'étude ACV (Elodie ou COMETH) — fichier de calcul", phase: "Conception", type: "Note ACV", obligatoire: true },
    { doc: "Récapitulatif standardisé d'étude environnementale selon référentiel BBCA", phase: "Conception", type: "Note ACV", obligatoire: true },
    { doc: "Liste des FDES utilisées (avec rang de priorité, FDES équivalentes argumentées)", phase: "Conception", type: "Étude", obligatoire: true },
    { doc: "Note thermique / RT2012 ou RE2020 (Bbio, Cep, vérification E1 et C1)", phase: "Conception", type: "Étude", obligatoire: true },
    { doc: "Bilan Bepos et calcul Bepos modulé EnR (anticipation futures évolutions)", phase: "Conception", type: "Note ACV", obligatoire: false },
    { doc: "Plans architecte au stade DCE (PC, niveaux, façades, coupes)", phase: "Conception", type: "Plan", obligatoire: true },
    { doc: "DCE — pièces écrites des lots à fort impact carbone (lots 02, 03, 06, 07, 08)", phase: "Conception", type: "Document projet", obligatoire: true },
    { doc: "DPGF du projet (vérification des quantitatifs modélisés)", phase: "Conception", type: "Document projet", obligatoire: true },
    { doc: "Note de calcul stockage carbone biogénique (selon EN 16 449)", phase: "Conception", type: "Note ACV", obligatoire: false, condition: "Si présence de biosourcés" }
  ],

  // ----------------------------------------------------------
  // II. PIÈCES SPÉCIFIQUES — Phase CONCEPTION (selon dispositions du projet)
  // ----------------------------------------------------------
  conceptionConditionnelles: [
    { doc: "Diagnostic ressources (réemploi, biosourcés, sourcing local <250 km)", phase: "Conception", type: "Étude", condition: "Recommandé si déconstruction préalable + obligatoire pour points IC réemploi" },
    { doc: "Diagnostic déchets réglementaire (décret n°2011-610 du 31 mai 2011)", phase: "Conception", type: "Étude", condition: "Si démolition > 1000 m²" },
    { doc: "Justification de l'utilisation de Mstationnement (plan stationnement, emprise, ratio)", phase: "Conception", type: "Document projet", condition: "Si modulation Mstationnement utilisée" },
    { doc: "Justification de l'utilisation de Magrement extérieur (plans, mesurage)", phase: "Conception", type: "Document projet", condition: "Si modulation Magrement utilisée" },
    { doc: "Étude géotechnique et justification du forfait fondations spéciales", phase: "Conception", type: "Étude", condition: "Si forfait fondations spéciales utilisé" },
    { doc: "Dossier Titre V BBCA — Ouvrages particuliers (descriptif, justificatif, calcul ACV, proposition de neutralisation)", phase: "Conception", type: "Étude", condition: "Si dérogation Titre V demandée — délai validation Commission BBCA 2 mois" },
    { doc: "Lettre d'engagement réseau de chaleur signée du décisionnaire (description installation, taux EnR cible, planning travaux <3 ans après livraison, acceptation publication)", phase: "Conception", type: "Document projet", condition: "Si réseau de chaleur en cours d'évolution / création" },
    { doc: "Justification SED hôtel piscine/spa (efficacité < 80 gCO2/kWh)", phase: "Conception", type: "Note ACV", condition: "Hôtel avec piscine ou spa" },
    { doc: "Étude exploitation bi-énergie validée par tiers de confiance", phase: "Conception", type: "Étude", condition: "Si exploitation bi-énergie revendiquée" }
  ],

  // ----------------------------------------------------------
  // III. PIÈCES INNOVATION CLIMAT — Phase CONCEPTION
  // ----------------------------------------------------------
  conceptionInnovationClimat: [
    { doc: "Documents gestion opérationnelle de la dépose méthodique (DCE déconstruction sélective)", phase: "Conception", type: "Document projet", pointIC: "deconstructionSelective" },
    { doc: "Note de mutualisation parking (solutions techniques + juridiques min 10 ans)", phase: "Conception", type: "Document projet", pointIC: "mutualisationParkings" },
    { doc: "Note de mutualisation espaces (calcul surface complémentaire équivalente)", phase: "Conception", type: "Document projet", pointIC: "mutualisationEspaces" },
    { doc: "Schéma d'évolution des espaces (changement d'usage)", phase: "Conception", type: "Plan", pointIC: "changementUsage" },
    { doc: "Note de dimensionnement intégrant l'évolution (changement d'usage niveau 2-3)", phase: "Conception", type: "Note ACV", pointIC: "changementUsage" },
    { doc: "Dossier complet du process de changement d'usage (niveau 3)", phase: "Conception", type: "Étude", pointIC: "changementUsage" },
    { doc: "Plan / dimensionnement justifiant l'extension horizontale ou verticale", phase: "Conception", type: "Plan", pointIC: "extensionBatiment" },
    { doc: "Rapport de Simulation Énergétique Dynamique (SED)", phase: "Conception", type: "Étude", pointIC: "sed", condition: "Tertiaire uniquement" },
    { doc: "Plan de commissionnement (rôles, planning, périmètre)", phase: "Conception", type: "Procédure", pointIC: "commissionnement" }
  ],

  // ----------------------------------------------------------
  // IV. PIÈCES OBLIGATOIRES — Phase RÉALISATION
  // ----------------------------------------------------------
  realisation: [
    { doc: "Calculette BBCA Neuf v4.1 (Excel) mise à jour avec données réelles", phase: "Réalisation", type: "Calculette", obligatoire: true },
    { doc: "Note ACV mise à jour entre Conception et Réalisation (justification écarts)", phase: "Réalisation", type: "Note ACV", obligatoire: true },
    { doc: "Export ACV final (Elodie/COMETH)", phase: "Réalisation", type: "Note ACV", obligatoire: true },
    { doc: "BONS DE LIVRAISON et FACTURES justifiant les quantitatifs réellement mis en œuvre", phase: "Réalisation", type: "Bon de livraison / Facture", obligatoire: true, criticite: "haute", note: "Insistance forte de Certivea — collecte rigoureuse à organiser dès le début du chantier" },
    { doc: "DOE (Dossier des Ouvrages Exécutés) des lots impactant le carbone", phase: "Réalisation", type: "Document projet", obligatoire: true },
    { doc: "PV de réception de la totalité des lots", phase: "Réalisation", type: "PV / Rapport", obligatoire: true },
    { doc: "Liste finale des FDES réellement utilisées (avec validations)", phase: "Réalisation", type: "Étude", obligatoire: true, note: "FDES équivalentes : non autorisées en Réalisation - DED ou FDES collective uniquement" },
    { doc: "Plans EXE des lots à fort impact carbone", phase: "Réalisation", type: "Plan", obligatoire: true }
  ],

  // ----------------------------------------------------------
  // V. PIÈCES SPÉCIFIQUES — Phase RÉALISATION
  // ----------------------------------------------------------
  realisationConditionnelles: [
    { doc: "Données réelles consommations chantier (énergie, eau, gravats)", phase: "Réalisation", type: "Étude", obligatoire: true },
    { doc: "Bordereaux de suivi des produits réemployés (origine + mise en œuvre)", phase: "Réalisation", type: "Bon de livraison / Facture", condition: "Si points IC réemploi revendiqués" },
    { doc: "Mesure d'étanchéité à l'air de l'enveloppe + réseaux aérauliques", phase: "Réalisation", type: "Mesure", condition: "Si point IC commissionnement revendiqué" },
    { doc: "Rapport de commissionnement (résultats, équipements, tests de performance)", phase: "Réalisation", type: "PV / Rapport", condition: "Si point IC commissionnement revendiqué" },
    { doc: "Attestation de formation / sensibilisation des usagers + supports", phase: "Réalisation", type: "Procédure", condition: "Si point IC sensibilisation revendiqué" },
    { doc: "Justificatif de mise en service effective du réseau de chaleur (si lettre d'engagement Conception)", phase: "Réalisation", type: "PV / Rapport", condition: "Si réseau de chaleur en évolution" },
    { doc: "Mise à jour Titre V BBCA (état réalisé)", phase: "Réalisation", type: "Étude", condition: "Si Titre V Conception" }
  ],

  // ----------------------------------------------------------
  // VI. JALONS du processus de labellisation Certivea
  // ----------------------------------------------------------
  jalons: [
    { ordre: 1,  jalon: "Demande de labellisation (formulaire d'information CERTIVEA)",                 phase: "Avant-projet",       responsable: "Demandeur" },
    { ordre: 2,  jalon: "Offre Certivea reçue",                                                          phase: "Contractualisation", responsable: "CERTIVEA" },
    { ordre: 3,  jalon: "Signature contrat de labellisation",                                            phase: "Contractualisation", responsable: "Demandeur + CERTIVEA" },
    { ordre: 4,  jalon: "Constitution du dossier d'évaluation Conception",                               phase: "Conception",         responsable: "Demandeur (AMO)" },
    { ordre: 5,  jalon: "Dépôt sur SharePoint dédié + notification Certivea",                            phase: "Conception",         responsable: "Demandeur" },
    { ordre: 6,  jalon: "Vérification documentaire par le vérificateur",                                 phase: "Conception",         responsable: "Vérificateur",   delaiSemaines: 4 },
    { ordre: 7,  jalon: "Rapport provisoire reçu (points sensibles + écarts)",                           phase: "Conception",         responsable: "Vérificateur" },
    { ordre: 8,  jalon: "Réponse aux écarts + apport des preuves de levée",                              phase: "Conception",         responsable: "Demandeur" },
    { ordre: 9,  jalon: "Rapport définitif Conception",                                                  phase: "Conception",         responsable: "Vérificateur" },
    { ordre: 10, jalon: "Décision Certivea : attribution attestation provisoire (jusqu'à Réalisation)", phase: "Conception",         responsable: "CERTIVEA" },
    { ordre: 11, jalon: "Constitution du dossier d'évaluation Réalisation",                              phase: "Réalisation",        responsable: "Demandeur (AMO)" },
    { ordre: 12, jalon: "Dépôt sur SharePoint + notification Certivea",                                  phase: "Réalisation",        responsable: "Demandeur" },
    { ordre: 13, jalon: "Vérification SUR SITE + documentaire",                                          phase: "Réalisation",        responsable: "Vérificateur" },
    { ordre: 14, jalon: "Rapport provisoire Réalisation (points forts + écarts)",                        phase: "Réalisation",        responsable: "Vérificateur",   delaiSemaines: 4 },
    { ordre: 15, jalon: "Réponse aux écarts + preuves de levée",                                         phase: "Réalisation",        responsable: "Demandeur" },
    { ordre: 16, jalon: "Rapport définitif Réalisation",                                                 phase: "Réalisation",        responsable: "Vérificateur" },
    { ordre: 17, jalon: "Décision Certivea : attestation définitive (1 an de validité)",                phase: "Réalisation",        responsable: "CERTIVEA" }
  ],

  // ----------------------------------------------------------
  // VII. PARTICIPANTS attendus à la vérification SUR SITE
  // ----------------------------------------------------------
  participantsVerificationSite: [
    { role: "AMO",                  obligatoire: true },
    { role: "Représentant MOA",     obligatoire: true },
    { role: "Représentant BET Thermique", obligatoire: true },
    { role: "Représentant BET ACV", obligatoire: true }
  ],

  // ----------------------------------------------------------
  // VIII. CONTACTS organismes
  // ----------------------------------------------------------
  contacts: {
    certivea: { nom: "CERTIVEA", adresse: "4 avenue du Recteur Poincaré, 75016 Paris - France", tel: "+33 (0)1 40 50 29 09", site: "www.certivea.fr", role: "Organisme certificateur — délivre l'attestation, désigne les vérificateurs, encadre le processus" },
    associationBBCA: { nom: "Association BBCA", site: "www.batimentbascarbone.org", role: "Porteur du référentiel technique — Commission Technique pour validation des équivalences/Titres V" },
    consultationOperations: "https://certimap.certivea.fr"
  }
};

if (typeof window !== 'undefined') {
  window.BBCA_NEUF_EVIDENCE = BBCA_NEUF_EVIDENCE;
}
