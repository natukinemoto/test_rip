// エレメント追加メソッド
function AddElement(){
    var population = GetPopulation();

    var body = document.getElementsByTagName("main")[0];
    var createTable = document.createElement("table");
    var createTablebody = document.createElement("tbody");

    for(var i = 0; i < 5; i++){
        var createTr = document.createElement("tr");
        for(var j = 0; j < 3; j++){
            var createTd = document.createElement("td");
            var insertText = document.createTextNode("hallo world");
            createTd.appendChild(insertText);
            createTr.appendChild(createTd);
        }
        createTablebody.appendChild(createTr);
    }
    createTable.appendChild(createTablebody);
    body.appendChild(createTable);
    createTable.setAttribute("border", "1");
}

// 人口推移(統計)の実行
document.getElementById("clickBtn").addEventListener("click", function(){
    RemoveElement()
    //PopulationList();
    GetPopulation();
}, false);

// 人口推移(統計)の取得
function GetPopulation(){

    var formSelectCheck = FormSelectCheck();
    var raceCheck = FormRaceCheck();
    var populationCheck = FormPopulationCheck();

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


        var body = document.getElementsByTagName("main")[0];
        var createTable = document.createElement("table");
        var createTablebody = document.createElement("tbody");
        let nameCount = 0;
        let humanCount = 0;
        
        // 取得実行
        for(var i = 0; i < 9; i++){
            var createTr = document.createElement("tr");
            for(var j = 0; j < 103; j++){
                if(j == 0){
                    // セル上部の概要欄の作成
                    if(i == 0){
                        var createTd = document.createElement("td");
                                var insertText = document.createTextNode("単位：千人,比％");
                                createTd.appendChild(insertText);
                                createTr.appendChild(createTd);
                    }
                    // セル上部の男女(性比)区分け(表記)の作成
                            if((i == 1) || (i == 2)){
                                var createTd = document.createElement("td");
                                if(i == 1){
                                    //if((populationCheck != 001) && (RaceCheck != 001)){
                                        var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[0]["@name"]
                                        + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[0]["@name"] + ")");
                                    //}
                                    createTd.appendChild(insertText);
                                    createTr.appendChild(createTd);
                                }
                                else{
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[0]["@name"]
                                    + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[1]["@name"] + ")");
                                    createTd.appendChild(insertText);
                                    createTr.appendChild(createTd);
                                }
                            }
                            if((i == 3) || (i == 4)){
                                var createTd = document.createElement("td");
                                if(i == 3){
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[1]["@name"]
                                    + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[0]["@name"] + ")");
                                }
                                else{
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[1]["@name"]
                                    + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[1]["@name"] + ")");
                                }
                                createTd.appendChild(insertText);
                                createTr.appendChild(createTd);
                            }
                            if((i == 5) || (i == 6)){
                                var createTd = document.createElement("td");
                                if(i == 5){
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[2]["@name"]
                                    + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[0]["@name"] + ")");
                                }
                                else{
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[2]["@name"]
                                    + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[1]["@name"] + ")");
                                }
                                createTd.appendChild(insertText);
                                createTr.appendChild(createTd);
                            }
                            if((i == 7) || (i == 8)){
                                var createTd = document.createElement("td");
                                if(i == 7){
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[3]["@name"]
                                    + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[0]["@name"] + ")");
                                }
                                else{
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[3]["@name"]
                                    + "(" + data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[1].CLASS[1]["@name"] + ")");
                                }
                                createTd.appendChild(insertText);
                                createTr.appendChild(createTd);
                            }
                        createTablebody.appendChild(createTr);
                }
                else{
                    // セル左部の年齢欄の作成
                    if(i == 0){
                        if(formSelectCheck.includes(data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[nameCount]["@cat03"].slice(-3))){
                        var createTd = document.createElement("td");
                        var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[2].CLASS[nameCount]["@name"]);
                        createTd.appendChild(insertText);
                        createTr.appendChild(createTd);
                        }
    
                        nameCount += 1;
                    }
                    // セル下部の統計データの作成(挿入)
                    else{
                        if(formSelectCheck.includes(data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount]["@cat03"].slice(-3))){
                            // 個別選択(性別)
                            if((populationCheck == data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount]["@cat01"])){
                                // 個別選択(人種)
                                if((raceCheck == data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount]["@cat02"])){
                                    var createTd = document.createElement("td");
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount].$);
                                    createTd.appendChild(insertText);
                                    createTr.appendChild(createTd);
                                }
                                // 全選択(人種)
                                else if(raceCheck == "000"){
                                    var createTd = document.createElement("td");
                                    var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount].$);
                                    createTd.appendChild(insertText);
                                    createTr.appendChild(createTd);
                                }
                            }
                            // 全選択(性別)
                        else if(populationCheck == "000"){
                            // 個別選択(人種)
                            if((raceCheck == data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount]["@cat02"])){
                                var createTd = document.createElement("td");
                                var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount].$);
                                createTd.appendChild(insertText);
                                createTr.appendChild(createTd);
                            }
                            // 全選択(人種)
                            else if(raceCheck == "000"){
                                var createTd = document.createElement("td");
                                var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.DATA_INF.VALUE[humanCount].$);
                                createTd.appendChild(insertText);
                                createTr.appendChild(createTd);
                            }
                        }
                        }
                        
                        
    
                        humanCount += 1;
                    }
                }
            }
            createTablebody.appendChild(createTr);
        }
    createTable.appendChild(createTablebody);
    body.appendChild(createTable);
    // delete用のIDを追加
    createTable.setAttribute("id", "delete");
    createTable.setAttribute("border", "1");

    })
    .catch(function(error){ //例外(失敗)
      console.log("status=" + error);
  })

}

// function PopulationList(){
//     fetch("http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?appId=7dbb7be0163baf74f41882d0a5f1f75b5353b626&lang=J&statsDataId=0003412313&metaGetFlg=Y&cntGetFlg=N&explanationGetFlg=Y&annotationGetFlg=Y&sectionHeaderFlg=1", {
//         method: "GET",//デフォルト値はGET
//         mode: "cors",
//     })
//     .then(function(response){
//       console.log("status=" + response.status);
//       return response.json();
//       //document.getElementById("fetchUrlTitle").textContent = response.json();
//     })
//     .then(function(data){
//         console.log(data.GET_STATS_DATA.RESULT.ERROR_MSG);
//         console.log(JSON.stringify(data)); //javascriptオブジェクトをJSONに変換


//         var body = document.getElementsByTagName("main")[0];
//         var createTable = document.createElement("table");
//         var createTablebody = document.createElement("tbody");
//         let nameCount = 0;
//         let humanCount = 0;
        

//         for(var i = 0; i < 9; i++){
//             var createTr = document.createElement("tr");
//             for(var j = 0; j < 1; j++){
//                 if((i == 1) || (i == 2)){
//                     var createTd = document.createElement("td");
//                     var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[0]["@name"]);
//                     createTd.appendChild(insertText);
//                     createTr.appendChild(createTd);

//                     nameCount += 1;
//                 }
//                 if((i == 3) || (i == 4)){
//                     var createTd = document.createElement("td");
//                     var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[1]["@name"]);
//                     createTd.appendChild(insertText);
//                     createTr.appendChild(createTd);

//                     nameCount += 1;
//                 }
//                 if((i == 5) || (i == 6)){
//                     var createTd = document.createElement("td");
//                     var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[2]["@name"]);
//                     createTd.appendChild(insertText);
//                     createTr.appendChild(createTd);

//                     nameCount += 1;
//                 }
//                 if((i == 7) || (i == 8)){
//                     var createTd = document.createElement("td");
//                     var insertText = document.createTextNode(data.GET_STATS_DATA.STATISTICAL_DATA.CLASS_INF.CLASS_OBJ[0].CLASS[3]["@name"]);
//                     createTd.appendChild(insertText);
//                     createTr.appendChild(createTd);

//                     nameCount += 1;
//                 }
//                 else{
//                     var createTd = document.createElement("td");
//                     var insertText = document.createTextNode("");
//                     createTd.appendChild(insertText);
//                     createTr.appendChild(createTd);
//                 }
//             }
//             createTablebody.appendChild(createTr);
//         }
//         createTable.appendChild(createTablebody);
//         body.appendChild(createTable);
//         createTable.setAttribute("border", "1");

//     })
//     .catch(function(error){ //例外(失敗)
//         console.log("status=" + error);
//   })
// }

// 男女、性比のラジオボタン切り替えチェック
function FormPopulationCheck(){
    var radioPopulations = document.getElementsByName("radioPopulation");
    let populationCheck;

    for(var i = 0; i < radioPopulations.length; i++){
        if(radioPopulations[i].checked) {
            populationCheck = radioPopulations[i].value;
        }
    }

    return populationCheck;
}

// 人口切り替えチェック
function FormRaceCheck(){
    var radioRaces = document.getElementsByName("radioRace");
    let raceCheck;

    for(var i = 0; i < radioRaces.length; i++){
        if(radioRaces[i].checked) {
            raceCheck = radioRaces[i].value;
        }
    }

    return raceCheck;
}

// プルダウンの実行
// 読み込みに大量のメモリが消費されてクラッシュする
// window.addEventListener("load", function(){
//    PullDownMenu();
// },false);

// プルダウンの作成
// function PullDownMenu(){
//     var body = document.getElementsByTagName("main")[0];
//     var createForm = document.createElement("form");
//     var createSelect = document.createElement("select");

//     for(var i = 0; i < 101; i++){
//         var createOption = document.createElement("option");
//         if(i = 0){
//             var insertText = document.createTextNode("全年齢対象");
//         }
//         else if(i == 100){
//             var insertText = document.createTextNode(i + "歳以上");
//         }
//         else{
//             var insertText = document.createTextNode(i + "歳");
//         }
//         createOption.appendChild(insertText);
//         createSelect.appendChild(createOption);
//         createOption.setAttribute("value", i);
//         createSelect.setAttribute("multiple", "");
//         createSelect.setAttribute("id", "selectCheck");
//     }

//     createForm.appendChild(createSelect);
//     body.appendChild(createForm);
// }

// プルダウンで選択された値を取得する
function FormSelectCheck(){
    let count = 0;
    let formSelectCheck = [];

    var selectCheck = document.getElementsByTagName("option") ;
    var selectChecks = selectCheck.options;
    for (i = 0 ; selectCheck.length > i; i++) {
        if (selectCheck[i].selected ) {
            formSelectCheck[count] = selectCheck[i].value;

            count += 1;
        }
    }

    return formSelectCheck;
}

// 表を削除
function RemoveElement(){
    if(document.getElementById("delete") != null){
        document.getElementById("delete").remove();
    }
}

window.onload = function(){
    CreatePullDownMenu();
}

function CreatePullDownMenu(){
    for (var i = 0;i <= 100;i++){
        var option = document.createElement("option");
        option.setAttribute("value",("000" + i).slice(-3));
        option.setAttribute("selected",i);
        option.appendChild(document.createTextNode(i.toString() + "歳"));
        formAge.selectAge.appendChild(option);
    }
}