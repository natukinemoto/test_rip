//エラーコードキー(連想配列)
const errorKey = {
    Er0001: "入力エラーです、半角数字で入力してください。",
    Er0002: "価格を半角数字で入力してください。",
    Er0003: "10進数で価格を入力してください。"
};

//エラーコントロール
class Error{
    constructor(errorCode){
        this._errorCode = errorCode;
    }
    //エラーメッセージの取得
    ErrorMessage(){
        //エラーコードキーから設定されたエラーメッセージを取得
        return errorKey[this._errorCode];
    }
}