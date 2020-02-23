/* ヘッダーフォーカス処理 */
/* 大項目 */
document.getElementById("Header_btn_leftChild").onmouseover = function(){
    document.getElementById("Header_btn_leftChild").className = "Header_lists_leftChild_active";
    document.getElementById("id_border_adult").className = "Border_transform_adult_after";
}
document.getElementById("Header_btn_leftChild").onmouseout = function(){
    document.getElementById("Header_btn_leftChild").className = "Header_lists_leftChild";
    document.getElementById("id_border_adult").className = "Border_transform_adult";
}

/*そのうち改修
document.getElementsByClassName("Header_lists_rightChild").onmouseover = function(){
    for(var i = 0; i > 5; i++){
        document.getElementById("Header_btn_rightChild" + i).onmouseover = function(){         
            document.getElementById("Header_btn_rightChild" + i).className = "Header_lists_rightChild_active"; 
        }
    }
}
とりあえず複製して連番で以下のように対応*/
/* 小項目 */
document.getElementById("Header_btn_rightChild1").onmouseover = function(){
    document.getElementById("Header_btn_rightChild1").className = "Header_lists_rightChild_active"
    document.getElementById("Id_border_child1").className = "Border_transform_after";
}
document.getElementById("Header_btn_rightChild1").onmouseout = function(){
    document.getElementById("Header_btn_rightChild1").className = "Header_lists_rightChild";
    document.getElementById("Id_border_child1").className = "Border_transform";
}
document.getElementById("Header_btn_rightChild2").onmouseover = function(){
    document.getElementById("Header_btn_rightChild2").className = "Header_lists_rightChild_active"
    document.getElementById("Id_border_child2").className = "Border_transform_after";
}
document.getElementById("Header_btn_rightChild2").onmouseout = function(){
    document.getElementById("Header_btn_rightChild2").className = "Header_lists_rightChild";
    document.getElementById("Id_border_child2").className = "Border_transform";
}
document.getElementById("Header_btn_rightChild3").onmouseover = function(){
    document.getElementById("Header_btn_rightChild3").className = "Header_lists_rightChild_active"
    document.getElementById("Id_border_child3").className = "Border_transform_after";
}
document.getElementById("Header_btn_rightChild3").onmouseout = function(){
    document.getElementById("Header_btn_rightChild3").className = "Header_lists_rightChild";
    document.getElementById("Id_border_child3").className = "Border_transform";
}
document.getElementById("Header_btn_rightChild4").onmouseover = function(){
    document.getElementById("Header_btn_rightChild4").className = "Header_lists_rightChild_active"
    document.getElementById("Id_border_child4").className = "Border_transform_after";
}
document.getElementById("Header_btn_rightChild4").onmouseout = function(){
    document.getElementById("Header_btn_rightChild4").className = "Header_lists_rightChild";
    document.getElementById("Id_border_child4").className = "Border_transform";
}