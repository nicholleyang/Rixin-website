<?php
/**
 * Minimal .env loader (no Composer). Loads KEY=VALUE into getenv / $_ENV.
 */
function load_env(string $path): void
{
	if (!is_readable($path)) {
		return;
	}
	$lines = file($path, FILE_IGNORE_NEW_LINES);
	if ($lines === false) {
		return;
	}
	foreach ($lines as $line) {
		$line = trim($line);
		if ($line === '' || strncmp($line, '#', 1) === 0) {
			continue;
		}
		if (strpos($line, '=') === false) {
			continue;
		}
		[$name, $value] = explode('=', $line, 2);
		$name = trim($name);
		$value = trim($value);
		if ($name === '') {
			continue;
		}
		if ($value !== '' && ($value[0] === '"' || $value[0] === "'")) {
			$q = $value[0];
			$value = stripcslashes(substr($value, 1, -1));
		}
		if (getenv($name) !== false) {
			continue;
		}
		putenv("{$name}={$value}");
		$_ENV[$name] = $value;
	}
}

function env(string $key, string $default = ''): string
{
	if (isset($_ENV[$key]) && $_ENV[$key] !== '') {
		return (string) $_ENV[$key];
	}
	$v = getenv($key);
	if ($v !== false && $v !== '') {
		return $v;
	}
	return $default;
}
