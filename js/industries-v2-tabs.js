document.addEventListener('DOMContentLoaded', function () {
  var explorer = document.querySelector('[data-rixin-industry-explorer]');
  if (!explorer) return;

  var tabs = Array.prototype.slice.call(explorer.querySelectorAll('.rixin-industries-v2-tab'));
  var panels = Array.prototype.slice.call(explorer.querySelectorAll('.rixin-industries-v2-panel'));
  if (!tabs.length || !panels.length) return;

  function activate(targetKey) {
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute('data-target') === targetKey;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    panels.forEach(function (panel) {
      var isActive = panel.getAttribute('data-panel') === targetKey;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab.getAttribute('data-target'));
    });
    tab.addEventListener('keydown', function (event) {
      var idx = tabs.indexOf(tab);
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        var next = tabs[(idx + 1) % tabs.length];
        next.focus();
        activate(next.getAttribute('data-target'));
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        var prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        prev.focus();
        activate(prev.getAttribute('data-target'));
      }
    });
  });

  var defaultTab = explorer.querySelector('.rixin-industries-v2-tab.is-active') || tabs[0];
  activate(defaultTab.getAttribute('data-target'));
});
