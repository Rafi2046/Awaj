<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "bloggingsystem";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, username, password, created_at FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Username: " . $row["username"]. " - Password: " . $row["password"]. " - Created At: " . $row["created_at"];
    }
} else {
    echo "0 results found.";
}

$conn->close();
?>
