/* =========================================================================
 * EXUTOIRES & COLLECTE PMCB - Annuaire cartographique
 * ---------------------------------------------------------------------------
 * Dataset local : collecte_pmcb_dataset.js
 *   window.COLLECTE_PMCB      : array de points (4632)
 *   window.COLLECTE_PMCB_META : metadata (materials, types, audiences, sources)
 *
 * Sources :
 *   - Ecomineero : CSV public REP PMCB mineraux (4252 points)
 *   - Valdelia   : KML Google MyMaps + geocodage BAN (380 points)
 *
 * Credits BREEAM : Wst 01/02 principalement ; Mat 03 pour zone-reemploi
 * et points Valdelia (materiaux acceptes explicites).
 * =========================================================================*/

(function () {
    'use strict';

    // NOTE: <div id="saPmcbMap"> expose automatiquement window.saPmcbMap
    // comme reference vers l'element DOM (named element access HTML5).
    // On nullify cette reference au chargement du script pour que les checks
    // `if (window.saPmcbMap)` fonctionnent correctement avant init Leaflet.
    if (!(window.saPmcbMap && typeof window.saPmcbMap.invalidateSize === 'function')) {
        window.saPmcbMap = null;
    }

    var DEFAULT_RADIUS_KM = 25;
    var RADIUS_STEPS = [10, 25, 50, 100, 200, 9999]; // 9999 = tous
    var MAX_MARKERS = 300;
    var CARDS_VISIBLE = 80;

    // ------- Etat -------
    var filterState = {
        radiusKm: DEFAULT_RADIUS_KM,
        materials: {},      // code -> bool
        types: {},          // code -> bool
        audience: {},       // code -> bool
        sources: {},        // code -> bool
        zoneReemploiOnly: false,
        search: ''
    };

    var markerLayer = null;
    var siteMarker = null;
    var radiusCircle = null;          // obsolete (ex-filter)
    var visualRadiusCircle = null;    // zoom-adaptive scale indicator
    var visualRadiusLayer = null;     // layer dedie (PAS clearLayers par updateMap)
    var __visualRadiusBound = false;
    var tileLayers = null;
    var markersById = {};
    var activeCardId = null;
    var _suggestionActions = {};

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
        var map = window.saPmcbMap;
        if (!map || typeof map.getBounds !== 'function') return;
        var siteLL = getSiteLatLon();
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
            if (!widthM || widthM <= 0) return;
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
        var map = window.saPmcbMap;
        if (!map || __visualRadiusBound) return;
        if (typeof map.on !== 'function') return;
        map.on('zoomend moveend', updateVisualRadius);
        __visualRadiusBound = true;
    }

    // ------- Metadata access -------
    function META() { return window.COLLECTE_PMCB_META || { materials:{}, types:{}, audiences:{}, sources:{} }; }

    // Tooltips detailles pour les badges source (affiches au survol)
    var SOURCE_TOOLTIPS = {
        ECOMINERO: 'Ecominéro — éco-organisme agréé REP PMCB pour la filière des déchets minéraux du bâtiment ' +
                   '(béton, briques, tuiles, gravats inertes, enrobés non goudronneux). ' +
                   'Catégorie 1 PMCB. Opérationnel depuis 2023 suite à la loi AGEC.',
        VALDELIA:  'Valdélia — éco-organisme agréé REP PMCB pour les matériaux non-inertes du bâtiment ' +
                   '(bois, plâtre, plastiques, métaux, huisseries, isolants laines, membranes bitumineuses). ' +
                   'Catégorie 2 PMCB. Réseau initialement dédié au mobilier pro, étendu au bâtiment en 2023.',
        FERVAM:    'FERVAM — Fédération nationale des Entreprises de Recyclage et Valorisation du Matériel. ' +
                   'Réseau historique de collecte des menuiseries en fin de vie (fenêtres, portes, volets), ' +
                   'intégré au dispositif REP PMCB depuis 2023.'
    };
    function getSourceTooltip(src) {
        return SOURCE_TOOLTIPS[src] || ((META().sources[src] || {}).org_type) || ((META().sources[src] || {}).description) || '';
    }

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
    function pointColor(p) {
        // Priorite : zone reemploi > source
        if (p.types && p.types.indexOf('ZONE_REEMPLOI') !== -1) return '#2E7D32';
        var meta = META().sources[p.source];
        return (meta && meta.color) || '#64748B';
    }

    // Heuristique : inferer un type descriptif quand la source ne le precise pas.
    // Retourne { label, color } ou null si un type existe deja dans p.types.
    var NEGOCE_BRANDS = ['BIGMAT', 'BIG MAT', 'CHAUSSON', 'POINT P', 'POINT.P', 'GEDIMAT',
                         'SAMSE', 'DORAS', 'VM MATERIAUX', 'VM MAT', 'TOUT FAIRE',
                         'RESEAU PRO', 'RESEAU-PRO', 'LAFARGE', 'CEMEX', 'PROBOIS',
                         'WOLSELEY', 'BATI UN', 'BATIUN', 'PROLIANS', 'LES MATERIAUX'];
    function inferPointType(p) {
        // Si type(s) deja defini (hors ZONE_REEMPLOI qui est un flag secondaire), on skip
        var declared = (p.types || []).filter(function (t) { return t !== 'ZONE_REEMPLOI'; });
        if (declared.length) return null;
        var n = (p.name || '').toUpperCase();
        var aud = p.audience || [];
        // Match par mots-cles (ordre de priorite)
        if (/D[EÉ]CH[EÉ]T+[EÉ]?RIE/.test(n)) {
            return { label: 'Déchèterie', color: '#1976D2' };
        }
        if (/CARRI[EÈÉ]RE/.test(n)) {
            return { label: 'Carrière (accueil inertes)', color: '#8D6E63' };
        }
        if (/RECYCL|VALORIS|D[EÉ]BLAIS|\bISDI\b/.test(n)) {
            return { label: 'Plateforme recyclage / ISDI', color: '#00897B' };
        }
        if (/ENROB[EÉ]S|\bBETON\b|\bB[EÉ]TON\b|TRANSPORT/.test(n)) {
            return { label: 'Industriel (béton/enrobés)', color: '#546E7A' };
        }
        for (var i = 0; i < NEGOCE_BRANDS.length; i++) {
            if (n.indexOf(NEGOCE_BRANDS[i]) !== -1) {
                return { label: 'Négoce matériaux', color: '#5E35B2' };
            }
        }
        // Fallback par audience
        if (aud.indexOf('PARTICULIER') !== -1) {
            return { label: 'Site ouvert tout public', color: '#1976D2' };
        }
        if (aud.indexOf('PRO') !== -1 || aud.indexOf('ARTISAN') !== -1) {
            return { label: 'Site réservé pros', color: '#00796B' };
        }
        return { label: 'Type non précisé', color: '#94A3B8' };
    }

    // ------- Filtrage -------
    function applyFilters(state, opts) {
        opts = opts || {};
        var all = window.COLLECTE_PMCB || [];
        var lat = (window.saState && saState.lat) ? saState.lat : null;
        var lon = (window.saState && saState.lon) ? saState.lon : null;

        var activeMats = Object.keys(state.materials).filter(function (k) { return state.materials[k]; });
        var activeTypes = Object.keys(state.types).filter(function (k) { return state.types[k]; });
        var activeAud = Object.keys(state.audience).filter(function (k) { return state.audience[k]; });
        var activeSrc = Object.keys(state.sources).filter(function (k) { return state.sources[k]; });
        var q = (state.search || '').toLowerCase().trim();

        var res = all.map(function (p) {
            var dist = null;
            if (lat != null && lon != null && p.lat != null && p.lon != null) {
                dist = haversineKm(lat, lon, p.lat, p.lon);
            }
            return Object.assign({}, p, { _dist: dist });
        });

        if (!opts.ignoreRadius && lat != null && lon != null && state.radiusKm < 9999) {
            res = res.filter(function (p) { return p._dist != null && p._dist <= state.radiusKm; });
        }

        if (activeMats.length > 0) {
            res = res.filter(function (p) {
                var mats = p.materials || [];
                for (var i = 0; i < mats.length; i++) {
                    if (activeMats.indexOf(mats[i]) !== -1) return true;
                }
                return false;
            });
        }

        if (activeTypes.length > 0) {
            res = res.filter(function (p) {
                var t = p.types || [];
                for (var i = 0; i < t.length; i++) {
                    if (activeTypes.indexOf(t[i]) !== -1) return true;
                }
                return false;
            });
        }

        if (activeAud.length > 0) {
            res = res.filter(function (p) {
                var a = p.audience || [];
                for (var i = 0; i < a.length; i++) {
                    if (activeAud.indexOf(a[i]) !== -1) return true;
                }
                return false;
            });
        }

        if (activeSrc.length > 0) {
            res = res.filter(function (p) { return activeSrc.indexOf(p.source) !== -1; });
        }

        if (state.zoneReemploiOnly) {
            res = res.filter(function (p) { return (p.types || []).indexOf('ZONE_REEMPLOI') !== -1; });
        }

        if (q.length > 0) {
            res = res.filter(function (p) {
                return (p.name && p.name.toLowerCase().indexOf(q) !== -1) ||
                       (p.city && p.city.toLowerCase().indexOf(q) !== -1) ||
                       (p.postcode && p.postcode.toLowerCase().indexOf(q) !== -1);
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

    function getFiltered() { return applyFilters(filterState); }
    function getFilteredForMap() { return applyFilters(filterState, { ignoreRadius: true }); }

    function countFor(modifier) {
        var cloned = {
            radiusKm: filterState.radiusKm,
            materials: Object.assign({}, filterState.materials),
            types: Object.assign({}, filterState.types),
            audience: Object.assign({}, filterState.audience),
            sources: Object.assign({}, filterState.sources),
            zoneReemploiOnly: filterState.zoneReemploiOnly,
            search: filterState.search
        };
        if (modifier) modifier(cloned);
        return applyFilters(cloned).length;
    }

    // ------- Intro -------
    window.saPmcbRenderIntro = function () {
        var el = document.getElementById('saPmcbIntro');
        if (!el) return;
        var total = (window.COLLECTE_PMCB || []).length;
        var bySrc = (META().by_source) || {};
        el.classList.add('sa-expandable');
        el.innerHTML = '' +
            '<h3>Exutoires &amp; collecte PMCB</h3>' +
            '<p style="margin:0;">' +
            '<strong>' + total + ' points de collecte</strong> du reseau REP PMCB ' +
            '(Responsabilite Elargie du Producteur - Batiment). Decheteries publiques, decheteries pro, ' +
            'distributeurs / negoces, zones de reemploi. Utile aux credits <strong>Wst 01 / Wst 02</strong> ' +
            '(gestion des dechets de chantier) et, pour les points flagges <strong>zone reemploi</strong>, ' +
            'au credit <strong>Mat 03</strong>.' +
            '</p>' +
            '<div class="sa-acteurs-intro-source">' +
            'Sources : ' +
            '<strong>Ecominero</strong> (eco-organisme REP PMCB mineraux) - CSV public ' +
            '<em>ecominero.fr/wp-content/uploads/csvs/carte/markers.csv</em> (' + (bySrc.ECOMINERO || 0) + ' points). ' +
            '<strong>Valdelia</strong> (eco-organisme REP PMCB multi-materiaux) - KML public Google MyMaps + geocodage ' +
            '<em>api-adresse.data.gouv.fr</em> / BAN (' + (bySrc.VALDELIA || 0) + ' points). ' +
            '<strong>FERVAM</strong> (filiere menuiseries fin de vie - fenetres, portes, fermetures) - KML public Google MyMaps + geocodage BAN ' +
            '(' + (bySrc.FERVAM || 0) + ' points : points d\'apport volontaire + enlevement chantier + enlevement entreprise). ' +
            'Snapshot du 22 avril 2026. Valobat et Ecomaison (2 autres eco-organismes REP PMCB) non couverts a ce jour ' +
            '(Cloudflare WAF pour Valobat, SPA privee pour Ecomaison) - a completer.' +
            '</div>' +
            '<button type="button" class="sa-acteurs-intro-toggle" onclick="saPmcbToggleCollapse()">' +
            '<span class="sa-pmcb-intro-toggle-lbl">Voir plus</span>' +
            '<svg width="10" height="10" viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
            '</button>';
    };
    window.saPmcbToggleCollapse = function () {
        var box = document.getElementById('saPmcbIntro');
        if (!box) return;
        box.classList.toggle('sa-expanded');
        var lbl = box.querySelector('.sa-pmcb-intro-toggle-lbl');
        if (lbl) lbl.textContent = box.classList.contains('sa-expanded') ? 'Voir moins' : 'Voir plus';
    };

    // ------- Toolbar -------
    window.saPmcbRenderToolbar = function () {
        var host = document.getElementById('saPmcbToolbar');
        if (!host) return;

        var meta = META();
        var hasSite = !!(window.saState && saState.lat != null && saState.lon != null);
        var html = '';

        // Row 1 : Recherche + Reset (le rayon a migre dans l'entete de la liste)
        html += '<div class="sa-acteurs-tb-row">' +
            '<input type="search" id="saPmcbSearchInput" class="sa-acteurs-search" ' +
            'placeholder="Rechercher par nom, ville ou code postal..." value="' + escHtml(filterState.search) + '">';

        html += '<button type="button" id="saPmcbResetBtn" class="sa-acteurs-reset" title="Reinitialiser tous les filtres">' +
            '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
            'Reinitialiser</button>';
        html += '</div>';

        // Row 2 : Type de point (checkbox neutre, sans arrondi ni couleurs)
        html += '<div class="sa-acteurs-tb-row">' +
            '<span class="sa-acteurs-tb-label">Type</span>' +
            '<div class="sa-acteurs-chips">';
        Object.keys(meta.types || {}).forEach(function (code) {
            var t = meta.types[code];
            var active = !!filterState.types[code];
            html += '<label class="sa-acteurs-chip' + (active ? ' active' : '') + '">' +
                    '<input type="checkbox" data-type="' + code + '"' + (active ? ' checked' : '') + '>' +
                    escHtml(t.label) +
                    '</label>';
        });
        // Raccourci BREEAM Mat 03
        var zrActive = !!filterState.zoneReemploiOnly;
        html += '<label class="sa-acteurs-chip sa-pmcb-chip-zr' + (zrActive ? ' active' : '') + '" title="Filtre rapide BREEAM Mat 03 : uniquement les sites flagges zone reemploi">' +
            '<input type="checkbox" id="saPmcbZrOnly"' + (zrActive ? ' checked' : '') + '>' +
            'BREEAM Mat 03 uniquement' +
            '</label>';
        html += '</div></div>';

        // Row 3 : Materiaux (checkbox neutre)
        html += '<div class="sa-acteurs-tb-row">' +
            '<span class="sa-acteurs-tb-label">Materiaux</span>' +
            '<div class="sa-acteurs-chips">';
        Object.keys(meta.materials || {}).forEach(function (code) {
            var m = meta.materials[code];
            var active = !!filterState.materials[code];
            html += '<label class="sa-acteurs-chip' + (active ? ' active' : '') + '">' +
                    '<input type="checkbox" data-material="' + code + '"' + (active ? ' checked' : '') + '>' +
                    (m.short || code) + ' · ' + escHtml(m.label) +
                    '</label>';
        });
        html += '</div></div>';

        // Row 4 : Audience + Sources (checkbox neutre, compact)
        html += '<div class="sa-acteurs-tb-row">' +
            '<span class="sa-acteurs-tb-label">Public</span>' +
            '<div class="sa-acteurs-chips">';
        Object.keys(meta.audiences || {}).forEach(function (code) {
            var a = meta.audiences[code];
            var active = !!filterState.audience[code];
            html += '<label class="sa-acteurs-chip' + (active ? ' active' : '') + '">' +
                    '<input type="checkbox" data-audience="' + code + '"' + (active ? ' checked' : '') + '>' +
                    escHtml(a.label) +
                    '</label>';
        });
        html += '</div>' +
            '<span class="sa-acteurs-tb-label" style="margin-left:12px;">Source</span>' +
            '<div class="sa-acteurs-chips">';
        Object.keys(meta.sources || {}).forEach(function (code) {
            var s = meta.sources[code];
            var active = !!filterState.sources[code];
            html += '<label class="sa-acteurs-chip' + (active ? ' active' : '') + '">' +
                    '<input type="checkbox" data-source="' + code + '"' + (active ? ' checked' : '') + '>' +
                    escHtml(s.label) +
                    '</label>';
        });
        html += '</div></div>';

        host.innerHTML = html;

        // Bindings
        host.querySelectorAll('input[data-material]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var c = cb.getAttribute('data-material');
                filterState.materials[c] = cb.checked;
                saPmcbRender();
            });
        });
        host.querySelectorAll('input[data-type]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var c = cb.getAttribute('data-type');
                filterState.types[c] = cb.checked;
                saPmcbRender();
            });
        });
        host.querySelectorAll('input[data-audience]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var c = cb.getAttribute('data-audience');
                filterState.audience[c] = cb.checked;
                saPmcbRender();
            });
        });
        host.querySelectorAll('input[data-source]').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var c = cb.getAttribute('data-source');
                filterState.sources[c] = cb.checked;
                saPmcbRender();
            });
        });
        var zrCb = host.querySelector('#saPmcbZrOnly');
        if (zrCb) {
            zrCb.addEventListener('change', function () {
                filterState.zoneReemploiOnly = zrCb.checked;
                saPmcbRender();
            });
        }

        var searchEl = host.querySelector('#saPmcbSearchInput');
        if (searchEl) {
            searchEl.addEventListener('input', function () {
                filterState.search = searchEl.value;
                clearTimeout(window._saPmcbSearchDebounce);
                window._saPmcbSearchDebounce = setTimeout(function () {
                    saPmcbUpdateResults();
                }, 200);
            });
        }
        var resetBtn = host.querySelector('#saPmcbResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                filterState = {
                    radiusKm: DEFAULT_RADIUS_KM,
                    materials: {}, types: {}, audience: {}, sources: {},
                    zoneReemploiOnly: false, search: ''
                };
                saPmcbRender();
            });
        }
    };

    // ------- Header -------
    function renderResultsHeader(filtered) {
        var el = document.getElementById('saPmcbResultsHeader');
        if (!el) return;
        var n = filtered.length;
        var activeFilters = [];
        if (filterState.search) activeFilters.push('"' + filterState.search + '"');
        var mats = Object.keys(filterState.materials).filter(function (k) { return filterState.materials[k]; });
        if (mats.length) activeFilters.push(mats.join('+'));
        var types = Object.keys(filterState.types).filter(function (k) { return filterState.types[k]; });
        if (types.length) activeFilters.push(types.length + ' type' + (types.length > 1 ? 's' : ''));
        var auds = Object.keys(filterState.audience).filter(function (k) { return filterState.audience[k]; });
        if (auds.length) activeFilters.push(auds.join('+'));
        var srcs = Object.keys(filterState.sources).filter(function (k) { return filterState.sources[k]; });
        if (srcs.length) activeFilters.push(srcs.join('+'));
        if (filterState.zoneReemploiOnly) activeFilters.push('Mat 03');
        var hasSite = !!(window.saState && saState.lat != null && saState.lon != null);

        // Dropdown rayon : filtre la liste uniquement (carte inchangee)
        var radiusSelect = '';
        if (hasSite) {
            radiusSelect = '<label class="sa-acteurs-radius-pick" title="Filtre rayon autour du site (n\'affecte que la liste, pas la carte)">' +
                '<select id="saPmcbRadiusSelect">';
            RADIUS_STEPS.forEach(function (r) {
                var lbl = (r === 9999) ? 'Tous' : (r + ' km');
                var sel = (filterState.radiusKm === r) ? ' selected' : '';
                radiusSelect += '<option value="' + r + '"' + sel + '>' + lbl + '</option>';
            });
            radiusSelect += '</select></label>';
        }

        el.innerHTML = '<span><span class="sa-acteurs-count-num">' + n + '</span> point' + (n > 1 ? 's' : '') + ' de collecte' +
            (activeFilters.length ? ' <span class="sa-acteurs-count-sub">· ' + escHtml(activeFilters.join(' · ')) + '</span>' : '') +
            '</span>' + radiusSelect;

        var sel = document.getElementById('saPmcbRadiusSelect');
        if (sel) {
            sel.addEventListener('change', function () {
                filterState.radiusKm = parseInt(sel.value, 10);
                saPmcbUpdateResults();
            });
        }
    }

    // ------- Cards -------
    window.saPmcbRenderCards = function (filtered) {
        var host = document.getElementById('saPmcbCardsList');
        if (!host) return;

        if (filtered.length === 0) {
            host.innerHTML = renderEmptyStateHtml();
            bindEmptyStateActions(host);
            return;
        }

        var meta = META();
        var rows = filtered.slice(0, CARDS_VISIBLE);
        var html = '';
        rows.forEach(function (p) {
            var srcMeta = meta.sources[p.source] || { label: p.source, color: '#64748B' };
            var typeHtml = (p.types || []).map(function (code) {
                var t = meta.types[code];
                if (!t) return '';
                return '<span class="sa-pmcb-tag-type" style="background:' + t.color + '1A;color:' + t.color + ';border:1px solid ' + t.color + '55;">' + escHtml(t.label) + '</span>';
            }).join('');
            // Inference type si source non renseignee
            if (!typeHtml) {
                var inferred = inferPointType(p);
                if (inferred) {
                    typeHtml = '<span class="sa-pmcb-tag-type sa-pmcb-tag-inferred" ' +
                        'style="background:' + inferred.color + '1A;color:' + inferred.color + ';border:1px solid ' + inferred.color + '55;" ' +
                        'title="Type déduit du nom et de l\'audience (information non présente dans la source Ecominéro).">' +
                        escHtml(inferred.label) + ' ·&nbsp;déduit</span>';
                }
            }
            var matsHtml = (p.materials || []).map(function (code) {
                var m = meta.materials[code];
                if (!m) return '';
                var col = m.color;
                return '<span class="sa-acteurs-tag-mat" style="background:' + col + '1A;color:' + col + ';" title="' + escHtml(m.label) + '">' + (m.short || code) + '</span>';
            }).join('');

            var linksHtml = '';
            if (p.phone) {
                linksHtml += '<span class="sa-acteurs-contact-muted">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
                    escHtml(p.phone) + '</span>';
            }
            if (p.email) {
                linksHtml += '<a href="mailto:' + escHtml(p.email) + '" onclick="event.stopPropagation()">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
                    'Email</a>';
            }
            if (p.url) {
                var w = p.url.indexOf('http') === 0 ? p.url : ('http://' + p.url);
                linksHtml += '<a href="' + escHtml(w) + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' +
                    'Fiche</a>';
            }

            // Flags : texte noir simple, separes par un tiret
            var flagsHtml = (p.flags || []).map(function (f) { return escHtml(f); }).join(' — ');

            var distStr = (p._dist != null) ? fmtDist(p._dist) + ' du site' : '';

            // Geocoding precision warning (city-level for addresses that couldn't be resolved to street)
            var geoHint = '';
            if ((p.source === 'VALDELIA' || p.source === 'FERVAM') && p.geo_prec === 'city') {
                geoHint = '<span class="sa-pmcb-geo-hint" title="Coordonnees au centre ville (adresse imprecise).">~ localisation commune</span>';
            }

            // Cible : bouton "zoom sur la carte"
            var locateBtn = '<button type="button" class="sa-acteurs-locate" ' +
                'data-locate-id="' + escHtml(p.id) + '" title="Centrer la carte sur ce point" aria-label="Centrer la carte">' +
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>' +
                '<line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/>' +
                '<line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/>' +
                '</svg></button>';
            html += '<div class="sa-acteurs-card sa-pmcb-card" data-pmcb-id="' + escHtml(p.id) + '"' +
                    ' data-lat="' + p.lat + '" data-lon="' + p.lon + '">' +
                '<div class="sa-acteurs-card-head">' +
                    '<div class="sa-acteurs-card-name">' + escHtml(p.name || 'Point de collecte') + ' ' + locateBtn + '</div>' +
                    (distStr ? '<div class="sa-acteurs-card-dist">' + distStr + '</div>' : '') +
                '</div>' +
                '<div class="sa-pmcb-source-line">' +
                    '<span class="sa-pmcb-source-badge" style="background:' + srcMeta.color + ';" ' +
                        'title="' + escHtml(getSourceTooltip(p.source)) + '">' +
                        escHtml(srcMeta.label.toUpperCase()) +
                    '</span>' +
                    geoHint +
                '</div>' +
                '<div class="sa-acteurs-card-loc">' +
                    '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
                    escHtml(p.address || '') + (p.address ? ', ' : '') + escHtml(p.postcode || '') + ' ' + escHtml(p.city || '') +
                '</div>' +
                (typeHtml ? '<div class="sa-pmcb-tags-row">' + typeHtml + '</div>' : '') +
                (matsHtml ? '<div class="sa-acteurs-card-tags">' + matsHtml + '</div>' : '') +
                (flagsHtml ? '<div class="sa-pmcb-flags-row">' + flagsHtml + '</div>' : '') +
                (linksHtml ? '<div class="sa-acteurs-card-links">' + linksHtml + '</div>' : '') +
            '</div>';
        });

        if (filtered.length > CARDS_VISIBLE) {
            html += '<div style="padding:10px 12px;text-align:center;color:#94A3B8;font-size:0.76rem;">' +
                CARDS_VISIBLE + ' premiers resultats sur ' + filtered.length + '. Affinez les filtres pour voir les autres.' +
            '</div>';
        }

        host.innerHTML = html;

        // Click cible (crosshair) -> zoom sur marker
        host.querySelectorAll('.sa-acteurs-locate').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var id = btn.getAttribute('data-locate-id');
                focusPointOnMap(id);
            });
        });
        host.querySelectorAll('.sa-pmcb-card').forEach(function (card) {
            card.addEventListener('click', function () {
                var id = card.getAttribute('data-pmcb-id');
                // Clic sur la card : marque active (pas de zoom carte)
                host.querySelectorAll('.sa-pmcb-card.active').forEach(function (c) { c.classList.remove('active'); });
                card.classList.add('active');
                activeCardId = id;
            });
            card.addEventListener('mouseenter', function () {
                var id = card.getAttribute('data-pmcb-id');
                var m = markersById[id];
                if (m && m.setStyle) m.setStyle({ weight: 3, radius: 9 });
            });
            card.addEventListener('mouseleave', function () {
                var id = card.getAttribute('data-pmcb-id');
                var m = markersById[id];
                if (m && m.setStyle) m.setStyle({ weight: 1.5, radius: 6 });
            });
        });
    };

    // ------- Empty state + suggestions -------
    function buildSuggestions() {
        var suggestions = [];
        var hasSite = !!(window.saState && saState.lat != null && saState.lon != null);

        if (hasSite && filterState.radiusKm < 9999) {
            var bigger = RADIUS_STEPS.filter(function (r) { return r > filterState.radiusKm; });
            for (var i = 0; i < bigger.length; i++) {
                var r = bigger[i];
                var cnt = countFor(function (s) { s.radiusKm = r; });
                if (cnt > 0) {
                    suggestions.push({
                        label: 'Etendre le rayon a <strong>' + (r === 9999 ? 'Tous' : (r + ' km')) + '</strong>',
                        count: cnt,
                        action: function (rr) { return function () { filterState.radiusKm = rr; saPmcbRender(); }; }(r)
                    });
                    break;
                }
            }
        }
        var activeMats = Object.keys(filterState.materials).filter(function (k) { return filterState.materials[k]; });
        if (activeMats.length > 0) {
            var cntNoMat = countFor(function (s) { s.materials = {}; });
            if (cntNoMat > 0) suggestions.push({
                label: 'Retirer le filtre <strong>materiau</strong> (' + activeMats.join(', ') + ')',
                count: cntNoMat,
                action: function () { filterState.materials = {}; saPmcbRender(); }
            });
        }
        var activeTypes = Object.keys(filterState.types).filter(function (k) { return filterState.types[k]; });
        if (activeTypes.length > 0) {
            var cntNoType = countFor(function (s) { s.types = {}; });
            if (cntNoType > 0) suggestions.push({
                label: 'Retirer le filtre <strong>type</strong>',
                count: cntNoType,
                action: function () { filterState.types = {}; saPmcbRender(); }
            });
        }
        if (filterState.zoneReemploiOnly) {
            var cntNoZr = countFor(function (s) { s.zoneReemploiOnly = false; });
            if (cntNoZr > 0) suggestions.push({
                label: 'Inclure aussi les points <strong>hors zone reemploi</strong>',
                count: cntNoZr,
                action: function () { filterState.zoneReemploiOnly = false; saPmcbRender(); }
            });
        }
        if (filterState.search && filterState.search.trim().length > 0) {
            var cntNoSearch = countFor(function (s) { s.search = ''; });
            if (cntNoSearch > 0) suggestions.push({
                label: 'Vider la recherche "<strong>' + escHtml(filterState.search) + '</strong>"',
                count: cntNoSearch,
                action: function () { filterState.search = ''; saPmcbRender(); }
            });
        }
        if (suggestions.length === 0) {
            var total = (window.COLLECTE_PMCB || []).length;
            suggestions.push({
                label: 'Reinitialiser tous les filtres',
                count: total,
                action: function () {
                    filterState = {
                        radiusKm: DEFAULT_RADIUS_KM,
                        materials: {}, types: {}, audience: {}, sources: {},
                        zoneReemploiOnly: false, search: ''
                    };
                    saPmcbRender();
                }
            });
        }
        return suggestions.slice(0, 4);
    }

    function renderEmptyStateHtml() {
        var suggestions = buildSuggestions();
        _suggestionActions = {};
        var html = '<div class="sa-acteurs-empty">' +
            '<div class="sa-acteurs-empty-icon">' +
                '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
            '</div>' +
            '<div>' +
                '<div class="sa-acteurs-empty-title">Aucun point de collecte ne correspond</div>' +
                '<div class="sa-acteurs-empty-text">Les filtres sont trop restrictifs. Essayez :</div>' +
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

    // ------- Map -------
    function getSiteLatLon() {
        if (window.saState && saState.lat != null && saState.lon != null) {
            return [saState.lat, saState.lon];
        }
        return null;
    }

    window.saPmcbInitMap = function () {
        var mapEl = document.getElementById('saPmcbMap');
        if (!mapEl || typeof L === 'undefined') return;

        // Si deja init (vraie instance Leaflet), juste invalidateSize
        if (window.saPmcbMap && typeof window.saPmcbMap.invalidateSize === 'function') {
            window.saPmcbMap.invalidateSize();
            return;
        }
        // Sinon on force null au cas ou une ref DOM trainait
        window.saPmcbMap = null;

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

        window.saPmcbMap = L.map(mapEl, {
            center: siteLL,
            zoom: getSiteLatLon() ? 10 : 6,
            layers: [aerial]
        });
        tileLayers = { aerial: aerial, plan: plan, light: light };

        markerLayer = L.layerGroup().addTo(window.saPmcbMap);
        L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(window.saPmcbMap);

        setTimeout(function () { if (window.saPmcbMap) window.saPmcbMap.invalidateSize(); }, 100);
        setTimeout(function () { if (window.saPmcbMap) window.saPmcbMap.invalidateSize(); }, 300);
        setTimeout(function () { if (window.saPmcbMap) window.saPmcbMap.invalidateSize(); }, 800);
        setTimeout(function () {
            if (window.saPmcbMap) { window.saPmcbMap.invalidateSize(); saPmcbUpdateMap(); }
        }, 1200);

        saPmcbUpdateMap();
    };

    window.saPmcbSetMapLayer = function (name) {
        if (!window.saPmcbMap || !tileLayers) return;
        Object.keys(tileLayers).forEach(function (k) {
            if (tileLayers[k] && window.saPmcbMap.hasLayer(tileLayers[k])) {
                window.saPmcbMap.removeLayer(tileLayers[k]);
            }
        });
        if (tileLayers[name]) window.saPmcbMap.addLayer(tileLayers[name]);
        ['aerial', 'plan', 'light'].forEach(function (k) {
            var btn = document.getElementById('saPmcbLayer' + k.charAt(0).toUpperCase() + k.slice(1));
            if (btn) btn.classList.toggle('active', k === name);
        });
    };

    window.saPmcbUpdateMap = function () {
        if (!window.saPmcbMap || !markerLayer) return;
        markerLayer.clearLayers();
        markersById = {};

        var siteLL = getSiteLatLon();
        if (siteLL) {
            if (siteMarker) siteMarker.remove();
            siteMarker = L.marker(siteLL, {
                icon: L.divIcon({
                    className: 'sa-pmcb-site-marker',
                    html: '<div style="width:18px;height:18px;border-radius:50%;background:#DC2626;border:3px solid #fff;box-shadow:0 0 0 2px #DC2626;"></div>',
                    iconSize: [18, 18], iconAnchor: [9, 9]
                })
            }).addTo(markerLayer).bindPopup('<strong>Site du projet</strong><br>' + siteLL[0].toFixed(5) + ', ' + siteLL[1].toFixed(5));

            // Le cercle lie au filtre km n'est plus dessine (remplace par visualRadiusCircle adaptatif)
            if (radiusCircle) { radiusCircle.remove(); radiusCircle = null; }
            bindVisualRadiusEvents();
            updateVisualRadius();
        }

        // Carte : on ignore le filtre de rayon (rayon = filtre liste uniquement)
        var filtered = getFilteredForMap();
        var toDisplay = filtered.slice(0, MAX_MARKERS);
        var meta = META();
        toDisplay.forEach(function (p) {
            if (p.lat == null || p.lon == null) return;
            var color = pointColor(p);
            var marker = L.circleMarker([p.lat, p.lon], {
                radius: 6, color: '#fff', weight: 1.5,
                fillColor: color, fillOpacity: 0.9
            }).addTo(markerLayer);
            markersById[p.id] = marker;

            var srcMeta = meta.sources[p.source] || { label: p.source, color: '#64748B' };
            var typeStrs = (p.types || []).map(function (code) {
                var t = meta.types[code]; return t ? t.label : code;
            });
            var matsHtml = (p.materials || []).map(function (code) {
                var m = meta.materials[code];
                var col = (m && m.color) || '#64748B';
                var lbl = (m && m.short) || code;
                return '<span style="display:inline-block;padding:1px 5px;border-radius:3px;background:' + col + '20;color:' + col + ';font-size:0.68rem;font-weight:600;margin:1px;" title="' + escHtml(m ? m.label : code) + '">' + lbl + '</span>';
            }).join('');
            var hoursHtml = '';
            if (p.hours && Object.keys(p.hours).length > 0) {
                var days = ['lun','mar','mer','jeu','ven','sam','dim'];
                var lbls = {lun:'Lun',mar:'Mar',mer:'Mer',jeu:'Jeu',ven:'Ven',sam:'Sam',dim:'Dim'};
                hoursHtml = '<div style="margin-top:6px;font-size:0.72rem;color:#475569;line-height:1.4;"><strong>Horaires</strong><br>';
                days.forEach(function (d) {
                    if (p.hours[d]) hoursHtml += '<span style="display:inline-block;min-width:30px;font-weight:600;color:#334155;">' + lbls[d] + '</span> ' + escHtml(p.hours[d]) + '<br>';
                });
                hoursHtml += '</div>';
            }
            var distStr = (p._dist != null) ? fmtDist(p._dist) + ' du site' : '';

            var popup = '<div style="min-width:240px;max-width:310px;font-size:0.82rem;line-height:1.4;">' +
                '<div style="background:' + srcMeta.color + ';color:#fff;font-size:0.68rem;font-weight:700;letter-spacing:0.03em;padding:2px 6px;border-radius:3px;display:inline-block;margin-bottom:4px;">' + escHtml(srcMeta.label.toUpperCase()) + '</div>' +
                (typeStrs.length ? '<span style="margin-left:6px;font-size:0.7rem;color:#64748B;">' + escHtml(typeStrs.join(' · ')) + '</span>' : '') +
                '<br><strong style="font-size:0.92rem;color:#0F172A;">' + escHtml(p.name || 'Point de collecte') + '</strong><br>' +
                (p.address ? '<span style="color:#475569;">' + escHtml(p.address) + '</span><br>' : '') +
                '<span style="color:#475569;">' + escHtml(p.postcode || '') + ' ' + escHtml(p.city || '') + '</span><br>' +
                (matsHtml ? '<div style="margin:6px 0;">' + matsHtml + '</div>' : '') +
                (p.phone ? '<span style="color:#64748B;font-size:0.75rem;">Tel : ' + escHtml(p.phone) + '</span><br>' : '') +
                (p.email ? '<a href="mailto:' + escHtml(p.email) + '" style="color:#2563EB;font-size:0.78rem;">' + escHtml(p.email) + '</a><br>' : '') +
                hoursHtml +
                (distStr ? '<div style="margin-top:6px;color:#94A3B8;font-size:0.72rem;">' + distStr + '</div>' : '') +
                '</div>';
            marker.bindPopup(popup);

            marker.on('click', function () {
                var cardEl = document.querySelector('.sa-pmcb-card[data-pmcb-id="' + p.id + '"]');
                if (cardEl) {
                    document.querySelectorAll('.sa-pmcb-card.active').forEach(function (c) { c.classList.remove('active'); });
                    cardEl.classList.add('active');
                    cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    activeCardId = p.id;
                }
            });
        });

        // Pas de fitBounds automatique a chaque update : le rayon ne pilote plus la carte.
    };

    function focusPointOnMap(id) {
        var m = markersById[id];
        if (!m || !window.saPmcbMap) return;
        var ll = m.getLatLng();
        window.saPmcbMap.setView(ll, 14, { animate: true });
        setTimeout(function () { m.openPopup(); }, 400);
    }

    // ------- Orchestration -------
    window.saPmcbUpdateResults = function () {
        var filtered = getFiltered();
        renderResultsHeader(filtered);
        saPmcbRenderCards(filtered);
        saPmcbUpdateMap();
    };

    window.saPmcbRender = function () {
        // Masque l'encadre intro (desactive par l'utilisateur)
        var __introEl = document.getElementById('saPmcbIntro');
        if (__introEl) __introEl.style.display = 'none';
        if (!window.COLLECTE_PMCB || !Array.isArray(window.COLLECTE_PMCB) || window.COLLECTE_PMCB.length === 0) {
            var host = document.getElementById('saPmcbCardsList');
            if (host) host.innerHTML = '<div class="sa-acteurs-empty">' +
                '<div class="sa-acteurs-empty-title" style="color:#DC2626;">Dataset non charge</div>' +
                '<div class="sa-acteurs-empty-text">Verifiez que <code>data/collecte_pmcb/collecte_pmcb_dataset.js</code> est bien inclus dans index.html.</div>' +
                '</div>';
            return;
        }
        saPmcbRenderIntro();
        saPmcbRenderToolbar();
        saPmcbUpdateResults();
    };

})();
