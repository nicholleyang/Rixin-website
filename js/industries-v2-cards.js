document.addEventListener('DOMContentLoaded', function () {
  var explorer = document.querySelector('[data-rixin-industry-explorer]');
  if (!explorer) return;

  function collapsePanelDetails(panel) {
    if (!panel) return;
    var toggles = panel.querySelectorAll('.rixin-industries-v2-part-toggle');
    toggles.forEach(function (toggle) {
      var targetId = toggle.getAttribute('aria-controls');
      var details = targetId ? panel.querySelector('#' + targetId) : null;
      toggle.setAttribute('aria-expanded', 'false');
      if (details) {
        details.hidden = true;
      }
    });
  }

  function collapseAllDetails() {
    var panels = explorer.querySelectorAll('.rixin-industries-v2-panel');
    panels.forEach(collapsePanelDetails);
  }

  explorer.addEventListener('click', function (event) {
    var toggle = event.target.closest('.rixin-industries-v2-part-toggle');
    if (!toggle || !explorer.contains(toggle)) return;

    var targetId = toggle.getAttribute('aria-controls');
    if (!targetId) return;

    var panel = toggle.closest('.rixin-industries-v2-panel');
    if (!panel) return;

    var details = panel.querySelector('#' + targetId);
    if (!details) return;

    var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    details.hidden = isExpanded;
  });

  explorer.addEventListener('click', function (event) {
    var tab = event.target.closest('.rixin-industries-v2-tab');
    if (!tab) return;
    collapseAllDetails();
  });

  explorer.addEventListener('keydown', function (event) {
    var tab = event.target.closest('.rixin-industries-v2-tab');
    if (!tab) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      collapseAllDetails();
    }
  });

  collapseAllDetails();
});
