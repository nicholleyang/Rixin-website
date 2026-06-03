(function () {
	document.querySelectorAll('.rixin-cnc-material-browser').forEach(function (browser) {
		var panel = browser.querySelector('.rixin-cnc-material-panel');
		if (!panel) return;

		var titleEl = panel.querySelector('[data-material-title]');
		var descriptionEl = panel.querySelector('[data-material-description]');
		var specsEl = panel.querySelector('[data-material-specs]');
		var mediaEl = panel.querySelector('[data-material-media]');
		var placeholderDesc = browser.dataset.placeholderDesc || 'Material details coming soon.';
		var options = browser.querySelectorAll('[data-material-option]');

		function renderSpecs(specs) {
			if (!specsEl) return;
			specsEl.innerHTML = '';
			if (!specs) return;

			var parts = specs.split('||');
			for (var i = 0; i < parts.length; i += 2) {
				if (!parts[i] || !parts[i].trim()) continue;
				var dt = document.createElement('dt');
				var dd = document.createElement('dd');
				dt.textContent = parts[i].trim();
				dd.textContent = parts[i + 1] ? parts[i + 1].trim() : '';
				specsEl.appendChild(dt);
				specsEl.appendChild(dd);
			}
		}

		function renderMedia(imageUrl, imageAlt) {
			if (!mediaEl) return;
			mediaEl.innerHTML = '';

			if (imageUrl) {
				var img = document.createElement('img');
				img.src = imageUrl;
				img.alt = imageAlt || '';
				mediaEl.appendChild(img);
				return;
			}

			var placeholder = document.createElement('div');
			placeholder.className = 'rixin-cnc-material-placeholder';
			placeholder.setAttribute('aria-hidden', 'true');
			mediaEl.appendChild(placeholder);
		}

		function renderMaterial(option) {
			if (titleEl) {
				titleEl.textContent = option.dataset.title || option.textContent.trim();
			}
			if (descriptionEl) {
				descriptionEl.textContent = option.dataset.description || placeholderDesc;
			}
			renderSpecs(option.dataset.specs || '');
			renderMedia(option.dataset.imageUrl || '', option.dataset.imageAlt || '');
		}

		options.forEach(function (option) {
			option.addEventListener('click', function () {
				var list = option.parentElement;
				if (list) {
					list.querySelectorAll('[data-material-option]').forEach(function (item) {
						item.classList.remove('is-active');
					});
				}
				option.classList.add('is-active');
				renderMaterial(option);
			});
		});
	});
})();
