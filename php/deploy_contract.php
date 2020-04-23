<?php
    include "functions.php";

    # fetch data from POST FORM
    $from = $_POST["dfrom"];
    $publick = $_POST["dpublick"];
    $privatek = $_POST["dprivatek"];
    $amount = (float) $_POST["damount"];
    $carryFee = (float) $_POST["dcarryFee"];
    $contractAfid = $_POST["dcontractAfid"];
    $varAfid = $_POST["dvarAfid"];


    # info of POST
    $info = [ 
        "from" => $from,
        "publick" => $publick,
        "privatek" => $privatek,
        "amount" => $amount,
        "carrayFee" => $carryFee,
        "contractAfid" => $contractAfid,
        "varAfid" => $varAfid
    ];

    # generate contract deploy post data
    $contract_deploy = [
        "from" => $from,
        "amount" => $amount,
        "carryFee" => $carryFee,
        "contractAfid" => $contractAfid,
        "varAfid" => $varAfid
    ];

    # apply a contract deploy tx
    $url = "http://159.138.135.42:8008/contractDeploy";
    $curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($contract_deploy));
	curl_setopt($curl, CURLOPT_HTTPHEADER, null);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $resp = curl_exec($curl);
    curl_close($curl);

    # tranfer string json $resp to php associative array
    $unsigned_tx = json_decode($resp, TRUE);
    $txid = $unsigned_tx["data"]["tx"]["id"];
    # save the ctAddr
    $ctAddr = $unsigned_tx["data"]["ctAddr"];
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

    echo "txid=",$txid,"<br/>ctAddr=",$ctAddr,"<br/>resp=",$resp;
?>