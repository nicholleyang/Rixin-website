<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

$projectRoot = dirname(__DIR__);

if (is_file($projectRoot . '/vendor/autoload.php')) {
	require_once $projectRoot . '/vendor/autoload.php';
} else {
	require_once $projectRoot . '/php/includes/phpmailer/src/Exception.php';
	require_once $projectRoot . '/php/includes/phpmailer/src/PHPMailer.php';
	require_once $projectRoot . '/php/includes/phpmailer/src/SMTP.php';
}

require_once __DIR__ . '/env_load.php';
load_env($projectRoot . '/.env');

/**
 * Escape for HTML email parts.
 */
function h(string $s): string
{
	return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

const RIXIN_ALLOWED_EXTENSIONS = array(
	'stp', 'step', 'stl', 'igs', 'iges', 'prt', 'sldprt', 'sat', 'x_t',
	'jpg', 'png', 'pdf', 'jpeg', 'zip', 'rar',
);
const RIXIN_MAX_FILE_BYTES = 10485760;
const RIXIN_MAX_FILES = 5;
const RIXIN_MAX_TOTAL_BYTES = 26214400;

/**
 * @return list<array{path: string, name: string}>
 */
function collect_uploaded_attachments(): array
{
	if (!isset($_FILES['attachments']) || !is_array($_FILES['attachments']['name'])) {
		return array();
	}

	$attachments = array();
	$names = $_FILES['attachments']['name'];
	$tmpNames = $_FILES['attachments']['tmp_name'];
	$errors = $_FILES['attachments']['error'];
	$sizes = $_FILES['attachments']['size'];
	$totalSize = 0;

	foreach ($names as $index => $originalName) {
		if (!is_string($originalName) || $originalName === '') {
			continue;
		}

		$error = (int) ($errors[$index] ?? UPLOAD_ERR_NO_FILE);
		if ($error === UPLOAD_ERR_NO_FILE) {
			continue;
		}
		if ($error !== UPLOAD_ERR_OK) {
			throw new RuntimeException('One or more attachments could not be uploaded.');
		}

		if (count($attachments) >= RIXIN_MAX_FILES) {
			throw new RuntimeException('You can attach up to 5 files.');
		}

		$size = (int) ($sizes[$index] ?? 0);
		if ($size <= 0 || $size > RIXIN_MAX_FILE_BYTES) {
			throw new RuntimeException('Each file must be 10 MB or less.');
		}

		$totalSize += $size;
		if ($totalSize > RIXIN_MAX_TOTAL_BYTES) {
			throw new RuntimeException('Total attachment size must be 25 MB or less.');
		}

		$tmpPath = (string) ($tmpNames[$index] ?? '');
		if ($tmpPath === '' || !is_uploaded_file($tmpPath)) {
			throw new RuntimeException('Invalid attachment upload.');
		}

		$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
		if ($ext === '' || !in_array($ext, RIXIN_ALLOWED_EXTENSIONS, true)) {
			throw new RuntimeException('File type not allowed: ' . $originalName);
		}

		$safeName = preg_replace('/[^\w.\-]+/u', '_', basename($originalName));
		if ($safeName === '' || $safeName === '.' || $safeName === '..') {
			$safeName = 'attachment.' . $ext;
		}

		$attachments[] = array(
			'path' => $tmpPath,
			'name' => $safeName,
		);
	}

	return $attachments;
}

$smtpHost = env('SMTP_HOST');
$smtpPort = env('SMTP_PORT', '465');
$smtpUser = env('SMTP_USER');
$smtpPass = env('SMTP_PASS');
$mailTo   = env('MAIL_TO');
$mailFrom = env('MAIL_FROM', $smtpUser);
$mailFromName = env('MAIL_FROM_NAME', 'RIXIN Precision Molding');
$successRedirect = env('SUCCESS_REDIRECT');
$mailDebug = strtolower(env('MAIL_DEBUG', 'false')) === 'true';

if ($smtpHost === '' || $smtpUser === '' || $smtpPass === '' || $mailTo === '') {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'CONFIG_INCOMPLETE',
			array('error_message' => 'Email service is not configured. Please set .env on the server.')
		)
	);
}

if (isset($_POST['honeypot']) && trim((string) $_POST['honeypot']) !== '') {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'',
			array('error_message' => 'Request could not be processed.')
		)
	);
}

if (!isset($_POST['email'], $_POST['service_type'], $_POST['message'])) {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'MISSING_REQUIRED_FIELDS',
			array('error_message' => 'Please fill in email, category, and message.')
		)
	);
}

$contactName  = trim((string) ($_POST['contact_name'] ?? ''));
$companyName  = trim((string) ($_POST['company_name'] ?? ''));
$phone        = trim((string) ($_POST['phone'] ?? ''));
$visitorEmail = trim((string) $_POST['email']);
$serviceType  = trim((string) $_POST['service_type']);
$bodyText     = trim((string) $_POST['message']);

if ($visitorEmail === '' || $serviceType === '' || $bodyText === '') {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'MISSING_REQUIRED_FIELDS',
			array('error_message' => 'Please fill in email, category, and message.')
		)
	);
}

if ($contactName === '' && $companyName === '') {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'MISSING_REQUIRED_FIELDS',
			array('error_message' => 'Please provide your name or company name.')
		)
	);
}

if (!filter_var($visitorEmail, FILTER_VALIDATE_EMAIL)) {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'INVALID_EMAIL',
			array('error_message' => 'Please enter a valid email address.')
		)
	);
}

$contactNamePlain = mb_substr($contactName, 0, 200, 'UTF-8');
$companyNamePlain = mb_substr($companyName, 0, 200, 'UTF-8');
$phonePlain         = mb_substr($phone, 0, 50, 'UTF-8');
$visitorEmailPlain  = $visitorEmail;
$serviceTypePlain   = mb_substr($serviceType, 0, 100, 'UTF-8');
$bodyPlain          = $bodyText;
$ip                 = get_client_ip();
$submittedAtUtc     = gmdate('Y-m-d H:i:s') . ' UTC';

$displayNamePlain = $contactNamePlain !== '' ? $contactNamePlain : $companyNamePlain;

$contactNameEsc = h($contactNamePlain);
$companyNameEsc = h($companyNamePlain);
$phoneEsc       = h($phonePlain);
$visitorEmailEsc = h($visitorEmailPlain);
$serviceTypeEsc  = h($serviceTypePlain);
$bodyHtml        = nl2br(h($bodyPlain), false);
$ipEsc           = h($ip);
$submittedEsc    = h($submittedAtUtc);

$nameRowHtml = '';
$companyRowHtml = '';
$phoneRowHtml = '';
$nameRowPlain = '';
$companyRowPlain = '';
$phoneRowPlain = '';

if ($contactNamePlain !== '') {
	$nameRowHtml = '<tr><td style="border:1px solid #ddd;background:#f7f7f7;width:140px;"><strong>Name</strong></td>
<td style="border:1px solid #ddd;">' . $contactNameEsc . '</td></tr>';
	$nameRowPlain = "Name: {$contactNamePlain}\n";
}
if ($companyNamePlain !== '') {
	$companyRowHtml = '<tr><td style="border:1px solid #ddd;background:#f7f7f7;width:140px;"><strong>Company</strong></td>
<td style="border:1px solid #ddd;">' . $companyNameEsc . '</td></tr>';
	$companyRowPlain = "Company: {$companyNamePlain}\n";
}
if ($phonePlain !== '') {
	$phoneRowHtml = '<tr><td style="border:1px solid #ddd;background:#f7f7f7;"><strong>Phone</strong></td>
<td style="border:1px solid #ddd;">' . $phoneEsc . '</td></tr>';
	$phoneRowPlain = "Phone: {$phonePlain}\n";
}

$htmlBody = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#222;">
<p style="margin:0 0 12px;">You have received a new <strong>manufacturing inquiry</strong> from the RIXIN website.</p>
<table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;max-width:560px;">
{$nameRowHtml}{$companyRowHtml}{$phoneRowHtml}
<tr><td style="border:1px solid #ddd;background:#f7f7f7;width:140px;"><strong>From (reply-to)</strong></td>
<td style="border:1px solid #ddd;">{$visitorEmailEsc}</td></tr>
<tr><td style="border:1px solid #ddd;background:#f7f7f7;"><strong>Category</strong></td>
<td style="border:1px solid #ddd;">{$serviceTypeEsc}</td></tr>
<tr><td style="border:1px solid #ddd;background:#f7f7f7;vertical-align:top;"><strong>Message</strong></td>
<td style="border:1px solid #ddd;">{$bodyHtml}</td></tr>
<tr><td style="border:1px solid #ddd;background:#f7f7f7;"><strong>Submitted</strong></td>
<td style="border:1px solid #ddd;">{$submittedEsc}</td></tr>
<tr><td style="border:1px solid #ddd;background:#f7f7f7;"><strong>Client IP</strong></td>
<td style="border:1px solid #ddd;">{$ipEsc}</td></tr>
</table>
<p style="margin:16px 0 0;font-size:13px;color:#666;">This message was sent automatically from the website contact workflow. Reply directly to the visitor using the address above.</p>
</body>
</html>
HTML;

$plainBody = "Manufacturing inquiry — RIXIN website\n\n";
$plainBody .= $nameRowPlain;
$plainBody .= $companyRowPlain;
$plainBody .= $phoneRowPlain;
$plainBody .= "From: {$visitorEmailPlain}\n";
$plainBody .= "Category: {$serviceTypePlain}\n\n";
$plainBody .= "Message:\n{$bodyPlain}\n\n";
$plainBody .= "Submitted: {$submittedAtUtc}\n";
$plainBody .= "Client IP: {$ip}\n";

$mailSubject = '[RIXIN Inquiry] ' . $displayNamePlain . ' - ' . $serviceTypePlain;
$mail = null;

try {
	$uploadedAttachments = collect_uploaded_attachments();
	$mail = new PHPMailer(true);
	$mail->isSMTP();
	$mail->Host       = $smtpHost;
	$mail->SMTPAuth   = true;
	$mail->Username   = $smtpUser;
	$mail->Password   = $smtpPass;
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
	$mail->Port       = (int) $smtpPort;
	$mail->CharSet    = 'UTF-8';

	$mail->setFrom($mailFrom, $mailFromName);
	$mail->addAddress($mailTo);
	$mail->addReplyTo($visitorEmailPlain);

	$mail->Subject = $mailSubject;
	$mail->isHTML(true);
	$mail->Body    = $htmlBody;
	$mail->AltBody = $plainBody;

	foreach ($uploadedAttachments as $attachment) {
		$mail->addAttachment($attachment['path'], $attachment['name']);
	}

	$mail->send();

	$extraJson = null;
	if ($successRedirect !== '') {
		$extraJson = array('redirect' => $successRedirect);
	}

	returnAndExitAjaxResponse(
		constructAjaxResponseArray(true, '', $extraJson)
	);
} catch (RuntimeException $e) {
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'INVALID_ATTACHMENT',
			array('error_message' => $e->getMessage())
		)
	);
} catch (MailException $e) {
	$actualError = '';
	if ($mail instanceof PHPMailer && isset($mail->ErrorInfo) && trim((string) $mail->ErrorInfo) !== '') {
		$actualError = trim((string) $mail->ErrorInfo);
	} elseif (trim($e->getMessage()) !== '') {
		$actualError = trim($e->getMessage());
	} else {
		$actualError = 'Unknown PHPMailer error.';
	}

	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'MAIL_ERROR',
			array(
				'error_message' => $mailDebug ? $actualError : 'The message could not be sent. Please try again later.',
				'debug_error' => $actualError,
			)
		)
	);
} catch (Throwable $e) {
	$actualError = trim($e->getMessage()) !== '' ? trim($e->getMessage()) : 'Unknown runtime error.';
	returnAndExitAjaxResponse(
		constructAjaxResponseArray(
			false,
			'MAIL_ERROR',
			array(
				'error_message' => $mailDebug ? $actualError : 'The message could not be sent. Please try again later.',
				'debug_error' => $actualError,
			)
		)
	);
}

/*
	Construct ajax response array
	Input: Result (bool), Message (optional), Data to be sent back in array
*/
function constructAjaxResponseArray($_response, $_message = '', $_json = null)
{
	$_responseArray = array();
	$_response = ($_response === true) ? true : false;
	$_responseArray['response'] = $_response;
	if (isset($_message)) {
		$_responseArray['message'] = $_message;
	}
	if (isset($_json)) {
		$_responseArray['json'] = $_json;
	}

	return $_responseArray;
}

/*
	Returns in the Gframe ajax format.
	Input: data array processed by constructAjaxResponseArray ()
	Outputs as a html stream then exits.
*/
function returnAndExitAjaxResponse($_ajaxResponse)
{
	if (!$_ajaxResponse) {
		$_ajaxResponse = array('response' => false, 'message' => 'Unknown error occurred.');
	}
	header('Content-Type: application/json; charset=utf-8');
	echo json_encode($_ajaxResponse);
	die();
}

function get_client_ip(): string
{
	if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		return (string) $_SERVER['HTTP_CLIENT_IP'];
	}
	if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		return (string) $_SERVER['HTTP_X_FORWARDED_FOR'];
	}
	if (!empty($_SERVER['HTTP_X_FORWARDED'])) {
		return (string) $_SERVER['HTTP_X_FORWARDED'];
	}
	if (!empty($_SERVER['HTTP_FORWARDED_FOR'])) {
		return (string) $_SERVER['HTTP_FORWARDED_FOR'];
	}
	if (!empty($_SERVER['HTTP_FORWARDED'])) {
		return (string) $_SERVER['HTTP_FORWARDED'];
	}
	if (!empty($_SERVER['REMOTE_ADDR'])) {
		return (string) $_SERVER['REMOTE_ADDR'];
	}
	return 'UNKNOWN';
}
