<?php
    include "../../inc/function/function-SQL.php";
    include "../../inc/function/function.php";

    $date = $_GET["date"];
    echo json_encode(get_transactions($date));
?>