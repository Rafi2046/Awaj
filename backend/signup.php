<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['fName'], $data['uName'], $data['email'], $data['age'], $data['bCirtificate'], $data['password'])) {
    $fName = $data['fName'];
    $uName = $data['uName'];
    $email = $data['email'];
    $age = $data['age'];
    $bCirtificate = $data['bCirtificate'];
    $password = password_hash($data['password'], PASSWORD_DEFAULT);

    // Insert into the database
    $sql = "INSERT INTO users (fName, uName, email, age, bCirtificate, password) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssiss", $fName, $uName, $email, $age, $bCirtificate, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User registered successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid input."]);
}

$conn->close();
?>
