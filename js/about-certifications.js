(function () {
  function getLabel(id) {
    var el = document.getElementById(id);
    return el ? el.textContent.trim() : '';
  }

  function initAccordion(root) {
    var expandLabel = getLabel('certExpandLabel');
    var closeLabel = getLabel('certCloseLabel');

    root.querySelectorAll('.rixin-cert-item').forEach(function (item) {
      var trigger = item.querySelector('.rixin-cert-trigger');
      var panel = item.querySelector('.rixin-cert-panel');
      var labelEl = item.querySelector('.rixin-cert-toggle-label');
      var iconEl = item.querySelector('.rixin-cert-toggle-icon');
      if (!trigger || !panel) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        root.querySelectorAll('.rixin-cert-item.is-open').forEach(function (openItem) {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            var openTrigger = openItem.querySelector('.rixin-cert-trigger');
            var openPanel = openItem.querySelector('.rixin-cert-panel');
            var openLabel = openItem.querySelector('.rixin-cert-toggle-label');
            var openIcon = openItem.querySelector('.rixin-cert-toggle-icon');
            if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
            if (openPanel) openPanel.hidden = true;
            if (openLabel) openLabel.textContent = expandLabel;
            if (openIcon) openIcon.textContent = '+';
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          panel.hidden = true;
          if (labelEl) labelEl.textContent = expandLabel;
          if (iconEl) iconEl.textContent = '+';
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
          if (labelEl) labelEl.textContent = closeLabel;
          if (iconEl) iconEl.textContent = '\u2014';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-rixin-cert-accordion]').forEach(initAccordion);
  });
})();
