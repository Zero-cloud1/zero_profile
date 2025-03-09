<?php
// กำหนด header สำหรับส่ง response แบบ JSON
header('Content-Type: application/json');

// ตรวจสอบว่าเป็น POST request หรือไม่
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // รับและ sanitize ข้อมูลจาก form
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
    
    // ตรวจสอบข้อมูลให้ครบถ้วนและถูกต้อง
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(
            ['status' => 'error', 'message' => 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง'],
            JSON_UNESCAPED_UNICODE
        );
        exit;
    }
    
    // กำหนดค่า Telegram Bot Token และ Chat ID
    // (แก้ให้ถูกต้องตามของคุณเอง)
    $telegramBotToken = '7720898700:AAGkt8cll9sQ-AtnYew2A7s9VyQKM_KHpJQ'; 
    $telegramChatId   = '6009494714'; // 
    
    // จัดรูปแบบข้อความที่จะส่งไปยัง Telegram
    $telegramMessage  = "New Contact Form Message\n\n";
    $telegramMessage .= "Name: " . $name . "\n";
    $telegramMessage .= "Email: " . $email . "\n";
    $telegramMessage .= "Message:\n" . $message;
    
    // ส่งข้อความไปยัง Telegram
    $success = sendToTelegram($telegramBotToken, $telegramChatId, $telegramMessage);
    
    if ($success) {
        echo json_encode(
            ['status' => 'success', 'message' => 'ส่งข้อความเรียบร้อยแล้ว'],
            JSON_UNESCAPED_UNICODE
        );
    } else {
        echo json_encode(
            ['status' => 'error', 'message' => 'ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'],
            JSON_UNESCAPED_UNICODE
        );
    }
} else {
    // ไม่ใช่ POST request
    echo json_encode(
        ['status' => 'error', 'message' => 'รูปแบบการร้องขอไม่ถูกต้อง'],
        JSON_UNESCAPED_UNICODE
    );
}

/**
 * ฟังก์ชันส่งข้อความไปยัง Telegram
 * @param string $botToken Telegram Bot Token
 * @param string $chatId Telegram Chat ID
 * @param string $message ข้อความที่จะส่ง
 * @return bool สถานะการส่งข้อความ
 */
function sendToTelegram($botToken, $chatId, $message) {
    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // ปิดการตรวจสอบ SSL (ในเซิร์ฟเวอร์จริง ควรตั้งเป็น true)
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'chat_id' => $chatId,
        'text'    => $message
    ]));
    
    $result = curl_exec($ch);
    
    if ($result === false) {
        $error = curl_error($ch);
        error_log("cURL error: " . $error);
        curl_close($ch);
        return false;
    }
    
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        error_log("Telegram API responded with HTTP Code: " . $httpCode . " Response: " . $result);
        return false;
    }
    
    $response = json_decode($result, true);
    return isset($response['ok']) && $response['ok'] === true;
}
?>
