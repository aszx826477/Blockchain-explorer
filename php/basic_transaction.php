<?php
    include "functions.php";

    # fetch data from POST FORM
    $from_add = $_POST["from_add"];
    $received_add = $_POST["received_add"];
    $amount = (float) $_POST["amount"];
    $auxdata = $_POST["auxdata"];
    $publick = $_POST["publick"];
    $privatek = $_POST["privatek"];
    $fee = (float) $_POST["fee"];

    # the POST info
    $info = [
        "from" => $from_add,
        "to" => $received_add,
        "amount" =>  $amount,
        "auxdata" => $auxdata,
        "publick" => $publick,
        "privatek" => $privatek,
        "carryFee" => $fee
    ];

    # generate basic transaction post data
    $basic_transaction = [
        "from" => $from_add,
        "to" => $received_add,
        "amount" =>  $amount,
        "auxdata" => $auxdata,
        "carryFee" => $fee
    ];

    # apply a transfer tx
    $url = "http://159.138.135.42:8008/transferTx";
    $header = [
        "Content-Type" => "application/json"
    ];
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($basic_transaction));
	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $resp = curl_exec($curl);
    curl_close($curl);

    # tranfer string json $resp to php associative array
    $unsigned_tx = json_decode($resp, TRUE);
    $txid = $unsigned_tx["data"]["tx"]["id"];
    # sign the returned unsigned tx
    $signed_tx = sign($unsigned_tx, $publick, $privatek);

    # submit the signed transaction
    $url = "http://159.138.135.42:8008/signedTx";
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($signed_tx));
	curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $resp = curl_exec($curl);
    curl_close($curl);

    echo "<br/>txid=",$txid,"<br/>resp=",$resp;

?>