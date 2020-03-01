/* ストライクorホームラン判定 */
let knock = 0;/* 0:バットを振っていない 1:バットを降った */
let strike = 0;/* ストライクカウンタ */
let hit = 0;/* ヒットカウンタ */
let ball = 0;/* ボールカウンタ */
let avoidanceS = 0;/*ストライク回避スイッチ 0:回避不能 1:回避可能*/
let avoidanceB = 0;/*ボール回避スイッチ 0:回避不能 1:回避可能*/
let ballSwitch = 0;/*ボール判定スイッチ 0:ストライク 1:ボール*/

/* メインロジック */
document.getElementById("playGame").addEventListener("click", function(){
    /* 初期化 */
    knock = 0;/* 0:バットを振っていない 1:バットを降った */
    strike = 0;/* ストライクカウンタ */
    hit = 0;/* ヒットカウンタ */
    ball = 0;/* ボールカウンタ */
    avoidanceS = 0;/*ストライク回避スイッチ 0:回避不能 1:回避可能*/
    avoidanceB = 0;/*ボール回避スイッチ 0:回避不能 1:回避可能*/
    ballSwitch = 0;/*ボール判定スイッチ 0:ストライク 1:ボール*/
    /* カラーランプ初期化 */
    var redRem = document.getElementById("redLamp");
    while(redRem.firstChild){
        redRem.removeChild(redRem.firstChild);
    }
    var greenRem = document.getElementById("greenLamp");
    while(greenRem.firstChild){
        greenRem.removeChild(greenRem.firstChild);
    }
    var yellowRem = document.getElementById("yellowLamp");
    while(yellowRem.firstChild){
        yellowRem.removeChild(yellowRem.firstChild);
    }
    document.getElementById("playGame").className = "play_action";
    
    setInterval(batterLogic,3500);
},false);

/* バッターアウトロジック */
function batterLogic(){
    hiddenBall();

    /* 三振になるまで処理を続行 */
    if(strike < 3){
        /* 初期化 */
        document.getElementById("pitcherAction").className = "pitcher";
        document.getElementById("batterFigure").className = "batter_figure";
        avoidanceB = 0;
        avoidanceS = 0;
        ballSwitch = 0;
        knock = 0;
        /* div要素を削除、全ての子を削除(初期化) */
        var hitRem = document.getElementById("hit");
        var writeRem = document.getElementById("hitWrite");
        while(hitRem.firstChild){
            hitRem.removeChild(hitRem.firstChild);
        }
        while(writeRem.firstChild){
            writeRem.removeChild(writeRem.firstChild);
        }

        setTimeout(baseballBattle, 1000);

        document.getElementById("batterStyle").addEventListener("click", function(event){
            if(knock == 0){
                knock = 1;
                hit++;
                avoidanceS = 1;
                avoidanceB = 1;

                document.getElementById("batterFigure").className = "batter_figure_action";
                textHits();
            }
            else if(knock == 1){
            }
        },false);
        document.body.addEventListener("click", function(event){
            if(knock == 0){
                knock = 1;
                document.getElementById("batterFigure").className = "batter_figure_action";
            }
            else if(knock == 1){
            }
        },false);
        setTimeout(strikeEnd, 2500);
    }
    else if(strike == 3){
        document.getElementById("playGame").className = "play";
        document.getElementById("playGame").textContent = "NEXTGAME -> ";
        document.getElementById("playGame").addEventListener("click", function(){
            window.location.href = "../html/BaseBallBattle.html";
        },false);
    }
}

/* ボール表示OFF */
function hiddenBall(){
    document.getElementById("ballStyle").style.opacity = null;
    document.getElementById("ballStyle").style.transform = null;
}

/* ランプ設定 */
function redL(){
    var textElem = document.createElement("div");
    textElem.className = "red_lamp";
    textElem.style.transform = "translate(-" + (150 - (50 * 1)) + "px, -" + (1030 + (2 * 1)) + "px) scale(20, 20)";
    document.getElementById("redLamp").appendChild(textElem);
}

function greenL(){
    var textElem = document.createElement("div");
    textElem.className = "green_lamp";
    textElem.style.transform = "translate(-" + (150 - (50 * ball)) + "px, -" + (1030 + (2 * ball)) + "px) scale(20, 20)";
    document.getElementById("greenLamp").appendChild(textElem);
}

function yellowL(){
    var textElem = document.createElement("div");
    textElem.className = "yellow_lamp";
    textElem.style.transform = "translate(-" + (150 - (50 * strike)) + "px, -" + (1030 + (2 * strike)) + "px) scale(20, 20)";
    document.getElementById("yellowLamp").appendChild(textElem);
}

/* 投球範囲ランダム制御 */
function baseballBattle(){
    /* table内の上下の座標を取得 */
    var zoneTop = document.getElementById("strikeZone").getBoundingClientRect().top;
    var zoneBottom = document.getElementById("strikeZone").getBoundingClientRect().bottom;
    var randomY = Math.floor((Math.random()) * (zoneBottom - zoneTop)) + zoneTop;
    /* Y軸の範囲を指定およびスクロールに対応 , ボールとストライクゾーンの位置調整:-380*/
    var zoneY = randomY + window.pageYOffset - 380;
    /* X軸はスクロールに対応する必要なし、幅はtableの値(400)を参照しているため以下のように設定 */
    var zoneLeft = -200;
    var zoneRight = 200;
     randomX = Math.floor((Math.random()) * (zoneLeft - zoneRight) + zoneRight);
    var zoneX = randomX;

    var centerY = (zoneTop + zoneBottom) / 2;
    var centerX = zoneLeft - 100;
    /* 2点間の座標から角度を計算する */
    var degAtan2 = Math.atan2(centerY - randomY, centerX - randomX);
    /* radianからdegreeへの変換およびバットの角度調整(90) */
    var radianPosition = degAtan2 * (180 / Math.PI) - 90;
    /* batterStyleの範囲内をclickでHIT */
    document.getElementById("pitcherAction").className = "pitcher_action";
    document.getElementById("ballStyle").className = "ball_action";
    document.getElementById("batterStyle").style.transform = "translate(-300px, -314px) rotate(" + radianPosition + "deg) scale(1, 11)";
    document.getElementById("ballStyle").style.transform = "translate("+ zoneX + "px, " + zoneY + "px) scale(0.2, 0.2)";
    document.getElementById("ballStyle").style.opacity = "1";

    /* ボール判定 */
    if(-150 <= randomX && randomX <= 150){
        if((centerY - 150) <= randomY && randomY <= (centerY + 150)){

        }else{
            ballSwitch = 1;
            avoidanceS = 1;
        }
    }
    else{
        if((centerY - 150) <= randomY && randomY <= (centerY + 150)){
            ballSwitch = 1;
            avoidanceS = 1;
        }else{
            ballSwitch = 1;
            avoidanceS = 1;
        }
    }

    
}

/* clickしなかった場合の処理 */
function strikeEnd(){
    hiddenBall()
    if(avoidanceS == 0){
        if(strike == 2){
            knock = 1;
            strike++;
            redL();
            yellowL();
        }
        else if(strike < 2){
            knock = 1;
            strike++;
            yellowL();
        }
    }
    else if(avoidanceB == 0){
        if(ballSwitch == 1){
            knock = 1;
            ball++;
            if(ball == 4){
                hit++;
                textHits();
                ball = 0;
                var greenRem = document.getElementById("greenLamp");
                while(greenRem.firstChild){
                    greenRem.removeChild(greenRem.firstChild);
                }
            }
            else if(ball < 4){
                greenL();
            }
        }    
    }
}

/* HITテキストの描写処理 */
function textHits(){
    var textHit = document.createElement("div");
    textHit.textContent = hit;
    textHit.className = "hit";
    document.getElementById("hit").appendChild(textHit);
    var textElem = document.createElement("div");
    textElem.textContent = "HIT";
    textElem.className = "hit_write";
    document.getElementById("hitWrite").appendChild(textElem);
}

/* クリック座標の取得 *//*
document.body.addEventListener("click", function(event){
    if(knock == 0){
    /* click時の座標取得 *//*
    var positionX = event.pageX;
    var positionY = event.pageY - window.pageYOffset;

    var zoneTop = document.getElementById("strikeZone").getBoundingClientRect().top;
    var zoneBottom = document.getElementById("strikeZone").getBoundingClientRect().bottom;
    var centerY = (zoneTop + zoneBottom) / 2;
    var zoneLeft = document.getElementById("strikeZone").getBoundingClientRect().left;
    var centerX = zoneLeft - 100;
    var degAtan2 = Math.atan2(centerY - positionY, centerX - positionX);
    /* radianからdegreeへの変換およびバットの角度調整(90) *//*
    var radianPosition = degAtan2 * (180 / Math.PI) - 90;
    document.getElementById("batterStyle").style.transform = "translate(-300px, -314px) rotate(" + radianPosition + "deg) scale(1, 10)";}
},false);*/

/* ストライクゾーン範囲計算ロジック *//*
document.getElementById("strikeZone").addEventListener("click", function(){
    /* バットの基点計算 *//*
    var zoneTop = document.getElementById("strikeZone").getBoundingClientRect().top;
    var zoneBottom = document.getElementById("strikeZone").getBoundingClientRect().bottom;
    var centerY = (zoneTop + zoneBottom) / 2;
    var zoneLeft = document.getElementById("strikeZone").getBoundingClientRect().left;
    var centerX = zoneLeft - 100;
},false);

document.getElementById("batterStyle").addEventListener("click", function(){
    document.getElementById("batterStyle").style.transform = "translate(-300px, -280px) rotate(90deg) scale(1, 4.5)";
},false);*/