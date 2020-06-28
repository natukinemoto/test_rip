//#region === 画面装飾初期設定 ===
/* 初期設定(input)装飾処理 */
window.onload = function(){
    document.getElementById("inputBorder").className = "border_active";
    document.getElementById("none").className = "active";
    document.getElementById("input").onpaste = function(){return false;};
    document.getElementById("input").value = null;
    document.getElementById("calcAnswer").innerHTML = 0 + currency;
    document.getElementById("taxAnswer").style.display = "none";
    document.getElementById("CashAnswer").style.display = "none";
}
//#endregion

//#region === 変数定義(初期化) ===
/* 選択区分制御 */
/* 表示制御用変数 col = 0; col = 1; 0がON; 1がOFF */
let col = 1;
/* 税率計算用変数 選択なしrateTax = 1; 食料品rateTax = 1.08; その他rateTax = 1.1 */
let rateTax = 1;
const rateNone = 1;
const rateFood = 1.08;
const rateOther = 1.1;
/* 税率計算結果用変数 */
let taxAnswer = 0;
/* 通貨単位表示用変数 */
const currency = " " + "円" + " (総計)";
const currencyNone = " " + "円";
// キャッシュバック制御
// キャッシュバック率変数
const rateCash = 1.02;
// キャッシュバック計算結果用変数
let cashAnswer = 0;
// キャッシュバック表示用変数 creditCol = 0(OFF), 1(ON);
let creditCol = 0;
// 総計
let calcAnswer = 0;
//#endregion

//#region === 税率区分選択(ボタン表示切り替え) ===
/* 税率区分選択 */
/* 区分選択なし */
document.getElementById("none").onmouseover = function(){
    if(col == 0){
        document.getElementById("none").className = "active";
        document.getElementById("food").className = "invalid";
        document.getElementById("other").className = "invalid";
    }
}
document.getElementById("none").onmouseout = function(){
    if(col == 0){
        document.getElementById("none").className = "invalid";
    }
}
document.getElementById("none").onclick = function(){
    // 要素を非表示
    document.getElementById("taxAnswer").style.display = "none";
    document.getElementById("CashAnswer").style.display = "none";
    
    if(col == 1){
        document.getElementById("none").className = "active";
        document.getElementById("food").className = "invalid";
        document.getElementById("other").className = "invalid";
        col = 1;
        rateTax = rateNone;
        getTaxRate(rateTax);
    }else{
        document.getElementById("none").className = "active";
        col = 1;
        rateTax = rateNone;
        getTaxRate(rateTax);
    }

    // 総計(税込み＋キャッシュバック)
    cashAnswer = 0;
    getCalc();
}

/* 食料品 */
document.getElementById("food").onmouseover = function(){
    if(col == 0){
        document.getElementById("none").className = "invalid";
        document.getElementById("food").className = "active";
        document.getElementById("other").className = "invalid";
    }
}
document.getElementById("food").onmouseout = function(){
    if(col == 0){
        document.getElementById("food").className = "invalid";
    }
}
document.getElementById("food").onclick = function(){
    // 要素を画面(非)表示
    document.getElementById("taxAnswer").style.display = "block";
    document.getElementById("CashAnswer").style.display = "none";

    if(col == 1){
        document.getElementById("none").className = "invalid";
        document.getElementById("food").className = "active";
        document.getElementById("other").className = "invalid";
        col = 1;
        rateTax = rateFood;
        getTaxRate(rateTax);
    }else{
        document.getElementById("food").className = "active";
        col = 1;
        rateTax = rateFood;
        getTaxRate(rateTax);
    }

    // 総計(税込み＋キャッシュバック)
    cashAnswer = 0;
    getCalc();
}

/* その他 */
document.getElementById("other").onmouseover = function(){
    if(col == 0){
        document.getElementById("none").className = "invalid";
        document.getElementById("food").className = "invalid";
        document.getElementById("other").className = "active";
    }
}
document.getElementById("other").onmouseout = function(){
    if(col == 0){
        document.getElementById("other").className = "invalid";
    }
}
document.getElementById("other").onclick = function(){
    // 要素を画面表示
    document.getElementById("taxAnswer").style.display = "block";

    if(col == 1){
        document.getElementById("none").className = "invalid";
        document.getElementById("food").className = "invalid";
        document.getElementById("other").className = "active";
        col = 1;
        rateTax = rateOther;

        // キャッシュバック計算
        if(creditCol == 1){
            // 要素を画面表示
            document.getElementById("CashAnswer").style.display = "block";
            getCashBack();
        }

        // 税率計算
        getTaxRate(rateTax);
    }else{
        document.getElementById("other").className = "active";
        col = 1;
        rateTax = rateOther;

        // キャッシュバック計算
        if(creditCol == 1){
            // 要素を画面表示
            document.getElementById("CashAnswer").style.display = "block";

            getCashBack();
        }

        // 税率計算
        getTaxRate(rateTax);
    }

    // 総計(税込み＋キャッシュバック)
    getCalc();
}
//#endregion

//#region === 税率計算ロジック ===
/* 税率初期入力値計算(画面表示) */
document.getElementById("input").addEventListener("keyup", function(event){
    /* 入力値を変数に格納 */
    var taxCalc = document.getElementById("input").value;

    /* 正規表現：半角数字のみ許容,先頭が0を非許容 */
    var regex = /^([1-9]\d*|0)$/;
    var regex2 = /[A-Za-z-!"#$%&'()=<>,.?_\[\]{}@^~\\]/;

    // 入力チェック
    // 正常値
    if(regex.test(taxCalc))
    {
        // エラーメッセージリセット
        error_resetmsg()

        /* 食料品税率計算(roundで丸めることにより入力値100の際のバグ挙動等を回避) */
        if(rateTax == rateFood){
            getTaxRate(rateTax);
        }
        /* その他税率計算(roundで丸めることにより入力値100の際のバグ挙動等を回避) */
        else if(rateTax == rateOther){
            getTaxRate(rateTax);

            // クレジット決済選択時(キャッシュバック計算)
            if(creditCol == 1){
                getCashBack();
            }
        }
        /* 選択なし税率計算(roundで丸めることにより入力値100の際のバグ挙動等を回避) */
        else if(rateTax == rateNone){
            getTaxRate(rateTax);
        }

        // 総計(税込み＋キャッシュバック)
        getCalc();
    }
    // エラーチェック
    // 入力欄空白エラー
    else if(taxCalc == "")
    {
        // 要素を画面非表示
        document.getElementById("CashAnswer").style.display = "none";

        /* 入力出力欄初期化 */
        taxAnswer = 0;
        calcAnswer = 0;

        const ErrorMsg = new Error("Er0002");
        error_msg();
        document.getElementById("errorMsg").innerHTML = ErrorMsg.ErrorMessage();

        document.getElementById("calcAnswer").innerHTML = calcAnswer + currency;
    }
    // 10進数外入力エラー
    else if(taxCalc == 00){
        // 要素を画面非表示
        document.getElementById("CashAnswer").style.display = "none";

        /* 入力出力欄初期化 */
        taxCalc = document.getElementById("input").value = null;
        taxAnswer = 0;
        calcAnswer = 0;
        document.getElementById("taxAnswer").innerHTML = 0 + currency;

        const ErrorMsg = new Error("Er0003");
        error_msg();
        document.getElementById("errorMsg").innerHTML = ErrorMsg.ErrorMessage();

        document.getElementById("calcAnswer").innerHTML = calcAnswer + currency;
    }
    // 半角数字以外エラー
    else
    {
        // 要素を画面非表示
        document.getElementById("CashAnswer").style.display = "none";

        /* 入力出力欄初期化 */
        taxCalc = document.getElementById("input").value = null;
        taxAnswer = 0;
        calcAnswer = 0;
        document.getElementById("taxAnswer").innerHTML = 0 + currency;

        const ErrorMsg = new Error("Er0001");
        error_msg();
        document.getElementById("errorMsg").innerHTML = ErrorMsg.ErrorMessage();

        document.getElementById("calcAnswer").innerHTML = calcAnswer + currency;
    }
},false);

// 税率計算
function getTaxRate(rate){
    var taxCalc = document.getElementById("input").value;

    if(!taxCalc){
        document.getElementById("taxAnswer").innerHTML = "消費税：" + 0 + currencyNone;
    }else{
        taxAnswer = Math.round(taxCalc * rate) - taxCalc;
        document.getElementById("taxAnswer").innerHTML = "消費税：" + taxAnswer + currencyNone;
    }
}
//#endregion

//#region === エラー表示(画面css切り替え) ===
/* error表示 */
function error_msg(){
    document.getElementById("alert").className = "alert";
}
function error_resetmsg(){
    document.getElementById("alert").className = "reset";
}
//#endregion

//#region === キャッシュバック計算(切り替え)ロジック ===
// キャッシュバック(画面表示)切替
document.getElementById("credit").addEventListener("mouseover", function(){
    if(creditCol == 0){
        document.getElementById("credit").className = "active";
    }
},false);
document.getElementById("credit").addEventListener("mouseout", function(){
    if(creditCol == 0){
        document.getElementById("credit").className = "invalid";
    }
},false);
document.getElementById("credit").addEventListener("click", function(){
    cashAnswer = 0;
    if(creditCol == 0){
        document.getElementById("credit").className = "active";
        creditCol = 1;
        
        // 税率区分その他選択時(キャッシュバック計算)
        if(rateTax == rateOther){
            // 要素を画面表示
            document.getElementById("CashAnswer").style.display = "block";

            getCashBack();
        }
    }else{
        // 要素を画面表示
        document.getElementById("CashAnswer").style.display = "none";

        document.getElementById("credit").className = "invalid";
        creditCol = 0;
        cashAnswer = 0;
    }

    // 総計(税込み＋キャッシュバック)
    getCalc();
},false);

// キャッシュバック計算
function getCashBack(){
    // 要素を画面表示
    document.getElementById("CashAnswer").style.display = "block";
    /* 入力値を変数に格納 */
    var taxCalc = document.getElementById("input").value;
    // 入力された(税抜き)金額の2%がキャッシュバック
    if(!taxCalc){
        cashAnswer = Math.round(taxCalc * rateCash) - parseInt(0);
        document.getElementById("CashAnswer").innerHTML = "キャッシュバック：" + cashAnswer + currencyNone;
    }else{
        cashAnswer = Math.round(taxCalc * rateCash) - parseInt(taxCalc);
        document.getElementById("CashAnswer").innerHTML = "キャッシュバック：" + cashAnswer + currencyNone;
    }
}
//#endregion

//#region === 総計(税込み＋キャッシュバック) ===
function getCalc(){
    var taxCalc = document.getElementById("input").value;

    if(!taxCalc){
        calcAnswer = parseInt(0) + parseInt(taxAnswer) - parseInt(cashAnswer);
        document.getElementById("calcAnswer").innerHTML = calcAnswer + currency;
    }else{
        calcAnswer = parseInt(taxCalc) + parseInt(taxAnswer) - parseInt(cashAnswer); 
        document.getElementById("calcAnswer").innerHTML = calcAnswer + currency; 
    }
}
//#endregion