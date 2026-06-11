(function () {
	var labels = {
		en: {
			equipment: 'Equipment',
			model: 'Model',
			spec: 'Travel / Spec',
			empty: '—',
			loadError: 'Equipment list is temporarily unavailable.'
		},
		zh: {
			equipment: '设备',
			model: '型号',
			spec: '行程 / 规格',
			empty: '—',
			loadError: '设备列表暂时无法加载。'
		},
		ja: {
			equipment: '設備',
			model: 'モデル',
			spec: '設備行程',
			empty: '—',
			loadError: '設備一覧を読み込めませんでした。'
		}
	};

	function getLocale() {
		var lang = (document.documentElement.lang || 'en').toLowerCase();
		if (lang.indexOf('zh') === 0) return 'zh';
		if (lang.indexOf('ja') === 0) return 'ja';
		return 'en';
	}

	function getDataUrl() {
		var path = window.location.pathname || '';
		if (path.indexOf('/zh/') !== -1 || path.indexOf('/ja/') !== -1) {
			return '../data/equipment-list.json';
		}
		return 'data/equipment-list.json';
	}

	function pick(obj, locale) {
		if (!obj) return '';
		return obj[locale] || obj.en || obj.zh || '';
	}

	function displayValue(value, empty) {
		if (value === null || value === undefined) return empty;
		var text = String(value).trim();
		return text ? text : empty;
	}

	function equipmentLabel(item, locale) {
		if (!item.equipment) return '';
		if (typeof item.equipment === 'string') return item.equipment;
		return pick(item.equipment, locale);
	}

	function formatSpec(value) {
		var text = String(value || '').trim();
		if (!text) return '';

		if (/rpm/i.test(text)) {
			var rpm = text.replace(/rpm/i, '').replace(/,/g, '').trim();
			if (/^\d+$/.test(rpm)) {
				return Number(rpm).toLocaleString('en-US') + ' rpm';
			}
			return text;
		}

		if (/mm/i.test(text)) {
			return text
				.replace(/\*/g, ' × ')
				.replace(/\s+/g, ' ')
				.trim();
		}

		if (/^\d+(\*\d+)+$/.test(text)) {
			return text.split('*').join(' × ');
		}

		return text;
	}

	function buildTable(items, copy, locale) {
		var table = document.createElement('table');
		table.className = 'rixin-equipment-table';

		var thead = document.createElement('thead');
		var headRow = document.createElement('tr');
		['equipment', 'model', 'spec'].forEach(function (key) {
			var th = document.createElement('th');
			th.scope = 'col';
			th.textContent = copy[key];
			headRow.appendChild(th);
		});
		thead.appendChild(headRow);
		table.appendChild(thead);

		var tbody = document.createElement('tbody');
		items.forEach(function (item) {
			var row = document.createElement('tr');
			var specCell = formatSpec(item.spec);
			var cells = [
				displayValue(equipmentLabel(item, locale), copy.empty),
				displayValue(item.model, copy.empty),
				specCell ? specCell : copy.empty
			];
			cells.forEach(function (text, index) {
				var td = document.createElement('td');
				td.textContent = text;
				if (index === 2) {
					td.className = 'rixin-equipment-spec';
				}
				row.appendChild(td);
			});
			tbody.appendChild(row);
		});
		table.appendChild(tbody);
		return table;
	}

	function initEquipmentAccordion(root) {
		root.querySelectorAll('.rixin-equipment-item').forEach(function (item, index) {
			var trigger = item.querySelector('.rixin-equipment-trigger');
			var panel = item.querySelector('.rixin-equipment-panel');
			var icon = item.querySelector('.rixin-equipment-toggle-icon');
			if (!trigger || !panel) return;

			var panelId = panel.id || ('rixin-equipment-panel-' + (index + 1));
			panel.id = panelId;
			trigger.setAttribute('aria-controls', panelId);

			if (item.classList.contains('is-open')) {
				trigger.setAttribute('aria-expanded', 'true');
				panel.hidden = false;
				if (icon) icon.textContent = '\u2212';
			} else {
				trigger.setAttribute('aria-expanded', 'false');
				panel.hidden = true;
				if (icon) icon.textContent = '+';
			}

			trigger.addEventListener('click', function () {
				var isOpen = item.classList.contains('is-open');

				root.querySelectorAll('.rixin-equipment-item.is-open').forEach(function (openItem) {
					if (openItem === item) return;
					openItem.classList.remove('is-open');
					var openTrigger = openItem.querySelector('.rixin-equipment-trigger');
					var openPanel = openItem.querySelector('.rixin-equipment-panel');
					var openIcon = openItem.querySelector('.rixin-equipment-toggle-icon');
					if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
					if (openPanel) openPanel.hidden = true;
					if (openIcon) openIcon.textContent = '+';
				});

				if (isOpen) {
					item.classList.remove('is-open');
					trigger.setAttribute('aria-expanded', 'false');
					panel.hidden = true;
					if (icon) icon.textContent = '+';
				} else {
					item.classList.add('is-open');
					trigger.setAttribute('aria-expanded', 'true');
					panel.hidden = false;
					if (icon) icon.textContent = '\u2212';
				}
			});
		});
	}

	function renderEquipment(data, root, locale) {
		var copy = labels[locale] || labels.en;
		var accordion = document.createElement('div');
		accordion.className = 'rixin-equipment-accordion';
		accordion.setAttribute('data-rixin-equipment-accordion', '');

		data.categories.forEach(function (category, index) {
			var item = document.createElement('article');
			item.className = 'rixin-equipment-item' + (index === 0 ? ' is-open' : '');

			var trigger = document.createElement('button');
			trigger.type = 'button';
			trigger.className = 'rixin-equipment-trigger';
			trigger.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');

			var icon = document.createElement('span');
			icon.className = 'rixin-equipment-toggle-icon';
			icon.setAttribute('aria-hidden', 'true');
			icon.textContent = index === 0 ? '\u2212' : '+';

			var title = document.createElement('span');
			title.className = 'rixin-equipment-trigger-title';
			title.textContent = pick(category.name, locale);

			trigger.appendChild(icon);
			trigger.appendChild(title);

			var panel = document.createElement('div');
			panel.className = 'rixin-equipment-panel';
			panel.hidden = index !== 0;

			var tableWrap = document.createElement('div');
			tableWrap.className = 'rixin-equipment-table-wrap';
			tableWrap.appendChild(buildTable(category.items, copy, locale));
			panel.appendChild(tableWrap);

			item.appendChild(trigger);
			item.appendChild(panel);
			accordion.appendChild(item);
		});

		root.innerHTML = '';
		root.appendChild(accordion);
		initEquipmentAccordion(accordion);
	}

	document.addEventListener('DOMContentLoaded', function () {
		var section = document.getElementById('our-equipment');
		if (!section) return;

		var root = section.querySelector('[data-equipment-root]');
		if (!root) return;

		var locale = getLocale();
		var copy = labels[locale] || labels.en;

		fetch(getDataUrl())
			.then(function (response) {
				if (!response.ok) throw new Error('fetch failed');
				return response.json();
			})
			.then(function (data) {
				renderEquipment(data, root, locale);
			})
			.catch(function () {
				root.innerHTML = '<p class="rixin-equipment-error">' + copy.loadError + '</p>';
			});
	});
})();
