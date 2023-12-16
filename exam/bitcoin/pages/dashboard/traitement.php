<?php
    include "../../inc/function/function-SQL.php";
    include "../../inc/function/function.php";

    $date_init = $_POST['date'];
    $n_days = $_POST['day'];
    $line_sell = $_POST['nbsale'];
    $q_sell_min = $_POST['minsell'];
    $q_sell_max = $_POST['maxsell'];
    $line_buy = $_POST['nbbuy'];
    $q_buy_min = $_POST['min'];
    $q_buy_max = $_POST['max'];

    echo json_encode(generate_rate_all_day($date_init, $n_days, $line_sell, $q_sell_min, $q_sell_max, $line_buy, $q_buy_min, $q_buy_max));
?>