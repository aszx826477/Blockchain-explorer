<?php
    function sign($unsigned_tx, $pubk, $privk) {
        /**
         * Sign an unsigned tx using signSDK
         * 
         * @param array $unsigned_tx unsigned transation
         * @param string $publick your public key hex
         * @param string $privk your private key hex
         * @return array $tx signed transation
         */
        $tx = $unsigned_tx["data"]["tx"];
        # change php working dictionary
        chdir("../signSDK");
        # generate unsignedTx.json
        $file = fopen("unsignedTx.json", "w");
        fwrite($file, json_encode($tx));
        fclose($file);
        $key = [
            "privKeyHex" => $privk,
            "pubKeyHex" => $pubk
        ];
        # generate key.json
        $key_file = fopen("key.json", "w");
        fwrite($key_file, json_encode($key));
        fclose($key_file);
        # call the signSDK tool
        exec("./signSDK", $output);
        $sig = $output[1]; # "tx signature xxxxxxxxxx"
        $sig = substr($sig, 14); # xxxxxxxxxx
        $tx["signature"] = $sig;
        return $tx;
    }
?>