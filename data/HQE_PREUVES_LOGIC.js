// ============================================================
// HQE BD V4.1 — Onglet Preuves (Liste + Carte / mindmap)
// ============================================================
(function () {
  'use strict';

  function log(msg) {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[HQE Preuves]');
    try { console.log.apply(console, args); } catch(e){}
  }

  // Force explicit pixel heights (brute force — flex chain unreliable
  // because .hqe-main is overflow:auto, not display:flex).
  function applyExplicitHqeDimensions() {
    var hqeSec = document.getElementById('hqeEvidenceSection');
    if (!hqeSec) return;
    var h = Math.max(560, window.innerHeight - 200);
    var px = h + 'px';
    hqeSec.style.setProperty('display', 'flex', 'important');
    hqeSec.style.setProperty('flex-direction', 'column', 'important');
    hqeSec.style.setProperty('height', px, 'important');
    hqeSec.style.setProperty('min-height', '560px', 'important');
    hqeSec.style.setProperty('overflow', 'hidden', 'important');
    hqeSec.style.setProperty('padding', '0', 'important');
    hqeSec.style.setProperty('margin', '0', 'important');
    hqeSec.style.setProperty('background', 'white', 'important');
    hqeSec.style.setProperty('box-shadow', 'none', 'important');
    hqeSec.style.setProperty('border-radius', '0', 'important');

    var mc = hqeSec.querySelector('.mindmap-container');
    if (mc) {
      mc.style.setProperty('height', px, 'important');
      mc.style.setProperty('width', '100%', 'important');
      mc.style.setProperty('display', 'flex', 'important');
      mc.style.setProperty('flex-direction', 'row', 'important');
    }
    var sb = hqeSec.querySelector('.mindmap-sidebar');
    if (sb) {
      sb.style.setProperty('height', px, 'important');
    }
    var mm = hqeSec.querySelector('.mindmap-main');
    if (mm) {
      mm.style.setProperty('height', px, 'important');
      mm.style.setProperty('flex', '1 1 auto', 'important');
      mm.style.setProperty('min-width', '0', 'important');
      mm.style.setProperty('display', 'flex', 'important');
      mm.style.setProperty('flex-direction', 'column', 'important');
      mm.style.setProperty('position', 'relative', 'important');
    }
    var cw = hqeSec.querySelector('.mm-canvas-wrap');
    if (cw) {
      cw.style.setProperty('flex', '1 1 auto', 'important');
      cw.style.setProperty('min-height', '0', 'important');
      cw.style.setProperty('width', '100%', 'important');
    }
    var lv = hqeSec.querySelector('#mmListView');
    if (lv) {
      lv.style.setProperty('flex', '1 1 auto', 'important');
      lv.style.setProperty('min-height', '0', 'important');
      lv.style.setProperty('overflow', 'auto', 'important');
    }
    log('Dimensions applied — h=' + px,
        'hqeSec=' + hqeSec.offsetWidth + 'x' + hqeSec.offsetHeight,
        'mm=' + (mm ? mm.offsetWidth + 'x' + mm.offsetHeight : 'NULL'),
        'cw=' + (cw ? cw.offsetWidth + 'x' + cw.offsetHeight : 'NULL'));
  }

  function clearHqeDimensions() {
    var hqeSec = document.getElementById('hqeEvidenceSection');
    if (!hqeSec) return;
    [hqeSec, hqeSec.querySelector('.mindmap-container'),
     hqeSec.querySelector('.mindmap-sidebar'),
     hqeSec.querySelector('.mindmap-main'),
     hqeSec.querySelector('.mm-canvas-wrap'),
     hqeSec.querySelector('#mmListView')
    ].forEach(function(el) {
      if (!el) return;
      ['display','flex-direction','height','min-height','overflow','padding',
       'margin','background','box-shadow','border-radius','width','flex',
       'min-width','position'].forEach(function(p){ el.style.removeProperty(p); });
    });
  }

  // Le RFO a un élément avec les classes "mm-canvas-wrap rfo-mm-canvas-wrap".
  // Si on déplace le BREEAM mindmap-container dans hqeEvidenceSection (DOM
  // plus loin), document.querySelector('.mm-canvas-wrap') retourne le RFO
  // (premier dans l'ordre DOM, et caché → 0×0). On retire temporairement
  // la classe ambigüe du RFO pendant la session HQE Preuves.
  function stashRfoCanvasWrapClass() {
    var rfoCw = document.querySelector('.rfo-mm-canvas-wrap');
    if (rfoCw && rfoCw.classList.contains('mm-canvas-wrap')) {
      rfoCw.classList.remove('mm-canvas-wrap');
      rfoCw.dataset.hqeStashed = '1';
    }
  }
  function restoreRfoCanvasWrapClass() {
    var rfoCw = document.querySelector('.rfo-mm-canvas-wrap');
    if (rfoCw && rfoCw.dataset.hqeStashed === '1') {
      rfoCw.classList.add('mm-canvas-wrap');
      delete rfoCw.dataset.hqeStashed;
    }
  }

  var HQE_PREUVES_CATEGORIES = [
    {
      code: 'QDV', name: 'QUALITÉ DE VIE',
      credits: [
        { code: 'QAIR', name: "Qualité de l'air intérieur" },
        { code: 'QEAU', name: "Qualité de l'eau" },
        { code: 'ONDE', name: 'Ondes électromagnétiques' },
        { code: 'HYGR', name: 'Confort hygrothermique' },
        { code: 'ACOU', name: 'Confort acoustique' },
        { code: 'VISU', name: 'Confort visuel' },
        { code: 'ACES', name: 'Accessibilité & services' },
        { code: 'TRAN', name: 'Mobilité & transports' },
        { code: 'SERV', name: 'Services aux occupants' }
      ]
    },
    {
      code: 'ENV', name: "RESPECT DE L'ENVIRONNEMENT",
      credits: [
        { code: 'ENER', name: 'Énergie' }, { code: 'EAU',  name: 'Eau' },
        { code: 'DECH', name: 'Déchets' }, { code: 'CARB', name: 'Carbone' },
        { code: 'ACCL', name: 'Adaptation au changement climatique' },
        { code: 'ACV',  name: 'Analyse de cycle de vie' }, { code: 'BIOD', name: 'Biodiversité' }
      ]
    },
    {
      code: 'ECO', name: 'PERFORMANCE ÉCONOMIQUE',
      credits: [{ code: 'COUT', name: 'Coût global' }, { code: 'DEVT', name: 'Développement territorial' }]
    },
    {
      code: 'SMR', name: 'MANAGEMENT RESPONSABLE',
      credits: [
        { code: 'ADAP', name: 'Adaptabilité' }, { code: 'CHAN', name: 'Chantier responsable' },
        { code: 'COMM', name: 'Commissionnement' }, { code: 'GD', name: 'Gestion durable / exploitation' }
      ]
    }
  ];
  window.HQE_PREUVES_CATEGORIES = HQE_PREUVES_CATEGORIES;

  function initHqePreuves() {
    var hasMm, hasED, hasHQED, hasPD;
    try { hasMm  = (typeof mmRenderSidebar === 'function'); } catch (e) { hasMm = false; }
    try { hasED  = (typeof EVIDENCE_DOCS !== 'undefined'); } catch (e) { hasED = false; }
    try { hasHQED= (typeof HQE_EVIDENCE_DOCS !== 'undefined'); } catch (e) { hasHQED = false; }
    try { hasPD  = (typeof projectData !== 'undefined'); } catch (e) { hasPD = false; }
    if (!hasMm || !hasED || !hasHQED || !hasPD) {
      return setTimeout(initHqePreuves, 50);
    }

    log('init OK');

    Object.keys(HQE_EVIDENCE_DOCS).forEach(function (k) {
      if (!EVIDENCE_DOCS[k]) {
        EVIDENCE_DOCS[k] = HQE_EVIDENCE_DOCS[k];
      }
    });
    log('EVIDENCE_DOCS keys after merge', Object.keys(EVIDENCE_DOCS).length);

    if (!projectData.credits) projectData.credits = {};

    var origRenderSidebar = window.mmRenderSidebar || mmRenderSidebar;
    window.mmRenderSidebar = function () {
      if (window._mm && window._mm.isHqe) return hqeRenderSidebar();
      return origRenderSidebar.apply(this, arguments);
    };

    var origSelectCredit = window.mmSelectCredit || mmSelectCredit;
    window.mmSelectCredit = function (code) {
      if (window._mm && window._mm.isHqe) {
        log('mmSelectCredit HQE', code);
        return hqeSelectCredit(code);
      }
      return origSelectCredit.apply(this, arguments);
    };

    var origBuildMap = window.mmBuildMap || (typeof mmBuildMap === 'function' ? mmBuildMap : null);
    if (typeof origBuildMap === 'function') {
      window.mmBuildMap = function (code) {
        if (window._mm && window._mm.isHqe) {
          var wrap = document.querySelector('.mm-canvas-wrap');
          var docs = EVIDENCE_DOCS[code];
          log('mmBuildMap', code,
            'docs=' + (docs ? docs.length : 'undef'),
            'wrap=' + (wrap ? wrap.offsetWidth + 'x' + wrap.offsetHeight : 'NULL'),
            'wrapDisplay=' + (wrap ? getComputedStyle(wrap).display : 'NULL'));
        }
        return origBuildMap.apply(this, arguments);
      };
    }

    var origSwitchSubView = window.mmSwitchSubView || (typeof mmSwitchSubView === 'function' ? mmSwitchSubView : null);
    if (typeof origSwitchSubView === 'function') {
      window.mmSwitchSubView = function (view, btn) {
        var ret = origSwitchSubView.apply(this, arguments);
        if (window._mm && window._mm.isHqe) {
          // Re-apply dimensions because layout may have changed
          applyExplicitHqeDimensions();
          if (view === 'carte' && window._mm.credit) {
            setTimeout(function () {
              log('Retry mmBuildMap after carte switch');
              if (typeof window.mmBuildMap === 'function') window.mmBuildMap(window._mm.credit);
            }, 100);
          }
        }
        return ret;
      };
    }

    var origHqeSwitchView = window.hqeSwitchView || (typeof hqeSwitchView === 'function' ? hqeSwitchView : null);
    if (typeof origHqeSwitchView === 'function') {
      window.hqeSwitchView = function (view) {
        if (view !== 'evidence') {
          clearHqeDimensions();
          restoreRfoCanvasWrapClass();
          if (window._mm) window._mm.isHqe = false;
        }
        return origHqeSwitchView.apply(this, arguments);
      };
    }

    var origNcSwitchView = window.ncSwitchView || (typeof ncSwitchView === 'function' ? ncSwitchView : null);
    if (typeof origNcSwitchView === 'function') {
      window.ncSwitchView = function (view) {
        if (view === 'evidence') {
          var mc = document.querySelector('#hqeEvidenceSection .mindmap-container');
          var ncSec = document.getElementById('ncEvidenceSection');
          if (mc && ncSec && mc.parentNode !== ncSec) {
            ncSec.appendChild(mc);
          }
          clearHqeDimensions();
          restoreRfoCanvasWrapClass();
          if (window._mm) window._mm.isHqe = false;
          var si = document.getElementById('mmSearchInput');
          if (si) si.placeholder = 'Rechercher un credit...';
          var le = document.getElementById('mmListEmpty');
          if (le) le.textContent = "Selectionnez un credit pour afficher l'arborescence des preuves";
          var em = document.getElementById('mmEmpty');
          if (em) {
            var emTxt = em.querySelector('.mm-empty-text');
            if (emTxt) emTxt.textContent = 'Selectionnez un credit pour afficher la carte des preuves';
          }
        }
        return origNcSwitchView.apply(this, arguments);
      };
    }
  }

  function hqeRenderSidebar() {
    var c = document.getElementById('mmSidebarContent');
    if (!c) return;
    c.innerHTML = '';
    HQE_PREUVES_CATEGORIES.forEach(function (cat) {
      var validCredits = cat.credits.filter(function (cr) {
        return EVIDENCE_DOCS[cr.code] && EVIDENCE_DOCS[cr.code].length > 0;
      });
      if (validCredits.length === 0) return;
      var grp = document.createElement('div'); grp.className = 'mm-cat-group';
      var hdr = document.createElement('div'); hdr.className = 'mm-cat-header expanded';
      hdr.innerHTML = '<span>' + cat.name + '<span class="mm-cat-count">(' + validCredits.length + ')</span></span><span class="mm-arrow">&#8250;</span>';
      var lst = document.createElement('div'); lst.className = 'mm-credits-list show';
      hdr.onclick = function () { hdr.classList.toggle('expanded'); lst.classList.toggle('show'); };
      validCredits.forEach(function (cr) {
        if (!projectData.credits[cr.code]) projectData.credits[cr.code] = {};
        var cd = projectData.credits[cr.code];
        var docs = EVIDENCE_DOCS[cr.code] || [];
        var segs = '';
        docs.forEach(function (doc, idx) {
          var dk = (doc.phase || 'Autre') + '_' + idx;
          var ds = (cd.docStatus || {})[dk];
          var st = ds ? ds.status : 'a_fournir';
          var cls = 'mm-seg ';
          if (st === 'fourni' || st === 'validated' || st === 'done') cls += 'mm-seg-v';
          else if (st === 'in_progress' || st === 'pending' || st === 'en_cours') cls += 'mm-seg-p';
          else if (st === 'non_conforming' || st === 'issue') cls += 'mm-seg-nc';
          else cls += 'mm-seg-ns';
          segs += '<span class="' + cls + '"></span>';
        });
        var itm = document.createElement('div');
        itm.className = 'mm-credit-item';
        itm.dataset.code = cr.code;
        itm.dataset.search = (cr.code + ' ' + cr.name).toLowerCase();
        itm.innerHTML =
          '<span class="mm-credit-code">' + cr.code + '</span>' +
          '<span class="mm-credit-name">' + escapeHtml(cr.name) + '</span>' +
          '<span class="mm-credit-segs">' + segs + '</span>';
        itm.onclick = function (e) { e.stopPropagation(); window.mmSelectCredit(cr.code); };
        lst.appendChild(itm);
      });
      grp.appendChild(hdr); grp.appendChild(lst); c.appendChild(grp);
    });
  }

  function hqeSelectCredit(code) {
    if (!window._mm) window._mm = {};
    window._mm.credit = code;
    document.querySelectorAll('.mm-credit-item').forEach(function (el) {
      el.classList.toggle('active', el.dataset.code === code);
    });
    var crDef = null;
    HQE_PREUVES_CATEGORIES.forEach(function (cat) {
      cat.credits.forEach(function (cr) { if (cr.code === code) crDef = cr; });
    });
    if (!crDef) return;
    var mmTitleEl = document.getElementById('mmTitle');
    if (mmTitleEl) mmTitleEl.textContent = code + ' — ' + crDef.name;
    var mmLegendEl = document.getElementById('mmLegend');
    if (mmLegendEl) mmLegendEl.style.display = 'flex';
    var emptyEl = document.getElementById('mmEmpty');
    if (emptyEl) emptyEl.style.display = 'none';

    // Re-apply dimensions before mmBuildMap (in case anything reset them)
    applyExplicitHqeDimensions();

    if (typeof window.mmBuildMap === 'function') window.mmBuildMap(code);
    var listView = document.getElementById('mmListView');
    if (listView && listView.classList.contains('active')) {
      if (typeof window.mmBuildListView === 'function') window.mmBuildListView(code);
    }
  }

  window.hqeOpenEvidenceView = function () {
    if (!window._mm) window._mm = {};
    window._mm.isHqe = true;
    stashRfoCanvasWrapClass();

    var mc = document.querySelector('#ncEvidenceSection .mindmap-container');
    if (!mc) {
      mc = document.querySelector('#hqeEvidenceSection .mindmap-container');
    }
    var hqeSec = document.getElementById('hqeEvidenceSection');
    if (mc && hqeSec && mc.parentNode !== hqeSec) {
      hqeSec.appendChild(mc);
    }

    applyExplicitHqeDimensions();

    var toolbar = document.querySelector('.mm-toolbar-btns');
    if (toolbar) toolbar.style.display = '';
    var searchInput = document.getElementById('mmSearchInput');
    if (searchInput) searchInput.placeholder = 'Rechercher un thème...';
    var listEmpty = document.getElementById('mmListEmpty');
    if (listEmpty) listEmpty.textContent = "Sélectionnez un thème pour afficher l'arborescence des preuves";
    var em = document.getElementById('mmEmpty');
    if (em) {
      var emTxt = em.querySelector('.mm-empty-text');
      if (emTxt) emTxt.textContent = 'Sélectionnez un thème pour afficher la carte des preuves';
    }

    window._mm.credit = null;
    var treeEl = document.getElementById('mmListTree');
    if (treeEl) treeEl.innerHTML = '';
    var headerEl = document.getElementById('mmListHeader');
    if (headerEl) headerEl.style.display = 'none';
    if (listEmpty) listEmpty.style.display = 'block';
    var nodes = document.getElementById('mmNodes');
    if (nodes) nodes.innerHTML = '';
    var svg = document.getElementById('mmSvg');
    if (svg) svg.innerHTML = '';
    if (em) em.style.display = '';

    if (typeof window.mmRenderSidebar === 'function') window.mmRenderSidebar();
  };

  function escapeHtml(t) {
    return (t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHqePreuves);
  } else {
    initHqePreuves();
  }
})();
