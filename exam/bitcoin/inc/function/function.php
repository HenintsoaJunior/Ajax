<?php
    function db_connect()
    {
        static $db = null;
        if($db == null)
        { $db =  database_mysql("bitcoin"); }
        return $db;
    }

    function get_bitcoin()
    { return select_values(db_connect(), "initial_rate"); }

    function get_month_day($month, $year)
    {
        $month_days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        $days = $month_days[$month];
        
        if($year % 4 == 0 && $days == 28)
        { return 29; }
        return $days;
    }

    function reset_database()
    {
        delete_values(db_connect(), "transaction_bitcoin", "1=1");
    }

    function generate_dates($date_init, $ndays)
    {
        $date_parts = explode("-", $date_init);
        
        $day = (int)$date_parts[2];
        $month = (int)$date_parts[1];
        $year = (int)$date_parts[0];
        
        $dates = [$date_init];
        for($i = 1, $d = $day + 1; $i < $ndays; $i++, $d++)
        {   
            if($d > get_month_day($month, $year))
            {
                $d = 1;
                $month++;
            }
            
            if($month > 12)
            {
                $month = 1;
                $year++;
            }
            
            $month_format = $month;
            if($month < 10)
            { $month_format = "0$month"; }
            $day_format = $d;
            if($d < 10)
            { $day_format = "0$d"; }
            
            $dates[] = $year."-".$month_format."-".$day_format;
        }
        return $dates;
    }

    function generate_transaction($bitcoin, $type, $quantity_min, $quantity_max, $date)
    {
        $quantity = rand($quantity_min, $quantity_max);
        if($type == "Vente")
        { $price = $bitcoin["value"] * (1 - rand(-10, 2)/100); }
        else if($type == "Achat")
        { $price = $bitcoin["value"] * (1 - rand(-2, 10)/100); }
        
        insert_transaction($bitcoin["name"], $type, $date, $price, $quantity);
        return ["price" => $price, "quantity" => $quantity];
    }

    function generate_transactions($bitcoin, $type, $quantity_min, $quantity_max, $nrow, $array, $date)
    {
        for($i = 0; $i < (int)$nrow; $i++)
        { $array[] = generate_transaction($bitcoin, $type, $quantity_min, $quantity_max, $date); }
        
        return $array;
    }

    function get_rate($transactions)
    {
        $sum = 0;
        $count = 0;
        foreach($transactions as $transaction)
        {
            $sum += $transaction["price"] * $transaction["quantity"];
            $count += $transaction["quantity"];
        }
        
        return $sum / $count;
    }

    function generate_rate_all($date, $bitcoins, $line_sell, $q_sell_min, $q_sell_max, $line_buy, $q_buy_min, $q_buy_max)
    {
        $rates = array();
        for($i = 0; $i < count($bitcoins); $i++)
        {
            $transactions = array();
            $transactions = generate_transactions($bitcoins[$i], "Vente", $q_sell_min, $q_sell_max, $line_sell, $transactions, $date);
            $transactions = generate_transactions($bitcoins[$i], "Achat", $q_buy_min, $q_buy_max, $line_buy, $transactions, $date);
            
            $rates[$i]["name"] = $bitcoins[$i]["name"];
            $rates[$i]["value"] = get_rate($transactions);
        }
        
        return $rates;
    }

    function generate_rate_all_day($date_init, $ndays, $line_sell, $q_sell_min, $q_sell_max, $line_buy, $q_buy_min, $q_buy_max)
    {
        reset_database();
        $dates = generate_dates($date_init, $ndays);
        
        $rate_progress = array();
        $rates = get_bitcoin();
        foreach($dates as $date)
        {
            $rates = generate_rate_all($date, $rates, $line_sell, $q_sell_min, $q_sell_max, $line_buy, $q_buy_min, $q_buy_max);
            $rate_progress[$date] = $rates;
        }
        
        return $rate_progress;
    }

    function insert_transaction($bitcoin, $category, $date, $price, $quantity)
    {
        insert_values(db_connect(), "transaction_bitcoin", ["'$bitcoin'", "'$category'", "'$date'", $price, $quantity], ["bitcoin", "category", "date", "price", "quantity"]);
    }

    function get_transactions($date)
    {
        return select_values(db_connect(), "transaction_bitcoin", [], ["*"], "date = '$date'");
    }
?>