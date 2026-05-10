// =========================================================================
// VERDICT - Cloud projects module (Supabase CRUD)
// =========================================================================
// Slice 1 : API CRUD sur la table public.projects + helper d'agrégation
// d'état par projet (lecture des clés localStorage __p<id>).
// Au login, liste les projets cloud à fin de diagnostic (console).
// L'intégration avec homeProjects (mirroring, sync state) viendra dans
// les slices suivantes.
// =========================================================================
(function () {
  'use strict';

  if (!window.Verdict || !window.Verdict.auth) {
    console.error('[Verdict.cloud] Module auth non chargé — vérifier l\'ordre des <script>');
    return;
  }

  var _client = null;
  function client() {
    if (!_client) _client = window.Verdict.auth.getClient();
    return _client;
  }

  // ----------------------------------------------------------------------
  // Sync status indicator (Slice 3.A)
  // ----------------------------------------------------------------------
  // États : 'syncing' (push en cours), 'success' (vient de finir), 'error'.
  // Auto-fade en success après 3s. Reste affiché en error 5s.
  var _syncStatusHideTimer = null;
  var _syncSuccessTime = 0;
  function setSyncStatus(state, text) {
    var el = document.getElementById('cloudSyncStatus');
    // Met à jour le badge flottant
    if (el) {
      el.classList.remove('syncing', 'success', 'error', 'fading');
      el.classList.add('visible', state);
      var t = el.querySelector('.cloud-sync-status-text');
      if (t) t.textContent = text || '';
      if (_syncStatusHideTimer) { clearTimeout(_syncStatusHideTimer); _syncStatusHideTimer = null; }
      if (state === 'success') {
        _syncSuccessTime = Date.now();
        _syncStatusHideTimer = setTimeout(function () {
          el.classList.add('fading');
          setTimeout(function () { el.classList.remove('visible', 'fading'); }, 350);
        }, 3000);
      } else if (state === 'error') {
        _syncStatusHideTimer = setTimeout(function () {
          el.classList.add('fading');
          setTimeout(function () { el.classList.remove('visible', 'fading'); }, 350);
        }, 5000);
      }
    }
    // Met à jour les petits points dans les boutons auth (3 instances)
    var dotState = state === 'success' ? 'synced' : state; // mapping
    var dotTitle = (state === 'syncing') ? (text || 'Synchronisation…')
                 : (state === 'error')   ? (text || 'Erreur de synchronisation')
                 :                          (text || 'Synchronisé');
    document.querySelectorAll('.cloud-auth-dot').forEach(function (d) {
      d.classList.remove('synced', 'syncing', 'error');
      d.classList.add(dotState);
      d.setAttribute('title', dotTitle);
    });
  }
  // Met à jour le timestamp affiché dans le badge "Synchronisé" toutes les 10s
  // pour que "Synchronisé il y a 3s" devienne "il y a 13s", etc.
  function _formatRelativeAge(ms) {
    var s = Math.floor(ms / 1000);
    if (s < 5)   return 'Synchronisé';
    if (s < 60)  return 'Synchronisé il y a ' + s + 's';
    var m = Math.floor(s / 60);
    if (m < 60)  return 'Synchronisé il y a ' + m + ' min';
    var h = Math.floor(m / 60);
    return 'Synchronisé il y a ' + h + ' h';
  }

  // ----------------------------------------------------------------------
  // CRUD projects
  // ----------------------------------------------------------------------

  // Colonnes à toujours sélectionner pour avoir l'image complète d'un projet.
  var PROJECT_COLS = 'id, name, photo, certs, group_id, custom_name, state, created_at, updated_at, last_opened_at';

  /** Liste les projets de l'utilisateur connecté, triés par dernière ouverture desc. */
  async function listProjects() {
    var c = client();
    var resp = await c.from('projects')
      .select(PROJECT_COLS)
      .order('last_opened_at', { ascending: false });
    if (resp.error) throw resp.error;
    return resp.data || [];
  }

  /** Récupère un projet par id. */
  async function getProject(id) {
    var c = client();
    var resp = await c.from('projects')
      .select(PROJECT_COLS)
      .eq('id', id)
      .maybeSingle();
    if (resp.error) throw resp.error;
    return resp.data;
  }

  /**
   * Crée un projet. UUID généré côté client (offline-first).
   * @param {{name: string, photo?: string, certs?: string[], group_id?: string|null, custom_name?: boolean, state?: object}} p
   * @returns {Promise<object>} le row inséré
   */
  async function createProject(p) {
    var c = client();
    var user = window.Verdict.auth.getUser();
    if (!user) throw new Error('Non connecté — impossible de créer un projet cloud');
    var id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : _uuidFallback();
    p = p || {};
    var row = {
      id: id,
      user_id: user.id,
      name: p.name ? String(p.name).slice(0, 200) : 'Nouveau projet',
      photo: p.photo || null,
      certs: Array.isArray(p.certs) ? p.certs : [],
      group_id: p.group_id || null,
      custom_name: !!p.custom_name,
      state: p.state || {}
    };
    var resp = await c.from('projects').insert(row).select().single();
    if (resp.error) throw resp.error;
    return resp.data;
  }

  /** Met à jour un projet (name, state, last_opened_at, …). updated_at auto via trigger. */
  async function updateProject(id, patch) {
    var c = client();
    var resp = await c.from('projects').update(patch).eq('id', id).select().single();
    if (resp.error) throw resp.error;
    return resp.data;
  }

  /** Touche last_opened_at pour qu'un projet remonte en tête de liste. */
  async function touchProject(id) {
    return updateProject(id, { last_opened_at: new Date().toISOString() });
  }

  /** Supprime un projet (cascade RLS appliquée côté DB). */
  async function deleteProject(id) {
    var c = client();
    var resp = await c.from('projects').delete().eq('id', id);
    if (resp.error) throw resp.error;
    return true;
  }

  // ----------------------------------------------------------------------
  // Mirroring local → cloud (Slice 2)
  // ----------------------------------------------------------------------
  // Convertit un homeProjects[] item (id int local, certs Set) en payload cloud.
  function _localToCloudPayload(localProj) {
    return {
      name: localProj.name || 'Nouveau projet',
      photo: localProj.photo || null,
      certs: localProj.certs ? Array.from(localProj.certs) : [],
      group_id: localProj.groupId != null ? String(localProj.groupId) : null,
      custom_name: !!localProj.customName
    };
  }

  /**
   * Pousse un projet local vers Supabase. Si le projet a déjà un cloudId,
   * on update ; sinon on insert et on retourne le UUID pour que l'appelant
   * le stocke sur l'objet local.
   * @returns {Promise<string>} le cloudId (UUID)
   */
  async function syncLocalProject(localProj) {
    if (!window.Verdict.auth.isLoggedIn()) {
      throw new Error('Non connecté');
    }
    var payload = _localToCloudPayload(localProj);
    setSyncStatus('syncing', 'Synchronisation…');
    try {
      if (localProj.cloudId) {
        await updateProject(localProj.cloudId, payload);
        setSyncStatus('success', 'Synchronisé');
        return localProj.cloudId;
      }
      var created = await createProject(payload);
      setSyncStatus('success', 'Synchronisé');
      return created.id;
    } catch (e) {
      setSyncStatus('error', 'Erreur de synchronisation');
      throw e;
    }
  }

  /** Supprime du cloud (no-op si pas de cloudId). */
  async function syncLocalDelete(localProj) {
    if (!window.Verdict.auth.isLoggedIn()) return;
    if (!localProj || !localProj.cloudId) return;
    setSyncStatus('syncing', 'Synchronisation…');
    try {
      await deleteProject(localProj.cloudId);
      setSyncStatus('success', 'Synchronisé');
    }
    catch (e) {
      console.warn('[Verdict.cloud] deleteProject a échoué', e);
      setSyncStatus('error', 'Erreur de synchronisation');
    }
  }

  // ----------------------------------------------------------------------
  // State sync (Slice 3) : push de l'état complet du projet actif
  // ----------------------------------------------------------------------
  // Lit verdictActiveProjectId (id local), trouve le cloudId via le snapshot
  // verdictHomeProjects, agrège les clés __p<id> en blob JSONB et l'envoie
  // dans projects.state. Debounced pour ne pas saturer Supabase.

  function _findCloudIdForLocalId(localId) {
    try {
      var raw = localStorage.getItem('verdictHomeProjects');
      if (!raw) return null;
      var snap = JSON.parse(raw);
      if (!snap || !Array.isArray(snap.projects)) return null;
      var p = snap.projects.find(function (x) { return String(x.id) === String(localId); });
      return p ? (p.cloudId || null) : null;
    } catch (e) { return null; }
  }

  async function pushActiveProjectState() {
    if (!window.Verdict.auth.isLoggedIn()) return;
    var activeId;
    try { activeId = localStorage.getItem('verdictActiveProjectId'); } catch (e) {}
    if (!activeId) return;
    var cloudId = _findCloudIdForLocalId(activeId);
    if (!cloudId) return; // projet pas encore mirroré
    var blob = gatherLocalStateBlob(activeId);
    setSyncStatus('syncing', 'Synchronisation…');
    try {
      await updateProject(cloudId, {
        state: blob,
        last_opened_at: new Date().toISOString()
      });
      setSyncStatus('success', 'Synchronisé');
    } catch (e) {
      console.warn('[Verdict.cloud] push state échoué', e);
      setSyncStatus('error', 'Erreur de synchronisation');
    }
  }

  var _pushStateTimer = null;
  function schedulePushActiveProjectState(delayMs) {
    if (_pushStateTimer) clearTimeout(_pushStateTimer);
    _pushStateTimer = setTimeout(function () {
      _pushStateTimer = null;
      pushActiveProjectState();
    }, delayMs || 1500);
  }

  // ----------------------------------------------------------------------
  // Helper : agrège tous les états per-projet (localStorage __p<id>) en blob
  // ----------------------------------------------------------------------
  // Utilisé pour migrer un projet local vers le cloud (state JSONB) ou pour
  // pousser une mise à jour ponctuelle.
  var STATE_KEYS = [
    'breeamProjectData',
    'hqeState',
    'hqeExtra',
    'hqeThemeExtra',
    'bbcaNeufExtra',
    'breeam-ext-notes',
    'breeam-aim-checks',
    'sa_carto_projet_v1'
  ];

  /** Lit toutes les clés localStorage __p<localId> et renvoie un blob JSON. */
  function gatherLocalStateBlob(localProjectId) {
    var blob = {};
    STATE_KEYS.forEach(function (key) {
      try {
        var raw = localStorage.getItem(key + '__p' + localProjectId);
        if (raw != null) blob[key] = JSON.parse(raw);
      } catch (e) { /* ignore corrupted entry */ }
    });
    return blob;
  }

  /** Applique un blob JSON dans les clés localStorage __p<localId>. Retourne true si quelque chose a été écrit. */
  function applyStateBlobToLocalStorage(localProjectId, blob) {
    if (!blob || typeof blob !== 'object') return false;
    var written = false;
    STATE_KEYS.forEach(function (key) {
      if (blob[key] !== undefined) {
        try {
          localStorage.setItem(key + '__p' + localProjectId, JSON.stringify(blob[key]));
          written = true;
        } catch (e) { /* quota or similar */ }
      }
    });
    return written;
  }

  // ----------------------------------------------------------------------
  // Fallback UUID v4 (au cas où crypto.randomUUID indisponible)
  // ----------------------------------------------------------------------
  function _uuidFallback() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // ----------------------------------------------------------------------
  // Expose API
  // ----------------------------------------------------------------------
  window.Verdict = window.Verdict || {};
  window.Verdict.cloud = {
    listProjects: listProjects,
    getProject: getProject,
    createProject: createProject,
    updateProject: updateProject,
    touchProject: touchProject,
    deleteProject: deleteProject,
    syncLocalProject: syncLocalProject,
    syncLocalDelete: syncLocalDelete,
    pushActiveProjectState: pushActiveProjectState,
    schedulePushActiveProjectState: schedulePushActiveProjectState,
    refreshFromCloud: refreshFromCloud,
    setSyncStatus: setSyncStatus,
    gatherLocalStateBlob: gatherLocalStateBlob,
    applyStateBlobToLocalStorage: applyStateBlobToLocalStorage,
    _STATE_KEYS: STATE_KEYS
  };

  // ----------------------------------------------------------------------
  // Auth listener : Option A (Slice 2)
  //   • Login  → log les projets cloud (en attendant le merge réel Slice 4)
  //   • Logout → vide le cache local (homeProjects + active project + clés
  //     d'état per-projet __p<id>) puis reload pour repartir d'une page propre.
  // ----------------------------------------------------------------------
  // On garde une trace de l'état de connexion précédent pour ne déclencher
  // le clear qu'à la transition logged-in → logged-out, pas au boot anonyme.
  var _wasLoggedIn = false;

  function _clearLocalCache() {
    try {
      // Tableau projets local + projet actif
      localStorage.removeItem('verdictHomeProjects');
      localStorage.removeItem('verdictActiveProjectId');
      sessionStorage.removeItem('verdictPendingAssessment');
      sessionStorage.removeItem('verdictPendingMultiAssessment');
      // Clés d'état per-projet (__p<id>)
      var toRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && /__p\d+$/.test(k)) toRemove.push(k);
      }
      toRemove.forEach(function(k) { localStorage.removeItem(k); });
    } catch (e) { console.warn('[Verdict.cloud] clear cache local impossible', e); }
  }

  // ----------------------------------------------------------------------
  // Hydratation : à la connexion, si le cache local est vide, on fetch les
  // projets cloud, on les écrit dans localStorage au format homeProjects,
  // et on recharge la page pour que l'init picke up les données.
  // Si le cache local est non vide, on ne fait rien (déjà hydraté ou cohérent).
  // ----------------------------------------------------------------------
  function _localShapeFromCloud(cloudRows) {
    var maxId = 0;
    var projects = cloudRows.map(function (row, idx) {
      var localId = idx + 1;
      if (localId > maxId) maxId = localId;
      // Slice 3 : on applique aussi le state JSONB du cloud aux clés localStorage __p<localId>.
      // Ça restaure les données BREEAM/HQE/etc. en même temps que les métadonnées.
      if (row.state && typeof row.state === 'object') {
        try { applyStateBlobToLocalStorage(localId, row.state); }
        catch (e) { console.warn('[Verdict.cloud] applyStateBlob échoué pour ' + row.id, e); }
      }
      return {
        id: localId,
        cloudId: row.id,
        name: row.name || ('Projet ' + localId),
        customName: !!row.custom_name,
        photo: row.photo || null,
        certs: Array.isArray(row.certs) ? row.certs : [],
        groupId: row.group_id || null
      };
    });
    return {
      v: 1,
      projects: projects,
      projectCounter: maxId,
      groupCounter: 0,
      homeLayout: 'line'
    };
  }

  async function _hydrateFromCloud() {
    // Si le cache local existe déjà, on est dans un état stable : pas de reload.
    var existing = null;
    try { existing = localStorage.getItem('verdictHomeProjects'); } catch (e) {}
    if (existing) return;
    var rows;
    try { rows = await listProjects(); }
    catch (err) { console.error('[Verdict.cloud] Hydratation échouée', err); return; }
    if (!rows || rows.length === 0) return; // rien à charger, home reste vide
    var snap = _localShapeFromCloud(rows);
    try { localStorage.setItem('verdictHomeProjects', JSON.stringify(snap)); } catch (e) {}
    // Reload : l'init lira le cache fraîchement écrit et affichera les projets.
    setTimeout(function () { location.reload(); }, 50);
  }

  // ----------------------------------------------------------------------
  // Refresh on tab focus (Slice 3.B)
  // ----------------------------------------------------------------------
  // Quand l'onglet redevient visible, on refetch la liste cloud et on
  // détecte les changements (autre device, autre onglet) :
  //   • Projet ajouté ailleurs → on l'ajoute en local
  //   • Projet supprimé ailleurs → on le retire en local
  //   • Sinon : no-op (les modifs de state se règlent à la prochaine ouverture)
  // Throttle 5s pour éviter de spammer si l'utilisateur switche frénétiquement.
  var _lastFocusSync = 0;
  async function refreshFromCloud(force) {
    if (!window.Verdict.auth.isLoggedIn()) return;
    if (!force && Date.now() - _lastFocusSync < 5000) return;
    _lastFocusSync = Date.now();
    var rows;
    try { rows = await listProjects(); } catch (e) { return; }
    if (!Array.isArray(rows)) return;
    // Compare les ensembles cloudIds
    var localSnap = null;
    try { localSnap = JSON.parse(localStorage.getItem('verdictHomeProjects') || 'null'); } catch (e) {}
    var localCloudIds = (localSnap && Array.isArray(localSnap.projects))
      ? localSnap.projects.filter(function(p) { return p.cloudId; }).map(function(p) { return p.cloudId; }).sort()
      : [];
    var cloudIds = rows.map(function(r) { return r.id; }).sort();
    var same = localCloudIds.length === cloudIds.length
      && localCloudIds.every(function(id, i) { return id === cloudIds[i]; });
    if (same) return; // liste identique → on ne touche à rien
    // Liste différente → on remplace le snapshot local et on recharge.
    var snap = _localShapeFromCloud(rows);
    try { localStorage.setItem('verdictHomeProjects', JSON.stringify(snap)); } catch (e) {}
    setSyncStatus('syncing', 'Mise à jour depuis un autre appareil…');
    setTimeout(function () { location.reload(); }, 100);
  }

  // Listener visibilitychange : déclenche le refresh quand l'onglet redevient visible.
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      refreshFromCloud();
    }
  });
  // Idem pour focus (parfois plus fiable que visibilitychange selon les navigateurs)
  window.addEventListener('focus', function () { refreshFromCloud(); });

  if (typeof window.Verdict.auth.onChange === 'function') {
    window.Verdict.auth.onChange(function (user) {
      if (user) {
        _wasLoggedIn = true;
        // Initialise les dots des boutons auth en vert (synced) sans afficher
        // le badge flottant. Une vraie sync activera l'animation orange.
        document.querySelectorAll('.cloud-auth-dot').forEach(function (d) {
          d.classList.remove('syncing', 'error');
          d.classList.add('synced');
          d.setAttribute('title', 'Synchronisé avec le cloud');
        });
        _hydrateFromCloud();
      } else if (_wasLoggedIn) {
        // L'utilisateur vient de se déconnecter : on vide le cache local
        // puis on recharge pour partir d'une page d'accueil vide.
        _wasLoggedIn = false;
        _clearLocalCache();
        setTimeout(function () { location.reload(); }, 200);
      }
    });
  }
})();
