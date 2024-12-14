<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "awaj";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Handle POST Request (Insert a new comment)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['blog_id'], $data['user_id'], $data['comment_text'])) {
        $blog_id = $data['blog_id'];
        $user_id = $data['user_id'];
        $comment_text = $data['comment_text'];

        // Insert comment data into the database
        $stmt = $conn->prepare("INSERT INTO comments (blog_id, user_id, comment_text) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $blog_id, $user_id, $comment_text);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Comment added successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add comment"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Required fields are missing"]);
    }
}

// Handle GET Request (Retrieve comments for a specific blog)
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $blog_id = isset($_GET['blog_id']) ? (int)$_GET['blog_id'] : 0;

    if ($blog_id > 0) {
        $sql = "SELECT cm.comment_id, cm.comment_text, cm.created_at, u.username
                FROM comments cm
                LEFT JOIN users u ON cm.user_id = u.user_id
                WHERE cm.blog_id = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $blog_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $comments = [];
            while ($row = $result->fetch_assoc()) {
                $comments[] = $row;
            }
            echo json_encode($comments);
        } else {
            echo json_encode(["message" => "No comments found for this blog"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Invalid blog ID"]);
    }
}

$conn->close();
?>
