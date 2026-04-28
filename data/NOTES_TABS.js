// ============================================================
// extNotePanel — Onglets "Général" + "Critères"
// Patche openExtNote/saveExtNote pour ajouter un système d'onglets.
// Le tableau Critères est pré-rempli avec les critères du crédit
// (CREDIT_DETAILS[code]) en col 1, col 2 éditable. Les deux colonnes
// sont editables (Excel-like). Sauvegarde dans localStorage à côté
// des notes existantes. Poignée de resize entre les colonnes.
// ============================================================
(function () {
  'use strict';

  function log() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[ExtNoteTabs]');
    try { console.log.apply(console, args); } catch(e){}
  }

  function escapeHtml(t) {
    return (t || '').toString()
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  var CRIT_STORE_KEY = 'breeam-ext-criteria';
  var WIDTH_STORE_KEY = 'breeam-ext-criteria-col-width';
  function loadCritAll() {
    try { return JSON.parse(localStorage.getItem(CRIT_STORE_KEY) || '{}'); }
    catch(e) { return {}; }
  }
  function saveCritAll(d) {
    try { localStorage.setItem(CRIT_STORE_KEY, JSON.stringify(d)); } catch(e) {}
  }
  function loadColWidth() {
    var v = parseFloat(localStorage.getItem(WIDTH_STORE_KEY));
    return (isFinite(v) && v >= 15 && v <= 85) ? v : 55;
  }
  function saveColWidth(pct) {
    try { localStorage.setItem(WIDTH_STORE_KEY, String(pct)); } catch(e) {}
  }

  function injectCss() {
    if (document.getElementById('ext-note-tabs-css')) return;
    var st = document.createElement('style');
    st.id = 'ext-note-tabs-css';
    st.textContent =
      '#extNotePanel{width:680px !important;max-width:96vw !important;}' +
      '#extNotePanel .ext-body{display:flex;flex-direction:column;padding:16px 20px !important;overflow:hidden;}' +
      '.entt-tabbar{display:flex;gap:0;border-bottom:2px solid #0D9488;margin:0 0 12px 0;flex-shrink:0;}' +
      '.entt-tab{padding:8px 18px;border:1px solid #E2E8F0;border-bottom:none;background:#F8FAFC;color:#64748B;cursor:pointer;font-size:13px;font-weight:600;border-radius:6px 6px 0 0;margin-right:-1px;font-family:inherit;}' +
      '.entt-tab.active{background:#0D9488;color:#fff;border-color:#0D9488;position:relative;z-index:1;}' +
      '.entt-tab:hover:not(.active){background:#F1F5F9;color:#0D9488;}' +
      '.entt-panel{display:none;flex-direction:column;flex:1;min-height:0;}' +
      '.entt-panel.active{display:flex;}' +
      '.entt-panel textarea{flex:1;min-height:280px;width:100%;border:1px solid #E2E8F0;border-radius:8px;padding:12px;font-size:13px;font-family:inherit;color:#334155;resize:vertical;outline:none;box-sizing:border-box;line-height:1.5;}' +
      '.entt-panel textarea:focus{border-color:#0D9488;box-shadow:0 0 0 2px rgba(13,148,136,.15);}' +
      '.entt-crit-wrap{flex:1;overflow:auto;border:1px solid #CBD5E1;border-radius:6px;position:relative;}' +
      '.entt-crit-table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:12.5px;}' +
      '.entt-crit-table td{border:1px solid #CBD5E1;padding:6px 8px;vertical-align:top;line-height:1.4;word-wrap:break-word;overflow-wrap:break-word;word-break:break-word;white-space:normal;}' +
      '.entt-crit-table td.entt-crit-header{background:#0D9488;color:white;font-weight:700;padding:8px 10px;font-size:12px;text-transform:uppercase;letter-spacing:.3px;}' +
      '.entt-crit-table td.entt-crit-num{background:#F8FAFC;color:#334155;}' +
      '.entt-crit-table td.entt-crit-num.entt-crit-sub{padding-left:24px;background:#FAFBFC;}' +
      '.entt-crit-table td.entt-crit-val{background:white;color:#1E293B;}' +
      '.entt-crit-table td:focus{outline:2px solid #0D9488;outline-offset:-2px;background:#F0FDF4;}' +
      '.entt-crit-table .entt-crit-num b{color:#0D9488;font-size:13px;}' +
      '.entt-add-row{margin-top:8px;padding:6px 12px;background:#fff;border:1px dashed #0D9488;color:#0D9488;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;align-self:flex-start;}' +
      '.entt-add-row:hover{background:#F0FDF4;}' +
      // Resizer styles
      '.entt-col-resizer{position:absolute;top:0;width:11px;cursor:col-resize;z-index:5;background:transparent;transform:translateX(-5px);display:flex;justify-content:center;}' +
      '.entt-col-resizer::before{content:"";width:2px;height:100%;background:transparent;transition:background .15s;}' +
      '.entt-col-resizer:hover::before,.entt-col-resizer.dragging::before{background:#0D9488;}' +
      'body.entt-resizing,body.entt-resizing *{cursor:col-resize !important;user-select:none !important;}' +
      '.lang-bar-note-btn{margin-left:auto;display:inline-flex;align-items:center;gap:6px;padding:5px 11px;background:#fff;border:1px solid #E2E8F0;color:#64748B;border-radius:16px;cursor:pointer;font-size:12px;font-weight:600;transition:all .15s;}' +
      '.lang-bar-note-btn:hover{border-color:#0D9488;color:#0D9488;background:#F0FDF4;}' +
      '.lang-bar-note-btn.has-note{border-color:#EC4899;color:#BE185D;background:#FCE7F3;}' +
      '.lang-bar-note-btn.has-note:hover{background:#FBCFE8;}' +
      '.lang-bar-note-btn svg{width:14px;height:14px;}' +
      '.lang-toggle-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}' +
      '.entt-ribbon{display:none;flex-wrap:wrap;align-items:center;gap:4px;padding:6px 8px;margin:0 0 8px 0;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;}' +
      '.entt-ribbon.show{display:flex;}' +
      '.entt-rb-btn{min-width:28px;height:28px;padding:0 7px;background:#fff;border:1px solid #CBD5E1;border-radius:4px;cursor:pointer;font-size:13px;color:#334155;display:inline-flex;align-items:center;justify-content:center;transition:all .12s;font-family:inherit;}' +
      '.entt-rb-btn:hover{background:#F0FDF4;border-color:#0D9488;color:#0D9488;}' +
      '.entt-rb-btn.active{background:#0D9488;color:#fff;border-color:#0D9488;}' +
      '.entt-rb-select{height:28px;padding:0 6px;border:1px solid #CBD5E1;border-radius:4px;background:#fff;font-size:12px;color:#334155;cursor:pointer;font-family:inherit;}' +
      '.entt-rb-color{position:relative;width:30px;height:28px;display:inline-flex;align-items:center;justify-content:center;border:1px solid #CBD5E1;border-radius:4px;background:#fff;cursor:pointer;font-weight:700;font-size:13px;}' +
      '.entt-rb-color:hover{border-color:#0D9488;}' +
      '.entt-rb-color input[type=color]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}' +
      '.entt-rb-color .entt-rb-color-swatch{position:absolute;bottom:2px;left:2px;right:2px;height:3px;border-radius:1px;pointer-events:none;}' +
      '.entt-rb-sep{width:1px;height:20px;background:#CBD5E1;margin:0 4px;}';
    document.head.appendChild(st);
  }


  // Last-focused contenteditable (so toolbar clicks operate on it)
  var _enttLastEditable = null;
  var _enttSavedRange = null;
  function captureSelection() {
    var sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    var r = sel.getRangeAt(0);
    var node = r.commonAncestorContainer;
    var el = node.nodeType === 1 ? node : node.parentElement;
    while (el && el.contentEditable !== 'true') el = el.parentElement;
    if (el) {
      _enttLastEditable = el;
      _enttSavedRange = r.cloneRange();
    }
  }
  function restoreSelection() {
    if (!_enttSavedRange) return false;
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(_enttSavedRange);
    return true;
  }
  function execEdit(cmd, value) {
    if (_enttLastEditable) _enttLastEditable.focus();
    restoreSelection();
    try { document.execCommand(cmd, false, value || null); } catch(e){}
    captureSelection();
  }

  function buildRibbon() {
    var bar = document.createElement('div');
    bar.className = 'entt-ribbon';

    var fontSel = document.createElement('select');
    fontSel.className = 'entt-rb-select';
    fontSel.title = 'Police';
    [
      ['', 'Police'], ['Inter', 'Inter'], ['Arial', 'Arial'],
      ['Georgia', 'Georgia'], ["'Times New Roman'", 'Times'],
      ['Verdana', 'Verdana'], ["'Courier New'", 'Courier'],
      ['Tahoma', 'Tahoma'], ['"Trebuchet MS"', 'Trebuchet']
    ].forEach(function(p){ var o=document.createElement('option'); o.value=p[0]; o.textContent=p[1]; fontSel.appendChild(o); });
    fontSel.onmousedown = function(){ captureSelection(); };
    fontSel.onchange = function(){ if(fontSel.value) execEdit('fontName', fontSel.value); };
    bar.appendChild(fontSel);

    var sizeSel = document.createElement('select');
    sizeSel.className = 'entt-rb-select';
    sizeSel.title = 'Taille';
    [['','Taille'],['1','8'],['2','10'],['3','12'],['4','14'],['5','18'],['6','24'],['7','36']].forEach(function(p){
      var o=document.createElement('option'); o.value=p[0]; o.textContent=p[1]; sizeSel.appendChild(o);
    });
    sizeSel.onmousedown = function(){ captureSelection(); };
    sizeSel.onchange = function(){ if(sizeSel.value) execEdit('fontSize', sizeSel.value); };
    bar.appendChild(sizeSel);

    function sep(){ var s=document.createElement('span'); s.className='entt-rb-sep'; bar.appendChild(s); }
    sep();

    function btn(label, title, cmd, html) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'entt-rb-btn';
      b.title = title;
      b.innerHTML = html || label;
      b.onmousedown = function(e){ e.preventDefault(); };
      b.onclick = function(){ execEdit(cmd); };
      bar.appendChild(b);
      return b;
    }
    btn('B', 'Gras (Ctrl+B)', 'bold', '<b>B</b>');
    btn('I', 'Italique (Ctrl+I)', 'italic', '<i>I</i>');
    btn('U', 'Souligné (Ctrl+U)', 'underline', '<u>U</u>');
    btn('S', 'Barré', 'strikeThrough', '<s>S</s>');

    sep();

    function colorBtn(title, cmd, defaultColor) {
      var label = document.createElement('label');
      label.className = 'entt-rb-color';
      label.title = title;
      var letter = document.createElement('span');
      letter.textContent = 'A';
      label.appendChild(letter);
      var swatch = document.createElement('span');
      swatch.className = 'entt-rb-color-swatch';
      swatch.style.background = defaultColor;
      label.appendChild(swatch);
      var input = document.createElement('input');
      input.type = 'color';
      input.value = defaultColor;
      input.onmousedown = function(){ captureSelection(); };
      input.onchange = function(){
        swatch.style.background = input.value;
        execEdit(cmd, input.value);
      };
      label.appendChild(input);
      bar.appendChild(label);
      return label;
    }
    colorBtn('Couleur du texte', 'foreColor', '#0D9488');
    var hl = colorBtn('Surlignage', 'hiliteColor', '#FEF08A');
    hl.querySelector('span').textContent = 'H';

    sep();
    btn('⫷', 'Aligner à gauche', 'justifyLeft');
    btn('≡', 'Centrer', 'justifyCenter');
    btn('⫸', 'Aligner à droite', 'justifyRight');

    sep();
    btn('•', 'Liste à puces', 'insertUnorderedList');
    btn('1.', 'Liste numérotée', 'insertOrderedList');
    btn('⌫', 'Effacer la mise en forme', 'removeFormat');

    return bar;
  }

  function ensureTabsStructure() {
    var body = document.querySelector('#extNotePanel .ext-body');
    if (!body) return null;
    if (body.querySelector('.entt-tabbar')) return body;

    var existingTextarea = body.querySelector('#extNoteTextarea');

    var tabbar = document.createElement('div');
    tabbar.className = 'entt-tabbar';
    var tabGen = document.createElement('button');
    tabGen.type = 'button';
    tabGen.className = 'entt-tab active';
    tabGen.dataset.tab = 'gen';
    tabGen.textContent = 'Général';
    var tabCrit = document.createElement('button');
    tabCrit.type = 'button';
    tabCrit.className = 'entt-tab';
    tabCrit.dataset.tab = 'crit';
    tabCrit.textContent = 'Critères';
    tabbar.appendChild(tabGen);
    tabbar.appendChild(tabCrit);

    var panelGen = document.createElement('div');
    panelGen.className = 'entt-panel active';
    panelGen.dataset.tab = 'gen';
    if (existingTextarea) {
      panelGen.appendChild(existingTextarea);
    } else {
      var ta = document.createElement('textarea');
      ta.id = 'extNoteTextarea';
      ta.placeholder = 'Vos notes détaillées (rappels, références, justifications, contacts…)';
      panelGen.appendChild(ta);
    }

    var panelCrit = document.createElement('div');
    panelCrit.className = 'entt-panel';
    panelCrit.dataset.tab = 'crit';
    panelCrit.addEventListener('focusin', captureSelection);
    panelCrit.addEventListener('keyup', captureSelection);
    panelCrit.addEventListener('mouseup', captureSelection);
    var critWrap = document.createElement('div');
    critWrap.className = 'entt-crit-wrap';
    critWrap.id = 'enttCritWrap';
    panelCrit.appendChild(critWrap);
    var addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'entt-add-row';
    addBtn.textContent = '+ Ajouter une ligne';
    addBtn.onclick = function() {
      var table = critWrap.querySelector('table');
      if (!table) return;
      var tr = document.createElement('tr');
      var td1 = document.createElement('td');
      td1.className = 'entt-crit-num';
      td1.contentEditable = 'true';
      var td2 = document.createElement('td');
      td2.className = 'entt-crit-val';
      td2.contentEditable = 'true';
      tr.appendChild(td1); tr.appendChild(td2);
      table.appendChild(tr);
      td1.focus();
    };
    panelCrit.appendChild(addBtn);

    var ribbon = buildRibbon();

    body.innerHTML = '';
    body.appendChild(tabbar);
    body.appendChild(ribbon);
    body.appendChild(panelGen);
    body.appendChild(panelCrit);

    function syncRibbonVisibility() {
      var critActive = !!body.querySelector('.entt-panel.active[data-tab="crit"]');
      var rb = body.querySelector('.entt-ribbon');
      if (rb) rb.classList.toggle('show', critActive);
    }
    tabbar.addEventListener('click', function(e) {
      var btn = e.target.closest('.entt-tab');
      if (!btn) return;
      var tab = btn.dataset.tab;
      tabbar.querySelectorAll('.entt-tab').forEach(function(t){ t.classList.toggle('active', t === btn); });
      body.querySelectorAll('.entt-panel').forEach(function(p){ p.classList.toggle('active', p.dataset.tab === tab); });
      syncRibbonVisibility();
    });
    return body;
  }

  function extractCreditCode(key, title) {
    var candidates = [];
    if (key) candidates.push(String(key));
    if (title) candidates.push(String(title));
    var re = /\b([A-Z][a-z]{2,3}\d{1,2}|SMR[1-6]|QAIR|QEAU|ONDE|HYGR|ACOU|VISU|ACES|TRAN|SERV|ENER|EAU|DECH|CARB|ACCL|ACV|BIOD|COUT|DEVT|ADAP|CHAN|COMM|GD)\b/;
    for (var i = 0; i < candidates.length; i++) {
      var m = candidates[i].match(re);
      if (m) return m[1];
    }
    return null;
  }

  function setupResizer(wrap, col1, col2) {
    var resizer = wrap.querySelector('.entt-col-resizer');
    if (!resizer) {
      resizer = document.createElement('div');
      resizer.className = 'entt-col-resizer';
      wrap.appendChild(resizer);
    }

    function reposition() {
      var table = wrap.querySelector('.entt-crit-table');
      if (!table || !col1) return;
      // Make the resizer span the full table height (not just viewport)
      resizer.style.height = (table.offsetHeight || wrap.offsetHeight) + 'px';
      // Get the right edge of column 1 by reading the colgroup or first row's first cell
      var firstNum = table.querySelector('tr > td.entt-crit-num');
      var firstHeader = table.querySelector('tr > td.entt-crit-header');
      var refCell = firstNum;
      if (!refCell) {
        // No numbered row, fallback to using col1 percent of table width
        var tableRect = table.getBoundingClientRect();
        var wrapRect = wrap.getBoundingClientRect();
        var pct = parseFloat(col1.style.width) || 55;
        resizer.style.left = (tableRect.left - wrapRect.left + tableRect.width * pct / 100) + 'px';
        return;
      }
      var rect = refCell.getBoundingClientRect();
      var wrapRect = wrap.getBoundingClientRect();
      resizer.style.left = (rect.right - wrapRect.left + wrap.scrollLeft) + 'px';
    }

    // Reposition on scroll, resize observer on wrap
    wrap.addEventListener('scroll', reposition);
    if (window.ResizeObserver) {
      try {
        var ro = new ResizeObserver(reposition);
        ro.observe(wrap);
      } catch(e){}
    }
    window.addEventListener('resize', reposition);

    // Initial position after layout
    requestAnimationFrame(reposition);
    setTimeout(reposition, 50);

    // Drag logic
    resizer.onmousedown = function(e) {
      e.preventDefault();
      e.stopPropagation();
      var table = wrap.querySelector('.entt-crit-table');
      if (!table) return;
      var tableRect = table.getBoundingClientRect();
      var startX = e.clientX;
      var startWidthPct = parseFloat(col1.style.width) || 55;
      resizer.classList.add('dragging');
      document.body.classList.add('entt-resizing');

      function onMove(ev) {
        var dx = ev.clientX - startX;
        var newPct = startWidthPct + (dx / tableRect.width) * 100;
        newPct = Math.max(15, Math.min(85, newPct));
        col1.style.width = newPct + '%';
        col2.style.width = (100 - newPct) + '%';
        reposition();
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        resizer.classList.remove('dragging');
        document.body.classList.remove('entt-resizing');
        var finalPct = parseFloat(col1.style.width) || 55;
        saveColWidth(finalPct);
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    };

    return reposition;
  }


  // For HQE theme codes (QAIR, QEAU, ONDE, etc.), pull rows from QD
  // (the global HQE Qualités/Démarche dictionary). Keys are hierarchical:
  //   QAIR              — theme
  //   QAIR1             — sub-theme (intro/context)
  //   QAIR1.1           — group (intro/context)
  //   QAIR1.1.1         — criterion (attendu/definition/preuve)
  //   QAIR1.1.1.a       — sub-criterion (attendu)
  // We render headers for sub-themes/groups and rows for the rest.
  function buildHqeCriteriaRows(themeCode) {
    if (typeof QD === 'undefined' || !QD || !themeCode) return null;
    var prefix = themeCode;
    // Collect matching keys
    var keys = [];
    for (var k in QD) {
      if (Object.prototype.hasOwnProperty.call(QD, k) &&
          (k === prefix || k.indexOf(prefix + '1') === 0 ||
           k.indexOf(prefix) === 0 && (k.length === prefix.length || /[\d.]/.test(k.charAt(prefix.length))))) {
        keys.push(k);
      }
    }
    if (keys.length === 0) return null;
    // Sort keys hierarchically (numeric segments)
    function segs(k) {
      var rest = k.slice(prefix.length); // e.g. "1.1.1.a"
      return rest.split('.').filter(Boolean);
    }
    keys.sort(function(a, b) {
      var sa = segs(a), sb = segs(b);
      var n = Math.max(sa.length, sb.length);
      for (var i = 0; i < n; i++) {
        var pa = sa[i] || '', pb = sb[i] || '';
        var na = parseInt(pa, 10), nb = parseInt(pb, 10);
        if (!isNaN(na) && !isNaN(nb)) {
          if (na !== nb) return na - nb;
        } else if (pa !== pb) {
          return pa < pb ? -1 : 1;
        }
      }
      return 0;
    });

    var rows = [];
    keys.forEach(function(k) {
      var entry = QD[k] || {};
      var depth = segs(k).length;
      var hasAttendu = !!entry.attendu;
      // Logic: items with attendu → criterion row (col 1 = code+attendu, col 2 = user notes)
      //        items without attendu (only intro/context) → header row
      if (!hasAttendu) {
        // Header row (sub-theme / group)
        var headerLabel = entry.intro || '';
        headerLabel = headerLabel.replace(/<[^>]+>/g, '').trim();
        var headerText = k + (headerLabel ? ' — ' + headerLabel : '');
        if (headerText.length > 220) headerText = headerText.substring(0, 217) + '…';
        rows.push({ type: 'header', text: headerText });
      } else {
        // Criterion row : col 1 = code + attendu (HTML stripped), col 2 = user input
        var label = (entry.attendu || '').replace(/<[^>]+>/g, '').trim();
        rows.push({
          type: 'row',
          num: k,
          text: label,
          value: '',
          sub: depth >= 4
        });
      }
    });
    return rows.length > 0 ? rows : null;
  }

  function buildCriteriaTable(creditCode, savedRows) {
    var wrap = document.getElementById('enttCritWrap');
    if (!wrap) return;
    wrap.innerHTML = '';

    var rows;
    if (savedRows && Array.isArray(savedRows) && savedRows.length > 0) {
      rows = savedRows;
    } else {
      rows = [];
      var detail = (creditCode && typeof CREDIT_DETAILS !== 'undefined' && CREDIT_DETAILS[creditCode]) ? CREDIT_DETAILS[creditCode] : null;
      if (detail && detail.criteria) {
        detail.criteria.forEach(function(section) {
          rows.push({type:'header', text: section.points || ''});
          (section.numbered || []).forEach(function(item) {
            rows.push({type:'row', num: item.num || '', text: item.text || '', value:'', sub:false});
            (item.subitems || []).forEach(function(sub) {
              rows.push({type:'row', num: sub.num || '', text: sub.text || '', value:'', sub:true});
            });
          });
        });
      } else {
        // Try HQE theme criteria from QD
        var hqeRows = buildHqeCriteriaRows(creditCode);
        if (hqeRows) {
          rows = hqeRows;
        } else {
          rows.push({type:'header', text: 'Aucun critère pré-défini — tableau libre'});
          for (var i = 0; i < 6; i++) rows.push({type:'row', num:'', text:'', value:'', sub:false});
        }
      }
    }

    var table = document.createElement('table');
    table.className = 'entt-crit-table';

    // Colgroup for resizable widths
    var colgroup = document.createElement('colgroup');
    var col1 = document.createElement('col');
    var col2 = document.createElement('col');
    var initialPct = loadColWidth();
    col1.style.width = initialPct + '%';
    col2.style.width = (100 - initialPct) + '%';
    colgroup.appendChild(col1);
    colgroup.appendChild(col2);
    table.appendChild(colgroup);

    rows.forEach(function(row) {
      var tr = document.createElement('tr');
      if (row.type === 'header') {
        var td = document.createElement('td');
        td.colSpan = 2;
        td.className = 'entt-crit-header';
        td.contentEditable = 'true';
        td.spellcheck = false;
        var ht = row.text || '';
        if (/<[a-z][^>]*>/i.test(ht)) td.innerHTML = ht; else td.textContent = ht;
        tr.appendChild(td);
      } else {
        var td1 = document.createElement('td');
        td1.className = 'entt-crit-num' + (row.sub ? ' entt-crit-sub' : '');
        td1.contentEditable = 'true';
        td1.spellcheck = false;
        var html = '';
        if (row.num) html += '<b>' + escapeHtml(row.num) + '</b>';
        // text may already be HTML (when user formatted col1) — detect
        if (row.text) {
          var sep = row.num ? ' — ' : '';
          if (/<[a-z][^>]*>/i.test(row.text)) html += sep + row.text;
          else html += sep + escapeHtml(row.text);
        }
        td1.innerHTML = html;
        tr.appendChild(td1);
        var td2 = document.createElement('td');
        td2.className = 'entt-crit-val';
        td2.contentEditable = 'true';
        td2.spellcheck = true;
        // Restore as innerHTML if value contains HTML (rich text), else as textContent
        var val = row.value || '';
        if (/<[a-z][^>]*>/i.test(val)) td2.innerHTML = val; else td2.textContent = val;
        tr.appendChild(td2);
      }
      table.appendChild(tr);
    });
    wrap.appendChild(table);

    // Add resizer overlay
    setupResizer(wrap, col1, col2);
  }

  function readCriteriaTable() {
    var wrap = document.getElementById('enttCritWrap');
    if (!wrap) return null;
    var table = wrap.querySelector('table');
    if (!table) return null;
    var rows = [];
    Array.prototype.forEach.call(table.rows, function(tr) {
      var cells = tr.cells;
      if (cells.length === 1 && cells[0].colSpan === 2) {
        rows.push({type:'header', text: (cells[0].innerHTML || '').trim()});
      } else if (cells.length >= 2) {
        var c1 = cells[0];
        var html = c1.innerHTML;
        var num = '', text = '';
        var m = html.match(/^<b>([^<]+)<\/b>(?:\s*—\s*([\s\S]*))?$/);
        if (m) {
          num = m[1].trim();
          text = (m[2] || '').replace(/<[^>]+>/g, '').trim();
        } else {
          text = c1.textContent.trim();
        }
        rows.push({
          type:'row', num:num, text:text,
          value: (cells[1].innerHTML || '').trim(),
          sub: c1.classList.contains('entt-crit-sub')
        });
      }
    });
    return rows;
  }

  function activateGeneralTab() {
    var panel = document.getElementById('extNotePanel');
    if (!panel) return;
    panel.querySelectorAll('.entt-tab').forEach(function(t){ t.classList.toggle('active', t.dataset.tab === 'gen'); });
    panel.querySelectorAll('.entt-panel').forEach(function(p){ p.classList.toggle('active', p.dataset.tab === 'gen'); });
    var rb = panel.querySelector('.entt-ribbon');
    if (rb) rb.classList.remove('show');
  }


  // ──────────────────────────────────────────────────────────
  // Inject a "Note" bubble button into every .lang-toggle-bar
  // so each credit detail view has quick access to its note.
  // ──────────────────────────────────────────────────────────
  function extractCodeFromBar(bar) {
    var btns = bar.querySelectorAll('button.lang-btn[onclick]');
    var re = /(?:setAimLang|setRfoAimLang|setHqeAimLang|setBbcaAimLang)\([^,]+,\s*['"]([^'"]+)['"]/;
    for (var i = 0; i < btns.length; i++) {
      var oc = btns[i].getAttribute('onclick') || '';
      var m = oc.match(re);
      if (m) return m[1];
    }
    return null;
  }

  function getCreditTitle(code) {
    if (typeof CREDIT_DETAILS !== 'undefined' && CREDIT_DETAILS[code] && CREDIT_DETAILS[code].name) {
      return code + ' — ' + CREDIT_DETAILS[code].name;
    }
    if (typeof RFO_CREDIT_DETAILS !== 'undefined' && RFO_CREDIT_DETAILS[code] && RFO_CREDIT_DETAILS[code].name) {
      return code + ' — ' + RFO_CREDIT_DETAILS[code].name;
    }
    return code;
  }

  function injectLangBarNoteButton(bar) {
    if (!bar || bar.querySelector('.lang-bar-note-btn')) return;
    var code = extractCodeFromBar(bar);
    if (!code) return;
    var key = 'credit-detail-' + code;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lang-bar-note-btn';
    btn.dataset.extNote = key;
    btn.title = 'Notes détaillées';
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
      '<span>Note</span>';
    if (typeof window.hasExtNote === 'function' && window.hasExtNote(key)) {
      btn.classList.add('has-note');
    }
    btn.onclick = function(e) {
      e.preventDefault(); e.stopPropagation();
      var title = getCreditTitle(code);
      var sub = 'Note libre + critères';
      if (typeof window.openExtNote === 'function') {
        window.openExtNote(key, title, sub);
      }
    };
    bar.appendChild(btn);
  }

  function scanLangBars() {
    document.querySelectorAll('.lang-toggle-bar').forEach(injectLangBarNoteButton);
  }

  function setupLangBarObserver() {
    if (window._langBarObserverInited) return;
    window._langBarObserverInited = true;
    // Initial scan
    scanLangBars();
    // Watch for new lang-toggle-bar DOM insertions
    var mo = new MutationObserver(function(muts) {
      var dirty = false;
      muts.forEach(function(m) {
        for (var i = 0; i < m.addedNodes.length; i++) {
          var n = m.addedNodes[i];
          if (n.nodeType !== 1) continue;
          if (n.classList && n.classList.contains('lang-toggle-bar')) { dirty = true; }
          else if (n.querySelector && n.querySelector('.lang-toggle-bar')) { dirty = true; }
        }
      });
      if (dirty) scanLangBars();
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }


  // Determine if a stored criteria table has user content (any cell.value
  // non-empty, OR any user-edited row with non-default text). Used to mark
  // the note bubble as "has-note" pink even when the General textarea is
  // empty but the Critères tab has data.
  function hasCriteriaContent(rows) {
    if (!rows || !Array.isArray(rows)) return false;
    return rows.some(function(r) {
      if (!r || r.type !== 'row') return false; // headers are prefilled, ignore
      // Strip HTML residue (<br>, empty <div>, etc.) before checking emptiness
      if (r.value && String(r.value).replace(/<[^>]+>/g, '').trim()) return true;
      // User-added free-form row: no prefilled num, but typed text in col 1
      if (!r.num && r.text && String(r.text).replace(/<[^>]+>/g, '').trim()) return true;
      return false;
    });
  }

  function bubbleHasContent(key) {
    // True if either General note OR Critères table has user content
    if (typeof window.hasExtNote === 'function' && window.hasExtNote(key)) return true;
    var all = loadCritAll();
    return hasCriteriaContent(all[key]);
  }

  function refreshBubble(key) {
    var has = bubbleHasContent(key);
    document.querySelectorAll('[data-ext-note="' + key + '"]').forEach(function(b) {
      b.classList.toggle('has-note', has);
    });
  }

  function init() {
    if (typeof window.openExtNote !== 'function' || typeof window.saveExtNote !== 'function') {
      return setTimeout(init, 50);
    }
    if (window._extNoteTabsInited) return;
    window._extNoteTabsInited = true;

    injectCss();
    setupLangBarObserver();
    log('init OK');

    // Patch hasExtNote so callers (e.g. row renders) account for Critères
    var origHasExtNote = window.hasExtNote;
    window.hasExtNote = function(key) {
      if (origHasExtNote && origHasExtNote(key)) return true;
      try { return hasCriteriaContent(loadCritAll()[key]); } catch(e) { return false; }
    };

    // One-time cleanup: re-evaluate all stored criteria entries with the new
    // (correct) hasCriteriaContent rules, and prune empty ones from storage.
    try {
      var all = loadCritAll();
      var dirty = false;
      Object.keys(all).forEach(function(k) {
        if (!hasCriteriaContent(all[k])) {
          delete all[k];
          dirty = true;
        }
      });
      if (dirty) saveCritAll(all);
    } catch(e) {}

    // Refresh all bubbles in DOM to reflect cleaned state
    try {
      document.querySelectorAll('[data-ext-note]').forEach(function(b) {
        var k = b.getAttribute('data-ext-note');
        if (k) refreshBubble(k);
      });
    } catch(e) {}



    var origOpen = window.openExtNote;
    window.openExtNote = function(key, title, subtitle) {
      origOpen.apply(this, arguments);
      ensureTabsStructure();
      activateGeneralTab();
      try {
        var code = extractCreditCode(key, title);
        var all = loadCritAll();
        buildCriteriaTable(code, all[key]);
        log('opened', 'key=' + key, 'code=' + code);
      } catch(e) { log('build error', e); }
    };

    var origSave = window.saveExtNote;
    window.saveExtNote = function() {
      try {
        var key = window._extCurrentKey;
        if (key) {
          var rows = readCriteriaTable();
          if (rows && rows.length > 0) {
            var all = loadCritAll();
            // Use the same definition of "user content" as hasCriteriaContent
            var hasContent = hasCriteriaContent(rows);
            if (hasContent) {
              all[key] = rows;
            } else {
              delete all[key];
            }
            saveCritAll(all);
          }
        }
      } catch(e) { log('save error', e); }
      var ret = origSave.apply(this, arguments);
      // origSave already toggles has-note based on textarea — but we need to
      // ALSO consider criteria. Re-evaluate after.
      try { if (window._extCurrentKey) refreshBubble(window._extCurrentKey); } catch(e){}
      return ret;
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
