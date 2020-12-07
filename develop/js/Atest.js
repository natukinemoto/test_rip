jQuery(function($){
    var targetURL = '/ajax.php?url=http://zip.cgis.biz/xml/zip.php?zn=0600000';
    var xhr = $.ajax({
        type: 'GET',
        url: targetURL,
        dataType: 'text',
        timeout: 30000
    });
    xhr.success(function(res){
        $('body').append('通信成功');
    });
    xhr.error(function(res){
        $('body').append('通信失敗');
    });
    xhr.complete(function(res){
    });
});