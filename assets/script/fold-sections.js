/* Foldable sections: wraps the selected heading level in .page-content, together with the content
   that follows it up to the next heading at that level, in a native <details> element.

   Progressive enhancement: the page reads fine without this script, and anchors
   keep working because each heading keeps its id. Options, on the <script> tag:
     data-open="id-one id-two"   sections open on load (space-separated heading ids)
     data-fold-level="3"         fold h3 sections instead of the default h2 sections
   Content after an element carrying data-fold-end stays outside the folds.
   A section whose content is the target of the URL hash opens automatically,
   and every section opens for printing. */
(function () {
  'use strict';

  var script = document.currentScript;
  var openByDefault = ((script && script.getAttribute('data-open')) || '')
    .split(/\s+/).filter(Boolean);
  var headingTag = script && script.getAttribute('data-fold-level') === '3' ? 'H3' : 'H2';

  function chevron() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'fold__chevron');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var path = document.createElementNS(ns, 'path');
    path.setAttribute('d', 'M5.5 3.5 10 8l-4.5 4.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
    return svg;
  }

  function build() {
    var root = document.querySelector('.page-content');
    if (!root || root.querySelector('details.fold')) return;

    var nodes = Array.prototype.slice.call(root.childNodes);
    var body = null;
    var stopped = false;

    nodes.forEach(function (node) {
      if (stopped) return;
      var isElement = node.nodeType === 1;
      if (isElement && node.hasAttribute('data-fold-end')) { stopped = true; return; }
      if (isElement && node.tagName === headingTag) {
        var details = document.createElement('details');
        details.className = 'fold';
        if (openByDefault.indexOf(node.id) !== -1) details.open = true;
        var summary = document.createElement('summary');
        summary.className = 'fold__summary';
        summary.appendChild(chevron());
        body = document.createElement('div');
        body.className = 'fold__body';
        root.insertBefore(details, node);
        summary.appendChild(node);
        details.appendChild(summary);
        details.appendChild(body);
        return;
      }
      if (body) body.appendChild(node);
    });

    var folds = Array.prototype.slice.call(root.querySelectorAll('details.fold'));
    if (!folds.length) return;

    var controls = document.createElement('div');
    controls.className = 'fold-controls';
    [['Expand all', true], ['Collapse all', false]].forEach(function (spec) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn btn-sm btn-outline-secondary';
      button.textContent = spec[0];
      button.addEventListener('click', function () {
        folds.forEach(function (d) { d.open = spec[1]; });
      });
      controls.appendChild(button);
    });
    root.insertBefore(controls, folds[0]);

    function reveal(hash) {
      if (!hash || hash.length < 2) return;
      var id;
      try { id = decodeURIComponent(hash.slice(1)); } catch (e) { id = hash.slice(1); }
      var target = document.getElementById(id);
      if (!target) return;
      var fold = target.closest('details.fold');
      if (fold && !fold.open) fold.open = true;
      window.requestAnimationFrame(function () {
        target.scrollIntoView({ block: 'start' });
      });
    }
    reveal(window.location.hash);
    window.addEventListener('hashchange', function () { reveal(window.location.hash); });

    var wasOpen = null;
    window.addEventListener('beforeprint', function () {
      wasOpen = folds.map(function (d) { return d.open; });
      folds.forEach(function (d) { d.open = true; });
    });
    window.addEventListener('afterprint', function () {
      if (!wasOpen) return;
      folds.forEach(function (d, i) { d.open = wasOpen[i]; });
      wasOpen = null;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
