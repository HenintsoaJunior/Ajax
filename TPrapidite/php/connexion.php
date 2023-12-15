<?php
function dbconnexion($dbName) {
	static $connect = null;
    if ($connect === null) {
        $connect = mysqli_connect('localhost', 'root', '', $dbName);
    }
    return $connect;
}
?>