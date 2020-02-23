/* animation初期設定 */
window.addEventListener("load", function(){
    glass_img = new Array();
    for(i = 1; i < 305; i++){
    glass_img[i] = "../png/glass (" + i + ").png";
}
    document.getElementById("id_Body_lists_leftChild2").className = "Body_lists_leftChild2_active";
    Change_img()
},false)

/* waterdrop */
/*
var count = 1;
function counter(){
    count++;
    document.getElementById("id_Main_img").src = "../png/glass (" + count + ").png";
    setTimeout(counter, 500);
}
    window.onload = function(){
        counter();
        getImages();
    }*/

/*
    window.onload = function(){
        for(i = 1; i < 306; i++){
            var img = document.createElement("img");
            img.src = "../png/glass (" + i + ").png";
        }
    }
    
    document.getElementById("id_Main_img").addEventListener("click", function(){
        document.getElementById("id_Main_img").src = img
    },false);

    var _imgArray = ["img1.jpg","img2.jpg",img3.jpg];
    function loopImageLoader(i){
      var image1 = new Image();
      image1.src = _imgArray[i];
      image1.onload = function(){
        i++;
        if(_imgArray.length != i){
          loopImageLoader(i);
        }
      }
    }
    loopImageLoader(0)*/

     	
/*
    window.onload = function(){
    var image = [];
for(i = 1; i < 306; i++){
        var img = document.createElement('img');
        image[i] = "../png/glass (" + i + ").png";
        img.src = image[i];
        console.log(img);
        document.body.appendChild(img);
}}

var count = 1;
function counter(){
    count++;
    document.getElementById("id_Main_img").src = image[count];
    setTimeout(counter, 41);
}
document.getElementById("id_Main_img").addEventListener("click", function(){
        counter();
    },false);


var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
    var img = new Image();
    img.onload = function() {
        console.log('読み込み完了');
    }
    img.src = images[i].src;
};

var img = new Image();
img.addEventListener("load", function(){
    console.log(img.width);
},false);*/
/*
var count = 1;
var switch_w = 0; 

document.getElementById("id_Main_img").addEventListener("click", function(){

if(switch_w == 0){
        counter();
        getElementById("id_Main_img").disabled;
    }
    else{
        counter2();
    }

},false);

function counter(){
    if(count > 304){
    }
    else{
    count++;
    document.getElementById("id_Main_img").src = "../png/glass (" + count + ").png";
    setTimeout(counter, 100);
    }
}

function counter2(){
    if(count < 2){
    }
    else{
    count--;
    document.getElementById("id_Main_img").src = "../png/glass (" + count + ").png";
    setTimeout(counter, 100);
    }
}
*/



/*
    count_img = 0;
    function Change_img(){
        if (count_img == glass_img.length-1){
            count_img=1;
        }else{
            count_img++;
        }
        document.getElementById("id_Main_img").src = glass_img[count_img];
        setTimeout( "Change_img()" , 96 );
    }
*/
/*
    count_img = 305;
    function Change_img(){
        if (count_img == 1){
            count_img=304;
        }else{
            count_img--;
        }
        document.getElementById("id_Main_img").src = glass_img[count_img];
        setTimeout( "Change_img()" , 96 );
    }
    */

/* 各種変数  switch=0で前進,1で後進,2で停止　countでpngフォルダの画像を配列に格納*/
switch_img = 0;
count_img = 0;

/*　画像コマ送り(前進) */
    function Change_img_go(){
        if (count_img == glass_img.length-1){
            document.getElementById("id_Main_img").src = glass_img[count_img];
            setTimeout( "Change_img()" , 96);
            switch_img = 1;
        }else{
            count_img++;
            document.getElementById("id_Main_img").src = glass_img[count_img];
            setTimeout( "Change_img()" , 96);
        }
        
    }

/*　画像コマ送り(後進) */
    function Change_img_back(){
        if (count_img == 1){
            count_img = 1;
            switch_img = 2;
            document.getElementById("id_Main_img").src = glass_img[count_img];
            setTimeout( "Change_img()" , 96);
        }else{
            
            count_img--;
            document.getElementById("id_Main_img").src = glass_img[count_img];
            setTimeout( "Change_img()" , 96);
        }
        
    }

/*　画像コマ送りロジック(再帰関数) */
    function Change_img(){
        if(switch_img == 0){
            Change_img_go();  
        }
        else if(switch_img == 1){
            Change_img_back();
        }
    }