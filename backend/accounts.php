<?php
// Set headers for JSON response and CORS
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "awaj2";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Handle POST request (Insert Data)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capture input data
    $data = json_decode(file_get_contents("php://input"), true);

    // Extract and validate input
    $fName = $data['fName'] ?? null;
    $uName = $data['uName'] ?? null;
    $email = $data['email'] ?? null;
    $age = $data['age'] ?? null;
    $bCirtificate = $data['bCirtificate'] ?? null;
    $password = $data['password'] ?? null;
    $proPic = $data['proPic'] ?? 'default.png'; // Default profile picture if not provided

    // Check for missing fields
    if (!$fName || !$uName || !$email || !$age || !$bCirtificate || !$password) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    // Hash the password for security
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Prepare and execute SQL query
    $stmt = $conn->prepare("INSERT INTO accounts (fName, uName, email, age, bCirtificate, password, proPic) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $fName, $uName, $email, $age, $bCirtificate, $hashedPassword, $proPic);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Account created successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to create account. Error: " . $stmt->error]);
    }

    $stmt->close();
} 
// Handle GET request (Retrieve Data)
else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch all accounts from the database
    $sql = "SELECT fName, uName, email, age, bCirtificate, proPic, created_at FROM accounts";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $accounts = [];
        while ($row = $result->fetch_assoc()) {
            $accounts[] = $row;
        }
        echo json_encode($accounts);
    } else {
        echo json_encode(["message" => "No accounts found."]);
    }
} 
// Invalid Method
else {
    echo json_encode(["error" => "Invalid request method."]);
}

$conn->close();
?>
