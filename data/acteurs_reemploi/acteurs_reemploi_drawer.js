/**
 * Volet lateral detail acteur reemploi.
 *
 * Ouverture au clic sur une card de l'annuaire.
 * Fallback propre "Non renseigne" sur tous les champs manquants.
 *
 * Lit :
 *   window.ACTEURS_REEMPLOI         - dataset de base (ID, nom, site, tel, email, materiaux, ville, lat, lon)
 *   window.ACTEURS_REEMPLOI_ENRICHED - supplement optionnel (logo, bio, SIREN, annee, effectif, etc.)
 *                                      shape : { <id> : { logo_url, bio, bio_source, siren, siret,
 *                                                         annee_creation, effectif, nature_juridique,
 *                                                         code_ape, libelle_ape, adresse_siege,
 *                                                         zones_intervention, projets, labels,
 *                                                         linkedin, twitter, _sources } }
 */
(function () {
    'use strict';

    function escHtml(s) {
        if (s == null) return '';
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
        });
    }

    function getActeur(id) {
        var list = window.ACTEURS_REEMPLOI || [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) return list[i];
        }
        return null;
    }

    function getEnrichment(id) {
        var e = window.ACTEURS_REEMPLOI_ENRICHED || {};
        return e[id] || {};
    }

    function initials(name) {
        if (!name) return '?';
        var parts = name.trim().split(/\s+/).slice(0, 2);
        return parts.map(function (p) { return p.charAt(0).toUpperCase(); }).join('');
    }

    function logoHtml(actor, enriched) {
        var url = enriched.logo_url || '';
        if (url) {
            // onerror -> swap to initials badge
            return '<img class="sa-drw-logo-img" src="' + escHtml(url) + '" alt="' + escHtml(actor.name) + '"' +
                   ' onerror="this.style.display=\'none\';this.nextElementSibling&&(this.nextElementSibling.style.display=\'flex\');">' +
                   '<div class="sa-drw-logo-fallback" style="display:none;">' + escHtml(initials(actor.name)) + '</div>';
        }
        return '<div class="sa-drw-logo-fallback">' + escHtml(initials(actor.name)) + '</div>';
    }

    // Group label helper
    function groupLabel(group) {
        var map = {
            'CONCEPTEURS':'Concepteurs',
            'CONSTRUCTEURS':'Constructeurs',
            'VENDEURS':'Vendeurs',
            'AMO':'AMO',
            'FORMATEURS':'Formateurs',
            'AUTRES':'Autres'
        };
        return map[group] || group;
    }

    // -------- Sections rendering --------

    // Hide-when-empty helper : retourne null si vide (pour filtrage en amont),
    // sinon la valeur echappee (ou joinde si tableau).
    function isEmpty(val) {
        if (val == null) return true;
        if (typeof val === 'string') {
            var s = val.trim();
            return s === '' || s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined';
        }
        if (Array.isArray(val)) return val.length === 0;
        return false;
    }

    function fmtField(val, opts) {
        opts = opts || {};
        if (isEmpty(val)) return null;
        if (Array.isArray(val)) return val.map(escHtml).join(opts.sep || ', ');
        return escHtml(val);
    }

    function badgeSource(label) {
        return '<span class="sa-drw-src-badge" title="Source de la donnee">' + escHtml(label) + '</span>';
    }

    function sectionIdentite(actor, enr) {
        // SIREN / SIRET : ne concatene que les parties existantes, null si aucune
        var sirenSiret = [enr.siren, enr.siret].filter(function (v) { return !isEmpty(v); }).join(' / ') || null;

        // Code APE : libelle optionnel
        var codeApe = null;
        if (!isEmpty(enr.code_ape)) {
            codeApe = enr.code_ape + (!isEmpty(enr.libelle_ape) ? ' - ' + enr.libelle_ape : '');
        }

        // Adresse siege : preferer enrichie, sinon reconstruire depuis actor, null si rien
        var adresseParts = [actor.street, actor.postal, actor.city].filter(Boolean);
        var adresse = !isEmpty(enr.adresse_siege) ? enr.adresse_siege : (adresseParts.length ? adresseParts.join(' ') : null);

        var candidates = [
            ['Structure juridique', enr.nature_juridique || actor.structure],
            ['SIREN / SIRET', sirenSiret],
            ['Annee de creation', enr.annee_creation],
            ['Effectif INSEE', enr.effectif],
            ['Code APE (NAF)', codeApe],
            ['Adresse siege', adresse]
        ];

        var rowsHtml = candidates
            .map(function (r) { return [r[0], fmtField(r[1])]; })
            .filter(function (r) { return r[1] !== null; })
            .map(function (r) {
                return '<div class="sa-drw-row"><dt>' + escHtml(r[0]) + '</dt><dd>' + r[1] + '</dd></div>';
            })
            .join('');

        // Section masquee si aucune donnee
        if (!rowsHtml) return '';

        var srcLabel = (enr.siren || enr.annee_creation) ? 'SIRENE / INSEE' : 'Annuaire reemploi';

        return '<section class="sa-drw-section">' +
            '<header class="sa-drw-section-head">' +
                '<h4>Identite</h4>' + badgeSource(srcLabel) +
            '</header>' +
            '<dl class="sa-drw-dl">' + rowsHtml + '</dl>' +
        '</section>';
    }

    function sectionDescription(actor, enr) {
        var bio = !isEmpty(enr.bio) ? enr.bio : null;
        var bioSrc = enr.bio_source || (bio ? 'site officiel' : '');

        var activite = !isEmpty(actor.activite) ? actor.activite : null;
        var subs = Array.isArray(actor.sub_categories) ? actor.sub_categories.filter(function (s) { return !isEmpty(s); }) : [];
        var mats = Array.isArray(actor.materials) ? actor.materials.filter(function (s) { return !isEmpty(s); }) : [];
        var role = !isEmpty(actor.group) ? groupLabel(actor.group) : null;

        // Section masquee si aucun contenu (hors role qui est tres generique)
        if (!bio && !activite && !subs.length && !mats.length && !role) return '';

        var blocks = [];

        if (bio) {
            blocks.push(
                '<p class="sa-drw-bio">' + escHtml(bio) + '</p>' +
                (bioSrc ? '<div class="sa-drw-bio-src">Source : ' + escHtml(bioSrc) + '</div>' : '')
            );
        }

        if (activite) {
            blocks.push('<div class="sa-drw-activite"><strong>Activite principale :</strong> ' + escHtml(activite) + '</div>');
        }

        if (subs.length) {
            blocks.push('<div class="sa-drw-tags"><span class="sa-drw-tag-lbl">Sous-activites</span>' +
                subs.map(function (s) { return '<span class="sa-drw-tag">' + escHtml(s) + '</span>'; }).join('') +
                '</div>');
        }
        if (mats.length) {
            blocks.push('<div class="sa-drw-tags"><span class="sa-drw-tag-lbl">Materiaux</span>' +
                mats.map(function (s) { return '<span class="sa-drw-tag sa-drw-tag-mat">' + escHtml(s) + '</span>'; }).join('') +
                '</div>');
        }
        if (role) {
            blocks.push('<div class="sa-drw-tags"><span class="sa-drw-tag-lbl">Role</span>' +
                '<span class="sa-drw-tag sa-drw-tag-role">' + escHtml(role) + '</span>' +
                '</div>');
        }

        return '<section class="sa-drw-section">' +
            '<header class="sa-drw-section-head"><h4>Description et activites</h4>' +
                (bio ? badgeSource('Site officiel') : badgeSource('Annuaire reemploi')) +
            '</header>' +
            blocks.join('') +
        '</section>';
    }

    function sectionZones(actor, enr) {
        var zones = Array.isArray(enr.zones_intervention) ? enr.zones_intervention.filter(function (z) { return !isEmpty(z); }) : [];
        var projets = Array.isArray(enr.projets) ? enr.projets.filter(function (p) { return p && (p.titre || p.name); }) : [];

        // Section entiere masquee si rien
        if (!zones.length && !projets.length) return '';

        var blocks = [];

        if (zones.length) {
            var zonesHtml = zones.map(function (z) { return '<span class="sa-drw-chip">' + escHtml(z) + '</span>'; }).join('');
            blocks.push(
                '<div class="sa-drw-subhead">Zones g&eacute;ographiques desservies</div>' +
                '<div class="sa-drw-chips">' + zonesHtml + '</div>'
            );
        }

        if (projets.length) {
            var projetsHtml = '<ul class="sa-drw-projects">' + projets.map(function (p) {
                return '<li><strong>' + escHtml(p.titre || p.name || '') + '</strong>' +
                    (!isEmpty(p.annee) ? ' <span class="sa-drw-muted">(' + escHtml(p.annee) + ')</span>' : '') +
                    (!isEmpty(p.description) ? '<div class="sa-drw-project-desc">' + escHtml(p.description) + '</div>' : '') +
                    (!isEmpty(p.url) ? '<div><a href="' + escHtml(p.url) + '" target="_blank" rel="noopener">En savoir plus &rarr;</a></div>' : '') +
                '</li>';
            }).join('') + '</ul>';
            blocks.push(
                '<div class="sa-drw-subhead"' + (blocks.length ? ' style="margin-top:12px;"' : '') + '>Projets embl&eacute;matiques</div>' +
                projetsHtml
            );
        }

        return '<section class="sa-drw-section">' +
            '<header class="sa-drw-section-head"><h4>Zones d\'intervention et projets</h4>' +
                badgeSource('Site officiel') +
            '</header>' +
            blocks.join('') +
        '</section>';
    }

    function sectionLabels(actor, enr) {
        var labels = Array.isArray(enr.labels) ? enr.labels.filter(function (l) { return !isEmpty(l); }) : [];
        var ca = enr.ca || enr.chiffre_affaires;
        var categorie = enr.categorie_entreprise;

        // Section masquee si rien
        if (!labels.length && isEmpty(ca) && isEmpty(categorie)) return '';

        var blocks = [];

        if (labels.length) {
            var labelsHtml = labels.map(function (l) {
                return '<span class="sa-drw-chip sa-drw-chip-label">' + escHtml(l) + '</span>';
            }).join('');
            blocks.push(
                '<div class="sa-drw-subhead">Labels / certifications</div>' +
                '<div class="sa-drw-chips">' + labelsHtml + '</div>'
            );
        }

        var dlRows = [
            ['Categorie d\'entreprise (INSEE)', categorie],
            ['Chiffre d\'affaires (Pappers public)', ca]
        ]
            .map(function (r) { return [r[0], fmtField(r[1])]; })
            .filter(function (r) { return r[1] !== null; });

        if (dlRows.length) {
            var dlHtml = dlRows.map(function (r) {
                return '<div class="sa-drw-row"><dt>' + escHtml(r[0]) + '</dt><dd>' + r[1] + '</dd></div>';
            }).join('');
            blocks.push(
                '<dl class="sa-drw-dl"' + (blocks.length ? ' style="margin-top:12px;"' : '') + '>' + dlHtml + '</dl>'
            );
        }

        return '<section class="sa-drw-section">' +
            '<header class="sa-drw-section-head"><h4>Labels, certifications et chiffres cles</h4>' +
                badgeSource('Site officiel / INSEE') +
            '</header>' +
            blocks.join('') +
        '</section>';
    }

    function footerLinks(actor, enr) {
        var parts = [];
        if (actor.web) {
            parts.push('<a class="sa-drw-link sa-drw-link-primary" href="' + escHtml(normalizeUrl(actor.web)) + '" target="_blank" rel="noopener">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
                'Site officiel</a>');
        }
        if (actor.email) {
            parts.push('<a class="sa-drw-link" href="mailto:' + escHtml(actor.email) + '">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
                escHtml(actor.email) + '</a>');
        }
        if (actor.tel) {
            parts.push('<a class="sa-drw-link" href="tel:' + escHtml(actor.tel.split(',')[0].replace(/\s+/g,'')) + '">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                escHtml(actor.tel) + '</a>');
        }
        if (enr.linkedin) {
            parts.push('<a class="sa-drw-link" href="' + escHtml(enr.linkedin) + '" target="_blank" rel="noopener">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>' +
                'LinkedIn</a>');
        }
        return parts.join('');
    }

    function normalizeUrl(u) {
        if (!u) return '#';
        return u.indexOf('http') === 0 ? u : ('http://' + u);
    }

    // -------- Drawer open/close --------

    var _keydownHandler = null;

    window.saOpenActeurDrawer = function (id) {
        var actor = getActeur(id);
        if (!actor) return;
        var enr = getEnrichment(id);

        var host = document.getElementById('saActeurDrawer');
        var overlay = document.getElementById('saActeurDrawerOverlay');
        if (!host) return;

        var subtitle = [actor.structure, [actor.city, actor.postal].filter(Boolean).join(' ')].filter(Boolean).join(' — ');

        host.innerHTML = '' +
            '<header class="sa-drw-header">' +
                '<button type="button" class="sa-drw-close" onclick="saCloseActeurDrawer()" aria-label="Fermer">' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>' +
                '</button>' +
                '<div class="sa-drw-logo">' + logoHtml(actor, enr) + '</div>' +
                '<div class="sa-drw-head-text">' +
                    '<h3 class="sa-drw-name">' + escHtml(actor.name || '—') + '</h3>' +
                    (subtitle ? '<div class="sa-drw-subtitle">' + escHtml(subtitle) + '</div>' : '') +
                '</div>' +
            '</header>' +
            '<div class="sa-drw-body">' +
                sectionIdentite(actor, enr) +
                sectionDescription(actor, enr) +
                sectionZones(actor, enr) +
                sectionLabels(actor, enr) +
            '</div>' +
            '<footer class="sa-drw-footer">' + footerLinks(actor, enr) + '</footer>';

        host.classList.add('sa-drw-open');
        if (overlay) overlay.classList.add('sa-drw-overlay-visible');
        document.body.classList.add('sa-drw-body-locked');

        // Escape to close
        _keydownHandler = function (e) { if (e.key === 'Escape') window.saCloseActeurDrawer(); };
        document.addEventListener('keydown', _keydownHandler);
    };

    window.saCloseActeurDrawer = function () {
        var host = document.getElementById('saActeurDrawer');
        var overlay = document.getElementById('saActeurDrawerOverlay');
        if (host) host.classList.remove('sa-drw-open');
        if (overlay) overlay.classList.remove('sa-drw-overlay-visible');
        document.body.classList.remove('sa-drw-body-locked');
        if (_keydownHandler) { document.removeEventListener('keydown', _keydownHandler); _keydownHandler = null; }
    };

    // Overlay click -> close
    document.addEventListener('DOMContentLoaded', function () {
        var overlay = document.getElementById('saActeurDrawerOverlay');
        if (overlay) overlay.addEventListener('click', window.saCloseActeurDrawer);
    });
    // Safety net if DOMContentLoaded already fired
    if (document.readyState !== 'loading') {
        setTimeout(function () {
            var overlay = document.getElementById('saActeurDrawerOverlay');
            if (overlay && !overlay._saDrwBound) {
                overlay.addEventListener('click', window.saCloseActeurDrawer);
                overlay._saDrwBound = true;
            }
        }, 100);
    }
})();
