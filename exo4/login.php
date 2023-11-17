<?php

$hostname = "localhost";
$port = 5432;
$username = "postgres";
$password = "carasco20";
$database = "Ajax";

$conn = new PDO("pgsql:host=$hostname;port=$port;dbname=$database", $username, $password);

$email = $_POST['email'];
$password = $_POST['password'];
if(isset($email,$password)){
    $sql = "SELECT * FROM membre WHERE email=$email and pwd=$password";
    alert($sql);
}

?>
