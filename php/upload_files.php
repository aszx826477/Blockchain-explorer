<?php
    function post_file($storage, $days, $file_save_path, $field) {
        $file_post = [
            "storage" => $storage,
            "days" => $days,
            "file" => "@".$file_save_path,
            "field" => $field
        ];
    
        # upload the contract and var file to bfs Server
        $url = "http://159.138.135.42:8100";
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $file_post);
        curl_setopt($curl, CURLOPT_HTTPHEADER, null);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $resp = curl_exec($curl);
        $afid = json_decode($resp, TRUE)["data"]["afid"];
        curl_close($curl);

        return $afid;
    }

    # fetch data from POST FORM
    $storage = (float) $_POST["storage"];
    $days = (float) $_POST["days"];
    $field = $_POST["field"];
    $filesNum = (float) $_POST["filesNum"];
    $files = $_FILES["files"];

    $afid = [];

    for ($i=0; $i < $filesNum; $i++) {
        $file_name = $files["name"][$i];
        $file_tmp_path = $files["tmp_name"][$i];
        $file_save_path = "/var/www/blockchain/upload/" . $file_name;
        move_uploaded_file($file_tmp_path, $file_save_path);
        $afid[$file_name] = post_file($storage, $days, $file_save_path, $field);
    }
    
    # info of POST
    $info = [
        "storage" => $storage,
        "days" => $days,
        "field" => $field,
        "afid" => $afid,
    ];

    echo json_encode($afid);

?>