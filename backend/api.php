<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
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

// Get the resource from the URL
$request_method = $_SERVER['REQUEST_METHOD'];
$resource = isset($_GET['resource']) ? $_GET['resource'] : '';

// Route requests based on resource
switch ($resource) {
    case 'blogs':
        handleBlogs($request_method, $conn);
        break;
    case 'comments':
        handleComments($request_method, $conn);
        break;
    case 'categories':
        handleCategories($request_method, $conn);
        break;
    default:
        echo json_encode(["error" => "Invalid resource requested"]);
        break;
}

function handleBlogs($method, $conn) {
    if ($method === 'POST') {
        // Handle POST (Insert Blog)
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['title'], $data['content'], $data['author'], $data['user_id'])) {
            $title = $data['title'];
            $content = $data['content'];
            $author = $data['author'];
            $user_id = $data['user_id'];

            $stmt = $conn->prepare("INSERT INTO blogs (title, content, author, user_id) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("sssi", $title, $content, $author, $user_id);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Blog created successfully"]);
            } else {
                echo json_encode(["error" => "Failed to create blog"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Missing required fields"]);
        }
    } elseif ($method === 'GET') {
        // Handle GET (Get Blogs)
        $sql = "SELECT * FROM blogs";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $blogs = [];
            while ($row = $result->fetch_assoc()) {
                $blogs[] = $row;
            }
            echo json_encode($blogs);
        } else {
            echo json_encode(["message" => "No blogs found"]);
        }
    } else {
        echo json_encode(["error" => "Invalid method for blogs"]);
    }
}

function handleComments($method, $conn) {
    if ($method === 'POST') {
        // Handle POST (Insert Comment)
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['blog_id'], $data['user_id'], $data['comment_text'])) {
            $blog_id = $data['blog_id'];
            $user_id = $data['user_id'];
            $comment_text = $data['comment_text'];

            $stmt = $conn->prepare("INSERT INTO comments (blog_id, user_id, comment_text) VALUES (?, ?, ?)");
            $stmt->bind_param("iis", $blog_id, $user_id, $comment_text);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Comment added successfully"]);
            } else {
                echo json_encode(["error" => "Failed to add comment"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Missing required fields"]);
        }
    } elseif ($method === 'GET') {
        // Handle GET (Get Comments for a specific Blog)
        $blog_id = isset($_GET['blog_id']) ? (int)$_GET['blog_id'] : 0;
        if ($blog_id > 0) {
            $sql = "SELECT * FROM comments WHERE blog_id = ?";
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
                echo json_encode(["message" => "No comments found"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Invalid blog ID"]);
        }
    } else {
        echo json_encode(["error" => "Invalid method for comments"]);
    }
}

function handleCategories($method, $conn) {
    if ($method === 'POST') {
        // Handle POST (Insert Category)
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['name'])) {
            $name = $data['name'];

            $stmt = $conn->prepare("INSERT INTO categories (name) VALUES (?)");
            $stmt->bind_param("s", $name);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Category created successfully"]);
            } else {
                echo json_encode(["error" => "Failed to create category"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["error" => "Category name is required"]);
        }
    } elseif ($method === 'GET') {
        // Handle GET (Get Categories)
        $sql = "SELECT * FROM categories";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $categories = [];
            while ($row = $result->fetch_assoc()) {
                $categories[] = $row;
            }
            echo json_encode($categories);
        } else {
            echo json_encode(["message" => "No categories found"]);
        }
    } else {
        echo json_encode(["error" => "Invalid method for categories"]);
    }
}

$conn->close();
?>
