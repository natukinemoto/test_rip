/* プレイボールボーダー制御 */
document.getElementById("gameStart").addEventListener("mouseover", function(){
    if(timeSet == 0){
        document.getElementById("gameStart").className = "game_start_action";
    }
},false);

document.getElementById("gameStart").addEventListener("mouseout", function(){
    if(timeSet == 0){
        document.getElementById("gameStart").className = "game_start";
    }
},false);

/* プレイボールメインロジック */
/* timeSet = 0の場合ボタン押下可能、timeSet = 1の場合ボタン押下不能 */
let timeSet = 0;

document.getElementById("gameStart").addEventListener("click", function(){
    
    if(timeSet == 0){
        /* div要素を削除、全ての子を削除(初期化) */
        var textRem = document.getElementById("resultText");
        while(textRem.firstChild){
            textRem.removeChild(textRem.firstChild);
        }
        var strike = 0;
        var ball = 0;

        /* 最高投球回数は6回 */
        for(var i = 1; i < 7; i++){
            var randomNumber = randomCreat(batterCount, pitcherCount);

            if(randomNumber >= 50){
                ball++;
                /* div要素を追加 */
                var textElem = document.createElement("div");
                textElem.textContent = i + "投目 " + "ボール！！";
                textElem.className = "ball";
                textElem.setAttribute("id", "id" + i)
                document.getElementById("resultText").appendChild(textElem);
            }
            else if(randomNumber < 50){
                strike++;
                /* div要素を追加 */
                var textElem = document.createElement("div");
                textElem.textContent = i + "投目 " + "ストライク！！";
                textElem.className = "strike";
                textElem.setAttribute("id", "id" + i)
                document.getElementById("resultText").appendChild(textElem);
            }

            /* ストライクが3回、ボールが4回のいずれかで終了 */
            if(strike == 3){
                timeSet = 1;
                setTimeout(timer, 3000);
                setTimeout(timerStrike, 1500);
                document.getElementById("gameStart").className = "result"
                break;
            }
            else if(ball == 4){
                timeSet = 1;
                setTimeout(timer, 3000);
                setTimeout(timerball, 1500);
                document.getElementById("gameStart").className = "result"
                break;
            }
        }
    }
},false);

/* 初回以降のボタン押下制御用タイマー */
function timer(){
    document.getElementById("gameStart").className = "game_start_action";
    document.getElementById("gameStart").textContent = "NextGame!!"
    timeSet = 0;
}
function timerStrike(){
    document.getElementById("gameStart").className = "game_start_action";
    document.getElementById("gameStart").textContent = "ストライクバッターアウト!!"
}
function timerball(){
    document.getElementById("gameStart").className = "game_start_action";
    document.getElementById("gameStart").textContent = "ボールフォアボール!!"
}

/* ボールストライク乱数判定 */
/* batterの能力値とpitcherの能力値を設定して乱数を偏らせる処理 */
function randomCreat(batter, pitcher){
    var randomNumber = Math.floor(Math.random() * 101) + ((pitcher * 10) - (batter * 10));
    return randomNumber;
}

/* Batterパワーカウントロジック */
let batterCount = 3;/*バッターパワーカウンタ 最大値5; 最小値0 */

document.getElementById("leftBatter").addEventListener("mouseover", function(){
    document.getElementById("leftBatter").className = "left_action";
},false);
document.getElementById("leftBatter").addEventListener("mouseout", function(){
    document.getElementById("leftBatter").className = "";
},false);

document.getElementById("leftBatter").addEventListener("click", function(){
    if(batterCount < 5){
        batterCount++;
        document.getElementById("writeBatter").textContent = batterCount;
    }
},false);

document.getElementById("rightBatter").addEventListener("mouseover", function(){
    document.getElementById("rightBatter").className = "right_action";
},false);
document.getElementById("rightBatter").addEventListener("mouseout", function(){
    document.getElementById("rightBatter").className = "";
},false);

document.getElementById("rightBatter").addEventListener("click", function(){
    if(batterCount > 0){
        batterCount--;
        document.getElementById("writeBatter").textContent = batterCount;
    }
},false);

/* Pitcherパワーカウントロジック */
let pitcherCount = 3;/*ピッチャーパワーカウンタ 最大値5; 最小値0 */

document.getElementById("leftPitcher").addEventListener("mouseover", function(){
    document.getElementById("leftPitcher").className = "left_action";
},false);
document.getElementById("leftPitcher").addEventListener("mouseout", function(){
    document.getElementById("leftPitcher").className = "";
},false);

document.getElementById("leftPitcher").addEventListener("click", function(){
    if(pitcherCount < 5){
        pitcherCount++;
        document.getElementById("writePitcher").textContent = pitcherCount;
    }
},false);

document.getElementById("rightPitcher").addEventListener("mouseover", function(){
    document.getElementById("rightPitcher").className = "right_action";
},false);
document.getElementById("rightPitcher").addEventListener("mouseout", function(){
    document.getElementById("rightPitcher").className = "";
},false);

document.getElementById("rightPitcher").addEventListener("click", function(){
    if(pitcherCount > 0){
        pitcherCount--;
        document.getElementById("writePitcher").textContent = pitcherCount;
    }
},false);