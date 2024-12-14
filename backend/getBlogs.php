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

// Handle POST Request (Insert a new blog)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (isset($data['title'], $data['content'], $data['author'], $data['user_id'])) {
        $title = $data['title'];
        $content = $data['content'];
        $author = $data['author'];
        $user_id = $data['user_id'];

        // Insert blog data into the database
        $stmt = $conn->prepare("INSERT INTO blogs (title, content, author, user_id) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $title, $content, $author, $user_id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Blog created successfully"]);
        } else {
            echo json_encode(["error" => "Failed to create blog"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Required fields are missing"]);
    }
}

// Handle GET Request (Retrieve all blogs with their tags and comments)
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT b.blog_id, b.title, b.content, b.author, b.created_at, c.name AS category, t.name AS tag, cm.comment_text
            FROM blogs b
            LEFT JOIN blogs_tags bt ON b.blog_id = bt.blog_id
            LEFT JOIN tags t ON bt.tag_id = t.tag_id
            LEFT JOIN comments cm ON b.blog_id = cm.blog_id
            LEFT JOIN categories c ON b.blog_id = c.category_id";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $blogs = [];
        while($row = $result->fetch_assoc()) {
            $blogs[] = $row;
        }
        echo json_encode($blogs);
    } else {
        echo json_encode(["message" => "No blogs found"]);
    }
}

$conn->close();
?>
