<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "awaj2";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// POST method - Insert new tag
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'];

    // Validate input
    if (empty($name)) {
        echo json_encode(["error" => "Tag name is required."]);
        exit;
    }

    // Insert tag into the database
    $stmt = $conn->prepare("INSERT INTO tags (name) VALUES (?)");
    $stmt->bind_param("s", $name);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Tag created successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to create tag."]);
    }

    $stmt->close();
}

// GET method - Retrieve all tags
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM tags";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $tags = [];
        while($row = $result->fetch_assoc()) {
            $tags[] = $row;
        }
        echo json_encode($tags);
    } else {
        echo json_encode(["message" => "No tags found."]);
    }
}

$conn->close();
?>
