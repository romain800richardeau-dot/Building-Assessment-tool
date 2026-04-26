// ─────────────────────────────────────────────────────────────────────────────
// SIGLES_ENGINE.js — Annotation automatique des sigles dans le DOM
// Dépend de : data/SIGLES_DICT.js (objet window.SA_SIGLES_DICT)
// API publique :
//   window.SA_SIGLES_ENABLED (bool) — flag global
//   saSiglesAnnotate(rootEl, category) — annote les TextNodes de rootEl
//   saSiglesRefresh(category) — raccourci sur #saDetailPanel
// ─────────────────────────────────────────────────────────────────────────────

(function() {
  'use strict';

  window.SA_SIGLES_ENABLED = true;

  // Regex compilée une seule fois. Sigles triés par longueur décroissante
  // pour que les plus longs matchent avant les plus courts (G1 PGC avant G1).
  var _siglesRegex = null;
  var _siglesKeys = null;

  function _buildRegex() {
    if (_siglesRegex) return _siglesRegex;
    var dict = window.SA_SIGLES_DICT || {};
    _siglesKeys = Object.keys(dict).sort(function(a, b) { return b.length - a.length; });
    if (_siglesKeys.length === 0) { _siglesRegex = null; return null; }
    // Échappe les métacaractères regex de chaque clé
    // Autorise aussi l'espace étroite insécable (U+202F) et NBSP (U+00A0) comme
    // séparateur, car l'app utilise souvent \u202f entre "Ene" et "01".
    var escaped = _siglesKeys.map(function(k) {
      return k
        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        .replace(/ /g, '[ \\u00A0\\u202f]');
    });
    // \b en début ne marche pas si le sigle commence par un caractère non-word
    // (ex. "É" dans "ÉLAN"). On utilise des lookbehinds/lookaheads unicode.
    var pattern = '(?<![\\w\'\u00C0-\u017F])(?:' + escaped.join('|') + ')(?![\\w\'\u00C0-\u017F])';
    try {
      _siglesRegex = new RegExp(pattern, 'g');
    } catch (e) {
      // Fallback navigateurs anciens : regex simple avec \b
      _siglesRegex = new RegExp('\\b(?:' + escaped.join('|') + ')\\b', 'g');
    }
    return _siglesRegex;
  }

  // Vérifie si un nœud a un ancêtre matchant un sélecteur d'exclusion
  function _isExcluded(node) {
    var EXCLUDE_TAGS = { A: 1, BUTTON: 1, CODE: 1, PRE: 1, INPUT: 1, TEXTAREA: 1, SCRIPT: 1, STYLE: 1 };
    var el = node.parentNode;
    while (el && el.nodeType === 1) {
      if (EXCLUDE_TAGS[el.tagName]) return true;
      if (el.classList && el.classList.contains('sa-sigle')) return true;
      if (el.getAttribute && el.getAttribute('data-no-sigles') === 'true') return true;
      el = el.parentNode;
    }
    return false;
  }

  // Résolution du variant pour un sigle donné et un thème (string ou array)
  function _resolveVariant(sigle, category) {
    // Normalise les espaces spéciaux (U+202F narrow NBSP, U+00A0 NBSP) vers
    // l'espace standard pour retrouver la clé dans le dict.
    var normKey = sigle.replace(/[\u00A0\u202f]/g, ' ');
    var entry = window.SA_SIGLES_DICT[normKey] || window.SA_SIGLES_DICT[sigle];
    if (!entry) return null;
    var variants = Array.isArray(entry) ? entry : [entry];
    var cats = Array.isArray(category) ? category : [category];
    for (var i = 0; i < variants.length; i++) {
      var v = variants[i];
      if (!v.themes) continue;
      if (v.themes.indexOf('*') >= 0) return v;
      for (var j = 0; j < cats.length; j++) {
        if (v.themes.indexOf(cats[j]) >= 0) return v;
      }
    }
    return null;
  }

  // Traite un TextNode : remplace les occurrences par des spans
  function _processTextNode(textNode, category) {
    var text = textNode.nodeValue;
    if (!text || text.length < 2) return;
    var regex = _buildRegex();
    if (!regex) return;
    regex.lastIndex = 0;
    var match;
    var lastIndex = 0;
    var frag = null;
    while ((match = regex.exec(text)) !== null) {
      var sigle = match[0];
      var variant = _resolveVariant(sigle, category);
      if (!variant) continue;
      if (!frag) frag = document.createDocumentFragment();
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      var span = document.createElement('span');
      span.className = 'sa-sigle';
      span.setAttribute('data-sigle', sigle);
      span.setAttribute('tabindex', '0');
      span.setAttribute('role', 'button');
      span.setAttribute('aria-label', sigle + ' — ' + variant.label);
      span.textContent = sigle;
      frag.appendChild(span);
      lastIndex = match.index + sigle.length;
    }
    if (frag) {
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      }
      textNode.parentNode.replaceChild(frag, textNode);
    }
  }

  // API PUBLIQUE : annote les TextNodes d'un sous-arbre
  window.saSiglesAnnotate = function(root, category) {
    if (!window.SA_SIGLES_ENABLED) return;
    if (!root || !category) return;
    if (!window.SA_SIGLES_DICT) return;
    var walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      { acceptNode: function(n) {
          if (_isExcluded(n)) return NodeFilter.FILTER_REJECT;
          if (!n.nodeValue || n.nodeValue.trim().length < 2) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    for (var i = 0; i < nodes.length; i++) {
      _processTextNode(nodes[i], category);
    }
  };

  window.saSiglesRefresh = function(category) {
    var panel = document.getElementById('saDetailPanel');
    if (panel) window.saSiglesAnnotate(panel, category);
  };

  window._saSiglesRebuildRegex = function() { _siglesRegex = null; _buildRegex(); };

  // ─── Tooltip flottant (singleton dans <body>) ──────────────────────────────
  var _tooltipEl = null;
  var _currentTarget = null;
  var _showTimer = null;
  var SHOW_DELAY_MS = 200;

  function _getTooltip() {
    if (_tooltipEl) return _tooltipEl;
    _tooltipEl = document.createElement('div');
    _tooltipEl.id = 'saSiglesTooltip';
    _tooltipEl.setAttribute('role', 'tooltip');
    _tooltipEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(_tooltipEl);
    return _tooltipEl;
  }

  function _renderTooltipContent(variant, sigle) {
    var esc = function(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    };
    var html = '<div class="t-abbr">' + esc(sigle) + '</div>';
    html += '<div class="t-label">' + esc(variant.label) + '</div>';
    if (variant.context) {
      html += '<div class="t-sep"></div>';
      html += '<div class="t-ctx">' + esc(variant.context) + '</div>';
    }
    return html;
  }

  function _positionTooltip(tip, targetRect) {
    var viewportW = window.innerWidth;
    var viewportH = window.innerHeight;
    var tipRect = tip.getBoundingClientRect();
    var tipW = tipRect.width;
    var tipH = tipRect.height;
    var spaceBelow = viewportH - targetRect.bottom;
    var spaceAbove = targetRect.top;
    var placeAbove = (spaceBelow < tipH + 14) && (spaceAbove > spaceBelow);
    var top = placeAbove ? (targetRect.top - tipH - 10) : (targetRect.bottom + 10);
    var centerX = targetRect.left + (targetRect.width / 2);
    var left = Math.round(centerX - (tipW / 2));
    if (left < 8) left = 8;
    if (left + tipW > viewportW - 8) left = viewportW - tipW - 8;
    var arrowX = Math.round(centerX - left);
    if (arrowX < 14) arrowX = 14;
    if (arrowX > tipW - 14) arrowX = tipW - 14;
    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    tip.style.setProperty('--arrow-x', arrowX + 'px');
    tip.classList.remove('t-above', 't-below');
    tip.classList.add(placeAbove ? 't-above' : 't-below');
  }

  function _resolveCategoryFor(el) {
    var panel = el.closest ? el.closest('[data-sa-category]') : null;
    if (panel) {
      var val = panel.getAttribute('data-sa-category');
      if (val && val.indexOf(',') >= 0) {
        return val.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      }
      return val;
    }
    return 'risque';
  }

  function _showTooltip(targetEl) {
    var sigle = targetEl.getAttribute('data-sigle');
    if (!sigle) return;
    var category = _resolveCategoryFor(targetEl);
    var variant = _resolveVariant(sigle, category);
    if (!variant) return;
    var tip = _getTooltip();
    tip.innerHTML = _renderTooltipContent(variant, sigle);
    tip.style.visibility = 'hidden';
    tip.setAttribute('aria-hidden', 'false');
    var rect = targetEl.getBoundingClientRect();
    _positionTooltip(tip, rect);
    tip.style.visibility = '';
    _currentTarget = targetEl;
    targetEl.setAttribute('aria-describedby', 'saSiglesTooltip');
  }

  function _hideTooltip() {
    var tip = _getTooltip();
    tip.setAttribute('aria-hidden', 'true');
    if (_currentTarget) {
      _currentTarget.removeAttribute('aria-describedby');
      _currentTarget = null;
    }
    if (_showTimer) { clearTimeout(_showTimer); _showTimer = null; }
  }

  // Listeners délégués sur document
  document.addEventListener('mouseover', function(ev) {
    var t = ev.target;
    if (t && t.classList && t.classList.contains('sa-sigle')) {
      if (_showTimer) clearTimeout(_showTimer);
      _showTimer = setTimeout(function() { _showTooltip(t); }, SHOW_DELAY_MS);
    }
  }, true);

  document.addEventListener('mouseout', function(ev) {
    var t = ev.target;
    if (t && t.classList && t.classList.contains('sa-sigle')) {
      _hideTooltip();
    }
  }, true);

  document.addEventListener('focusin', function(ev) {
    var t = ev.target;
    if (t && t.classList && t.classList.contains('sa-sigle')) {
      _showTooltip(t);
    }
  });

  document.addEventListener('focusout', function(ev) {
    var t = ev.target;
    if (t && t.classList && t.classList.contains('sa-sigle')) {
      _hideTooltip();
    }
  });

  document.addEventListener('keydown', function(ev) {
    if (ev.key === 'Escape') _hideTooltip();
  });

  // Click (mobile) : toggle
  document.addEventListener('click', function(ev) {
    var t = ev.target;
    if (t && t.classList && t.classList.contains('sa-sigle')) {
      ev.preventDefault();
      if (_currentTarget === t) {
        _hideTooltip();
      } else {
        _hideTooltip();
        _showTooltip(t);
      }
    } else {
      if (_currentTarget) _hideTooltip();
    }
  });

  // Enter/Space sur un sigle focalisé : toggle
  document.addEventListener('keydown', function(ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    var t = ev.target;
    if (t && t.classList && t.classList.contains('sa-sigle')) {
      ev.preventDefault();
      if (_currentTarget === t) _hideTooltip(); else _showTooltip(t);
    }
  });

  // ─── Setup auto des 7 pages principales + volet détail ─────────────────────
  // Chaque conteneur reçoit data-sa-category et un MutationObserver debouncé
  // qui re-annote à chaque injection de contenu (rendu sync ou async).
  var _PAGE_SPEC = [
    // [id, catégorie(s) — string ou "a,b,c" pour multi-thèmes]
    ['saResults',             'risque,icpe,pollution,urbanisme'],
    ['saMilieuPhysiquePage',  'milieu_physique'],
    ['saClimatPage',          'climat'],
    ['saEcosystemesPage',     'biodiversite,ecosystemes_entites,ecosystemes_tvb,ecosystemes_zh'],
    ['saAccessibilitePage',   'accessibilite'],
    ['saReseauxPage',         'reseaux'],
    ['saEnrPage',             'enr_solaire,enr_geotherm,enr_reseaux,enr_eolbio']
  ];

  function _parseCategory(val) {
    if (!val) return null;
    if (val.indexOf(',') >= 0) {
      return val.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    }
    return val;
  }

  function _setupPageObserver(container, defaultCategory) {
    if (!container) return;
    if (container.getAttribute('data-sigle-observer') === '1') return;
    container.setAttribute('data-sigle-observer', '1');
    if (defaultCategory && !container.hasAttribute('data-sa-category')) {
      container.setAttribute('data-sa-category', defaultCategory);
    }
    var pending = null;
    var observer;
    function scheduleAnnotate() {
      if (pending) clearTimeout(pending);
      pending = setTimeout(function() {
        pending = null;
        if (!window.SA_SIGLES_ENABLED) return;
        var attr = container.getAttribute('data-sa-category') || defaultCategory;
        var cat = _parseCategory(attr);
        if (!cat) return;
        // Disconnect during annotation pour éviter toute boucle
        try { observer.disconnect(); } catch (e) {}
        try { window.saSiglesAnnotate(container, cat); } catch (e) {}
        try { observer.observe(container, { childList: true, subtree: true }); } catch (e) {}
      }, 180);
    }
    try {
      observer = new MutationObserver(scheduleAnnotate);
      observer.observe(container, { childList: true, subtree: true });
    } catch (e) { /* MutationObserver indisponible : on se contente de l'init */ }
    // Annotation initiale (sans attendre une mutation)
    scheduleAnnotate();
  }

  window.saSiglesInitPages = function() {
    for (var i = 0; i < _PAGE_SPEC.length; i++) {
      var el = document.getElementById(_PAGE_SPEC[i][0]);
      if (el) _setupPageObserver(el, _PAGE_SPEC[i][1]);
    }
    // Détail panel : catégorie dynamique (définie par openSaDetailPanel)
    var detail = document.getElementById('saDetailPanel');
    if (detail) _setupPageObserver(detail, null);
  };

  // Auto-init au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.saSiglesInitPages);
  } else {
    // DOM déjà chargé (cas inclusion tardive)
    setTimeout(window.saSiglesInitPages, 0);
  }
})();
