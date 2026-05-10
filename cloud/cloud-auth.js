// =========================================================================
// VERDICT - Cloud auth module (Supabase)
// =========================================================================
// Phase 2 : connexion / inscription / lien magique / reset password.
// L'app reste fonctionnelle sans connexion (localStorage seul).
// La synchro cloud des projets viendra en Phase 4.
// =========================================================================
(function () {
  'use strict';

  const SUPABASE_URL = 'https://geyrmswoovaqcbovtplc.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdleXJtc3dvb3ZhcWNib3Z0cGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyNTkzNjcsImV4cCI6MjA5MzgzNTM2N30.KE648cOVDDu2uDZiRrd2G6cV6FQRW6wAfaPoFUVZ00k';

  if (!window.supabase || !window.supabase.createClient) {
    console.error('[Verdict.auth] Supabase SDK not loaded - check the <script> tag.');
    return;
  }

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  });

  let currentUser = null;
  const listeners = [];

  // ----------------------------------------------------------------------
  // Auth API
  // ----------------------------------------------------------------------
  async function init() {
    // IMPORTANT : on enregistre onAuthStateChange AVANT getSession()
    //  car getSession() parse le hash URL (#access_token=…&type=recovery)
    //  et déclenche immédiatement les events. Si le listener est posé
    //  après, on rate l'event PASSWORD_RECOVERY.
    client.auth.onAuthStateChange((event, session) => {
      currentUser = session ? session.user : null;
      notifyAll();
      // Recovery : Supabase déclenche cet event quand l'utilisateur
      //  clique le lien "reset password" dans son email. On ouvre
      //  automatiquement la modale avec le panneau "nouveau mot de passe".
      if (event === 'PASSWORD_RECOVERY') {
        _triggerNewPasswordModal();
      }
    });
    // Détection directe en fallback :
    //  - ?auth=recovery → marqueur explicite ajouté dans redirectTo de
    //    resetPasswordForEmail. Le plus fiable, fonctionne PKCE & implicit.
    //  - #type=recovery → flow implicit historique (sans PKCE).
    const urlBlob = (window.location.hash || '') + ' ' + (window.location.search || '');
    if (/[?&]auth=recovery\b/.test(urlBlob) || /[?&#]type=recovery\b/.test(urlBlob)) {
      _pendingRecovery = true;
    }
    const { data: { session } } = await client.auth.getSession();
    currentUser = session ? session.user : null;
    notifyAll();
    if (_pendingRecovery) _triggerNewPasswordModal();
  }
  let _pendingRecovery = false;
  function _triggerNewPasswordModal() {
    _pendingRecovery = false;
    var attempts = 0;
    (function tryOpen() {
      if (window.Verdict && window.Verdict.authUI && typeof window.Verdict.authUI.openNewPasswordModal === 'function') {
        try { window.Verdict.authUI.openNewPasswordModal(); } catch (e) {}
        return;
      }
      if (++attempts < 50) setTimeout(tryOpen, 100);
    })();
  }

  function getUser()   { return currentUser; }
  function getClient() { return client; }
  function isLoggedIn() { return !!currentUser; }

  function onChange(fn) {
    listeners.push(fn);
    try { fn(currentUser); } catch (e) { console.error(e); }
    return () => {
      const i = listeners.indexOf(fn);
      if (i >= 0) listeners.splice(i, 1);
    };
  }
  function notifyAll() {
    listeners.forEach(fn => { try { fn(currentUser); } catch (e) { console.error(e); } });
  }

  async function signUp(email, password, displayName) {
    const { data, error } = await client.auth.signUp({
      email, password,
      options: {
        data: { display_name: displayName || email.split('@')[0] },
        emailRedirectTo: window.location.origin + window.location.pathname
      }
    });
    if (error) throw error;
    return data;
  }
  async function signIn(email, password) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }
  async function signInMagic(email) {
    const { data, error } = await client.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + window.location.pathname }
    });
    if (error) throw error;
    return data;
  }
  async function resetPassword(email) {
    // Marqueur ?auth=recovery dans la redirectTo : on s'en sert dans
    //  init() pour distinguer un retour de reset password vs un login
    //  normal (la PKCE flow ne préserve pas type=recovery dans l'URL).
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname + '?auth=recovery'
    });
    if (error) throw error;
    return data;
  }
  async function updatePassword(newPassword) {
    const { data, error } = await client.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return data;
  }
  async function signOut() {
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  // ----------------------------------------------------------------------
  // UI controller
  // ----------------------------------------------------------------------
  const ui = {
    // -- Button menu (deux instances : sidebar + home) ------------------
    toggleMenu() {
      if (!isLoggedIn()) { ui.openModal(); return; }
      const menus = document.querySelectorAll('.cloud-auth-btn-wrap .cloud-auth-menu');
      // Bascule : si l'une au moins est ouverte, on ferme tout, sinon on ouvre celle dont le wrap est visible
      const anyOpen = Array.from(menus).some(m => m.style.display === 'block');
      menus.forEach(m => {
        if (anyOpen) { m.style.display = 'none'; return; }
        const wrap = m.closest('.cloud-auth-btn-wrap');
        const visible = wrap && getComputedStyle(wrap).display !== 'none';
        m.style.display = visible ? 'block' : 'none';
      });
    },
    closeMenu() {
      document.querySelectorAll('.cloud-auth-btn-wrap .cloud-auth-menu').forEach(m => m.style.display = 'none');
    },

    // -- Modal -----------------------------------------------------------
    openModal(tab) {
      const overlay = document.getElementById('cloudAuthModal');
      if (!overlay) return;
      overlay.style.display = 'flex';
      ui.switchTab(tab || 'signin');
      ui._clearMsg();
      setTimeout(() => {
        const f = overlay.querySelector('.cloud-auth-pane:not([style*="display:none"]):not([style*="display: none"]) input');
        if (f) f.focus();
      }, 50);
    },
    closeModal() {
      const overlay = document.getElementById('cloudAuthModal');
      if (overlay) overlay.style.display = 'none';
    },
    handleModalClick(e) {
      if (e.target && e.target.id === 'cloudAuthModal') ui.closeModal();
    },
    switchTab(tab) {
      ['signin', 'signup', 'magic', 'reset', 'newpwd'].forEach(t => {
        const pane = document.getElementById('cloudAuthPane_' + t);
        if (pane) pane.style.display = (t === tab) ? 'block' : 'none';
      });
      document.querySelectorAll('.cloud-auth-tab').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tab);
      });
      // Title
      const h = document.getElementById('cloudAuthModalTitle');
      if (h) {
        h.textContent = tab === 'signup' ? 'Créer un compte'
                      : tab === 'magic'  ? 'Lien magique'
                      : tab === 'reset'  ? 'Mot de passe oublié'
                      : tab === 'newpwd' ? 'Nouveau mot de passe'
                      :                    'Connexion';
      }
      // Tabs visibility : on cache la barre d'onglets sur les sub-flows
      //  reset (envoi du mail) et newpwd (saisie du nouveau mdp).
      const tabsEl = document.getElementById('cloudAuthTabs');
      if (tabsEl) tabsEl.style.display = (tab === 'reset' || tab === 'newpwd') ? 'none' : 'flex';
      ui._clearMsg();
    },
    showResetForm() { ui.switchTab('reset'); },
    openNewPasswordModal() {
      const overlay = document.getElementById('cloudAuthModal');
      if (!overlay) return;
      overlay.style.display = 'flex';
      ui.switchTab('newpwd');
      ui._clearMsg();
      setTimeout(() => {
        const f = document.getElementById('newPwd');
        if (f) f.focus();
      }, 80);
    },

    // -- Form submits ----------------------------------------------------
    async submitSignin(e) {
      e.preventDefault();
      const email = document.getElementById('signinEmail').value.trim();
      const pwd   = document.getElementById('signinPassword').value;
      ui._setBusy(true);
      try {
        await signIn(email, pwd);
        ui._showMsg('success', 'Connecté.');
        setTimeout(() => ui.closeModal(), 600);
      } catch (err) {
        ui._showMsg('error', ui._fmtErr(err));
      } finally { ui._setBusy(false); }
      return false;
    },
    async submitSignup(e) {
      e.preventDefault();
      const email = document.getElementById('signupEmail').value.trim();
      const pwd   = document.getElementById('signupPassword').value;
      const name  = document.getElementById('signupName').value.trim();
      if (pwd.length < 8) { ui._showMsg('error', 'Mot de passe trop court (min 8 caractères).'); return false; }
      ui._setBusy(true);
      try {
        await signUp(email, pwd, name);
        ui._showMsg('success', 'Compte créé. Vérifiez votre boîte mail pour confirmer votre adresse avant de vous connecter.');
      } catch (err) {
        ui._showMsg('error', ui._fmtErr(err));
      } finally { ui._setBusy(false); }
      return false;
    },
    async submitMagic(e) {
      e.preventDefault();
      const email = document.getElementById('magicEmail').value.trim();
      ui._setBusy(true);
      try {
        await signInMagic(email);
        ui._showMsg('success', 'Lien envoyé. Ouvrez votre email et cliquez sur le lien pour vous connecter.');
      } catch (err) {
        ui._showMsg('error', ui._fmtErr(err));
      } finally { ui._setBusy(false); }
      return false;
    },
    async submitReset(e) {
      e.preventDefault();
      const email = document.getElementById('resetEmail').value.trim();
      ui._setBusy(true);
      try {
        await resetPassword(email);
        ui._showMsg('success', 'Lien de réinitialisation envoyé. Consultez votre boîte mail.');
      } catch (err) {
        ui._showMsg('error', ui._fmtErr(err));
      } finally { ui._setBusy(false); }
      return false;
    },
    async submitNewPassword(e) {
      e.preventDefault();
      const pwd1 = document.getElementById('newPwd').value;
      const pwd2 = document.getElementById('newPwdConfirm').value;
      if (pwd1.length < 8) { ui._showMsg('error', 'Mot de passe trop court (min 8 caractères).'); return false; }
      if (pwd1 !== pwd2)   { ui._showMsg('error', 'Les deux mots de passe ne correspondent pas.'); return false; }
      ui._setBusy(true);
      try {
        await updatePassword(pwd1);
        ui._showMsg('success', 'Mot de passe mis à jour. Vous êtes maintenant connecté.');
        // Nettoie le hash de recovery dans l'URL pour éviter une
        //  réouverture de la modale sur un reload.
        if (window.history && history.replaceState) {
          try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (er) {}
        }
        setTimeout(() => { ui.closeModal(); ui.switchTab('signin'); }, 1200);
      } catch (err) {
        ui._showMsg('error', ui._fmtErr(err));
      } finally { ui._setBusy(false); }
      return false;
    },
    async signOut() {
      ui.closeMenu();
      try { await signOut(); }
      catch (err) { alert('Erreur de déconnexion : ' + ui._fmtErr(err)); }
    },

    // -- Helpers ---------------------------------------------------------
    _setBusy(busy) {
      document.querySelectorAll('#cloudAuthModal .cloud-auth-submit').forEach(b => {
        b.disabled = busy;
        if (busy) b.dataset._lbl = b.textContent, b.textContent = '…';
        else if (b.dataset._lbl) b.textContent = b.dataset._lbl;
      });
    },
    _showMsg(kind, text) {
      const el = document.getElementById('cloudAuthMsg');
      if (!el) return;
      el.className = 'cloud-auth-msg ' + kind;
      el.textContent = text;
    },
    _clearMsg() {
      const el = document.getElementById('cloudAuthMsg');
      if (el) { el.className = 'cloud-auth-msg'; el.textContent = ''; }
    },
    _fmtErr(err) {
      const m = (err && err.message) || String(err);
      // Petits messages plus clairs en FR (vouvoiement systématique)
      if (/Invalid login credentials/i.test(m))           return 'Email ou mot de passe incorrect.';
      if (/Email not confirmed/i.test(m))                  return 'Votre email n\'est pas encore confirmé. Cliquez sur le lien reçu par email.';
      if (/User already registered/i.test(m))              return 'Un compte existe déjà avec cet email. Connectez-vous.';
      if (/rate limit|too many requests/i.test(m))         return 'Trop de tentatives, veuillez réessayer dans quelques minutes.';
      if (/Password should be at least/i.test(m))          return 'Mot de passe trop court (min 8 caractères).';
      return m;
    },

    // -- Render the auth button label (toutes les instances) -------------
    _renderBtn(user) {
      const btns        = document.querySelectorAll('.cloud-auth-btn-wrap .cloud-auth-btn');
      const labels      = document.querySelectorAll('.cloud-auth-btn-wrap .cloud-auth-btn-label');
      const menuEmails  = document.querySelectorAll('.cloud-auth-btn-wrap .cloud-auth-menu-email');
      const cartoTitle  = document.getElementById('saCartoTitleText');
      if (user) {
        const display = (user.user_metadata && user.user_metadata.display_name) || user.email;
        btns.forEach(b => b.classList.add('connected'));
        labels.forEach(l => l.textContent = display);
        menuEmails.forEach(e => e.textContent = user.email);
        // Atelier cartographique : remplace "Cartographie interactive" par le nom + dot sync
        if (cartoTitle) {
          cartoTitle.innerHTML = '';
          cartoTitle.appendChild(document.createTextNode(display));
          const dot = document.createElement('span');
          dot.className = 'cloud-auth-dot cloud-auth-dot--inline synced';
          dot.setAttribute('title', 'Synchronisé avec le cloud');
          cartoTitle.appendChild(dot);
        }
      } else {
        btns.forEach(b => b.classList.remove('connected'));
        labels.forEach(l => l.textContent = 'Se connecter');
        if (cartoTitle) cartoTitle.textContent = 'Cartographie interactive';
        ui.closeMenu();
      }
    }
  };

  // Click outside any wrap closes the menu
  document.addEventListener('click', (e) => {
    const wraps = document.querySelectorAll('.cloud-auth-btn-wrap');
    let inside = false;
    wraps.forEach(w => { if (w.contains(e.target)) inside = true; });
    if (!inside) ui.closeMenu();
  });

  // Escape closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') ui.closeModal();
  });

  // ----------------------------------------------------------------------
  // Expose + boot
  // ----------------------------------------------------------------------
  window.Verdict = window.Verdict || {};
  window.Verdict.auth   = { init, signUp, signIn, signInMagic, signOut, resetPassword, updatePassword, getUser, getClient, isLoggedIn, onChange };
  window.Verdict.authUI = ui;

  function boot() {
    init().then(() => onChange(ui._renderBtn));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
