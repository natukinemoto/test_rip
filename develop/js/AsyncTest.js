document.getElementById("clickBtn_1").addEventListener("click", function(){

    const xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://corona-stats.online/?format=json&_=1605333380325";
    
    xhr.open(method, url, true);
    xhr.onreadystatechange = setTimeout(function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            var status = xhr.status;
            if(status === 0 || (status >= 200 && status < 400))
            {
                //document.getElementById("result_1").innerHTML = request.responseText;
                console.log(xhr.responseText);
                console.log("通信成功");
            }
            else
            {
                document.getElementById("result_1").innerHTML = "エラー発生";
                console.log("エラー発生");
            }
        }
    }, 6000);

    xhr.send();
    console.log("通信中。。。");

},false);



document.getElementById("clickBtn_2").addEventListener("click", function(){

    const xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://httpbin.org/get2";
    
    xhr.open(method, url, true);
    xhr.onreadystatechange = setTimeout(function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            var status = xhr.status;
            if(status === 0 || (status >= 200 && status < 400))
            {
                document.getElementById("result_2").innerHTML = request.responseText;
                console.log(xhr.responseText);
                console.log("通信成功");
            }
            else
            {
                document.getElementById("result_2").innerHTML = "エラー発生";
                console.log("エラー発生");
            }
        }
    }, 6000);

    xhr.send();
    console.log("通信中。。。");

},false);