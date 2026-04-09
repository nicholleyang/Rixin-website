/**
 * Adds .header-scrolled to .header when page is scrolled past threshold (desktop + mobile).
 */
(function () {
	function init() {
		var header = document.querySelector('.header');
		if (!header) {
			return;
		}
		var threshold = 50;
		function tick() {
			if (window.scrollY > threshold) {
				header.classList.add('header-scrolled');
			} else {
				header.classList.remove('header-scrolled');
			}
		}
		window.addEventListener('scroll', tick, { passive: true });
		tick();
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
