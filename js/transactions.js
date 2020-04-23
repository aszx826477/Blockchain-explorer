function send_basic_form() {
    console.log("send_basic_form");
    $.ajax({
        type: "POST",
        dataType: "text",
        url: "php/basic_transaction.php",
        data: $('#basic_form').serialize(),
        success: function(data) {
            console.log(data);
            document.getElementById("receipt_basic_transaction").innerHTML = data;
        }
    })
}

function upload_files() {
    console.log("upload_files");

    // "upload_files" is the id of form which includes files data
    // FormData can serialize txt and also support mulitple-files
    // The name of multiple-file input should be set to XXXXX[]
    var formData = new FormData($('#upload_files')[0]);
    
    var filesData = $('#files')[0];
    formData.append("filesNum", filesData.files.length);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/upload_files.php",
        data: formData,
        processData: false, // using FormData so we don't need to serialize data
        contentType: false, // using FormData so the contentType should set by false
        success: function(data) {
            console.log(data);
            document.getElementById("receipt_upload_files").innerHTML = formatJson(data);
        }
    })
}

function download_file() {
    console.log("download_file");

    var fileID = $('#fileID').val();
    var fileName = $('#fileName').val();

    const a = document.createElement('a');
    a.setAttribute('href', "http://159.138.135.42:8100/" + fileID + "/" + fileName);
    a.setAttribute('download', fileName);
    a.setAttribute('target', '_blank');
    a.click();

   
}

function save_file(value, type, name) {
    var blob;
    if (typeof window.Blob == "function") {
        blob = new Blob([value], {type: type});
    } else {
        var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(value);
        blob = bb.getBlob(type);
    }
    var URL = window.URL || window.webkitURL;
    var bloburl = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    if ('download' in anchor) {
        anchor.style.visibility = "hidden";
        anchor.href = bloburl;
        anchor.download = name;
        document.body.appendChild(anchor);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        anchor.dispatchEvent(evt);
        document.body.removeChild(anchor);
    } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, name);
    } else {
        location.href = bloburl;
    }
}

function deploy_contract() {
    console.log("deploy_contract");
   
    // use FormData to transfer txt and file
    var formData = new FormData($('#deploy_contract')[0]);

    $.ajax({
        type: "POST",
        dataType: "text",
        url: "php/deploy_contract.php",
        data: formData,
        processData: false, // using FormData so we don't need to serialize data
        contentType: false, // using FormData so the contentType should set by false
        success: function(data) {
            console.log(data);
            document.getElementById("receipt_deploy_contract").innerHTML = data;
        }
    })
}

function apply_contract() {
    console.log("apply_contract");
   
    // use FormData to transfer txt and file
    var formData = new FormData($('#apply_contract')[0]);

    $.ajax({
        type: "POST",
        dataType: "text",
        url: "php/apply_contract.php",
        data: formData,
        processData: false, // using FormData so we don't need to serialize data
        contentType: false, // using FormData so the contentType should set by false
        success: function(data) {
            console.log(data);
            document.getElementById("receipt_apply_contract").innerHTML = data;
        }
    })
}


function formatJson(msg) {
	var rep = "~";
	var jsonStr = JSON.stringify(msg, null, rep)
	var str = "";
	for (var i = 0; i < jsonStr.length; i++) {
		var text2 = jsonStr.charAt(i)
		if (i > 1) {
			var text = jsonStr.charAt(i - 1)
			if (rep != text && rep == text2) {
				str += "<br/>"
			}
		}
		str += text2;
	}
	jsonStr = "";
	for (var i = 0; i < str.length; i++) {
		var text = str.charAt(i);
		if (rep == text)
			jsonStr += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
		else {
			jsonStr += text;
		}
		if (i == str.length - 2)
			jsonStr += "<br/>"
	}
	return jsonStr;
}