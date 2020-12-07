// 非同期正常テスト
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
                document.getElementById("result_1").innerHTML = "エラー発生";
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
    }, 3000);

    xhr.send();
    console.log("通信中。。。");

},false);

// 非同期異常テスト(url不正)
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
    }, 3000);

    xhr.send();
    console.log("通信中。。。");

},false);

// サイトURLを渡してサイトタイトルを取得するAPI
document.getElementById("urlSearchClick").addEventListener("click", function(){

    var resultUrl = document.getElementById("resultUrlTitle");
    var inputUrl = document.getElementById("inputUrl").value;
    var aaa = null;

    var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "https://site-scrapper.p.rapidapi.com/fetchsitetitle?url=" + inputUrl;
    xhr.withCredentials = true;     // リクエストにcookieなどの認証情報を含める
    xhr.responseType = "text";

    xhr.open(method, url, true)
    xhr.setRequestHeader("x-rapidapi-host", "site-scrapper.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "3783a33ed2msh3546d5b9c1b2d64p1ed792jsn5a509d85db21");

    xhr.onreadystatechange = setTimeout(function(){
        if(xhr.readystate === this.DONE){
            var status = xhr.status;
            if(status === 0 || (status >= 200 && status < 400)){
                document.getElementById("resultUrlTitle").innerHTML = xhr.responseText;
                console.log(xhr.responseText);
            }
        }
        else{
            console.log("zzz");
        }
    }, 3000);

    document.getElementById("resultUrlTitle").innerHTML = "タイトルを取得しています…";
    xhr.send();

},false);

// document.getElementById("librarySearchClick").addEventListener("click", function(){
//     var inputLibrary = document.getElementById("inputLibrary").value;
//     var xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = "https://iss.ndl.go.jp/api/opensearch?cnt=10&title=空";
//     xhr.withCredentials = true;
//     xhr.responseType = "document";
//     //xhr.response = "document";
//     let aaa = null;
//     let bbb = xhr.readystate;
//     xhr.overrideMimeType("text/xml");

//     xhr.open(method, url, true)
//     //xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500/html/AsyncTest.html");
    
//     xhr.onreadystatechange = setTimeout(function(){
//         if(xhr.readyState === XMLHttpRequest.DONE){
//             var status = xhr.status;
//             if(status === 0 || (status >= 200 && status < 400)){
//                 var xmlString = "<title></title>";
//                 var parser = new DOMParser();
//                 var xmlDoc = parser.parseFromString(xmlString, "text/xml");
//                 //xhr.overrideMimeType(xhr.responseXML);
//                 const doc = parser.parseFromString(xhr.responseXML, "text/xml");
//                 //(new XMLSerializer()).serializeToString(dataDocument);
//                 document.getElementById("libraryUrlTitle").innerHTML = xhr.responseXML;
//                 //var xmlDoc = xhr.responseXML; 
//                 //var data = xmlDoc.getElementsByTagName("title");
//                 console.log(xhr.response, xhr.responseXML);
//                 console.log("aaa");
//                 console.log(xhr.responseXML);
//                 //console.log(xhr.responseText);
//                 console.log(xhr.response);
//                 console.log(xhr.responseURL);
//                 aaa = xhr.response;
//             }
//             else{
//                 document.getElementById("libraryUrlTitle").innerHTML = "リクエストに失敗しました";
//                 console.log("aaa");
//             }
//             console.log("aaa");
//         }
//         else if(xhr.readystate === 0){
//             console.log("bbb");
//         }
//     }, 3000);

//     document.getElementById("libraryUrlTitle").innerHTML = "大気中2";
//     xhr.send();
// },false);

// function gety(){
//     var inputLibrary = document.getElementById("inputLibrary").value;
//     var xhr = new XMLHttpRequest(),
//     method = "GET",
//     url = "https://iss.ndl.go.jp/api/opensearch?cnt=10&title=空";
//     xhr.withCredentials = true;
//     xhr.responseType = "document";
//     let aaa = null;

//     xhr.open(method, url, true)
//     //xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500/html/AsyncTest.html");
    
//     xhr.onreadystatechange = setTimeout(function(){
//         if(xhr.readystate === XMLHttpRequest.DONE){
//             var status = xhr.status;
//             if(status = 200){
//                 document.getElementById("libraryUrlTitle").innerHTML = xhr.response;
//                 console.log(xhr.responseText);
//             }
//             else{
//                 document.getElementById("libraryUrlTitle").innerHTML = "リクエストに失敗しました";
//             }
//         }
//     }, 3000);

//     document.getElementById("libraryUrlTitle").innerHTML = "大気中";
//     xhr.send();
// }

// document.getElementById("librarySearchClick").addEventListener("click", function(){
//     var ttt = gety();
// },false);

document.getElementById("postSearchClick").addEventListener("click", function(){
    var inputLibrary = document.getElementById("inputPost").value;
    var xhr = new XMLHttpRequest(),
    method = "GET",
    url = "Atest.php";
    xhr.withCredentials = true;
    //xhr.responseType = "document";
    //xhr.response = "document";
    xhr.overrideMimeType("application/xml");
    //xhr.responseType = "text";

    xhr.open(method, url, true)
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500/html/AsyncTest.html");
    
    xhr.onreadystatechange = setTimeout(function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            var status = xhr.status;
            if(status === 0 || (status >= 200 && status < 400)){
                //const parser = new DOMParser();
                //const doc = parser.parseFromString(xhr.responseXML, "text/xml");
                //document.getElementById("postUrlTitle").innerHTML = xhr.responseXML;
                //var node = xhr.getElementsByTagName('ZIP_result')[0];
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(xhr.responseXML, "application/xml");
                //xhr.overrideMimeType("application/xml");
                var xmlDoc = xhr.responseXML; 
                var data = xmlDoc.getElementsByTagName("ZIP_result"); 
                console.log(xmlDoc.getElementsByTagName("ZIP_result"));
                console.log("aaa");
                console.log(xhr.responseXML.documentElement);
                console.log(xhr.responseText);
                console.log(xhr.response);
                console.log(xhr.responseURL);
                aaa = xhr.response;
            }
            else{
                document.getElementById("postUrlTitle").innerHTML = "リクエストに失敗しました";
            }
        }
    }, 3000);

    document.getElementById("postUrlTitle").innerHTML = "大気中2";
    xhr.send();
},false);

// document.getElementById('fetchSearchClick').addEventListener('click', function (e) {
//     fetch('https://iss.ndl.go.jp/api/opensearch?cnt=10&title=空',{
//         method: "GET",
//         mode: "cors",
//         credentials: 'include'})
//     .then(function(text){
//         document.getElementById('fetchUrlTitle').textContent = text;
//     })
//       .then(function (response) {
//         return response.text();
//       })
//       .then(function (data) {
//         document.getElementById('fetchUrlTitle').textContent = data;
//       });
//   }, false);

  document.getElementById("fetchSearchClick").addEventListener("click", function(){
      fetch("http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?appId=7dbb7be0163baf74f41882d0a5f1f75b5353b626&lang=J&statsDataId=0003412313&metaGetFlg=Y&cntGetFlg=N&explanationGetFlg=Y&annotationGetFlg=Y&sectionHeaderFlg=1", {
          method: "GET",//デフォルト値はGET
          mode: "cors",
      })
      .then(function(response){
        console.log("status=" + response.status);
        return response.json();
        //document.getElementById("fetchUrlTitle").textContent = response.json();
      })
      .then(function(data){
          console.log(data.GET_STATS_DATA.RESULT.ERROR_MSG);
        console.log(JSON.stringify(data)); //javascriptオブジェクトをJSONに変換
        document.getElementById('fetchUrlTitle').textContent = JSON.stringify(data);
      })
      .catch(function(error){ //例外(失敗)
        console.log("status=" + error);
    })
  }, false);