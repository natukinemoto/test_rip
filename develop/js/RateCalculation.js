/* 初期設定input装飾処理 */
window.onload = function(){
    document.getElementById("id_Calc_input_border").className = "Calc_input_border_active";
    document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_col_active";
    document.getElementById("id_Calc_input").onpaste = function(){return false;};
    document.getElementById("id_Calc_input").value = null;
    document.getElementById("Calc_tax_answer").innerHTML = 0;
}

/* 選択区分制御 */
/* 表示制御用変数 col = 0; col = 1; 0がON; 1がOFF */
let col = 0;
/* 税率計算用変数 選択なしrattax = 0; 食料品rattax = 1; その他rattax = 2 */
let ratetax = 0;

/* 税率区分選択 */
document.getElementById("id_Calc_lists_child_col1").onmouseover = function(){
    if(col == 0){
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_col_active";
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_child_col";
    }
}
document.getElementById("id_Calc_lists_child_col1").onmouseout = function(){
    if(col == 0){
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_child_col";
    }
}
document.getElementById("id_Calc_lists_child_col1").onclick = function(){
    if(col == 1){
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_col_active";
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_child_col";
        col = 1;
        ratetax = 0;
        var taxcalc = document.getElementById("id_Calc_input").value;
        taxanswer = Math.round(taxcalc * 1);
        document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
    }else{
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_col_active";
        col = 1;
        ratetax = 0;
        var taxcalc = document.getElementById("id_Calc_input").value;
        taxanswer = Math.round(taxcalc * 1);
        document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
    }
}

/* 食料品 */
document.getElementById("id_Calc_lists_child_col2").onmouseover = function(){
    if(col == 0){
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_col_active";
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_child_col";
    }
}
document.getElementById("id_Calc_lists_child_col2").onmouseout = function(){
    if(col == 0){
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_child_col";
    }
}
document.getElementById("id_Calc_lists_child_col2").onclick = function(){
    if(col == 1){
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_col_active";
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_child_col";
        col = 1;
        ratetax = 1;
        var taxcalc = document.getElementById("id_Calc_input").value;
        taxanswer = Math.round(taxcalc * 1.08);
        document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
    }else{
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_col_active";
        col = 1;
        ratetax = 1;
        var taxcalc = document.getElementById("id_Calc_input").value;
        taxanswer = Math.round(taxcalc * 1.08);
        document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
    }
}

/* その他 */
document.getElementById("id_Calc_lists_child_col3").onmouseover = function(){
    if(col == 0){
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_col_active";
    }
}
document.getElementById("id_Calc_lists_child_col3").onmouseout = function(){
    if(col == 0){
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_child_col";
    }
}
document.getElementById("id_Calc_lists_child_col3").onclick = function(){
    if(col == 1){
        document.getElementById("id_Calc_lists_child_col1").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col2").className = "Calc_lists_child_col";
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_col_active";
        col = 1;
        ratetax = 2;
        var taxcalc = document.getElementById("id_Calc_input").value;
        taxanswer = Math.round(taxcalc * 1.1);
        document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
    }else{
        document.getElementById("id_Calc_lists_child_col3").className = "Calc_lists_col_active";
        col = 1;
        ratetax = 2;
        var taxcalc = document.getElementById("id_Calc_input").value;
        taxanswer = Math.round(taxcalc * 1.1);
        document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
    }
}

/* 税率計算入力フォームロジック */
document.getElementById("id_Calc_input").addEventListener("keyup", function(){
    /* 入力値を変数に格納 */
    var taxcalc = document.getElementById("id_Calc_input").value;

    /* 正規表現：半角数字のみ許容,先頭が0を非許容 */
    var regex = /^([1-9]\d*|0)$/;
    var regex2 = /[A-Za-z-!"#$%&'()=<>,.?_\[\]{}@^~\\]/;

    if(regex.test(taxcalc)){

        error_resetmsg()

        /* 食料品税率計算(roundで丸めることにより入力値100の際のバグ挙動等を回避) */
        if(ratetax == 1){
            taxanswer = Math.round(taxcalc * 1.08);
            document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
        }
        else if(ratetax == 2){
            taxanswer = Math.round(taxcalc * 1.1);
            document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
        }
        else if(ratetax == 0){
            taxanswer = Math.round(taxcalc * 1);
            document.getElementById("Calc_tax_answer").innerHTML = taxanswer;
        }
    }
    else{

        /* 入力出力欄初期化 */
        document.getElementById("id_Calc_input").value = null;
        document.getElementById("Calc_tax_answer").innerHTML = 0;
        error_msg();
    }
},false);

/* error表示 */
function error_msg(){
    document.getElementById("id_Calc_alert").className = "Calc_alert_active";
}
function error_resetmsg(){
    document.getElementById("id_Calc_alert").className = "Calc_alert";
}