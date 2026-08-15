<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$allowedOrigins = [
    'https://qnapper.nl',
    'https://www.qnapper.nl',
    'https://opslagbijjou-creator.github.io',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'message' => 'Alleen POST-verzoeken zijn toegestaan.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput ?: '', true);
if (!is_array($data)) {
    $data = $_POST;
}

if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$schoolLevel = trim((string) ($data['schoolLevel'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$textLength = static fn (string $value): int => function_exists('mb_strlen')
    ? mb_strlen($value, 'UTF-8')
    : strlen($value);

if ($name === '' || $textLength($name) > 100) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Vul een geldige naam in.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $textLength($email) > 160) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Vul een geldig e-mailadres in.']);
    exit;
}

if ($message === '' || $textLength($message) > 2000 || $textLength($phone) > 40 || $textLength($schoolLevel) > 80) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Controleer de ingevulde gegevens.']);
    exit;
}

$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);
$subject = 'Nieuwe kennismakingsaanvraag via qnapper.nl';
$encodedSubject = function_exists('mb_encode_mimeheader')
    ? mb_encode_mimeheader($subject, 'UTF-8')
    : $subject;

$bodyLines = [
    'Nieuwe aanvraag via de Qnapper-website',
    '',
    'Naam: ' . $safeName,
    'E-mailadres: ' . $safeEmail,
    'Telefoonnummer: ' . ($phone !== '' ? $phone : 'Niet ingevuld'),
    'Klas / niveau: ' . ($schoolLevel !== '' ? $schoolLevel : 'Niet ingevuld'),
    '',
    'Bericht:',
    $message,
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Qnapper Website <info@qnapper.nl>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
];

$sent = mail(
    'info@qnapper.nl',
    $encodedSubject,
    implode("\r\n", $bodyLines),
    implode("\r\n", $headers)
);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Het bericht kon niet worden verzonden.']);
    exit;
}

echo json_encode(['ok' => true]);
