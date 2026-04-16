// ============================================================
// ===== ANALYSE ENVIRONNEMENTALE DE SITE =====================
// ============================================================
// APIs utilisées :
// - API Adresse (adresse.data.gouv.fr) — Géocodage
// - API Géorisques (georisques.gouv.fr) — Risques naturels/technologiques
// - API Carto Nature (apicarto.ign.fr) — Biodiversité (Natura 2000, ZNIEFF)
// - API Carto Cadastre (apicarto.ign.fr) — Parcellaire
// - API Carto GPU (apicarto.ign.fr) — Urbanisme (PLU)
// ============================================================

var saState = {
    lat: null,
    lon: null,
    address: null,
    commune: null,
    codeInsee: null,
    results: {},
    initialized: false,
    map: null,
    mapMarker: null,
    mapLayers: {},
    currentLayer: 'aerial'
};

// ── Initialization ──
function initSiteAnalysis() {
    if (saState.initialized) return;
    saState.initialized = true;
    var input = document.getElementById('saAddressInput');
    if (!input) return;

    var debounceTimer = null;
    input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        var q = input.value.trim();
        if (q.length < 3) {
            saHideAutocomplete();
            document.getElementById('saSearchBtn').disabled = true;
            return;
        }
        debounceTimer = setTimeout(function () { saAutocomplete(q); }, 250);
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saHideAutocomplete();
            if (!document.getElementById('saSearchBtn').disabled) saSiteSearch();
        }
    });

    // Close autocomplete on outside click
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.sa-input-wrap')) saHideAutocomplete();
    });
}

// ── Autocomplete via API Adresse ──
function saAutocomplete(query) {
    var url = 'https://api-adresse.data.gouv.fr/search/?q=' + encodeURIComponent(query) + '&limit=5';
    fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) {
            var box = document.getElementById('saAutocomplete');
            if (!data.features || data.features.length === 0) {
                box.innerHTML = '<div class="sa-ac-item" style="color:#94A3B8;">Aucun résultat</div>';
                box.classList.add('show');
                return;
            }
            var h = '';
            data.features.forEach(function (f) {
                var p = f.properties;
                var coords = f.geometry.coordinates; // [lon, lat]
                h += '<div class="sa-ac-item" onclick="saSelectAddress(\'' +
                    saEsc(p.label) + '\',' + coords[1] + ',' + coords[0] + ',\'' +
                    saEsc(p.city || '') + '\',\'' + saEsc(p.citycode || '') + '\')">' +
                    '<div class="sa-ac-main">' + saEsc(p.name || '') + '</div>' +
                    '<div class="sa-ac-ctx">' + saEsc(p.postcode || '') + ' ' + saEsc(p.city || '') + '</div>' +
                    '</div>';
            });
            box.innerHTML = h;
            box.classList.add('show');
        })
        .catch(function () { saHideAutocomplete(); });
}

function saSelectAddress(label, lat, lon, city, citycode) {
    saState.lat = lat;
    saState.lon = lon;
    saState.address = label;
    saState.commune = city;
    saState.codeInsee = citycode;
    document.getElementById('saAddressInput').value = label;
    document.getElementById('saSearchBtn').disabled = false;
    saHideAutocomplete();
}

function saHideAutocomplete() {
    var box = document.getElementById('saAutocomplete');
    if (box) { box.classList.remove('show'); box.innerHTML = ''; }
}

function saEsc(s) {
    return s ? String(s).replace(/'/g, "\\'").replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '';
}
function saEscH(s) {
    return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : '';
}

// ── Main search orchestrator ──
function saSiteSearch() {
    if (!saState.lat || !saState.lon) return;

    // Reset Milieu physique cache & map so they reinit with new coordinates
    saMpCommuneCache = {};
    if (saMpMap) { saMpMap.remove(); saMpMap = null; }

    // Show full address info directly in the input field
    var fullInfo = saState.address + ' — ' +
        saState.lat.toFixed(6) + ', ' + saState.lon.toFixed(6) +
        (saState.commune ? ' — Commune : ' + saState.commune : '') +
        (saState.codeInsee ? ' (INSEE: ' + saState.codeInsee + ')' : '');
    document.getElementById('saAddressInput').value = fullInfo;

    // Show results container so the map div has real dimensions,
    // but hide the data panels (synthesis + sections stack) during loading
    var resultsDiv = document.getElementById('saResults');
    resultsDiv.style.display = 'block';
    var saSynthEl = document.getElementById('saSynthesis');
    var saStackEl = resultsDiv.querySelector('.sa-sections-stack');
    var saPdfEl = document.getElementById('saPdfSection');
    if (saSynthEl) saSynthEl.style.display = 'none';
    if (saStackEl) saStackEl.style.display = 'none';
    if (saPdfEl) saPdfEl.style.display = 'none';

    // Init/refresh map — container is now visible in the DOM
    requestAnimationFrame(function() {
        saInitMap(saState.lat, saState.lon);
    });

    // Show loading indicator
    var loadDiv = document.getElementById('saLoading');
    loadDiv.style.display = 'block';

    var steps = [
        { id: 'georisques', label: 'G\u00e9orisques' },
        { id: 'biodiv', label: 'Biodiversit\u00e9' },
        { id: 'urbanisme', label: 'Urbanisme' },
        { id: 'icpe', label: 'ICPE' },
        { id: 'pollution', label: 'Sites pollu\u00e9s' },
        { id: 'airquality', label: 'Qualit\u00e9 air' },
        { id: 'bruit', label: 'Bruit' }
    ];
    var stepsHtml = '';
    steps.forEach(function (s) {
        stepsHtml += '<span class="sa-loading-step" id="saStep-' + s.id + '">' + s.label + '</span>';
    });
    document.getElementById('saLoadingSteps').innerHTML = stepsHtml;

    // Launch all API calls in parallel
    var promises = [
        saFetchGeorisques().then(function () { saMarkStep('georisques', 'done'); }).catch(function () { saMarkStep('georisques', 'error'); }),
        saFetchBiodiversite().then(function () { saMarkStep('biodiv', 'done'); }).catch(function () { saMarkStep('biodiv', 'error'); }),
        saFetchUrbanisme().then(function () { saMarkStep('urbanisme', 'done'); }).catch(function () { saMarkStep('urbanisme', 'error'); }),
        saFetchICPE().then(function () { saMarkStep('icpe', 'done'); }).catch(function () { saMarkStep('icpe', 'error'); }),
        saFetchPollution().then(function () { saMarkStep('pollution', 'done'); }).catch(function () { saMarkStep('pollution', 'error'); }),
        saFetchAirQuality().then(function () { saMarkStep('airquality', 'done'); }).catch(function () { saMarkStep('airquality', 'error'); }),
        saFetchBruit().then(function () { saMarkStep('bruit', 'done'); }).catch(function () { saMarkStep('bruit', 'error'); })
    ];

    // Mark all as active
    steps.forEach(function (s) { saMarkStep(s.id, 'active'); });

    Promise.all(promises).then(function () {
        loadDiv.style.display = 'none';
        saRenderResults();
        // Reveal data panels (were hidden during loading)
        if (saSynthEl) saSynthEl.style.display = '';
        if (saStackEl) saStackEl.style.display = '';
        // Safety invalidateSize after content reflow
        if (saState.map) saState.map.invalidateSize();
        // Default to Milieu physique page
        saGoToPage('MilieuPhysique');
    });
}

function saMarkStep(id, status) {
    var el = document.getElementById('saStep-' + id);
    if (!el) return;
    el.classList.remove('active', 'done', 'error');
    el.classList.add(status);
    if (status === 'done') el.innerHTML = '✓ ' + el.textContent.replace(/^[✓✗] /, '');
    if (status === 'error') el.innerHTML = '✗ ' + el.textContent.replace(/^[✓✗] /, '');
}

// ── API Géorisques — Risques naturels ──
// NOTE: Géorisques latlon format = longitude,latitude (lon first!)
function saFetchGeorisques() {
    var lat = saState.lat, lon = saState.lon;
    var latlon = lon + ',' + lat; // IMPORTANT: lon,lat order for Géorisques!
    var baseUrl = 'https://georisques.gouv.fr/api/v1/';

    var queries = {
        // Rapport complet (même données que le site georisques.gouv.fr)
        rapport: baseUrl + 'resultats_rapport_risque?latlon=' + latlon,
        // Radon par commune
        radon: baseUrl + 'radon?code_insee=' + encodeURIComponent(saState.codeInsee),
        // Retrait-gonflement argiles par coordonnées
        rga: baseUrl + 'rga?latlon=' + latlon,
        // Zonage sismique
        sismique: baseUrl + 'zonage_sismique?code_insee=' + encodeURIComponent(saState.codeInsee),
        // Cavités souterraines
        cavites: baseUrl + 'cavites?latlon=' + latlon + '&rayon=3000',
        // Mouvements de terrain
        mvt: baseUrl + 'mvt?latlon=' + latlon + '&rayon=3000',
        // Zonage inondation TRI
        tri: baseUrl + 'tri_zonage?latlon=' + latlon,
        // CatNat
        catnat: baseUrl + 'gaspar/catnat?rayon=1000&latlon=' + latlon,
        // Risques GASPAR (liste des risques connus sur la commune)
        risques: baseUrl + 'gaspar/risques?latlon=' + latlon + '&rayon=1000',
        // PPR
        ppr: baseUrl + 'gaspar/ppr?rayon=1000&latlon=' + latlon
    };

    var results = {};
    var fetches = Object.keys(queries).map(function (key) {
        return fetch(queries[key])
            .then(function (r) { return r.json(); })
            .then(function (data) { results[key] = data; })
            .catch(function (err) { results[key] = { error: err.message }; });
    });

    return Promise.all(fetches).then(function () {
        saState.results.georisques = results;
    });
}

// ── API Carto Nature — Biodiversité ──
function saFetchBiodiversite() {
    // Create a small buffer polygon around the point (approx 1km)
    var lat = saState.lat, lon = saState.lon;
    var d = 0.01; // ~1km
    var geojson = {
        type: 'Polygon',
        coordinates: [[
            [lon - d, lat - d], [lon + d, lat - d],
            [lon + d, lat + d], [lon - d, lat + d],
            [lon - d, lat - d]
        ]]
    };
    var geomStr = JSON.stringify(geojson);

    var layers = [
        { key: 'natura_sic', url: 'https://apicarto.ign.fr/api/nature/natura-habitat?geom=' + encodeURIComponent(geomStr) },
        { key: 'natura_zps', url: 'https://apicarto.ign.fr/api/nature/natura-oiseaux?geom=' + encodeURIComponent(geomStr) },
        { key: 'znieff1', url: 'https://apicarto.ign.fr/api/nature/znieff1?geom=' + encodeURIComponent(geomStr) },
        { key: 'znieff2', url: 'https://apicarto.ign.fr/api/nature/znieff2?geom=' + encodeURIComponent(geomStr) },
        { key: 'rnc', url: 'https://apicarto.ign.fr/api/nature/rnc?geom=' + encodeURIComponent(geomStr) },
        { key: 'rnn', url: 'https://apicarto.ign.fr/api/nature/rnn?geom=' + encodeURIComponent(geomStr) }
    ];

    var results = {};
    var fetches = layers.map(function (l) {
        return fetch(l.url)
            .then(function (r) { return r.json(); })
            .then(function (data) { results[l.key] = data; })
            .catch(function (err) { results[l.key] = { error: err.message }; });
    });

    return Promise.all(fetches).then(function () {
        saState.results.biodiversite = results;
    });
}

// ── API Carto GPU — Urbanisme ──
function saFetchUrbanisme() {
    var lat = saState.lat, lon = saState.lon;
    var geojson = { type: 'Point', coordinates: [lon, lat] };
    var geomStr = JSON.stringify(geojson);

    // Zone PLU
    var url = 'https://apicarto.ign.fr/api/gpu/zone-urba?geom=' + encodeURIComponent(geomStr);

    return fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) { saState.results.urbanisme = data; })
        .catch(function (err) { saState.results.urbanisme = { error: err.message }; });
}

// ── API Géorisques — ICPE ──
function saFetchICPE() {
    var lat = saState.lat, lon = saState.lon;
    var latlon = lon + ',' + lat; // lon,lat order for Géorisques
    var url = 'https://georisques.gouv.fr/api/v1/installations_classees?rayon=2000&latlon=' + latlon + '&page=1&page_size=50';

    return fetch(url)
        .then(function (r) { return r.json(); })
        .then(function (data) { saState.results.icpe = data; })
        .catch(function (err) { saState.results.icpe = { error: err.message }; });
}

// ── API Géorisques — Sites & Sols Pollués (SSP unifié) ──
function saFetchPollution() {
    var lat = saState.lat, lon = saState.lon;
    var latlon = lon + ',' + lat; // lon,lat order for Géorisques
    var baseUrl = 'https://georisques.gouv.fr/api/v1/';
    var queries = {
        ssp: baseUrl + 'ssp?rayon=1000&latlon=' + latlon + '&page=1&page_size=50',
        sis: baseUrl + 'ssp/conclusions_sis?rayon=1000&latlon=' + latlon + '&page=1&page_size=50',
        casias: baseUrl + 'ssp/casias?rayon=1000&latlon=' + latlon + '&page=1&page_size=50',
        instructions: baseUrl + 'ssp/instructions?rayon=1000&latlon=' + latlon + '&page=1&page_size=50'
    };

    var results = {};
    var fetches = Object.keys(queries).map(function (key) {
        return fetch(queries[key])
            .then(function (r) { return r.json(); })
            .then(function (data) { results[key] = data; })
            .catch(function (err) { results[key] = { error: err.message }; });
    });

    return Promise.all(fetches).then(function () {
        saState.results.pollution = results;
    });
}

// ── ATMO Data WFS — Qualité de l'air (indice ATMO officiel) ──
function saFetchAirQuality() {
    var codeInsee = saState.codeInsee;
    if (!codeInsee) {
        saState.results.airQuality = { error: 'Code INSEE non disponible' };
        return Promise.resolve();
    }

    function saParseAtmoResult(data) {
        if (data && data.features && data.features.length > 0) {
            var props = data.features[0].properties;
            saState.results.airQuality = {
                source: 'atmo',
                code_qual: props.code_qual,
                lib_qual: props.lib_qual,
                coul_qual: props.coul_qual,
                code_no2: props.code_no2,
                code_o3: props.code_o3,
                code_pm10: props.code_pm10,
                code_pm25: props.code_pm25,
                code_so2: props.code_so2,
                date_ech: props.date_ech,
                lib_zone: props.lib_zone,
                aasqa: props.source
            };
            return true;
        }
        return false;
    }

    // Build date strings: today, yesterday, day before
    function saFmtDate(d) {
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    var now = new Date();
    var dates = [saFmtDate(now)];
    var d1 = new Date(now); d1.setDate(d1.getDate() - 1); dates.push(saFmtDate(d1));
    var d2 = new Date(now); d2.setDate(d2.getDate() - 2); dates.push(saFmtDate(d2));

    var baseUrl = 'https://data.atmo-france.org/geoserver/ind/ows?service=WFS&version=2.0.0' +
        '&request=GetFeature&typeName=ind:ind_atmo&outputFormat=application/json&count=1' +
        '&CQL_FILTER=code_zone=%27' + encodeURIComponent(codeInsee) + '%27';

    // Try today first, fallback to yesterday, then day before (ATMO published ~13h-15h)
    function tryDate(idx) {
        if (idx >= dates.length) {
            saState.results.airQuality = { error: 'Aucune donn\u00e9e ATMO r\u00e9cente pour cette commune' };
            return Promise.resolve();
        }
        var url = baseUrl + ' AND date_ech=%27' + dates[idx] + '%27';
        return fetch(url)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                if (!saParseAtmoResult(data)) return tryDate(idx + 1);
            });
    }

    // Also fetch pollution episodes (3-day + historical year) in parallel
    var codeDept = codeInsee.substring(0, 2);
    // IDF departments share region code 11
    var idfDepts = ['75', '77', '78', '91', '92', '93', '94', '95'];
    var epCodeZone = idfDepts.indexOf(codeDept) !== -1 ? '11' : codeDept;

    var epBaseUrl = 'https://data.atmo-france.org/geoserver/alrt/ows?service=WFS&version=2.0.0' +
        '&request=GetFeature&typeName=alrt:national_alrt3j&outputFormat=application/json' +
        '&CQL_FILTER=code_zone=%27' + encodeURIComponent(epCodeZone) + '%27';

    var epHistUrl = 'https://data.atmo-france.org/geoserver/alrt/ows?service=WFS&version=2.0.0' +
        '&request=GetFeature&typeName=alrt:alrt&outputFormat=application/json&count=50' +
        '&CQL_FILTER=code_zone=%27' + encodeURIComponent(epCodeZone) + '%27 AND etat<>%27PAS DE DEPASSEMENT%27 AND date_ech>=%27' + saFmtDate(new Date(now.getTime() - 365 * 86400000)) + '%27';

    function fetchEpisodes() {
        return Promise.all([
            fetch(epBaseUrl).then(function (r) { return r.json(); }).catch(function () { return null; }),
            fetch(epHistUrl).then(function (r) { return r.json(); }).catch(function () { return null; })
        ]).then(function (results) {
            var ep3j = results[0], epHist = results[1];
            var episodes = { actifs: [], historique: [] };
            // Current 3-day episodes (filter out "PAS DE DEPASSEMENT")
            if (ep3j && ep3j.features) {
                ep3j.features.forEach(function (f) {
                    if (f.properties && f.properties.etat && f.properties.etat !== 'PAS DE DEPASSEMENT') {
                        episodes.actifs.push({
                            date: f.properties.date_ech,
                            polluant: f.properties.lib_pol,
                            etat: f.properties.etat,
                            zone: f.properties.lib_zone
                        });
                    }
                });
            }
            // Historical episodes (past 12 months)
            if (epHist && epHist.features) {
                epHist.features.forEach(function (f) {
                    if (f.properties) {
                        episodes.historique.push({
                            date: f.properties.date_ech,
                            polluant: f.properties.lib_pol,
                            etat: f.properties.etat,
                            zone: f.properties.lib_zone
                        });
                    }
                });
            }
            saState.results.episodes = episodes;
        });
    }

    return Promise.all([
        tryDate(0).catch(function (err) { saState.results.airQuality = { error: err.message }; }),
        fetchEpisodes()
    ]);
}

// ── WMS GetFeatureInfo — Bruit aérien (PEB + PGS) ──
function saFetchBruitAerien() {
    var lat = saState.lat, lon = saState.lon;
    var d = 0.005; // ~500m buffer for direct zone check
    var bbox = (lat - d) + ',' + (lon - d) + ',' + (lat + d) + ',' + (lon + d);
    var base = 'https://data.geopf.fr/wms-v/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo' +
        '&INFO_FORMAT=application/json&I=50&J=50&WIDTH=101&HEIGHT=101&CRS=EPSG:4326&BBOX=' + bbox;

    var queries = {
        peb: base + '&QUERY_LAYERS=dgac_peb_plan_wmsv&LAYERS=dgac_peb_plan_wmsv',
        pgs: base + '&QUERY_LAYERS=DGAC-PGS_BDD_FXX_WM_WMS&LAYERS=DGAC-PGS_BDD_FXX_WM_WMS'
    };

    var results = {};
    var fetches = Object.keys(queries).map(function (key) {
        return fetch(queries[key])
            .then(function (r) { return r.json(); })
            .then(function (data) { results[key] = data; })
            .catch(function (err) { results[key] = { error: err.message }; });
    });

    return Promise.all(fetches).then(function () {
        saState.results.bruit = results;
        // Si pas de PEB direct, chercher un aérodrome avec PEB à proximité (< 3 km)
        // via le WFS des arrêtés PEB (224 points, dataset léger)
        var hasPeb = results.peb && results.peb.features && results.peb.features.length > 0;
        if (!hasPeb) {
            var wfsUrl = 'https://data.geopf.fr/wfs/ows?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature' +
                '&typeName=dgac_peb_arrete_wfs:dgac_peb_arrete_wfs&outputFormat=application/json&count=300';
            return fetch(wfsUrl)
                .then(function (r) { return r.json(); })
                .then(function (data) {
                    if (!data || !data.features) return;
                    var closest = null, minDist = Infinity;
                    data.features.forEach(function (f) {
                        if (!f.geometry || !f.geometry.coordinates) return;
                        var aLon = f.geometry.coordinates[0], aLat = f.geometry.coordinates[1];
                        var dist = saHaversine(lat, lon, aLat, aLon);
                        if (dist < minDist) { minDist = dist; closest = f; }
                    });
                    if (closest && minDist <= 3000) {
                        saState.results.bruit.pebProximite = {
                            nom: closest.properties.nom || '',
                            oaci: closest.properties.oaci || '',
                            distance: Math.round(minDist),
                            arrete_peb: closest.properties.arrete_peb || ''
                        };
                    }
                })
                .catch(function () { /* pas critique */ });
        }
    });
}

// ── Overpass API — Bruit routier / ferroviaire (infrastructures de transport à proximité) ──
function saFetchBruitRoutier() {
    var lat = saState.lat, lon = saState.lon;
    var radius = 500; // 500m search radius for secondary roads
    var motorwayRadius = 800; // 800m for autoroutes (major noise sources even at distance)
    var d = motorwayRadius / 111000; // ~degrees for bbox — use wider radius to capture autoroutes
    var wfsBase = 'https://data.geopf.fr/wfs/ows?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&outputFormat=application/json&srsName=EPSG:4326';
    // CQL BBOX: minlon, minlat, maxlon, maxlat, 'EPSG:4326'
    var cqlBbox = 'BBOX(geometrie,' + (lon - d) + ',' + (lat - d) + ',' + (lon + d) + ',' + (lat + d) + ',%27EPSG:4326%27)';
    // Standard bbox param for queries without CQL
    var bboxParam = (lon - d) + ',' + (lat - d) + ',' + (lon + d) + ',' + (lat + d) + ',EPSG:4326';

    // 1) Roads from BDTopo — CQL_FILTER with importance <= 3 to avoid minor streets
    //    nom_voie_ban_gauche = official BAN road name (e.g. "Boulevard des Belges")
    var roadUrl = wfsBase + '&typeName=BDTOPO_V3:troncon_de_route&count=100' +
        '&propertyName=importance,nature,cpx_numero,cpx_classement_administratif,nom_voie_ban_gauche,geometrie' +
        '&CQL_FILTER=' + cqlBbox + '%20AND%20importance%20%3C=%20%273%27';

    // 2) Railways from BDTopo (no importance filter needed)
    var railUrl = wfsBase + '&typeName=BDTOPO_V3:troncon_de_voie_ferree&count=30' +
        '&propertyName=nature,usage,geometrie' +
        '&bbox=' + bboxParam;

    // 3) Route numbers from BDTopo — use INTERSECTS with wide envelope (1500m)
    //    These are labeling-only: we want to know which named routes (A6, D306, N7) are nearby
    var labelRadius = 1500;
    var dLbl = labelRadius / 111000;
    var routeNumUrl = wfsBase + '&typeName=BDTOPO_V3:route_numerotee_ou_nommee&count=30' +
        '&propertyName=numero,type_de_route,geometrie' +
        '&CQL_FILTER=' + encodeURIComponent(
            "INTERSECTS(geometrie, ENVELOPE(" + (lon - dLbl) + ", " + (lon + dLbl) + ", " + (lat - dLbl) + ", " + (lat + dLbl) + "))" +
            " AND numero IS NOT NULL" +
            " AND type_de_route NOT IN ('Route européenne','Route nommée','Liaison maritime')"
        );

    // Map BDTopo nature+importance to our type system
    function classifyRoad(nature, importance) {
        var imp = parseInt(importance) || 5;
        if (nature === 'Autoroute' || nature === 'Type autoroutier') return 'motorway';
        if (nature === 'Bretelle' && imp <= 2) return 'motorway_link';
        if (nature === 'Bretelle') return 'trunk_link';
        if (imp <= 2) return 'primary';
        if (imp <= 3) return 'secondary';
        return null; // skip minor roads
    }

    function classifyRail(nature) {
        if (nature === 'LGV' || nature === 'Voie ferrée principale') return 'rail';
        if (nature === 'Tramway' || nature === 'Funiculaire' || nature === 'Métro') return 'light_rail';
        return null; // skip service tracks
    }

    // Extract [lat,lon] coords from GeoJSON geometry
    function extractCoords(geom) {
        if (!geom || !geom.coordinates) return [];
        var coords = geom.coordinates;
        if (geom.type === 'MultiLineString' && coords.length > 0) coords = coords[0];
        if (!Array.isArray(coords) || coords.length < 2) return [];
        return coords.map(function (c) { return { lat: c[1], lon: c[0] }; });
    }

    return Promise.all([
        fetch(roadUrl).then(function (r) { return r.json(); }).catch(function (e) { console.warn('[SA] road fetch failed:', e); return { features: [] }; }),
        fetch(railUrl).then(function (r) { return r.json(); }).catch(function (e) { console.warn('[SA] rail fetch failed:', e); return { features: [] }; }),
        fetch(routeNumUrl).then(function (r) {
            return r.text().then(function (txt) {
                console.log('[SA] routeNum raw response (first 500 chars):', txt.substring(0, 500));
                try { return JSON.parse(txt); } catch (e) { console.warn('[SA] routeNum JSON parse failed:', e); return { features: [] }; }
            });
        }).catch(function (e) { console.warn('[SA] routeNum fetch failed:', e); return { features: [] }; })
    ]).then(function (results) {
        var roadData = results[0], railData = results[1], routeNumData = results[2];
        console.log('[SA] WFS results — roads:', (roadData.features||[]).length, ', rails:', (railData.features||[]).length, ', routeNums:', (routeNumData.features||[]).length);
        var infras = [];

        // Process roads
        (roadData.features || []).forEach(function (f) {
            var p = f.properties || {};
            var type = classifyRoad(p.nature, p.importance);
            if (!type) return;
            var geometry = extractCoords(f.geometry);
            if (geometry.length < 2) return;
            var minDist = Infinity;
            geometry.forEach(function (pt) {
                var dd = saHaversine(lat, lon, pt.lat, pt.lon);
                if (dd < minDist) minDist = dd;
            });
            // Autoroutes are major noise sources even at distance — allow wider radius
            var maxDist = (type === 'motorway' || type === 'motorway_link') ? motorwayRadius : radius;
            if (minDist > maxDist) return;
            if (type === 'motorway' || type === 'primary') {
                console.log('[SA] road kept:', type, 'nature='+p.nature, 'imp='+p.importance, 'cpx_numero='+p.cpx_numero, 'classement='+p.cpx_classement_administratif, 'dist='+Math.round(minDist)+'m');
            }
            var num = p.cpx_numero || '';
            // Clean cpx_numero: "A6BPNL" → "A6", "D306" stays "D306"
            if (num) num = num.replace(/^([ADNMCE]\d+).*/, '$1');
            // Road name from BAN (Base Adresse Nationale)
            var roadName = p.nom_voie_ban_gauche || '';
            var name = num || roadName || p.cpx_classement_administratif || p.nature || '';
            infras.push({
                type: type, name: name, distance: Math.round(minDist),
                tags: { ref: num, nature: p.nature, importance: p.importance, roadName: roadName },
                geometry: geometry
            });
        });

        // Process railways
        (railData.features || []).forEach(function (f) {
            var p = f.properties || {};
            var type = classifyRail(p.nature);
            if (!type) return;
            var geometry = extractCoords(f.geometry);
            if (geometry.length < 2) return;
            var minDist = Infinity;
            geometry.forEach(function (pt) {
                var dd = saHaversine(lat, lon, pt.lat, pt.lon);
                if (dd < minDist) minDist = dd;
            });
            if (minDist > radius) return;
            infras.push({
                type: type, name: p.nature || 'Voie ferrée', distance: Math.round(minDist),
                tags: { nature: p.nature, usage: p.usage },
                geometry: geometry
            });
        });

        // Sort by distance
        infras.sort(function (a, b) { return a.distance - b.distance; });
        saState.results.bruitRoutier = { infras: infras };

        // Process route numbers for labels
        // route_numerotee_ou_nommee returns ENTIRE route geometry (MultiLineString across country)
        // We scan every point of every sub-line to find the one closest to the site
        var seen = {};
        var refs = [];
        (routeNumData.features || []).forEach(function (f) {
            var num = (f.properties || {}).numero;
            var typ = (f.properties || {}).type_de_route || '';
            console.log('[SA] routeNum feature:', num, typ, 'geom type:', f.geometry ? f.geometry.type : 'none');
            if (!num || seen[num]) return;
            if (typ === 'Route européenne' || typ === 'Route nommée' || typ === 'Liaison maritime') return;
            // Clean numero: "A6BPNL" → "A6", "D306" stays "D306"
            var cleanNum = num.replace(/^([ADNMCE]\d+).*/, '$1');
            if (!/^[ADNMCE]\d+$/.test(cleanNum)) {
                console.log('[SA] routeNum rejected (regex):', num, '→', cleanNum);
                return;
            }
            if (seen[cleanNum]) return;
            seen[cleanNum] = true;

            // Find closest point to site — simple brute-force over ALL coordinates
            var bestPt = null;
            var bestDist = Infinity;
            if (f.geometry && f.geometry.coordinates) {
                // Flatten all coords regardless of geometry type
                var raw = JSON.stringify(f.geometry.coordinates);
                // Extract all [lon,lat] pairs via regex — bulletproof regardless of nesting
                var coordPairs = raw.match(/\[[\d.\-]+,[\d.\-]+\]/g) || [];
                console.log('[SA] routeNum', cleanNum, ': scanning', coordPairs.length, 'coordinate pairs');
                for (var ci = 0; ci < coordPairs.length; ci++) {
                    var pair = JSON.parse(coordPairs[ci]);
                    var dd = saHaversine(lat, lon, pair[1], pair[0]);
                    if (dd < bestDist) {
                        bestDist = dd;
                        bestPt = [pair[1], pair[0]];
                    }
                }
            }
            console.log('[SA] routeNum', cleanNum, ': bestDist =', Math.round(bestDist), 'm, labelRadius =', labelRadius);
            // Include if a point is within the label radius
            if (bestPt && bestDist <= labelRadius) {
                refs.push({ numero: cleanNum, type: typ, labelPos: bestPt });
                console.log('[SA] routeNum', cleanNum, 'ACCEPTED at', bestPt, bestDist + 'm');
            } else {
                console.log('[SA] routeNum', cleanNum, 'REJECTED: bestDist', Math.round(bestDist), '> labelRadius', labelRadius);
            }
        });
        saState.results.bruitRoutier.routeRefs = refs;
        console.log('[SA] bruitRoutier roads:', infras.length, 'infras, with cpx_numero:', infras.filter(function(i){return i.tags&&i.tags.ref;}).length);
        console.log('[SA] bruitRoutier routeRefs:', refs.length, refs.map(function(r){return r.numero+'@'+Math.round(saHaversine(lat,lon,r.labelPos[0],r.labelPos[1]))+'m';}));

    }).catch(function (err) {
        saState.results.bruitRoutier = { error: err.message, infras: [] };
    });
}

// Haversine distance in meters
function saHaversine(lat1, lon1, lat2, lon2) {
    var R = 6371000;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Combined bruit fetch
function saFetchBruit() {
    return Promise.all([saFetchBruitAerien(), saFetchBruitRoutier()]);
}

// ── Rendering ──
function saRenderResults() {
    // Render sections FIRST so counts are available for synthesis
    saRenderRisques();
    saRenderBiodiversite();
    saRenderUrbanisme();
    saRenderICPE();
    saRenderPollution();
    saRenderPdfLink();
    // Synthesis reads actual counts from rendered sections
    saRenderSynthesis();
}

// Toggle section open/closed (new behavior: toggle 'open' class)
function saToggleSection(name) {
    var section = document.getElementById('saSection' + name);
    if (section) section.classList.toggle('open');
}

function saGetSectionCount(name) {
    var el = document.getElementById('saCount' + name);
    if (!el || !el.textContent) return 0;
    var m = el.textContent.match(/(\d+)/);
    return m ? parseInt(m[1]) : 0;
}

function saRenderSynthesis() {
    var el = document.getElementById('saSynthesis');
    var r = saState.results;
    var gr = r.georisques || {};
    var lines = [];

    // Read actual risk count from rendered section (matches table rows)
    var riskCount = saGetSectionCount('Risques');
    if (riskCount > 0) {
        // Read risk names from table rows
        var riskRows = document.querySelectorAll('#saBodyRisques .sa-table tbody tr');
        var tagNames = [];
        riskRows.forEach(function(tr) {
            var strong = tr.querySelector('td:nth-child(2) strong');
            if (strong) tagNames.push(strong.textContent);
        });
        var critical = tagNames.slice(0, 4).join(', ');
        lines.push({ dot: riskCount >= 5 ? 'red' : 'orange', text: '<strong>' + riskCount + ' risques naturels ou technologiques</strong> recens\u00e9s, dont : ' + saEscH(critical) + (tagNames.length > 4 ? '...' : '') + '.' });
    } else {
        lines.push({ dot: 'green', text: 'Aucun risque naturel ou technologique recens\u00e9.' });
    }

    // TRI
    if (gr.tri && gr.tri.data && gr.tri.data.length > 0) {
        lines.push({ dot: 'red', text: 'Le site est situ\u00e9 en <strong>zone inondable</strong> (Territoire \u00e0 Risque Important d\u2019inondation).' });
    }

    // Sismique
    if (gr.sismique && gr.sismique.data && gr.sismique.data.length > 0) {
        var zn = parseInt(gr.sismique.data[0].code_zone) || 0;
        var labels = { 1: 'tr\u00e8s faible', 2: 'faible', 3: 'mod\u00e9r\u00e9e', 4: 'moyenne', 5: 'forte' };
        lines.push({ dot: zn >= 3 ? 'orange' : 'gray', text: 'Zonage sismique : zone ' + zn + ' (' + (labels[zn] || '') + ').' });
    }

    // Radon
    if (gr.radon && gr.radon.data && gr.radon.data.length > 0) {
        var cl = parseInt(gr.radon.data[0].classe_potentiel) || 0;
        lines.push({ dot: cl >= 3 ? 'red' : cl >= 2 ? 'orange' : 'gray', text: 'Potentiel radon : classe ' + cl + '/3.' });
    }

    // Biodiversity — read actual count from rendered section
    var bioCount = saGetSectionCount('Biodiversite');
    if (bioCount > 0) {
        lines.push({ dot: 'orange', text: '<strong>' + bioCount + ' zone(s) prot\u00e9g\u00e9e(s)</strong> identifi\u00e9e(s) \u00e0 proximit\u00e9 (Natura 2000, ZNIEFF, r\u00e9serves).' });
    } else {
        lines.push({ dot: 'green', text: 'Aucune zone prot\u00e9g\u00e9e identifi\u00e9e \u00e0 proximit\u00e9.' });
    }

    // ICPE — read actual count from rendered section
    var icpeCount = saGetSectionCount('ICPE');
    var seveso = (r.icpe && r.icpe.data) ? r.icpe.data.filter(function(i) { return i.regime_seveso && i.regime_seveso !== 'Non Seveso'; }) : [];
    if (seveso.length > 0) {
        lines.push({ dot: 'red', text: '<strong>' + seveso.length + ' site(s) SEVESO</strong> et ' + (icpeCount - seveso.length) + ' autres ICPE dans un rayon de 2 km.' });
    } else if (icpeCount > 0) {
        lines.push({ dot: 'orange', text: icpeCount + ' installation(s) class\u00e9e(s) dans un rayon de 2 km, aucun site SEVESO.' });
    } else {
        lines.push({ dot: 'green', text: 'Aucune installation class\u00e9e recens\u00e9e dans un rayon de 2 km.' });
    }

    // Air quality (ATMO)
    var aq = saState.results.airQuality;
    if (aq && aq.source === 'atmo' && aq.code_qual != null) {
        var cq = aq.code_qual;
        var aqDot = cq >= 5 ? 'red' : cq >= 3 ? 'orange' : 'green';
        lines.push({ dot: aqDot, text: 'Qualit\u00e9 de l\u2019air\u00a0: indice ATMO <strong>' + cq + '/6</strong> \u2014 ' + (aq.lib_qual || '') + ' (source\u00a0: ' + (aq.aasqa || 'AASQA') + ').' });
        // Episodes de pollution
        var epSynth = saState.results.episodes || {};
        if (epSynth.actifs && epSynth.actifs.length > 0) {
            var epPolsSynth = [];
            epSynth.actifs.forEach(function (e) { if (e.polluant && epPolsSynth.indexOf(e.polluant) === -1) epPolsSynth.push(e.polluant); });
            lines.push({ dot: 'red', text: '<strong>Episode de pollution en cours</strong>\u00a0: ' + epPolsSynth.join(', ') + '.' });
        }
        if (epSynth.historique && epSynth.historique.length > 0) {
            var epHistDot = epSynth.historique.length >= 10 ? 'red' : epSynth.historique.length >= 3 ? 'orange' : 'green';
            lines.push({ dot: epHistDot, text: epSynth.historique.length + ' episode(s) de pollution recense(s) sur les 12 derniers mois.' });
        }
    }

    // Bruit PEB/PGS
    var br = saState.results.bruit || {};
    var pebF = (br.peb && br.peb.features) ? br.peb.features : [];
    if (pebF.length > 0) {
        var pebZ = pebF[0].properties.zone || '?';
        lines.push({ dot: 'red', text: 'Site en <strong>zone PEB ' + saEscH(pebZ) + '</strong> (Plan d\u2019Exposition au Bruit)\u00a0: contraintes acoustiques fortes.' });
    } else if (br.pebProximite) {
        var proxDistSynth = br.pebProximite.distance || '?';
        var proxDotSynth = proxDistSynth <= 1500 ? 'orange' : 'gray';
        lines.push({ dot: proxDotSynth, text: 'A\u00e9rodrome \u00e0 proximit\u00e9\u00a0: <strong>' + saEscH(br.pebProximite.nom || '') + '</strong> \u00e0 ' + proxDistSynth + '\u00a0m (hors zone PEB directe).' });
    }

    // Bruit routier / ferroviaire
    var brr = saState.results.bruitRoutier || {};
    var infrasList = brr.infras || [];
    if (infrasList.length > 0) {
        var closestInfra = infrasList[0];
        var isHTSynth = (closestInfra.type === 'motorway' || closestInfra.type === 'trunk' || closestInfra.type === 'motorway_link');
        if (isHTSynth && closestInfra.distance <= 200) {
            lines.push({ dot: 'red', text: 'Infrastructure \u00e0 fort trafic (<strong>' + closestInfra.distance + '\u00a0m</strong>)\u00a0: \u00e9tude acoustique n\u00e9cessaire (Hea\u00a005).' });
        } else if (closestInfra.distance <= 100) {
            lines.push({ dot: 'orange', text: 'Infrastructure de transport \u00e0 <strong>' + closestInfra.distance + '\u00a0m</strong>\u00a0: v\u00e9rifier le classement sonore.' });
        } else {
            lines.push({ dot: 'gray', text: infrasList.length + ' infrastructure(s) de transport dans un rayon de 500\u00a0m (la plus proche \u00e0 ' + closestInfra.distance + '\u00a0m).' });
        }
    } else {
        lines.push({ dot: 'green', text: 'Aucune infrastructure de transport majeure dans un rayon de 500\u00a0m.' });
    }

    // Pollution — read actual count from rendered section
    var polCount = saGetSectionCount('Pollution');
    if (polCount > 0) {
        lines.push({ dot: 'red', text: '<strong>' + polCount + ' site(s) pollu\u00e9(s)</strong> ou anciens sites industriels recens\u00e9s dans un rayon de 1 km.' });
    } else {
        lines.push({ dot: 'green', text: 'Aucun site pollu\u00e9 recens\u00e9 dans un rayon de 1 km.' });
    }

    var h = '<div class="sa-synthesis-title">Synth\u00e8se et alertes</div>';
    h += '<div class="sa-synthesis-body">';
    lines.forEach(function(l) {
        h += '<div class="sa-alert-line"><span class="sa-alert-dot sa-dot-' + l.dot + '"></span><span>' + l.text + '</span></div>';
    });
    h += '</div>';
    el.innerHTML = h;
}

function saToggleToc() {
    var wrap = document.getElementById('saTocWrap');
    if (!wrap) return;
    wrap.classList.toggle('open');
}

// Close TOC when clicking outside
document.addEventListener('click', function(e) {
    var wrap = document.getElementById('saTocWrap');
    if (!wrap || !wrap.classList.contains('open')) return;
    if (wrap.contains(e.target)) return;
    wrap.classList.remove('open');
});

function saGoToPage(page) {
    // Update active state in TOC
    var items = document.querySelectorAll('.sa-toc-item');
    items.forEach(function(item) { item.classList.remove('active'); });
    var clicked = document.querySelector('.sa-toc-item[data-page="' + page + '"]');
    if (clicked) clicked.classList.add('active');

    // Toggle page containers
    var risquesPage = document.getElementById('saResults');
    var milieuPage = document.getElementById('saMilieuPhysiquePage');

    if (page === 'MilieuPhysique') {
        if (risquesPage) risquesPage.style.display = 'none';
        if (milieuPage) milieuPage.style.display = '';
        // Render intro paragraph + data table
        saRenderMilieuPhysiqueIntro();
        saRenderMilieuPhysiqueTable();
        // Init map on first visit, invalidateSize on subsequent
        if (!saMpMap) {
            setTimeout(saMpInitMap, 100);
        } else {
            setTimeout(function() { saMpMap.invalidateSize(); }, 100);
            setTimeout(function() { if (saMpMap) saMpMap.invalidateSize(); }, 500);
        }
    } else {
        if (milieuPage) milieuPage.style.display = 'none';
        if (risquesPage) risquesPage.style.display = '';
        // Refresh main map size
        if (saState.map) setTimeout(function() { saState.map.invalidateSize(); }, 100);
    }

}

function saSetCount(name, n) {
    var el = document.getElementById('saCount' + name);
    if (el) el.textContent = n > 0 ? n + ' r\u00e9sultat' + (n > 1 ? 's' : '') : '';
    // Mark section as having alerts
    var sec = document.getElementById('saSection' + name);
    if (sec) { if (n > 0) sec.classList.add('has-alert'); else sec.classList.remove('has-alert'); }
}

function saRenderPdfLink() {
    var el = document.getElementById('saPdfSection');
    if (!el) return;
    el.style.display = '';
    el.className = 'sa-pdf-strip';
    el.innerHTML = '<span class="sa-pdf-strip-text">Rapport officiel G\u00e9orisques</span><a class="sa-pdf-link" href="https://georisques.gouv.fr/api/v1/rapport_pdf?latlon=' + saState.lon + ',' + saState.lat + '" target="_blank" rel="noopener">T\u00e9l\u00e9charger (PDF)</a>';
}


function saRenderRisques() {
    var body = document.getElementById('saBodyRisques');
    var r = saState.results ? saState.results.georisques || {} : {};
    var rows = [];

    // Sismique
    if (r.sismique && r.sismique.data && r.sismique.data.length > 0) {
        var zn = parseInt(r.sismique.data[0].code_zone) || 0;
        var labels = { 1: 'Tr\u00e8s faible', 2: 'Faible', 3: 'Mod\u00e9r\u00e9e', 4: 'Moyenne', 5: 'Forte' };
        rows.push({ theme: 'S\u00e9isme', defKey: 'seisme', level: zn >= 4 ? 'high' : zn >= 3 ? 'medium' : 'low',
            value: 'Zone ' + zn + ' \u2014 ' + (labels[zn] || ''), credits: ['Pol 03'] });
    }

    // Radon
    if (r.radon && r.radon.data && r.radon.data.length > 0) {
        var cl = parseInt(r.radon.data[0].classe_potentiel) || 0;
        rows.push({ theme: 'Radon', defKey: 'radon', level: cl >= 3 ? 'high' : cl >= 2 ? 'medium' : 'low',
            value: 'Classe ' + cl + '/3', credits: ['Pol 03', 'Hea 02'] });
    }

    // RGA — API returns { codeExposition, exposition } directly (no .data wrapper)
    // Enrich with rapport data for commune-level info
    var rgaRapport = (r.rapport && r.rapport.risquesNaturels && r.rapport.risquesNaturels.retraitGonflementArgile) || null;
    if (r.rga && (r.rga.exposition || r.rga.codeExposition)) {
        var exp = r.rga.exposition || 'Non renseign\u00e9';
        var code = parseInt(r.rga.codeExposition) || 0;
        var level = code >= 3 ? 'high' : code >= 2 ? 'medium' : 'low';
        var val = exp;
        if (rgaRapport && rgaRapport.libelleStatutCommune) {
            val += ' | Commune : ' + rgaRapport.libelleStatutCommune.replace('Risque Existant - ', '');
        }
        rows.push({ theme: 'Retrait-gonflement argiles', defKey: 'retrait_gonflement_argiles', level: level,
            value: val, credits: ['Pol 03'] });
    } else if (rgaRapport && rgaRapport.present) {
        // Fallback to rapport if specific API fails
        var statut = rgaRapport.libelleStatutAdresse || rgaRapport.libelleStatutCommune || 'Existant';
        var lvl = /fort|important/i.test(statut) ? 'high' : /mod\u00e9r\u00e9|moyen/i.test(statut) ? 'medium' : 'low';
        rows.push({ theme: 'Retrait-gonflement argiles', defKey: 'retrait_gonflement_argiles', level: lvl,
            value: statut.replace('Risque ', ''), credits: ['Pol 03'] });
    }

    // TRI (inondation)
    if (r.tri && r.tri.data && r.tri.data.length > 0) {
        var triNames = r.tri.data.slice(0, 3).map(function(t) { return t.libelle || t.nom_tri || 'Zone TRI'; });
        rows.push({ theme: 'Inondation (TRI)', defKey: 'inondation_tri_', level: 'high', value: triNames.join(', '), credits: ['LE 04', 'Pol 03'] });
    }

    // Cavit\u00e9s
    if (r.cavites && r.cavites.data && r.cavites.data.length > 0) {
        var n = r.cavites.data.length;
        rows.push({ theme: 'Cavit\u00e9s souterraines', defKey: 'cavites_souterraines', level: n > 5 ? 'high' : 'medium',
            value: n + ' dans un rayon de 3 km', credits: ['Pol 03'] });
    }

    // Mouvements de terrain — combine BDMvt inventory + rapport status
    var mvtFromBD = (r.mvt && r.mvt.data && r.mvt.data.length > 0) ? r.mvt.data : [];
    var mvtRapport = (r.rapport && r.rapport.risquesNaturels && r.rapport.risquesNaturels.mouvementTerrain) || null;
    if (mvtFromBD.length > 0) {
        var n = mvtFromBD.length;
        var types = {};
        mvtFromBD.forEach(function(m) { var t = m.type || 'Autre'; types[t] = (types[t]||0)+1; });
        var detail = Object.keys(types).map(function(t) { return t + ' (' + types[t] + ')'; }).join(', ');
        var val = n + ' recens\u00e9(s) dans un rayon de 3 km : ' + detail;
        if (mvtRapport && mvtRapport.libelleStatutAdresse) val += ' | Adresse : ' + mvtRapport.libelleStatutAdresse.replace('Risque ', '');
        rows.push({ theme: 'Mouvements de terrain', defKey: 'mouvements_de_terrain', level: n > 10 ? 'high' : n > 3 ? 'medium' : 'low',
            value: val, credits: ['Pol 03'] });
    } else if (mvtRapport && mvtRapport.present) {
        var statut = mvtRapport.libelleStatutAdresse || mvtRapport.libelleStatutCommune || 'Existant';
        var lvl = /fort|important/i.test(statut) ? 'high' : /mod\u00e9r\u00e9|moyen/i.test(statut) ? 'medium' : 'low';
        rows.push({ theme: 'Mouvements de terrain', defKey: 'mouvements_de_terrain', level: lvl, value: statut.replace('Risque ', ''), credits: ['Pol 03'] });
    }

    // CatNat
    if (r.catnat && r.catnat.data) {
        var n = r.catnat.data.length;
        if (n > 0) {
            var types = {};
            r.catnat.data.forEach(function(c) { var t = c.libelle_risque_jo || 'Autre'; types[t] = (types[t]||0)+1; });
            var detail = Object.keys(types).map(function(t) { return t + ' (' + types[t] + ')'; }).join(', ');
            rows.push({ theme: 'Arr\u00eat\u00e9s CatNat', defKey: 'arretes_catnat', level: n > 10 ? 'high' : n > 3 ? 'medium' : 'low',
                value: n + ' arr\u00eat\u00e9(s) : ' + detail, credits: ['LE 04'] });
        }
    }

    // PPR
    if (r.ppr && r.ppr.data && r.ppr.data.length > 0) {
        var pprs = r.ppr.data;
        var names = pprs.slice(0, 3).map(function(p) { return p.libelle_risque_long || p.libelle_risque_jo || 'PPR'; });
        rows.push({ theme: 'PPR', defKey: 'ppr', level: 'info', value: pprs.length + ' plan(s) : ' + names.join(', ') + (pprs.length > 3 ? '...' : ''), credits: ['LE 04'] });
    }

    // Qualit\u00e9 de l'air (indice ATMO via Atmo Data WFS)
    var aq = saState.results.airQuality;
    if (aq && aq.source === 'atmo' && aq.code_qual != null) {
        var cq = aq.code_qual;
        var aqLevel = cq <= 2 ? 'low' : cq <= 4 ? 'medium' : 'high';
        var aqDetails = 'Indice ATMO ' + cq + '/6 \u2014 ' + (aq.lib_qual || '');
        // Sub-indices per pollutant (1=Bon ... 6=Extr\u00eamement mauvais)
        var subLabels = { 1: 'Bon', 2: 'Moyen', 3: 'D\u00e9grad\u00e9', 4: 'Mauvais', 5: 'Tr\u00e8s mauvais', 6: 'Extr. mauvais' };
        var subs = [];
        if (aq.code_pm25) subs.push('PM2.5\u00a0: ' + (subLabels[aq.code_pm25] || aq.code_pm25));
        if (aq.code_pm10) subs.push('PM10\u00a0: ' + (subLabels[aq.code_pm10] || aq.code_pm10));
        if (aq.code_no2) subs.push('NO\u2082\u00a0: ' + (subLabels[aq.code_no2] || aq.code_no2));
        if (aq.code_o3) subs.push('O\u2083\u00a0: ' + (subLabels[aq.code_o3] || aq.code_o3));
        if (aq.code_so2) subs.push('SO\u2082\u00a0: ' + (subLabels[aq.code_so2] || aq.code_so2));
        if (subs.length > 0) aqDetails += ' | ' + subs.join(', ');
        if (aq.date_ech) aqDetails += ' (' + aq.date_ech + ')';
        // Enrich with active episodes
        var ep = saState.results.episodes || {};
        if (ep.actifs && ep.actifs.length > 0) {
            aqLevel = 'high'; // upgrade level if active episode
            var epPols = ep.actifs.map(function (e) { return e.polluant; });
            aqDetails += ' | \u26a0 \u00c9pisode en cours\u00a0: ' + epPols.join(', ');
        }
        if (ep.historique && ep.historique.length > 0) {
            aqDetails += ' | ' + ep.historique.length + ' \u00e9pisode(s) sur 12 mois';
            if (aqLevel === 'low' && ep.historique.length >= 5) aqLevel = 'medium';
        }
        rows.push({ theme: 'Qualit\u00e9 de l\u2019air', defKey: 'qualite_air', level: aqLevel, value: aqDetails, credits: ['Hea 02', 'Pol 03'] });
    }

    // Bruit aérien (PEB / PGS via GetFeatureInfo)
    var br = saState.results.bruit || {};
    var pebFeats = (br.peb && br.peb.features) ? br.peb.features : [];
    var pgsFeats = (br.pgs && br.pgs.features) ? br.pgs.features : [];
    if (pebFeats.length > 0 || pgsFeats.length > 0) {
        var brParts = [];
        if (pebFeats.length > 0) {
            var pebZone = pebFeats[0].properties.zone || '?';
            var pebNom = pebFeats[0].properties.nom || '';
            brParts.push('PEB zone ' + pebZone + (pebNom ? ' (' + pebNom + ')' : ''));
        }
        if (pgsFeats.length > 0) {
            var pgsZone = pgsFeats[0].properties.zone || pgsFeats[0].properties.type_zone || '?';
            brParts.push('PGS zone ' + pgsZone);
        }
        var brLevel = 'high';
        if (pebFeats.length > 0) {
            var z = (pebFeats[0].properties.zone || '').toUpperCase();
            brLevel = (z === 'A' || z === 'B') ? 'high' : 'medium';
        }
        rows.push({ theme: 'Bruit a\u00e9rien', defKey: 'bruit_peb', level: brLevel, value: brParts.join(' + '), credits: ['Hea 05', 'Pol 05'] });
    } else if (br.pebProximite) {
        // Pas dans la zone PEB mais un aérodrome à proximité (~3 km)
        var proxNom = br.pebProximite.nom || 'inconnu';
        var proxDist = br.pebProximite.distance || '?';
        var proxLevel = proxDist <= 1500 ? 'medium' : 'low';
        rows.push({ theme: 'Bruit a\u00e9rien', defKey: 'bruit_peb', level: proxLevel,
            value: 'Hors zone PEB mais a\u00e9rodrome \u00e0 ' + proxDist + '\u00a0m\u00a0: ' + proxNom,
            credits: ['Hea 05'] });
    }
    // Si aucun PEB même à proximité : aucune ligne affichée

    // Bruit routier / ferroviaire (BDTopo IGN — infrastructures de transport à proximité)
    var brr = saState.results.bruitRoutier || {};
    var infras = brr.infras || [];
    if (infras.length > 0) {
        // Classify by closest infrastructure
        var closest = infras[0];
        var catLabels = {
            motorway: 'Autoroute', motorway_link: 'Bretelle autoroute', trunk: 'Voie express',
            trunk_link: 'Bretelle voie express', primary: 'Route nationale/d\u00e9partementale',
            secondary: 'Route secondaire', rail: 'Voie ferr\u00e9e', light_rail: 'Tramway/m\u00e9tro l\u00e9ger'
        };
        var catLabel = catLabels[closest.type] || closest.type;
        var closestName = closest.name ? ' (' + closest.name + ')' : '';

        // Classement sonore approximatif basé sur la distance + type
        var brrLevel, brrClassement;
        var isHighTraffic = (closest.type === 'motorway' || closest.type === 'trunk' || closest.type === 'motorway_link' || closest.type === 'trunk_link');
        var isRail = (closest.type === 'rail' || closest.type === 'light_rail');

        if (isHighTraffic && closest.distance <= 100) {
            brrLevel = 'high'; brrClassement = 'Cat. 1\u20132 (zone de bruit \u2265 250 m)';
        } else if (isHighTraffic && closest.distance <= 250) {
            brrLevel = 'high'; brrClassement = 'Cat. 2\u20133 (zone de bruit 100\u2013250 m)';
        } else if ((isHighTraffic && closest.distance <= 500) || (closest.type === 'primary' && closest.distance <= 100)) {
            brrLevel = 'medium'; brrClassement = 'Cat. 3 (zone de bruit \u2264 100 m)';
        } else if (closest.type === 'primary' && closest.distance <= 250) {
            brrLevel = 'medium'; brrClassement = 'Cat. 3\u20134 (zone de bruit 30\u2013100 m)';
        } else if (isRail && closest.distance <= 150) {
            brrLevel = 'medium'; brrClassement = 'Proximit\u00e9 ferroviaire';
        } else if (isRail && closest.distance <= 300) {
            brrLevel = 'low'; brrClassement = 'Proximit\u00e9 ferroviaire mod\u00e9r\u00e9e';
        } else {
            brrLevel = 'low'; brrClassement = 'Faible exposition';
        }

        // Count by type
        var roadCount = infras.filter(function (i) { return !i.type.match(/rail|light_rail/); }).length;
        var railCount = infras.filter(function (i) { return i.type.match(/rail|light_rail/); }).length;
        var brrValue = catLabel + closestName + ' \u00e0 ' + closest.distance + '\u00a0m';
        if (roadCount + railCount > 1) {
            var parts = [];
            if (roadCount > 0) parts.push(roadCount + ' route' + (roadCount > 1 ? 's' : ''));
            if (railCount > 0) parts.push(railCount + ' voie' + (railCount > 1 ? 's' : '') + ' ferr\u00e9e' + (railCount > 1 ? 's' : ''));
            brrValue += ' | ' + parts.join(', ') + ' dans un rayon de 500\u00a0m';
        }

        rows.push({ theme: 'Bruit routier / ferroviaire', defKey: 'bruit_routier', level: brrLevel, value: brrValue, credits: ['Hea 05', 'Pol 05'] });
    } else if (brr.error) {
        rows.push({ theme: 'Bruit routier / ferroviaire', defKey: 'bruit_routier', level: 'low', value: 'Donn\u00e9es indisponibles (erreur r\u00e9seau)', credits: ['Hea 05'] });
    } else {
        rows.push({ theme: 'Bruit routier / ferroviaire', defKey: 'bruit_routier', level: 'low', value: 'Aucune infrastructure de transport majeure dans un rayon de 500\u00a0m', credits: ['Hea 05'] });
    }

    // NOTE: GASPAR risques communaux (r.risques) are generic municipal inventory entries
    // (e.g. "Inondation", "Mouvement de terrain") that duplicate the specific API results
    // above (sismique, radon, rga, tri, cavites, catnat, ppr) in less precise form.
    // They are intentionally excluded from the table to avoid inflating the count.

    saSetCount('Risques', rows.length);

    // Build table
    if (rows.length === 0) {
        body.innerHTML = '<div class="sa-empty">Aucune donn\u00e9e de risque retourn\u00e9e pour cette localisation.</div>';
        return;
    }

    var h = '<table class="sa-table"><thead><tr><th></th><th>Risque</th><th>Niveau</th><th>D\u00e9tail</th><th>Cr\u00e9dits BREEAM</th></tr></thead><tbody>';
    rows.forEach(function(row) {
        var levLabel = row.level === 'high' ? '\u00c9lev\u00e9' : row.level === 'medium' ? 'Mod\u00e9r\u00e9' : row.level === 'low' ? 'Faible' : row.level === 'info' ? 'Info' : 'N/A';
        var key = row.defKey || saSlugify(row.theme);
        h += '<tr><td style="width:32px;text-align:center;"><button class="sa-loupe" onclick="openSaDetailPanel(\'risque\',\'' + key + '\')" title="D\u00e9tail"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 014.383 8.823l3.896 3.9a.75.75 0 01-1.06 1.06l-3.9-3.896A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/></svg></button></td>';
        h += '<td><strong>' + row.theme + '</strong></td>';
        h += '<td><span class="sa-sev sa-sev-' + row.level + '">' + levLabel + '</span></td>';
        h += '<td>' + row.value + '</td>';
        h += '<td>' + (row.credits.length > 0 ? row.credits.map(function(c) { return '<span class="sa-credit">' + c + '</span>'; }).join(' ') : '\u2014') + '</td>';
        h += '</tr>';
    });
    h += '</tbody></table>';
    body.innerHTML = h;
}

function saRenderBiodiversite() {
    var body = document.getElementById('saBodyBiodiversite');
    var r = saState.results.biodiversite || {};
    var rows = [];

    var layerNames = {
        natura_sic: { name: 'Natura 2000 \u2014 Habitats (SIC)', tag: 'LE 03', defKey: 'natura_2000___habitats_sic_' },
        natura_zps: { name: 'Natura 2000 \u2014 Oiseaux (ZPS)', tag: 'LE 03', defKey: 'natura_2000___oiseaux_zps_' },
        znieff1: { name: 'ZNIEFF Type I', tag: 'LE 03', defKey: 'znieff_type_i' },
        znieff2: { name: 'ZNIEFF Type II', tag: 'LE 03', defKey: 'znieff_type_ii' },
        rnc: { name: 'R\u00e9serve Naturelle de Corse', tag: 'LE 03', defKey: 'reserve_naturelle_de_corse' },
        rnn: { name: 'R\u00e9serve Naturelle Nationale', tag: 'LE 03', defKey: 'reserve_naturelle_nationale' }
    };

    Object.keys(layerNames).forEach(function (key) {
        var data = r[key];
        var info = layerNames[key];
        if (data && data.features && data.features.length > 0) {
            data.features.forEach(function (f) {
                var p = f.properties || {};
                var name = p.nom || p.sitename || p.name || p.NOM || 'Zone non nomm\u00e9e';
                var id = p.sitecode || p.id_mnhn || p.ID_MNHN || '';
                rows.push({
                    type: info.name,
                    defKey: info.defKey,
                    level: 'info',
                    detail: saEscH(name) + (id ? ' (ID\u00a0: ' + saEscH(id) + ')' : ''),
                    credits: [info.tag]
                });
            });
        }
    });

    saSetCount('Biodiversite', rows.length);

    if (rows.length === 0) {
        body.innerHTML = '<div class="sa-empty">Aucune zone prot\u00e9g\u00e9e identifi\u00e9e dans un rayon de ~1\u00a0km. Favorable pour le cr\u00e9dit LE 03.</div>';
        return;
    }

    var h = '<table class="sa-table"><thead><tr><th></th><th>Type de zone</th><th>Statut</th><th>D\u00e9tail</th><th>Cr\u00e9dits BREEAM</th></tr></thead><tbody>';
    rows.forEach(function (row) {
        var key = row.defKey || saSlugify(row.type);
        h += '<tr><td style="width:32px;text-align:center;"><button class="sa-loupe" onclick="openSaDetailPanel(\'biodiversite\',\'' + key + '\')" title="D\u00e9tail"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 014.383 8.823l3.896 3.9a.75.75 0 01-1.06 1.06l-3.9-3.896A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/></svg></button></td>';
        h += '<td><strong>' + row.type + '</strong></td>';
        h += '<td><span class="sa-sev sa-sev-' + row.level + '">Pr\u00e9sente</span></td>';
        h += '<td>' + row.detail + '</td>';
        h += '<td>' + row.credits.map(function (c) { return '<span class="sa-credit">' + c + '</span>'; }).join(' ') + '</td>';
        h += '</tr>';
    });
    h += '</tbody></table>';
    body.innerHTML = h;
}

function saRenderUrbanisme() {
    var body = document.getElementById('saBodyUrbanisme');
    var r = saState.results.urbanisme;
    var rows = [];

    var typeZoneLabels = {
        'U': 'Urbanis\u00e9e', 'AU': '\u00c0 Urbaniser', 'A': 'Agricole', 'N': 'Naturelle',
        'AUc': '\u00c0 Urbaniser Constructible', 'AUs': '\u00c0 Urbaniser Stricte'
    };

    if (r && r.features && r.features.length > 0) {
        r.features.forEach(function (f) {
            var p = f.properties || {};
            var libelle = p.libelle || p.libelong || 'Zone non renseign\u00e9e';
            var typezone = p.typezone || '?';
            var destdom = p.destdomi || '';
            var level = typezone === 'N' ? 'info' : typezone === 'A' ? 'medium' : typezone === 'AU' || typezone === 'AUc' || typezone === 'AUs' ? 'medium' : 'low';
            rows.push({
                zone: typezone,
                level: level,
                detail: saEscH(libelle) + (typeZoneLabels[typezone] ? ' \u2014 ' + typeZoneLabels[typezone] : '') + (destdom ? '<br>Destination dominante\u00a0: ' + saEscH(destdom) : ''),
                credits: ['LE 01', 'LE 04']
            });
        });
    }

    saSetCount('Urbanisme', rows.length);

    if (r && r.error) {
        body.innerHTML = '<div class="sa-empty">Erreur lors de l\'interrogation de l\'API Urbanisme\u00a0: ' + saEscH(r.error) + '</div>';
        return;
    }

    if (rows.length === 0) {
        body.innerHTML = '<div class="sa-empty">Aucune donn\u00e9e PLU trouv\u00e9e pour ce point. La commune n\'a peut-\u00eatre pas encore num\u00e9ris\u00e9 son PLU.</div>';
        return;
    }

    var h = '<table class="sa-table"><thead><tr><th></th><th>Zone PLU</th><th>Classification</th><th>D\u00e9tail</th><th>Cr\u00e9dits BREEAM</th></tr></thead><tbody>';
    rows.forEach(function (row) {
        var levLabel = row.level === 'info' ? 'Naturelle' : row.level === 'medium' ? 'Attention' : 'Favorable';
        h += '<tr><td style="width:32px;text-align:center;"><button class="sa-loupe" onclick="openSaDetailPanel(\'urbanisme\',\'' + saEscH(row.zone) + '\')" title="D\u00e9tail"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 014.383 8.823l3.896 3.9a.75.75 0 01-1.06 1.06l-3.9-3.896A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/></svg></button></td>';
        h += '<td><strong>' + row.zone + '</strong></td>';
        h += '<td><span class="sa-sev sa-sev-' + row.level + '">' + levLabel + '</span></td>';
        h += '<td>' + row.detail + '</td>';
        h += '<td>' + row.credits.map(function (c) { return '<span class="sa-credit">' + c + '</span>'; }).join(' ') + '</td>';
        h += '</tr>';
    });
    h += '</tbody></table>';
    body.innerHTML = h;
}

function saRenderICPE() {
    var body = document.getElementById('saBodyICPE');
    var r = saState.results.icpe;
    var rows = [];

    if (r && r.data && r.data.length > 0) {
        r.data.forEach(function (i) {
            var isSeveso = i.regime_seveso && i.regime_seveso !== 'Non Seveso';
            var regime = isSeveso ? 'SEVESO \u2014 ' + (i.regime_seveso || '') : (i.regime || 'D\u00e9claration');
            var level = isSeveso ? 'high' : regime === 'Autorisation' ? 'medium' : regime === 'Enregistrement' ? 'low' : 'low';
            rows.push({
                etablissement: saEscH(i.nom_ets || '\u00c9tablissement non nomm\u00e9'),
                level: level,
                regime: saEscH(regime),
                detail: (i.adresse ? saEscH(i.adresse) : '') + (i.lib_activite ? (i.adresse ? '<br>' : '') + 'Activit\u00e9\u00a0: ' + saEscH(i.lib_activite) : ''),
                credits: isSeveso ? ['Pol 03', 'Hea 02'] : ['Pol 03']
            });
        });
    }

    saSetCount('ICPE', rows.length);

    if (r && r.error) {
        body.innerHTML = '<div class="sa-empty">Erreur\u00a0: ' + saEscH(r.error) + '</div>';
        return;
    }

    if (rows.length === 0) {
        body.innerHTML = '<div class="sa-empty">Aucune installation class\u00e9e recens\u00e9e dans un rayon de 2\u00a0km.</div>';
        return;
    }

    var shown = rows.slice(0, 15);
    var h = '<table class="sa-table"><thead><tr><th></th><th>\u00c9tablissement</th><th>R\u00e9gime</th><th>D\u00e9tail</th><th>Cr\u00e9dits BREEAM</th></tr></thead><tbody>';
    shown.forEach(function (row, idx) {
        h += '<tr><td style="width:32px;text-align:center;"><button class="sa-loupe" onclick="openSaDetailPanel(\'icpe\',' + idx + ')" title="D\u00e9tail"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 014.383 8.823l3.896 3.9a.75.75 0 01-1.06 1.06l-3.9-3.896A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/></svg></button></td>';
        h += '<td><strong>' + row.etablissement + '</strong></td>';
        h += '<td><span class="sa-sev sa-sev-' + row.level + '">' + saEscH(row.regime) + '</span></td>';
        h += '<td>' + row.detail + '</td>';
        h += '<td>' + row.credits.map(function (c) { return '<span class="sa-credit">' + c + '</span>'; }).join(' ') + '</td>';
        h += '</tr>';
    });
    h += '</tbody></table>';
    if (rows.length > 15) {
        h += '<p style="color:#64748B;font-size:0.85rem;margin-top:8px;">... et ' + (rows.length - 15) + ' autres ICPE dans un rayon de 2\u00a0km</p>';
    }
    body.innerHTML = h;
}

function saRenderPollution() {
    var body = document.getElementById('saBodyPollution');
    var r = saState.results.pollution || {};
    var rows = [];

    // SSP unifi\u00e9
    if (r.ssp && r.ssp.data && r.ssp.data.length > 0) {
        r.ssp.data.forEach(function (s) {
            var type = s.type_base || s.source || 'SSP';
            var level = (type.indexOf('SIS') !== -1 || type.indexOf('BASOL') !== -1) ? 'high' : 'medium';
            rows.push({
                nom: saEscH(s.nom || s.raison_sociale || 'Site non nomm\u00e9'),
                level: level,
                base: saEscH(type),
                detail: (s.adresse ? saEscH(s.adresse) : '') + (s.activite ? (s.adresse ? '<br>' : '') + 'Activit\u00e9\u00a0: ' + saEscH(s.activite) : ''),
                credits: ['LE 01', 'Pol 03']
            });
        });
    }

    // SIS
    if (r.sis && r.sis.data && r.sis.data.length > 0) {
        r.sis.data.forEach(function (s) {
            rows.push({
                nom: saEscH(s.nom || 'Site non nomm\u00e9'),
                level: 'high',
                base: 'SIS',
                detail: (s.adresse ? saEscH(s.adresse) : '') + (s.commune ? (s.adresse ? '<br>' : '') + 'Commune\u00a0: ' + saEscH(s.commune) : ''),
                credits: ['LE 01', 'Pol 03']
            });
        });
    }

    // CASIAS (ex-BASIAS)
    if (r.casias && r.casias.data && r.casias.data.length > 0) {
        r.casias.data.forEach(function (s) {
            rows.push({
                nom: saEscH(s.raison_sociale || s.nom || 'Site non nomm\u00e9'),
                level: 'medium',
                base: 'CASIAS (ex-BASIAS)',
                detail: (s.adresse ? saEscH(s.adresse) : '') + (s.activite ? (s.adresse ? '<br>' : '') + 'Activit\u00e9\u00a0: ' + saEscH(s.activite) : ''),
                credits: ['LE 01']
            });
        });
    }

    // Instructions (ex-BASOL)
    if (r.instructions && r.instructions.data && r.instructions.data.length > 0) {
        r.instructions.data.forEach(function (s) {
            rows.push({
                nom: saEscH(s.nom || s.raison_sociale || 'Site non nomm\u00e9'),
                level: 'high',
                base: 'Instruction SSP (ex-BASOL)',
                detail: (s.adresse ? saEscH(s.adresse) : '') + (s.etat_instruction ? (s.adresse ? '<br>' : '') + '\u00c9tat\u00a0: ' + saEscH(s.etat_instruction) : ''),
                credits: ['LE 01', 'Pol 03']
            });
        });
    }

    saSetCount('Pollution', rows.length);

    if (rows.length === 0) {
        body.innerHTML = '<div class="sa-empty">Aucun site pollu\u00e9 ou ancien site industriel recens\u00e9 dans un rayon de 1\u00a0km. Favorable pour les cr\u00e9dits LE 01 et Pol 03.</div>';
        return;
    }

    var shown = rows.slice(0, 20);
    var h = '<table class="sa-table"><thead><tr><th></th><th>Site</th><th>Base</th><th>D\u00e9tail</th><th>Cr\u00e9dits BREEAM</th></tr></thead><tbody>';
    shown.forEach(function (row, idx) {
        h += '<tr><td style="width:32px;text-align:center;"><button class="sa-loupe" onclick="openSaDetailPanel(\'pollution\',' + idx + ')" title="D\u00e9tail"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 014.383 8.823l3.896 3.9a.75.75 0 01-1.06 1.06l-3.9-3.896A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/></svg></button></td>';
        h += '<td><strong>' + row.nom + '</strong></td>';
        h += '<td><span class="sa-sev sa-sev-' + row.level + '">' + saEscH(row.base) + '</span></td>';
        h += '<td>' + row.detail + '</td>';
        h += '<td>' + row.credits.map(function (c) { return '<span class="sa-credit">' + c + '</span>'; }).join(' ') + '</td>';
        h += '</tr>';
    });
    h += '</tbody></table>';
    if (rows.length > 20) {
        h += '<p style="color:#64748B;font-size:0.85rem;margin-top:8px;">... et ' + (rows.length - 20) + ' autres sites dans un rayon de 1\u00a0km</p>';
    }
    body.innerHTML = h;
}

// ── MAP ──────────────────────────────────────────────────────
function saInitMap(lat, lon) {
    var mapDiv = document.getElementById('saMap');
    var mapSection = document.getElementById('saMapSection');
    if (!mapDiv || typeof L === 'undefined') return;

    // Destroy previous map if exists
    if (saState.map) {
        saState.map.remove();
        saState.map = null;
    }

    // Create map (container is always visible, no display:none issue)
    saState.map = L.map('saMap', {
        center: [lat, lon],
        zoom: 17,
        zoomControl: true
    });

    // Define tile layers
    // IGN Orthophotos (vue aérienne) — Géoplateforme
    saState.mapLayers.aerial = L.tileLayer(
        'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg',
        {
            attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>',
            maxZoom: 20
        }
    );

    // IGN Plan V2
    saState.mapLayers.plan = L.tileLayer(
        'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png',
        {
            attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>',
            maxZoom: 19
        }
    );

    // Cadastre (parcellaire)
    saState.mapLayers.cadastre = L.layerGroup([
        L.tileLayer(
            'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg',
            { attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>', maxZoom: 20 }
        ),
        L.tileLayer.wms(
            'https://data.geopf.fr/wms-v/ows',
            {
                layers: 'CADASTRALPARCELS.PARCELLAIRE_EXPRESS',
                format: 'image/png',
                transparent: true,
                attribution: '&copy; IGN Cadastre',
                maxZoom: 20
            }
        )
    ]);

    // Add default layer (aerial)
    saState.currentLayer = 'aerial';
    saState.mapLayers.aerial.addTo(saState.map);

    // Add marker
    var markerIcon = L.divIcon({
        className: 'sa-map-marker',
        html: '<div style="background:#10B981;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });
    saState.mapMarker = L.marker([lat, lon], { icon: markerIcon }).addTo(saState.map);
    saState.mapMarker.bindPopup('<strong>' + (saState.address || 'Projet') + '</strong>').openPopup();

    // Add scale
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(saState.map);

    // Safety invalidateSize
    setTimeout(function () { if (saState.map) saState.map.invalidateSize(); }, 200);
}

function saSetMapLayer(layerName) {
    if (!saState.map || !saState.mapLayers[layerName]) return;

    // Remove current layer
    if (saState.mapLayers[saState.currentLayer]) {
        saState.map.removeLayer(saState.mapLayers[saState.currentLayer]);
    }

    // Add new layer
    saState.mapLayers[layerName].addTo(saState.map);
    saState.currentLayer = layerName;

    // Update button states
    document.querySelectorAll('.sa-map-layer-btn').forEach(function (btn) {
        btn.classList.remove('active');
    });
    var activeBtn = document.getElementById('saLayer' + layerName.charAt(0).toUpperCase() + layerName.slice(1));
    if (activeBtn) activeBtn.classList.add('active');
}

// ── MILIEU PHYSIQUE INTRO ───────────────────────────────────
var saMpCommuneCache = {};

function saRenderMilieuPhysiqueIntro() {
    var el = document.getElementById('saMpIntro');
    if (!el) return;

    // Show loading state
    el.innerHTML = '<div class="sa-synthesis-title">Contexte du site</div><div class="sa-synthesis-body" style="padding:24px 16px;color:#94A3B8;font-size:0.86rem;">Chargement...</div>';

    var code = saState.codeInsee;
    if (!code) { saMpBuildIntro(el, null, null); return; }

    // Check cache
    if (saMpCommuneCache[code]) {
        saMpBuildIntro(el, saMpCommuneCache[code].geo, saMpCommuneCache[code].wiki);
        return;
    }

    // Fetch geo first (need department name for Wikipedia disambiguation), then Wikipedia
    var geoData = null, wikiData = null;

    function saMpFetchWiki(title) {
        return fetch('https://fr.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=extracts&explaintext=1&format=json&origin=*')
            .then(function(r) { return r.json(); })
            .then(function(d) {
                var pages = d && d.query && d.query.pages;
                if (!pages) return null;
                for (var id in pages) {
                    if (id === '-1') return null;
                    var txt = pages[id].extract || '';
                    // Only check disambiguation patterns in the first 300 chars (intro)
                    var head = txt.substring(0, 300);
                    if (/peut (d[ée]signer|r[ée]f[ée]rer|faire r[ée]f[ée]rence)/i.test(head)) return null;
                    if (/est un (nom propre|nom commun|toponyme)/i.test(head)) return null;
                    if (/homonymie/i.test(head)) return null;
                    if (txt.length > 80) return txt;
                }
                return null;
            });
    }

    fetch('https://geo.api.gouv.fr/communes/' + code + '?fields=nom,code,codesPostaux,population,departement,region,surface')
        .then(function(r) { return r.json(); })
        .then(function(d) { geoData = d; })
        .catch(function() {})
        .then(function() {
            // Try multiple Wikipedia title variants for best match
            var communeName = saState.commune || '';
            var depName = (geoData && geoData.departement) ? geoData.departement.nom : '';
            var regionName = (geoData && geoData.region) ? geoData.region.nom : '';
            var titles = [];
            if (depName) titles.push(communeName + ' (' + depName + ')');
            titles.push(communeName + ' (commune)');
            if (regionName) titles.push(communeName + ' (' + regionName + ')');
            titles.push(communeName);

            function tryNext(i) {
                if (i >= titles.length) return Promise.resolve(null);
                return saMpFetchWiki(titles[i]).then(function(txt) {
                    if (txt) return txt;
                    return tryNext(i + 1);
                });
            }

            return tryNext(0)
                .then(function(txt) {
                    if (txt) wikiData = saMpParseWikiSections(txt);
                })
                .catch(function() {});
        })
        .then(function() {
            saMpCommuneCache[code] = { geo: geoData, wiki: wikiData };
            saMpBuildIntro(el, geoData, wikiData);
        });
}

function saMpParseWikiSections(fullText) {
    // Remove pronunciation guides like (prononcé : /va.lɑ̃.sjɛn/)
    fullText = fullText.replace(/\(prononc[ée][^)]*\)\s*/g, '');
    // Remove reference markers like [1], [note 2]
    fullText = fullText.replace(/\[[^\]]{0,20}\]/g, '');

    // IMPORTANT: use == markers to split sections BEFORE removing them
    // Wikipedia plaintext uses "== Title ==" or "=== Subtitle ===" on their own lines
    // First, ensure each == heading is on its own line
    fullText = fullText.replace(/\n*(={2,})\s*([^=\n]+?)\s*\1\n*/g, '\n§HEADING§$2\n');

    // Collapse multiple spaces (but keep newlines)
    fullText = fullText.replace(/[ \t]+/g, ' ');

    var result = { intro: '', geo: '', economie: '', patrimoine: '', histoire: '', population: '' };
    var lines = fullText.split(/\n+/);
    var currentSection = 'intro';
    var sectionMap = {
        'geographie': 'geo', 'localisation': 'geo', 'geologie et relief': 'geo',
        'hydrographie': 'geo', 'climat': 'geo', 'topographie': 'geo', 'relief': 'geo',
        'situation': 'geo', 'site': 'geo', 'communes limitrophes': 'geo',
        'economie': 'economie', 'emploi': 'economie', 'entreprises': 'economie',
        'revenus de la population': 'economie', 'secteurs d\'activite': 'economie',
        'culture locale et patrimoine': 'patrimoine', 'culture et patrimoine': 'patrimoine',
        'patrimoine': 'patrimoine', 'lieux et monuments': 'patrimoine', 'monuments': 'patrimoine',
        'personnalites liees a la commune': 'patrimoine', 'gastronomie': 'patrimoine',
        'histoire': 'histoire', 'prehistoire': 'histoire', 'antiquite': 'histoire',
        'moyen age': 'histoire', 'epoque moderne': 'histoire', 'epoque contemporaine': 'histoire',
        'population et societe': 'population', 'demographie': 'population',
        'evolution demographique': 'population'
    };

    // Sections to skip (too noisy or list-heavy)
    var skipSections = {
        'voir aussi': true, 'notes et references': true, 'references': true,
        'liens externes': true, 'bibliographie': true, 'articles connexes': true,
        'jumelages': true, 'distinctions': true,
        'heraldique': true, 'politique et administration': true, 'administration': true,
        'liste des maires': true, 'transports': true, 'enseignement': true,
        'sports': true, 'media': true, 'cultes': true, 'sante': true
    };
    var inSkip = false;

    lines.forEach(function(line) {
        var trimmed = line.trim();
        if (!trimmed) return;

        // Check for heading marker we inserted
        var headingMatch = trimmed.match(/^§HEADING§(.+)$/);
        if (headingMatch) {
            var title = headingMatch[1].trim();
            var norm = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z' ]/g, '').trim();
            if (sectionMap[norm]) {
                currentSection = sectionMap[norm];
                inSkip = false;
            } else if (skipSections[norm]) {
                inSkip = true;
            }
            // else: unknown subsection, stay in current section
            return;
        }

        if (inSkip) return;

        // Only keep actual prose (skip very short lines that look like list items or table remnants)
        if (trimmed.length < 20) return;

        if (result[currentSection] !== undefined) {
            result[currentSection] += (result[currentSection] ? ' ' : '') + trimmed;
        }
    });

    return result;
}

function saMpTruncSentences(text, maxSentences, filterIntro) {
    if (!text) return '';
    if (filterIntro) {
        // Strip phonetic transcription blocks like (/pa.ʁi/ ) before splitting
        text = text.replace(/\s*\(\/[^)]*\/\s*\)\s*/g, ' ');
        // Strip (prononcé...) blocks
        text = text.replace(/\s*\(prononc[ée][^)]*\)\s*/gi, ' ');
        // Fix orphan comma/space after removal: "Paris , est" → "Paris est"
        text = text.replace(/\s+,\s+/g, ' ');
        // Collapse extra spaces
        text = text.replace(/\s{2,}/g, ' ').trim();
    }
    var sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    if (filterIntro) {
        sentences = sentences.filter(function(s) {
            // Ancient history, etymology — not relevant for a site context
            if (/si[èe]cle\b.*\b(avant|apr[èe]s)\b/i.test(s)) return false;
            if (/\b(Lut[èe]ce|gaulois|Parisii|Clovis|m[ée]rovingien|carolingien|romain)\b/i.test(s)) return false;
            if (/peuple\b.*\bnom\b.*\bville/i.test(s)) return false;
            return true;
        });
    }
    return sentences.slice(0, maxSentences).join(' ').trim();
}

function saMpBuildIntro(el, geo, wiki) {
    var r = saState.results || {};
    var gr = r.georisques || {};
    var commune = saState.commune || '';

    // Geo data
    var population = geo ? geo.population : null;
    var surface = geo ? geo.surface : null; // in hectares
    var depNom = (geo && geo.departement) ? geo.departement.nom : '';
    var depCode = (geo && geo.departement) ? geo.departement.code : (saState.codeInsee ? saState.codeInsee.substring(0, 2) : '');
    var regionNom = (geo && geo.region) ? geo.region.nom : '';
    var codesPostaux = (geo && geo.codesPostaux) ? geo.codesPostaux : [];

    // Zone PLU
    var pluZone = '', pluLabel = '';
    if (r.urbanisme && r.urbanisme.features && r.urbanisme.features.length > 0) {
        var p0 = r.urbanisme.features[0].properties || {};
        pluZone = p0.typezone || '';
        pluLabel = p0.libelle || p0.libelong || '';
    }

    // Sismique
    var sismZone = 0;
    var sismLabels = { 1: 'tr\u00e8s faible', 2: 'faible', 3: 'mod\u00e9r\u00e9e', 4: 'moyenne', 5: 'forte' };
    if (gr.sismique && gr.sismique.data && gr.sismique.data.length > 0) {
        sismZone = parseInt(gr.sismique.data[0].code_zone) || 0;
    }

    // Radon
    var radonClasse = 0;
    if (gr.radon && gr.radon.data && gr.radon.data.length > 0) {
        radonClasse = parseInt(gr.radon.data[0].classe_potentiel) || 0;
    }

    // Argiles
    var argiles = '';
    if (gr.rga) {
        var argExp = gr.rga.exposition || '';
        if (/fort/i.test(argExp)) argiles = 'fort';
        else if (/moyen/i.test(argExp)) argiles = 'moyen';
        else if (/faible/i.test(argExp)) argiles = 'faible';
    }

    // Biodiversity count
    var bioCount = 0;
    if (r.biodiversite) {
        ['natura2000_sic','natura2000_zps','znieff1','znieff2','reserves'].forEach(function(k) {
            if (r.biodiversite[k] && r.biodiversite[k].features) bioCount += r.biodiversite[k].features.length;
        });
    }

    // Air quality
    var aq = r.airQuality;

    // Wiki sections (or null)
    var wIntro = wiki ? wiki.intro || '' : '';
    var wGeo = wiki ? wiki.geo || '' : '';
    var wEco = wiki ? wiki.economie || '' : '';
    var wPatri = wiki ? wiki.patrimoine || '' : '';
    var wHist = wiki ? wiki.histoire || '' : '';

    // ── Build HTML ──
    var pStyle = 'margin:0 0 18px;text-align:justify;';
    var hStyle = 'color:#1E3A5F;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.03em;display:block;margin:6px 0 6px;';
    var h = '<div class="sa-synthesis-title">Contexte du site</div>';
    h += '<div class="sa-synthesis-body" style="font-size:0.84rem;color:#334155;line-height:1.7;">';

    // Arrondissement for Paris/Lyon/Marseille
    // Paris: 75101-75120 (last 2 digits), Lyon: 69381-69389 (last 1 digit), Marseille: 13201-13216 (last 2 digits)
    var arrondissement = '';
    var codeInsee = saState.codeInsee || '';
    var arrNum = 0;
    if (/^751\d{2}$/.test(codeInsee)) arrNum = parseInt(codeInsee.slice(-2)) || 0;
    else if (/^6938\d$/.test(codeInsee)) arrNum = parseInt(codeInsee.slice(-1)) || 0;
    else if (/^132\d{2}$/.test(codeInsee)) arrNum = parseInt(codeInsee.slice(-2)) || 0;
    if (arrNum > 0) {
        arrondissement = arrNum + (arrNum === 1 ? 'er' : 'e') + ' arrondissement';
    }

    // §1 — Pr\u00e9sentation Wikipedia (intro enrichie)
    h += '<p style="' + pStyle + '">';
    if (wIntro) {
        h += saEscH(saMpTruncSentences(wIntro, 2, true));
    } else {
        h += 'Le projet se situe sur la commune de <strong>' + saEscH(commune) + '</strong>';
        if (depNom) h += ', dans le ' + saEscH(depNom);
        if (regionNom) h += ' (' + saEscH(regionNom) + ')';
        h += '.';
    }
    if (arrondissement) {
        h += ' Le site du projet se trouve dans le <strong>' + arrondissement + '</strong>.';
    }
    if (population) {
        h += ' La commune compte <strong>' + population.toLocaleString('fr-FR') + '\u00a0habitants</strong>';
        if (surface) {
            var surfKm = (surface / 100).toFixed(1).replace('.', ',');
            h += ' pour ' + surfKm + '\u00a0km\u00b2';
        }
        h += '.';
    }
    h += '</p>';

    // §2 — G\u00e9ographie
    if (wGeo) {
        h += '<p style="' + pStyle + '"><strong style="' + hStyle + '">G\u00e9ographie</strong>';
        h += saEscH(saMpTruncSentences(wGeo, 2));
        h += '</p>';
    }

    // §3 — Histoire
    if (wHist) {
        h += '<p style="' + pStyle + '"><strong style="' + hStyle + '">Rep\u00e8res historiques</strong>';
        h += saEscH(saMpTruncSentences(wHist, 2));
        h += '</p>';
    }

    // §4 — \u00c9conomie
    if (wEco) {
        h += '<p style="' + pStyle + '"><strong style="' + hStyle + '">\u00c9conomie</strong>';
        h += saEscH(saMpTruncSentences(wEco, 2));
        h += '</p>';
    }

    // §5 — Patrimoine
    if (wPatri) {
        h += '<p style="' + pStyle + '"><strong style="' + hStyle + '">Patrimoine</strong>';
        h += saEscH(saMpTruncSentences(wPatri, 2));
        h += '</p>';
    }

    // §6 — Cadre r\u00e9glementaire
    h += '<p style="' + pStyle + '"><strong style="' + hStyle + '">Cadre r\u00e9glementaire</strong>';
    if (pluZone) {
        var typeLabels = { U: 'urbanis\u00e9e', AU: '\u00e0 urbaniser', A: 'agricole', N: 'naturelle et foresti\u00e8re' };
        h += 'La parcelle est class\u00e9e en <strong>zone ' + saEscH(pluZone) + '</strong>';
        if (typeLabels[pluZone]) h += ' (' + typeLabels[pluZone] + ')';
        if (pluLabel) h += ', vocation ' + saEscH(pluLabel);
        h += '. ';
    }
    h += 'Le terrain se trouve en zone de sismicit\u00e9 <strong>' + sismZone + '</strong> (' + (sismLabels[sismZone] || '?') + ')';
    if (radonClasse > 0) h += ', avec un potentiel radon de classe ' + radonClasse + '/3';
    if (argiles) h += ' et un al\u00e9a argiles ' + argiles;
    h += '.';
    h += '</p>';

    // §7 — Milieu naturel
    if (bioCount > 0 || (aq && aq.source === 'atmo')) {
        h += '<p style="' + pStyle + '"><strong style="' + hStyle + '">Milieu naturel</strong>';
        if (bioCount > 0) {
            h += bioCount + ' zone' + (bioCount > 1 ? 's' : '') + ' prot\u00e9g\u00e9e' + (bioCount > 1 ? 's' : '') + ' ou d\u2019inventaire recens\u00e9e' + (bioCount > 1 ? 's' : '') + ' \u00e0 proximit\u00e9 (Natura\u00a02000, ZNIEFF). ';
        }
        if (aq && aq.source === 'atmo' && aq.code_qual != null) {
            h += 'Qualit\u00e9 de l\u2019air\u00a0: indice ATMO ' + aq.code_qual + '/6 \u2014 ' + saEscH(aq.lib_qual || '') + '.';
        }
        h += '</p>';
    }

    h += '</div>';

    // Append fade + toggle (innerHTML may have destroyed the static ones)
    h += '<div class="sa-collapse-fade"></div>';
    h += '<button class="sa-collapse-toggle" onclick="saMpToggleCollapse()">';
    h += 'Voir plus <svg width="12" height="12" viewBox="0 0 12 12"><polyline points="2,4 6,8 10,4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
    h += '</button>';

    el.innerHTML = h;
    el.classList.remove('sa-expanded');

    // Show/hide collapse controls based on content overflow
    setTimeout(function() {
        var fade = el.querySelector('.sa-collapse-fade');
        var toggle = el.querySelector('.sa-collapse-toggle');
        if (el.scrollHeight > 500) {
            if (fade) fade.classList.remove('sa-collapse-hide');
            if (toggle) toggle.classList.remove('sa-collapse-hide');
        } else {
            if (fade) fade.classList.add('sa-collapse-hide');
            if (toggle) toggle.classList.add('sa-collapse-hide');
        }
    }, 50);
}

function saMpToggleCollapse() {
    var el = document.getElementById('saMpIntro');
    if (!el) return;
    el.classList.toggle('sa-expanded');
    var btn = el.querySelector('.sa-collapse-toggle');
    if (btn) {
        btn.firstChild.textContent = el.classList.contains('sa-expanded') ? 'Voir moins ' : 'Voir plus ';
    }
}

// ── MILIEU PHYSIQUE TABLE ───────────────────────────────────
function saRenderMilieuPhysiqueTable() {
    var body = document.getElementById('saBodyMilieuPhysique');
    if (!body) return;

    var r = saState.results || {};
    var gr = r.georisques || {};
    var rows = [];

    var codeCommune = saState.codeInsee || '';

    // Fetch altitude IGN — 5 points individuels (centre + 4 cardinaux à ~200m)
    var lat = saState.lat, lon = saState.lon;
    var offset = 0.002; // ~200m in degrees
    var altiPoints = [
        { lat: lat, lon: lon },                     // centre
        { lat: lat + offset, lon: lon },             // nord
        { lat: lat - offset, lon: lon },             // sud
        { lat: lat, lon: lon + offset },             // est
        { lat: lat, lon: lon - offset }              // ouest
    ];
    var altiPromise = Promise.all(
        altiPoints.map(function(p) {
            return fetch('https://data.geopf.fr/altimetrie/1.0/calcul/alti/rest/elevation.json?lon=' + p.lon.toFixed(6) + '&lat=' + p.lat.toFixed(6) + '&resource=ign_rge_alti_wld')
                .then(function(resp) { return resp.json(); })
                .then(function(d) {
                    if (d && d.elevations && d.elevations.length > 0) {
                        var e = d.elevations[0];
                        var z = (typeof e === 'object') ? e.z : e;
                        return (z != null && z > -9999) ? z : null;
                    }
                    return null;
                })
                .catch(function() { return null; });
        })
    ).then(function(elevs) {
        elevs = elevs.filter(function(v) { return v != null; });
        if (elevs.length === 0) return null;
        var centre = Math.round(elevs[0]);
        var min = Math.round(Math.min.apply(null, elevs));
        var max = Math.round(Math.max.apply(null, elevs));
        var deniv = max - min;
        // Pente max approximative (deniv sur ~200m)
        var pentePct = deniv > 0 ? Math.round((deniv / 200) * 100) : 0;
        return { centre: centre, min: min, max: max, deniv: deniv, pentePct: pentePct };
    });

    // Fetch géologie — BRGM carte lithologique simplifiée 1/1 000 000 (WMS GetFeatureInfo)
    var bboxLat1 = (lat - 0.0002).toFixed(6), bboxLat2 = (lat + 0.0002).toFixed(6);
    var bboxLon1 = (lon - 0.0002).toFixed(6), bboxLon2 = (lon + 0.0002).toFixed(6);
    var geoloPromise = fetch('https://geoservices.brgm.fr/geologie?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo'
        + '&LAYERS=LITHO_1M_SIMPLIFIEE&QUERY_LAYERS=LITHO_1M_SIMPLIFIEE'
        + '&INFO_FORMAT=text/plain&CRS=EPSG:4326'
        + '&BBOX=' + bboxLat1 + ',' + bboxLon1 + ',' + bboxLat2 + ',' + bboxLon2
        + '&WIDTH=3&HEIGHT=3&I=1&J=1')
        .then(function(resp) { return resp.text(); })
        .then(function(txt) {
            var descr = '', type = '';
            var mDescr = txt.match(/DESCR\s*=\s*'([^']+)'/);
            if (mDescr) descr = mDescr[1];
            var mType = txt.match(/TYPE\s*=\s*'([^']+)'/);
            if (mType) type = mType[1];
            if (descr) return { descr: descr, type: type };
            return null;
        })
        .catch(function() { return null; });

    // Fetch nappes phréatiques — Hub'Eau piézométrie (bbox ~5km)
    var nappeBbox = (lon - 0.05).toFixed(4) + ',' + (lat - 0.05).toFixed(4) + ',' + (lon + 0.05).toFixed(4) + ',' + (lat + 0.05).toFixed(4);
    var nappePromise = fetch('https://hubeau.eaufrance.fr/api/v1/niveaux_nappes/stations?bbox=' + nappeBbox + '&size=20')
        .then(function(resp) { return resp.json(); })
        .then(function(d) { return (d && d.data) ? d.data : []; })
        .catch(function() { return []; });

    // Fetch hydrography — Hub'Eau cours d'eau (stations hydro within commune)
    var hydroStationsPromise = codeCommune
        ? fetch('https://hubeau.eaufrance.fr/api/v1/ecoulement/stations?code_commune=' + codeCommune + '&size=20')
            .then(function(resp) { return resp.json(); })
            .then(function(d) { return (d && d.data) ? d.data : []; })
            .catch(function() { return []; })
        : Promise.resolve([]);

    // Fetch eau potable — Hub'Eau
    var eauPotablePromise = codeCommune
        ? fetch('https://hubeau.eaufrance.fr/api/v1/qualite_eau_potable/communes_udi?code_commune=' + codeCommune)
            .then(function(resp) { return resp.json(); })
            .then(function(d) { return (d && d.data) ? d.data : []; })
            .catch(function() { return []; })
        : Promise.resolve([]);

    Promise.all([altiPromise, geoloPromise, nappePromise, hydroStationsPromise, eauPotablePromise]).then(function(results) {
        var altitude = results[0];
        var geologie = results[1];
        var nappeStations = results[2];
        var hydroStations = results[3];
        var eauPotable = results[4];
        // Topographie
        var topoDetail = '';
        var alti = results[0]; // { centre, min, max, deniv, pentePct } or null
        if (alti) {
            topoDetail = 'Altitude au droit du site : ' + alti.centre + ' m NGF';
            if (alti.min !== alti.max) {
                topoDetail += ' (entre ' + alti.min + ' et ' + alti.max + ' m sur un rayon de 200 m, d\u00e9nivel\u00e9 de ' + alti.deniv + ' m)';
            }
            topoDetail += '. ';
            // Qualifier le relief
            if (alti.pentePct <= 2) {
                topoDetail += 'Terrain sensiblement plat (pente < 2\u00a0%).';
            } else if (alti.pentePct <= 5) {
                topoDetail += 'Relief l\u00e9g\u00e8rement vallonn\u00e9, pente douce d\u2019environ ' + alti.pentePct + '\u00a0%.';
            } else if (alti.pentePct <= 15) {
                topoDetail += 'Terrain en pente mod\u00e9r\u00e9e (' + alti.pentePct + '\u00a0%). Terrassements probables.';
            } else {
                topoDetail += 'Forte pente (' + alti.pentePct + '\u00a0%). Contraintes significatives de terrassement et de fondations.';
            }
        }
        if (topoDetail) {
            rows.push({ key: 'topographie', theme: 'Topographie', detail: topoDetail, source: 'IGN Altim\u00e9trie' });
        }

        // 2. Nature du sol — géologie, nappes
        var solDetail = '';
        // Géologie (BRGM lithologie simplifiée)
        if (geologie) {
            solDetail = 'G\u00e9ologie : ' + geologie.descr.toLowerCase();
            if (geologie.type) solDetail += ' (' + geologie.type.toLowerCase() + ')';
            solDetail += '.';
        }
        // Argiles (RGA) — complément géotechnique
        if (gr.rga && (gr.rga.exposition || gr.rga.codeExposition)) {
            var exp = gr.rga.exposition || '';
            solDetail += (solDetail ? ' ' : '') + 'Al\u00e9a retrait-gonflement des argiles : ' + exp.toLowerCase() + '.';
        }
        // Nappes phréatiques — Hub'Eau piézométrie
        if (nappeStations.length > 0) {
            var profondeurs = nappeStations.map(function(s) { return s.profondeur_investigation; }).filter(function(v) { return v != null && v > 0; });
            solDetail += (solDetail ? ' ' : '') + nappeStations.length + ' pi\u00e9zom\u00e8tre' + (nappeStations.length > 1 ? 's' : '') + ' de suivi de nappe dans un rayon de 5\u00a0km';
            if (profondeurs.length > 0) {
                var minProf = Math.round(Math.min.apply(null, profondeurs));
                var maxProf = Math.round(Math.max.apply(null, profondeurs));
                if (minProf === maxProf) {
                    solDetail += ' (profondeur d\u2019investigation : ' + minProf + '\u00a0m)';
                } else {
                    solDetail += ' (profondeurs d\u2019investigation : ' + minProf + ' \u00e0 ' + maxProf + '\u00a0m)';
                }
            }
            solDetail += '.';
        } else {
            solDetail += (solDetail ? ' ' : '') + 'Aucun pi\u00e9zom\u00e8tre de suivi de nappe identifi\u00e9 dans un rayon de 5\u00a0km.';
        }
        if (solDetail) {
            rows.push({ key: 'nature_sol', theme: 'Nature du sol', detail: solDetail, source: 'BRGM / Hub\u2019Eau' });
        }

        // 3. Hydrologie — r\u00e9seau hydrographique
        var hydroDetail = '';
        // Cours d'eau (Hub'Eau stations)
        if (hydroStations.length > 0) {
            var coursEau = {};
            hydroStations.forEach(function(s) {
                var nom = s.libelle_cours_eau || s.libelle_station || '';
                if (nom && !coursEau[nom]) coursEau[nom] = true;
            });
            var ceList = Object.keys(coursEau).slice(0, 5);
            if (ceList.length > 0) {
                hydroDetail = 'Cours d\u2019eau recens\u00e9s sur la commune : ' + ceList.join(', ') + '.';
            }
        }
        // TRI (territoire \u00e0 risque important d'inondation)
        if (gr.tri && gr.tri.data && gr.tri.data.length > 0) {
            var triNames = gr.tri.data.slice(0, 3).map(function(t) { return t.libelle || t.nom_tri || ''; }).filter(Boolean);
            hydroDetail += (hydroDetail ? ' ' : '') + 'Territoire \u00e0 risque important d\u2019inondation (TRI)';
            if (triNames.length > 0) hydroDetail += ' : ' + triNames.join(', ');
            hydroDetail += '.';
        }
        if (!hydroDetail) {
            hydroDetail = 'Aucun cours d\u2019eau ni risque d\u2019inondation majeur identifi\u00e9.';
        }
        rows.push({ key: 'hydrographie', theme: 'R\u00e9seau hydrographique', detail: hydroDetail, source: 'Hub\u2019Eau / G\u00e9orisques' });

        // 4. Eau potable
        if (eauPotable.length > 0) {
            var udiNames = {};
            eauPotable.forEach(function(u) {
                var nom = u.nom_udi || u.nom_reseau || '';
                if (nom && !udiNames[nom]) udiNames[nom] = true;
            });
            var udiList = Object.keys(udiNames).slice(0, 4);
            var eauDetail = eauPotable.length + ' unit\u00e9' + (eauPotable.length > 1 ? 's' : '') + ' de distribution d\u2019eau potable';
            if (udiList.length > 0 && udiList.length <= 4) {
                eauDetail += ' : ' + udiList.join(', ');
            }
            eauDetail += '.';
            rows.push({ key: 'eau_potable', theme: 'Eau potable', detail: eauDetail, source: 'Hub\u2019Eau' });
        }

        // Store raw data for detail panel
        saState.milieuPhysique = {
            altitude: altitude,
            geologie: geologie,
            nappeStations: nappeStations,
            hydroStations: hydroStations,
            eauPotable: eauPotable
        };

        // Build table HTML
        var h = '<table class="sa-table">';
        h += '<thead><tr><th></th><th style="width:140px;">Th\u00e8me</th><th>D\u00e9tail</th><th style="width:110px;">Source</th></tr></thead>';
        h += '<tbody>';
        rows.forEach(function(row) {
            h += '<tr>';
            h += '<td style="width:32px;text-align:center;"><button class="sa-loupe" onclick="openSaDetailPanel(\'milieu_physique\',\'' + row.key + '\')" title="D\u00e9tail"><svg viewBox="0 0 20 20" fill="currentColor"><path d="M8.5 3a5.5 5.5 0 014.383 8.823l3.896 3.9a.75.75 0 01-1.06 1.06l-3.9-3.896A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"/></svg></button></td>';
            h += '<td><strong>' + saEscH(row.theme) + '</strong></td>';
            h += '<td>' + saEscH(row.detail) + '</td>';
            h += '<td style="font-size:0.78rem;color:#94A3B8;">' + saEscH(row.source) + '</td>';
            h += '</tr>';
        });
        h += '</tbody></table>';

        body.innerHTML = h;

        // Update count
        var countEl = document.getElementById('saCountMilieuPhysique');
        if (countEl) countEl.textContent = rows.length + ' th\u00e8me' + (rows.length > 1 ? 's' : '');
    });
}

// ── DESCRIPTIONS GÉOTECHNIQUES PAR LITHOLOGIE ──────────────
function saGetLithoDescription(descr) {
    if (!descr) return null;
    var d = descr.toLowerCase();
    var db = {
        'calcaires, marnes et gypse': { portance: 'Bonne \u00e0 tr\u00e8s bonne sur calcaire sain, m\u00e9diocre sur marnes alt\u00e9r\u00e9es ou gypse.', permeabilite: 'Variable\u00a0: calcaire fissur\u00e9 tr\u00e8s perm\u00e9able (karst), marnes quasi-imperm\u00e9ables.', sensibilite_eau: 'Dissolution du gypse possible (cavit\u00e9s). Gonflement des marnes au contact de l\u2019eau.', fondations: 'Semelles filantes sur calcaire sain. Fondations profondes si marnes alt\u00e9r\u00e9es ou pr\u00e9sence de gypse.', risques: 'Risque karstique (dissolution calcaire/gypse), retrait-gonflement des marnes, effondrement de cavit\u00e9s.', commentaire: 'La pr\u00e9sence simultan\u00e9e de calcaires, marnes et gypse traduit une s\u00e9rie s\u00e9dimentaire h\u00e9t\u00e9rog\u00e8ne. Une \u00e9tude g\u00e9otechnique de type G2 est indispensable pour caract\u00e9riser les passages marneux et \u00e9valuer le risque de dissolution du gypse.' },
        'calcaires': { portance: 'Tr\u00e8s bonne (roche saine). Attention aux zones karstiques.', permeabilite: '\u00c9lev\u00e9e en milieu fissur\u00e9 ou karstique, faible en roche massive.', sensibilite_eau: 'Faible (roche dure), mais dissolution lente cr\u00e9ant des cavit\u00e9s \u00e0 long terme.', fondations: 'Semelles superficielles ou rocher. V\u00e9rifier l\u2019absence de vides karstiques.', risques: 'Karst, effondrement localis\u00e9, remplissage argileux des fissures.', commentaire: 'Substratum calcaire g\u00e9n\u00e9ralement favorable \u00e0 la construction. L\u2019enqu\u00eate de cavit\u00e9s et un sondage de reconnaissance sont recommand\u00e9s.' },
        'sables': { portance: 'Moyenne \u00e0 bonne si compacts, faible si sables fins laches.', permeabilite: '\u00c9lev\u00e9e (terrain drainant). Nappe souvent proche de la surface.', sensibilite_eau: 'Risque de liqu\u00e9faction en zone sismique (sables satur\u00e9s). Affouillement possible.', fondations: 'Semelles filantes apr\u00e8s compactage, ou pieux si sables laches et nappe haute.', risques: 'Tassements diff\u00e9rentiels, liqu\u00e9faction, \u00e9rosion interne.', commentaire: 'Les sables constituent un terrain globalement favorable mais sensible \u00e0 la pr\u00e9sence d\u2019eau. La profondeur de la nappe et la granulom\u00e9trie conditionneront le type de fondations.' },
        'argiles': { portance: 'Faible \u00e0 moyenne. Tr\u00e8s d\u00e9pendante de la teneur en eau.', permeabilite: 'Tr\u00e8s faible (terrain imperm\u00e9able). Drainage difficile.', sensibilite_eau: 'Tr\u00e8s forte\u00a0: retrait-gonflement, fluage, glissements de terrain.', fondations: 'Fondations profondes recommand\u00e9es. Semelles rigides avec vide sanitaire.', risques: 'Retrait-gonflement, glissements, tassements importants et lents (consolidation).', commentaire: 'Terrain d\u00e9favorable n\u00e9cessitant syst\u00e9matiquement une \u00e9tude g\u00e9otechnique approfondie (G2 AVP minimum). Le dimensionnement des fondations doit int\u00e9grer les variations saisonni\u00e8res de teneur en eau.' },
        'alluvions': { portance: 'Variable\u00a0: bonne si graviers compacts, faible si limons/vases.', permeabilite: '\u00c9lev\u00e9e (graviers) \u00e0 faible (limons). Nappe alluviale souvent pr\u00e9sente.', sensibilite_eau: 'Nappe alluviale fr\u00e9quente et sensible aux crues. Risque d\u2019inondation.', fondations: 'Semelles sur graviers compacts. Pieux si couche molle en profondeur.', risques: 'Inondation, remont\u00e9e de nappe, h\u00e9t\u00e9rog\u00e9n\u00e9it\u00e9 lat\u00e9rale.', commentaire: 'Les alluvions pr\u00e9sentent une grande variabilit\u00e9 lat\u00e9rale et verticale. Un maillage serr\u00e9 de sondages est n\u00e9cessaire pour caract\u00e9riser les h\u00e9t\u00e9rog\u00e9n\u00e9it\u00e9s.' },
        'marnes': { portance: 'Moyenne en roche saine, tr\u00e8s faible si alt\u00e9r\u00e9es.', permeabilite: 'Tr\u00e8s faible (barri\u00e8re imperm\u00e9able).', sensibilite_eau: '\u00c9lev\u00e9e\u00a0: gonflement, d\u00e9sagr\u00e9gation rapide \u00e0 l\u2019air et \u00e0 l\u2019eau.', fondations: 'Fondations profondes ancr\u00e9es dans la marne saine, sous la zone d\u2019alt\u00e9ration.', risques: 'Retrait-gonflement, glissements sur pentes, alt\u00e9ration rapide des terrassements.', commentaire: 'La marne est un mat\u00e9riau tr\u00e8s sensible \u00e0 l\u2019exposition atmosph\u00e9rique. Les terrassements doivent \u00eatre imm\u00e9diatement prot\u00e9g\u00e9s.' },
        'gr\u00e8s': { portance: 'Bonne \u00e0 tr\u00e8s bonne (roche dure).', permeabilite: 'Moyenne (porosit\u00e9 de matrice, fissures).', sensibilite_eau: 'Faible. Alt\u00e9ration lente en sable.', fondations: 'Semelles superficielles sur roche saine.', risques: 'Faibles. D\u00e9sagr\u00e9gation en surface si gr\u00e8s tendre.', commentaire: 'Terrain g\u00e9n\u00e9ralement favorable. Le gr\u00e8s constitue un bon aquif\u00e8re r\u00e9servoir.' },
        'craie': { portance: 'Moyenne \u00e0 bonne si s\u00e8che, faible si satur\u00e9e.', permeabilite: '\u00c9lev\u00e9e (fissures, karst crayeux).', sensibilite_eau: 'Dissolution possible, affaissements karstiques.', fondations: 'Semelles sur craie compacte, pieux si craie alt\u00e9r\u00e9e.', risques: 'Marnage de la nappe, effondrements localis\u00e9s, b\u00e9toires.', commentaire: 'La craie est un terrain tr\u00e8s r\u00e9pandu dans le nord de la France, souvent aquif\u00e8re. Attention aux poches de dissolution.' },
        'roches cristallines': { portance: 'Excellente (granite, gneiss sains).', permeabilite: 'Tr\u00e8s faible sauf fissures. Ar\u00e8ne granitique perm\u00e9able.', sensibilite_eau: 'Faible. Alt\u00e9ration en ar\u00e8ne sur plusieurs m\u00e8tres.', fondations: 'Semelles sur roche saine. Attention \u00e0 l\u2019\u00e9paisseur d\u2019ar\u00e8ne.', risques: 'Ar\u00e8ne instable en talus, radon fr\u00e9quent.', commentaire: 'Socle cristallin g\u00e9n\u00e9ralement tr\u00e8s porteur sous la couche d\u2019alt\u00e9ration. Potentiel radon \u00e0 v\u00e9rifier syst\u00e9matiquement.' },
        'roches volcaniques': { portance: 'Tr\u00e8s bonne (basalte, and\u00e9site). Variable si tuf ou scories.', permeabilite: 'Tr\u00e8s variable\u00a0: basalte fractur\u00e9 tr\u00e8s perm\u00e9able, coul\u00e9e massive imperm\u00e9able.', sensibilite_eau: 'Faible pour roches massives.', fondations: 'Semelles sur roche saine. Attention aux niveaux scoriac\u00e9s.', risques: 'H\u00e9t\u00e9rog\u00e9n\u00e9it\u00e9 verticale (alt\u00e9rites, scories, roche saine).', commentaire: 'Les terrains volcaniques sont h\u00e9t\u00e9rog\u00e8nes. Les coul\u00e9es basaltiques sont d\u2019excellents supports, mais les niveaux ponceux ou scoriac\u00e9s sont m\u00e9diocres.' },
        'schistes': { portance: 'Moyenne. Anisotrope (d\u00e9pend de l\u2019orientation de la schistosit\u00e9).', permeabilite: 'Faible en masse, moyenne en fissures.', sensibilite_eau: 'Moyenne. D\u00e9litage \u00e0 l\u2019air.', fondations: 'Semelles orient\u00e9es selon la schistosit\u00e9. Pieux si alt\u00e9r\u00e9.', risques: 'Glissements sur plans de schistosit\u00e9, alt\u00e9ration rapide.', commentaire: 'L\u2019anisotropie de la schistosit\u00e9 conditionne la stabilit\u00e9 des talus et la portance des fondations.' },
        'limons': { portance: 'Faible \u00e0 moyenne. Sensible au compactage.', permeabilite: 'Faible \u00e0 moyenne.', sensibilite_eau: '\u00c9lev\u00e9e\u00a0: effondrement des limons \u00e9oliens satur\u00e9s (collapsibilit\u00e9).', fondations: 'Semelles sur limons compacts, pieux si \u00e9paissseur importante.', risques: 'Collapsibilit\u00e9, tassements, \u00e9rosion.', commentaire: 'Les limons de plateaux (loess) sont tr\u00e8s r\u00e9pandus dans le nord de la France. Leur comportement \u00e0 la saturation doit \u00eatre test\u00e9 syst\u00e9matiquement.' }
    };
    // Direct match
    if (db[d]) return db[d];
    // Partial match
    var keys = Object.keys(db);
    for (var i = 0; i < keys.length; i++) {
        if (d.indexOf(keys[i]) !== -1 || keys[i].indexOf(d.split(',')[0].trim()) !== -1) return db[keys[i]];
    }
    return null;
}

// ── COUPE GÉOLOGIQUE SVG ────────────────────────────────────
var SA_LITHO_COLORS = {
    'calcaires, marnes et gypse': { fill: '#A8C8E8', stroke: '#6B9BC3', hatch: 'brick' },
    'calcaires':                  { fill: '#89B8D8', stroke: '#5A8AB0', hatch: 'brick' },
    'marnes':                     { fill: '#C4D9A0', stroke: '#8AA86A', hatch: 'dash' },
    'sables':                     { fill: '#F5E6A0', stroke: '#D4BC5A', hatch: 'dots' },
    'argiles':                    { fill: '#D4A87C', stroke: '#B0845A', hatch: 'dash' },
    'alluvions':                  { fill: '#F0D88C', stroke: '#C4AA5A', hatch: 'dots' },
    'gr\u00e8s':                  { fill: '#E8C8A0', stroke: '#C09060', hatch: 'dots' },
    'roches cristallines':        { fill: '#D0A0C0', stroke: '#A06898', hatch: 'cross' },
    'roches volcaniques':         { fill: '#C89090', stroke: '#A06060', hatch: 'cross' },
    'schistes':                   { fill: '#B8B0C8', stroke: '#807098', hatch: 'dash' },
    'craie':                      { fill: '#E8E8E0', stroke: '#B0B0A0', hatch: 'brick' },
    'limons':                     { fill: '#E8D8B0', stroke: '#C0A870', hatch: 'none' }
};
function saLithoStyle(descr) {
    if (!descr) return { fill: '#D0D0D0', stroke: '#A0A0A0', hatch: 'none' };
    var d = descr.toLowerCase();
    if (SA_LITHO_COLORS[d]) return SA_LITHO_COLORS[d];
    var keys = Object.keys(SA_LITHO_COLORS);
    for (var i = 0; i < keys.length; i++) {
        if (d.indexOf(keys[i]) !== -1 || keys[i].indexOf(d.split(',')[0].trim()) !== -1) return SA_LITHO_COLORS[keys[i]];
    }
    return { fill: '#D0D0D0', stroke: '#A0A0A0', hatch: 'none' };
}

function saOpenCoupeFullscreen() {
    var src = document.getElementById('saCoupeGeoContainer');
    if (!src) return;
    // Remove any existing modal
    var old = document.getElementById('saCoupeFullscreenOverlay');
    if (old) old.remove();
    // Create modal at body level to escape panel overflow/clipping
    var overlay = document.createElement('div');
    overlay.id = 'saCoupeFullscreenOverlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;';
    overlay.onclick = function(e) { if (e.target === overlay) overlay.remove(); };
    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:12px;width:75vw;max-height:85vh;padding:24px;overflow:auto;box-shadow:0 24px 48px rgba(0,0,0,0.2);';
    box.onclick = function(e) { e.stopPropagation(); };
    var header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;';
    header.innerHTML = '<h3 style="margin:0;">Coupe g\u00e9ologique sch\u00e9matique</h3><button style="background:none;border:none;font-size:1.4rem;cursor:pointer;color:#64748B;padding:4px 8px;">\u00d7</button>';
    header.querySelector('button').onclick = function() { overlay.remove(); };
    box.appendChild(header);
    var content = document.createElement('div');
    content.style.cssText = 'width:100%;';
    content.innerHTML = src.innerHTML;
    box.appendChild(content);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

// ── STRATIGRAPHIC COLUMN MODELS ─────────────────────────────
// Maps BRGM 1/1M lithology to plausible stratigraphic sequences
// Each model: { layers: [...], defaultNappe: depth (m) or null }
var SA_STRAT_MODELS = {
    'calcaires, marnes et gypse': {
        defaultNappe: 4,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Limons des plateaux', d0: 1, d1: 4, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
            { name: 'Argiles vertes', d0: 4, d1: 10, fill: '#8FBC8F', stroke: '#6B9B6B', pattern: 'hlines', rga: true },
            { name: 'Marnes', d0: 10, d1: 18, fill: '#B8C8A8', stroke: '#98A888', pattern: 'none' },
            { name: 'Calcaires', d0: 18, d1: 28, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'fossils' },
            { name: 'Sables (aquif\u00e8re)', d0: 28, d1: 40, fill: '#FAF0E0', stroke: '#DAD0C0', pattern: 'dots', aquifer: true }
        ]
    },
    'calcaires': {
        defaultNappe: 8,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Limons / formations superficielles', d0: 1, d1: 3, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
            { name: 'Calcaire alt\u00e9r\u00e9 fissur\u00e9', d0: 3, d1: 8, fill: '#E8DCC0', stroke: '#C8B8A0', pattern: 'fossils' },
            { name: 'Calcaire compact', d0: 8, d1: 25, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick', aquifer: true },
            { name: 'Marne / substratum', d0: 25, d1: 40, fill: '#C4D9A0', stroke: '#8AA86A', pattern: 'dash' }
        ]
    },
    'sables': {
        defaultNappe: 3,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Sables fins superficiels', d0: 1, d1: 5, fill: '#F5E6A0', stroke: '#D4BC5A', pattern: 'dots' },
            { name: 'Sables grossiers (aquif\u00e8re)', d0: 5, d1: 12, fill: '#EEE0A0', stroke: '#C8B870', pattern: 'dots', aquifer: true },
            { name: 'Argiles / marnes', d0: 12, d1: 20, fill: '#D4A87C', stroke: '#B0845A', pattern: 'dash' },
            { name: 'Calcaire (substratum)', d0: 20, d1: 35, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' }
        ]
    },
    'argiles': {
        defaultNappe: 6,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Argiles d\u2019alt\u00e9ration', d0: 0.5, d1: 4, fill: '#C8A878', stroke: '#A88858', pattern: 'none', rga: true },
            { name: 'Argiles compactes', d0: 4, d1: 12, fill: '#D4A87C', stroke: '#B0845A', pattern: 'dash', rga: true },
            { name: 'Marnes', d0: 12, d1: 22, fill: '#B8C8A8', stroke: '#98A888', pattern: 'none' },
            { name: 'Calcaire / substratum', d0: 22, d1: 35, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' }
        ]
    },
    'alluvions': {
        defaultNappe: 3,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Alluvions modernes (limons)', d0: 1, d1: 5, fill: '#E8D8B0', stroke: '#C0A870', pattern: 'none' },
            { name: 'Alluvions anciennes (graviers)', d0: 5, d1: 10, fill: '#F0D88C', stroke: '#C4AA5A', pattern: 'dots', aquifer: true },
            { name: 'Argiles / marnes', d0: 10, d1: 18, fill: '#D4A87C', stroke: '#B0845A', pattern: 'dash' },
            { name: 'Calcaire (substratum)', d0: 18, d1: 30, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' }
        ]
    },
    'marnes': {
        defaultNappe: 8,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Limons', d0: 0.5, d1: 3, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
            { name: 'Marnes alt\u00e9r\u00e9es', d0: 3, d1: 10, fill: '#C4D9A0', stroke: '#8AA86A', pattern: 'dash', rga: true },
            { name: 'Marnes compactes', d0: 10, d1: 25, fill: '#B8C8A8', stroke: '#98A888', pattern: 'none' },
            { name: 'Calcaire / substratum', d0: 25, d1: 35, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' }
        ]
    },
    'craie': {
        defaultNappe: 10,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Limons des plateaux', d0: 1, d1: 4, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
            { name: 'Craie alt\u00e9r\u00e9e', d0: 4, d1: 10, fill: '#E8E8E0', stroke: '#C0C0B0', pattern: 'brick' },
            { name: 'Craie saine (aquif\u00e8re)', d0: 10, d1: 40, fill: '#F0F0E8', stroke: '#B0B0A0', pattern: 'brick', aquifer: true }
        ]
    },
    'roches cristallines': {
        defaultNappe: 8,
        layers: [
            { name: 'Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Ar\u00e8ne granitique', d0: 0.5, d1: 5, fill: '#E0C8B0', stroke: '#C0A890', pattern: 'dots' },
            { name: 'Roche alt\u00e9r\u00e9e fissur\u00e9e', d0: 5, d1: 15, fill: '#D0A0C0', stroke: '#A06898', pattern: 'cross' },
            { name: 'Roche saine', d0: 15, d1: 30, fill: '#C090B0', stroke: '#906080', pattern: 'cross' }
        ]
    },
    'roches volcaniques': {
        defaultNappe: 10,
        layers: [
            { name: 'Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Alt\u00e9rites / scories', d0: 0.5, d1: 4, fill: '#D4A090', stroke: '#B08070', pattern: 'dots' },
            { name: 'Basalte alt\u00e9r\u00e9', d0: 4, d1: 12, fill: '#C89090', stroke: '#A06060', pattern: 'cross' },
            { name: 'Basalte sain', d0: 12, d1: 30, fill: '#A07070', stroke: '#805050', pattern: 'cross' }
        ]
    },
    'schistes': {
        defaultNappe: 8,
        layers: [
            { name: 'Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Alt\u00e9rites', d0: 0.5, d1: 4, fill: '#C8C0D0', stroke: '#A098B0', pattern: 'none' },
            { name: 'Schiste alt\u00e9r\u00e9', d0: 4, d1: 12, fill: '#B8B0C8', stroke: '#807098', pattern: 'dash' },
            { name: 'Schiste sain', d0: 12, d1: 30, fill: '#A098B8', stroke: '#706088', pattern: 'dash' }
        ]
    },
    'gr\u00e8s': {
        defaultNappe: 6,
        layers: [
            { name: 'Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Alt\u00e9rites / sables', d0: 0.5, d1: 3, fill: '#E8D8B0', stroke: '#C0A870', pattern: 'dots' },
            { name: 'Gr\u00e8s alt\u00e9r\u00e9', d0: 3, d1: 10, fill: '#E8C8A0', stroke: '#C09060', pattern: 'dots' },
            { name: 'Gr\u00e8s compact (aquif\u00e8re)', d0: 10, d1: 30, fill: '#D8B890', stroke: '#B08050', pattern: 'dots', aquifer: true }
        ]
    },
    'limons': {
        defaultNappe: 5,
        layers: [
            { name: 'Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Limons \u00e9oliens', d0: 0.5, d1: 6, fill: '#E8D8B0', stroke: '#C0A870', pattern: 'none' },
            { name: 'Limons compacts / argiles', d0: 6, d1: 15, fill: '#D8C8A0', stroke: '#B0A870', pattern: 'none' },
            { name: 'Calcaire / substratum', d0: 15, d1: 30, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' }
        ]
    }
};

// ── REGIONAL OVERRIDES ──────────────────────────────────────
// When BSS region is known, override the generic model with region-specific layers
var SA_REGIONAL_MODELS = {
    // Bassin parisien (IDF, Picardie, Beauce)
    'sables|PARIS|BEAUCE|BRIE|ILE-DE-FRANCE|PICARDIE': {
        'sables': {
            defaultNappe: 5,
            layers: [
                { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
                { name: 'Limons des plateaux', d0: 1, d1: 4, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
                { name: 'Sables de Fontainebleau', d0: 4, d1: 18, fill: '#F5E6A0', stroke: '#D4BC5A', pattern: 'dots', aquifer: true },
                { name: 'Marnes \u00e0 hu\u00eetres / Calcaire de Beauce', d0: 18, d1: 30, fill: '#B8C8A8', stroke: '#98A888', pattern: 'dash' },
                { name: 'Calcaire de Brie', d0: 30, d1: 45, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' }
            ]
        }
    },
    // Lyonnais / Alpes / Jura
    'sables|LYON|GAUDES|ALPES|RHONE|JURA|BRESSE|DOMBES': {
        'sables': {
            defaultNappe: 6,
            layers: [
                { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
                { name: 'Moraines / alluvions glaciaires', d0: 1, d1: 8, fill: '#E0D0B0', stroke: '#B8A880', pattern: 'dots' },
                { name: 'Alluvions fluvio-glaciaires (graviers)', d0: 8, d1: 18, fill: '#F0D88C', stroke: '#C4AA5A', pattern: 'dots', aquifer: true },
                { name: 'Molasse mioc\u00e8ne', d0: 18, d1: 30, fill: '#C4D9A0', stroke: '#8AA86A', pattern: 'dash' },
                { name: 'Gneiss / granite (socle)', d0: 30, d1: 50, fill: '#D0A0C0', stroke: '#A06898', pattern: 'cross' }
            ]
        }
    },
    // Charentes / Poitou / Périgord
    'sables|POITOU|CHARENTES|PERIGORD|ANGOUMOIS|SAINTONGE': {
        'sables': {
            defaultNappe: 3,
            layers: [
                { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
                { name: 'Alluvions de la Charente', d0: 1, d1: 6, fill: '#E8D8B0', stroke: '#C0A870', pattern: 'none', aquifer: true },
                { name: 'Graviers / sables fluviatiles', d0: 6, d1: 12, fill: '#F0D88C', stroke: '#C4AA5A', pattern: 'dots', aquifer: true },
                { name: 'Calcaire cr\u00e9tac\u00e9 (Turonien/C\u00e9nomanien)', d0: 12, d1: 30, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' },
                { name: 'Craie s\u00e9nonienne (aquif\u00e8re profond)', d0: 30, d1: 50, fill: '#E8E8E0', stroke: '#B0B0A0', pattern: 'brick', aquifer: true }
            ]
        }
    },
    // Aquitaine / Landes
    'sables|AQUITAINE|LANDES|GIRONDE|BORDELAIS|BAZADAIS': {
        'sables': {
            defaultNappe: 2,
            layers: [
                { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 0.5, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
                { name: 'Sables des Landes', d0: 0.5, d1: 8, fill: '#F5E6A0', stroke: '#D4BC5A', pattern: 'dots', aquifer: true },
                { name: 'Alios / gr\u00e8s ferrugineux', d0: 8, d1: 10, fill: '#A08050', stroke: '#806030', pattern: 'dash' },
                { name: 'Sables fauves (Mioc\u00e8ne)', d0: 10, d1: 25, fill: '#EEE0A0', stroke: '#C8B870', pattern: 'dots', aquifer: true },
                { name: 'Calcaire (substratum)', d0: 25, d1: 40, fill: '#F0E6C8', stroke: '#D0C6A8', pattern: 'brick' }
            ]
        }
    },
    // Alsace
    'sables|ALSACE|RHIN|VOSGES|SUNDGAU': {
        'sables': {
            defaultNappe: 3,
            layers: [
                { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
                { name: 'Limons (loess rh\u00e9nans)', d0: 1, d1: 4, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
                { name: 'Alluvions rh\u00e9nanes (graviers)', d0: 4, d1: 15, fill: '#F0D88C', stroke: '#C4AA5A', pattern: 'dots', aquifer: true },
                { name: 'Argiles / marnes (Tertiaire)', d0: 15, d1: 25, fill: '#D4A87C', stroke: '#B0845A', pattern: 'dash' },
                { name: 'Socle vosgien', d0: 25, d1: 40, fill: '#D0A0C0', stroke: '#A06898', pattern: 'cross' }
            ]
        }
    },
    // Nord
    'calcaires|ARTOIS|FLANDRES|NORD|HAINAUT|PICARDIE': {
        'calcaires': {
            defaultNappe: 10,
            layers: [
                { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
                { name: 'Limons des plateaux (loess)', d0: 1, d1: 5, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
                { name: 'Argile \u00e0 silex', d0: 5, d1: 10, fill: '#C8A878', stroke: '#A88858', pattern: 'hlines' },
                { name: 'Craie s\u00e9nonienne (aquif\u00e8re)', d0: 10, d1: 40, fill: '#E8E8E0', stroke: '#B0B0A0', pattern: 'brick', aquifer: true }
            ]
        }
    }
};

function saGetStratModel(lithoDescr, bssRegion) {
    if (!lithoDescr) return null;
    var d = lithoDescr.toLowerCase();
    var reg = (bssRegion || '').toUpperCase();

    // 1) Try regional override if BSS region is known
    if (reg) {
        var regKeys = Object.keys(SA_REGIONAL_MODELS);
        for (var ri = 0; ri < regKeys.length; ri++) {
            var parts = regKeys[ri].split('|');
            var lithoKey = parts[0];
            var regionPatterns = parts.slice(1);
            // Check if lithology matches AND region matches
            if (d.indexOf(lithoKey) !== -1 || lithoKey.indexOf(d.split(',')[0].trim()) !== -1) {
                for (var rp = 0; rp < regionPatterns.length; rp++) {
                    if (reg.indexOf(regionPatterns[rp]) !== -1) {
                        var regModels = SA_REGIONAL_MODELS[regKeys[ri]];
                        var regModel = regModels[lithoKey];
                        if (regModel) return JSON.parse(JSON.stringify(regModel));
                    }
                }
            }
        }
    }

    // 2) Fall back to generic model
    var model = null;
    if (SA_STRAT_MODELS[d]) {
        model = SA_STRAT_MODELS[d];
    } else {
        var keys = Object.keys(SA_STRAT_MODELS);
        for (var i = 0; i < keys.length; i++) {
            if (d.indexOf(keys[i]) !== -1 || keys[i].indexOf(d.split(',')[0].trim()) !== -1) {
                model = SA_STRAT_MODELS[keys[i]]; break;
            }
        }
    }
    if (model) return JSON.parse(JSON.stringify(model));
    // Fallback generic model
    return {
        defaultNappe: 5,
        layers: [
            { name: 'Remblais / Terre v\u00e9g\u00e9tale', d0: 0, d1: 1, fill: '#8B7355', stroke: '#6B5335', pattern: 'soil' },
            { name: 'Formations superficielles', d0: 1, d1: 5, fill: '#D4B896', stroke: '#B49876', pattern: 'none' },
            { name: lithoDescr, d0: 5, d1: 25, fill: '#D0D0D0', stroke: '#A0A0A0', pattern: 'none' },
            { name: 'Substratum', d0: 25, d1: 35, fill: '#C0C0C0', stroke: '#909090', pattern: 'none' }
        ]
    };
}

function saBuildCoupeGeologique() {
    var container = document.getElementById('saCoupeGeoContainer');
    if (!container) return;
    // ── Retrieve data from saState ──
    var mp = saState.milieuPhysique || {};
    var geologie = mp.geologie;
    var nappes = mp.nappeStations || [];
    var altitude = (mp.altitude && mp.altitude.centre) ? mp.altitude.centre : 0;
    var gr = saState.results ? saState.results.georisques || {} : {};
    var lat = saState.lat, lon = saState.lon;

    if (!geologie || !geologie.descr) {
        container.innerHTML = '<p style="color:#94A3B8;font-size:0.82rem;">Donn\u00e9es g\u00e9ologiques non disponibles.</p>';
        return;
    }

    // ── Fetch BSS boreholes for calibration ──
    container.innerHTML = '<span style="color:#94A3B8;">Interrogation de la BSS\u2026</span>';
    var bssR = 0.008;
    var bssUrl = 'https://geoservices.brgm.fr/geologie?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature'
        + '&typeName=BSS_TOTAL_SANS_LABEL&maxFeatures=30'
        + '&BBOX=' + (lon - bssR).toFixed(5) + ',' + (lat - bssR).toFixed(5) + ',' + (lon + bssR).toFixed(5) + ',' + (lat + bssR).toFixed(5);

    fetch(bssUrl).then(function(r) { return r.text(); }).then(function(xml) {
        // Parse BSS XML to extract key data
        var bssRegion = '';
        var bssDepths = [];
        var bssEauSol = [];
        var regionMatch = xml.match(/<ms:nom_region_geologique>([^<]+)/);
        if (regionMatch) bssRegion = regionMatch[1].trim();
        // Extract all prof_atteinte values
        var profMatches = xml.match(/<ms:prof_atteinte>([^<]+)/g);
        if (profMatches) profMatches.forEach(function(m) {
            var v = parseFloat(m.replace(/<ms:prof_atteinte>/, ''));
            if (v > 0) bssDepths.push(v);
        });
        // Extract eau_sol (water level depth)
        var eauMatches = xml.match(/<ms:eau_sol>([^<]+)/g);
        if (eauMatches) eauMatches.forEach(function(m) {
            var v = parseFloat(m.replace(/<ms:eau_sol>/, ''));
            if (v > 0) bssEauSol.push(v);
        });

        saState._bssRegion = bssRegion; // store for nappe table
        saState._bssEauSol = bssEauSol;
        saBuildCoupeGeologiqueRender(container, geologie, altitude, nappes, gr, bssRegion, bssDepths, bssEauSol);
        saBuildNappeTable(); // rebuild with BSS data now available
    }).catch(function() {
        // Fallback: build without BSS data
        saState._bssRegion = '';
        saState._bssEauSol = [];
        saBuildCoupeGeologiqueRender(container, geologie, altitude, nappes, gr, '', [], []);
        saBuildNappeTable();
    });
}

function saBuildCoupeGeologiqueRender(container, geologie, altitude, nappes, gr, bssRegion, bssDepths, bssEauSol) {
    // ── Build stratigraphic model with regional context ──
    var stratModel = saGetStratModel(geologie.descr, bssRegion);
    var layers = stratModel.layers;

    // Calibrate max depth from BSS data
    var bssMaxDepth = bssDepths.length > 0 ? Math.max.apply(null, bssDepths) : 0;
    var modelMaxDepth = layers[layers.length - 1].d1;
    if (bssMaxDepth > modelMaxDepth * 0.8) {
        // Scale last layer to match BSS depth
        layers[layers.length - 1].d1 = Math.round(bssMaxDepth);
    }
    var maxDepth = layers[layers.length - 1].d1;

    // Nappe depths: prefer BSS eau_sol, then piézométrie, then model default
    var nappeDepthSuperficielle = null;
    var nappeDepthProfonde = null;
    if (bssEauSol.length > 0) {
        var sortedEau = bssEauSol.slice().sort(function(a,b) { return a - b; });
        nappeDepthSuperficielle = Math.round(sortedEau[0]);
    }
    if (!nappeDepthSuperficielle && nappes.length > 0) {
        var profValues = nappes.map(function(s) { return s.profondeur_investigation; }).filter(function(v) { return v != null && v > 0; });
        if (profValues.length > 0) {
            var sorted = profValues.slice().sort(function(a,b) { return a - b; });
            nappeDepthSuperficielle = Math.round(sorted[0]);
        }
    }
    if (!nappeDepthSuperficielle && stratModel.defaultNappe) {
        nappeDepthSuperficielle = stratModel.defaultNappe;
    }
    // Deep aquifer nappe
    for (var ai = 0; ai < layers.length; ai++) {
        if (layers[ai].aquifer && layers[ai].d0 > (nappeDepthSuperficielle || 0) + 5) {
            nappeDepthProfonde = layers[ai].d0;
            break;
        }
    }

    // RGA data
    var rgaExpo = '';
    if (gr.rga && gr.rga.exposition) rgaExpo = gr.rga.exposition;

    // Foundation horizon
    var fondationDepth = null;
    for (var li = 0; li < layers.length; li++) {
        if (layers[li].d0 >= 3 && !layers[li].rga) { fondationDepth = layers[li].d0; break; }
    }
    if (!fondationDepth) fondationDepth = 10;

    // ── SVG Dimensions ──
    var W = 480, H = 580;
    var padL = 70, padR = 200, padT = 45, padB = 50;
    var colW = W - padL - padR; // geological column width
    var colH = H - padT - padB;

    // ── Broken axis: shallow zone gets more space ──
    // breakDepth = depth threshold separating shallow (detailed) from deep (compressed)
    // shallowRatio = fraction of colH allocated to the shallow zone
    var breakDepth = 30; // metres — adjust if model has no deep layers
    var shallowRatio = 0.55;
    var needsBreak = maxDepth > breakDepth * 1.5; // only break if deep section is significant
    if (!needsBreak) breakDepth = maxDepth; // no break needed: linear scale

    var shallowH = needsBreak ? colH * shallowRatio : colH;
    var deepH    = needsBreak ? colH * (1 - shallowRatio) : 0;
    var breakGap = needsBreak ? 8 : 0; // visual gap for the break zigzag

    function yOf(depth) {
        if (!needsBreak) return padT + (depth / maxDepth) * colH;
        if (depth <= breakDepth) {
            return padT + (depth / breakDepth) * (shallowH - breakGap / 2);
        } else {
            var deepFrac = (depth - breakDepth) / (maxDepth - breakDepth);
            return padT + (shallowH + breakGap / 2) + deepFrac * (deepH - breakGap / 2);
        }
    }

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;font-family:Inter,system-ui,sans-serif;">';

    // ── Defs: patterns ──
    svg += '<defs>';
    svg += '<pattern id="pat-soil" width="8" height="8" patternUnits="userSpaceOnUse"><line x1="0" y1="4" x2="8" y2="4" stroke="#6B5335" stroke-width="0.3" opacity="0.4"/><line x1="2" y1="0" x2="6" y2="8" stroke="#6B5335" stroke-width="0.3" opacity="0.3"/></pattern>';
    svg += '<pattern id="pat-hlines" width="10" height="6" patternUnits="userSpaceOnUse"><line x1="0" y1="3" x2="10" y2="3" stroke="#00000018" stroke-width="0.5"/></pattern>';
    svg += '<pattern id="pat-fossils" width="16" height="12" patternUnits="userSpaceOnUse"><ellipse cx="8" cy="6" rx="5" ry="3" fill="none" stroke="#00000015" stroke-width="0.5"/></pattern>';
    svg += '<pattern id="pat-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.2" fill="#00000018"/></pattern>';
    svg += '<pattern id="pat-brick" width="14" height="8" patternUnits="userSpaceOnUse"><line x1="0" y1="4" x2="14" y2="4" stroke="#00000015" stroke-width="0.4"/><line x1="7" y1="0" x2="7" y2="4" stroke="#00000015" stroke-width="0.4"/><line x1="0" y1="0" x2="0" y2="8" stroke="#00000015" stroke-width="0.4"/></pattern>';
    svg += '<pattern id="pat-dash" width="10" height="5" patternUnits="userSpaceOnUse"><line x1="1" y1="2.5" x2="5" y2="2.5" stroke="#00000020" stroke-width="0.5"/></pattern>';
    svg += '<pattern id="pat-cross" width="8" height="8" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="8" y2="8" stroke="#00000012" stroke-width="0.4"/><line x1="8" y1="0" x2="0" y2="8" stroke="#00000012" stroke-width="0.4"/></pattern>';
    svg += '</defs>';

    // ── Title + disclaimer ──
    var subTitle = 'Lithologie BRGM\u00a0: ' + geologie.descr;
    if (bssRegion) subTitle += ' \u2014 R\u00e9gion\u00a0: ' + bssRegion;
    var bssNote = 'Estimation. Profondeurs indicatives.';
    if (bssDepths.length > 0) bssNote += ' Calibr\u00e9 sur ' + bssDepths.length + ' sondage' + (bssDepths.length > 1 ? 's' : '') + ' BSS (prof. max ' + Math.round(Math.max.apply(null, bssDepths)) + '\u00a0m).';
    else bssNote += ' Aucun sondage BSS \u00e0 proximit\u00e9. Consulter InfoTerre.';
    svg += '<text x="' + (padL + colW / 2) + '" y="14" text-anchor="middle" font-size="10" fill="#334155" font-weight="700">Colonne stratigraphique sch\u00e9matique</text>';
    svg += '<text x="' + (padL + colW / 2) + '" y="26" text-anchor="middle" font-size="7" fill="#64748B">' + subTitle + '</text>';
    svg += '<text x="' + (padL + colW / 2) + '" y="36" text-anchor="middle" font-size="6.5" fill="#94A3B8" font-style="italic">' + bssNote + '</text>';

    // ── Draw geological layers (vertical column) ──
    var leaderUsedY = []; // track Y positions used by leader-line labels to avoid collisions
    layers.forEach(function(layer) {
        var y0 = yOf(layer.d0), y1 = yOf(layer.d1);
        var layerH = y1 - y0;
        // Background fill
        svg += '<rect x="' + padL + '" y="' + y0.toFixed(1) + '" width="' + colW + '" height="' + layerH.toFixed(1) + '" fill="' + layer.fill + '" stroke="' + layer.stroke + '" stroke-width="0.5"/>';
        // Pattern overlay
        if (layer.pattern && layer.pattern !== 'none') {
            svg += '<rect x="' + padL + '" y="' + y0.toFixed(1) + '" width="' + colW + '" height="' + layerH.toFixed(1) + '" fill="url(#pat-' + layer.pattern + ')" stroke="none"/>';
        }

        // ── Adaptive label placement based on available height ──
        var minFullH = 40;  // px — enough for name + depth range + optional 3rd line
        var minCompactH = 22; // px — enough for name + depth on same line
        var midY = y0 + layerH / 2;

        if (layerH >= minFullH) {
            // Full layout: name, depth range, optional RGA/aquifer
            var labelY = y0 + layerH * 0.40;
            svg += '<text x="' + (padL + colW / 2) + '" y="' + labelY.toFixed(1) + '" text-anchor="middle" font-size="9" fill="' + layer.stroke + '" font-weight="700">' + layer.name + '</text>';
            svg += '<text x="' + (padL + colW / 2) + '" y="' + (labelY + 13).toFixed(1) + '" text-anchor="middle" font-size="7.5" fill="' + layer.stroke + '">(' + layer.d0 + '\u2013' + layer.d1 + ' m)</text>';
            if (layer.rga && rgaExpo) {
                svg += '<text x="' + (padL + colW / 2) + '" y="' + (labelY + 25).toFixed(1) + '" text-anchor="middle" font-size="7" fill="#D97706">\u26A0 Al\u00e9a RGA ' + rgaExpo.toLowerCase() + ' (' + layer.d0 + '\u2013' + layer.d1 + ' m)</text>';
            }
            if (layer.aquifer) {
                svg += '<text x="' + (padL + colW / 2) + '" y="' + (labelY + 25).toFixed(1) + '" text-anchor="middle" font-size="7" fill="#2563EB" font-style="italic">\u00b7 aquif\u00e8re productif</text>';
            }
        } else if (layerH >= minCompactH) {
            // Compact: name on first line, depth on second, smaller font
            svg += '<text x="' + (padL + colW / 2) + '" y="' + (midY - 2).toFixed(1) + '" text-anchor="middle" font-size="8" fill="' + layer.stroke + '" font-weight="700">' + layer.name + '</text>';
            svg += '<text x="' + (padL + colW / 2) + '" y="' + (midY + 9).toFixed(1) + '" text-anchor="middle" font-size="7" fill="' + layer.stroke + '">(' + layer.d0 + '\u2013' + layer.d1 + ' m)</text>';
        } else {
            // Very thin layer: leader line to right margin with collision avoidance
            var leaderY = midY;
            // Push down if too close to a previous leader label
            for (var lci = 0; lci < leaderUsedY.length; lci++) {
                if (Math.abs(leaderY - leaderUsedY[lci]) < 12) {
                    leaderY = leaderUsedY[lci] + 12;
                }
            }
            leaderUsedY.push(leaderY);
            var leaderX1 = padL + colW + 2;
            var leaderX2 = padL + colW + 10;
            // Angled leader from layer midpoint to label position
            svg += '<line x1="' + leaderX1 + '" y1="' + midY.toFixed(1) + '" x2="' + leaderX2 + '" y2="' + leaderY.toFixed(1) + '" stroke="' + layer.stroke + '" stroke-width="0.6"/>';
            svg += '<text x="' + (leaderX2 + 3) + '" y="' + (leaderY + 3).toFixed(1) + '" font-size="7.5" fill="' + layer.stroke + '" font-weight="600">' + layer.name + ' (' + layer.d0 + '\u2013' + layer.d1 + ' m)</text>';
        }
    });

    // ── Broken axis indicator (two parallel diagonal slashes) ──
    if (needsBreak) {
        var breakY = padT + shallowH;
        // White mask to visually break the column
        svg += '<rect x="' + (padL - 1) + '" y="' + (breakY - breakGap / 2).toFixed(1) + '" width="' + (colW + 2) + '" height="' + breakGap + '" fill="#fff" stroke="none"/>';
        // Two short diagonal slash marks (//) at centre of column — conventional break symbol
        var cx = padL + colW / 2;
        var slashH = 7, slashW = 5, slashGap = 4;
        svg += '<line x1="' + (cx - slashGap - slashW / 2) + '" y1="' + (breakY + slashH / 2).toFixed(1) + '" x2="' + (cx - slashGap + slashW / 2) + '" y2="' + (breakY - slashH / 2).toFixed(1) + '" stroke="#94A3B8" stroke-width="1.2"/>';
        svg += '<line x1="' + (cx + slashGap - slashW / 2) + '" y1="' + (breakY + slashH / 2).toFixed(1) + '" x2="' + (cx + slashGap + slashW / 2) + '" y2="' + (breakY - slashH / 2).toFixed(1) + '" stroke="#94A3B8" stroke-width="1.2"/>';
    }

    // ── Depth scale (left axis) ──
    // Depth ticks
    var depthTicks = [];
    layers.forEach(function(l) {
        if (depthTicks.indexOf(l.d0) === -1) depthTicks.push(l.d0);
        if (depthTicks.indexOf(l.d1) === -1) depthTicks.push(l.d1);
    });
    var prevTickY = -999;
    depthTicks.forEach(function(d) {
        var yy = yOf(d);
        // Skip ticks too close together (< 10px)
        if (Math.abs(yy - prevTickY) < 10) return;
        svg += '<line x1="' + (padL - 5) + '" y1="' + yy.toFixed(1) + '" x2="' + (padL + colW) + '" y2="' + yy.toFixed(1) + '" stroke="#94A3B8" stroke-width="0.3" stroke-dasharray="3,2"/>';
        svg += '<text x="' + (padL - 8) + '" y="' + (yy + 3).toFixed(1) + '" text-anchor="end" font-size="8" fill="#64748B" font-weight="500">' + d + ' m</text>';
        prevTickY = yy;
    });
    // Y-axis label
    svg += '<text x="14" y="' + (padT + colH / 2) + '" text-anchor="middle" font-size="8" fill="#64748B" transform="rotate(-90, 14, ' + (padT + colH / 2) + ')">Profondeur (m)</text>';

    // ── Right-side annotations ──
    var annX = padL + colW + 12;
    var annMaxW = padR - 20;

    // Nappe superficielle
    if (nappeDepthSuperficielle && nappeDepthSuperficielle <= maxDepth) {
        var ny = yOf(nappeDepthSuperficielle);
        svg += '<line x1="' + padL + '" y1="' + ny.toFixed(1) + '" x2="' + (padL + colW + annMaxW) + '" y2="' + ny.toFixed(1) + '" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="6,3"/>';
        var nappeNGF = Math.round(altitude - nappeDepthSuperficielle);
        svg += '<rect x="' + annX + '" y="' + (ny - 12).toFixed(1) + '" width="' + (annMaxW - 5) + '" height="20" rx="4" fill="#EFF6FF" stroke="#93C5FD" stroke-width="0.7"/>';
        svg += '<text x="' + (annX + 6) + '" y="' + (ny + 2).toFixed(1) + '" font-size="7" fill="#2563EB">\uD83D\uDCA7 Nappe superficielle ~+' + nappeNGF + ' m NGF</text>';
    }

    // Nappe profonde
    if (nappeDepthProfonde && nappeDepthProfonde <= maxDepth && nappeDepthProfonde !== nappeDepthSuperficielle) {
        var ny2 = yOf(nappeDepthProfonde);
        svg += '<line x1="' + padL + '" y1="' + ny2.toFixed(1) + '" x2="' + (padL + colW + annMaxW) + '" y2="' + ny2.toFixed(1) + '" stroke="#2563EB" stroke-width="1.5" stroke-dasharray="6,3"/>';
        var nappeNGF2 = Math.round(altitude - nappeDepthProfonde);
        svg += '<rect x="' + annX + '" y="' + (ny2 - 12).toFixed(1) + '" width="' + (annMaxW - 5) + '" height="20" rx="4" fill="#DBEAFE" stroke="#60A5FA" stroke-width="0.7"/>';
        svg += '<text x="' + (annX + 6) + '" y="' + (ny2 + 2).toFixed(1) + '" font-size="7" fill="#1D4ED8">\uD83D\uDCA7 Nappe profonde ~+' + nappeNGF2 + ' m NGF</text>';
    }

    // Foundation horizon
    if (fondationDepth) {
        var fy = yOf(fondationDepth);
        svg += '<line x1="' + (padL - 12) + '" y1="' + fy.toFixed(1) + '" x2="' + (padL + colW) + '" y2="' + fy.toFixed(1) + '" stroke="#374151" stroke-width="1.8" stroke-dasharray="8,3"/>';
        svg += '<text x="' + (padL - 14) + '" y="' + (fy - 5).toFixed(1) + '" text-anchor="end" font-size="7" fill="#374151" font-weight="700">Horizon de</text>';
        svg += '<text x="' + (padL - 14) + '" y="' + (fy + 5).toFixed(1) + '" text-anchor="end" font-size="7" fill="#374151" font-weight="700">fondation \u2193</text>';
    }

    // ── Column frame ──
    svg += '<rect x="' + padL + '" y="' + padT + '" width="' + colW + '" height="' + colH + '" fill="none" stroke="#64748B" stroke-width="1"/>';

    // ── Bottom legend ──
    var legY = H - 12;
    var legItems = [
        { stroke: '#60A5FA', label: 'Nappe superficielle', type: 'dash' },
        { stroke: '#2563EB', label: 'Nappe profonde', type: 'dash' },
        { stroke: '#374151', label: 'Horizon fondation', type: 'thick-dash' }
    ];
    var legX = padL;
    legItems.forEach(function(item) {
        var sw = item.type === 'thick-dash' ? '1.5' : '1';
        svg += '<line x1="' + legX + '" y1="' + (legY - 3) + '" x2="' + (legX + 16) + '" y2="' + (legY - 3) + '" stroke="' + item.stroke + '" stroke-width="' + sw + '" stroke-dasharray="5,2"/>';
        svg += '<text x="' + (legX + 20) + '" y="' + legY + '" font-size="7" fill="' + item.stroke + '">' + item.label + '</text>';
        legX += item.label.length * 4.5 + 30;
    });

    svg += '</svg>';
    container.innerHTML = svg;
}

// ── BSS SONDAGES ────────────────────────────────────────────
function saFetchBssSondages() {
    var container = document.getElementById('saBssContainer');
    if (!container || !saState.lat || !saState.lon) { if (container) container.innerHTML = ''; return; }

    var lat = saState.lat, lon = saState.lon;
    var r = 0.008; // ~800m radius
    var bbox = (lon - r).toFixed(5) + ',' + (lat - r).toFixed(5) + ',' + (lon + r).toFixed(5) + ',' + (lat + r).toFixed(5);
    var url = 'https://geoservices.brgm.fr/geologie?SERVICE=WFS&VERSION=1.0.0&REQUEST=GetFeature'
        + '&typeName=BSS_TOTAL_SANS_LABEL'
        + '&BBOX=' + bbox + '&maxFeatures=50';

    fetch(url).then(function(r) { return r.text(); }).then(function(xml) {
        // Parse GML/XML response
        var boreholes = [];
        var features = xml.split('<ms:BSS_TOTAL_SANS_LABEL');
        for (var fi = 1; fi < features.length; fi++) {
            var f = features[fi];
            var getId = function(tag) { var m = f.match(new RegExp('<ms:' + tag + '>([^<]+)')); return m ? m[1].trim() : ''; };
            var bssId = getId('bss_id');
            var indice = getId('indice');
            var designation = getId('designation');
            var refId = indice ? (indice + '/' + designation) : bssId;
            boreholes.push({
                id: bssId,
                nature: getId('nature'),
                profondeur: parseFloat(getId('prof_atteinte')) || null,
                coupeGeo: getId('coupe_geologique') === 'Presente',
                lien: 'https://ficheinfoterre.brgm.fr/InfoterreFiche/ficheBss.action?id=' + encodeURIComponent(refId)
            });
        }
        if (boreholes.length === 0) {
            container.innerHTML = '<p style="font-size:0.82rem;color:#94A3B8;">Aucun sondage BSS trouv\u00e9 dans un rayon de 800\u00a0m.</p>';
            return;
        }
        // Count with geological log
        var withCoupe = boreholes.filter(function(b) { return b.coupeGeo; });
        var maxProf = boreholes.reduce(function(mx, b) { return b.profondeur > mx ? b.profondeur : mx; }, 0);

        var html = '<div style="background:#F0F7FF;border:1px solid #BFDBFE;border-radius:8px;padding:12px 14px;font-size:0.85rem;">';
        html += '<strong style="color:#1E40AF;">\uD83D\uDD0E ' + boreholes.length + ' sondage' + (boreholes.length > 1 ? 's' : '') + ' BSS</strong> dans un rayon de 800\u00a0m';
        if (withCoupe.length > 0) html += ' dont <strong>' + withCoupe.length + '</strong> avec coupe g\u00e9ologique';
        if (maxProf > 0) html += '. Profondeur max atteinte\u00a0: ' + Math.round(maxProf) + '\u00a0m';
        html += '.<br>';
        html += '<span style="font-size:0.8rem;color:#64748B;">La colonne ci-dessus est une estimation g\u00e9n\u00e9rique. Pour la stratigraphie r\u00e9elle, consultez les coupes de sondages sur InfoTerre\u00a0:</span>';
        html += '<br>';
        // Show up to 5 boreholes with geological log, then all others
        var shown = withCoupe.length > 0 ? withCoupe.slice(0, 5) : boreholes.slice(0, 5);
        shown.forEach(function(b) {
            html += '<a href="' + b.lien + '" target="_blank" rel="noopener" style="display:inline-block;margin:3px 6px 3px 0;padding:2px 8px;background:#fff;border:1px solid #93C5FD;border-radius:4px;font-size:0.78rem;color:#1E40AF;text-decoration:none;">';
            html += b.id;
            if (b.profondeur) html += ' (' + Math.round(b.profondeur) + '\u00a0m)';
            if (b.coupeGeo) html += ' \u2713';
            html += '</a>';
        });
        if (boreholes.length > 5) {
            html += '<a href="https://infoterre.brgm.fr/viewer/MainTileForward.do" target="_blank" rel="noopener" style="display:inline-block;margin:3px 0;font-size:0.78rem;color:#64748B;">+ ' + (boreholes.length - 5) + ' autres sur InfoTerre</a>';
        }
        html += '</div>';
        container.innerHTML = html;
    }).catch(function() {
        container.innerHTML = '<p style="font-size:0.82rem;color:#94A3B8;">Impossible d\u2019interroger la BSS.</p>';
    });
}

// ── NAPPE SYNTHESIS TABLE ───────────────────────────────────
// Builds a professional table identifying detected aquifers with formation, depth and usage
function saBuildNappeTable() {
    var container = document.getElementById('saNappeTableContainer');
    if (!container) return;

    var mp = saState.milieuPhysique;
    if (!mp || !mp.geologie) { container.innerHTML = ''; return; }

    var geo = mp.geologie;
    var nappes = mp.nappeStations || [];
    var altitude = (mp.altitude && mp.altitude.centre) ? mp.altitude.centre : 0;
    var gr = saState.results ? saState.results.georisques || {} : {};

    // Get stratigraphic model to identify aquifer layers
    var bssRegion = saState._bssRegion || null; // stored by saBuildCoupeGeologique
    var stratModel = saGetStratModel(geo.descr, bssRegion);
    var layers = stratModel.layers;

    // Determine nappe depths (same logic as in the column renderer)
    var nappeDepthSup = null;
    var bssEauSol = saState._bssEauSol || [];
    if (bssEauSol.length > 0) {
        var sortedEau = bssEauSol.slice().sort(function(a,b) { return a - b; });
        nappeDepthSup = Math.round(sortedEau[0]);
    }
    if (!nappeDepthSup && nappes.length > 0) {
        var profValues = nappes.map(function(s) { return s.profondeur_investigation; }).filter(function(v) { return v != null && v > 0; });
        if (profValues.length > 0) {
            var sorted = profValues.slice().sort(function(a,b) { return a - b; });
            nappeDepthSup = Math.round(sorted[0]);
        }
    }
    if (!nappeDepthSup && stratModel.defaultNappe) {
        nappeDepthSup = stratModel.defaultNappe;
    }

    // Identify aquifer entries from model layers
    var nappeRows = [];

    // 1. Shallow aquifer — find the layer containing nappeDepthSup
    if (nappeDepthSup) {
        var hostLayer = null;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].d0 <= nappeDepthSup && layers[i].d1 > nappeDepthSup) {
                hostLayer = layers[i]; break;
            }
        }
        if (!hostLayer && layers.length > 1) hostLayer = layers[1]; // fallback to 2nd layer
        if (hostLayer) {
            var coteMin = Math.round(altitude - hostLayer.d1);
            var coteMax = Math.round(altitude - nappeDepthSup);
            var usage = 'Nappe libre et superficielle, sensible aux variations saisonni\u00e8res et aux pollutions d\u2019origine urbaine.';
            if (nappeDepthSup <= 3) {
                usage = 'Nappe tr\u00e8s proche de la surface. Risque de remont\u00e9e de nappe. Sensible aux pollutions et fluctuations saisonni\u00e8res.';
            } else if (nappeDepthSup > 15) {
                usage = 'Nappe semi-profonde, moins vuln\u00e9rable aux pollutions de surface. Peut n\u00e9cessiter des fondations adapt\u00e9es.';
            }
            nappeRows.push({
                name: 'Nappe des ' + hostLayer.name.toLowerCase().replace(/\(.*\)/, '').trim(),
                formation: hostLayer.name,
                depthLabel: '~' + nappeDepthSup + ' \u00e0 ' + hostLayer.d1 + ' m',
                coteLabel: '(cote ~+' + coteMin + ' \u00e0 +' + coteMax + ' m NGF)',
                usage: usage
            });
        }
    }

    // 2. Deep aquifer(s) from model layers flagged aquifer:true
    for (var j = 0; j < layers.length; j++) {
        if (layers[j].aquifer && layers[j].d0 > (nappeDepthSup || 0) + 5) {
            var cMin = Math.round(altitude - layers[j].d1);
            var cMax = Math.round(altitude - layers[j].d0);
            nappeRows.push({
                name: 'Nappe des ' + layers[j].name.toLowerCase().replace(/\(.*\)/, '').trim(),
                formation: layers[j].name,
                depthLabel: '~' + layers[j].d0 + ' \u00e0 ' + layers[j].d1 + ' m',
                coteLabel: '(cote ~+' + cMin + ' \u00e0 +' + cMax + ' m NGF)',
                usage: 'Nappe captive profonde, ressource strat\u00e9gique pour l\u2019alimentation en eau potable. Bonne protection naturelle vis-\u00e0-vis des pollutions de surface.'
            });
        }
    }

    if (nappeRows.length === 0) {
        container.innerHTML = '<p style="font-size:0.85rem;color:#64748B;">Aucune nappe identifi\u00e9e dans le mod\u00e8le stratigraphique.</p>';
        return;
    }

    var html = '<table class="sa-table" style="font-size:0.82rem;margin:8px 0 16px;">';
    html += '<thead><tr style="background:#1B5E3B;color:#fff;">';
    html += '<th style="padding:8px 12px;text-align:left;">Nappe</th>';
    html += '<th style="padding:8px 12px;text-align:left;">Formation g\u00e9ologique</th>';
    html += '<th style="padding:8px 12px;text-align:center;">Profondeur approx.</th>';
    html += '<th style="padding:8px 12px;text-align:left;">Usage / Enjeux</th>';
    html += '</tr></thead><tbody>';
    nappeRows.forEach(function(row) {
        html += '<tr>';
        html += '<td style="padding:8px 12px;font-weight:600;">' + row.name + '</td>';
        html += '<td style="padding:8px 12px;font-style:italic;">' + row.formation + '</td>';
        html += '<td style="padding:8px 12px;text-align:center;">' + row.depthLabel + '<br><span style="font-size:0.78rem;color:#64748B;">' + row.coteLabel + '</span></td>';
        html += '<td style="padding:8px 12px;">' + row.usage + '</td>';
        html += '</tr>';
    });
    html += '</tbody></table>';
    html += '<p style="font-size:0.75rem;color:#94A3B8;margin:-8px 0 4px;">Estimation \u00e0 partir du mod\u00e8le stratigraphique et des donn\u00e9es pi\u00e9zom\u00e9triques. Consulter les sondages BSS pour validation.</p>';
    container.innerHTML = html;
}

// ── MILIEU PHYSIQUE MAP ─────────────────────────────────────
var saMpMap = null;
var saMpLayers = {};
var saMpCurrentLayer = 'aerial';

function saMpInitMap() {
    if (!saState.lat || !saState.lon || typeof L === 'undefined') return;
    var mapDiv = document.getElementById('saMpMap');
    if (!mapDiv) return;

    // Destroy previous if exists
    if (saMpMap) { saMpMap.remove(); saMpMap = null; }

    saMpMap = L.map('saMpMap', { center: [saState.lat, saState.lon], zoom: 17, zoomControl: true });

    saMpLayers.aerial = L.tileLayer(
        'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg',
        { attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>', maxZoom: 20 }
    );
    saMpLayers.plan = L.tileLayer(
        'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png',
        { attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>', maxZoom: 19 }
    );
    saMpLayers.cadastre = L.layerGroup([
        L.tileLayer(
            'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/jpeg',
            { attribution: '&copy; <a href="https://geoservices.ign.fr/">IGN</a>', maxZoom: 20 }
        ),
        L.tileLayer.wms('https://data.geopf.fr/wms-v/ows', {
            layers: 'CADASTRALPARCELS.PARCELLAIRE_EXPRESS', format: 'image/png',
            transparent: true, attribution: '&copy; IGN Cadastre', maxZoom: 20
        })
    ]);

    saMpCurrentLayer = 'aerial';
    saMpLayers.aerial.addTo(saMpMap);

    var markerIcon = L.divIcon({
        className: 'sa-map-marker',
        html: '<div style="background:#10B981;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>',
        iconSize: [22, 22], iconAnchor: [11, 11]
    });
    L.marker([saState.lat, saState.lon], { icon: markerIcon }).addTo(saMpMap)
        .bindPopup('<strong>' + (saState.address || 'Projet') + '</strong>').openPopup();
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(saMpMap);

    setTimeout(function () { if (saMpMap) saMpMap.invalidateSize(); }, 200);
    setTimeout(function () { if (saMpMap) saMpMap.invalidateSize(); }, 600);
    setTimeout(function () { if (saMpMap) saMpMap.invalidateSize(); }, 1500);
}

function saMpSetMapLayer(layerName) {
    if (!saMpMap || !saMpLayers[layerName]) return;
    if (saMpLayers[saMpCurrentLayer]) saMpMap.removeLayer(saMpLayers[saMpCurrentLayer]);
    saMpLayers[layerName].addTo(saMpMap);
    saMpCurrentLayer = layerName;
    ['Aerial','Plan','Cadastre'].forEach(function(n) {
        var b = document.getElementById('saMpLayer' + n);
        if (b) b.classList.toggle('active', n.toLowerCase() === layerName);
    });
}

// ── DETAIL PANEL ────────────────────────────────────────────

// Utility: create stable slug from label
function saSlugify(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

// Detail panel map instance
var saDetailMap = null;

function openSaDetailPanel(category, key) {
    var panel = document.getElementById('saDetailPanel');
    var overlay = document.getElementById('saDetailOverlay');
    var title = document.getElementById('saDetailTitle');
    var content = document.getElementById('saDetailContent');

    var info = saGetDetailContent(category, key);
    title.textContent = info.title;
    content.innerHTML = info.html;

    panel.classList.add('open');
    overlay.classList.add('open');

    // Init detail map (base map + address marker, plus WMS/WFS overlay if available)
    if (saState.lat && saState.lon) {
        setTimeout(function () { saInitDetailMap(info.wmsLayer, info.wmsUrl, info.markers, info.wfsLayer, info.circleOverlay, info.polylines, info.routeLabels, info.baseTileConfig); }, 100);
    }
}

function closeSaDetailPanel() {
    document.getElementById('saDetailPanel').classList.remove('open');
    document.getElementById('saDetailOverlay').classList.remove('open');
    if (saDetailMap) { saDetailMap.remove(); saDetailMap = null; }
}

// ── ELEVATION HEATMAP ───────────────────────────────────────
// Two-pass dynamic system:
// Pass 1: load terrain tiles, decode elevations, store raw data, collect global min/max
// Pass 2: once all visible tiles loaded, colorize with the actual range, update legend
// On moveend/zoomend: reset and repeat
function saAddElevationHeatmap(map) {

    // ── Color ramp (normalized 0–1) ── cyan → green → yellow → orange → red → magenta
    var rampStops = [
        [0.00, [0,   180, 210]],
        [0.10, [0,   200, 170]],
        [0.20, [50,  190, 100]],
        [0.30, [80,  195, 50]],
        [0.40, [140, 205, 0]],
        [0.50, [200, 220, 0]],
        [0.60, [240, 200, 0]],
        [0.70, [250, 150, 0]],
        [0.80, [240, 80,  10]],
        [0.90, [210, 20,  60]],
        [1.00, [180, 0,   100]]
    ];
    var lutSize = 1024;
    var lut = new Uint8Array(lutSize * 3);
    for (var i = 0; i < lutSize; i++) {
        var t = i / (lutSize - 1);
        var lo = rampStops[0], hi = rampStops[rampStops.length - 1];
        for (var s = 1; s < rampStops.length; s++) {
            if (t <= rampStops[s][0]) { lo = rampStops[s - 1]; hi = rampStops[s]; break; }
        }
        var st = (hi[0] === lo[0]) ? 0 : (t - lo[0]) / (hi[0] - lo[0]);
        lut[i * 3]     = Math.round(lo[1][0] + st * (hi[1][0] - lo[1][0]));
        lut[i * 3 + 1] = Math.round(lo[1][1] + st * (hi[1][1] - lo[1][1]));
        lut[i * 3 + 2] = Math.round(lo[1][2] + st * (hi[1][2] - lo[1][2]));
    }

    // ── Shared state across tiles ──
    var state = {
        globalMin: Infinity,
        globalMax: -Infinity,
        tileData: {},      // key → { canvas, elevArray, w, h }
        pending: 0,        // tiles still loading
        calibrated: false  // has recolor pass run?
    };

    function tileKey(coords) { return coords.z + '/' + coords.x + '/' + coords.y; }

    // Colorize a single canvas using current global min/max
    function colorizeTile(td) {
        var elevLow = state.globalMin;
        var span = state.globalMax - state.globalMin;
        if (span < 10) span = 10; // safety floor
        var ctx = td.canvas.getContext('2d');
        var imgData = ctx.createImageData(td.w, td.h);
        var px = imgData.data;
        var elArr = td.elevArray;
        for (var j = 0; j < elArr.length; j++) {
            var norm = (elArr[j] - elevLow) / span;
            if (norm < 0) norm = 0;
            if (norm > 1) norm = 1;
            var li = Math.round(norm * (lutSize - 1));
            px[j * 4]     = lut[li * 3];
            px[j * 4 + 1] = lut[li * 3 + 1];
            px[j * 4 + 2] = lut[li * 3 + 2];
            px[j * 4 + 3] = 185;
        }
        ctx.putImageData(imgData, 0, 0);
    }

    // Recolor ALL loaded tiles + update legend
    function recolorAll() {
        state.calibrated = true;
        var keys = Object.keys(state.tileData);
        for (var k = 0; k < keys.length; k++) {
            colorizeTile(state.tileData[keys[k]]);
        }
        updateLegend();
    }

    // Called when a tile finishes loading
    function onTileReady() {
        state.pending--;
        if (state.pending <= 0) {
            state.pending = 0;
            recolorAll();
        }
    }

    // ── Custom GridLayer ──
    var ElevLayer = L.GridLayer.extend({
        createTile: function(coords, done) {
            var tile = document.createElement('canvas');
            var size = this.getTileSize();
            tile.width = size.x;
            tile.height = size.y;
            var key = tileKey(coords);
            state.pending++;

            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                var ctx = tile.getContext('2d');
                ctx.drawImage(img, 0, 0, size.x, size.y);
                var raw = ctx.getImageData(0, 0, size.x, size.y);
                var px = raw.data;
                var numPx = size.x * size.y;
                var elevArray = new Float32Array(numPx);
                var tMin = Infinity, tMax = -Infinity;
                for (var pi = 0; pi < numPx; pi++) {
                    var off = pi * 4;
                    var elev = (px[off] * 256 + px[off + 1] + px[off + 2] / 256) - 32768;
                    elevArray[pi] = elev;
                    if (elev > -100) { // ignore deep ocean
                        if (elev < tMin) tMin = elev;
                        if (elev > tMax) tMax = elev;
                    }
                }
                // Update global range
                if (tMin < state.globalMin) state.globalMin = Math.max(0, tMin);
                if (tMax > state.globalMax) state.globalMax = tMax;
                // Store for recolor pass
                state.tileData[key] = { canvas: tile, elevArray: elevArray, w: size.x, h: size.y };
                // Temporary coloring with current range (will be refined in recolorAll)
                colorizeTile(state.tileData[key]);
                done(null, tile);
                onTileReady();
            };
            img.onerror = function() {
                state.pending--;
                done(null, tile);
            };
            img.src = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/' + coords.z + '/' + coords.x + '/' + coords.y + '.png';
            return tile;
        }
    });

    // ── Base layer + elevation overlay ──
    L.tileLayer(
        'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png',
        { attribution: '&copy; IGN', maxZoom: 19 }
    ).addTo(map);
    var elevLayer = new ElevLayer({ maxZoom: 15, attribution: 'Elevation: AWS Terrain Tiles' });
    elevLayer.addTo(map);

    // ── Reset on view change so the range recalibrates ──
    map.on('moveend zoomend', function() {
        state.globalMin = Infinity;
        state.globalMax = -Infinity;
        state.tileData = {};
        state.calibrated = false;
    });

    // ── Vertical legend (updated dynamically) ──
    var legendDiv = null;
    var ElevLegend = L.Control.extend({
        options: { position: 'topright' },
        onAdd: function() {
            legendDiv = L.DomUtil.create('div', 'sa-elev-legend');
            legendDiv.style.cssText = 'border-radius:4px;overflow:hidden;box-shadow:0 1px 5px rgba(0,0,0,0.3);border:1px solid rgba(0,0,0,0.15);';
            L.DomEvent.disableClickPropagation(legendDiv);
            legendDiv.innerHTML = '<div style="padding:4px 8px;font-size:10px;color:#64748B;">Chargement...</div>';
            return legendDiv;
        }
    });
    new ElevLegend().addTo(map);

    function updateLegend() {
        if (!legendDiv) return;
        var elevLow = state.globalMin, elevHigh = state.globalMax;
        var span = elevHigh - elevLow;
        if (span < 10) return;
        var numSteps = 12;
        var stepH = 18;
        var html = '';
        for (var si = numSteps; si >= 0; si--) {
            var frac = si / numSteps;
            var elev = Math.round(elevLow + frac * span);
            var li = Math.round(frac * (lutSize - 1));
            var r = lut[li * 3], g = lut[li * 3 + 1], b = lut[li * 3 + 2];
            var lumin = r * 0.299 + g * 0.587 + b * 0.114;
            var tc = lumin > 140 ? '#1a1a1a' : '#fff';
            html += '<div style="background:rgb(' + r + ',' + g + ',' + b + ');height:' + stepH + 'px;line-height:' + stepH + 'px;padding:0 6px;font-size:10px;font-weight:600;color:' + tc + ';text-align:right;white-space:nowrap;">' + elev + ' m</div>';
        }
        legendDiv.innerHTML = html;
    }
}

function saInitDetailMap(layerConfig, wmsUrl, markers, wfsLayer, circleOverlay, polylines, routeLabels, baseTileConfig) {
    var mapDiv = document.getElementById('saDetailMapDiv');
    if (!mapDiv || typeof L === 'undefined') return;
    if (saDetailMap) { saDetailMap.remove(); saDetailMap = null; }

    // Adjust zoom if extra markers are spread over a larger area
    var zoom = 14;
    if (markers && markers.length > 0) zoom = 13;

    saDetailMap = L.map('saDetailMapDiv', {
        center: [saState.lat, saState.lon],
        zoom: zoom, zoomControl: true
    });

    // Base layer: elevation heatmap, custom tile, or Plan IGN
    if (baseTileConfig && baseTileConfig.elevationHeatmap) {
        saAddElevationHeatmap(saDetailMap);
    } else if (baseTileConfig && baseTileConfig.url) {
        L.tileLayer(baseTileConfig.url, baseTileConfig.options || {}).addTo(saDetailMap);
    } else {
        L.tileLayer(
            'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png',
            { attribution: '&copy; IGN', maxZoom: 19 }
        ).addTo(saDetailMap);
    }

    // WFS overlay — fetch GeoJSON polygons from Géoplateforme WFS
    if (wfsLayer) {
        var lat = saState.lat, lon = saState.lon;
        var d = 0.05; // ~5km buffer
        var bbox = (lon - d) + ',' + (lat - d) + ',' + (lon + d) + ',' + (lat + d) + ',EPSG:4326';
        var wfsUrl = 'https://data.geopf.fr/wfs/ows?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature' +
            '&typeNames=' + encodeURIComponent(wfsLayer.typeName) +
            '&outputformat=' + encodeURIComponent('application/json') +
            '&srsName=EPSG:4326&bbox=' + encodeURIComponent(bbox);
        fetch(wfsUrl).then(function (r) { return r.json(); }).then(function (geojson) {
            if (geojson && geojson.features && geojson.features.length > 0) {
                var col = wfsLayer.color || '#2E7D32';
                var geoLayer = L.geoJSON(geojson, {
                    style: { color: col, weight: 2, fillOpacity: 0.15, fillColor: col },
                    onEachFeature: function (feature, layer) {
                        var p = feature.properties || {};
                        var name = p.nom_site || p.nom || p.sitename || p.NOM || '';
                        if (name) {
                            layer.bindPopup('<strong>' + saEscH(name) + '</strong>' +
                                (p.id_mnhn ? '<br><span style="color:#64748B;font-size:0.85em;">' + saEscH(p.id_mnhn) + '</span>' : ''));
                            layer.bindTooltip(name, {
                                permanent: true, direction: 'center',
                                className: 'sa-wfs-label'
                            });
                        }
                    }
                }).addTo(saDetailMap);
                // Fit bounds to show both the marker and the zones
                var bounds = geoLayer.getBounds();
                bounds.extend([lat, lon]);
                saDetailMap.fitBounds(bounds.pad(0.1));
            }
        }).catch(function () { /* WFS failed, map still shows base layer + marker */ });
    }

    // WMS overlay
    if (layerConfig) {
        var url = wmsUrl || 'https://mapsref.brgm.fr/wxs/georisques/risques';
        var layers = Array.isArray(layerConfig) ? layerConfig : [layerConfig];
        layers.forEach(function (lyr) {
            L.tileLayer.wms(url, {
                layers: lyr,
                format: 'image/png',
                transparent: true,
                opacity: 0.6,
                attribution: '&copy; G\u00e9orisques / IGN'
            }).addTo(saDetailMap);
        });
    }

    // Marker
    var markerIcon = L.divIcon({
        className: 'sa-map-marker',
        html: '<div style="background:#EF4444;width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [16, 16], iconAnchor: [8, 8]
    });
    L.marker([saState.lat, saState.lon], { icon: markerIcon }).addTo(saDetailMap);

    // Circle overlay (e.g. air quality level, search radius)
    if (circleOverlay) {
        L.circle([saState.lat, saState.lon], {
            radius: circleOverlay.radius || 800,
            color: circleOverlay.color,
            weight: 2,
            fillColor: circleOverlay.color,
            fillOpacity: circleOverlay.fillOpacity != null ? circleOverlay.fillOpacity : 0.18
        }).addTo(saDetailMap);
        if (circleOverlay.label) {
            L.tooltip({ permanent: true, direction: 'center', className: 'sa-wfs-label' })
                .setLatLng([saState.lat, saState.lon])
                .setContent(circleOverlay.label)
                .addTo(saDetailMap);
        }
    }

    // Polylines (e.g. roads/railways for noise analysis) with route labels
    if (polylines && polylines.length > 0) {
        var plBounds = L.latLngBounds([[saState.lat, saState.lon]]);
        var labelsPlaced = {};

        // Helper: add a route label marker at a given position
        function addRouteLabel(lbl, pos) {
            if (!lbl || labelsPlaced[lbl]) return;
            labelsPlaced[lbl] = true;
            console.log('[SA] Adding route label:', lbl, 'at', pos);
            var labelIcon = L.divIcon({
                className: '',
                html: '<div class="sa-road-label"><span>' + lbl + '</span></div>',
                iconSize: [0, 0],
                iconAnchor: [0, 0]
            });
            L.marker(pos, { icon: labelIcon, interactive: false, zIndexOffset: 1000 }).addTo(saDetailMap);
        }

        console.log('[SA] Rendering polylines:', polylines.length, 'with labels:', polylines.filter(function(p){return p.label;}).map(function(p){return p.label;}));
        console.log('[SA] routeLabels param:', routeLabels);

        polylines.forEach(function (pl) {
            if (pl.coords && pl.coords.length > 1) {
                var line = L.polyline(pl.coords, {
                    color: pl.color || '#888',
                    weight: pl.weight || 3,
                    opacity: 0.85
                }).addTo(saDetailMap);
                if (pl.tooltip) line.bindTooltip(pl.tooltip);
                pl.coords.forEach(function (c) { plBounds.extend(c); });

                // Route label from troncon_de_route cpx_numero or street name
                if (pl.label) {
                    var idx = Math.floor(pl.coords.length / 3);
                    addRouteLabel(pl.label, pl.coords[idx]);
                }
            }
        });

        // BDTopo route labels — placed at the closest point to the site
        if (routeLabels && routeLabels.length > 0) {
            routeLabels.forEach(function (rl) {
                if (rl.pos) addRouteLabel(rl.label, rl.pos);
            });
        }
        if (plBounds.isValid()) saDetailMap.fitBounds(plBounds.pad(0.15));
    }

    // Extra data markers (e.g. cavities from API with lat/lon)
    if (markers && markers.length > 0) {
        var dataIcon = L.divIcon({
            className: 'sa-map-marker',
            html: '<div style="background:#F59E0B;width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>',
            iconSize: [14, 14], iconAnchor: [7, 7]
        });
        var bounds = L.latLngBounds([[saState.lat, saState.lon]]);
        markers.forEach(function (m) {
            if (m.lat && m.lon) {
                L.marker([m.lat, m.lon], { icon: dataIcon })
                    .bindPopup('<strong>' + saEscH(m.label || '') + '</strong>')
                    .addTo(saDetailMap);
                bounds.extend([m.lat, m.lon]);
            }
        });
        if (bounds.isValid()) saDetailMap.fitBounds(bounds.pad(0.2));
    }

    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(saDetailMap);
    setTimeout(function () { saDetailMap.invalidateSize(); }, 150);
}

// ── DETAIL CONTENT DEFINITIONS ──────────────────────────────

var SA_RISK_DEFINITIONS = {
    seisme: {
        title: 'Zonage sismique',
        definition: 'Le zonage sismique de la France d\u00e9coupe le territoire en 5 zones de sismicit\u00e9 croissante (1\u00a0: tr\u00e8s faible \u00e0 5\u00a0: forte), d\u00e9finies par le d\u00e9cret n\u00b02010-1255. Ce zonage impose des r\u00e8gles de construction parasismique (Eurocode\u00a08) pour les b\u00e2timents neufs et les extensions significatives.',
        breeam: 'Le risque sismique est \u00e9valu\u00e9 dans le cr\u00e9dit <strong>Pol\u00a003 \u2014 Flood and water management</strong> au titre de la r\u00e9silience du site, et peut impacter <strong>Hea\u00a002</strong> (s\u00e9curit\u00e9 des occupants).',
        wmsLayer: 'risq_zonage_sismique',
        legend: [
            { color: '#D5D5D5', label: 'Sismicit\u00e9 tr\u00e8s faible (zone 1)' },
            { color: '#FDD031', label: 'Sismicit\u00e9 faible (zone 2)' },
            { color: '#FD7E00', label: 'Sismicit\u00e9 mod\u00e9r\u00e9e (zone 3)' },
            { color: '#DE2A16', label: 'Sismicit\u00e9 moyenne (zone 4)' },
            { color: '#820404', label: 'Sismicit\u00e9 forte (zone 5)' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.planseisme.fr/'
    },
    radon: {
        title: 'Potentiel radon',
        definition: 'Le radon est un gaz radioactif naturel issu de la d\u00e9sint\u00e9gration de l\u2019uranium pr\u00e9sent dans les roches. La cartographie du potentiel radon classe les communes en 3 cat\u00e9gories (1\u00a0: faible, 2\u00a0: mod\u00e9r\u00e9, 3\u00a0: significatif). En zone\u00a03, des mesures de concentration dans l\u2019air int\u00e9rieur sont obligatoires pour certains ERP.',
        breeam: 'Le radon est \u00e9valu\u00e9 dans <strong>Pol\u00a003</strong> (risques environnementaux) et <strong>Hea\u00a002</strong> (qualit\u00e9 de l\u2019air int\u00e9rieur). En zone 3, des dispositifs de protection (membrane, ventilation) doivent \u00eatre int\u00e9gr\u00e9s d\u00e8s la conception.',
        wmsLayer: 'RADON_COMMUNE',
        legend: [
            { color: '#F1EEC3', label: 'Potentiel de cat\u00e9gorie 1' },
            { color: '#F1EEC3', hatched: true, label: 'Potentiel de cat\u00e9gorie 2' },
            { color: '#EDA783', label: 'Potentiel de cat\u00e9gorie 3' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.irsn.fr/savoir-comprendre/environnement/cartographie-potentiel-radon'
    },
    retrait_gonflement_argiles: {
        title: 'Retrait-gonflement des argiles (RGA)',
        definition: 'Le retrait-gonflement des argiles est un ph\u00e9nom\u00e8ne li\u00e9 aux variations hydriques des sols argileux : en p\u00e9riode s\u00e8che, le sol se r\u00e9tracte\u00a0; en p\u00e9riode humide, il gonfle. Ces mouvements diff\u00e9rentiels provoquent des fissures dans les fondations et les structures. La loi \u00c9LAN (2018) impose une \u00e9tude g\u00e9otechnique pr\u00e9alable (G1) en zone d\u2019exposition moyenne ou forte.',
        breeam: '\u00c9valu\u00e9 dans <strong>Pol\u00a003</strong>. En zone d\u2019exposition moyenne ou forte, l\u2019\u00e9tude g\u00e9otechnique G2 (AVP) est recommand\u00e9e pour valider les fondations et anticiper les mouvements de sol.',
        wmsLayer: 'ALEARG_REALISE',
        legend: [
            { color: '#FDFD97', label: 'Exposition faible' },
            { color: '#FDA300', label: 'Exposition moyen' },
            { color: '#FD0000', label: 'Exposition forte' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.georisques.gouv.fr/risques/retrait-gonflement-des-argiles'
    },
    inondation_tri_: {
        title: 'Territoire \u00e0 Risque Important d\u2019inondation (TRI)',
        definition: 'Un TRI est un territoire o\u00f9 les enjeux potentiellement expos\u00e9s aux inondations sont les plus importants (concentrations humaines, \u00e9conomiques, environnementales). La directive europ\u00e9enne Inondation (2007/60/CE) impose pour chaque TRI une cartographie des surfaces inondables pour 3 sc\u00e9narios\u00a0: fr\u00e9quent (T\u00a010-30\u00a0ans), moyen (T\u00a0100-300\u00a0ans) et extr\u00eame (T\u00a0>1000\u00a0ans).',
        extras: '<h3>Types de zones inondables</h3><ul>' +
            '<li><strong>AZI</strong> (Atlas des Zones Inondables)\u00a0: cartographie informative des zones susceptibles d\u2019\u00eatre inond\u00e9es, sans valeur r\u00e9glementaire directe.</li>' +
            '<li><strong>TRI</strong>\u00a0: territoire \u00e0 enjeux forts, avec cartographie de 3 sc\u00e9narios d\u2019al\u00e9a.</li>' +
            '<li><strong>PPRI</strong> (Plan de Pr\u00e9vention du Risque Inondation)\u00a0: document r\u00e9glementaire opposable qui d\u00e9finit les zones inconstructibles (rouge) et constructibles sous conditions (bleu).</li>' +
            '</ul>',
        breeam: 'Cr\u00e9dit cl\u00e9\u00a0: <strong>LE\u00a004 \u2014 Enhancing site ecology</strong> et <strong>Pol\u00a003 \u2014 Flood and water management</strong>. Un site en TRI n\u00e9cessite une \u00e9tude hydraulique d\u00e9taill\u00e9e et des mesures compensatoires (bassin de r\u00e9tention, rehaussement, transparence hydraulique).',
        wmsLayer: ['ALEA_SYNT_01_01FOR', 'ALEA_SYNT_02_02MOY', 'PPRN_ZONE_INOND'],
        legend: [
            { color: '#225E22', label: 'Crue de forte probabilit\u00e9' },
            { color: '#4EBC98', label: 'Crue de moyenne probabilit\u00e9' },
            { color: '#0000FB', label: 'Zone PPR \u2014 Prescriptions' },
            { color: '#FB5E5E', label: 'Zone PPR \u2014 Interdiction' },
            { color: '#DC0000', label: 'Zone PPR \u2014 Interdiction stricte' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.georisques.gouv.fr/risques/inondations'
    },
    cavites_souterraines: {
        title: 'Cavit\u00e9s souterraines',
        definition: 'Les cavit\u00e9s souterraines r\u00e9pertori\u00e9es comprennent les anciennes carri\u00e8res, les marnages, les caves, les tunnels d\u00e9saffect\u00e9s et les cavit\u00e9s naturelles (karst). Leur pr\u00e9sence induit un risque d\u2019effondrement localis\u00e9 ou de tassement diff\u00e9rentiel.',
        breeam: '\u00c9valu\u00e9 dans <strong>Pol\u00a003</strong>. La pr\u00e9sence de cavit\u00e9s impose une \u00e9tude g\u00e9otechnique approfondie (G2 PRO minimum) et peut influencer le choix du syst\u00e8me de fondations.',
        wmsLayer: 'CAVITE_LOCALISEE',
        legend: [
            { color: '#5FE2FA', shape: 'square', label: 'Cave' },
            { color: '#87DE4E', shape: 'diamond', label: 'Carri\u00e8re' },
            { color: '#F5F514', shape: 'triangle', label: 'Naturelle' },
            { color: '#FD0000', shape: 'circle-outline', label: 'Ind\u00e9termin\u00e9e' },
            { color: '#000000', shape: 'triangle', label: 'Galerie' },
            { color: '#0000FF', shape: 'star', label: 'Ouvrage civil' },
            { color: '#660066', shape: 'circle', label: 'Ouvrage militaire' },
            { color: '#6600FF', shape: 'circle', label: 'Souterrain' },
            { color: '#F59E0B', shape: 'circle', label: 'Cavit\u00e9 recens\u00e9e (API)' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.georisques.gouv.fr/risques/cavites-souterraines'
    },
    mouvements_de_terrain: {
        title: 'Mouvements de terrain',
        definition: 'Les mouvements de terrain regroupent les glissements, \u00e9boulements, chutes de blocs, coul\u00e9es de boue et effondrements. Ils sont recens\u00e9s par le BRGM dans la base de donn\u00e9es nationale (BDMvt). Leur pr\u00e9sence \u00e0 proximit\u00e9 d\u2019un site traduit une instabilit\u00e9 g\u00e9ologique locale pouvant affecter les fondations et la p\u00e9rennit\u00e9 du b\u00e2ti.',
        breeam: '\u00c9valu\u00e9 dans <strong>Pol\u00a003 \u2014 Flood and water management</strong> au titre des risques g\u00e9ologiques. La pr\u00e9sence de mouvements de terrain recens\u00e9s impose une \u00e9tude g\u00e9otechnique (G2 AVP minimum) et peut n\u00e9cessiter des mesures de confortement (mur de sout\u00e8nement, drainage, ancrage).',
        wmsLayer: 'MVT_LOCALISE',
        legend: [
            { color: '#FD0000', shape: 'square', label: 'Glissement' },
            { color: '#00FD00', shape: 'diamond', label: '\u00c9boulement' },
            { color: '#FDFD00', shape: 'triangle', label: 'Coul\u00e9e' },
            { color: '#0000F9', shape: 'star', label: 'Effondrement' },
            { color: '#FD00FD', shape: 'triangle', label: '\u00c9rosion des berges' },
            { color: '#F59E0B', shape: 'circle', label: 'Mouvement recens\u00e9 (API)' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.georisques.gouv.fr/risques/mouvements-de-terrain'
    },
    arretes_catnat: {
        title: 'Arr\u00eat\u00e9s de catastrophe naturelle (CatNat)',
        definition: 'Un arr\u00eat\u00e9 CatNat est une reconnaissance officielle par l\u2019\u00c9tat qu\u2019un \u00e9v\u00e9nement naturel (inondation, s\u00e9cheresse, temp\u00eate...) a caus\u00e9 des dommages anormaux sur une commune. L\u2019historique des arr\u00eat\u00e9s CatNat d\u2019une commune permet de qualifier la r\u00e9currence des al\u00e9as naturels.',
        breeam: 'L\u2019historique CatNat alimente l\u2019analyse des risques pour <strong>LE\u00a004</strong> et <strong>Pol\u00a003</strong>. Une commune avec de nombreux arr\u00eat\u00e9s CatNat inondation justifie des mesures de protection renforc\u00e9es.',
        source: 'https://www.georisques.gouv.fr/risques/catastrophes-naturelles'
    },
    ppr: {
        title: 'Plans de Pr\u00e9vention des Risques (PPR)',
        definition: 'Les PPR sont des documents r\u00e9glementaires \u00e9labor\u00e9s par l\u2019\u00c9tat qui r\u00e9glementent l\u2019utilisation des sols en fonction des risques identifi\u00e9s (inondation, mouvement de terrain, technologique, minier...). Ils d\u00e9limitent des zones rouges (inconstructibles), bleues (constructibles sous prescriptions) et blanches (sans contrainte).',
        breeam: 'Les prescriptions PPR impactent directement la faisabilit\u00e9 BREEAM\u00a0: un site en zone rouge PPR est r\u00e9dhibitoire. Les zones bleues n\u00e9cessitent l\u2019int\u00e9gration des prescriptions dans le projet pour <strong>Pol\u00a003</strong> et <strong>LE\u00a004</strong>.',
        wmsLayer: ['PPRN_ZONE_INOND', 'PPRN_ZONE_MVT', 'PPRT_ZONE_RISQIND'],
        legend: [
            { color: '#86D5E4', label: 'Prescription hors zone d\u2019al\u00e9a' },
            { color: '#0000FB', label: 'Prescriptions' },
            { color: '#FB5E5E', label: 'Interdiction' },
            { color: '#DC0000', label: 'Interdiction stricte' },
            { color: '#C690FB', label: 'D\u00e9laissement possible' },
            { color: '#983398', label: 'Expropriation possible' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.georisques.gouv.fr/risques/plans-de-prevention-des-risques-naturels'
    },
    // Qualité de l'air
    qualite_air: {
        title: 'Qualit\u00e9 de l\u2019air \u2014 Indice ATMO',
        definition: 'L\u2019<strong>indice ATMO</strong> est l\u2019indicateur officiel de la qualit\u00e9 de l\u2019air en France, calcul\u00e9 quotidiennement par les Associations Agr\u00e9\u00e9es de Surveillance de la Qualit\u00e9 de l\u2019Air (AASQA). Il synth\u00e9tise les concentrations de 5 polluants r\u00e9glementaires\u00a0: particules fines PM2.5 et PM10, dioxyde d\u2019azote (NO\u2082), ozone (O\u2083) et dioxyde de soufre (SO\u2082). L\u2019indice global correspond au sous-indice le plus d\u00e9grad\u00e9.',
        extras: '<h3>\u00c9chelle ATMO</h3><table class="sa-mini-table"><thead><tr><th>Indice</th><th>Qualification</th><th>Couleur</th></tr></thead><tbody>' +
            '<tr><td>1</td><td>Bon</td><td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#50F0E6;vertical-align:middle;"></span></td></tr>' +
            '<tr><td>2</td><td>Moyen</td><td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#50CCAA;vertical-align:middle;"></span></td></tr>' +
            '<tr><td>3</td><td>D\u00e9grad\u00e9</td><td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#F0E641;vertical-align:middle;"></span></td></tr>' +
            '<tr><td>4</td><td>Mauvais</td><td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#FF5050;vertical-align:middle;"></span></td></tr>' +
            '<tr><td>5</td><td>Tr\u00e8s mauvais</td><td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#960032;vertical-align:middle;"></span></td></tr>' +
            '<tr><td>6</td><td>Extr\u00eamement mauvais</td><td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#7D2181;vertical-align:middle;"></span></td></tr>' +
            '</tbody></table>',
        breeam: '\u00c9valu\u00e9 dans <strong>Hea\u00a002 \u2014 Indoor air quality</strong> (qualit\u00e9 de l\u2019air entrant) et <strong>Pol\u00a003</strong>. Un site en zone pollu\u00e9e n\u00e9cessite des dispositifs de filtration de l\u2019air neuf (filtre F7/F9), des prises d\u2019air positionn\u00e9es \u00e0 l\u2019oppos\u00e9 des sources, et un suivi post-livraison de la qualit\u00e9 de l\u2019air int\u00e9rieur.',
        legend: [
            { color: '#50F0E6', label: '1 \u2014 Bon' },
            { color: '#50CCAA', label: '2 \u2014 Moyen' },
            { color: '#F0E641', label: '3 \u2014 D\u00e9grad\u00e9' },
            { color: '#FF5050', label: '4 \u2014 Mauvais' },
            { color: '#960032', label: '5 \u2014 Tr\u00e8s mauvais' },
            { color: '#7D2181', label: '6 \u2014 Extr\u00eamement mauvais' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://data.atmo-france.org/'
    },
    // Bruit
    bruit_peb: {
        title: 'Bruit a\u00e9rien \u2014 PEB / PGS',
        definition: 'Le <strong>Plan d\u2019Exposition au Bruit</strong> (PEB) identifie les zones expos\u00e9es au bruit a\u00e9roportuaire autour des a\u00e9rodromes. Il d\u00e9finit 4 zones de bruit d\u00e9croissant\u00a0:<ul>' +
            '<li><strong>Zone A</strong> \u2014 Exposition tr\u00e8s forte (Lden \u2265 70 dB). Constructions tr\u00e8s limit\u00e9es.</li>' +
            '<li><strong>Zone B</strong> \u2014 Exposition forte (65\u201370 dB). Constructions limit\u00e9es.</li>' +
            '<li><strong>Zone C</strong> \u2014 Exposition mod\u00e9r\u00e9e (57\u201365 dB). Constructions sous conditions d\u2019isolation acoustique.</li>' +
            '<li><strong>Zone D</strong> \u2014 Exposition faible (50\u201357 dB). Constructions autoris\u00e9es avec isolation acoustique renforc\u00e9e.</li></ul>' +
            '<p>Le <strong>Plan de G\u00eane Sonore</strong> (PGS) d\u00e9limite des zones ouvrant droit \u00e0 une aide pour l\u2019insonorisation des logements riverains.</p>',
        breeam: '\u00c9valu\u00e9 dans <strong>Hea\u00a005 \u2014 Acoustic performance</strong>. Un site en zone PEB impose une \u00e9tude acoustique d\u00e9taill\u00e9e, des fa\u00e7ades \u00e0 haute performance d\u2019affaiblissement (Rw + Ctr), des fen\u00eatres \u00e0 double ou triple vitrage acoustique et une ventilation permettant de ne pas ouvrir les fen\u00eatres.',
        wmsLayer: ['dgac_peb_plan_wmsv', 'DGAC-PGS_BDD_FXX_WM_WMS'],
        wmsUrl: 'https://data.geopf.fr/wms-v/ows',
        legend: [
            { color: '#FB9383', label: 'PEB \u2014 Zone A (Lden \u2265 70 dB)' },
            { color: '#F5C684', label: 'PEB \u2014 Zone B (65\u201370 dB)' },
            { color: '#84FDB2', label: 'PEB \u2014 Zone C (57\u201365 dB)' },
            { color: '#84A0FB', label: 'PEB \u2014 Zone D (50\u201357 dB)' },
            { color: '#FF0000', label: 'PGS \u2014 Zone I' },
            { color: '#FF8000', label: 'PGS \u2014 Zone II' },
            { color: '#00B000', label: 'PGS \u2014 Zone III' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.ecologie.gouv.fr/plan-dexposition-au-bruit'
    },
    bruit_routier: {
        title: 'Bruit routier / ferroviaire \u2014 Classement sonore',
        definition: 'Le <strong>classement sonore des infrastructures de transports terrestres</strong> (art. L.571-10 et R.571-32 du code de l\u2019environnement) classe les voies bruyantes en 5 cat\u00e9gories d\u00e9finissant des secteurs affect\u00e9s par le bruit\u00a0:' +
            '<ul><li><strong>Cat\u00e9gorie 1</strong> \u2014 > 81 dB(A) Laeq. Largeur du secteur\u00a0: <strong>300\u00a0m</strong> de part et d\u2019autre.</li>' +
            '<li><strong>Cat\u00e9gorie 2</strong> \u2014 76\u201381 dB(A). Secteur\u00a0: <strong>250\u00a0m</strong>.</li>' +
            '<li><strong>Cat\u00e9gorie 3</strong> \u2014 70\u201376 dB(A). Secteur\u00a0: <strong>100\u00a0m</strong>.</li>' +
            '<li><strong>Cat\u00e9gorie 4</strong> \u2014 65\u201370 dB(A). Secteur\u00a0: <strong>30\u00a0m</strong>.</li>' +
            '<li><strong>Cat\u00e9gorie 5</strong> \u2014 60\u201365 dB(A). Secteur\u00a0: <strong>10\u00a0m</strong>.</li></ul>' +
            '<p>Dans ces secteurs, les b\u00e2timents neufs doivent respecter un isolement acoustique minimal de fa\u00e7ade (arr\u00eat\u00e9 du 30 mai 1996).</p>' +
            '<p><em>Note\u00a0: les distances ci-dessus sont indicatives. L\u2019analyse ci-dessous d\u00e9tecte les infrastructures de transport majeures \u00e0 proximit\u00e9 via OpenStreetMap et estime l\u2019exposition. Pour une analyse r\u00e9glementaire, consulter le classement sonore pr\u00e9fectoral du d\u00e9partement.</em></p>',
        breeam: 'Cr\u00e9dit <strong>Hea\u00a005 \u2014 Acoustic performance</strong>\u00a0: la proximit\u00e9 d\u2019infrastructures class\u00e9es impose une \u00e9tude acoustique d\u00e9taill\u00e9e, des prescriptions d\u2019isolement de fa\u00e7ade (Rw + Ctr), et le cas \u00e9ch\u00e9ant des protections contre les vibrations (voie ferr\u00e9e). Cr\u00e9dit <strong>Pol\u00a005 \u2014 Reduction of noise pollution</strong>\u00a0: \u00e9valuation de l\u2019impact du projet sur l\u2019environnement sonore.',
        legend: [
            { color: '#7D0023', label: 'Autoroute / voie express' },
            { color: '#D32F2F', label: 'Route nationale / d\u00e9partementale' },
            { color: '#FF9800', label: 'Route secondaire' },
            { color: '#5C3D00', label: 'Voie ferr\u00e9e' },
            { color: '#333333', label: 'Tramway / m\u00e9tro l\u00e9ger' },
            { color: 'rgba(239,68,68,0.2)', border: true, label: 'Rayon de recherche (500\u00a0m)' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.ecologie.gouv.fr/classement-sonore-des-infrastructures-transports-terrestres'
    },
    // Biodiversite
    natura_2000___habitats_sic_: {
        title: 'Natura 2000 \u2014 Sites Habitats (SIC)',
        definition: 'Les Sites d\u2019Importance Communautaire (SIC) sont d\u00e9sign\u00e9s au titre de la directive europ\u00e9enne Habitats (92/43/CEE). Ils prot\u00e8gent des habitats naturels et des esp\u00e8ces animales et v\u00e9g\u00e9tales d\u2019int\u00e9r\u00eat communautaire. Tout projet susceptible d\u2019affecter un site Natura 2000 doit faire l\u2019objet d\u2019une \u00e9valuation d\u2019incidences.',
        breeam: 'Cr\u00e9dit <strong>LE\u00a003 \u2014 Minimising impact on existing site ecology</strong>. La proximit\u00e9 d\u2019un site Natura 2000 impose une \u00e9valuation \u00e9cologique pr\u00e9alable et des mesures d\u2019\u00e9vitement, de r\u00e9duction et de compensation.',
        wfsLayer: { typeName: 'patrinat_sic:sic', color: '#2E7D32' },
        legend: [
            { color: '#2E7D32', label: 'P\u00e9rim\u00e8tre Natura 2000 \u2014 SIC' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://inpn.mnhn.fr/programme/natura2000'
    },
    natura_2000___oiseaux_zps_: {
        title: 'Natura 2000 \u2014 Zones de Protection Sp\u00e9ciale (ZPS)',
        definition: 'Les ZPS sont d\u00e9sign\u00e9es au titre de la directive Oiseaux (2009/147/CE) pour prot\u00e9ger les habitats des esp\u00e8ces d\u2019oiseaux sauvages menac\u00e9es ou migratrices. Elles compl\u00e8tent le r\u00e9seau Natura 2000 avec les SIC.',
        breeam: 'M\u00eame impact que les SIC pour <strong>LE\u00a003</strong>. Une ZPS \u00e0 proximit\u00e9 du projet implique des contraintes calendaires (p\u00e9riodes de nidification) et des mesures de r\u00e9duction du bruit et de la lumi\u00e8re.',
        wfsLayer: { typeName: 'patrinat_zps:zps', color: '#1565C0' },
        legend: [
            { color: '#1565C0', label: 'P\u00e9rim\u00e8tre Natura 2000 \u2014 ZPS' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://inpn.mnhn.fr/programme/natura2000'
    },
    znieff_type_i: {
        title: 'ZNIEFF Type I',
        definition: 'Les Zones Naturelles d\u2019Int\u00e9r\u00eat \u00c9cologique, Faunistique et Floristique de type I d\u00e9limitent des secteurs de superficie limit\u00e9e caract\u00e9ris\u00e9s par la pr\u00e9sence d\u2019esp\u00e8ces ou de milieux rares, remarquables ou caract\u00e9ristiques du patrimoine r\u00e9gional. Elles n\u2019ont pas de valeur r\u00e9glementaire directe mais constituent un signal d\u2019alerte pour l\u2019am\u00e9nagement.',
        breeam: 'Signal d\u2019alerte pour <strong>LE\u00a003</strong>. Une ZNIEFF I justifie un inventaire \u00e9cologique 4 saisons pour caract\u00e9riser les enjeux et d\u00e9finir les mesures d\u2019\u00e9vitement.',
        wfsLayer: { typeName: 'patrinat_znieff1:znieff1', color: '#FF7043' },
        legend: [
            { color: '#FF7043', label: 'P\u00e9rim\u00e8tre ZNIEFF Type I' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://inpn.mnhn.fr/programme/inventaire-znieff'
    },
    znieff_type_ii: {
        title: 'ZNIEFF Type II',
        definition: 'Les ZNIEFF de type II couvrent de grands ensembles naturels riches ou peu modifi\u00e9s, offrant des potentialit\u00e9s biologiques importantes. Elles int\u00e8grent souvent plusieurs ZNIEFF de type I et repr\u00e9sentent les \u00e9cosyst\u00e8mes fonctionnels \u00e0 l\u2019\u00e9chelle du paysage.',
        breeam: 'Contexte pour <strong>LE\u00a003</strong>. La ZNIEFF II cadre l\u2019analyse paysag\u00e8re et les continuit\u00e9s \u00e9cologiques (trame verte et bleue).',
        wfsLayer: { typeName: 'patrinat_znieff2:znieff2', color: '#AB47BC' },
        legend: [
            { color: '#AB47BC', label: 'P\u00e9rim\u00e8tre ZNIEFF Type II' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://inpn.mnhn.fr/programme/inventaire-znieff'
    },
    reserve_naturelle_nationale: {
        title: 'R\u00e9serve Naturelle Nationale (RNN)',
        definition: 'Les RNN sont des espaces prot\u00e9g\u00e9s class\u00e9s par d\u00e9cret minist\u00e9riel pour pr\u00e9server un patrimoine naturel exceptionnel. Toute modification de l\u2019\u00e9tat ou de l\u2019aspect de la r\u00e9serve est soumise \u00e0 autorisation du pr\u00e9fet apr\u00e8s avis du comit\u00e9 consultatif.',
        breeam: 'Contrainte forte pour <strong>LE\u00a003</strong>. Un projet en bordure de RNN doit d\u00e9montrer l\u2019absence d\u2019impact significatif sur le site prot\u00e9g\u00e9.',
        wfsLayer: { typeName: 'patrinat_rnn:rnn', color: '#43A047' },
        legend: [
            { color: '#43A047', label: 'P\u00e9rim\u00e8tre RNN' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://inpn.mnhn.fr/espace/protege/FR/RNN'
    },
    reserve_naturelle_de_corse: {
        title: 'R\u00e9serve Naturelle de Corse (RNC)',
        definition: 'Les RNC sont des r\u00e9serves naturelles dont la gestion rel\u00e8ve de la Collectivit\u00e9 de Corse. Elles prot\u00e8gent des milieux naturels insulaires remarquables (littoral, maquis, zones humides).',
        breeam: 'M\u00eame impact que les RNN pour <strong>LE\u00a003</strong>.',
        source: 'https://inpn.mnhn.fr/espace/protege/FR/RNC'
    },
    // Urbanisme
    urbanisme_plu: {
        title: 'Zones du Plan Local d\u2019Urbanisme (PLU)',
        definition: 'Le PLU d\u00e9coupe le territoire communal en zones\u00a0:<ul>' +
            '<li><strong>U</strong> \u2014 Zones urbanis\u00e9es\u00a0: secteurs d\u00e9j\u00e0 b\u00e2tis avec \u00e9quipements publics existants.</li>' +
            '<li><strong>AU</strong> \u2014 Zones \u00e0 urbaniser\u00a0: secteurs naturels destin\u00e9s \u00e0 l\u2019urbanisation future (AUc\u00a0: constructible, AUs\u00a0: stricte).</li>' +
            '<li><strong>A</strong> \u2014 Zones agricoles\u00a0: constructibilit\u00e9 limit\u00e9e aux b\u00e2timents agricoles.</li>' +
            '<li><strong>N</strong> \u2014 Zones naturelles\u00a0: prot\u00e9g\u00e9es en raison de la qualit\u00e9 des paysages ou des milieux naturels.</li></ul>',
        breeam: 'Le classement PLU impacte <strong>LE\u00a001 \u2014 Site selection</strong> (s\u00e9lection de site) et <strong>LE\u00a004</strong>. Un site en zone N ou A est d\u00e9favorable\u00a0; un site en zone U avec desserte TC est optimal pour BREEAM.',
        wmsLayer: 'du',
        wmsUrl: 'https://data.geopf.fr/wms-v/ows',
        legend: [
            { color: '#E84C50', label: 'Zone U \u2014 Urbanis\u00e9e' },
            { color: '#F7A64B', label: 'Zone AU \u2014 \u00c0 urbaniser' },
            { color: '#FBFB76', label: 'Zone A \u2014 Agricole' },
            { color: '#5AC45A', label: 'Zone N \u2014 Naturelle' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.geoportail-urbanisme.gouv.fr/'
    },
    // ICPE
    icpe_general: {
        title: 'Installation Class\u00e9e pour la Protection de l\u2019Environnement (ICPE)',
        definition: 'Les ICPE sont des exploitations industrielles ou agricoles susceptibles de cr\u00e9er des nuisances ou des dangers pour l\u2019environnement. Elles sont soumises \u00e0 3 r\u00e9gimes\u00a0:<ul>' +
            '<li><strong>D\u00e9claration</strong>\u00a0: activit\u00e9s \u00e0 faible risque, simple d\u00e9claration en pr\u00e9fecture.</li>' +
            '<li><strong>Enregistrement</strong>\u00a0: r\u00e9gime interm\u00e9diaire avec prescriptions standardis\u00e9es.</li>' +
            '<li><strong>Autorisation</strong>\u00a0: activit\u00e9s \u00e0 risque \u00e9lev\u00e9, enqu\u00eate publique et \u00e9tude d\u2019impact obligatoires.</li></ul>' +
            '<p>Les sites <strong>SEVESO</strong> (seuil haut ou seuil bas) sont les ICPE les plus dangereuses, soumises \u00e0 la directive europ\u00e9enne SEVESO III. Ils g\u00e9n\u00e8rent des p\u00e9rim\u00e8tres de s\u00e9curit\u00e9 (PPRT) affectant l\u2019urbanisation environnante.</p>',
        breeam: 'La proximit\u00e9 d\u2019ICPE est \u00e9valu\u00e9e dans <strong>Pol\u00a003</strong> (pollution, risque technologique) et <strong>Hea\u00a002</strong> (qualit\u00e9 de l\u2019air, bruit). Un site SEVESO \u00e0 proximit\u00e9 peut \u00eatre r\u00e9dhibitoire.',
        wmsLayer: 'INSTALLATIONS_CLASSEES_SIMPLIFIE_GE',
        legend: [
            { color: '#4A6BF7', shape: 'square', label: 'Usine Seveso' },
            { color: '#4A6BF7', shape: 'diamond', label: 'Usine non Seveso' },
            { color: '#FDC200', shape: 'diamond', label: '\u00c9olienne' },
            { color: '#00B063', shape: 'square', label: '\u00c9levage' },
            { color: '#F30067', shape: 'square', label: 'Carri\u00e8re' },
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ],
        source: 'https://www.georisques.gouv.fr/risques/installations'
    },
    // Pollution
    pollution_general: {
        title: 'Sites et sols pollu\u00e9s (SSP)',
        definition: 'La base de donn\u00e9es des sites et sols pollu\u00e9s regroupe plusieurs registres\u00a0:<ul>' +
            '<li><strong>SIS</strong> (Secteurs d\u2019Information sur les Sols)\u00a0: parcelles o\u00f9 l\u2019\u00c9tat conna\u00eet une pollution des sols justifiant une information de l\u2019acqu\u00e9reur. Obligation d\u2019\u00e9tude de sol pour tout changement d\u2019usage.</li>' +
            '<li><strong>CASIAS</strong> (ex-BASIAS)\u00a0: inventaire historique des anciens sites industriels et d\u2019activit\u00e9s de service. Indicatif, ne pr\u00e9juge pas de la pollution effective.</li>' +
            '<li><strong>Instructions SSP</strong> (ex-BASOL)\u00a0: sites pollu\u00e9s faisant l\u2019objet d\u2019une action de l\u2019administration (diagnostic, mise en s\u00e9curit\u00e9, r\u00e9habilitation).</li></ul>',
        breeam: 'Impact direct sur <strong>LE\u00a001</strong> (s\u00e9lection de site\u00a0: site brownfield vs greenfield) et <strong>Pol\u00a003</strong>. Un SIS impose un plan de gestion de la pollution. Un site CASIAS n\u00e9cessite des investigations compl\u00e9mentaires (diagnostic phase 1 / phase 2).',
        source: 'https://www.georisques.gouv.fr/risques/pollutions-sols-sis-anciens-sites-industriels'
    }
};

function saBuildMapBlock(heading, legend) {
    var h = '<h3>' + (heading || 'Carte') + '</h3><div id="saDetailMapDiv" class="sa-dp-map"></div>';
    if (legend && legend.length > 0) {
        h += '<div class="sa-dp-legend">';
        legend.forEach(function (item) {
            var cls, style;
            switch (item.shape) {
                case 'circle':
                    cls = 'sa-dp-legend-dot'; style = 'background:' + item.color; break;
                case 'circle-outline':
                    cls = 'sa-dp-legend-circle-outline'; style = 'border-color:' + item.color; break;
                case 'diamond':
                    cls = 'sa-dp-legend-diamond'; style = 'background:' + item.color; break;
                case 'triangle':
                    cls = 'sa-dp-legend-triangle'; style = 'border-bottom-color:' + item.color; break;
                case 'star':
                    cls = 'sa-dp-legend-star'; style = 'background:' + item.color; break;
                case 'square':
                    cls = 'sa-dp-legend-square'; style = 'background:' + item.color; break;
                default:
                    if (item.hatched) {
                        cls = 'sa-dp-legend-swatch';
                        style = 'background:repeating-linear-gradient(45deg,' + item.color + ',' + item.color + ' 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)';
                    } else if (item.border) {
                        cls = 'sa-dp-legend-swatch';
                        style = 'background:transparent;border:2px solid ' + item.color;
                    } else {
                        cls = 'sa-dp-legend-swatch';
                        style = 'background:' + item.color;
                    }
            }
            h += '<div class="sa-dp-legend-item"><span class="' + cls + '" style="' + style + ';"></span>' + item.label + '</div>';
        });
        h += '</div>';
    }
    return h;
}

function saGetDetailContent(category, key) {
    var h = '';
    var title = '';
    var wmsLayer = null;
    var wmsUrl = null;
    var wfsLayer = null;
    var baseTileConfig = null;

    if (category === 'risque') {
        var def = SA_RISK_DEFINITIONS[key];
        if (!def) {
            // Fallback: try partial match
            var keys = Object.keys(SA_RISK_DEFINITIONS);
            for (var i = 0; i < keys.length; i++) {
                if (key.indexOf(keys[i].substring(0, 8)) !== -1 || keys[i].indexOf(key.substring(0, 8)) !== -1) {
                    def = SA_RISK_DEFINITIONS[keys[i]]; break;
                }
            }
        }
        if (def) {
            title = def.title;
            h += '<h3>D\u00e9finition</h3><p>' + def.definition + '</p>';
            if (def.extras) h += def.extras;

            // Show site-specific data
            h += saGetRisqueContextData(key);

            h += '<h3>Impact BREEAM</h3><p>' + def.breeam + '</p>';
            var wmsLayers = def.wmsLayer ? (Array.isArray(def.wmsLayer) ? def.wmsLayer : [def.wmsLayer]) : null;
            h += saBuildMapBlock('Carte', def.legend, wmsLayers, def.wmsUrl);
            wmsLayer = def.wmsLayer || null;
            wmsUrl = def.wmsUrl || null;
            wfsLayer = def.wfsLayer || null;
            h += '<div class="sa-dp-source">Source\u00a0: <a href="' + (def.source || '#') + '" target="_blank" rel="noopener">' + (def.source || 'G\u00e9orisques') + '</a></div>';
        } else {
            title = 'D\u00e9tail';
            h += '<p>Aucune fiche disponible pour cet \u00e9l\u00e9ment.</p>';
        }
    } else if (category === 'biodiversite') {
        var def = SA_RISK_DEFINITIONS[key];
        if (def) {
            title = def.title;
            h += '<h3>D\u00e9finition</h3><p>' + def.definition + '</p>';
            h += '<h3>Impact BREEAM</h3><p>' + def.breeam + '</p>';
            h += saBuildMapBlock('Carte', def.legend);
            h += '<div class="sa-dp-source">Source\u00a0: <a href="' + (def.source || '#') + '" target="_blank" rel="noopener">' + (def.source || 'INPN') + '</a></div>';
            wmsLayer = def.wmsLayer || null;
            wmsUrl = def.wmsUrl || null;
            wfsLayer = def.wfsLayer || null;
        } else {
            title = 'Zone prot\u00e9g\u00e9e';
            h += '<p>Aucune fiche disponible pour ce type de zone.</p>';
        }
    } else if (category === 'urbanisme') {
        var def = SA_RISK_DEFINITIONS['urbanisme_plu'];
        title = 'Zone PLU\u00a0: ' + key;
        h += '<h3>D\u00e9finition des zones PLU</h3><p>' + def.definition + '</p>';
        h += '<h3>Impact BREEAM</h3><p>' + def.breeam + '</p>';
        h += saBuildMapBlock('Carte du PLU', def.legend, [def.wmsLayer], def.wmsUrl);
        h += '<div class="sa-dp-source">Source\u00a0: <a href="' + def.source + '" target="_blank" rel="noopener">G\u00e9oportail de l\u2019urbanisme</a></div>';
        wmsLayer = def.wmsLayer; wmsUrl = def.wmsUrl;
    } else if (category === 'icpe') {
        var def = SA_RISK_DEFINITIONS['icpe_general'];
        title = 'ICPE \u2014 D\u00e9tail';
        // Show specific ICPE data if available
        var r = saState.results.icpe;
        if (r && r.data && r.data[key]) {
            var inst = r.data[key];
            title = saEscH(inst.nom_ets || '\u00c9tablissement');
            h += '<h3>\u00c9tablissement</h3>';
            h += '<p><strong>' + saEscH(inst.nom_ets || 'N/A') + '</strong></p>';
            if (inst.adresse) h += '<p>Adresse\u00a0: ' + saEscH(inst.adresse) + '</p>';
            if (inst.regime) h += '<p>R\u00e9gime\u00a0: <span class="sa-dp-tag ' + (inst.regime === 'Autorisation' ? 'sa-dp-tag-orange' : 'sa-dp-tag-blue') + '">' + saEscH(inst.regime) + '</span></p>';
            if (inst.regime_seveso && inst.regime_seveso !== 'Non Seveso') {
                h += '<p>SEVESO\u00a0: <span class="sa-dp-tag sa-dp-tag-red">' + saEscH(inst.regime_seveso) + '</span></p>';
            }
            if (inst.lib_activite) h += '<p>Activit\u00e9\u00a0: ' + saEscH(inst.lib_activite) + '</p>';
            if (inst.code_naf) h += '<p>Code NAF\u00a0: ' + saEscH(inst.code_naf) + '</p>';
            h += '<hr style="border:none;border-top:1px solid #E2E8F0;margin:16px 0;">';
        }
        h += '<h3>R\u00e9glementation ICPE</h3><p>' + def.definition + '</p>';
        h += '<h3>Impact BREEAM</h3><p>' + def.breeam + '</p>';
        h += saBuildMapBlock('Carte', def.legend, [def.wmsLayer]);
        h += '<div class="sa-dp-source">Source\u00a0: <a href="' + def.source + '" target="_blank" rel="noopener">G\u00e9orisques ICPE</a></div>';
        wmsLayer = def.wmsLayer; wmsUrl = def.wmsUrl;
    } else if (category === 'pollution') {
        var def = SA_RISK_DEFINITIONS['pollution_general'];
        title = 'Pollution \u2014 D\u00e9tail';
        // Show specific site data
        var polData = saGetPollutionEntries();
        if (polData[key]) {
            var s = polData[key];
            title = saEscH(s.nom || s.raison_sociale || 'Site');
            h += '<h3>Site</h3>';
            h += '<p><strong>' + saEscH(s.nom || s.raison_sociale || 'N/A') + '</strong></p>';
            if (s.adresse) h += '<p>Adresse\u00a0: ' + saEscH(s.adresse) + '</p>';
            if (s.commune) h += '<p>Commune\u00a0: ' + saEscH(s.commune) + '</p>';
            if (s.activite) h += '<p>Activit\u00e9\u00a0: ' + saEscH(s.activite) + '</p>';
            if (s.type_base || s.source) h += '<p>Base\u00a0: <span class="sa-dp-tag sa-dp-tag-orange">' + saEscH(s.type_base || s.source || '') + '</span></p>';
            if (s.etat_instruction) h += '<p>\u00c9tat\u00a0: ' + saEscH(s.etat_instruction) + '</p>';
            h += '<hr style="border:none;border-top:1px solid #E2E8F0;margin:16px 0;">';
        }
        h += '<h3>R\u00e9glementation SSP</h3><p>' + def.definition + '</p>';
        h += '<h3>Impact BREEAM</h3><p>' + def.breeam + '</p>';
        var polLayers = ['SSP_CLASSIF_SIS_GE', 'SSP_ETS_GE_POINT'];
        h += saBuildMapBlock('Carte', [
            { color: '#EF4444', shape: 'circle', label: 'Votre adresse' }
        ], polLayers);
        h += '<div class="sa-dp-source">Source\u00a0: <a href="' + def.source + '" target="_blank" rel="noopener">G\u00e9orisques SSP</a></div>';
        wmsLayer = polLayers;
    } else if (category === 'milieu_physique') {
        var mp = saState.milieuPhysique || {};
        var gr = saState.results ? saState.results.georisques || {} : {};

        if (key === 'topographie') {
            title = 'Topographie';
            var alti = mp.altitude;
            h += '<h3>Altitude et relief</h3>';
            if (alti) {
                h += '<p>Altitude au droit du site\u00a0: <strong>' + alti.centre + '\u00a0m NGF</strong></p>';
                if (alti.min !== alti.max) {
                    h += '<p>Sur un rayon de 200\u00a0m\u00a0: entre ' + alti.min + '\u00a0m et ' + alti.max + '\u00a0m (d\u00e9nivel\u00e9 de ' + alti.deniv + '\u00a0m).</p>';
                    h += '<p>Pente estim\u00e9e\u00a0: <strong>' + alti.pentePct + '\u00a0%</strong>';
                    if (alti.pentePct <= 2) h += ' \u2014 terrain sensiblement plat.';
                    else if (alti.pentePct <= 5) h += ' \u2014 relief l\u00e9g\u00e8rement vallonn\u00e9.';
                    else if (alti.pentePct <= 15) h += ' \u2014 pente mod\u00e9r\u00e9e. Des terrassements sont probables.';
                    else h += ' \u2014 forte pente. Contraintes significatives de terrassement et de fondations.';
                    h += '</p>';
                }
            } else {
                h += '<p>Donn\u00e9es altim\u00e9triques non disponibles.</p>';
            }
            h += '<h3>Impact BREEAM</h3>';
            h += '<p>La topographie du site conditionne les choix de fondations, la gestion des eaux pluviales (Wat 01, Pol 03), et les possibilit\u00e9s d\u2019am\u00e9nagements ext\u00e9rieurs (LE 02). Une forte pente peut g\u00e9n\u00e9rer des surco\u00fbts de terrassement et n\u00e9cessiter des \u00e9tudes g\u00e9otechniques compl\u00e9mentaires.</p>';
            h += saBuildMapBlock('Carte d\u2019\u00e9l\u00e9vation', null);
            // Elevation heatmap: custom canvas rendering from terrain-rgb tiles
            baseTileConfig = { elevationHeatmap: true };
            h += '<div class="sa-dp-source">Source\u00a0: <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener">AWS Terrain Tiles</a> (Mapzen / SRTM)</div>';

        } else if (key === 'nature_sol') {
            title = 'Nature du sol';

            // Géologie détaillée
            h += '<h3>Contexte g\u00e9ologique</h3>';
            var geo = mp.geologie;
            if (geo) {
                h += '<p>Le site repose sur une formation de <strong>' + saEscH(geo.descr.toLowerCase()) + '</strong>';
                if (geo.type) h += ', class\u00e9e dans la cat\u00e9gorie des ' + saEscH(geo.type.toLowerCase());
                h += ' (carte lithologique simplifi\u00e9e au 1/1\u00a0000\u00a0000, BRGM).</p>';

                // Caractéristiques géotechniques déduites de la lithologie
                var geoDesc = saGetLithoDescription(geo.descr);
                if (geoDesc) {
                    h += '<table class="sa-table" style="font-size:0.82rem;margin:8px 0 12px;">';
                    h += '<tbody>';
                    if (geoDesc.portance) h += '<tr><td style="width:130px;"><strong>Portance</strong></td><td>' + geoDesc.portance + '</td></tr>';
                    if (geoDesc.permeabilite) h += '<tr><td><strong>Perm\u00e9abilit\u00e9</strong></td><td>' + geoDesc.permeabilite + '</td></tr>';
                    if (geoDesc.sensibilite_eau) h += '<tr><td><strong>Sensibilit\u00e9 \u00e0 l\u2019eau</strong></td><td>' + geoDesc.sensibilite_eau + '</td></tr>';
                    if (geoDesc.fondations) h += '<tr><td><strong>Fondations</strong></td><td>' + geoDesc.fondations + '</td></tr>';
                    if (geoDesc.risques) h += '<tr><td><strong>Risques</strong></td><td>' + geoDesc.risques + '</td></tr>';
                    h += '</tbody></table>';
                    if (geoDesc.commentaire) h += '<p style="font-size:0.85rem;">' + geoDesc.commentaire + '</p>';
                }
            } else {
                h += '<p>Donn\u00e9es g\u00e9ologiques non disponibles \u00e0 cette position.</p>';
            }

            // Geological cross-section placeholder (async loaded)
            h += '<h3>Coupe g\u00e9ologique sch\u00e9matique <button onclick="saOpenCoupeFullscreen()" style="float:right;background:none;border:1px solid #CBD5E1;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:0.75rem;color:#64748B;" title="Agrandir">';
            h += '<svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="vertical-align:middle;margin-right:3px;"><path d="M3 3h5V1H1v7h2V3zm14 0h-5V1h7v7h-2V3zM3 17h5v2H1v-7h2v5zm14 0h-5v2h7v-7h-2v5z"/></svg>Agrandir</button></h3>';
            h += '<p style="font-size:0.82rem;color:#64748B;">Colonne stratigraphique estim\u00e9e \u00e0 partir de la carte g\u00e9ologique au 1/1\u00a0000\u00a0000 (BRGM), des donn\u00e9es pi\u00e9zom\u00e9triques (Hub\u2019Eau) et de l\u2019al\u00e9a RGA. Altitude de r\u00e9f\u00e9rence\u00a0: +' + Math.round((mp.altitude && mp.altitude.centre) || 0) + '\u00a0m NGF.</p>';
            h += '<div id="saCoupeGeoContainer" style="width:100%;min-height:520px;display:flex;align-items:center;justify-content:center;position:relative;"><span style="color:#94A3B8;">Chargement du profil\u2026</span></div>';
            // Fullscreen modal is created dynamically by saOpenCoupeFullscreen()

            // BSS nearby boreholes (async loaded)
            h += '<div id="saBssContainer" style="margin:12px 0;"><span style="color:#94A3B8;font-size:0.82rem;">Recherche de sondages BSS\u2026</span></div>';

            // Argiles
            if (gr.rga && (gr.rga.exposition || gr.rga.codeExposition)) {
                h += '<h3>Al\u00e9a retrait-gonflement des argiles</h3>';
                h += '<p>Exposition\u00a0: <strong>' + saEscH(gr.rga.exposition || '') + '</strong>.</p>';
                h += '<p>Le retrait-gonflement des argiles peut provoquer des fissures dans les fondations et dallages. Des fondations adapt\u00e9es (profondes, rigides) sont recommand\u00e9es en zone d\u2019exposition moyenne \u00e0 forte.</p>';
            }

            // Nappes — synthesis table (async built after strat model is available)
            h += '<h3>Eaux souterraines</h3>';
            h += '<div id="saNappeTableContainer"><span style="color:#94A3B8;font-size:0.82rem;">Chargement des donn\u00e9es nappes\u2026</span></div>';

            // Piezometers detail
            var nappes = mp.nappeStations || [];
            if (nappes.length > 0) {
                h += '<p style="margin-top:12px;font-size:0.85rem;color:#64748B;"><strong>' + nappes.length + '</strong> pi\u00e9zom\u00e8tre' + (nappes.length > 1 ? 's' : '') + ' de suivi dans un rayon de 5\u00a0km\u00a0:</p>';
                var shown = nappes.slice(0, 5);
                h += '<table class="sa-table" style="font-size:0.82rem;"><thead><tr><th>Code BSS</th><th>Commune</th><th>Prof. (m)</th></tr></thead><tbody>';
                shown.forEach(function(s) {
                    h += '<tr><td>' + saEscH(s.code_bss || '') + '</td><td>' + saEscH(s.nom_commune || '') + '</td><td>' + (s.profondeur_investigation || '\u2014') + '</td></tr>';
                });
                if (nappes.length > 5) h += '<tr><td colspan="3" style="text-align:center;color:#94A3B8;">\u2026 et ' + (nappes.length - 5) + ' autres</td></tr>';
                h += '</tbody></table>';
            } else {
                h += '<p>Aucun pi\u00e9zom\u00e8tre de suivi de nappe identifi\u00e9 dans un rayon de 5\u00a0km.</p>';
            }

            h += '<h3>Impact BREEAM</h3>';
            h += '<p>La nature du sol et la pr\u00e9sence de nappes influencent les choix de fondations, l\u2019\u00e9tude g\u00e9otechnique (Man 04), la gestion des eaux de ruissellement (Wat 01, Pol 03) et la faisabilit\u00e9 de solutions g\u00e9othermiques (Ene 01).</p>';
            wmsLayer = 'ALEARG_REALISE';
            wmsUrl = 'https://mapsref.brgm.fr/wxs/georisques/risques';
            h += saBuildMapBlock('Carte des argiles', [
                { color: '#FBBF24', shape: 'rect', label: 'Exposition faible' },
                { color: '#F97316', shape: 'rect', label: 'Exposition moyenne' },
                { color: '#EF4444', shape: 'rect', label: 'Exposition forte' }
            ], [wmsLayer], wmsUrl);
            h += '<div class="sa-dp-source">Source\u00a0: <a href="https://www.georisques.gouv.fr" target="_blank" rel="noopener">BRGM / G\u00e9orisques / IGN</a></div>';

            // Trigger async cross-section build, BSS query and nappe table after panel renders
            setTimeout(function() {
                saBuildCoupeGeologique();
                saFetchBssSondages();
                saBuildNappeTable();
            }, 200);

        } else if (key === 'hydrographie') {
            title = 'R\u00e9seau hydrographique';
            var stations = mp.hydroStations || [];
            h += '<h3>Cours d\u2019eau</h3>';
            if (stations.length > 0) {
                var coursEau = {};
                stations.forEach(function(s) {
                    var nom = s.libelle_cours_eau || s.libelle_station || '';
                    if (nom && !coursEau[nom]) coursEau[nom] = true;
                });
                var ceList = Object.keys(coursEau);
                if (ceList.length > 0) {
                    h += '<p>Cours d\u2019eau recens\u00e9s sur la commune\u00a0:</p><ul>';
                    ceList.slice(0, 10).forEach(function(n) { h += '<li>' + saEscH(n) + '</li>'; });
                    h += '</ul>';
                }
            } else {
                h += '<p>Aucune station hydrologique recens\u00e9e sur la commune.</p>';
            }
            // TRI
            if (gr.tri && gr.tri.data && gr.tri.data.length > 0) {
                h += '<h3>Territoire \u00e0 risque important d\u2019inondation (TRI)</h3>';
                gr.tri.data.slice(0, 5).forEach(function(t) {
                    h += '<p>\u2022 ' + saEscH(t.libelle || t.nom_tri || 'TRI') + '</p>';
                });
            }
            h += '<h3>Impact BREEAM</h3>';
            h += '<p>La proximit\u00e9 de cours d\u2019eau et les zones inondables conditionnent la gestion des eaux pluviales (Wat 01), la pr\u00e9vention de la pollution des milieux aquatiques (Pol 03) et l\u2019\u00e9cologie du site (LE 03, LE 04).</p>';
            wmsLayer = ['ALEA_SYNT_01_01FOR', 'ALEA_SYNT_02_02MOY'];
            wmsUrl = 'https://mapsref.brgm.fr/wxs/georisques/risques';
            h += saBuildMapBlock('Carte des inondations', [
                { color: '#1E40AF', shape: 'rect', label: 'Al\u00e9a fort' },
                { color: '#60A5FA', shape: 'rect', label: 'Al\u00e9a moyen' }
            ], wmsLayer, wmsUrl);
            h += '<div class="sa-dp-source">Source\u00a0: <a href="https://hubeau.eaufrance.fr" target="_blank" rel="noopener">Hub\u2019Eau</a> / <a href="https://www.georisques.gouv.fr" target="_blank" rel="noopener">G\u00e9orisques</a></div>';

        } else if (key === 'eau_potable') {
            title = 'Eau potable';
            var udis = mp.eauPotable || [];
            h += '<h3>Distribution d\u2019eau potable</h3>';
            if (udis.length > 0) {
                var udiNames = {};
                udis.forEach(function(u) {
                    var nom = u.nom_udi || u.nom_reseau || '';
                    if (nom && !udiNames[nom]) udiNames[nom] = { count: 0 };
                    if (nom) udiNames[nom].count++;
                });
                var udiList = Object.keys(udiNames);
                h += '<p><strong>' + udis.length + '</strong> unit\u00e9' + (udis.length > 1 ? 's' : '') + ' de distribution (UDI) recens\u00e9e' + (udis.length > 1 ? 's' : '') + ' sur la commune.</p>';
                if (udiList.length > 0) {
                    h += '<table class="sa-table" style="font-size:0.82rem;"><thead><tr><th>R\u00e9seau</th></tr></thead><tbody>';
                    udiList.slice(0, 8).forEach(function(n) { h += '<tr><td>' + saEscH(n) + '</td></tr>'; });
                    h += '</tbody></table>';
                }
            } else {
                h += '<p>Aucune unit\u00e9 de distribution d\u2019eau potable recens\u00e9e.</p>';
            }
            h += '<h3>Impact BREEAM</h3>';
            h += '<p>La connaissance du r\u00e9seau d\u2019eau potable est n\u00e9cessaire pour le dimensionnement des \u00e9quipements sanitaires (Wat 01, Wat 02) et l\u2019\u00e9valuation de la qualit\u00e9 de l\u2019eau distribu\u00e9e (Hea 04).</p>';
            h += '<div class="sa-dp-source">Source\u00a0: <a href="https://hubeau.eaufrance.fr" target="_blank" rel="noopener">Hub\u2019Eau \u2014 Qualit\u00e9 eau potable</a></div>';
        } else {
            title = 'D\u00e9tail';
            h += '<p>Aucune fiche disponible pour cet \u00e9l\u00e9ment.</p>';
        }
    }

    // Build markers from API data (e.g. cavités, mvt with coordinates)
    var markers = [];
    if (category === 'risque') {
        var gr = saState.results ? saState.results.georisques || {} : {};
        if (key === 'cavites_souterraines' && gr.cavites && gr.cavites.data) {
            gr.cavites.data.forEach(function (c) {
                if (c.latitude && c.longitude) {
                    markers.push({ lat: c.latitude, lon: c.longitude, label: c.nom || c.type || 'Cavit\u00e9' });
                }
            });
        }
        if (key === 'mouvements_de_terrain' && gr.mvt && gr.mvt.data) {
            gr.mvt.data.forEach(function (m) {
                if (m.latitude && m.longitude) {
                    markers.push({ lat: m.latitude, lon: m.longitude, label: m.type || m.lieu || 'Mouvement' });
                }
            });
        }
    }

    // Circle overlay for categories without WMS (e.g. air quality)
    var circleOverlay = null;
    if (category === 'risque' && key === 'qualite_air') {
        var aqData = saState.results.airQuality;
        if (aqData && aqData.source === 'atmo' && aqData.code_qual != null) {
            var col = aqData.coul_qual || '#50CCAA';
            circleOverlay = { radius: 800, color: col, label: 'ATMO ' + aqData.code_qual + '/6' };
        }
    }

    // Polylines for road/rail noise
    var polylines = null;
    if (category === 'risque' && key === 'bruit_routier') {
        var brr = saState.results.bruitRoutier || {};
        var infras = brr.infras || [];
        if (infras.length > 0) {
            var colorMap = {
                motorway: '#7D0023', motorway_link: '#7D0023', trunk: '#7D0023', trunk_link: '#7D0023',
                primary: '#D32F2F', secondary: '#FF9800',
                rail: '#5C3D00', light_rail: '#333333'
            };
            var weightMap = {
                motorway: 5, motorway_link: 3, trunk: 4, trunk_link: 3,
                primary: 3, secondary: 2, rail: 4, light_rail: 2
            };
            polylines = [];
            // Deduplicate road names so we only label each street once
            var seenRoadNames = {};
            infras.forEach(function (inf) {
                if (inf.geometry && inf.geometry.length > 1) {
                    var ref = (inf.tags && inf.tags.ref) ? inf.tags.ref : '';
                    var roadName = (inf.tags && inf.tags.roadName) ? inf.tags.roadName : '';
                    var nature = (inf.tags && inf.tags.nature) ? inf.tags.nature : inf.type;
                    // Label: route number first, then road name for important roads
                    var label = ref;
                    if (!label && roadName && !seenRoadNames[roadName]) {
                        label = roadName;
                        seenRoadNames[roadName] = true;
                    }
                    var tooltipText = (ref || roadName || inf.name || nature) + ' \u2014 ' + inf.distance + '\u00a0m';
                    polylines.push({
                        coords: inf.geometry.map(function (pt) { return [pt.lat, pt.lon]; }),
                        color: colorMap[inf.type] || '#888',
                        weight: weightMap[inf.type] || 2,
                        tooltip: tooltipText,
                        label: label
                    });
                }
            });
            // Add search radius circle
            circleOverlay = { radius: 500, color: '#EF4444', fillOpacity: 0.05, label: '' };
        }
    }

    // Route labels from BDTopo (IGN) — each has a single labelPos [lat,lon]
    var routeLabels = null;
    if (category === 'risque' && key === 'bruit_routier') {
        var brrLbl = saState.results.bruitRoutier || {};
        if (brrLbl.routeRefs && brrLbl.routeRefs.length > 0) {
            routeLabels = [];
            brrLbl.routeRefs.forEach(function (rr) {
                if (rr.labelPos) {
                    routeLabels.push({ label: rr.numero, pos: rr.labelPos });
                }
            });
        }
    }

    return { title: title, html: h, wmsLayer: wmsLayer, wmsUrl: wmsUrl, wfsLayer: wfsLayer, markers: markers, circleOverlay: circleOverlay, polylines: polylines, routeLabels: routeLabels, baseTileConfig: baseTileConfig };
}

// Get context-specific data for a risk (CatNat history, PPR list, etc.)
function saGetRisqueContextData(key) {
    var gr = saState.results ? saState.results.georisques || {} : {};
    var h = '';

    if (key === 'arretes_catnat' && gr.catnat && gr.catnat.data && gr.catnat.data.length > 0) {
        h += '<h3>Historique des arr\u00eat\u00e9s CatNat (' + gr.catnat.data.length + ')</h3>';
        h += '<table class="sa-table"><thead><tr><th>Date</th><th>Type</th><th>P\u00e9riode</th></tr></thead><tbody>';
        gr.catnat.data.slice(0, 25).forEach(function (c) {
            h += '<tr><td>' + saEscH(c.date_debut_evt || '') + '</td>';
            h += '<td>' + saEscH(c.libelle_risque_jo || '') + '</td>';
            h += '<td>' + saEscH((c.date_debut_evt || '') + ' \u2014 ' + (c.date_fin_evt || '')) + '</td></tr>';
        });
        h += '</tbody></table>';
        if (gr.catnat.data.length > 25) h += '<p style="color:#94A3B8;font-size:0.85rem;">... et ' + (gr.catnat.data.length - 25) + ' autres</p>';
    }

    if (key === 'ppr' && gr.ppr && gr.ppr.data && gr.ppr.data.length > 0) {
        h += '<h3>PPR applicables (' + gr.ppr.data.length + ')</h3><ul>';
        gr.ppr.data.forEach(function (p) {
            h += '<li><strong>' + saEscH(p.libelle_risque_long || p.libelle_risque_jo || 'PPR') + '</strong>';
            if (p.date_prescription) h += ' \u2014 prescrit le ' + saEscH(p.date_prescription);
            h += '</li>';
        });
        h += '</ul>';
    }

    if ((key === 'inondation_tri_') && gr.tri && gr.tri.data && gr.tri.data.length > 0) {
        h += '<h3>Zones TRI identifi\u00e9es</h3><ul>';
        gr.tri.data.forEach(function (t) {
            h += '<li>' + saEscH(t.libelle || t.nom_tri || 'Zone TRI') + '</li>';
        });
        h += '</ul>';
    }

    if (key === 'mouvements_de_terrain' && gr.mvt && gr.mvt.data && gr.mvt.data.length > 0) {
        h += '<h3>Mouvements recens\u00e9s (' + gr.mvt.data.length + ')</h3>';
        h += '<table class="sa-table"><thead><tr><th>Type</th><th>Lieu</th><th>Date</th><th>Fiabilit\u00e9</th></tr></thead><tbody>';
        gr.mvt.data.slice(0, 20).forEach(function (m) {
            h += '<tr><td>' + saEscH(m.type || '') + '</td>';
            h += '<td>' + saEscH(m.lieu || m.commentaire_lieu || '') + '</td>';
            h += '<td>' + saEscH(m.date_debut || '') + '</td>';
            h += '<td>' + saEscH(m.fiabilite || '') + '</td></tr>';
        });
        h += '</tbody></table>';
        if (gr.mvt.data.length > 20) h += '<p style="color:#94A3B8;font-size:0.85rem;">... et ' + (gr.mvt.data.length - 20) + ' autres</p>';
    }

    if (key === 'qualite_air') {
        var aq = saState.results.airQuality;
        if (aq && aq.source === 'atmo') {
            var subLabelsCtx = { 1: 'Bon', 2: 'Moyen', 3: 'D\u00e9grad\u00e9', 4: 'Mauvais', 5: 'Tr\u00e8s mauvais', 6: 'Extr\u00eamement mauvais' };
            h += '<h3>Indice ATMO du ' + saEscH(aq.date_ech || '') + '</h3>';
            h += '<p style="font-size:1.1em;"><span style="display:inline-block;width:18px;height:18px;border-radius:50%;background:' + (aq.coul_qual || '#ccc') + ';vertical-align:middle;margin-right:6px;"></span>';
            h += '<strong>' + saEscH(aq.lib_qual || '') + '</strong> (indice ' + aq.code_qual + '/6)</p>';
            h += '<table class="sa-table"><thead><tr><th>Polluant</th><th>Sous-indice</th><th>Qualificatif</th></tr></thead><tbody>';
            if (aq.code_pm25 != null) h += '<tr><td>PM2.5</td><td>' + aq.code_pm25 + '/6</td><td>' + (subLabelsCtx[aq.code_pm25] || '') + '</td></tr>';
            if (aq.code_pm10 != null) h += '<tr><td>PM10</td><td>' + aq.code_pm10 + '/6</td><td>' + (subLabelsCtx[aq.code_pm10] || '') + '</td></tr>';
            if (aq.code_no2 != null) h += '<tr><td>NO\u2082</td><td>' + aq.code_no2 + '/6</td><td>' + (subLabelsCtx[aq.code_no2] || '') + '</td></tr>';
            if (aq.code_o3 != null) h += '<tr><td>O\u2083</td><td>' + aq.code_o3 + '/6</td><td>' + (subLabelsCtx[aq.code_o3] || '') + '</td></tr>';
            if (aq.code_so2 != null) h += '<tr><td>SO\u2082</td><td>' + aq.code_so2 + '/6</td><td>' + (subLabelsCtx[aq.code_so2] || '') + '</td></tr>';
            h += '</tbody></table>';
            h += '<p style="color:#64748B;font-size:0.85em;">Source\u00a0: ' + saEscH(aq.aasqa || 'AASQA') + ' \u2014 Commune\u00a0: ' + saEscH(aq.lib_zone || '') + '</p>';

            // Episodes de pollution
            var ep = saState.results.episodes || {};
            if (ep.actifs && ep.actifs.length > 0) {
                h += '<h3 style="color:#DC2626;">Episodes de pollution en cours</h3>';
                h += '<table class="sa-table"><thead><tr><th>Date</th><th>Polluant</th><th>Etat</th><th>Zone</th></tr></thead><tbody>';
                ep.actifs.forEach(function (e) {
                    h += '<tr><td>' + saEscH(e.date || '') + '</td><td>' + saEscH(e.polluant || '') + '</td>';
                    h += '<td><strong style="color:#DC2626;">' + saEscH(e.etat || '') + '</strong></td>';
                    h += '<td>' + saEscH(e.zone || '') + '</td></tr>';
                });
                h += '</tbody></table>';
            }
            if (ep.historique && ep.historique.length > 0) {
                h += '<h3>Episodes de pollution (12 derniers mois)</h3>';
                h += '<table class="sa-table"><thead><tr><th>Date</th><th>Polluant</th><th>Etat</th><th>Zone</th></tr></thead><tbody>';
                ep.historique.forEach(function (e) {
                    h += '<tr><td>' + saEscH(e.date || '') + '</td><td>' + saEscH(e.polluant || '') + '</td>';
                    h += '<td>' + saEscH(e.etat || '') + '</td>';
                    h += '<td>' + saEscH(e.zone || '') + '</td></tr>';
                });
                h += '</tbody></table>';
                h += '<p style="color:#64748B;font-size:0.85em;">' + ep.historique.length + ' episode(s) recense(s) sur les 12 derniers mois dans le departement.</p>';
            } else {
                h += '<p style="color:#64748B;font-size:0.85em;">Aucun episode de pollution recense sur les 12 derniers mois (ou donnees non disponibles pour ce departement).</p>';
            }
        } else if (aq && aq.error) {
            h += '<p>' + saEscH(aq.error) + '</p>';
        }
    }

    if (key === 'bruit_peb') {
        var br = saState.results.bruit || {};
        var pebF = (br.peb && br.peb.features) ? br.peb.features : [];
        var pgsF = (br.pgs && br.pgs.features) ? br.pgs.features : [];
        if (pebF.length > 0) {
            var p = pebF[0].properties;
            h += '<h3>Zone PEB d\u00e9tect\u00e9e</h3>';
            h += '<table class="sa-table"><thead><tr><th>Propri\u00e9t\u00e9</th><th>Valeur</th></tr></thead><tbody>';
            h += '<tr><td>Zone</td><td><strong>' + saEscH(p.zone || '') + '</strong></td></tr>';
            if (p.nom) h += '<tr><td>A\u00e9rodrome</td><td>' + saEscH(p.nom) + '</td></tr>';
            if (p.code_oaci) h += '<tr><td>Code OACI</td><td>' + saEscH(p.code_oaci) + '</td></tr>';
            if (p.indldenext) h += '<tr><td>Lden ext\u00e9rieur</td><td>' + saEscH(p.indldenext) + ' dB</td></tr>';
            if (p.indldenint) h += '<tr><td>Lden int\u00e9rieur</td><td>' + saEscH(p.indldenint) + ' dB</td></tr>';
            if (p.date_arret) h += '<tr><td>Arr\u00eat\u00e9</td><td>' + saEscH(p.date_arret) + '</td></tr>';
            h += '</tbody></table>';
        } else if (br.pebProximite) {
            var prox = br.pebProximite;
            h += '<h3>A\u00e9rodrome \u00e0 proximit\u00e9</h3>';
            h += '<p>Le site n\u2019est pas directement dans une zone PEB, mais un a\u00e9rodrome dot\u00e9 d\u2019un PEB se trouve \u00e0 proximit\u00e9.</p>';
            h += '<table class="sa-table"><thead><tr><th>Propri\u00e9t\u00e9</th><th>Valeur</th></tr></thead><tbody>';
            h += '<tr><td>A\u00e9rodrome</td><td><strong>' + saEscH(prox.nom) + '</strong></td></tr>';
            if (prox.oaci) h += '<tr><td>Code OACI</td><td>' + saEscH(prox.oaci) + '</td></tr>';
            h += '<tr><td>Distance</td><td>' + prox.distance + '\u00a0m</td></tr>';
            h += '</tbody></table>';
            if (prox.arrete_peb) h += '<p style="font-size:0.85em;"><a href="' + saEscH(prox.arrete_peb) + '" target="_blank" rel="noopener">Consulter l\u2019arr\u00eat\u00e9 PEB</a></p>';
        } else {
            h += '<p>Le site n\u2019est situ\u00e9 dans aucune zone de Plan d\u2019Exposition au Bruit (PEB) ni de Plan de G\u00eane Sonore (PGS). Favorable pour le cr\u00e9dit Hea 05.</p>';
        }
        if (pgsF.length > 0) {
            h += '<h3>Zone PGS d\u00e9tect\u00e9e</h3><p>Zone ' + saEscH(pgsF[0].properties.zone || pgsF[0].properties.type_zone || '?') + '</p>';
        }
    }

    if (key === 'bruit_routier') {
        var brr = saState.results.bruitRoutier || {};
        var infras = brr.infras || [];
        // Routes numérotées IGN dans le secteur
        if (brr.routeRefs && brr.routeRefs.length > 0) {
            h += '<h3>Routes num\u00e9rot\u00e9es dans le secteur</h3>';
            h += '<p style="margin-bottom:6px;">';
            brr.routeRefs.forEach(function (r, i) {
                if (i > 0) h += ', ';
                h += '<strong>' + saEscH(r.numero) + '</strong> <span style="color:#64748B;font-size:0.85em;">(' + saEscH(r.type) + ')</span>';
            });
            h += '</p>';
            h += '<p style="color:#64748B;font-size:0.85em;">Source\u00a0: BD TOPO\u00ae IGN</p>';
        }
        if (infras.length > 0) {
            var catLabelsCtx = {
                motorway: 'Autoroute', motorway_link: 'Bretelle autoroute', trunk: 'Voie express',
                trunk_link: 'Bretelle voie express', primary: 'Route nationale/d\u00e9partementale',
                secondary: 'Route secondaire', rail: 'Voie ferr\u00e9e', light_rail: 'Tramway/m\u00e9tro l\u00e9ger'
            };
            h += '<h3>Infrastructures de transport d\u00e9tect\u00e9es (' + infras.length + ')</h3>';
            h += '<table class="sa-table"><thead><tr><th>Type</th><th>Nom / R\u00e9f.</th><th>Distance</th></tr></thead><tbody>';
            infras.slice(0, 20).forEach(function (inf) {
                h += '<tr><td>' + saEscH(catLabelsCtx[inf.type] || inf.type) + '</td>';
                h += '<td>' + saEscH(inf.name || '\u2014') + '</td>';
                h += '<td>' + inf.distance + '\u00a0m</td></tr>';
            });
            h += '</tbody></table>';
            if (infras.length > 20) h += '<p style="color:#94A3B8;font-size:0.85rem;">... et ' + (infras.length - 20) + ' autres</p>';

            // Classement sonore indicatif
            var closest = infras[0];
            var isHT = (closest.type === 'motorway' || closest.type === 'trunk' || closest.type === 'motorway_link' || closest.type === 'trunk_link');
            h += '<h3>Estimation classement sonore</h3>';
            if (isHT && closest.distance <= 300) {
                h += '<p>Proximit\u00e9 imm\u00e9diate d\u2019une infrastructure \u00e0 fort trafic. Le site est probablement dans un <strong>secteur affect\u00e9 par le bruit de cat\u00e9gorie 1 \u00e0 3</strong>. Une \u00e9tude acoustique pr\u00e9alable est fortement recommand\u00e9e.</p>';
            } else if (closest.distance <= 100) {
                h += '<p>Infrastructure de transport \u00e0 moins de 100\u00a0m. Le site est vraisemblablement dans un <strong>secteur affect\u00e9 par le bruit</strong>. V\u00e9rifier le classement sonore pr\u00e9fectoral.</p>';
            } else {
                h += '<p>L\u2019infrastructure la plus proche est \u00e0 ' + closest.distance + '\u00a0m. Exposition mod\u00e9r\u00e9e \u00e0 faible selon le type de voie.</p>';
            }
        } else {
            h += '<p>Aucune infrastructure de transport majeure (autoroute, nationale, voie ferr\u00e9e) d\u00e9tect\u00e9e dans un rayon de 500\u00a0m. Favorable pour le cr\u00e9dit Hea 05.</p>';
        }
    }

    if (key === 'cavites_souterraines' && gr.cavites && gr.cavites.data && gr.cavites.data.length > 0) {
        h += '<h3>Cavit\u00e9s recens\u00e9es (' + gr.cavites.data.length + ')</h3>';
        h += '<table class="sa-table"><thead><tr><th>Type</th><th>Nom / Rep\u00e9rage</th><th>Commune</th></tr></thead><tbody>';
        gr.cavites.data.slice(0, 15).forEach(function (c) {
            var typ = c.type || c.type_cavite || c.nature || '';
            var nom = c.nom || c.reperage_geo || c.lieu_dit || '';
            var commune = '';
            if (c.departement && c.departement.nom) commune = c.departement.nom;
            if (c.code_insee) commune += (commune ? ' — ' : '') + c.code_insee;
            h += '<tr><td>' + saEscH(typ) + '</td>';
            h += '<td>' + saEscH(nom) + '</td>';
            h += '<td>' + saEscH(commune) + '</td></tr>';
        });
        h += '</tbody></table>';
    }

    return h;
}

// Build flat list of pollution entries matching render order
function saGetPollutionEntries() {
    var r = saState.results.pollution || {};
    var entries = [];
    if (r.ssp && r.ssp.data) entries = entries.concat(r.ssp.data);
    if (r.sis && r.sis.data) entries = entries.concat(r.sis.data);
    if (r.casias && r.casias.data) entries = entries.concat(r.casias.data);
    if (r.instructions && r.instructions.data) entries = entries.concat(r.instructions.data);
    return entries;
}
