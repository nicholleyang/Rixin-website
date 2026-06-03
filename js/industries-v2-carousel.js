document.addEventListener('DOMContentLoaded', function () {
  var explorer = document.querySelector('[data-rixin-industry-explorer]');
  if (!explorer) return;

  var carousels = Array.prototype.slice.call(explorer.querySelectorAll('[data-rixin-carousel]'));

  function visibleCount() {
    var width = window.innerWidth || document.documentElement.clientWidth;
    if (width <= 600) return 2;
    if (width <= 1120) return 3;
    return 4;
  }

  function setupCarousel(carousel) {
    var track = carousel.querySelector('.rixin-industries-v2-carousel-track');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.rixin-industries-v2-carousel-slide'));
    var prev = carousel.querySelector('[data-direction="prev"]');
    var next = carousel.querySelector('[data-direction="next"]');
    if (!track || !slides.length || !prev || !next) return null;

    var state = { index: 0 };
    var detailIdSeed = 0;

    function collapseAllDetails() {
      var toggles = carousel.querySelectorAll('.rixin-industries-v2-carousel-image-trigger, .rixin-industries-v2-carousel-chip-btn');
      toggles.forEach(function (toggle) {
        if (toggle.hasAttribute('aria-expanded')) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
      var details = carousel.querySelectorAll('.rixin-industries-v2-carousel-details');
      details.forEach(function (detail) {
        detail.hidden = true;
      });
    }

    function makeDetailMarkup(slide) {
      var technology = slide.getAttribute('data-tech') || 'CNC machining - milling';
      var finish = slide.getAttribute('data-finish') || 'Bead blasting';
      var details = document.createElement('div');
      details.className = 'rixin-industries-v2-carousel-details';
      details.hidden = true;
      details.innerHTML = '<p><strong>Technology</strong> ' + technology + '</p><p><strong>Surface finish</strong> ' + finish + '</p>';
      slide.appendChild(details);
      return details;
    }

    function ensureTargets(slide) {
      if (!slide) return null;
      var details = slide.querySelector('.rixin-industries-v2-carousel-details') || makeDetailMarkup(slide);
      if (!details.id) {
        detailIdSeed += 1;
        details.id = 'carousel-detail-' + detailIdSeed;
      }

      var chip = slide.querySelector('.rixin-industries-v2-carousel-chip-btn');
      if (chip) {
        chip.setAttribute('aria-controls', details.id);
        if (!chip.hasAttribute('aria-expanded')) chip.setAttribute('aria-expanded', 'false');
      }

      var imageTrigger = slide.querySelector('.rixin-industries-v2-carousel-image-trigger');
      if (imageTrigger) {
        imageTrigger.setAttribute('aria-controls', details.id);
        imageTrigger.setAttribute('aria-expanded', chip ? chip.getAttribute('aria-expanded') : 'false');
      }

      return details.id;
    }

    function maxIndex() {
      return Math.max(0, slides.length - visibleCount());
    }

    function apply() {
      var gap = 16;
      var trackStyle = window.getComputedStyle(track);
      var parsedGap = parseFloat(trackStyle.columnGap || trackStyle.gap || '16');
      if (!isNaN(parsedGap)) gap = parsedGap;
      var slideWidth = slides[0].getBoundingClientRect().width;
      var offset = state.index * (slideWidth + gap);
      track.style.transform = 'translateX(' + (-offset) + 'px)';
      prev.disabled = state.index <= 0;
      next.disabled = state.index >= maxIndex();
    }

    prev.addEventListener('click', function () {
      state.index = Math.max(0, state.index - 1);
      collapseAllDetails();
      apply();
    });

    next.addEventListener('click', function () {
      state.index = Math.min(maxIndex(), state.index + 1);
      collapseAllDetails();
      apply();
    });

    function toggleDetail(targetId, slide) {
      if (!targetId && slide) {
        targetId = ensureTargets(slide);
      }
      if (!targetId) return;
      var details = carousel.querySelector('#' + targetId);
      if (!details) return;
      var toggles = carousel.querySelectorAll('[aria-controls="' + targetId + '"]');
      var expanded = toggles.length ? toggles[0].getAttribute('aria-expanded') === 'true' : false;
      var nextState = !expanded;
      toggles.forEach(function (toggle) {
        toggle.setAttribute('aria-expanded', nextState ? 'true' : 'false');
      });
      details.hidden = !nextState;
    }

    carousel.addEventListener('click', function (event) {
      var trigger = event.target.closest('.rixin-industries-v2-carousel-image-trigger, .rixin-industries-v2-carousel-chip-btn');
      if (trigger) {
        var slideByTrigger = trigger.closest('.rixin-industries-v2-carousel-slide');
        var targetId = trigger.getAttribute('aria-controls');
        toggleDetail(targetId, slideByTrigger);
        return;
      }
      var img = event.target.closest('.rixin-industries-v2-carousel-slide img');
      if (!img) return;
      var slide = img.closest('.rixin-industries-v2-carousel-slide');
      toggleDetail(null, slide);
    });

    slides.forEach(function (slide) {
      ensureTargets(slide);
    });

    return {
      reset: function () {
        state.index = 0;
        collapseAllDetails();
        apply();
      },
      refresh: function () {
        state.index = Math.min(state.index, maxIndex());
        apply();
      }
    };
  }

  var instances = carousels.map(setupCarousel).filter(Boolean);

  function refreshAll() {
    instances.forEach(function (inst) { inst.refresh(); });
  }

  function resetActivePanel() {
    var activePanel = explorer.querySelector('.rixin-industries-v2-panel.is-active');
    if (!activePanel) return;
    instances.forEach(function (inst) {
      var carousel = inst && inst.refresh && inst;
      if (!carousel) return;
    });
    var activeCarousels = activePanel.querySelectorAll('[data-rixin-carousel]');
    Array.prototype.forEach.call(activeCarousels, function (node) {
      var idx = carousels.indexOf(node);
      if (idx >= 0 && instances[idx]) instances[idx].reset();
    });
  }

  window.addEventListener('resize', refreshAll);

  explorer.addEventListener('click', function (event) {
    var tab = event.target.closest('.rixin-industries-v2-tab');
    if (tab) {
      window.setTimeout(resetActivePanel, 0);
    }
  });

  explorer.addEventListener('keydown', function (event) {
    var tab = event.target.closest('.rixin-industries-v2-tab');
    if (!tab) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      window.setTimeout(resetActivePanel, 0);
    }
  });

  refreshAll();
});
