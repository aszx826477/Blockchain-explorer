<?php
    include "functions.php";

    # fetch data from POST FORM
    $from = $_POST["afrom"];
    $to = $_POST["ato"];
    $publick = $_POST["apublick"];
    $privatek = $_POST["aprivatek"];
    $amount = (float) $_POST["aamount"];
    $carryFee = (float) $_POST["acarryFee"];
    $functionName = $_POST["afunctionName"];
    $inputDataAfid = $_POST["ainputDataAfid"];


    # info of POST
    $info = [ 
        "from" => $from,
        "to" => $to,
        "publick" => $publick,
        "privatek" => $privatek,
        "amount" => $amount,
        "carrayFee" => $carryFee,
        "functionName" => $functionName,
        "inputDataAfid" => $inputDataAfid
    ];

    # generate contract call post data
    $contract_call = [
        "from" => $from,
        "to" => $to,
        "publick" => $publick,
        "privatek" => $privatek,
        "amount" => $amount,
        "carrayFee" => $carryFee,
        "functionName" => $functionName,
        "inputDataAfid" => $inputDataAfid
    ];


    # Apply a contract-call tx
    $url = "http://159.138.135.42:8008/contractCall";
    $curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($contract_call));
	curl_setopt($curl, CURLOPT_HTTPHEADER, null);
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

    echo "txid=",$txid,"<br/>resp=",$resp;

?>