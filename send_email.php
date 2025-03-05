<?php
// Set headers to handle AJAX request
header('Content-Type: application/json');

// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Process only POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
    
    // Validate inputs
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Please fill all fields with valid information']);
        exit;
    }
    
    // Telegram configuration
    $telegramBotToken = '7720898700:AAGkt8cll9sQ-AtnYew2A7s9VyQKM_KHpJQ';
    $telegramChatId = '420650653';
    
    // Format message for Telegram
    $telegramMessage = "New Contact Form Message\n\n";
    $telegramMessage .= "Name: " . $name . "\n";
    $telegramMessage .= "Email: " . $email . "\n";
    $telegramMessage .= "Message:\n" . $message;
    
    // Send to Telegram
    $success = sendToTelegram($telegramBotToken, $telegramChatId, $telegramMessage);
    
    if ($success) {
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to send message. Please try again later.']);
    }
    exit;
}

// Not a POST request
echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);

/**
 * Function to send message to Telegram
 * @param string $botToken Telegram Bot Token
 * @param string $chatId Telegram Chat ID
 * @param string $message Message to send
 * @return bool Success status
 */
function sendToTelegram($botToken, $chatId, $message) {
    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'chat_id' => $chatId,
        'text' => $message
    ]));
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    $result = curl_exec($ch);
    
    if(curl_errno($ch)) {
        error_log('Curl error: ' . curl_error($ch));
        curl_close($ch);
        return false;
    }
    
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if($httpCode !== 200) {
        error_log('Telegram API error. HTTP code: ' . $httpCode . ', Response: ' . $result);
        return false;
    }
    
    $response = json_decode($result, true);
    return isset($response['ok']) && $response['ok'] === true;
}
?>