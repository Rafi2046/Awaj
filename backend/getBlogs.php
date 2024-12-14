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

// POST method - Insert new blog
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $title = $data['title'];
    $content = $data['content'];
    $author = $data['author'];
    $user_id = $data['user_id'];

    // Validate input
    if (empty($title) || empty($content) || empty($author) || empty($user_id)) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    // Insert blog into the database
    $stmt = $conn->prepare("INSERT INTO blogs (title, content, author, user_id) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $title, $content, $author, $user_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Blog created successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to create blog."]);
    }

    $stmt->close();
}

// GET method - Retrieve all blogs
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM blogs";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $blogs = [];
        while($row = $result->fetch_assoc()) {
            $blogs[] = $row;
        }
        echo json_encode($blogs);
    } else {
        echo json_encode(["message" => "No blogs found."]);
    }
}

$conn->close();
?>
