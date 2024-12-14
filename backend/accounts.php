<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
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
    $fName = $data['fName'];
    $uName = $data['uName'];
    $email = $data['email'];
    $age = $data['age'];
    $bCirtificate = $data['bCirtificate'];
    $password = $data['password'];
    $proPic = $data['proPic'];

    // Validate input
    if (empty($fName) || empty($uName) || empty($email) || empty($age) || empty($bCirtificate) || empty($password) || empty($proPic)) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    // Insert the signup information into the database
    $stmt = $conn->prepare("INSERT INTO accounts (fName, uName, email, age, bCirtificate, password, proPic) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $fName, $uName, $email, $age, $bCirtificate, $password, $proPic);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Account created successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to create account. Please try again later."]);
    }

    $stmt->close();
}

$conn->close();
