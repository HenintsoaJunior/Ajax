<?php
    function database_postgres($database, $user = "postgres", $password = "43710", $host = "localhost")
    { return new PDO("pgsql:host=$host;port=5432;dbname=$database", $user, $password); }

    function database_mysql($database, $user = "root", $password = "", $host = "localhost")
    { return new PDO("mysql:host=$host;dbname=$database", $user, $password); }
    
    function database_get($database, $request)
    {
//        echo $request;
        $array = [];
        
        $query = $database->query($request);
        $query->setFetchMode(PDO::FETCH_ASSOC);
        
        while($data = $query->fetch())
        { $array[] = $data; }
        
        
        return $array;
    }

    function database_post($database, $request)
    { return $database->exec($request); }

    function select_values($database, $table, $joins = [], $columns = ["*"], $condition = "1=1", $sort = "")
    {
        $request = "SELECT %s FROM %s WHERE %s";
        
        $joining = $table;
        foreach($joins as $table => $join)
        { $joining .= " JOIN ".$table." ON ".$join; }
        
        if(!empty($sort))
        { $sort = " ORDER BY $sort"; }
        
        return database_get($database, sprintf($request.$sort, implode(", ", $columns), $joining, $condition));
    }

    function update_values($database, $table, $values, $condition)
    {
        $request = "UPDATE %s SET %s WHERE %s";
        return database_post($database, sprintf($request, $table, implode(", ", $values), $condition));
    }

    function delete_values($database, $table, $condition)
    {
        $request = "DELETE FROM %s WHERE %s";
        return database_post($database, sprintf($request, $table, $condition));
    }

    function insert_values($database, $table, array $values, $order = [])
    {
        if(!empty($order))
        { $order = "(".implode(", ", $order).")"; }
        else
        { $order = ""; }
        
        return database_post($database, sprintf("INSERT INTO %s VALUES(%s)", $table.$order, implode(", ", $values)));
    }

    function count_values($database, $table, $joins = [], $columns = ["*"], $condition = "1=1")
    {
        $request = "SELECT %s FROM %s WHERE %s";
        
        $joining = $table;
        foreach($joins as $table => $join)
        { $joining .= " JOIN ".$table." ON ".$join; }
        
        return database_count($database, sprintf($request, implode(", ", $columns), $joining, $condition));
    }

    function exist_values($database, $table, $joins = [], $columns = ["*"], $condition = "1=1")
    { return count_values($database, $table, $joins, $columns, $condition) > 0; }
?>