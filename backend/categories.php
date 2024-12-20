<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "16181142015_C00lDude";
$dbname = "awaj";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// POST method - Insert new category
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];

    // Validate input
    if (empty($name)) {
        echo json_encode(["error" => "Category name is required."]);
        exit;
    }

    // Insert category into the database
    $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (?)");
    $stmt->bind_param("s", $name);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Category created successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to create category."]);
    }

    $stmt->close();
}

// GET method - Retrieve all categories
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM categories";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $categories = [];
        while($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        echo json_encode($categories);
    } else {
        echo json_encode(["message" => "No categories found."]);
    }
}

$conn->close();
?>
