(function () {
	'use strict';

	var ALLOWED_EXT = [
		'stp', 'step', 'stl', 'igs', 'iges', 'prt', 'sldprt', 'sat', 'x_t',
		'jpg', 'png', 'pdf', 'jpeg', 'zip', 'rar'
	];
	var MAX_FILE_SIZE = 10 * 1024 * 1024;
	var MAX_FILES = 5;
	var MAX_TOTAL_SIZE = 25 * 1024 * 1024;

	var section = document.getElementById('rixin-contact-quote');
	if (!section) {
		return;
	}

	var form = section.querySelector('.rixin-contact-quote-form');
	if (!form) {
		return;
	}

	var msgs = {
		sending: section.getAttribute('data-msg-sending') || 'Sending...',
		success: section.getAttribute('data-msg-success') || 'Thank you. Your message has been received!',
		error: section.getAttribute('data-msg-error') || 'The message could not be sent. Please try again.',
		fill: section.getAttribute('data-msg-fill') || 'Please fill in all required fields.',
		email: section.getAttribute('data-msg-email') || 'Please enter a valid email address.',
		fileType: section.getAttribute('data-msg-file-type') || 'File type not allowed:',
		fileSize: section.getAttribute('data-msg-file-size') || 'Each file must be 10 MB or less.',
		fileCount: section.getAttribute('data-msg-file-count') || 'You can attach up to 5 files.',
		fileTotal: section.getAttribute('data-msg-file-total') || 'Total attachment size must be 25 MB or less.'
	};

	var responseEl = section.querySelector('.form-response');
	var dropzone = section.querySelector('[data-dropzone]');
	var fileInput = section.querySelector('.rixin-contact-quote-file-input');
	var browseBtn = section.querySelector('.rixin-contact-quote-browse');
	var fileListEl = section.querySelector('.rixin-contact-quote-file-list');
	var submitBtn = form.querySelector('.form-submit');
	var selectedFiles = [];

	function showResponse(text) {
		if (!responseEl) {
			return;
		}
		responseEl.textContent = text;
		responseEl.style.display = 'block';
	}

	function getExtension(name) {
		var parts = name.split('.');
		if (parts.length < 2) {
			return '';
		}
		return parts.pop().toLowerCase();
	}

	function isAllowedFile(file) {
		return ALLOWED_EXT.indexOf(getExtension(file.name)) !== -1;
	}

	function totalSize(files) {
		var sum = 0;
		for (var i = 0; i < files.length; i++) {
			sum += files[i].size;
		}
		return sum;
	}

	function syncFileInput() {
		if (!fileInput || typeof DataTransfer === 'undefined') {
			return;
		}
		var dt = new DataTransfer();
		selectedFiles.forEach(function (file) {
			dt.items.add(file);
		});
		fileInput.files = dt.files;
	}

	function renderFileList() {
		if (!fileListEl) {
			return;
		}
		fileListEl.innerHTML = '';
		selectedFiles.forEach(function (file, index) {
			var li = document.createElement('li');
			var nameSpan = document.createElement('span');
			nameSpan.textContent = file.name + ' (' + formatSize(file.size) + ')';
			var removeBtn = document.createElement('button');
			removeBtn.type = 'button';
			removeBtn.className = 'rixin-contact-quote-file-remove';
			removeBtn.textContent = '×';
			removeBtn.setAttribute('aria-label', 'Remove ' + file.name);
			removeBtn.addEventListener('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				selectedFiles.splice(index, 1);
				syncFileInput();
				renderFileList();
			});
			li.appendChild(nameSpan);
			li.appendChild(removeBtn);
			fileListEl.appendChild(li);
		});
	}

	function formatSize(bytes) {
		if (bytes < 1024) {
			return bytes + ' B';
		}
		if (bytes < 1024 * 1024) {
			return (bytes / 1024).toFixed(1) + ' KB';
		}
		return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
	}

	function addFiles(fileList) {
		var incoming = Array.prototype.slice.call(fileList || []);
		if (!incoming.length) {
			return true;
		}

		for (var i = 0; i < incoming.length; i++) {
			var file = incoming[i];
			if (!isAllowedFile(file)) {
				showResponse(msgs.fileType + ' ' + file.name);
				return false;
			}
			if (file.size > MAX_FILE_SIZE) {
				showResponse(msgs.fileSize);
				return false;
			}
			var duplicate = selectedFiles.some(function (f) {
				return f.name === file.name && f.size === file.size && f.lastModified === file.lastModified;
			});
			if (!duplicate) {
				selectedFiles.push(file);
			}
		}

		if (selectedFiles.length > MAX_FILES) {
			selectedFiles = selectedFiles.slice(0, MAX_FILES);
			showResponse(msgs.fileCount);
		}

		if (totalSize(selectedFiles) > MAX_TOTAL_SIZE) {
			while (selectedFiles.length && totalSize(selectedFiles) > MAX_TOTAL_SIZE) {
				selectedFiles.pop();
			}
			showResponse(msgs.fileTotal);
		}

		syncFileInput();
		renderFileList();
		return true;
	}

	function isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function validateForm() {
		var name = form.querySelector('[name="contact_name"]');
		var email = form.querySelector('[name="email"]');
		var service = form.querySelector('[name="service_type"]');
		var message = form.querySelector('[name="message"]');
		var honeypot = form.querySelector('[name="honeypot"]');

		if (honeypot && honeypot.value.trim() !== '') {
			return false;
		}

		if (!name || !name.value.trim() || !email || !email.value.trim() ||
			!service || !service.value.trim() || !message || !message.value.trim()) {
			showResponse(msgs.fill);
			return false;
		}

		if (!isValidEmail(email.value.trim())) {
			showResponse(msgs.email);
			return false;
		}

		return true;
	}

	if (browseBtn && fileInput) {
		browseBtn.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			fileInput.click();
		});

		fileInput.addEventListener('change', function () {
			addFiles(fileInput.files);
		});
	}

	if (dropzone) {
		['dragenter', 'dragover'].forEach(function (evt) {
			dropzone.addEventListener(evt, function (e) {
				e.preventDefault();
				e.stopPropagation();
				dropzone.classList.add('is-dragover');
			});
		});

		['dragleave', 'drop'].forEach(function (evt) {
			dropzone.addEventListener(evt, function (e) {
				e.preventDefault();
				e.stopPropagation();
				dropzone.classList.remove('is-dragover');
			});
		});

		dropzone.addEventListener('drop', function (e) {
			addFiles(e.dataTransfer.files);
		});

		dropzone.addEventListener('click', function (e) {
			if (e.target.closest('.rixin-contact-quote-browse') || e.target.closest('.rixin-contact-quote-file-remove')) {
				return;
			}
			if (fileInput) {
				fileInput.click();
			}
		});

		dropzone.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				if (fileInput) {
					fileInput.click();
				}
			}
		});
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		syncFileInput();

		var formData = new FormData(form);
		var submitValue = submitBtn ? submitBtn.value : '';

		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.value = msgs.sending;
		}
		showResponse(msgs.sending);

		fetch(form.getAttribute('action'), {
			method: 'POST',
			body: formData
		})
			.then(function (res) {
				return res.json();
			})
			.then(function (data) {
				if (data && data.response === true) {
					showResponse(msgs.success);
					form.reset();
					selectedFiles = [];
					syncFileInput();
					renderFileList();
				} else {
					var err = (data && data.json && data.json.error_message) ? data.json.error_message : msgs.error;
					showResponse(msgs.error + (err ? ' ' + err : ''));
				}
			})
			.catch(function () {
				showResponse(msgs.error);
			})
			.finally(function () {
				if (submitBtn) {
					submitBtn.disabled = false;
					submitBtn.value = submitValue;
				}
			});
	});
})();
