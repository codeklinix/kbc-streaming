<?php
require_once '../config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->prepare("SELECT * FROM tv_streams WHERE is_active = 1 ORDER BY channel_name");
    $stmt->execute();
    $channels = $stmt->fetchAll();
    
    echo json_encode($channels);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
