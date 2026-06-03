document.addEventListener('DOMContentLoaded', function() {
  var sections = document.querySelectorAll('[data-rixin-insights]');

  sections.forEach(function(section) {
    var track = section.querySelector('[data-rixin-insights-track]');
    var prev = section.querySelector('[data-rixin-insights-prev]');
    var next = section.querySelector('[data-rixin-insights-next]');

    if (!track || !prev || !next) return;

    function getStep() {
      var card = track.querySelector('.rixin-insight-card');
      if (!card) return track.clientWidth;

      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap || 0);
      return card.getBoundingClientRect().width + gap;
    }

    prev.addEventListener('click', function() {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    next.addEventListener('click', function() {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });
  });
});
