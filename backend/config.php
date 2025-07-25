<?php
// Database configuration - Railway environment variables
define('DB_HOST', $_ENV['MYSQL_HOST'] ?? 'localhost');
define('DB_USERNAME', $_ENV['MYSQL_USER'] ?? 'root');
define('DB_PASSWORD', $_ENV['MYSQL_PASSWORD'] ?? '');
define('DB_NAME', $_ENV['MYSQL_DATABASE'] ?? 'streaming_website');
define('DB_PORT', $_ENV['MYSQL_PORT'] ?? '3306');

// Create database connection
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USERNAME,
        DB_PASSWORD,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Base URL configuration
define('BASE_URL', 'http://localhost/streaming/');
define('ASSETS_URL', BASE_URL . 'assets/');

// Enable CORS for API requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
?>
