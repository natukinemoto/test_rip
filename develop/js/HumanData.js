//#region === 画面装飾初期設定 ===
window.onload = function(){
    document.getElementById("border").className = "active";
    document.getElementById("border2").className = "active";
}
//#endregion

//#region === プロパティ定義 ===
var human = {
    height: null,  //身長
    weight: 2,  //体重
    bmi: null,  //BMI(肥満度)

    get getHeight(){
        return this.height;
    },
    set setHeight(pram){
        this.height = pram;
    },

    get getWeight(){
        return this.weight;
    },
    set setWeight(pram){
        this.weight = pram;
    },

    get bmi(){
        return this.height * this.weight;
    }

}
//#endregion

//#region === 身長計算 ===
document.getElementById("height").addEventListener("keyup", function(){
    // 入力値を変数に格納
    human.height = document.getElementById("height").value;

    // 正規表現：半角数字のみ許容,先頭が0を非許容
    var regex = /^([1-9]\d*|0)$/;

    // 入力チェック
    // 正常値
    if(regex.test(human.getHeight)){
        document.getElementById("answer").innerHTML = human.bmi;
    }
    // エラーチェック
    // 入力欄空白エラー
    else if(human.getHeight == "")
    {
        /* 入出力欄初期化 */
        human.setHeight = document.getElementById("height").value = null;
        document.getElementById("answer").innerHTML = human.bmi;

        const ErrorMsg = new Error("Er0002");
        error_msg();
        document.getElementById("errorMsg").innerHTML = ErrorMsg.ErrorMessage();
    }
    // 10進数外入力エラー
    else if(human.getHeight == 00)
    {
        /* 入出力欄初期化 */
        human.setHeight = document.getElementById("height").value = null;
        document.getElementById("answer").innerHTML = human.bmi;

        const ErrorMsg = new Error("Er0003");
        error_msg();
        document.getElementById("errorMsg").innerHTML = ErrorMsg.ErrorMessage();
    }
    // 半角数字以外エラー
    else
    {
        /* 入出力欄初期化 */
        human.setHeight = document.getElementById("height").value = null;
        document.getElementById("answer").innerHTML = human.bmi;

        const ErrorMsg = new Error("Er0001");
        error_msg();
        document.getElementById("errorMsg").innerHTML = ErrorMsg.ErrorMessage();
    }

},false);
//#endregion

document.getElementById("answer").innerHTML = human.getHeight();