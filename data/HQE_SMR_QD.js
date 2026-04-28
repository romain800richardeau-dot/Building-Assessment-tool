// ============================================================
// HQE BD V4.1 — SMR 1 (Contexte) — extension de QD
// Source : "HQE Bâtiment Durable v4.1/THEMES md/SMR/SMR1_CONTEXTE.md"
// ============================================================
(function () {
  'use strict';

  // CSS : pour les exigences l=2 (SMR1.x.y), passe le bloc ex-ctx
  // (fond vert clair par défaut) en GRIS clair, bordure gauche grise.
  // Cible précisément les ex-ctx qui suivent un .ex-sub-title de niveau 2
  // (caractérisés par les inline styles padding-left + font-size:12px).
  function injectCss() {
    if (document.getElementById('hqe-smr-ctx-css')) return;
    var st = document.createElement('style');
    st.id = 'hqe-smr-ctx-css';
    st.textContent =
      '.ex-sub-title[style*="padding-left"] + .ex-ctx,' +
      '.ex-sub-title[style*="font-size:12px"] + .ex-ctx,' +
      '.ex-sub-title[style*="font-size: 12px"] + .ex-ctx{' +
        'background:#FFFFFF !important;' +
        'border-left:2px solid #E2E8F0 !important;' +
      '}' +
      // Aligner le panneau Guide (gp-entry-desc, gfv) sur le panneau
      // Évaluation (ex-ctx) : même police, même taille, même couleur,
      // même line-height. Sélecteur plus spécifique (.gp.open) pour
      // battre la règle d'origine de l'app.
      '.gp.open .gp-entry-desc,.gp-entry-desc{' +
        "font-family:'Inter','Segoe UI',Tahoma,Geneva,Verdana,sans-serif !important;" +
        'font-size:13px !important;' +
        'line-height:1.7 !important;' +
        'color:#333 !important;' +
      '}' +
      '.gp.open .gp-entry-desc .gfv,.gp-entry-desc .gfv{' +
        "font-family:'Inter','Segoe UI',Tahoma,Geneva,Verdana,sans-serif !important;" +
        'font-size:13px !important;' +
        'line-height:1.7 !important;' +
        'color:#333 !important;' +
      '}' +
      // Indent compact des listes <ul>/<ol> dans Guide et Évaluation
      '.gp-entry-desc ul,.gp-entry-desc ol,.ex-ctx ul,.ex-ctx ol{' +
        'padding-left:20px !important;' +
        'margin:6px 0 !important;' +
      '}' +
      '.gp-entry-desc li,.ex-ctx li{margin:2px 0 !important;}' +
      // Hiérarchie du sommaire (TOC) pour les SMR : thème > sous-thème > exigence
      '.gp-toc-item.toc-smr-l0{font-weight:700 !important;color:#1E293B !important;font-size:12px !important;padding-top:10px !important;}' +
      '.gp-toc-item.toc-smr-l1{font-weight:600 !important;color:#334155 !important;font-size:11px !important;padding-left:8px !important;padding-top:4px !important;}' +
      '.gp-toc-item.toc-smr-l2{font-weight:400 !important;color:#64748B !important;font-size:10.5px !important;padding-left:20px !important;}';
    document.head.appendChild(st);
  }

  function inject() {
    if (typeof QD === 'undefined') return setTimeout(inject, 50);
    if (window._smr1QdInjected) return;
    window._smr1QdInjected = true;

    injectCss();

    QD['SMR1'] = {
      intro: "Contexte",
      context:
        "Ce thème établit le contexte de l'opération de façon multithématique : périmètres spatiaux et de responsabilités, analyse du site et du contexte, recueil des besoins et attentes des parties intéressées."
        + " | "
        + "Il pose le socle de l'opération en termes de contraintes, risques et opportunités, qui conditionneront les objectifs de performance visés."
    };

    QD['SMR1.1'] = {
      intro: "Périmètres",
      context:
        "Définition des périmètres spatiaux de la demande (bâtiments, sous-objets, sites) et du périmètre des responsabilités du demandeur."
        + " | "
        + "Pour l'axe Gestion en exploitation, un périmètre minimum de prestations est imposé pour être éligible à la certification."
    };

    QD['SMR1.1.1'] = {
      intro: "Définition du périmètre spatial de l'opération, et des prestations minimum en exploitation axe Gestion Durable",
      context:
        "Niveaux M1, M2, M3 — Le demandeur détermine le périmètre spatial de sa demande (bâtiment unique avec ses sous-objets, ou site à bâtiments multiples)."
        + " | "
        + "Pour l'axe Gestion en exploitation, le périmètre doit comprendre a minima certaines prestations (parties communes) listées dans la loupe.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1, M2, M3</strong><br><br>"
        + "<u>Construction neuve, rénovation, ou exploitation pour l'axe Bâtiment :</u><br>"
        + "Le demandeur peut découper un bâtiment en un ou plusieurs sous-objet(s) selon ses activités. Il détermine le périmètre spatial :<ul>"
          + "<li>Bâtiment unique : identifier les sous-objets inclus dans la demande.</li>"
          + "<li>Site à bâtiments multiples : identifier les bâtiments du site et leurs sous-objets associés.</li>"
        + "</ul>"
        + "<u>Exploitation, axe Gestion (parties communes uniquement) :</u><br>"
        + "Le périmètre doit comprendre a minima les prestations suivantes :<ul>"
          + "<li>maintenance multi techniques de l'ensemble des systèmes gérés par l'exploitant (hors privative)</li>"
          + "<li>approvisionnement et suivi des flux énergie/eau (hors compteurs privatifs)</li>"
          + "<li>gestion des déchets du bâtiment (activité, entretien/maintenance, rénovation)</li>"
          + "<li>nettoyage des espaces intérieurs (hors prestataires privatifs)</li>"
          + "<li>entretien des espaces extérieurs (le cas échéant)</li>"
          + "<li>nettoyage des espaces et du bâti extérieur</li>"
          + "<li>gestion des demandes d'intervention des occupants</li>"
          + "<li>suivi de la qualité d'air intérieur</li>"
          + "<li>suivi de la qualité sanitaire de l'eau</li>"
        + "</ul>"
        + "<em>Note : pour un bâtiment monolocataire, les parties communes sont confondues avec les parties privatives.</em><br>"
        + "Si certaines prestations ne sont pas dans le scope du demandeur, il doit obtenir l'accord écrit des donneurs d'ordre et leur engagement à fournir les informations nécessaires.",
      definition:
        "<strong>Sous-objet</strong> : ensemble des espaces d'une même activité sous la responsabilité d'un même demandeur sur un même bâtiment, évaluable par le référentiel « Bâtiment Durable ». Exemple : dans un bâtiment de bureaux, différentes activités (commissariat, call-center, centre médico-social, centre d'affaire…) ont comme espace caractéristique l'espace « bureau » individuel, collectif, ou en plateau."
        + "<br><br>"
        + "<strong>Site</strong> : ensemble des bâtiments répartis géographiquement sur un même lieu sous la responsabilité d'un même demandeur.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme, Conception et Réalisation</strong></td><td>Périmètre spatial (plans).</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Bâtiment)</strong></td><td>Périmètre spatial (plans). Inventaire des intervenants liés à l'exploitation.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Gestion)</strong></td><td>Périmètre spatial (plans). Contrats liés à l'exploitation. Accord écrit des donneurs d'ordre des prestations non incluses. Inventaire des intervenants.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR1.1.2'] = {
      intro: "Définition du périmètre des responsabilités en exploitation",
      context:
        "Niveaux M1, M2, M3 — Répertoire des intervenants liés à l'exploitation (gestionnaire, exploitants, prestataires) et de leurs missions, sous forme d'organigramme pour l'axe Gestion."
        + " | "
        + "Cas de non-applicabilité : non applicable si l'opération est en construction neuve ou en rénovation.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1, M2, M3</strong></td><td><br>"
        + "<u>Exploitation pour l'axe Bâtiment :</u><br>"
        + "Répertorier les intervenants liés à l'exploitation (hors utilisateurs) et leurs missions :<ul>"
          + "<li>Gestionnaire éventuel (mandat de gestion)</li>"
          + "<li>Exploitant principal et son éventuel mainteneur multi-technique</li>"
          + "<li>Autres exploitants (RIE, ascensoriste…)</li>"
          + "<li>Prestataires (sécurité, nettoyage, espaces verts, restauration…)</li>"
        + "</ul>"
        + "Répertorier les utilisateurs et identifier ceux qui s'engagent dans la démarche (l'implication des utilisateurs et de l'exploitant n'est pas requise pour l'axe Bâtiment).<br>"
        + "Déterminer le périmètre des responsabilités : éléments à charge du demandeur vs. champ d'action de l'utilisateur (hors périmètre).<br><br>"
        + "<u>Exploitation, axe Gestion :</u><br>"
        + "Mêmes répertoires d'intervenants, en intégrant le propriétaire (ou copropriétaires). L'inventaire est représenté sous forme d'<strong>organigramme</strong>. Les contrats associés sont répertoriés.<br><br>"
        + "<u>Pour les deux axes :</u><br>"
        + "Recenser les acteurs déjà engagés ou souhaitant s'engager dans une certification HQE. Rechercher les synergies (objectifs, communication, revues, audits) si d'autres acteurs sont engagés. Sinon, sensibiliser les autres acteurs à la démarche.",
      non_applicabilite: "Cette exigence est non applicable si l'opération est en construction neuve ou en rénovation.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme, Conception et Réalisation</strong></td><td>Non concernées.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Bâtiment)</strong></td><td>Périmètre des responsabilités comprenant les prestations minimum. Inventaire des intervenants.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Gestion)</strong></td><td>Périmètre des responsabilités. Accord écrit des donneurs d'ordre. Inventaire des intervenants. Contrats liés à l'exploitation.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR1.2'] = {
      intro: "Contexte et enjeux",
      context:
        "Analyse du site, du contexte de l'opération et de l'état initial. Le degré d'analyse va d'une simple lecture des contraintes réglementaires (M1) à une analyse complète des enjeux et risques (M2), jusqu'à une méthode générique déployée à l'échelle du parc (M3)."
        + " | "
        + "Le contenu attendu est détaillé dans l'annexe « Analyse du site et diagnostic initial de l'ouvrage »."
    };

    QD['SMR1.2.1'] = {
      intro: "Analyse du site, du contexte de l'opération et de l'état initial",
      context:
        "Niveaux M1, M2, M3 — Analyse différenciée selon les phases (neuf, rénovation, exploitation axes Bâtiment et Gestion). Détails dans la loupe.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong></td><td>"
        + "<em>Bâtiments neufs et rénovés :</em> analyse du site et du contexte au regard des obligations / contraintes réglementaires locales (PLU, règlements locaux…).<br>"
        + "<em>Rénovation ou exploitation axe Bâtiment :</em> diagnostic de l'état initial de l'ouvrage.<br>"
        + "<em>Existants en exploitation (axes Bâtiment et Gestion) :</em> inventaire documentaire.<br>"
        + "<em>Rénovation ou exploitation (axes Bâtiment et Gestion) :</em> inventaire des équipements du bâtiment.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "<em>Bâtiments neufs et rénovés :</em> analyse <strong>détaillée</strong> du site / contexte / enjeux (environnementaux, économiques, sociétaux). Identification des contraintes, risques et opportunités.<br>"
        + "<em>Existants en exploitation (axes Bâtiment et Gestion) :</em> en complément du M1, inventaire des produits du bâtiment.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Documents élaborés à partir d'une <strong>méthode générique</strong> déployée sur les opérations du demandeur, établie à partir de retours d'expériences concrets, et participant à l'amélioration continue de cette méthode.<br><br>"
        + "<em>Le contenu détaillé des analyses, diagnostics et inventaires est décrit dans l'annexe « Analyse du site et diagnostic initial de l'ouvrage ».</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme, Conception et Réalisation</strong></td><td><strong>M1</strong> : Analyse du site (obligations/contraintes). Rénovation : diagnostic état initial + inventaire équipements.<br><strong>M2</strong> : Analyse complète. Rénovation : diagnostic + inventaire équipements.<br><strong>M3</strong> : Documents élaborés via méthodologie déployée sur toutes les opérations.</td><td>Conformité au guide annexe.</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Bâtiment)</strong></td><td><strong>M1</strong> : Diagnostic état initial. Inventaire documents/diagnostics obligatoires. Inventaire équipements.<br><strong>M2</strong> : M1 + inventaire produits.<br><strong>M3</strong> : Méthodologie déployée.</td><td>Conformité au guide.</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Gestion)</strong></td><td><strong>M1</strong> : Inventaire documents/diagnostics obligatoires.<br><strong>M2</strong> : M1 + inventaire équipements + produits.<br><strong>M3</strong> : Méthodologie déployée.</td><td>Conformité au guide.</td></tr>"
        + "</table>"
    };

    QD['SMR1.3'] = {
      intro: "Besoins et attentes des parties intéressées",
      context:
        "Recueil et formulation des besoins et attentes des parties intéressées (utilisateurs, riverains, acteurs représentant l'intérêt collectif)."
        + " | "
        + "Selon le niveau de maturité, le recueil va de la formulation par procuration (M1) au recueil direct + consultation d'acteurs représentant l'intérêt collectif (M2), jusqu'à une méthode générique déployée à l'échelle du parc (M3)."
    };

    QD['SMR1.3.1'] = {
      intro: "Recueil et formulation des besoins et attentes des parties intéressées pour l'opération",
      context:
        "Niveaux M1, M2, M3 — De la formulation par procuration (M1) au recueil direct hiérarchisé (M2), jusqu'à la méthode générique déployée (M3). Détails dans la loupe.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong></td><td>"
        + "Les « parties intéressées » sont uniquement les <strong>utilisateurs et riverains</strong>. Ils peuvent ne pas être directement sollicités. Leurs besoins et attentes sont alors formulés par d'autres acteurs du projet censés les connaître (le demandeur notamment). Cette formulation est traduite dans un document.<br>"
        + "<em>Remarque : les utilisateurs sont par exemple les occupants d'un site dans lequel des travaux de rénovation ont lieu.</em><br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Les besoins et attentes des utilisateurs (présents et futurs s'ils sont connus, ou de leurs représentants) ainsi que des riverains sont <strong>recueillis directement auprès d'eux et formalisés</strong>, y compris en vue de la phase chantier. Une rencontre n'est pas exigée — les informations peuvent être obtenues via une enquête (notamment pour les bâtiments en exploitation, axe Bâtiment).<br>"
        + "Consultation d'un ou plusieurs acteurs représentant l'<strong>intérêt collectif</strong> (municipalité, collectivité territoriale, associations de protection du patrimoine, de la santé, etc.). Les besoins et attentes sont hiérarchisés et un consensus est recherché en cas de divergences.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Le recueil et la prise en compte des besoins et attentes des parties intéressées (utilisateurs, riverains, intérêts collectifs locaux…) bénéficient d'une <strong>méthode générique déployée sur les opérations du demandeur</strong>, établie à partir de retours d'expérience concrets et formalisés sur les opérations similaires, et participent à l'amélioration continue de cette méthode.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M1</strong> : Document de formulation des besoins et attentes.<br><strong>M2</strong> : Liste des parties intéressées. Document de formulation des besoins et attentes. Document de modalités de recueil (CR de réunions, enquêtes…).<br><strong>M3</strong> : Bilans et synthèses des opérations. Méthode générique de recueil.</td><td>Couvrir les besoins et attentes liés aux aspects environnementaux, sociaux et économiques du développement durable.</td></tr>"
        + "</table>"
    };

    // ════════════════ SMR 2 ENGAGEMENT ════════════════
    QD['SMR2'] = {
      intro: "Engagement",
      context:
        "Définition des objectifs de performance visés pour l'opération, portés par le demandeur sous forme d'un engagement formel partagé entre tous les acteurs et communiqué aux parties intéressées."
        + " | "
        + "Les rôles, relations et responsabilités entre acteurs sont clairement identifiés. La cohérence globale des objectifs visés à l'échelle du parc est également évaluée."
    };

    // ─────────────────── SMR 2.1 Objectifs de performance visés ───────────────────
    QD['SMR2.1'] = {
      intro: "Objectifs de performance visés",
      context:
        "Choix et hiérarchisation des objectifs de performance pour l'opération : niveau global (Performant / Très Performant / Excellent / Exceptionnel) et niveaux en étoiles sur les 4 engagements (Qualité de vie, Respect de l'environnement, Performance économique, Pilotage Maîtrisé)."
        + " | "
        + "Selon le niveau de maturité, contextualisation et cohérence avec la politique de développement durable du demandeur."
    };

    QD['SMR2.1.1'] = {
      intro: "Choix, hiérarchisation et contextualisation des objectifs de performance visés pour l'opération",
      context:
        "M1 : choix et hiérarchisation des objectifs (niveau global + étoiles par engagement, déclinaison par sous-objet)."
        + " | "
        + "M2 : ajout de la contextualisation par rapport à l'analyse du site, du contexte, des risques, et des besoins/attentes des parties intéressées. Pour l'axe Gestion : objectifs alignés sur les contrats d'exploitation."
        + " | "
        + "M3 : méthode générique appuyée sur retours d'expérience + cohérence avec la politique DD du demandeur.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong><br>"
        + "Les objectifs de performance visés sont choisis et hiérarchisés en termes de :"
        + "<ul>"
          + "<li>niveau global agrégé (Performant, Très Performant, Excellent, Exceptionnel)</li>"
          + "<li>niveaux en étoiles sur les 4 engagements : Qualité de vie, Respect de l'environnement, Performance économique, Pilotage Maîtrisé</li>"
          + "<li>déclinaison selon les sous-objets du périmètre spatial</li>"
        + "</ul>"
        + "Si l'exigence a déjà été auditée précédemment : confirmer ou mettre à jour avec justification.<br>"
        + "<em>Notes : tenir compte du contexte législatif/réglementaire et de l'enveloppe financière. La contextualisation n'est pas exigée en M1. En exploitation, profil unique ou par sous-objet/bâtiment.</em><br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Tous bâtiments : <strong>contextualisation</strong> des objectifs par rapport à l'analyse du site, du contexte, des risques, et tenant compte des besoins et attentes des parties intéressées.<br>"
        + "Pour l'axe Gestion : objectifs fixés en fonction des <strong>contrats liés à l'exploitation</strong> (multi-techniques, prestations de services). Les ressources fonctionnelles, opérationnelles et financières définissent la base des exigences atteignables et celles nécessitant une action hors contrat. Ces actions peuvent être renégociées dans les contrats ou faire l'objet d'une négociation à part.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Démarche s'appuyant sur une <strong>méthode générique</strong> tenant compte des retours d'expérience formalisés.<br>"
        + "Les objectifs visés doivent être cohérents avec la <strong>politique de développement durable</strong> du demandeur, qui couvre :"
        + "<ul>"
          + "<li>protection de l'environnement (préservation ressources, réduction pollutions, déchets)</li>"
          + "<li>gestion patrimoniale (durabilité, adaptabilité, entretien, maintenance, coûts d'exploitation)</li>"
          + "<li>confort (usagers, riverains, personnel)</li>"
          + "<li>santé (usagers, riverains, personnel)</li>"
        + "</ul>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme, Conception et Réalisation</strong></td><td>Document justificatif du choix, de la hiérarchisation et (à partir de M2) de la contextualisation des objectifs.<br><strong>M3</strong> : Document présentant la politique DD du demandeur. Le cas échéant : confirmation/mise à jour d'un document antérieur.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Bâtiment)</strong></td><td>Document justificatif du choix/hiérarchisation/contextualisation. La contextualisation tient compte de la vérification des minimums requis. <strong>M3</strong> : politique DD du demandeur.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Gestion)</strong></td><td>Idem axe Bâtiment + prise en compte des <strong>contrats d'exploitation</strong>.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ─────────────────── SMR 2.2 Engagement de la direction ───────────────────
    QD['SMR2.2'] = {
      intro: "Engagement de la direction",
      context:
        "Engagement formel signé de la direction de l'organisme demandeur sur les objectifs de l'opération, diffusé à tous les collaborateurs et intervenants."
        + " | "
        + "Au niveau M3, l'engagement doit être cohérent avec la politique de développement durable de l'organisme."
    };

    QD['SMR2.2.1'] = {
      intro: "Engagement de la direction de l'organisme demandeur sur les objectifs de l'opération",
      context:
        "M1, M2 : document d'engagement signé de la direction précisant objectifs, niveau global, niveau de maturité SMR, ressources/moyens et budget."
        + " | "
        + "M3 : cohérence avec la politique DD de l'organisme demandeur.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1 et M2</strong></td><td>"
        + "L'engagement de la direction sur les périmètres (spatiaux et/ou de responsabilités en exploitation) est <strong>établi et formalisé par un document signé de la direction</strong>, précisant :"
        + "<ul>"
          + "<li>les objectifs de performance visés (en étoiles) sur les 4 engagements (Qualité de vie, Respect de l'environnement, Performance économique, Pilotage Maîtrisé)</li>"
          + "<li>le niveau global agrégé visé (Performant, Très Performant, Excellent, Exceptionnel)</li>"
          + "<li>le niveau de maturité visé sur le SMR : M1 (Opérationnel), M2 (Maîtrisé), M3 (Généralisé)</li>"
          + "<li>les ressources et moyens nécessaires (y compris le budget alloué)</li>"
          + "<li>les principaux objectifs fonctionnels de l'opération</li>"
        + "</ul>"
        + "Si l'opération comporte plusieurs sous-objets, les objectifs peuvent être définis par sous-objet ou globalement.<br>"
        + "Modifications acceptées sur justification, mais le demandeur s'engage à respecter les niveaux autant que possible.<br>"
        + "Le document doit être <strong>diffusé à tous les collaborateurs et intervenants</strong>. Révision et rediffusion en cas de modification.<br>"
        + "Le document constitue la <strong>référence</strong> pour la performance globale de l'opération à toutes ses étapes.<br>"
        + "<em>En exploitation, axe Gestion : le demandeur s'engage également à transmettre des recommandations d'exploitation privative à(aux) l'utilisateur(s) sur les aspects non maîtrisés, pour inciter tous les acteurs à concourir à la performance environnementale.</em><br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Les objectifs visés mentionnés dans le document d'engagement doivent être <strong>cohérents avec la politique de développement durable</strong> de l'organisme demandeur.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M1, M2</strong> : Document d'engagement du demandeur, daté et signé de la direction. Preuve de transmission aux intervenants. Document révisé (le cas échéant) et signé.<br><strong>M3</strong> : Document justifiant la cohérence avec la politique DD du demandeur, ou démonstration de cette cohérence.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ─────────────────── SMR 2.3 Rôles, responsabilités et autorités ───────────────────
    QD['SMR2.3'] = {
      intro: "Rôles, responsabilités et autorités",
      context:
        "Description écrite de la répartition des missions, responsabilités et autorités de chaque acteur ou intervenant dans l'opération."
        + " | "
        + "Aux niveaux M2/M3 : désignation d'un responsable SMR, implication anticipée de certains acteurs, et travail en mode collaboratif (par ex. via maquette numérique BIM)."
    };

    QD['SMR2.3.1'] = {
      intro: "Description des rôles, responsabilités et autorités de chaque acteur ou intervenant dans l'opération",
      context:
        "M1, M2 : répartition écrite des missions, responsabilités et autorités, communiquée aux personnes concernées, en lien avec la planification de l'opération."
        + " | "
        + "M3 : méthode d'élaboration générique appuyée sur retours d'expérience.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1 et M2</strong><br>"
        + "La répartition des missions, des responsabilités et des autorités doit être <strong>définie par écrit</strong>, et les collaborateurs / intervenants doivent en être informés. Cette répartition est en lien avec la planification de l'opération.<br>"
        + "Les rôles, responsabilités et autorités de chaque acteur (et les responsabilités éventuellement partagées) sont définis en relation avec la planification établie pour chaque phase ou période concernée.<br>"
        + "Inclure dans la description l'<strong>articulation avec l'agent de commissionnement</strong> (ou de recommissionnement / rétrocommissionnement en exploitation) qui interagit avec plusieurs acteurs (voir Objectif n°11, thème « Commissionnement »).<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "La répartition bénéficie d'une <strong>méthode d'élaboration générique</strong>, établie à partir de retours d'expérience concrets sur les opérations similaires du demandeur, et participe à l'amélioration continue de cette méthode.<br>"
        + "<em>Le simple fait que le demandeur reparte avec les mêmes équipes que sur ses opérations similaires n'est pas suffisant.</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M1, M2</strong> : Organigramme, lettres de mission, CR réunions, etc. pour chaque phase concernée. Pour l'exploitation : éventuellement contrats, liste de répartition des tâches.<br><strong>M3</strong> : Documents ci-dessus élaborés à partir d'une méthodologie déployée sur toutes les opérations du demandeur.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR2.3.2'] = {
      intro: "Désignation d'une ou plusieurs personnes responsables de la mise en place du SMR et de l'évaluation des performances",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : désignation d'une ou plusieurs personnes pour représenter le demandeur, avec responsabilité et autorité définies pour mettre en œuvre le SMR et évaluer les performances environnementales/sociales/économiques.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Une ou plusieurs personnes sont désignées pour représenter le demandeur, ayant une responsabilité et une autorité définies pour :"
        + "<ul>"
          + "<li>mettre en œuvre le SMR</li>"
          + "<li>évaluer les performances environnementales, sociales et économiques de l'opération</li>"
        + "</ul>"
        + "À chaque phase ou pour l'exploitation.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2, M3</strong> : Lettre(s) de mission, contrats.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR2.3.3'] = {
      intro: "Implication de certains acteurs davantage en amont, afin d'anticiper et d'optimiser les choix et les actions",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : implication anticipée de certains acteurs (futur exploitant en conception, prestataire de service avant son intervention…) pour anticiper et optimiser les choix.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Cette exigence valorise le fait que certains acteurs soient <strong>impliqués en amont</strong>, afin d'anticiper et d'optimiser les choix et les actions (applicable à chaque phase).<br>"
        + "<em>Exemples :</em>"
        + "<ul>"
          + "<li>Le futur exploitant (ou personne à compétence équivalente) est impliqué dans la phase de conception.</li>"
          + "<li>Un prestataire de service est impliqué avant son intervention sur le site en exploitation.</li>"
        + "</ul>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2, M3</strong> : Documents justificatifs de l'implication d'un acteur de façon anticipée (ex. : exploitant, entreprise ou utilisateurs en phase conception).</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR2.3.4'] = {
      intro: "Travail en mode collaboratif, de façon intégrée et interdisciplinaire",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : les acteurs de l'opération travaillent en mode collaboratif avec une méthode et des outils appropriés (ex. : maquette numérique BIM commune). Le simple partage d'un système de gestion documentaire ou des réunions communes ne suffit pas.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Les acteurs de l'opération travaillent en <strong>mode collaboratif</strong>, avec une méthode de travail et des outils appropriés, de façon <strong>intégrée et interdisciplinaire</strong>.<br>"
        + "<em>Par exemple, une maquette numérique commune à tous les acteurs est utilisée. Le simple fait de partager un système de gestion documentaire ou de réaliser des réunions communes ne suffit pas ici.</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2, M3</strong> : CR de réunions, d'ateliers thématiques de travail. Utilisation éventuelle de maquette numérique ou BIM, explication du mode de travail autour du BIM.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ════════════════ SMR 3 PLANIFICATION ════════════════
    QD['SMR3'] = {
      intro: "Planification",
      context:
        "L'atteinte des objectifs passe par une analyse de risques d'où découlent des actions à mener et la planification des étapes de chaque phase."
        + " | "
        + "Méthodes de suivi, mesure et analyse définies pour assurer un pilotage efficace, comportant des réunions de revue de projet."
        + " | "
        + "Prise en compte de l'influence des modifications éventuelles sur les objectifs visés. Profiter de l'expérience acquise sur d'autres opérations."
    };

    // ─────────────────── SMR 3.1 Gestion des risques ───────────────────
    QD['SMR3.1'] = {
      intro: "Gestion des risques",
      context:
        "Identification des risques (sociaux, économiques, environnementaux, etc.) pouvant affecter les performances de l'opération et le fonctionnement normal du bâtiment, et définition d'actions associées."
        + " | "
        + "Identification des situations d'urgence et exceptionnelles, et définition de réponses adéquates. Procédures testées périodiquement (sauf axe Bâtiment en exploitation)."
    };

    QD['SMR3.1.1'] = {
      intro: "Identification des risques pour l'opération et définition d'actions",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 : identification des risques (tous types) et définition d'actions (y compris préventives) pour limiter les conséquences. Communication aux acteurs et sensibilisation des parties intéressées si pertinent."
        + " | "
        + "M3 : méthode générique appuyée sur retours d'expérience.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Tous les types de risques sont concernés : sociaux, économiques, environnementaux, etc., pouvant affecter les performances de l'opération sur les 4 engagements et le fonctionnement normal du bâtiment.<br>"
        + "<em>La liste des risques à prendre en compte est donnée dans l'annexe « Analyse du site et diagnostic initial de l'ouvrage ».</em><br>"
        + "Gérer les risques de la phase en cours et anticiper les phases ultérieures. Pas de degré de détail très fin requis, mais les actions définies doivent être réalisables.<br>"
        + "<em>En exploitation, l'exigence est réévaluée si le contexte extérieur change, si un risque nouveau apparaît (ex : virus), ou si l'opération est modifiée (technique, d'usage…).</em><br>"
        + "Les risques sont identifiés et les actions nécessaires (y compris préventives) pour limiter leurs conséquences sont définies, y compris pour la phase chantier. Communication aux acteurs concernés et sensibilisation des parties intéressées si pertinent.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "L'identification des risques et la définition d'actions bénéficient d'une <strong>méthode générique déployée sur les opérations du demandeur</strong>, établie à partir de retours d'expérience concrets et formalisés.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2</strong> : Document sur la gestion des risques (liste des actions définies à chaque phase). Liste d'actions préventives + CR sur la mise en œuvre + éléments de communication + outil utilisé (logiciel, guide, norme…).<br><strong>M3</strong> : Documents ci-dessus élaborés à partir d'une méthodologie déployée sur toutes les opérations.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR3.1.2'] = {
      intro: "Identification des situations d'urgence possibles et définition des réponses adéquates par rapport aux risques avérés",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 : identification des situations d'urgence/exceptionnelles et accidents potentiels. Procédure pour traiter chaque risque, examen périodique. Test périodique des instructions d'urgence (sauf en exploitation axe Bâtiment)."
        + " | "
        + "M3 : méthode générique appuyée sur retours d'expérience.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Les situations d'urgence et exceptionnelles potentielles sont identifiées, ainsi que les accidents potentiels. Des <strong>réponses adéquates</strong> par rapport aux risques avérés sont définies pour la phase chantier et/ou la phase d'exploitation. Communication aux acteurs concernés.<br>"
        + "Priorité aux risques de probabilité élevée et impacts significatifs/durables/difficilement réversibles.<br>"
        + "Établir une <strong>procédure</strong> pour traiter chaque risque identifié, prévenir ou atténuer les impacts.<br>"
        + "Examen périodique et révision (notamment après occurrence d'accidents/situations d'urgence ou modification du contexte).<br>"
        + "<u>Pour les constructions neuves, rénovations et opérations en exploitation axe Gestion :</u> tester périodiquement les instructions d'urgence (lorsque réalisable) et conserver les enregistrements. <em>Cela ne concerne donc PAS les opérations en exploitation axe Bâtiment.</em><br><br>"
        + "<em>Notes :</em>"
        + "<ul>"
          + "<li>Un <strong>risque avéré</strong> est véritable, incontestable, prouvé. Les situations d'urgence/exceptionnelles sont relatives à des risques avérés et réels par rapport au contexte de l'ouvrage, dont les facteurs de gravité et d'occurrence sont conjointement réunis. Seuls sont inclus les risques ayant un impact potentiel sur les objectifs visés.</li>"
          + "<li><strong>Liste non exhaustive</strong> : canicule ou grand froid, pollution des sols, pollution des eaux, rupture de canalisation, rupture du service de ramassage des déchets, pic de pollution de l'air, etc.</li>"
        + "</ul>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "L'identification et la définition d'actions bénéficient d'une <strong>méthode générique déployée sur les opérations du demandeur</strong>.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme et Conception</strong></td><td>Niveau qui sera visé en réalisation.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phases Réalisation et Exploitation (axes Bâtiment et Gestion)</strong></td><td><strong>M2</strong> : Document traitant des situations d'urgence (préparation et réponses).<br><strong>M3</strong> : Document élaboré à partir d'une méthodologie déployée. En programme et conception : démonstration de ce qui est mis en place à l'échelle du demandeur.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ─────────────────── SMR 3.2 Planification des actions ───────────────────
    QD['SMR3.2'] = {
      intro: "Planification des actions",
      context:
        "Description de la succession des étapes et éléments organisationnels (calendrier, responsabilités, interfaces, moyens, méthodes, modalités d'évaluation, informations à conserver). Réunions de revue de projet aux étapes-clés."
        + " | "
        + "Gestion des modifications éventuelles avec prise en compte de leur influence sur les performances avant décision."
    };

    QD['SMR3.2.1'] = {
      intro: "Description de la succession des étapes de chaque phase ou période de l'opération et éléments organisationnels associés",
      context:
        "M1 : description de la succession des étapes (calendrier, responsabilités, interfaces, moyens, méthodes, évaluation, info à conserver). Réunions de revue de projet. En exploitation : plans d'actions avec gros entretien renouvellement et planning pluriannuel."
        + " | "
        + "M2 : prise en compte de la gestion des risques + commissionnement."
        + " | "
        + "M3 : méthode générique déployée.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong></td><td>"
        + "Le demandeur décrit la succession des étapes de chaque phase de l'opération (ou de chaque période en exploitation), en identifiant les éléments organisationnels suivants :"
        + "<ul>"
          + "<li>les actions et activités</li>"
          + "<li>le calendrier</li>"
          + "<li>les responsabilités et autorités associées</li>"
          + "<li>les interfaces entre intervenants</li>"
          + "<li>les moyens, méthodes et documents à utiliser</li>"
          + "<li>les modalités de l'évaluation des performances</li>"
          + "<li>les informations documentées à conserver</li>"
        + "</ul>"
        + "Des <strong>réunions de revue de projet</strong> sont programmées pour vérifier aux étapes-clés l'atteinte des performances visées, ou pour réagir à temps et de façon proportionnée.<br><br>"
        + "<u>En exploitation, axe Bâtiment :</u><br>"
        + "Établir, mettre en œuvre et tenir à jour un ou plusieurs <strong>plan(s) d'actions</strong> pour atteindre les objectifs visés, contenant :"
        + "<ul>"
          + "<li>actions de management (évaluation, élaboration de document, étude, réunion, etc.)</li>"
          + "<li>actions de gros entretien renouvellement liées à une amélioration de performance (peinture, renouvellement matériau, remplacement équipement, planning rénovation…)</li>"
        + "</ul>"
        + "Ces actions sont généralement regroupées dans un <strong>plan pluriannuel de travaux</strong> avec évaluation budgétaire.<br>"
        + "<em>Tâches typiques : remplacement des équipements énergétiques, renouvellement des matériaux/produits de second œuvre.</em><br>"
        + "<em>Périmètre : les plans concernent les parties gérées par le demandeur. Travaux en parties privatives où le demandeur est MO → évalués dans l'axe Bâtiment.</em><br><br>"
        + "<u>En exploitation, axe Gestion :</u><br>"
        + "En complément de l'axe Bâtiment, ajouter les actions liées à l'exploitation de l'ouvrage :"
        + "<ul>"
          + "<li>rédaction du rapport périodique</li>"
          + "<li>relevé des consommations</li>"
          + "<li>déclenchement des analyses d'eau</li>"
          + "<li>respect des gammes de maintenance préventive associées au plan de maintenance préventive, etc.</li>"
        + "</ul>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "La planification tient compte de la <strong>gestion des risques</strong> vue précédemment.<br>"
        + "<em>Rappel : inclure la mission de commissionnement (couvrant plusieurs phases — recommissionnement / rétrocommissionnement en exploitation), notamment les interfaces entre intervenants. Voir Objectif n°11, thème « Commissionnement ».</em><br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "L'organisation du déroulement bénéficie d'une <strong>méthode générique déployée</strong>, couvrant : actions/activités, calendrier, responsabilités, interfaces, moyens, méthodes, modalités d'évaluation, informations documentées.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme, Conception et Réalisation</strong></td><td><strong>M1, M2</strong> : Documents de planification de l'opération pour chaque phase (au M2 : prise en compte de la gestion des risques). Document de planification des revues de projet. CR de réunions et de revues.<br><strong>M3</strong> : Documents élaborés via méthodologie déployée.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phases Exploitation (axes Bâtiment et Gestion)</strong></td><td><strong>M1, M2</strong> : Plans d'actions, plan pluriannuel de travaux avec budget. Document de planification des revues. CR de réunions et de revues.<br><strong>M3</strong> : Documents élaborés via méthodologie déployée.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR3.2.2'] = {
      intro: "Gestion des modifications",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 : modifications gérées au fur et à mesure avec prise en compte de leur influence (directe et indirecte) sur les performances avant décision."
        + " | "
        + "M3 : méthode générique déployée.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong></td><td>"
        + "Les modifications sont <strong>gérées au fur et à mesure</strong>, avec une prise en compte de leur influence (directe et indirecte) sur les performances du projet ou de l'opération, <strong>avant décision</strong>.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "La prise en compte des modifications bénéficie d'une <strong>méthode générique déployée</strong> sur les opérations du demandeur.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2</strong> : Recueil des modifications ou comptes-rendus.<br><strong>M3</strong> : Document démontrant la systématisation de la prise en compte des modifications.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ════════════════ SMR 4 RESSOURCES ET MOYENS ════════════════
    QD['SMR4'] = {
      intro: "Ressources et moyens",
      context:
        "Allocation des ressources nécessaires (humaines, infrastructures, technologies, méthodes, outils numériques, ressources financières) pour assurer un fonctionnement efficace du SMR et l'amélioration des performances de l'ouvrage."
        + " | "
        + "Boîte à outils du SMR : compétences des intervenants, contrats, communication avec les parties intéressées, gestion des informations documentées."
    };

    // ─────────────────── SMR 4.1 Compétences ───────────────────
    QD['SMR4.1'] = {
      intro: "Compétences",
      context:
        "Compétences des intervenants en adéquation avec l'opération, son contexte et ses objectifs. Acquises par qualification, formation initiale/professionnelle, ou expérience."
        + " | "
        + "Évaluation périodique ou par phase, et actions de formation si nécessaire."
    };

    QD['SMR4.1.1'] = {
      intro: "Compétences en adéquation avec l'opération, son contexte et ses objectifs",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : le demandeur s'assure (sur critères préétablis) que toutes les personnes ou entités exécutant une tâche pour lui et ayant potentiellement une influence sur les objectifs des 4 engagements sont compétentes.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Selon le contexte de l'opération et les objectifs visés, le demandeur s'entoure des compétences <em>ad hoc</em>. Il s'assure, sur la base de <strong>critères préétablis</strong>, que toutes les personnes ou entités exécutant une tâche pour lui ou pour son compte, et ayant potentiellement une influence sur l'atteinte des objectifs de performance des 4 engagements, sont compétentes.<br>"
        + "Cette compétence peut être acquise par :"
        + "<ul>"
          + "<li>une qualification</li>"
          + "<li>une formation initiale et professionnelle appropriée</li>"
          + "<li>l'expérience</li>"
        + "</ul>"
        + "<em>Note : on pourra utilement s'appuyer sur les qualifications des intervenants comme Référent HQE certifié par Certivéa, OPQIBI, QUALIBAT, etc.</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td>Justification de la qualification des acteurs. Exemples non exhaustifs : CV ou attestation de compétences des intervenants selon les enjeux et objectifs.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.1.2'] = {
      intro: "Évaluation des intervenants sur l'opération, périodiquement ou à chaque phase, et actions de formation si nécessaire",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 : évaluation de la capacité des intervenants à réaliser leurs missions sur critères préétablis (incluant respect de l'environnement, qualité de vie, performance économique, pilotage maîtrisé). Enregistrement et actions éventuelles."
        + " | "
        + "M3 : synthèse des analyses pour améliorer la gestion des compétences à l'échelle du parc.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Le demandeur évalue ou fait évaluer la capacité des intervenants à réaliser les missions confiées, sur la base de <strong>critères préétablis</strong>.<br>"
        + "Pour les actions liées au SMR et aux performances du bâtiment, ces critères doivent comprendre la <strong>compétence et/ou l'expérience</strong> en matière de respect de l'environnement, qualité de vie, performance économique et pilotage maîtrisé (au sens des 4 engagements HQE).<br>"
        + "<em>Note : la compétence/expérience d'une opération HQE n'est pas un prérequis pour participer à une opération HQE. Il faut néanmoins évaluer les compétences environnementales/sociales/économiques (au sens du DD) pour prendre les mesures préventives nécessaires. Les critères doivent être cohérents avec la qualité souhaitée et les niveaux de performance visés.</em><br>"
        + "Le maître d'ouvrage conserve un <strong>enregistrement</strong> de cette évaluation et définit d'éventuelles actions découlant pour l'opération (en fonction de la complexité de la commande et des capacités des intervenants).<br>"
        + "S'il a déjà travaillé avec un intervenant, le demandeur peut utiliser les informations issues du bilan de l'opération concernée.<br>"
        + "<em>Exemples d'actions :</em>"
        + "<ul>"
          + "<li>prévoir une formation si les intervenants n'ont pas la compétence/expérience HQE</li>"
          + "<li>définir des modalités de surveillance des prestations</li>"
          + "<li>gérer des informations pour les prestataires, etc.</li>"
        + "</ul>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Une <strong>synthèse des analyses périodiques</strong> des intervenants est faite pour alimenter et améliorer la gestion des compétences globalement à l'échelle du parc du demandeur.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2</strong> : Évaluation des intervenants. Actions éventuelles de formation et leur résultat.<br><strong>M3</strong> : Document de synthèse.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ─────────────────── SMR 4.2 Passation et suivi des contrats - Politique d'achats ───────────────────
    QD['SMR4.2'] = {
      intro: "Passation et suivi des contrats — Politique d'achats",
      context:
        "Préparation des contrats reliés aux objectifs de DD à atteindre, suivi et évolution, recadrage en cas de retard ou dérive."
        + " | "
        + "Au niveau M3 : cohérence des contrats avec une politique d'achats responsables formalisée par l'organisme demandeur."
    };

    QD['SMR4.2.1'] = {
      intro: "Passation des contrats",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : contrats définissant missions/responsabilités/autorités, spécifications liées aux objectifs visés, modalités de surveillance/validation, exigences de compétence, documents pertinents. Conclus avant tout début d'exécution.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Le demandeur passe des contrats qui définissent :"
        + "<ul>"
          + "<li>le contenu détaillé des missions, responsabilités et autorités des intervenants retenus (en fonction des caractéristiques de l'ouvrage et de chaque phase)</li>"
          + "<li>les spécifications liées aux objectifs visés pour l'opération</li>"
          + "<li>les modalités de surveillance et de validation des missions</li>"
          + "<li>les éventuelles exigences pour la compétence du personnel</li>"
          + "<li>les documents de l'opération pertinents pour les missions des intervenants</li>"
        + "</ul>"
        + "Les contrats sont <strong>conclus avant tout début d'exécution</strong> des missions correspondantes.<br>"
        + "<em>En exploitation, axe Gestion : le demandeur doit obtenir les contrats. Pour les contrats hors de son scope, il s'assure auprès du donneur d'ordre qu'ils lui seront accessibles dans le cadre de la certification.</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases sauf Exploitation axe Gestion</strong></td><td>Contrats, avenants. Et/ou modes de preuves vus en « Planification » et « Compétences » (CR de revues de projet, documents de planification, etc.).</td><td>Sans objet</td></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Phase Exploitation axe Gestion</strong></td><td>Contrats, avenants. Accord écrit des donneurs d'ordre des prestations non incluses, autorisant l'accès au contenu des contrats. Et/ou modes de preuves vus en « Planification » et « Compétences ».</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.2.2'] = {
      intro: "Suivi des contrats au cours de leur réalisation, évolution et réactivité",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : contrats revus pour assurer leur cohérence avec les documents de l'opération et après chaque modification. Suivi régulier (qualité, coûts, délais), évolution selon évolutions techniques/organisationnelles. Réaction proportionnée aux manquements.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Les contrats liant le demandeur et les intervenants doivent être :"
        + "<ul>"
          + "<li><strong>revus</strong> pour assurer leur cohérence avec les documents de l'opération</li>"
          + "<li><strong>revus</strong> après chaque modification</li>"
        + "</ul>"
        + "Suivi régulier des contrats par le demandeur afin que les missions soient réalisées selon les <strong>critères de qualité, coûts et délais</strong> prévus. Le contenu peut évoluer selon les évolutions techniques ou organisationnelles du projet (clauses de flexibilité notamment pour les contrats de longue durée).<br>"
        + "Le demandeur réagit de façon <strong>appropriée et proportionnée</strong> si les termes du contrat ne sont pas respectés. Le contrat mentionne les mesures prises dans ce cas.<br>"
        + "Le suivi des contrats est <strong>documenté</strong>.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td>Documents permettant de justifier le suivi des contrats en cours : par exemple CR de réunion de revue des contrats, production d'avenants si les missions évoluent, courriers en cas de manquements demandant l'exécution des prestations conformément au contrat, etc.<br>En exploitation, tenue d'un registre d'interventions ou d'un cahier de maintenance.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.2.3'] = {
      intro: "Établissement des contrats en cohérence avec la politique d'achats responsables du demandeur",
      context:
        "M1 et M2 : non concernés."
        + " | "
        + "M3 : contrats établis en cohérence avec une politique d'achats responsables formalisée par l'organisme demandeur.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1 et M2</strong> : non concernés.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Les contrats sont établis en cohérence avec la <strong>politique d'achats responsables du demandeur</strong>. Cela suppose que l'organisme demandeur ait défini une telle politique.<br>"
        + "<em>Exemples donnés dans le guide « Achats responsables en immobilier — Le guide, OID — Juin 2019 ».</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td>Politique d'achats responsables. Contrats.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ─────────────────── SMR 4.3 Communication et implication des parties intéressées ───────────────────
    QD['SMR4.3'] = {
      intro: "Communication et implication des parties intéressées",
      context:
        "Actions d'information et de communication adaptées au projet, traitement des réclamations, consultation aux étapes-clés."
        + " | "
        + "Enquêtes de satisfaction (ponctuelle après livraison en construction, périodiques en exploitation)."
    };

    QD['SMR4.3.1'] = {
      intro: "Information et communication auprès des parties intéressées",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 : actions adaptées au projet (mails, documents, réunions, affichage, portail, reporting…). Enregistrement des demandes et réponses. En exploitation : information sur profils visés/obtenus, sensibilisation, recommandations, carnet de vie."
        + " | "
        + "M3 : méthode générique déployée.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Le demandeur définit les actions d'information et de communication envers les parties intéressées. Adaptées au projet (contexte, sensibilité, objectifs sociaux/environnementaux/économiques…).<br>"
        + "<em>Note : libre choix des actions de sensibilisation : diffusion de mails ou documents, réunions, affichage, portail Internet ou Intranet, outil de reporting, etc.</em><br>"
        + "Enregistrement des <strong>demandes des parties intéressées</strong> et des réponses apportées. Outils permettant de recevoir et répondre.<br>"
        + "<u>En exploitation :</u> les actions visent à fournir une information pertinente aux intervenants et sensibiliser les utilisateurs. Éléments à porter à connaissance :"
        + "<ul>"
          + "<li>profils obtenus en phases programme/conception/réalisation et carnet de vie (si accessibles)</li>"
          + "<li>profil visé</li>"
          + "<li>actions de sensibilisation sur le DD</li>"
        + "</ul>"
        + "<u>Pour l'axe Bâtiment</u> en complément :"
        + "<ul>"
          + "<li>carnet de vie de l'ouvrage</li>"
          + "<li>recommandations d'aménagement</li>"
          + "<li>annexe environnementale (Décret n° 2011-2058 du 30 décembre 2011)</li>"
        + "</ul>"
        + "<u>Pour l'axe Gestion</u> en complément :"
        + "<ul>"
          + "<li>notice « technique et services »</li>"
          + "<li>recommandations d'utilisation et d'exploitation privative</li>"
          + "<li>recommandations à destination du propriétaire</li>"
        + "</ul>"
        + "<em>Ces documents sont décrits plus en détail dans l'Annexe 2 « Les documents de l'opération ».</em><br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "L'information et la communication bénéficient d'une <strong>méthode générique déployée</strong> sur les opérations du demandeur.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme, Conception et Réalisation</strong></td><td><strong>M2</strong> : Documents d'information et de communication.<br><strong>M3</strong> : Documents élaborés via méthodologie déployée.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Bâtiment)</strong></td><td><strong>M2</strong> : Documents d'information/communication. Carnet de vie de l'ouvrage. Recommandations d'aménagement. Annexe environnementale.<br><strong>M3</strong> : Documents élaborés via méthodologie déployée.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phase Exploitation (axe Gestion)</strong></td><td><strong>M2</strong> : Documents d'information/communication. Notice « technique et services ». Recommandations d'utilisation et d'exploitation privative. Recommandations propriétaire.<br><strong>M3</strong> : Documents élaborés via méthodologie déployée.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.3.2'] = {
      intro: "Traitement des réclamations",
      context:
        "M1, M2 : enregistrement et traitement des réclamations à toutes les phases. Outils permettant la réception des demandes et les réponses. Parties intéressées réduites a minima aux utilisateurs et riverains en M1."
        + " | "
        + "M3 : méthode générique déployée.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1 et M2</strong></td><td>"
        + "Les <strong>réclamations</strong> des parties intéressées sont enregistrées et traitées, et ce à toutes les phases. Mise en œuvre d'outils permettant de recevoir les demandes et y apporter les réponses correspondantes.<br>"
        + "<em>Rappel : les parties intéressées sont réduites a minima aux utilisateurs et riverains en M1.</em><br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Le traitement bénéficie d'une <strong>méthode générique déployée</strong> sur les opérations du demandeur.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M1, M2</strong> : Document d'enregistrement et de traitement des réclamations.<br><strong>M3</strong> : Méthode générique de traitement des réclamations.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.3.3'] = {
      intro: "Consultation des parties intéressées",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 : consultation des parties intéressées (y compris intervenants) aux étapes-clés et prise en compte de leur avis."
        + " | "
        + "M3 : méthode générique déployée.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Les parties intéressées (y compris les intervenants) sont <strong>consultées aux étapes-clés</strong> de l'opération et leur avis est pris en compte au mieux.<br>"
        + "Selon les parties intéressées consultées (réduites ou élargies).<br>"
        + "Consultation a minima lors du recueil des besoins et attentes en début de projet, et via une <strong>enquête de satisfaction</strong> à la fin du processus.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "La consultation bénéficie d'une <strong>méthode générique déployée</strong>.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2</strong> : Supports de consultation. Comptes rendus.<br><strong>M3</strong> : Méthode générique de consultation.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.3.4'] = {
      intro: "Enquête de satisfaction ponctuelle",
      context:
        "Cas de non-applicabilité : non applicable en exploitation (axes Bâtiment et Gestion) ou si les preneurs des locaux ne sont pas connus (livraison en blanc)."
        + " | "
        + "M2 : enquête après livraison du bâtiment et installation des utilisateurs (phase Réalisation construction/rénovation)."
        + " | "
        + "M3 : méthode générique déployée.",
      non_applicabilite: "Non applicable pour les opérations en exploitation axe Bâtiment et Gestion. Peut également être déclarée comme non applicable si les preneurs des locaux ne sont pas connus (opérations livrées en blanc).",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Cette exigence est <strong>réservée à la phase de réalisation</strong> (construction neuve ou rénovation).<br>"
        + "Une <strong>enquête de satisfaction</strong> auprès des utilisateurs est réalisée après la livraison du bâtiment et l'installation des utilisateurs. Les thématiques abordées sont justifiées par rapport au contexte de l'opération.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Les enquêtes ponctuelles bénéficient d'une <strong>méthode générique déployée</strong>.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases sauf Exploitation axes Bâtiment et Gestion</strong></td><td><strong>M2</strong> : Formulaire d'enquête et résultats.<br><strong>M3</strong> : Formulaires et analyses des résultats construits de façon générique.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.3.5'] = {
      intro: "Enquêtes de satisfaction périodiques",
      context:
        "Cas de non-applicabilité : non applicable en construction neuve ou rénovation."
        + " | "
        + "M2 : enquêtes périodiques (a minima annuelles) en phase Exploitation, visant a minima les utilisateurs."
        + " | "
        + "M3 : méthode générique déployée.",
      non_applicabilite: "Non applicable pour les opérations en construction neuve ou rénovation.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Des <strong>enquêtes de satisfaction périodiques</strong> (a minima annuellement) sont réalisées auprès des parties intéressées.<br>"
        + "L'enquête vise a minima les <strong>utilisateurs</strong>. Les thématiques sont justifiées par rapport au contexte de l'opération. Elle peut viser également les <strong>visiteurs</strong> (si le bâtiment en accueille beaucoup, qu'il y ait des locaux ERP ou non).<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Les enquêtes périodiques bénéficient d'une <strong>méthode générique déployée</strong>.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Exploitation axes Bâtiment et Gestion</strong></td><td><strong>M2</strong> : Formulaire d'enquête et résultats.<br><strong>M3</strong> : Formulaires et analyses des résultats construits de façon générique.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ─────────────────── SMR 4.4 Informations documentées ───────────────────
    QD['SMR4.4'] = {
      intro: "Informations documentées",
      context:
        "Établissement et maîtrise des informations documentées tout au long de l'opération ou de l'exploitation."
        + " | "
        + "Aux niveaux M2/M3, utilisation d'outils collaboratifs (GED, BIM, GMAO) favorisant un travail intégré et interdisciplinaire."
    };

    QD['SMR4.4.1'] = {
      intro: "Établissement et maîtrise des informations documentées tout au long de l'opération ou de l'exploitation",
      context:
        "M1, M2, M3 : documents jugés nécessaires établis, identifiés, fiables, disponibles, approuvés, diffusés, mis à jour et conservés. Au M3 : système de gestion documentaire tient compte de retours d'expérience."
        + " | "
        + "Voir l'Annexe « Les documents de l'opération » pour la liste détaillée par niveau.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong></td><td>"
        + "Les documents jugés nécessaires <strong>au niveau M1</strong>* sont établis, identifiés, fiables, disponibles, approuvés, diffusés, mis à jour et conservés tout au long de l'opération (toutes phases) ou de l'exploitation.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "Les documents jugés nécessaires <strong>au niveau M2</strong>* sont établis, identifiés, fiables, disponibles, approuvés, diffusés, mis à jour et conservés tout au long de l'opération.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Le <strong>système de gestion documentaire</strong> tient compte de retours d'expérience formalisés sur les autres opérations du demandeur.<br><br>"
        + "<em>* Voir l'Annexe « Les documents de l'opération », récapitulant les documents « projet », « management », « exploitation » et éventuellement « preneurs » nécessaires.</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M1, M2, M3</strong> : Se référer à la liste des documents à produire (Annexe « Les documents de l'opération »).<br><em>Note : en phase Réalisation, vigilance quant à la passation documentaire entre Réalisation et Exploitation. Dès le M1, joindre au DOE les études suivantes en versions finales si réalisées : STD/SED, éclairage et autonomie lumineuse, ondes, acoustique, QAI, écologue, déchets, eau, coûts, note BH, CdC preneurs si présent.</em></td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR4.4.2'] = {
      intro: "Utilisation d'outils collaboratifs pour la gestion des informations et documents relatifs à l'opération",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : outils collaboratifs (GED, BIM, GMAO) favorisant un travail intégré et interdisciplinaire pour la gestion des informations/documents.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Des <strong>outils collaboratifs</strong> favorisant un travail intégré et interdisciplinaire sont utilisés pour la gestion des informations et/ou documents relatifs à l'opération.<br>"
        + "<em>Exemples : Plateforme informatique partagée (GED), BIM, GMAO.</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td><strong>M2, M3</strong> : Démonstration d'utilisation des outils.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ════════════════ SMR 5 ÉVALUATION ════════════════
    QD['SMR5'] = {
      intro: "Évaluation",
      context:
        "Évaluation du projet ou bâtiment par rapport aux objectifs de performance visés à différentes étapes-clés, à intervalles réguliers ou lors d'un changement impactant les performances."
        + " | "
        + "Approches possibles : estimation, calcul prévisionnel, simulation numérique, mesure sur site/laboratoire, enquête de satisfaction, recueil de réclamations, analyse de factures…"
        + " | "
        + "Résultats complets, fiables, reproductibles et traçables. Effectués dans la durée pour dégager tendances et améliorations."
    };

    QD['SMR5.1'] = {
      intro: "Évaluation",
      context:
        "Évaluation des performances de l'opération par rapport aux objectifs visés, aux étapes-clés (programme, conception, réalisation) ou périodiquement en exploitation. Documentation et conservation des résultats."
        + " | "
        + "Évaluation obligatoirement via la plateforme ISIA (exigences renseignées + justificatifs joints)."
    };

    QD['SMR5.1.1'] = {
      intro: "Évaluation des performances de l'opération par rapport aux objectifs visés",
      context:
        "Niveaux M1, M2, M3 — Évaluation aux étapes-clés (programme/conception/réalisation) ou périodiquement en exploitation (a minima 1er audit puis annuel). Documentée."
        + " | "
        + "Surveillance et mesure régulière des principales caractéristiques susceptibles d'impacter les performances. Évaluations également après changement d'un acteur impactant."
        + " | "
        + "En axe Gestion : rapport périodique d'exploitation avec maintenance, consommations, analyses, déchets.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1, M2, M3</strong><br>"
        + "Une <strong>évaluation des performances</strong> de l'opération, par rapport aux objectifs visés, est réalisée :"
        + "<ul>"
          + "<li>aux étapes-clés (programme, conception, réalisation)</li>"
          + "<li>ou périodiquement en phase d'exploitation (a minima lors du premier audit, puis chaque année)</li>"
        + "</ul>"
        + "À partir de l'entrée en certification, et <strong>documentée</strong>.<br>"
        + "Ces revues doivent permettre de surveiller et mesurer régulièrement les principales caractéristiques susceptibles d'impacter les performances visées. Inclure : documentation du suivi de la performance, contrôles opérationnels applicables aux principales caractéristiques et activités, conformité aux objectifs.<br>"
        + "Évaluations également <strong>après changement d'un acteur</strong> pouvant avoir un impact important sur les objectifs visés.<br>"
        + "Le demandeur conserve des <strong>enregistrements</strong> dans un document présentant les justifications de la satisfaction des exigences.<br>"
        + "<em>Note : ces enregistrements sont de fait réalisés par ISIA.</em><br><br>"
        + "<u>En exploitation, axe Gestion :</u><br>"
        + "Le demandeur définit (en accord avec les autres acteurs) la <strong>fréquence des rapports périodiques d'exploitation</strong>, ainsi que leurs modalités de diffusion, circulation et approbation.<br>"
        + "Le rapport périodique d'exploitation doit comporter :"
        + "<ul>"
          + "<li>synthèse des opérations de maintenance (préventif/curatif), avec si possible une synthèse de la maintenance préventive (détail par lot)</li>"
          + "<li>analyse de l'efficacité de la maintenance basée sur des indicateurs précis</li>"
          + "<li>liste des devis de travaux</li>"
          + "<li>relevé et analyse des consommations d'énergie et d'eau</li>"
          + "<li>résultats des procédures d'analyse et essais (qualité d'eau, groupe électrogène, etc.)</li>"
          + "<li>suivi des déchets</li>"
        + "</ul>"
        + "<em>Note : Dans le cadre d'une certification, l'évaluation concerne tous les thèmes inclus dans le référentiel ainsi que le SMR. L'évaluation se fait obligatoirement via la plateforme <strong>ISIA</strong> : les exigences applicables sont renseignées et les justificatifs demandés (cf. modes de preuve) sont joints en numérique.</em>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td>Outil d'évaluation <strong>ISIA</strong> renseigné, avec justificatifs.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // ════════════════ SMR 6 AMÉLIORATION ════════════════
    QD['SMR6'] = {
      intro: "Amélioration",
      context:
        "La connaissance des résultats d'évaluation est un préalable à toute démarche d'amélioration : actions correctives, amélioration continue, mise en œuvre d'innovations, leçons tirées sur un ensemble d'opérations."
        + " | "
        + "Le bilan des opérations managées est un processus de synthèse privilégié pour mettre en œuvre un SMR plus robuste et optimisé."
        + " | "
        + "Pour une application généralisée à un parc : capitalisation de l'expérience acquise sur les différents bâtiments pour accroître progressivement la pertinence et l'efficacité."
    };

    QD['SMR6.1'] = {
      intro: "Écarts et actions correctives",
      context:
        "Mise en œuvre d'actions correctives lorsqu'une performance attendue n'est pas atteinte ou que le SMR ne fonctionne pas comme prévu."
        + " | "
        + "Aux niveaux M2/M3 : procédure formalisée avec recueil des écarts, actions et résultats. Capitalisation à l'échelle du parc en M3."
    };

    QD['SMR6.1.1'] = {
      intro: "Mise en œuvre d'actions correctives en cas d'écarts",
      context:
        "M1 : actions correctives mises en œuvre en cas d'écart (sur performances ou SMR), sans procédure dédiée."
        + " | "
        + "M2 : procédure demandée avec recueil des écarts (mineurs/majeurs), actions et résultats. Modification possible des objectifs si correction non envisageable."
        + " | "
        + "M3 : procédure générique déployée sur les opérations + capitalisation des écarts à l'échelle du parc.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong><br>"
        + "Lorsqu'une performance attendue n'est pas atteinte, ou que le SMR ne fonctionne pas comme prévu, une <strong>action corrective</strong> est mise en œuvre afin de corriger, si possible, l'écart.<br>"
        + "Les écarts observés (sur performances du bâtiment ou fonctionnement du SMR) font l'objet d'actions correctives, sans qu'il soit nécessaire de mettre en place une procédure dédiée.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M2</strong><br>"
        + "<strong>Procédure demandée</strong>, avec recueil des écarts (mineurs ou majeurs), des actions correctives et des résultats.<br>"
        + "Lorsque le demandeur constate la non-atteinte des objectifs et qu'aucune correction n'est possible dans des conditions économiques et techniques acceptables, il peut envisager une modification de ceux-ci dans la mesure où cette modification demeure compatible avec les exigences du thème « Engagement ».<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong><br>"
        + "Les actions correctives bénéficient d'une <strong>procédure générique déployée</strong> sur les opérations du demandeur.<br>"
        + "Préciser comment les écarts relevés sur l'opération lors des audits ou revues périodiques sont <strong>capitalisés à l'échelle du parc</strong>, et comment l'expérience est utilisée pour s'améliorer à l'échelle du parc au travers d'actions correctives.",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases sauf Exploitation axe Gestion</strong></td><td><strong>M1</strong> : Démonstration des actions menées.<br><strong>M2</strong> : Procédure, recueil des non-conformités, actions correctives et résultats.<br><strong>M3</strong> : Procédure construite de façon générique et consolidation générale des écarts et actions.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Phase Exploitation axe Gestion</strong></td><td><strong>M1</strong> : Démonstration des actions menées.<br><strong>M2</strong> : Procédure, recueil des non-conformités, actions correctives, résultats. Rapports périodiques d'exploitation.<br><strong>M3</strong> : Procédure générique + consolidation des écarts/actions. Rapports périodiques d'exploitation construits de façon générique.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR6.2'] = {
      intro: "Bilan et capitalisation",
      context:
        "Bilan de l'opération aux niveaux M2/M3 (revue des phases ou des revues annuelles selon la phase), pour rendre compte de l'expérience, des points forts/faibles, des résultats vs. objectifs et tirer des leçons."
        + " | "
        + "Bilan périodique avec révision du SMR. En M3 : intégration au bilan global des opérations du demandeur (parc) pour amélioration continue."
    };

    QD['SMR6.2.1'] = {
      intro: "Bilan de l'opération",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : bilan rendant compte de l'expérience, des points forts/faibles, des résultats vs. objectifs initiaux, du déroulement du SMR. Phases Programme, Conception, Réalisation pour neuf/rénové ; revues annuelles pour exploitation.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong><br>"
        + "Un <strong>bilan de l'opération</strong> est réalisé pour rendre compte de l'expérience concrètement vécue sur le terrain, des points forts/faibles, des résultats obtenus par rapport aux objectifs de performance initiaux, du déroulement du SMR, et des leçons à en tirer pour progresser.<br>"
        + "Ce bilan passe en revue les phases <strong>Programme, Conception et Réalisation</strong> pour les bâtiments neufs et rénovés, et les <strong>différentes revues annuelles</strong> pour les bâtiments en exploitation (axes Bâtiment et/ou Gestion).<br><br>"
        + "<u>Précisions pour les bâtiments neufs et rénovés :</u><br>"
        + "Après la livraison, le maître d'ouvrage établit un bilan de l'opération à partir :"
        + "<ul>"
          + "<li>des éventuels écarts de performances, de coûts et de délais constatés</li>"
          + "<li>du nombre et de la nature des réserves</li>"
          + "<li>des éventuels dysfonctionnements observés au cours des phases programme/conception/réalisation</li>"
          + "<li>de l'appréciation de la conformité des prestations techniques et des travaux réalisés par les prestataires et les entreprises</li>"
          + "<li>du bilan éventuel des procédures de la maîtrise de l'impact du chantier sur la santé (cas d'un chantier sur site sensible — établissement de santé, site occupé)</li>"
          + "<li>si possible (optionnel) des retours de satisfaction (ou non) des clients et autres parties intéressées</li>"
        + "</ul>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme et Conception</strong></td><td>Non concernées.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phases Réalisation et Exploitation (axes Bâtiment et Gestion)</strong></td><td>Bilan de l'opération.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR6.2.2'] = {
      intro: "Bilan périodique de l'opération et révision",
      context:
        "M1 : non concerné."
        + " | "
        + "M2 et M3 : revue périodique du SMR (annuelle par ex.) pour vérifier sa pertinence/efficacité et réévaluer les objectifs. Décisions et actions documentées, inscrites dans un cycle reproductible.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M1</strong> : non concerné.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M2 et M3</strong></td><td>"
        + "Le demandeur passe en revue son SMR pour la <strong>période écoulée</strong> (année par exemple), afin de s'assurer qu'il est toujours pertinent et efficace, et réévalue éventuellement ses objectifs de performance (environnementaux, sociaux, économiques) pour le bâtiment.<br>"
        + "La <strong>révision</strong>, faisant état des points forts et faibles, débouche sur des décisions et actions concernant des modifications éventuelles d'objectifs et une évolution du SMR (voire un changement de niveau de maturité). Elle fait l'objet d'une <strong>information documentée</strong>.<br>"
        + "Le demandeur inscrit cette démarche dans un <strong>cycle reproductible</strong> pour son opération.<br><br>"
        + "<em>Précisions : pour alimenter cette révision, le demandeur s'appuie sur :</em>"
        + "<ul>"
          + "<li>résultats des audits et évaluations des performances</li>"
          + "<li>suivi de l'avancement du ou des plans d'actions</li>"
          + "<li>informations venant des parties intéressées liées à l'exploitation et l'utilisation</li>"
          + "<li>retours de satisfaction (ou non) des intervenants et acteurs de l'exploitation</li>"
          + "<li>état des actions correctives et préventives</li>"
          + "<li>suivi des actions décidées lors des révisions précédentes</li>"
          + "<li>recommandations pour l'amélioration</li>"
        + "</ul>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong>Phases Programme et Conception</strong></td><td>Non concernées.</td><td>Sans objet</td></tr>"
        + "<tr><td><strong>Phases Réalisation et Exploitation (axes Bâtiment et Gestion)</strong></td><td>Retours d'information sur la satisfaction des parties intéressées et des intervenants. Recommandations pour l'amélioration (s'il y en a). Document de révision.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    QD['SMR6.2.3'] = {
      intro: "Bilan de plusieurs opérations, capitalisation et amélioration",
      context:
        "M1 et M2 : non concernés."
        + " | "
        + "M3 : intégration du bilan formalisé de l'opération au bilan global du parc du demandeur. Capitalisation et amélioration continue à l'échelle du parc.",
      attendu:
        "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveaux M1 et M2</strong> : non concernés.<br><br>"
        + "<strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Niveau M3</strong></td><td>"
        + "Le bilan formalisé de l'opération est intégré au <strong>bilan global des opérations du demandeur à l'échelle de son parc</strong>. Cela lui permet de s'assurer que son SMR généralisé est efficace et approprié, ou dans le cas contraire de l'améliorer.<br>"
        + "Ce niveau est atteignable si le bilan de l'opération a fait l'objet d'un bilan formalisé faisant état de l'expérience concrètement vécue sur le terrain, et débouchant sur des améliorations à l'échelle du parc. Le bilan de l'opération concernée alimentera donc cette capitalisation, dans le cadre d'une <strong>démarche d'amélioration continue</strong>.<br><br>"
        + "<em>Précisions : dans ce bilan, le demandeur décrit en particulier :</em>"
        + "<ul>"
          + "<li>comment l'expérience de terrain (acquise sur l'opération ou sous-objets) est capitalisée pour accroître progressivement la pertinence et l'efficacité du SMR Généralisé</li>"
          + "<li>comment les écarts relevés lors des audits ou revues périodiques sont capitalisés sur l'ensemble du parc</li>"
          + "<li>comment cette expérience est utilisée pour s'améliorer au travers d'actions correctives</li>"
          + "<li>comment le management du bâtiment ou sous-objet, en plus des dispositions déployées uniformément, s'adapte au contexte local de chaque situation</li>"
        + "</ul>",
      preuve:
        "<table class=\"pp-tbl\">"
        + "<tr><th>Phases</th><th>Documents</th><th>Points vérifiés a minima</th></tr>"
        + "<tr><td><strong><span style='color:#0D9488;font-weight:bold;'>◆</span> Toutes phases</strong></td><td>Document de synthèse démontrant la systématisation de la prise en compte des retours d'expérience. Documents de planification.</td><td>Sans objet</td></tr>"
        + "</table>"
    };

    // Reformate les lignes du tableau HQE principal pour les thèmes SMR :
    // remplace Max / Cible / Score / Difficulté / Classe par
    // N exigences / Niveau visé / Niveau atteint / — / —
    var _smrRowRebuilding = false;
    function reformatSmrTableRows() {
      if (_smrRowRebuilding) return;
      var tGrid = document.getElementById('tGrid');
      if (!tGrid) return;

      var rows = tGrid.querySelectorAll('tr[id^="tcs-"], tr');
      // Find rows by tcs-SMRn id pattern
      tGrid.querySelectorAll('td.tc-pts[id^="tcs-SMR"]').forEach(function(scoreCell) {
        var code = scoreCell.id.replace('tcs-', '');
        if (!/^SMR[1-6]$/.test(code)) return;
        var tr = scoreCell.closest('tr');
        if (!tr || tr.dataset.smrReformatted === '1') return;

        var cells = tr.querySelectorAll('td');
        if (cells.length < 7) return; // safety

        // Cell layout (HQE):
        // 0: Code  1: Thème  2: Max  3: Détail  4: Cible  5: Score  6: Difficulté  7: Classe  8: Notes
        var cellMax = cells[2];
        var cellCible = cells[4];
        var cellScore = cells[5];
        var cellDiff = cells[6];
        var cellCl = cells[7];

        // Count exigences (l=2 items)
        var exCount = 0;
        try {
          var t = (typeof T !== 'undefined' ? T : []).find(function(x){ return x.code === code; });
          if (t && t.items) {
            exCount = t.items.filter(function(it){ return it.cat === 'HEADING' && it.l === 2; }).length;
          }
        } catch(e){}

        if (!projectData.credits) projectData.credits = {};
        if (!projectData.credits[code]) projectData.credits[code] = {};
        var cd = projectData.credits[code];
        var target = cd.maturityTarget || '';
        var achieved = cd.maturityAchieved || '';

        function colorAchieved() {
          if (!achieved) return 'background:#F1F5F9;color:#64748B;';
          if (!target) return 'background:#DCFCE7;color:#166534;';
          var rank = { 'M1':1,'M2':2,'M3':3 };
          if (rank[achieved] >= rank[target]) return 'background:#DCFCE7;color:#166534;';
          return 'background:#FFEDD5;color:#9A3412;';
        }

        _smrRowRebuilding = true;

        // Max → N exigences
        cellMax.innerHTML = '<span style="font-weight:600;color:#0D9488;">' + exCount + '</span>';
        cellMax.style.textAlign = 'center';

        // Cible → dropdown Niveau visé
        cellCible.innerHTML =
          '<select class="smr-row-target" data-code="' + code + '" style="border:1px solid #E2E8F0;border-radius:6px;padding:3px 6px;background:#fff;font-size:12px;cursor:pointer;outline:none;">' +
            '<option value=""' + (target===''?' selected':'') + '>—</option>' +
            '<option value="M1"' + (target==='M1'?' selected':'') + '>M1</option>' +
            '<option value="M2"' + (target==='M2'?' selected':'') + '>M2</option>' +
            '<option value="M3"' + (target==='M3'?' selected':'') + '>M3</option>' +
          '</select>';

        // Score → badge Niveau atteint avec dropdown
        cellScore.innerHTML =
          '<select class="smr-row-achieved" data-code="' + code + '" style="border:none;border-radius:12px;padding:3px 8px;font-size:11px;font-weight:700;cursor:pointer;outline:none;' + colorAchieved() + '">' +
            '<option value=""' + (achieved===''?' selected':'') + '>—</option>' +
            '<option value="M1"' + (achieved==='M1'?' selected':'') + '>M1</option>' +
            '<option value="M2"' + (achieved==='M2'?' selected':'') + '>M2</option>' +
            '<option value="M3"' + (achieved==='M3'?' selected':'') + '>M3</option>' +
          '</select>';

        // Difficulté → "—"
        cellDiff.innerHTML = '<span style="color:#94A3B8;font-size:13px;">—</span>';
        cellDiff.style.textAlign = 'center';

        // Classe → "—"
        cellCl.innerHTML = '<span style="color:#94A3B8;font-size:13px;">—</span>';
        cellCl.style.textAlign = 'center';

        // Wire selects
        var tSel = cellCible.querySelector('.smr-row-target');
        if (tSel) tSel.onchange = function() {
          cd.maturityTarget = this.value;
          if (typeof saveProjectData === 'function') saveProjectData();
          tr.dataset.smrReformatted = '0'; // allow re-render to update achieved color
          reformatSmrTableRows();
        };
        var aSel = cellScore.querySelector('.smr-row-achieved');
        if (aSel) aSel.onchange = function() {
          cd.maturityAchieved = this.value;
          if (typeof saveProjectData === 'function') saveProjectData();
          tr.dataset.smrReformatted = '0';
          reformatSmrTableRows();
        };

        tr.dataset.smrReformatted = '1';
        _smrRowRebuilding = false;
      });
    }
    var tGridEl = document.getElementById('tGrid');
    if (tGridEl && window.MutationObserver) {
      var tGridObs = new MutationObserver(function() { reformatSmrTableRows(); });
      tGridObs.observe(tGridEl, { childList: true, subtree: true });
    }
    // Initial run after a short delay to catch the first render
    setTimeout(reformatSmrTableRows, 200);

        // Remplace la barre stats du panneau détail (dpStats) pour les thèmes
    // SMR : pas de "0 pts max" — affiche "N exigences | Niveau visé | Niveau atteint"
    // Dropdowns sauvegardés dans projectData.credits[code].maturity*
    var _smrStatsRebuilding = false;
    function reformatSmrDpStats() {
      if (_smrStatsRebuilding) return;
      var stats = document.getElementById('dpStats');
      if (!stats) return;
      var code = window._dpCode;
      if (!code || !/^SMR[1-6]$/.test(code)) return;
      // Already rebuilt for this code?
      if (stats.dataset.smrCode === code && stats.querySelector('.smr-stat-target')) return;

      // Count exigences (l=2 items)
      var exCount = 0;
      try {
        var t = (typeof T !== 'undefined' ? T : []).find(function(x){ return x.code === code; });
        if (t && t.items) {
          exCount = t.items.filter(function(it){ return it.cat === 'HEADING' && it.l === 2; }).length;
        }
      } catch(e){}

      // Read saved values
      if (!projectData.credits) projectData.credits = {};
      if (!projectData.credits[code]) projectData.credits[code] = {};
      var cd = projectData.credits[code];
      var target = cd.maturityTarget || '';
      var achieved = cd.maturityAchieved || '';

      function colorAchieved() {
        if (!achieved) return 'background:#F1F5F9;color:#64748B;';
        if (!target) return 'background:#DCFCE7;color:#166534;';
        var rank = { 'M1':1,'M2':2,'M3':3 };
        if (rank[achieved] >= rank[target]) return 'background:#DCFCE7;color:#166534;';
        return 'background:#FFEDD5;color:#9A3412;';
      }

      _smrStatsRebuilding = true;

      // Preserve note bubble
      var noteBtn = stats.querySelector('.ext-note-btn');

      stats.innerHTML =
        '<span class="dp-stat">' + exCount + ' exigences</span>' +
        '<label class="dp-stat smr-stat-target" style="display:inline-flex;align-items:center;gap:5px;cursor:pointer;">' +
          'Niveau visé : ' +
          '<select id="smrTargetSel" style="border:none;background:transparent;color:inherit;font-weight:700;font-size:12px;cursor:pointer;outline:none;">' +
            '<option value=""' + (target===''?' selected':'') + '>—</option>' +
            '<option value="M1"' + (target==='M1'?' selected':'') + '>M1</option>' +
            '<option value="M2"' + (target==='M2'?' selected':'') + '>M2</option>' +
            '<option value="M3"' + (target==='M3'?' selected':'') + '>M3</option>' +
          '</select>' +
        '</label>' +
        '<label class="dp-stat smr-stat-achieved" style="display:inline-flex;align-items:center;gap:5px;cursor:pointer;' + colorAchieved() + '">' +
          'Niveau atteint : ' +
          '<select id="smrAchievedSel" style="border:none;background:transparent;color:inherit;font-weight:700;font-size:12px;cursor:pointer;outline:none;">' +
            '<option value=""' + (achieved===''?' selected':'') + '>—</option>' +
            '<option value="M1"' + (achieved==='M1'?' selected':'') + '>M1</option>' +
            '<option value="M2"' + (achieved==='M2'?' selected':'') + '>M2</option>' +
            '<option value="M3"' + (achieved==='M3'?' selected':'') + '>M3</option>' +
          '</select>' +
        '</label>';

      if (noteBtn) stats.appendChild(noteBtn);
      stats.dataset.smrCode = code;

      // Wire selects
      var tgtSel = document.getElementById('smrTargetSel');
      var achSel = document.getElementById('smrAchievedSel');
      if (tgtSel) tgtSel.onchange = function() {
        cd.maturityTarget = this.value;
        if (typeof saveProjectData === 'function') saveProjectData();
        reformatSmrDpStats(); // re-render to update color
      };
      if (achSel) achSel.onchange = function() {
        cd.maturityAchieved = this.value;
        if (typeof saveProjectData === 'function') saveProjectData();
        reformatSmrDpStats();
      };

      _smrStatsRebuilding = false;
    }
    var dpStatsEl = document.getElementById('dpStats');
    if (dpStatsEl && window.MutationObserver) {
      var dpObs = new MutationObserver(function() { reformatSmrDpStats(); });
      dpObs.observe(dpStatsEl, { childList: true });
    }

        // Reformater le sommaire (TOC) du Guide pour les SMR : niveaux hiérarchiques
    function reformatSmrToc() {
      var toc = document.getElementById('gpToc');
      if (!toc) return;
      toc.querySelectorAll('.gp-toc-item').forEach(function(a) {
        var oc = a.getAttribute('onclick') || '';
        var m = oc.match(/gq-(SMR\d+(?:\.\d+){0,2})/);
        if (!m) return;
        var code = m[1];
        var dots = (code.match(/\./g) || []).length;
        a.classList.remove('toc-smr-l0','toc-smr-l1','toc-smr-l2');
        if (dots === 0) a.classList.add('toc-smr-l0');
        else if (dots === 1) a.classList.add('toc-smr-l1');
        else if (dots === 2) a.classList.add('toc-smr-l2');
      });
    }
    var tocEl = document.getElementById('gpToc');
    if (tocEl && window.MutationObserver) {
      var tocObs = new MutationObserver(function() { reformatSmrToc(); });
      tocObs.observe(tocEl, { childList: true, subtree: true });
    }

    try { console.log('[SMR1 QD]', 'injected:', Object.keys(QD).filter(function(k){return k==='SMR1' || k.indexOf('SMR1.') === 0;})); } catch(e){}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
