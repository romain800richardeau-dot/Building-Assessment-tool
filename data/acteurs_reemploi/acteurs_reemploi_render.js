/* =========================================================================
 * ACTEURS DU BATIMENT DURABLE - Annuaire cartographique
 * ---------------------------------------------------------------------------
 * Source : snapshot local de la Carte des acteurs du reemploi (ODbL)
 *   (https://carte-des-acteurs-du-reemploi.gogocarto.fr)
 * Fichier dataset local : acteurs_reemploi_dataset.js (window.ACTEURS_REEMPLOI)
 *
 * Layout : toolbar filtres + split cards(gauche) / carte sticky(droite).
 * Synchro : hover/click card <-> popup marker ; reset + suggestions 0 resultat.
 * =========================================================================*/

(function () {
    'use strict';

    // NOTE: <div id="saActeursMap"> expose automatiquement window.saActeursMap
    // comme reference vers l'element DOM (named element access HTML5).
    // On nullify cette reference au chargement du script pour que les checks
    // `if (window.saActeursMap)` fonctionnent correctement avant init Leaflet.
    if (!(window.saActeursMap && typeof window.saActeursMap.invalidateSize === 'function')) {
        window.saActeursMap = null;
    }

    // ------- Configuration -------
    var DEFAULT_RADIUS_KM = 50;
    var RADIUS_STEPS = [25, 50, 100, 200, 500, 9999]; // 9999 = tous
    var MAX_MARKERS = 500;
    var CARDS_VISIBLE = 120; // premiers resultats affiches dans le panneau

    // Mapping code materiau -> libelle et couleur
    var MATERIAL_META = {
        TOUT: { label: 'Multi-mat.',    color: '#64748B' },
        GRAN: { label: 'Granulats',     color: '#A16207' },
        BOIS: { label: 'Bois',          color: '#166534' },
        MET:  { label: 'Metaux',        color: '#475569' },
        ISOL: { label: 'Isolants',      color: '#0891B2' },
        PLA:  { label: 'Platre',        color: '#D97706' },
        VIT:  { label: 'Vitrages',      color: '#0EA5E9' },
        EQT:  { label: 'Equipt CVC/elec', color: '#7C3AED' },
        MOB:  { label: 'Mobilier',      color: '#DB2777' },
        REV:  { label: 'Revetements',   color: '#C026D3' }
    };

    var GROUP_META = {
        VENDEURS:     { label: 'Vendeurs',     long: 'Vendeurs / plateformes',    color: '#2563EB' },
        CONCEPTEURS:  { label: 'Concepteurs',  long: 'Concepteurs',               color: '#0891B2' },
        CONSTRUCTEURS:{ label: 'Constructeurs',long: 'Constructeurs / demonteurs',color: '#059669' },
        AMO:          { label: 'AMO',          long: 'AMO / diagnostic',          color: '#D97706' },
        FORMATIONS:   { label: 'Formations',   long: 'Formations',                color: '#7C3AED' },
        AUTRES:       { label: 'Autres',       long: 'Autres (eco-organismes, recherche, service num.)', color: '#64748B' },
        ZONE_REEMPLOI_PMCB: { label: 'Zone réemploi', long: 'Point de collecte PMCB avec zone réemploi (Mat 03)', color: '#2E7D32' }
    };

    // ------- Injection points PMCB avec zone réemploi -------
    // Ces points sont dans l'onglet Exutoires & collecte PMCB, mais sont aussi
    // pertinents pour Mat 03. On les duplique dans l'Annuaire avec un tag distinct.
    var __pmcbZrInjected = false;
    var PMCB_MAT_MAP = {
        BETON: 'GRAN', BRIQUES: 'GRAN', INERTES: 'GRAN', TUILES: 'GRAN',
        CAILLOUX: 'GRAN', ENROBES: 'GRAN', PLASTIQUES: 'GRAN', MEMBRANES: 'GRAN',
        BOIS: 'BOIS', METAL: 'MET', PLATRE: 'PLA', VERRE_PLAT: 'VIT',
        HUISSERIES: 'MOB', ISOL_LAINES: 'ISOL'
    };
    function injectPmcbZoneReemploi() {
        if (__pmcbZrInjected) return;
        if (!Array.isArray(window.COLLECTE_PMCB)) return;
        if (!Array.isArray(window.ACTEURS_REEMPLOI)) return;
        var added = 0;
        window.COLLECTE_PMCB.forEach(function (p) {
            if (!p.types || p.types.indexOf('ZONE_REEMPLOI') === -1) return;
            var mats = [];
            (p.materials || []).forEach(function (m) {
                var mapped = PMCB_MAT_MAP[m];
                if (mapped && mats.indexOf(mapped) === -1) mats.push(mapped);
            });
            if (!mats.length) mats = ['TOUT'];
            window.ACTEURS_REEMPLOI.push({
                id: 'pmcbzr_' + p.id,
                name: p.name || '',
                group: 'ZONE_REEMPLOI_PMCB',
                sub_categories: ['Zone réemploi ' + (p.source || '')],
                activite: 'Point de collecte avec zone réemploi (' + (p.source || 'PMCB') + ')',
                materials: mats,
                city: p.city || '',
                postal: p.postcode || '',
                street: p.address || '',
                lat: p.lat,
                lon: p.lon,
                web: p.url || '',
                tel: p.phone || '',
                email: p.email || '',
                structure: 'Point de collecte PMCB',
                _isPmcbZr: true
            });
            added++;
        });
        __pmcbZrInjected = true;
        return added;
    }

    // ------- Etat -------
    var filterState = {
        radiusKm: DEFAULT_RADIUS_KM,
        materials: {},
        groups: {},
        search: ''
    };

    // Layer groups
    var markerLayer = null;
    var siteMarker = null;
    var radiusCircle = null;          // obsolete (ex-filter)
    var visualRadiusCircle = null;    // zoom-adaptive scale indicator
    var visualRadiusLayer = null;     // layer dedie (PAS clearLayers par updateMap)
    var __visualRadiusBound = false;  // flag : listener zoomend/moveend bound

    function niceRadiusMeters(m) {
        var steps = [50, 100, 150, 200, 300, 400, 500, 750, 1000, 1500, 2000,
                     3000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000];
        for (var i = 0; i < steps.length; i++) {
            if (steps[i] >= m) return steps[i];
        }
        return steps[steps.length - 1];
    }

    function fmtRadius(m) {
        if (m >= 1000) return (m / 1000).toLocaleString('fr-FR') + ' km';
        return m + ' m';
    }

    function updateVisualRadius() {
        var map = window.saActeursMap;
        if (!map || typeof map.getBounds !== 'function') return;
        var siteLL = getSiteLatLon();
        // Lazy create le layer dedie (non vide par clearLayers)
        if (!visualRadiusLayer) {
            visualRadiusLayer = L.layerGroup().addTo(map);
        }
        if (!siteLL) {
            if (visualRadiusCircle) { visualRadiusLayer.removeLayer(visualRadiusCircle); visualRadiusCircle = null; }
            return;
        }
        try {
            var b = map.getBounds();
            var nw = L.latLng(b.getNorth(), b.getWest());
            var ne = L.latLng(b.getNorth(), b.getEast());
            var widthM = map.distance(nw, ne);
            if (!widthM || widthM <= 0) return; // map pas encore mesuree
            // Circle ~ 20% of viewport width (visible but not dominant)
            var r = niceRadiusMeters(Math.max(30, widthM * 0.2));
            var label = fmtRadius(r);

            if (!visualRadiusCircle) {
                visualRadiusCircle = L.circle(siteLL, {
                    radius: r, color: '#DC2626', weight: 1.3,
                    fillColor: '#DC2626', fillOpacity: 0.04, dashArray: '4 4',
                    interactive: false
                });
                visualRadiusLayer.addLayer(visualRadiusCircle);
                visualRadiusCircle.bindTooltip(label, {
                    permanent: true, direction: 'top', offset: [0, -2],
                    className: 'sa-acteurs-radius-tooltip'
                });
            } else {
                visualRadiusCircle.setLatLng(siteLL);
                visualRadiusCircle.setRadius(r);
                if (!visualRadiusLayer.hasLayer(visualRadiusCircle)) {
                    visualRadiusLayer.addLayer(visualRadiusCircle);
                }
                if (visualRadiusCircle.getTooltip()) {
                    visualRadiusCircle.setTooltipContent(label);
                }
            }
        } catch (e) {}
    }

    function bindVisualRadiusEvents() {
        var map = window.saActeursMap;
        if (!map || __visualRadiusBound) return;
        if (typeof map.on !== 'function') return;
        map.on('zoomend moveend', updateVisualRadius);
        __visualRadiusBound = true;
    }
    var tileLayers = null;
    var markersById = {}; // id acteur -> Leaflet marker
    var activeCardId = null;

    // ------- Utilitaires -------
    function haversineKm(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var toRad = Math.PI / 180;
        var dLat = (lat2 - lat1) * toRad;
        var dLon = (lon2 - lon1) * toRad;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return 2 * R * Math.asin(Math.sqrt(a));
    }

    function escHtml(s) {
        if (s == null) return '';
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function fmtDist(km) {
        if (km == null) return '—';
        if (km < 1) return '< 1 km';
        if (km < 10) return km.toFixed(1) + ' km';
        return Math.round(km) + ' km';
    }

    function acteurColor(a) {
        var g = GROUP_META[a.group];
        return (g && g.color) || '#64748B';
    }

    // ------- Filtrage -------
    // opts.ignoreRadius : ne pas appliquer le filtre de rayon (utilise pour la carte
    //   qui montre toujours tous les acteurs quelle que soit la distance selectionnee).
    function applyFilters(state, opts) {
        opts = opts || {};
        var all = window.ACTEURS_REEMPLOI || [];
        var lat = (window.saState && saState.lat) ? saState.lat : null;
        var lon = (window.saState && saState.lon) ? saState.lon : null;

        var activeMats = Object.keys(state.materials).filter(function (k) { return state.materials[k]; });
        var activeGroups = Object.keys(state.groups).filter(function (k) { return state.groups[k]; });
        var q = (state.search || '').toLowerCase().trim();

        var res = all.map(function (a) {
            var dist = null;
            if (lat != null && lon != null && a.lat != null && a.lon != null) {
                dist = haversineKm(lat, lon, a.lat, a.lon);
            }
            return Object.assign({}, a, { _dist: dist });
        });

        if (!opts.ignoreRadius && lat != null && lon != null && state.radiusKm < 9999) {
            res = res.filter(function (a) { return a._dist != null && a._dist <= state.radiusKm; });
        }

        if (activeMats.length > 0) {
            res = res.filter(function (a) {
                var mats = a.materials || [];
                for (var i = 0; i < mats.length; i++) {
                    if (activeMats.indexOf(mats[i]) !== -1) return true;
                }
                return false;
            });
        }

        if (activeGroups.length > 0) {
            res = res.filter(function (a) { return activeGroups.indexOf(a.group) !== -1; });
        }

        if (q.length > 0) {
            res = res.filter(function (a) {
                return (a.name && a.name.toLowerCase().indexOf(q) !== -1) ||
                       (a.city && a.city.toLowerCase().indexOf(q) !== -1) ||
                       (a.activite && a.activite.toLowerCase().indexOf(q) !== -1);
            });
        }

        res.sort(function (a, b) {
            if (a._dist != null && b._dist != null) return a._dist - b._dist;
            if (a._dist != null) return -1;
            if (b._dist != null) return 1;
            return (a.name || '').localeCompare(b.name || '');
        });

        return res;
    }

    function getFilteredActeurs() { return applyFilters(filterState); }
    function getFilteredActeursForMap() { return applyFilters(filterState, { ignoreRadius: true }); }

    // Compte pour un etat alternatif (utilise pour suggestions 0 resultat)
    function countFor(modifier) {
        var cloned = {
            radiusKm: filterState.radiusKm,
            materials: Object.assign({}, filterState.materials),
            groups: Object.assign({}, filterState.groups),
            search: filterState.search
        };
        if (modifier) modifier(cloned);
        return applyFilters(cloned).length;
    }

    // ------- Intro -------
    window.saActeursRenderIntro = function () {
        var el = document.getElementById('saActeursIntro');
        if (!el) return;
        var total = (window.ACTEURS_REEMPLOI || []).length;
        el.classList.add('sa-expandable');
        el.innerHTML = '' +
            '<h3>Les acteurs du batiment durable</h3>' +
            '<p style="margin:0;">' +
            '<strong>' + total + ' acteurs</strong> de la filiere reemploi des materiaux de construction en France : ' +
            'plateformes et marketplaces, <strong>AMO diagnostic PEMD</strong>, <strong>demonteurs selectifs</strong>, ' +
            'concepteurs et constructeurs engages, recycleurs, organismes de formation. ' +
            'Donnees utiles aux credits <strong>Mat 01</strong>, <strong>Mat 03</strong>, <strong>Wst 01/02</strong>, <strong>LE 04</strong>.' +
            '</p>' +
            '<div class="sa-acteurs-intro-source">' +
            'Source : <em>Carte des acteurs du reemploi des materiaux de construction</em> ' +
            '(carte-des-acteurs-du-reemploi.gogocarto.fr) sous licence <strong>ODbL</strong>. ' +
            'Snapshot local du 22 avril 2026. Codification materiau inferee par mots-cles — a verifier au cas par cas.' +
            '</div>' +
            '<button type="button" class="sa-acteurs-intro-toggle" onclick="saActeursToggleCollapse()">' +
            '<span class="sa-acteurs-intro-toggle-lbl">Voir plus</span>' +
            '<svg width="10" height="10" viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
            '</button>';
    };

    window.saActeursToggleCollapse = function () {
        var box = document.getElementById('saActeursIntro');
        if (!box) return;
        box.classList.toggle('sa-expanded');
        var lbl = box.querySelector('.sa-acteurs-intro-toggle-lbl');
        if (lbl) lbl.textContent = box.classList.contains('sa-expanded') ? 'Voir moins' : 'Voir plus';
    };

    // ------- Toolbar (filtres horizontal) -------
    window.saActeursRenderToolbar = function () {
        var host = document.getElementById('saActeursToolbar');
        if (!host) return;

        var hasSite = !!(window.saState && saState.lat != null && saState.lon != null);
        var html = '';

        // Row 1 : Recherche + Reset (le rayon a migre dans l'entete de la liste)
        html += '<div class="sa-acteurs-tb-row">' +
            '<input type="search" id="saActeursSearchInput" class="sa-acteurs-search" ' +
            'placeholder="Rechercher un acteur, une ville, une activite..." value="' + escHtml(filterState.search) + '">';

        html += '<button type="button" id="saActeursResetBtn" class="sa-acteurs-reset" title="Reinitialiser tous les filtres">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
            'Reinitialiser</button>';
        html += '</div>';

        // Row 2 : Materiaux (label au-dessus, checkbox dessous)
        html += '<div class="sa-acteurs-tb-row sa-acteurs-tb-row-stack">' +
            '<span class="sa-acteurs-tb-label">Materiaux</span>' +
            '<div class="sa-acteurs-chips">';
        Object.keys(MATERIAL_META).forEach(function (code) {
            var m = MATERIAL_META[code];
            var active = !!filterState.materials[code];
            html += '<label class="sa-acteurs-chip' + (active ? ' active' : '') + '">' +
                    '<input type="checkbox" data-material="' + code + '"' + (active ? ' checked' : '') + '>' +
                    code + ' · ' + m.label +
                    '</label>';
        });
        html += '</div></div>';

        // Row 3 : Roles (label au-dessus, checkbox dessous)
        html += '<div class="sa-acteurs-tb-row sa-acteurs-tb-row-stack">' +
            '<span class="sa-acteurs-tb-label">Roles</span>' +
            '<div class="sa-acteurs-chips">';
        Object.keys(GROUP_META).forEach(function (code) {
            var g = GROUP_META[code];
            var active = !!filterState.groups[code];
            html += '<label class="sa-acteurs-chip' + (active ? ' active' : '') + '">' +
                    '<input type="checkbox" data-group="' + code + '"' + (active ? ' checked' : '') + '>' +
                    g.label +
                    '</label>';
        });
        html += '</div></div>';

        host.innerHTML = html;

        // Bindings
        host.querySelectorAll('input[data-material]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var c = cb.getAttribute('data-material');
                filterState.materials[c] = cb.checked;
                saActeursRender();
            });
        });
        host.querySelectorAll('input[data-group]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var c = cb.getAttribute('data-group');
                filterState.groups[c] = cb.checked;
                saActeursRender();
            });
        });

        var searchEl = host.querySelector('#saActeursSearchInput');
        if (searchEl) {
            searchEl.addEventListener('input', function () {
                filterState.search = searchEl.value;
                clearTimeout(window._saActeursSearchDebounce);
                window._saActeursSearchDebounce = setTimeout(function () {
                    saActeursUpdateResults();
                }, 200);
            });
        }
        var resetBtn = host.querySelector('#saActeursResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                filterState = { radiusKm: DEFAULT_RADIUS_KM, materials: {}, groups: {}, search: '' };
                saActeursRender();
            });
        }
    };

    // ------- En-tete resultats -------
    function renderResultsHeader(filtered) {
        var el = document.getElementById('saActeursResultsHeader');
        if (!el) return;
        var n = filtered.length;
        var activeFilters = [];
        if (filterState.search) activeFilters.push('"' + filterState.search + '"');
        var mats = Object.keys(filterState.materials).filter(function (k) { return filterState.materials[k]; });
        if (mats.length) activeFilters.push(mats.join('+'));
        var grps = Object.keys(filterState.groups).filter(function (k) { return filterState.groups[k]; });
        if (grps.length) activeFilters.push(grps.length + ' role' + (grps.length > 1 ? 's' : ''));
        var hasSite = !!(window.saState && saState.lat != null && saState.lon != null);

        // Dropdown rayon : filtre la liste uniquement (carte inchangee)
        var radiusSelect = '';
        if (hasSite) {
            radiusSelect = '<label class="sa-acteurs-radius-pick" title="Filtre rayon autour du site (n\'affecte que la liste, pas la carte)">' +
                '<select id="saActeursRadiusSelect">';
            RADIUS_STEPS.forEach(function (r) {
                var lbl = (r === 9999) ? 'Tous' : (r + ' km');
                var sel = (filterState.radiusKm === r) ? ' selected' : '';
                radiusSelect += '<option value="' + r + '"' + sel + '>' + lbl + '</option>';
            });
            radiusSelect += '</select></label>';
        }

        el.innerHTML = '<span><span class="sa-acteurs-count-num">' + n + '</span> acteur' + (n > 1 ? 's' : '') +
            (activeFilters.length ? ' <span class="sa-acteurs-count-sub">· ' + escHtml(activeFilters.join(' · ')) + '</span>' : '') +
            '</span>' + radiusSelect;

        // Bind select change (doit etre fait apres innerHTML)
        var sel = document.getElementById('saActeursRadiusSelect');
        if (sel) {
            sel.addEventListener('change', function () {
                filterState.radiusKm = parseInt(sel.value, 10);
                saActeursUpdateResults();
            });
        }
    }

    // ------- Liste de cards -------
    window.saActeursRenderCards = function (filtered) {
        var host = document.getElementById('saActeursCardsList');
        if (!host) return;

        if (filtered.length === 0) {
            host.innerHTML = renderEmptyStateHtml();
            bindEmptyStateActions(host);
            return;
        }

        var rows = filtered.slice(0, CARDS_VISIBLE);
        var html = '';
        rows.forEach(function (a) {
            var groupMeta = GROUP_META[a.group] || GROUP_META.AUTRES;
            var matsHtml = (a.materials || []).map(function (m) {
                var meta = MATERIAL_META[m];
                var col = (meta && meta.color) || '#64748B';
                return '<span class="sa-acteurs-tag-mat" style="background:' + col + '1A;color:' + col + ';">' + escHtml(m) + '</span>';
            }).join('');

            var linksHtml = '';
            if (a.web) {
                var w = a.web.indexOf('http') === 0 ? a.web : ('http://' + a.web);
                linksHtml += '<a href="' + escHtml(w) + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
                    'Site</a>';
            }
            if (a.email) {
                linksHtml += '<a href="mailto:' + escHtml(a.email) + '" onclick="event.stopPropagation()">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
                    'Email</a>';
            }
            if (a.tel) {
                linksHtml += '<span class="sa-acteurs-contact-muted">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                    escHtml(a.tel) + '</span>';
            }

            var distStr = (a._dist != null) ? fmtDist(a._dist) + ' du site' : '';

            var cardCls = 'sa-acteurs-card' + (a._isPmcbZr ? ' sa-acteurs-card-pmcbzr' : '');
            var pmcbBadge = a._isPmcbZr
                ? '<span class="sa-acteurs-pmcbzr-badge" title="Point de collecte PMCB avec zone réemploi (source : ' + escHtml(a.sub_categories && a.sub_categories[0] || 'PMCB') + ')">Point de collecte</span>'
                : '';
            // Cible : bouton "zoom sur la carte" a cote du nom
            var locateBtn = '<button type="button" class="sa-acteurs-locate" ' +
                'data-locate-id="' + escHtml(a.id) + '" title="Centrer la carte sur cet acteur" aria-label="Centrer la carte">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>' +
                '<line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/>' +
                '<line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/>' +
                '</svg></button>';
            html += '<div class="' + cardCls + '" data-acteur-id="' + escHtml(a.id) + '"' +
                    ' data-lat="' + a.lat + '" data-lon="' + a.lon + '">' +
                '<div class="sa-acteurs-card-head">' +
                    '<div class="sa-acteurs-card-name">' + escHtml(a.name || '—') + ' ' + locateBtn + pmcbBadge + '</div>' +
                    (distStr ? '<div class="sa-acteurs-card-dist">' + distStr + '</div>' : '') +
                '</div>' +
                (a.activite ? '<div class="sa-acteurs-card-activite">' + escHtml(a.activite) + '</div>' : '') +
                '<div class="sa-acteurs-card-loc">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
                    escHtml(a.city || '') + ' ' + escHtml(a.postal || '') +
                '</div>' +
                '<div class="sa-acteurs-card-tags">' +
                    '<span class="sa-acteurs-tag-role" style="background:' + groupMeta.color + ';">' + escHtml(groupMeta.label.toUpperCase()) + '</span>' +
                    matsHtml +
                '</div>' +
                (linksHtml ? '<div class="sa-acteurs-card-links">' + linksHtml + '</div>' : '') +
            '</div>';
        });

        if (filtered.length > CARDS_VISIBLE) {
            html += '<div style="padding:10px 12px;text-align:center;color:#94A3B8;font-size:0.76rem;">' +
                CARDS_VISIBLE + ' premiers resultats sur ' + filtered.length + '. Affinez les filtres pour voir les autres.' +
            '</div>';
        }

        host.innerHTML = html;

        // Click cible (crosshair) -> zoom sur marker (PAS le clic sur la card entiere)
        host.querySelectorAll('.sa-acteurs-locate').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var id = btn.getAttribute('data-locate-id');
                focusActeurOnMap(id);
            });
        });
        // Click card -> uniquement ouverture volet lateral (pas de zoom carte)
        host.querySelectorAll('.sa-acteurs-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var id = card.getAttribute('data-acteur-id');
                // marquer card active
                host.querySelectorAll('.sa-acteurs-card.active').forEach(function (c) { c.classList.remove('active'); });
                card.classList.add('active');
                activeCardId = id;
                // ouvrir volet lateral (si drawer charge)
                if (typeof window.saOpenActeurDrawer === 'function') {
                    window.saOpenActeurDrawer(id);
                }
            });
            // hover -> highlight marker
            card.addEventListener('mouseenter', function () {
                var id = card.getAttribute('data-acteur-id');
                var m = markersById[id];
                if (m && m.setStyle) m.setStyle({ weight: 3, radius: 9 });
            });
            card.addEventListener('mouseleave', function () {
                var id = card.getAttribute('data-acteur-id');
                var m = markersById[id];
                if (m && m.setStyle) m.setStyle({ weight: 1.5, radius: 6 });
            });
        });
    };

    // ------- Empty state + suggestions -------
    function buildSuggestions() {
        var suggestions = [];
        var hasSite = !!(window.saState && saState.lat != null && saState.lon != null);

        // 1. Elargir rayon si site analyse
        if (hasSite && filterState.radiusKm < 9999) {
            var biggerSteps = RADIUS_STEPS.filter(function (r) { return r > filterState.radiusKm; });
            for (var i = 0; i < biggerSteps.length; i++) {
                var r = biggerSteps[i];
                var cnt = countFor(function (s) { s.radiusKm = r; });
                if (cnt > 0) {
                    suggestions.push({
                        label: 'Etendre le rayon a <strong>' + (r === 9999 ? 'Tous' : (r + ' km')) + '</strong>',
                        count: cnt,
                        action: function (rr) { return function () { filterState.radiusKm = rr; saActeursRender(); }; }(r)
                    });
                    break;
                }
            }
        }

        // 2. Retirer filtre materiaux
        var activeMats = Object.keys(filterState.materials).filter(function (k) { return filterState.materials[k]; });
        if (activeMats.length > 0) {
            var cntNoMat = countFor(function (s) { s.materials = {}; });
            if (cntNoMat > 0) {
                suggestions.push({
                    label: 'Retirer le filtre <strong>materiau</strong> (' + activeMats.join(', ') + ')',
                    count: cntNoMat,
                    action: function () { filterState.materials = {}; saActeursRender(); }
                });
            }
        }

        // 3. Retirer filtre roles
        var activeGrps = Object.keys(filterState.groups).filter(function (k) { return filterState.groups[k]; });
        if (activeGrps.length > 0) {
            var cntNoGrp = countFor(function (s) { s.groups = {}; });
            if (cntNoGrp > 0) {
                suggestions.push({
                    label: 'Retirer le filtre <strong>role</strong>',
                    count: cntNoGrp,
                    action: function () { filterState.groups = {}; saActeursRender(); }
                });
            }
        }

        // 4. Vider la recherche texte
        if (filterState.search && filterState.search.trim().length > 0) {
            var cntNoSearch = countFor(function (s) { s.search = ''; });
            if (cntNoSearch > 0) {
                suggestions.push({
                    label: 'Vider la recherche "<strong>' + escHtml(filterState.search) + '</strong>"',
                    count: cntNoSearch,
                    action: function () { filterState.search = ''; saActeursRender(); }
                });
            }
        }

        // 5. Tout reinitialiser (dernier recours)
        if (suggestions.length === 0) {
            var total = (window.ACTEURS_REEMPLOI || []).length;
            suggestions.push({
                label: 'Reinitialiser tous les filtres',
                count: total,
                action: function () {
                    filterState = { radiusKm: DEFAULT_RADIUS_KM, materials: {}, groups: {}, search: '' };
                    saActeursRender();
                }
            });
        }

        return suggestions.slice(0, 4);
    }

    // On stocke les actions dans une map globale pour les rebinder apres innerHTML
    var _suggestionActions = {};
    function renderEmptyStateHtml() {
        var suggestions = buildSuggestions();
        _suggestionActions = {};
        var html = '<div class="sa-acteurs-empty">' +
            '<div class="sa-acteurs-empty-icon">' +
                '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
            '</div>' +
            '<div>' +
                '<div class="sa-acteurs-empty-title">Aucun acteur ne correspond</div>' +
                '<div class="sa-acteurs-empty-text">Les filtres combines sont trop restrictifs. Essayez l\'une des suggestions ci-dessous :</div>' +
            '</div>' +
            '<div class="sa-acteurs-empty-suggestions">';
        suggestions.forEach(function (s, idx) {
            _suggestionActions[idx] = s.action;
            html += '<button type="button" class="sa-acteurs-empty-suggestion" data-sugg="' + idx + '">' +
                '<span>' + s.label + '</span>' +
                '<span class="sa-acteurs-empty-suggestion-count">' + s.count + '</span>' +
            '</button>';
        });
        html += '</div></div>';
        return html;
    }

    function bindEmptyStateActions(host) {
        host.querySelectorAll('[data-sugg]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-sugg'), 10);
                var act = _suggestionActions[idx];
                if (typeof act === 'function') act();
            });
        });
    }

    // ------- Carte -------
    function getSiteLatLon() {
        if (window.saState && saState.lat != null && saState.lon != null) {
            return [saState.lat, saState.lon];
        }
        return null;
    }

    window.saActeursInitMap = function () {
        var mapEl = document.getElementById('saActeursMap');
        if (!mapEl || typeof L === 'undefined') return;

        // Si deja init (vraie instance Leaflet), juste invalidateSize
        if (window.saActeursMap && typeof window.saActeursMap.invalidateSize === 'function') {
            window.saActeursMap.invalidateSize();
            return;
        }
        // Sinon on force null au cas ou une ref DOM trainait
        window.saActeursMap = null;

        var siteLL = getSiteLatLon() || [46.5, 2.5];

        var aerial = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg', {
            maxZoom: 19, attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>'
        });
        var plan = L.tileLayer('https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png', {
            maxZoom: 18, attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>'
        });
        var light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19, attribution: '&copy; OpenStreetMap &copy; CARTO'
        });

        window.saActeursMap = L.map(mapEl, {
            center: siteLL,
            zoom: getSiteLatLon() ? 10 : 6,
            layers: [aerial]
        });
        tileLayers = { aerial: aerial, plan: plan, light: light };

        markerLayer = L.layerGroup().addTo(window.saActeursMap);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(window.saActeursMap);

        // Safety : invalidateSize en cascade (containers flex peuvent mesurer 0 au debut)
        setTimeout(function () { if (window.saActeursMap) window.saActeursMap.invalidateSize(); }, 100);
        setTimeout(function () { if (window.saActeursMap) window.saActeursMap.invalidateSize(); }, 300);
        setTimeout(function () { if (window.saActeursMap) window.saActeursMap.invalidateSize(); }, 800);
        setTimeout(function () {
            if (window.saActeursMap) {
                window.saActeursMap.invalidateSize();
                saActeursUpdateMap();
            }
        }, 1200);

        saActeursUpdateMap();
    };

    window.saActeursSetMapLayer = function (name) {
        if (!window.saActeursMap || !tileLayers) return;
        Object.keys(tileLayers).forEach(function (k) {
            if (tileLayers[k] && window.saActeursMap.hasLayer(tileLayers[k])) {
                window.saActeursMap.removeLayer(tileLayers[k]);
            }
        });
        if (tileLayers[name]) window.saActeursMap.addLayer(tileLayers[name]);
        ['aerial', 'plan', 'light'].forEach(function (k) {
            var btn = document.getElementById('saActeursLayer' + k.charAt(0).toUpperCase() + k.slice(1));
            if (btn) btn.classList.toggle('active', k === name);
        });
    };

    window.saActeursUpdateMap = function () {
        if (!window.saActeursMap || !markerLayer) return;
        markerLayer.clearLayers();
        markersById = {};

        var siteLL = getSiteLatLon();
        if (siteLL) {
            if (siteMarker) siteMarker.remove();
            siteMarker = L.marker(siteLL, {
                icon: L.divIcon({
                    className: 'sa-acteurs-site-marker',
                    html: '<div style="width:18px;height:18px;border-radius:50%;background:#DC2626;border:3px solid #fff;box-shadow:0 0 0 2px #DC2626;"></div>',
                    iconSize: [18, 18], iconAnchor: [9, 9]
                })
            }).addTo(markerLayer).bindPopup('<strong>Site du projet</strong><br>' + siteLL[0].toFixed(5) + ', ' + siteLL[1].toFixed(5));

            // Note : le cercle "filterState.radiusKm" n'est plus dessine (remplace par
            // visualRadiusCircle adaptatif au zoom, cree par updateVisualRadius).
            if (radiusCircle) { radiusCircle.remove(); radiusCircle = null; }
            // Bind les events zoomend/moveend (une seule fois)
            bindVisualRadiusEvents();
            // Dessine/maj le cercle visuel adaptatif
            updateVisualRadius();
        }

        // Carte : on ignore le filtre de rayon (choix utilisateur : rayon = filtre liste uniquement)
        var filtered = getFilteredActeursForMap();
        var toDisplay = filtered.slice(0, MAX_MARKERS);
        toDisplay.forEach(function (a) {
            if (a.lat == null || a.lon == null) return;
            var color = acteurColor(a);
            // Zone réemploi PMCB : marker plus petit + forme carrée (divIcon) pour distinction visuelle
            var marker;
            if (a._isPmcbZr) {
                marker = L.marker([a.lat, a.lon], {
                    icon: L.divIcon({
                        className: 'sa-acteurs-marker-pmcbzr',
                        html: '<div style="width:10px;height:10px;background:' + color + ';border:1.5px solid #fff;box-shadow:0 0 0 1px ' + color + ';transform:rotate(45deg);"></div>',
                        iconSize: [14, 14], iconAnchor: [7, 7]
                    })
                }).addTo(markerLayer);
            } else {
                marker = L.circleMarker([a.lat, a.lon], {
                    radius: 6, color: '#fff', weight: 1.5,
                    fillColor: color, fillOpacity: 0.9
                }).addTo(markerLayer);
            }
            markersById[a.id] = marker;

            var groupMeta = GROUP_META[a.group] || GROUP_META.AUTRES;
            var matsHtml = (a.materials || []).map(function (m) {
                var meta = MATERIAL_META[m];
                var col = (meta && meta.color) || '#64748B';
                return '<span style="display:inline-block;padding:1px 5px;border-radius:3px;background:' + col + '20;color:' + col + ';font-size:0.68rem;font-weight:600;margin-right:2px;">' + escHtml(m) + '</span>';
            }).join('');
            var webHtml = '';
            if (a.web) {
                var w = a.web.indexOf('http') === 0 ? a.web : ('http://' + a.web);
                webHtml = '<a href="' + escHtml(w) + '" target="_blank" rel="noopener" style="color:#2563EB;">' + escHtml(a.web) + '</a><br>';
            }
            var distStr = (a._dist != null) ? fmtDist(a._dist) + ' du site' : '';

            var popup = '<div style="min-width:220px;max-width:280px;font-size:0.82rem;line-height:1.4;">' +
                '<div style="background:' + groupMeta.color + ';color:#fff;font-size:0.68rem;font-weight:700;letter-spacing:0.03em;padding:2px 6px;border-radius:3px;display:inline-block;margin-bottom:4px;">' + escHtml(groupMeta.label.toUpperCase()) + '</div><br>' +
                '<strong style="font-size:0.92rem;color:#0F172A;">' + escHtml(a.name || '—') + '</strong><br>' +
                '<span style="color:#64748B;font-size:0.75rem;">' + escHtml(a.activite || '') + '</span><br>' +
                '<div style="margin:6px 0;">' + matsHtml + '</div>' +
                (a.street ? '<span style="color:#475569;">' + escHtml(a.street) + '</span><br>' : '') +
                '<span style="color:#475569;">' + escHtml(a.postal || '') + ' ' + escHtml(a.city || '') + '</span><br>' +
                webHtml +
                (a.tel ? '<span style="color:#64748B;font-size:0.75rem;">' + escHtml(a.tel) + '</span><br>' : '') +
                (a.email ? '<a href="mailto:' + escHtml(a.email) + '" style="color:#2563EB;font-size:0.78rem;">' + escHtml(a.email) + '</a><br>' : '') +
                (distStr ? '<div style="margin-top:6px;color:#94A3B8;font-size:0.72rem;">' + distStr + '</div>' : '') +
                '</div>';
            marker.bindPopup(popup);

            // Click marker -> highlight card
            marker.on('click', function () {
                var cardEl = document.querySelector('.sa-acteurs-card[data-acteur-id="' + a.id + '"]');
                if (cardEl) {
                    document.querySelectorAll('.sa-acteurs-card.active').forEach(function (c) { c.classList.remove('active'); });
                    cardEl.classList.add('active');
                    cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    activeCardId = a.id;
                }
            });
        });

        // Pas de fitBounds automatique a chaque update : le rayon ne pilote plus la carte.
        // Le zoom/pan reste celui de l'utilisateur. Fit initial gere par saActeursInitMap.
    };

    function focusActeurOnMap(id) {
        var m = markersById[id];
        if (!m || !window.saActeursMap) return;
        var ll = m.getLatLng();
        window.saActeursMap.setView(ll, 14, { animate: true });
        setTimeout(function () { m.openPopup(); }, 400);
    }

    // ------- Orchestration -------
    window.saActeursUpdateResults = function () {
        // Met a jour uniquement la liste + carte sans re-rendre toolbar (evite reset focus input)
        var filtered = getFilteredActeurs();
        renderResultsHeader(filtered);
        saActeursRenderCards(filtered);
        saActeursUpdateMap();
    };

    window.saActeursRender = function () {
        // Inject les points Zone réemploi PMCB (une seule fois)
        injectPmcbZoneReemploi();
        // Masque l'encadre intro (desactive par l'utilisateur)
        var __introEl = document.getElementById('saActeursIntro');
        if (__introEl) __introEl.style.display = 'none';
        if (!window.ACTEURS_REEMPLOI || !Array.isArray(window.ACTEURS_REEMPLOI) || window.ACTEURS_REEMPLOI.length === 0) {
            var host = document.getElementById('saActeursCardsList');
            if (host) host.innerHTML = '<div class="sa-acteurs-empty">' +
                '<div class="sa-acteurs-empty-title" style="color:#DC2626;">Dataset non charge</div>' +
                '<div class="sa-acteurs-empty-text">Verifiez que <code>data/acteurs_reemploi/acteurs_reemploi_dataset.js</code> est bien inclus dans index.html.</div>' +
                '</div>';
            return;
        }
        saActeursRenderIntro();
        saActeursRenderToolbar();
        var filtered = getFilteredActeurs();
        renderResultsHeader(filtered);
        saActeursRenderCards(filtered);
        saActeursUpdateMap();
    };

})();
