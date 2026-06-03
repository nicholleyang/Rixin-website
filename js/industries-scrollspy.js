document.addEventListener('DOMContentLoaded', function () {
	var layout = document.querySelector('.industries-layout');
	if (!layout) {
		return;
	}

	var navLinks = Array.prototype.slice.call(
		document.querySelectorAll('.industries-nav a[href^="#"]')
	);
	var sections = navLinks
		.map(function (link) {
			var target = document.querySelector(link.getAttribute('href'));
			return target || null;
		})
		.filter(Boolean);
	var backToTop = document.querySelector('.industries-back-to-top');
	var ticking = false;

	function getHeaderOffset() {
		var headerInner = document.querySelector('.header .header-inner');
		var headerHeight = headerInner ? headerInner.getBoundingClientRect().height : 80;
		return Math.round(headerHeight + 28);
	}

	function setActiveSection(activeId) {
		navLinks.forEach(function (link) {
			var isActive = link.getAttribute('href') === '#' + activeId;
			var item = link.parentElement;
			if (item) {
				item.classList.toggle('is-active', isActive);
				item.classList.toggle('active', isActive);
			}
			if (isActive) {
				link.setAttribute('aria-current', 'true');
			} else {
				link.removeAttribute('aria-current');
			}
		});
	}

	function updateActiveFromScroll() {
		var scrollPosition = window.scrollY + getHeaderOffset() + 24;
		var currentSection = sections[0];

		sections.forEach(function (section) {
			if (section.offsetTop <= scrollPosition) {
				currentSection = section;
			}
		});

		if (currentSection) {
			setActiveSection(currentSection.id);
		}

		if (backToTop) {
			backToTop.classList.toggle('is-visible', window.scrollY > 500);
		}

		ticking = false;
	}

	function requestScrollUpdate() {
		if (!ticking) {
			window.requestAnimationFrame(updateActiveFromScroll);
			ticking = true;
		}
	}

	navLinks.forEach(function (link) {
		link.addEventListener('click', function (event) {
			var target = document.querySelector(link.getAttribute('href'));
			if (!target) {
				return;
			}

			event.preventDefault();
			var top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
			window.scrollTo({
				top: Math.max(0, top),
				behavior: 'smooth'
			});
			setActiveSection(target.id);
		});
	});

	if (backToTop) {
		backToTop.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	Array.prototype.forEach.call(document.querySelectorAll('.industry-card'), function (card) {
		if (!card.querySelector('.industry-item-label')) {
			var label = document.createElement('p');
			label.className = 'industry-item-label';
			label.setAttribute('aria-hidden', 'true');
			card.appendChild(label);
		}
	});

	window.addEventListener('scroll', requestScrollUpdate, { passive: true });
	window.addEventListener('resize', requestScrollUpdate);
	updateActiveFromScroll();
});
