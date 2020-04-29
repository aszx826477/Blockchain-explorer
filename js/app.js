const server_url = "http://139.9.228.218:4103/"

/*
count = new Vue({
    el: '#count',
    data: {
        count: "",
    },
    beforeCreate: function() {
        $.ajax({
            type: 'Get',
            url: server_url+"api/v2/wallets",
            success: function(data) {
                count.count = data.meta.totalCount;
                // console.log(count.count)
            }
        })
    }
});

*/
vum1 = new Vue({
    el: '#height',
    data: {
        height: "",
    },
    beforeCreate: function() {
        $.ajax({
            type: 'Get',
            dataType: "json",
            url: "http://159.138.135.42:8008/blockHeight",
            success: function(data) {
                console.log(data);
                vum1.height = data.data.blockHeight;
            }
        })

    }
});

height = setInterval(function(){
    $.ajax({
        type: 'Get',
        dataType: "json",
        url: "http://159.138.135.42:8008/blockHeight",
        success: function(data) {
            vum1.height = data.data.blockHeight;
        }
    })
},5000);

/*
vum = new Vue({
    el: '#app',
    data: {
        supply: "",
    },
    beforeCreate: function() {
        //supply=setInterval(function(){
        $.ajax({
            type: 'Get',
            url: server_url+"api/v2/blockchain",
            success: function(data) {
                // console.log(data)
                vum.supply = data.data.supply;
            }
        })
        //},5000);
    }
});
supply=setInterval(function(){
    $.ajax({
        type: 'Get',
        url: server_url+"api/v2/blockchain",
        success: function(data) {
            // console.log(data)
            vum.supply = data.data.supply;
        }
    })

},5000);
*/

//时间戳换
// function getLocalTime(nS) {     
//    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
// }
function getLocalTime(nS) {
    var date = new Date(parseInt(nS) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = change(date.getDate()) + ' ';
    h = change(date.getHours()) + ':';
    m = change(date.getMinutes()) + ':';
    s = change(date.getSeconds());
    return Y + M + D + h + m + s;
}
function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}
//公钥换名字
function publickeyusername(publicKey) {
    
    $.ajax({
        url: server_url+"api/delegates/get?publicKey="+publicKey,
        success:function(res){
            
            if(res.success){
                //console.log(res.delegate.username)
                // $(obj).html(res.delegate.username)
                return res.delegate.username
            }else{
                return publicKey
                // $(obj).html(publicKey)
            }
            
        }
    })
}

$('#search_button').click(function() {
    // get the input string from search bar
    var input = $('#search_content').val();
    var flag_1 = 0;
    var flag_2 = 0;
    var flag_3 = 0;
    // when input isn't NULL, return false
    if (input.length == 0) {
        $('#search_content').attr('placeholder','Please input txid, account or ctAddress');
        return false;
    }
    var count = 0;
    
    
    var ajax1 = $.ajax({
        // query account status
        type: "GET",
        dataType: "json",
        url: "http://159.138.135.42:8008/status/" + input,
        success: function(res) {
            console.log(res);
            count ++;
            if (res.code == 0) {
                // when the search is successful
                $('#search_result').html('<img src="img/correct.png" style="margin: 5px auto;"></img><div class="card-content">Account Status Info<br/>'+formatJson(res)+'</div>');
            } else {
                flag_1 = 1;
            }
        }
    });
    var ajax2 = $.ajax({ 
        // query transaction execution status
        type: "GET",
        dataType: "json",
        url: "http://159.138.135.42:8008/receipt/" + input,
        success: function(res) {
            console.log(res);
            count ++;
            if (res.code == 0) {
                // when the search is successful
                $('#search_result').html('<img src="img/correct.png" style="margin: 5px auto;"></img><div class="card-content">Transaction Info<br/>'+formatJson(res)+'</div>');
            } else {
                flag_2 = 1;
            }

        }
    });
    var ajax3 = $.ajax({
        // query contract data
        type: "GET",
        dataType: "json",
        url: "http://159.138.135.42:8008/contractLocal/" + input,
        success: function(res) {
            console.log(res);
            count ++;
            if (res.code == 0) {
                // when the search is successful
                $('#search_result').html('<img src="img/correct.png" style="margin: 5px auto;"></img><div class="card-content">Contract Data Info<br/>'+formatJson(res)+'</div>');
            } else {
                flag_3 = 1;
            }

        }
    });

    $.when(ajax1, ajax2, ajax3).done(function() {
        if (flag_1 && flag_2 && flag_3) {
            $('#search_result').html('<img src="img/wrong.png" style="margin: 5px auto;"></img><div class="card-content">Cannot search anything</div>');
        }
        $('#cover_layer').show();
    })

})

$('#cover-bg').click(function() {
    $('#cover_layer').hide();
})

$('#project-info-icon').click(function() {
    $('#project-info').show();
})

$('#project-info-bg').click(function() {
    $('#project-info').hide();
})

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


//获取url参数
function getParam(paramName) { 
    paramValue = "", isFound = !1; 
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) { 
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
    } 
    return paramValue == "" && (paramValue = null), paramValue 
} 
/*
function copyText() {
        var Url2 = document.getElementById("keydiv").innerText;
        var oInput = document.createElement('input');
        oInput.value = Url2;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand("Copy"); 
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        layer.msg('复制成功');
}

function copyText2() {
        var Url1 = document.getElementById("keydiv2").innerText;
        var oInput = document.createElement('input');
        oInput.value = Url1;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand("Copy"); 
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        layer.msg('复制成功');
}
*/

