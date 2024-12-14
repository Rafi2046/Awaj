<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "16181142015_C00lDude";
$dbname = "awaj";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capture input data
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];
    $email = $data['email'];
    $message = $data['message'];

    // Validate input
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    // Insert the message into the database
    $stmt = $conn->prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $message);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Thank you for reaching out! We will get back to you soon."]);
    } else {
        echo json_encode(["error" => "Failed to save message. Please try again later."]);
    }

    $stmt->close();
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retrieve all messages (admin feature)
    $result = $conn->query("SELECT * FROM contact_messages ORDER BY submitted_at DESC");

    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    echo json_encode($messages);
}

$conn->close();
