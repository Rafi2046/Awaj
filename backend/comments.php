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

// POST method - Insert new comment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $blog_id = $data['blog_id'];
    $user_id = $data['user_id'];
    $comment_text = $data['comment_text'];

    // Validate input
    if (empty($blog_id) || empty($user_id) || empty($comment_text)) {
        echo json_encode(["error" => "All fields are required."]);
        exit;
    }

    // Insert comment into the database
    $stmt = $conn->prepare("INSERT INTO comments (blog_id, user_id, comment_text) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $blog_id, $user_id, $comment_text);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Comment added successfully!"]);
    } else {
        echo json_encode(["error" => "Failed to add comment."]);
    }

    $stmt->close();
}

// GET method - Retrieve all comments for a blog
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $blog_id = isset($_GET['blog_id']) ? $_GET['blog_id'] : null;

    if ($blog_id) {
        $sql = "SELECT * FROM comments WHERE blog_id = $blog_id";
    } else {
        $sql = "SELECT * FROM comments";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $comments = [];
        while($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        echo json_encode($comments);
    } else {
        echo json_encode(["message" => "No comments found."]);
    }
}

$conn->close();
?>
