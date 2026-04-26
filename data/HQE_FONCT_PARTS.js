// ============================================================
// HQE BD V4.1 — Fonctionnement (page d'information sur le référentiel)
// 11 onglets / 37 fiches — synthèses + tableaux factuels in extenso + références au PDF source
// Source : Référentiels HQE Bâtiment Durable V4.1 et HQE Bâtiment V1.1 — Informations générales
//          (CERTIVEA, septembre 2024, 62 pages)
// ============================================================
var HQE_FONCT_PARTS = [

  // ─────────────────────────────────────────────────────────────
  // ONGLET 1 — PRÉAMBULE
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Préambule",
    title: "Préambule du référentiel HQE BD V4.1 / HQE B V1.1",
    subtitle: "Page de garde, modifications de versions, table des matières et remerciements",
    sourceRef: "p. 1-5",
    groups: [
      {
        name: "Présentation",
        items: [
          {
            title: "Présentation du référentiel",
            content: "<p>Le présent document est le <strong>guide technique « Informations générales »</strong> applicable aux référentiels <strong>HQE Bâtiment Durable V4.1</strong> et <strong>HQE Bâtiment V1.1</strong>, publiés par <strong>CERTIVEA</strong> en septembre 2024.</p><p>Il regroupe les règles transversales d'application des deux référentiels (champ d'application, méthode d'évaluation, cas particuliers) et complète les guides techniques propres à chaque thème.</p><p><em>Référence source : Référentiels HQE-B v1.1 et HQE-BD v4.1 – certifié par CERTIVEA – Septembre 2024.</em></p>"
          },
          {
            title: "Modifications versions mineures HQE-BD v4.1 / HQE-B v1.1",
            content: "<p>Le passage des versions HQE-BD v4 / HQE-B v1 vers les versions mineures <strong>v4.1 / v1.1</strong> apporte les évolutions ci-dessous, sans incidence sur les modes de preuve sauf mention contraire.</p>" +
              "<table class=\"fonct-table\"><thead><tr><th>Sujet</th><th>Type d'évolution</th><th>Modification apportée</th><th>Incidence sur les modes de preuve</th></tr></thead><tbody>" +
              "<tr><td>Champ d'application</td><td>Précisions</td><td>Champ géographique « monde », précisions sur les DOM-COM et les climats chaud / chaud-humide</td><td>Aucune</td></tr>" +
              "<tr><td>Méthode d'évaluation des engagements techniques</td><td>Évolution + clarifications</td><td>Passage du niveau minimum pour être certifié en exploitation au niveau F, sauf pour les thèmes Énergie, Carbone et Gestion Durable qui restent en E</td><td>Aucune</td></tr>" +
              "<tr><td>Cas particulier des thèmes utilisant des Blocs Homogènes (BH)</td><td>Précisions</td><td>Critères techniques de mise en place des BH, cas avec Cahier des Charges preneurs</td><td>Aucune</td></tr>" +
              "<tr><td>Non-applicabilité des exigences</td><td>Clarifications</td><td>Distinction entre « EST non applicable » et « PEUT ÊTRE déclaré non applicable »</td><td>Aucune</td></tr>" +
              "<tr><td>Justification d'exigences par études ou mesures en exploitation (axes Bâtiment et Gestion)</td><td>Création</td><td>Les études (non obligatoires) peuvent être réalisées sur le cycle de 5 ans de certification, et non plus dès la première année</td><td>Aucune</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source : tableau récapitulatif p. 1, partie « Modifications des versions mineures HQE-BD v4.1 et HQE-B v1.1 ».</em></p>"
          },
          {
            title: "Remerciements",
            content: "<p>Le référentiel a bénéficié du regard et de l'expertise de nombreux intervenants. CERTIVEA remercie&nbsp;:</p><ul><li>Les membres de l'<strong>Alliance HQE-GBC</strong></li><li>Les scientifiques du <strong>CSTB</strong></li><li>Les membres du <strong>Groupe Technique</strong> et des <strong>groupes de travail thématiques</strong></li><li>Les membres du <strong>Comité des parties intéressées Bâtiment</strong></li><li>Les acteurs des opérations certifiées qui ont permis de faire aboutir ce projet</li></ul><p><em>Source p. 5.</em></p>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 2 — CHAMP D'APPLICATION
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Champ d'application",
    title: "Champ d'application des référentiels HQE BD V4.1 / HQE B V1.1",
    subtitle: "Types d'opération, couverture géographique, secteurs d'activité et périmètre spatial",
    sourceRef: "p. 6-13",
    groups: [
      {
        name: "Types d'opération et géographie",
        items: [
          {
            title: "Types d'opération",
            content: "<p>Les deux référentiels HQE Bâtiment Durable et HQE Bâtiment s'appliquent à quatre types d'opérations&nbsp;:</p><ul><li><strong>Construction</strong> — bâtiments neufs</li><li><strong>Rénovation</strong> — bâtiments rénovés</li><li><strong>Exploitation axe Bâtiment</strong> — bâtiments existants : évaluation du bâti</li><li><strong>Exploitation axe Gestion</strong> — bâtiments existants : évaluation des actions de gestion et d'exploitation</li></ul><p>Pour les bâtiments existants, la phase opérationnelle concernée est la <strong>phase d'exploitation</strong>.</p><p><em>Source p. 6.</em></p>"
          },
          {
            title: "Champ d'application géographique",
            content: "<p>Le champ d'application géographique est détaillé dans les <em>Règles de certification</em>. Il <strong>couvre le monde entier</strong>.</p><p>Le référentiel intègre des spécificités d'évaluation pour les <strong>DOM-COM</strong> (La Réunion, Mayotte, la Martinique, la Guadeloupe, Saint-Barthélemy, Saint-Martin, la Guyane, la Nouvelle-Calédonie, la Polynésie française, Wallis-et-Futuna) et plus largement pour les <strong>climats chaud et chaud-humide</strong>.</p><p><em>Source p. 6.</em></p>"
          },
          {
            title: "DOM-COM et climats chaud / chaud-humide — exigences spécifiques",
            content: "<p>Le tableau suivant liste les exigences comportant des critères spécifiques aux climats chaud et chaud-humide (codes d'exigences tels qu'ils figurent dans le référentiel).</p>" +
              "<table class=\"fonct-table\"><thead><tr><th>Thème</th><th>Exigences avec critères spécifiques climats chaud / chaud-humide</th></tr></thead><tbody>" +
              "<tr><td>Qualité de l'air intérieur (QAI)</td><td>QAIR1.2.1 Performance en qualité de l'air intérieur</td></tr>" +
              "<tr><td>Qualité de l'eau</td><td>QEAU2.1.1 Mise en œuvre d'un(des) réseau(x) d'ECS / QEAU2.1.2 Température 55 °C en tout point / QEAU2.1.3 Calorifugeage ECS / QEAU2.1.4 Calorifugeage séparé ECS / EFS</td></tr>" +
              "<tr><td>Confort hygrothermique</td><td>HYGR1.1.2 (BH ≥ 80 % surface) / HYGR1.1.4-REU dispositions architecturales adaptées / HYGR2-REU spécifique chaud-humide + Annexes 1 et 2 (Tableau vitesses d'air et critères STD pour plage de confort)</td></tr>" +
              "<tr><td>Confort acoustique</td><td>ACOU1.1.4-REU (environnement sonore) / ACOU2.1.3 Bruit de choc L'nT,w</td></tr>" +
              "<tr><td>Confort visuel</td><td>VISU2.1.1 Autonomie lumineuse / VISU2.1.4 Éblouissement d'inconfort</td></tr>" +
              "<tr><td>Transports</td><td>TRAN1.2.3 Vestiaires / douches cyclistes / TRAN1.3.1 Stationnement véhicules propres / TRAN2.1.1 Lignes accessibles / TRAN2.1.4 Parking relais / gare TER 20 min / TRAN2.3.1 Temps d'accès gare TGV ou aéroport</td></tr>" +
              "<tr><td>Services</td><td>SERV1.1.1 Services à proximité</td></tr>" +
              "<tr><td>Eau</td><td>EAU2.1.1 Régulation hydraulique / EAU2.1.2 Taux d'absorption de la parcelle</td></tr>" +
              "<tr><td>Déchets</td><td>DECH1.1.1 Zones de stockage ventilées / DECH3.1.2 Valorisation matière déchets de chantier / DECH3.1.3 Réemploi terre sur site / DECH3.1.4 Réutilisation terre hors site</td></tr>" +
              "<tr><td>Carbone</td><td>CARB1.1.1 Émissions CO₂ phase utilisation (kgCO₂eq/m²SDP·an)</td></tr>" +
              "<tr><td>Biodiversité</td><td>BIOD1.2.3 Strates végétales / BIOD1.2.4 Végétalisation locale / BIOD1.2.5 Choix d'espèces (impact sanitaire)</td></tr>" +
              "<tr><td>Économie locale</td><td>DEVT1.3.2 Montée en compétence locale / DEVT2.1.1 Composants assemblés localement / DEVT2.3.1 Filières locales / DEVT2.3.2 Composants issus filière locale / DEVT2.4.1 Prestataires locaux</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source p. 6-7.</em></p>"
          },
          {
            title: "Application à l'international",
            content: "<p>Pour les opérations situées <strong>en dehors du territoire français</strong>, les deux référentiels sont applicables sur le même domaine et les mêmes types d'opération.</p><p>Les exigences ont été rédigées pour pouvoir s'appliquer également à l'international, soit en s'appuyant sur des références <strong>européennes ou ISO</strong> (directives, normes, cadre Levels), soit en indiquant directement dans le texte les éléments à respecter.</p><p><strong>Règles de substitution&nbsp;:</strong></p><ul><li>Si une exigence mentionne <strong>à la fois</strong> des références françaises ET des références européennes ou internationales, ce sont <strong>les références européennes ou internationales qui s'appliquent</strong>.</li><li>Si une exigence mentionne <strong>uniquement</strong> des références françaises ET qu'il existe des références locales équivalentes, ce sont <strong>les références locales</strong> qui s'appliquent en substitution.</li></ul><p><em>Source p. 8.</em></p>"
          }
        ]
      },
      {
        name: "Secteurs, activités et périmètre",
        items: [
          {
            title: "Champs d'application par secteurs et activités",
            content: "<p>Le référentiel s'applique à un large éventail de secteurs et d'activités. Le tableau d'application détaillé en page 9 du référentiel précise pour chaque secteur (résidentiel, tertiaire, enseignement, santé, hôtellerie, sport, commerce, industrie, etc.) les activités couvertes.</p><div class=\"fonct-source-todo\"><em>Réf. PDF p. 9-10 — Tableau d'application par secteurs et activités à intégrer en verbatim depuis le PDF source.</em></div>"
          },
          {
            title: "Périmètre spatial des demandes de certification",
            content: "<p>Le demandeur peut adresser une demande de certification pour&nbsp;:</p><ul><li>Une ou plusieurs <strong>opérations</strong></li><li>Pour chaque opération&nbsp;: <strong>1 ou plusieurs objets</strong></li><li>Pour chaque objet&nbsp;: sur la totalité ou sur <strong>1 ou plusieurs sous-objets</strong></li></ul><p>Un <strong>objet</strong> correspond à un bâtiment. Un <strong>sous-objet</strong> correspond à une partie de bâtiment caractérisée par un secteur et une activité (cf. glossaire). Le secteur choisi pour la demande figurera sur le certificat.</p>" +
              "<p><strong>Important — multi-activités sans multi-sous-objets&nbsp;:</strong> dans la version actuelle des référentiels (HQE-BD et HQE-B), il n'est <strong>pas obligatoire</strong> de déclarer plusieurs sous-objets, même si plusieurs activités sont présentes dans l'opération.</p>" +
              "<p>Exemple&nbsp;: un bâtiment de bureau comportant aussi des commerces, un RIE et une crèche peut être déclaré en <strong>un seul objet et sous-objet « bâtiment de bureau X »</strong> (le secteur « bureau » figure sur le certificat). Les espaces sont alors évalués comme suit&nbsp;:</p><ul><li><strong>Thèmes utilisant des Blocs Homogènes</strong> (confort visuel, confort acoustique, confort hygrothermique, QAI)&nbsp;: un BH par type d'espace nécessaire (bureaux, vente, RIE, crèche…).</li><li><strong>Thèmes de consommations</strong> (énergie, eau, carbone, déchets…)&nbsp;: en déclarant l'ensemble des consommations / émissions / quantités, et en ajustant les classes d'évaluation selon les activités. Les méthodes d'ajustement sont données dans les guides et fichiers Excel de calcul.</li><li><strong>Thèmes évalués de façon générale</strong> (transports, chantier, adaptation au changement climatique, biodiversité…)&nbsp;: en tenant compte de la totalité de l'opération.</li></ul><p>Cela évite de multiplier les évaluations en cas de multi-activités. Le demandeur conserve toutefois la possibilité de déclarer le nombre de sous-objets qu'il souhaite.</p><p><em>Source p. 11.</em></p>"
          },
          {
            title: "Tableau des usagers par typologie de bâtiment",
            content: "<p>Selon la typologie du bâtiment évalué, des usagers spécifiques doivent être pris en compte dans l'évaluation des thèmes. Le tableau pages 12-13 du référentiel récapitule, pour chaque typologie (résidentiel, bureaux, enseignement, santé, etc.), les <strong>catégories d'usagers</strong> à intégrer.</p><div class=\"fonct-source-todo\"><em>Réf. PDF p. 12-13 — Tableau exhaustif des usagers par typologie à intégrer en verbatim depuis le PDF si nécessaire.</em></div>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 3 — CADRE DE RÉFÉRENCE ALLIANCE HQE-GBC
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Cadre HQE-GBC",
    title: "Le cadre de référence de l'Alliance HQE-GBC",
    subtitle: "Cadre de référence des offres HQE Bâtiment Durable et HQE Bâtiment",
    sourceRef: "p. 14",
    groups: [
      {
        name: "Cadre de référence",
        items: [
          {
            title: "L'offre HQE Bâtiment Durable et HQE Bâtiment",
            content: "<p>Les deux offres <strong>HQE Bâtiment Durable</strong> et <strong>HQE Bâtiment</strong> s'inscrivent dans le <strong>cadre de référence de l'Alliance HQE-GBC (AHQE-GBC)</strong>, qui structure la démarche autour de quatre engagements&nbsp;:</p><ol><li><strong>Qualité de vie (QDV)</strong></li><li><strong>Respect de l'environnement (ENV)</strong></li><li><strong>Performance économique (ECO)</strong></li><li><strong>Management responsable (SMR)</strong></li></ol><p>Chaque engagement est décliné en <strong>objectifs</strong>, eux-mêmes structurés en <strong>thèmes</strong>, <strong>sous-thèmes</strong>, <strong>blocs d'exigences</strong> (éventuel) et <strong>exigences</strong>.</p><p><em>Source p. 14.</em></p>"
          },
          {
            title: "Tableau comparatif des thèmes inclus dans HQE BD V4 et HQE B V1",
            content: "<p>Tableau comparatif <strong>in extenso</strong> des thèmes inclus dans les deux offres, structuré par engagement et objectif (cadre de référence Alliance HQE-GBC).</p>" +
              "<table class=\"fonct-table\"><thead><tr><th>Engagement</th><th>Objectif</th><th>Thème</th><th>HQE Bâtiment V1</th><th>HQE Bâtiment Durable V4</th></tr></thead><tbody>" +
              "<tr><td rowspan=\"9\">QUALITÉ DE VIE</td><td rowspan=\"3\">Des lieux de vie plus sûrs et qui favorisent la santé</td><td>Qualité de l'air intérieur</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Qualité de l'eau</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Ondes électromagnétiques</td><td>X</td><td>X</td></tr>" +
              "<tr><td rowspan=\"4\">Des espaces agréables à vivre, pratiques et confortables</td><td>Confort hygrothermique</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Confort acoustique</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Confort visuel</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Accessibilité</td><td>—</td><td>X</td></tr>" +
              "<tr><td rowspan=\"2\">Des services qui facilitent le bien-vivre ensemble</td><td>Transports</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Services</td><td>—</td><td>X</td></tr>" +
              "<tr><td rowspan=\"7\">RESPECT DE L'ENVIRONNEMENT</td><td>Une utilisation raisonnée des énergies et des ressources naturelles</td><td>Énergie</td><td>X</td><td>X</td></tr>" +
              "<tr><td></td><td>Eau</td><td>X</td><td>X</td></tr>" +
              "<tr><td rowspan=\"4\">Une limitation des pollutions et la lutte contre le changement climatique</td><td>Déchets</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Carbone</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Adaptation au changement climatique</td><td>X</td><td>X</td></tr>" +
              "<tr><td>ACV</td><td>—</td><td>X</td></tr>" +
              "<tr><td>Une prise en compte de la nature et de la biodiversité</td><td>Biodiversité</td><td>—</td><td>X</td></tr>" +
              "<tr><td rowspan=\"3\">PERFORMANCE ÉCONOMIQUE</td><td>Une optimisation des charges et des coûts</td><td>Maîtrise des coûts</td><td>—</td><td>X</td></tr>" +
              "<tr><td>Une amélioration de la valeur patrimoniale, financière et d'usage</td><td>(à définir)</td><td>—</td><td>X</td></tr>" +
              "<tr><td>Une contribution au dynamisme et au développement des territoires</td><td>Économie locale</td><td>—</td><td>X</td></tr>" +
              "<tr><td rowspan=\"10\">MANAGEMENT RESPONSABLE</td><td rowspan=\"4\">Une organisation adaptée aux objectifs de qualité, de performance et de dialogue</td><td>Contexte</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Engagement</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Planification</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Ressources et moyens</td><td>X</td><td>X</td></tr>" +
              "<tr><td rowspan=\"4\">Un pilotage pour un projet maîtrisé</td><td>Réalisation des activités opé. : Adaptabilité</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Réalisation des activités opé. : Chantier</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Réalisation des activités opé. : Commissionnement</td><td>—</td><td>X</td></tr>" +
              "<tr><td>Réalisation des activités opé. : Gestion Durable</td><td>X</td><td>X</td></tr>" +
              "<tr><td rowspan=\"2\">Une évaluation garante de l'amélioration continue</td><td>Évaluation</td><td>X</td><td>X</td></tr>" +
              "<tr><td>Amélioration</td><td>X</td><td>X</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source p. 14 — tableau comparatif des thèmes des deux offres, structuré par engagement / objectif / thème.</em></p>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 4 — MÉTHODE D'ÉVALUATION DES ENGAGEMENTS TECHNIQUES
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Méthode d'évaluation",
    title: "Méthode d'évaluation des engagements techniques",
    subtitle: "Pondérations Pond.E / Pond.T et seuils minimaux par thème pour HQE BD et HQE B",
    sourceRef: "p. 15-22",
    groups: [
      {
        name: "Système de notation et classes de performance",
        items: [
          {
            title: "Engagements et système de notation unique",
            content: "<p>Le référentiel <strong>HQE Bâtiment Durable</strong> comporte <strong>4 engagements</strong>&nbsp;:</p><ul><li>Management responsable (SMR)</li><li>Qualité de vie</li><li>Respect de l'environnement</li><li>Performance économique</li></ul>" +
              "<p>Le référentiel <strong>HQE Bâtiment</strong> en comporte <strong>3</strong> (Management responsable, Qualité de vie, Respect de l'environnement) — l'engagement « Performance économique » et certains thèmes de QDV/ENV ne sont pas couverts (cf. tableau comparatif onglet précédent).</p>" +
              "<p>La méthode d'évaluation présentée ici concerne les <strong>engagements d'exigences techniques</strong>. Des exigences techniques sont également présentes dans la partie « Pilotage maîtrisé » du SMR et participent à la note globale. L'engagement « Management responsable » s'évalue lui par <strong>niveaux de maturité</strong> et fait l'objet d'un guide spécifique.</p>" +
              "<p><strong>Système de notation unique</strong> pour tous les thèmes&nbsp;:</p><ul><li><strong>Exigence à niveau unique</strong>&nbsp;: x point</li><li><strong>Exigence à plusieurs niveaux</strong>&nbsp;: x point / x+y points / x+y+z points</li><li><strong>Valeur directe</strong>&nbsp;: x kWh/m² (uniquement pour le benchmark)</li></ul>" +
              "<p>Le calcul s'appuie sur un <strong>pourcentage des points obtenus sur les points disponibles</strong>, en tenant compte des éventuelles non-applicabilités.</p>" +
              "<p><em>Source p. 15 (HQE BD) / p. 19 (HQE B).</em></p>"
          },
          {
            title: "Tableau des classes — valeurs limites par % de points",
            content: "<p>Tableau des classes de performance (commun HQE BD / HQE B), exprimé en pourcentage de points obtenus sur les points disponibles&nbsp;:</p>" +
              "<table class=\"fonct-table\"><thead><tr><th>Classe</th><th>Valeurs limites (% de points)</th></tr></thead><tbody>" +
              "<tr><td><strong>A</strong></td><td>≥ 85 %</td></tr>" +
              "<tr><td><strong>B</strong></td><td>≥ 70 %</td></tr>" +
              "<tr><td><strong>C</strong></td><td>≥ 50 %</td></tr>" +
              "<tr><td><strong>D</strong></td><td>≥ 25 %</td></tr>" +
              "<tr><td><strong>E</strong></td><td>≥ 10 %</td></tr>" +
              "<tr><td><strong>F</strong></td><td>&lt; 10 %</td></tr>" +
              "</tbody></table>" +
              "<p><strong>Notation globale — pondération.</strong> La logique d'agrégation suit le même principe que pour les thèmes&nbsp;: les points obtenus sont sommés à l'échelle de chaque engagement, puis on calcule le pourcentage par rapport aux points disponibles. Une <strong>pondération est appliquée au niveau de l'agrégation des points de chaque engagement</strong>, selon le type d'opération (construction neuve, rénovation, exploitation axe Bâtiment ou axe Gestion). Le pourcentage de points pondéré donne directement le nombre d'étoiles sur chaque engagement et le niveau global.</p>" +
              "<h4 style=\"margin-top:14px;font-size:13px;color:#1E293B;font-weight:700;\">Étoiles attribuées par engagement (% de points pondéré)</h4>" +
              "<table class=\"fonct-table\"><thead><tr><th>Seuil de % de points pondéré</th><th>Étoiles attribuées</th></tr></thead><tbody>" +
              "<tr><td>≥ 85 %</td><td>★★★★ (4 étoiles)</td></tr>" +
              "<tr><td>≥ 70 %</td><td>★★★ (3 étoiles)</td></tr>" +
              "<tr><td>≥ 50 %</td><td>★★ (2 étoiles)</td></tr>" +
              "<tr><td>≥ 40 %</td><td>★ (1 étoile)</td></tr>" +
              "<tr><td>&lt; 40 %</td><td>—</td></tr>" +
              "</tbody></table>" +
              "<h4 style=\"margin-top:14px;font-size:13px;color:#1E293B;font-weight:700;\">Niveaux de certification globaux (pyramide HQE)</h4>" +
              "<table class=\"fonct-table\"><thead><tr><th>Seuil global pondéré</th><th>Niveau de certification</th></tr></thead><tbody>" +
              "<tr><td>≥ 85 %</td><td><strong>EXCEPTIONNEL</strong></td></tr>" +
              "<tr><td>≥ 70 %</td><td><strong>EXCELLENT</strong></td></tr>" +
              "<tr><td>≥ 50 %</td><td><strong>TRÈS PERFORMANT</strong></td></tr>" +
              "<tr><td>≥ 40 %</td><td><strong>PERFORMANT</strong></td></tr>" +
              "<tr><td>&lt; 40 %</td><td>Insuffisant — non certifiable</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source p. 16 (HQE BD) — Étoiles par engagement et pyramide des niveaux de certification.</em></p>"
          }
        ]
      },
      {
        name: "Certification HQE Bâtiment Durable — pondérations & seuils",
        items: [
          {
            title: "HQE BD V4 — Coefficients de pondération par thème (Pond.E + Pond.T)",
            content: "<p>Tableau <strong>in extenso</strong> des coefficients de pondération HQE BD V4 par thème, selon la typologie d'opération (Construction / Rénovation / Exploitation axe Bâtiment / Exploitation axe Gestion). Pour chaque cellule&nbsp;:</p><ul><li><strong>Pond. E</strong> = Pondération de l'Engagement</li><li><strong>Pond. T</strong> = Pondération du Thème</li></ul>" +
              "<table class=\"fonct-table\"><thead>" +
              "<tr><th rowspan=\"2\">Engagement</th><th rowspan=\"2\">Thème</th><th colspan=\"2\">Construction</th><th colspan=\"2\">Rénovation</th><th colspan=\"2\">Exploit. axe Bâtiment</th><th colspan=\"2\">Exploit. axe Gestion</th></tr>" +
              "<tr><th>Pond. E</th><th>Pond. T</th><th>Pond. E</th><th>Pond. T</th><th>Pond. E</th><th>Pond. T</th><th>Pond. E</th><th>Pond. T</th></tr>" +
              "</thead><tbody>" +
              "<tr><td rowspan=\"9\">Qualité de vie</td><td>Qualité de l'air intérieur</td><td rowspan=\"9\">40,00 %</td><td>4,44 %</td><td rowspan=\"9\">40,00 %</td><td>4,44 %</td><td rowspan=\"9\">40,00 %</td><td>4,44 %</td><td rowspan=\"9\">20,00 %</td><td>2,50 %</td></tr>" +
              "<tr><td>Qualité de l'eau</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>2,50 %</td></tr>" +
              "<tr><td>Ondes électromagnétiques</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>2,50 %</td></tr>" +
              "<tr><td>Confort hygrothermique</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>2,50 %</td></tr>" +
              "<tr><td>Confort acoustique</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>2,50 %</td></tr>" +
              "<tr><td>Confort visuel</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>2,50 %</td></tr>" +
              "<tr><td>Accessibilité</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>—</td></tr>" +
              "<tr><td>Transports</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>2,50 %</td></tr>" +
              "<tr><td>Services</td><td>4,44 %</td><td>4,44 %</td><td>4,44 %</td><td>2,50 %</td></tr>" +
              "<tr><td rowspan=\"7\">Respect de l'environnement</td><td>Énergie</td><td rowspan=\"7\">40,00 %</td><td>5,71 %</td><td rowspan=\"7\">40,00 %</td><td>5,71 %</td><td rowspan=\"7\">40,00 %</td><td>6,67 %</td><td rowspan=\"7\">20,00 %</td><td>5,00 %</td></tr>" +
              "<tr><td>Eau</td><td>5,71 %</td><td>5,71 %</td><td>6,67 %</td><td>5,00 %</td></tr>" +
              "<tr><td>Déchets</td><td>5,71 %</td><td>5,71 %</td><td>6,67 %</td><td>5,00 %</td></tr>" +
              "<tr><td>Carbone</td><td>5,71 %</td><td>5,71 %</td><td>6,67 %</td><td>5,00 %</td></tr>" +
              "<tr><td>Adaptation au changement climatique</td><td>5,71 %</td><td>5,71 %</td><td>6,67 %</td><td>—</td></tr>" +
              "<tr><td>ACV</td><td>5,71 %</td><td>5,71 %</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Biodiversité</td><td>5,71 %</td><td>5,71 %</td><td>6,67 %</td><td>—</td></tr>" +
              "<tr><td rowspan=\"3\">Performance économique</td><td>Maîtrise des coûts</td><td rowspan=\"3\">10,00 %</td><td>5,00 %</td><td rowspan=\"3\">10,00 %</td><td>5,00 %</td><td rowspan=\"3\">10,00 %</td><td>5,00 %</td><td rowspan=\"3\">10,00 %</td><td>5,00 %</td></tr>" +
              "<tr><td>(à définir)</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Économie locale</td><td>5,00 %</td><td>5,00 %</td><td>5,00 %</td><td>5,00 %</td></tr>" +
              "<tr><td rowspan=\"7\">Management responsable</td><td>Contexte</td><td rowspan=\"7\">10,00 %</td><td>—</td><td rowspan=\"7\">10,00 %</td><td>—</td><td rowspan=\"7\">10,00 %</td><td>—</td><td rowspan=\"7\">50,00 %</td><td>—</td></tr>" +
              "<tr><td>Engagement</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Planification</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Ressources et moyens</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Adaptabilité</td><td>3,33 %</td><td>3,33 %</td><td>3,33 %</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Chantier</td><td>3,33 %</td><td>3,33 %</td><td>3,33 %</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Commissionnement</td><td>3,33 %</td><td>3,33 %</td><td>3,33 %</td><td>—</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source : tableau de pondération HQE BD V4, p. 15-16. Pond. E = pondération de l'engagement, Pond. T = pondération du thème dans le total. Le « — » indique un thème non pondéré pour la typologie considérée.</em></p>"
          },
          {
            title: "HQE BD V4 — Seuils minimaux par thème pour être certifié",
            content: "<p>Tableau <strong>in extenso</strong> des seuils minimaux à atteindre par thème pour pouvoir être certifié HQE BD V4, selon la typologie d'opération.</p>" +
              "<p><strong>Note :</strong> 0 % correspond à une classe <strong>F</strong>, 10 % à une classe <strong>E</strong>, 50 % à une classe <strong>C</strong>. La mention <strong>M1</strong> signale une exigence minimum de management (premier niveau du SMR).</p>" +
              "<table class=\"fonct-table\"><thead>" +
              "<tr><th>Engagement</th><th>Thème</th><th>Construction<br><small>Seuil mini</small></th><th>Rénovation<br><small>Seuil mini</small></th><th>Exploit. axe Bâtiment<br><small>Seuil mini</small></th><th>Exploit. axe Gestion<br><small>Seuil mini</small></th></tr>" +
              "</thead><tbody>" +
              "<tr><td rowspan=\"9\">Qualité de vie</td><td>Qualité de l'air intérieur</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Qualité de l'eau</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Ondes électromagnétiques</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Confort hygrothermique</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Confort acoustique</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Confort visuel</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Accessibilité</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>—</td></tr>" +
              "<tr><td>Transports</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Services</td><td>10,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td rowspan=\"7\">Respect de l'environnement</td><td>Énergie</td><td>50,00 %</td><td>10,00 %</td><td>10,00 %</td><td>10,00 %</td></tr>" +
              "<tr><td>Eau</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Déchets</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Carbone</td><td>50,00 %</td><td>10,00 %</td><td>10,00 %</td><td>10,00 %</td></tr>" +
              "<tr><td>Adaptation au changement climatique</td><td>10,00 %</td><td>10,00 %</td><td>0 %</td><td>—</td></tr>" +
              "<tr><td>ACV</td><td>10,00 %</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Biodiversité</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>—</td></tr>" +
              "<tr><td rowspan=\"3\">Performance économique</td><td>Maîtrise des coûts</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>(à définir)</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Économie locale</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td rowspan=\"9\">Management responsable</td><td>Contexte</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Engagement</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Planification</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Ressources et moyens</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Réalisation activités opé. : Adaptabilité</td><td>50,00 %</td><td>10,00 %</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Chantier</td><td>50,00 %</td><td>10,00 %</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Commissionnement</td><td>10,00 %</td><td>10,00 %</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Évaluation</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Amélioration</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source : tableau des seuils minimaux HQE BD V4, p. 17-18.</em></p>"
          }
        ]
      },
      {
        name: "Certification HQE Bâtiment — pondérations & seuils",
        items: [
          {
            title: "HQE B V1 — Coefficients de pondération par thème (Pond.E + Pond.T)",
            content: "<p>Tableau <strong>in extenso</strong> des coefficients de pondération HQE B V1 par thème, selon la typologie d'opération.</p>" +
              "<table class=\"fonct-table\"><thead>" +
              "<tr><th rowspan=\"2\">Engagement</th><th rowspan=\"2\">Thème</th><th colspan=\"2\">Construction</th><th colspan=\"2\">Rénovation</th><th colspan=\"2\">Exploit. axe Bâtiment</th><th colspan=\"2\">Exploit. axe Gestion</th></tr>" +
              "<tr><th>Pond. E</th><th>Pond. T</th><th>Pond. E</th><th>Pond. T</th><th>Pond. E</th><th>Pond. T</th><th>Pond. E</th><th>Pond. T</th></tr>" +
              "</thead><tbody>" +
              "<tr><td rowspan=\"7\">Qualité de vie</td><td>Qualité de l'air intérieur</td><td rowspan=\"7\">45,00 %</td><td>6,43 %</td><td rowspan=\"7\">45,00 %</td><td>6,43 %</td><td rowspan=\"7\">45,00 %</td><td>6,43 %</td><td rowspan=\"7\">25,00 %</td><td>3,57 %</td></tr>" +
              "<tr><td>Qualité de l'eau</td><td>6,43 %</td><td>6,43 %</td><td>6,43 %</td><td>3,57 %</td></tr>" +
              "<tr><td>Ondes électromagnétiques</td><td>6,43 %</td><td>6,43 %</td><td>6,43 %</td><td>3,57 %</td></tr>" +
              "<tr><td>Confort hygrothermique</td><td>6,43 %</td><td>6,43 %</td><td>6,43 %</td><td>3,57 %</td></tr>" +
              "<tr><td>Confort acoustique</td><td>6,43 %</td><td>6,43 %</td><td>6,43 %</td><td>3,57 %</td></tr>" +
              "<tr><td>Confort visuel</td><td>6,43 %</td><td>6,43 %</td><td>6,43 %</td><td>3,57 %</td></tr>" +
              "<tr><td>Transports</td><td>6,43 %</td><td>6,43 %</td><td>6,43 %</td><td>3,57 %</td></tr>" +
              "<tr><td rowspan=\"5\">Respect de l'environnement</td><td>Énergie</td><td rowspan=\"5\">45,00 %</td><td>9 %</td><td rowspan=\"5\">45,00 %</td><td>9 %</td><td rowspan=\"5\">45,00 %</td><td>9 %</td><td rowspan=\"5\">25,00 %</td><td>6,25 %</td></tr>" +
              "<tr><td>Eau</td><td>9 %</td><td>9 %</td><td>9 %</td><td>6,25 %</td></tr>" +
              "<tr><td>Déchets</td><td>9 %</td><td>9 %</td><td>9 %</td><td>6,25 %</td></tr>" +
              "<tr><td>Carbone</td><td>9 %</td><td>9 %</td><td>9 %</td><td>6,25 %</td></tr>" +
              "<tr><td>Adaptation au changement climatique</td><td>9 %</td><td>9 %</td><td>9 %</td><td>—</td></tr>" +
              "<tr><td rowspan=\"7\">Management responsable</td><td>Contexte</td><td rowspan=\"7\">10,00 %</td><td>—</td><td rowspan=\"7\">10,00 %</td><td>—</td><td rowspan=\"7\">10,00 %</td><td>—</td><td rowspan=\"7\">50,00 %</td><td>—</td></tr>" +
              "<tr><td>Engagement</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Planification</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Ressources et moyens</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Adaptabilité</td><td>5 %</td><td>5 %</td><td>5 %</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Chantier</td><td>5 %</td><td>5 %</td><td>5 %</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Gestion Durable</td><td>—</td><td>—</td><td>—</td><td>50,00 %</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source : tableau de pondération HQE B V1, p. 19-20.</em></p>"
          },
          {
            title: "HQE B V1 — Seuils minimaux par thème pour être certifié",
            content: "<p>Tableau <strong>in extenso</strong> des seuils minimaux à atteindre par thème pour pouvoir être certifié HQE B V1, selon la typologie d'opération.</p>" +
              "<p><strong>Note :</strong> Pour chaque thème, 0 % correspond à une classe <strong>F</strong>, 10 % à une classe <strong>E</strong>, 50 % à une classe <strong>C</strong>. <strong>M1</strong> signale une exigence minimum de management.</p>" +
              "<table class=\"fonct-table\"><thead>" +
              "<tr><th>Engagement</th><th>Thème</th><th>Construction<br><small>Seuil mini</small></th><th>Rénovation<br><small>Seuil mini</small></th><th>Exploit. axe Bâtiment<br><small>Seuil mini</small></th><th>Exploit. axe Gestion<br><small>Seuil mini</small></th></tr>" +
              "</thead><tbody>" +
              "<tr><td rowspan=\"7\">Qualité de vie</td><td>Qualité de l'air intérieur</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Qualité de l'eau</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Ondes électromagnétiques</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Confort hygrothermique</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Confort acoustique</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Confort visuel</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Transports</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td rowspan=\"5\">Respect de l'environnement</td><td>Énergie</td><td>50,00 %</td><td>10,00 %</td><td>10,00 %</td><td>10,00 %</td></tr>" +
              "<tr><td>Eau</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Déchets</td><td>50,00 %</td><td>10,00 %</td><td>0 %</td><td>0 %</td></tr>" +
              "<tr><td>Carbone</td><td>50,00 %</td><td>10,00 %</td><td>10,00 %</td><td>10,00 %</td></tr>" +
              "<tr><td>Adaptation au changement climatique</td><td>10,00 %</td><td>10,00 %</td><td>0 %</td><td>—</td></tr>" +
              "<tr><td rowspan=\"9\">Management responsable</td><td>Contexte</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Engagement</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Planification</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Ressources et moyens</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Réalisation activités opé. : Adaptabilité</td><td>50,00 %</td><td>10,00 %</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Chantier</td><td>50,00 %</td><td>10,00 %</td><td>—</td><td>—</td></tr>" +
              "<tr><td>Réalisation activités opé. : Gestion Durable</td><td>—</td><td>—</td><td>—</td><td>10,00 %</td></tr>" +
              "<tr><td>Évaluation</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "<tr><td>Amélioration</td><td>M1</td><td>M1</td><td>M1</td><td>M1</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source : tableau des seuils minimaux HQE B V1, p. 21-22.</em></p>"
          }
        ]
      },
      {
        name: "Niveaux de maturité du SMR (Système de Management Responsable)",
        items: [
          {
            title: "Définition des 3 niveaux de maturité M1 / M2 / M3",
            content: "<p>L'engagement <strong>Management Responsable (SMR)</strong> ne se mesure pas en points mais par <strong>niveau de maturité</strong>. Le SMR se décline en <strong>3 niveaux</strong>&nbsp;:</p>" +
              "<table class=\"fonct-table\"><thead><tr><th>Niveau</th><th>Nom</th><th>Description</th></tr></thead><tbody>" +
              "<tr><td><strong>M1</strong></td><td><strong>Opérationnel</strong></td><td>Niveau de maturité minimum à mettre en œuvre pour que l'opération soit certifiable. Les exigences sont limitées à l'essentiel.</td></tr>" +
              "<tr><td><strong>M2</strong></td><td><strong>Maîtrisé</strong></td><td>Toutes les exigences d'un management « Opérationnel » (M1) sont mises en œuvre, et des exigences complémentaires sont à respecter. Ce niveau est globalement représentatif des bonnes pratiques liées aux exigences contenues dans les précédents référentiels (construction, rénovation, exploitation axes Bâtiment et Gestion).</td></tr>" +
              "<tr><td><strong>M3</strong></td><td><strong>Généralisé</strong> (« Système de Management Généralisé »)</td><td>Toutes les exigences visées (M1 ou M2) sont généralisées et déclinées à l'échelle de l'ensemble des opérations du demandeur.</td></tr>" +
              "</tbody></table>" +
              "<p><strong>Logique de progression&nbsp;:</strong></p><ul><li>Demandeur dont l'expérience en management responsable est limitée en nombre d'opérations (certifiées HQE ou non) → niveau <strong>M1</strong> ou <strong>M2</strong> selon l'ampleur des exigences à vérifier.</li><li>Demandeur ayant capitalisé et déployé son expérience de management sur plusieurs opérations, formalisé des retours d'expérience et tiré des leçons à l'échelle de toutes ses opérations → niveau <strong>M3</strong>.</li></ul>" +
              "<p><em>Source : Guide technique SMR, p. 8.</em></p>"
          },
          {
            title: "Niveaux de maturité par exigence du SMR — grille complète",
            content: "<p>Tableau <strong>in extenso</strong> des niveaux de maturité applicables à chaque exigence du SMR. Une croix indique que l'exigence est requise au niveau correspondant.</p>" +
              "<table class=\"fonct-table\"><thead><tr><th>Réf.</th><th>Exigence</th><th>M1</th><th>M2</th><th>M3</th></tr></thead><tbody>" +
              "<tr style=\"background:#F1F5F9;\"><td colspan=\"5\"><strong>SMR1 — Contexte</strong></td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR1.1 Périmètres</em></td></tr>" +
              "<tr><td>SMR1.1.1</td><td>Définition du périmètre spatial de l'opération, et des prestations minimum en exploitation axe Gestion</td><td>X</td><td></td><td></td></tr>" +
              "<tr><td>SMR1.1.2</td><td>Définition du périmètre des responsabilités en exploitation</td><td>X</td><td></td><td></td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR1.2 Contexte et enjeux</em></td></tr>" +
              "<tr><td>SMR1.2.1</td><td>Analyse du site, du contexte de l'opération et de l'état initial</td><td>X</td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR1.3 Besoins et attentes des parties intéressées</em></td></tr>" +
              "<tr><td>SMR1.3.1</td><td>Recueil et formulation des besoins et attentes des parties intéressées pour l'opération</td><td>X</td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F1F5F9;\"><td colspan=\"5\"><strong>SMR2 — Engagement</strong></td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR2.1 Objectifs de performance visés</em></td></tr>" +
              "<tr><td>SMR2.1.1</td><td>Choix, hiérarchisation et contextualisation des objectifs de performance visés pour l'opération</td><td>X</td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR2.2 Engagement de la Direction</em></td></tr>" +
              "<tr><td>SMR2.2.1</td><td>Engagement de la direction de l'organisme demandeur sur les objectifs de l'opération</td><td>X</td><td></td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR2.3 Rôles, responsabilités et autorités</em></td></tr>" +
              "<tr><td>SMR2.3.1</td><td>Description des rôles, responsabilités et autorités de chaque acteur ou intervenant dans l'opération</td><td>X</td><td></td><td>X</td></tr>" +
              "<tr><td>SMR2.3.2</td><td>Désignation d'une ou plusieurs personnes responsables de la mise en place du SMR et de l'évaluation des performances</td><td></td><td>X</td><td></td></tr>" +
              "<tr><td>SMR2.3.3</td><td>Implication de certains acteurs davantage en amont, afin d'anticiper et d'optimiser les choix et les actions</td><td></td><td>X</td><td></td></tr>" +
              "<tr><td>SMR2.3.4</td><td>Travail en mode collaboratif, de façon intégrée et interdisciplinaire</td><td></td><td>X</td><td></td></tr>" +
              "<tr style=\"background:#F1F5F9;\"><td colspan=\"5\"><strong>SMR3 — Planification</strong></td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR3.1 Gestion des risques</em></td></tr>" +
              "<tr><td>SMR3.1.1</td><td>Identification des risques pour l'opération et définition d'actions</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr><td>SMR3.1.2</td><td>Identification des situations d'urgence possibles et définition des réponses adéquates par rapport aux risques avérés</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR3.2 Planification des actions</em></td></tr>" +
              "<tr><td>SMR3.2.1</td><td>Description de la succession des étapes de chaque phase ou période de l'opération et éléments organisationnels associés</td><td>X</td><td>X</td><td>X</td></tr>" +
              "<tr><td>SMR3.2.2</td><td>Gestion des modifications</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F1F5F9;\"><td colspan=\"5\"><strong>SMR4 — Ressources et moyens</strong></td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR4.1 Compétences</em></td></tr>" +
              "<tr><td>SMR4.1.1</td><td>Compétences en adéquation avec l'opération, son contexte et ses objectifs</td><td></td><td>X</td><td></td></tr>" +
              "<tr><td>SMR4.1.2</td><td>Évaluation des intervenants sur l'opération, périodiquement ou à chaque phase, et actions de formation si nécessaire</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR4.2 Passation et suivi des contrats — Politique d'achats</em></td></tr>" +
              "<tr><td>SMR4.2.1</td><td>Passation des contrats</td><td></td><td>X</td><td></td></tr>" +
              "<tr><td>SMR4.2.2</td><td>Suivi des contrats au cours de leur réalisation, évolution et réactivité</td><td></td><td>X</td><td></td></tr>" +
              "<tr><td>SMR4.2.3</td><td>Établissement des contrats en cohérence avec la politique d'achats responsables du demandeur</td><td></td><td></td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR4.3 Communication et implication des parties intéressées</em></td></tr>" +
              "<tr><td>SMR4.3.1</td><td>Information et communication auprès des parties intéressées</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr><td>SMR4.3.2</td><td>Traitement des réclamations</td><td>X</td><td></td><td>X</td></tr>" +
              "<tr><td>SMR4.3.3</td><td>Consultation des parties intéressées</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr><td>SMR4.3.4</td><td>Enquête de satisfaction ponctuelle</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr><td>SMR4.3.5</td><td>Enquêtes de satisfaction périodiques</td><td></td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR4.4 Informations documentées</em></td></tr>" +
              "<tr><td>SMR4.4.1</td><td>Établissement et maîtrise des informations documentées tout au long de l'opération ou de l'exploitation</td><td>X</td><td>X</td><td>X</td></tr>" +
              "<tr><td>SMR4.4.2</td><td>Utilisation d'outils collaboratifs pour la gestion des informations et documents relatifs à l'opération</td><td></td><td>X</td><td></td></tr>" +
              "<tr style=\"background:#F1F5F9;\"><td colspan=\"5\"><strong>SMR5 — Évaluation</strong></td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR5.1 Évaluation</em></td></tr>" +
              "<tr><td>SMR5.1.1</td><td>Évaluation des performances de l'opération par rapport aux objectifs visés</td><td>X</td><td></td><td></td></tr>" +
              "<tr style=\"background:#F1F5F9;\"><td colspan=\"5\"><strong>SMR6 — Amélioration</strong></td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR6.1 Écarts et actions correctives</em></td></tr>" +
              "<tr><td>SMR6.1.1</td><td>Mise en œuvre d'actions correctives en cas d'écarts</td><td>X</td><td>X</td><td>X</td></tr>" +
              "<tr style=\"background:#F8FAFC;\"><td colspan=\"5\"><em>SMR6.2 Bilan et capitalisation</em></td></tr>" +
              "<tr><td>SMR6.2.1</td><td>Bilan de l'opération</td><td></td><td>X</td><td></td></tr>" +
              "<tr><td>SMR6.2.2</td><td>Bilan périodique de l'opération et révision</td><td></td><td>X</td><td></td></tr>" +
              "<tr><td>SMR6.2.3</td><td>Bilan de plusieurs opérations, capitalisation et amélioration</td><td></td><td></td><td>X</td></tr>" +
              "</tbody></table>" +
              "<p><em>Source : Guide technique SMR — Niveaux de maturité des exigences du SMR, p. 5-7.</em></p>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 5 — BLOCS HOMOGÈNES (BH)
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Blocs Homogènes",
    title: "Cas particulier des thèmes utilisant des Blocs Homogènes (BH)",
    subtitle: "Définition, paramétrages, propriétés, cas du CdC preneur et agrégation",
    sourceRef: "p. 23-30",
    groups: [
      {
        name: "Blocs Homogènes",
        items: [
          {
            title: "Paramétrages initiaux dans les fichiers Excel des thèmes",
            content: "<p>Plusieurs thèmes utilisent la notion de <strong>Blocs Homogènes (BH)</strong> dans leur fichier Excel d'évaluation. Avant utilisation, des paramétrages doivent être renseignés (typologie d'espaces, surfaces, densités d'occupation, etc.).</p><p><em>Source p. 23.</em></p>"
          },
          {
            title: "Définition du terme « Bloc Homogène »",
            content: "<p>Un <strong>Bloc Homogène (BH)</strong> est un regroupement d'espaces présentant des caractéristiques d'usage et techniques cohérentes, sur lequel l'évaluation d'un thème est conduite de manière agrégée.</p>" +
              "<p>La règle générale impose que la <strong>somme des surfaces des BH soit ≥ 80 %</strong> de la surface totale des espaces caractéristiques de l'activité, hors espaces à occupation passagère.</p>" +
              "<p>Cette règle est notamment portée par les exigences&nbsp;:</p><ul><li><strong>QAIR1.1.2</strong> — Engagement à créer des Blocs Homogènes (BH)</li><li><strong>HYGR1.1.2</strong> — idem côté confort hygrothermique</li></ul><p><em>Source p. 23.</em></p>"
          },
          {
            title: "Locaux à occupation autre que passagère",
            content: "<p>Les BH s'appuient sur la notion d'<strong>espaces caractéristiques à occupation autre que passagère</strong>. Les locaux à occupation passagère (couloirs, sanitaires, locaux techniques, halls de circulation, etc.) sont en général <strong>exclus</strong> du périmètre de calcul des BH.</p>" +
              "<p>Le référentiel propose en page 24 un tableau de typologies de locaux pour aider à l'identification.</p>" +
              "<div class=\"fonct-source-todo\"><em>Réf. PDF p. 24 — Tableau des typologies de locaux à intégrer en verbatim depuis le PDF.</em></div>"
          },
          {
            title: "Propriétés à prendre en compte pour la définition des BH",
            content: "<p>Les BH sont constitués en regroupant les espaces qui partagent les <strong>propriétés impactant significativement</strong> le thème évalué. Les propriétés à examiner incluent typiquement&nbsp;:</p><ul><li>Type d'activité / d'occupation</li><li>Densité d'occupation</li><li>Système de ventilation et de traitement d'air</li><li>Température et humidité de consigne</li><li>Niveau d'éclairement requis</li><li>Niveau d'isolement acoustique requis</li><li>Type de matériaux en contact avec l'air intérieur</li></ul><p>La liste détaillée des propriétés par thème figure en pages 25-27 du PDF source.</p><div class=\"fonct-source-todo\"><em>Réf. PDF p. 25-27 — Liste détaillée des propriétés par thème.</em></div>"
          },
          {
            title: "Mise en place des BH avec un Cahier des Charges preneurs",
            content: "<p>Lorsque le bâtiment est livré « en blanc » ou « en brut » à des preneurs futurs, les BH ne peuvent être figés à la livraison. Le référentiel autorise alors un <strong>Cahier des Charges preneurs (CdC preneur)</strong> qui&nbsp;:</p><ul><li>Décrit le périmètre autorisé pour les espaces livrés en blanc / brut</li><li>Fixe les exigences techniques minimales que les preneurs devront respecter</li><li>Permet d'évaluer les thèmes sur la base des engagements pris dans le CdC plutôt que sur les aménagements définitifs</li></ul><p><em>Source p. 28.</em></p>"
          },
          {
            title: "Agrégation des thèmes utilisant des BH",
            content: "<p>L'agrégation des résultats des BH se fait en deux temps&nbsp;:</p><ol><li><strong>Agrégation des indicateurs par BH</strong> — pour chaque BH, les indicateurs propres au thème sont consolidés (moyennes pondérées par surface, valeurs maximales / minimales selon le critère).</li><li><strong>Agrégation des Blocs Homogènes</strong> — les BH du projet sont ensuite combinés pour produire le score thème, généralement par <strong>moyenne pondérée par les surfaces</strong>.</li></ol><p>Les règles précises d'agrégation sont définies par thème (cf. fichiers Excel et p. 29-30 du référentiel).</p><p><em>Source p. 29-30.</em></p>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 6 — NON APPLICABILITÉ DES EXIGENCES
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Non-applicabilité",
    title: "Non-applicabilité des exigences",
    subtitle: "Distinction entre exigence non applicable de fait et exigence pouvant être déclarée non applicable",
    sourceRef: "p. 31-32",
    groups: [
      {
        name: "Non applicabilité",
        items: [
          {
            title: "Contexte — distinction entre les deux statuts",
            content: "<p>Le référentiel distingue deux situations relatives à la non-applicabilité d'une exigence&nbsp;:</p><ul><li><strong>Exigence qui EST non applicable</strong> — elle l'est de plein droit, par construction du référentiel (ex. : exigence portant sur un dispositif que le projet n'a pas et n'aura pas).</li><li><strong>Exigence qui PEUT ÊTRE déclarée non applicable</strong> — la non-applicabilité doit être justifiée par le demandeur et soumise pour validation à CERTIVEA.</li></ul><p>Cette distinction a été clarifiée à l'occasion du passage en versions mineures v4.1 / v1.1.</p><p><em>Source p. 31.</em></p>"
          },
          {
            title: "Démarche à suivre si une exigence est impossible à appliquer",
            content: "<p>Lorsqu'un demandeur estime qu'une exigence est <strong>impossible à appliquer</strong> sur son projet, la démarche à suivre est&nbsp;:</p><ol><li>Le demandeur formule une <strong>demande argumentée</strong> à CERTIVEA en précisant la situation et la justification de la non-applicabilité.</li><li>CERTIVEA instruit la demande et apporte une <strong>réponse</strong> au demandeur. Si la réponse est favorable, le demandeur est autorisé à exclure l'exigence du périmètre d'évaluation.</li><li>CERTIVEA <strong>informe ses clients</strong> des réponses favorables apportées via les fichiers FAQ.</li><li>CERTIVEA <strong>intègre dans la version suivante du référentiel</strong> les éléments issus des décisions récurrentes.</li></ol><p><em>Source p. 31-32.</em></p>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 7 — ÉLÉMENTS EXTÉRIEURS AU PÉRIMÈTRE
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Éléments extérieurs",
    title: "Cas particuliers de prise en compte d'éléments extérieurs au périmètre physique de la certification",
    subtitle: "Principes et procédure pour intégrer des éléments situés hors périmètre",
    sourceRef: "p. 33-34",
    groups: [
      {
        name: "Éléments extérieurs",
        items: [
          {
            title: "Contexte",
            content: "<p>Certains projets incluent des <strong>éléments situés en dehors du périmètre physique</strong> de la certification mais qui contribuent aux performances évaluées (parking mutualisé, locaux techniques en infrastructure partagée, dispositifs urbains de gestion de l'eau, etc.).</p><p>Le référentiel précise dans quelles conditions ces éléments peuvent être pris en compte dans l'évaluation.</p><p><em>Source p. 33.</em></p>"
          },
          {
            title: "Rappel des principes généraux",
            content: "<p>Les principes à respecter pour intégrer un élément extérieur au périmètre&nbsp;:</p><ul><li>L'élément doit servir <strong>directement</strong> et de façon <strong>identifiable</strong> le projet certifié</li><li>Le demandeur doit pouvoir <strong>démontrer la maîtrise</strong> ou un engagement contractuel sur cet élément (convention, bail, gestion partagée, etc.)</li><li>L'élément ne peut être pris en compte <strong>simultanément</strong> dans plusieurs certifications HQE distinctes (pas de double comptage)</li></ul><p><em>Source p. 33.</em></p>"
          },
          {
            title: "Procédure à suivre",
            content: "<p>La procédure d'intégration d'un élément extérieur dans l'évaluation comprend&nbsp;:</p><ol><li>Description de l'élément dans le dossier (localisation, fonction, surface concernée)</li><li>Justification documentaire du lien fonctionnel et de la maîtrise (conventions, plans, contrats)</li><li>Démonstration de l'absence de double comptage</li><li>Soumission à CERTIVEA pour validation préalable à l'évaluation</li></ol><p><em>Source p. 34.</em></p>"
          }
        ]
      }
    ]
  },


  // ─────────────────────────────────────────────────────────────
  // ONGLET 8 — EXTENSIONS NEUVES DANS RÉNOVATION
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Extensions neuves",
    title: "Inclusions d'extensions neuves de petites surfaces dans des évaluations de rénovation",
    subtitle: "Trois cas de figure selon l'indépendance aéraulique",
    sourceRef: "p. 35-37",
    groups: [
      {
        name: "Extensions neuves",
        items: [
          {
            title: "Contexte",
            content: "<p>Lorsqu'une opération de <strong>rénovation</strong> intègre des <strong>extensions neuves de petites surfaces</strong>, la règle d'évaluation dépend de l'<strong>indépendance aéraulique</strong> des espaces neufs vis-à-vis de l'existant.</p><p><em>Source p. 35.</em></p>"
          },
          {
            title: "Espaces neufs « aérauliquement indépendants »",
            content: "<p>Les extensions dont la <strong>ventilation est indépendante</strong> de celle de l'existant peuvent être intégrées au périmètre rénovation, ou évaluées séparément en construction si surface et autonomie le justifient.</p><p><em>Source p. 35.</em></p>"
          },
          {
            title: "Espaces neufs « aérauliquement dépendants »",
            content: "<p>Les extensions dont la <strong>ventilation est partagée</strong> avec l'existant <strong>sont nécessairement intégrées</strong> au périmètre de la rénovation et évaluées sous le référentiel rénovation.</p><p><em>Source p. 36.</em></p>"
          },
          {
            title: "Espaces neufs « dépendants et indépendants aérauliquement »",
            content: "<p>Lorsque le projet combine les deux situations, le demandeur établit un <strong>découpage explicite</strong> des espaces et le soumet à CERTIVEA pour validation.</p><p><em>Source p. 37.</em></p>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 9 — JUSTIFICATION PAR ÉTUDES OU MESURES EN EXPLOITATION
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Justification exploit.",
    title: "Justification d'exigences par des études ou mesures en exploitation (axes Bâtiment et Gestion)",
    subtitle: "Études et mesures réalisables sur le cycle de 5 ans de certification",
    sourceRef: "p. 38",
    groups: [
      {
        name: "Justification en exploitation",
        items: [
          {
            title: "Études ou mesures sur le cycle de 5 ans",
            content: "<p>Pour les certifications en exploitation (axes Bâtiment et Gestion), certaines exigences peuvent être justifiées par des <strong>études</strong> ou des <strong>mesures</strong> non obligatoires.</p><p>Avec le passage en version v4.1, ces études et mesures peuvent être réalisées <strong>sur le cycle de 5 ans</strong> de certification, et non plus dès la première année. Cette souplesse facilite la planification des campagnes de mesure (QAI, acoustique, thermique, etc.).</p><p><em>Source p. 38 — paragraphe créé en version mineure v4.1.</em></p>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 10 — CAHIER DES CHARGES PRENEUR
  // ─────────────────────────────────────────────────────────────
  {
    tab: "CdC preneur",
    title: "Recours à un Cahier des Charges preneur — Périmètre livraison « en blanc » / « en brut »",
    subtitle: "Définitions et conditions à respecter",
    sourceRef: "p. 39-50",
    groups: [
      {
        name: "Définitions",
        items: [
          {
            title: "Bâtiments « certifiables » et « non certifiables »",
            content: "<ul><li>Bâtiments <strong>certifiables</strong> — projets entrant dans le champ d'application et susceptibles d'être évalués.</li><li>Bâtiments <strong>non certifiables</strong> — projets exclus (par typologie, périmètre ou impossibilité de produire les preuves).</li></ul><p><em>Source p. 39.</em></p>"
          },
          {
            title: "Espaces livrés « en blanc » / « en brut »",
            content: "<ul><li><strong>Livraison « en blanc »</strong> — second œuvre partiellement réalisé, le preneur achève les aménagements (cloisons légères, revêtements, équipements terminaux).</li><li><strong>Livraison « en brut »</strong> — bâti livré à l'état de gros œuvre, le preneur réalise l'ensemble du second œuvre.</li></ul><p>Dans les deux cas, un CdC preneur fixe les conditions techniques minimales à respecter.</p><p><em>Source p. 39.</em></p>"
          }
        ]
      },
      {
        name: "Conditions à respecter",
        items: [
          {
            title: "Conditions générales du CdC preneur",
            content: "<ul><li>Définir le <strong>périmètre exact</strong> des espaces livrés en blanc ou en brut</li><li>Lister par exigence les <strong>contraintes techniques</strong> que les aménagements définitifs devront respecter</li><li>Être annexé au <strong>contrat de bail</strong> ou de cession des espaces</li><li>Désigner un <strong>responsable</strong> du suivi de la conformité</li></ul><p><em>Source p. 40.</em></p>"
          },
          {
            title: "Conditions par thème (QAIR / QEAU / HYGR / ACOU / VISU / ENER / EAU / DECH / BIOD / DEVT / ACES / TRAN / SERV)",
            content: "<p>Le tableau exhaustif des conditions du CdC preneur, exigence par exigence et thème par thème, occupe les pages <strong>40 à 50</strong> du PDF source. Il liste pour chaque exigence le périmètre autorisé en brut/blanc, les conditions précises (matériaux, équipements, performances minimales) et les cas d'exclusion.</p><div class=\"fonct-source-todo\"><em>Réf. PDF p. 40-50 — Tableau exhaustif à intégrer en verbatim depuis le PDF.</em></div>"
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // ONGLET 11 — INFLUENCE SITE + SMG + GLOSSAIRE
  // ─────────────────────────────────────────────────────────────
  {
    tab: "Annexes",
    title: "Annexes — Influence du site, Thèmes du SMG et Glossaire",
    subtitle: "Tableau croisé site / thèmes, périmètre du Système de Management Général et glossaire",
    sourceRef: "p. 51-62",
    groups: [
      {
        name: "Influence des caractéristiques du site",
        items: [
          {
            title: "Influence des caractéristiques du site sur les thèmes du cadre HQE",
            content: "<p>Les caractéristiques du site (climat, exposition, environnement urbain, ressources locales, contraintes réglementaires) influencent l'évaluation de plusieurs thèmes. Le tableau pages <strong>51-54</strong> croise caractéristiques du site et thèmes impactés.</p><div class=\"fonct-source-todo\"><em>Réf. PDF p. 51-54 — Tableau croisé site / thèmes complet à intégrer en verbatim depuis le PDF.</em></div>"
          }
        ]
      },
      {
        name: "Système de Management Général",
        items: [
          {
            title: "Thèmes du SMG (Système de Management Général)",
            content: "<p>Le <strong>SMG</strong> regroupe les chapitres de pilotage du projet HQE&nbsp;:</p><ul><li><strong>SMR1 — Contexte</strong></li><li><strong>SMR2 — Engagement</strong></li><li><strong>SMR3 — Planification</strong></li><li><strong>SMR4 — Ressources et moyens</strong></li><li><strong>SMR5 — Évaluation</strong></li><li><strong>SMR6 — Amélioration</strong></li></ul><p>Cette structure suit la logique des normes ISO 9001 / 14001.</p><p><em>Source p. 55.</em></p>"
          }
        ]
      },
      {
        name: "Glossaire",
        items: [
          {
            title: "Glossaire — Termes et abréviations du référentiel",
            content: "<p>Le glossaire couvre l'ensemble des termes et abréviations utilisés dans les référentiels HQE BD V4.1 / HQE B V1.1 (BH, CdC preneur, CDC QAI, Engagement, Sous-objet, SMG, SMR, Thème, Sous-thème, Vérification documentaire…).</p><p>L'arborescence de référence du dispositif technique est&nbsp;: <em>Engagement &gt; Objectifs &gt; Thèmes &gt; Sous-thèmes &gt; Blocs d'exigences (éventuel) &gt; Exigences</em>.</p><div class=\"fonct-source-todo\"><em>Réf. PDF p. 56-62 — Glossaire complet à intégrer en verbatim depuis le PDF.</em></div>"
          }
        ]
      }
    ]
  }

];
