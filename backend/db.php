<?php
// Database configuration
$host = "localhost";
$user = "root";
$password = "";
$database = "awaj2";

// Establish the database connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch data from the contact_messages table
$contactMessagesQuery = "SELECT * FROM contact_messages";
$contactMessagesResult = $conn->query($contactMessagesQuery);

echo "<h2>Contact Messages</h2>";
if ($contactMessagesResult->num_rows > 0) {
    while ($row = $contactMessagesResult->fetch_assoc()) {
        echo "ID: " . $row["id"] . 
             " - Name: " . $row["name"] . 
             " - Email: " . $row["email"] . 
             " - Message: " . $row["message"] . 
             " - Submitted At: " . $row["submitted_at"] . "<br>";
    }
} else {
    echo "No contact messages found.<br>";
}

// Query to fetch data from the accounts table
$accountsQuery = "SELECT * FROM accounts";
$accountsResult = $conn->query($accountsQuery);

echo "<h2>Accounts</h2>";
if ($accountsResult->num_rows > 0) {
    while ($row = $accountsResult->fetch_assoc()) {
        echo "ID: " . $row["id"] . 
             " - Full Name: " . $row["fName"] . 
             " - Username: " . $row["uName"] . 
             " - Email: " . $row["email"] . 
             " - Age: " . $row["age"] . 
             " - Birth Certificate: " . $row["bCirtificate"] . 
             " - Password: " . $row["password"] . 
             " - Profile Picture: " . $row["proPic"] . 
             " - Created At: " . $row["created_at"] . "<br>";
    }
} else {
    echo "No accounts found.<br>";
}

// Close the database connection
$conn->close();
?>
