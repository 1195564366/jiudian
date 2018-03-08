var orderId = ""    //订单ID
var score = ""      //评价分，最低1分，最高5分

function add_content(){ //动态添加页面跳转来的内容
    var content_url = window.location.href;
    content_url = content_url.split("?");
    console.log( content_url );
    //订单ID
    orderId = content_url[ content_url.length-1 ].split("=")[ content_url[ content_url.length-1 ].split("=").length-1 ];
    //房间名称
    $(".Room_name").html( decodeURI( content_url[ content_url.length-2 ].split("=")[ content_url[ content_url.length-2 ].split("=").length-1 ] ) )
    //订单价格
    $(".Room_price span").html( decodeURI( content_url[ content_url.length-3 ].split("=")[ content_url[ content_url.length-3 ].split("=").length-1 ] ) )
    //酒店照片
    $( ".Hotel_price" ).attr( "src",url_img + content_url[ content_url.length-4 ].split("=")[ content_url[ content_url.length-4 ].split("=").length-1 ] )
    //酒店名称
    $(".Hotel_name").html( decodeURI( content_url[ content_url.length-5 ].split("=")[ content_url[ content_url.length-5 ].split("=").length-1 ] ) )
}
//评分星级
$(".start1").click(function(){  //一级
    var img = $(this).find("img").attr("src");
    img = img.split("/")[img.split("/").length-2];
    $(".evaluate").find("img").attr("src", img + "/icon_star_no.png");
    $(this).find("img").attr("src", img + "/icon_star_yes.png");
    score = 1;
    if( $(".evaluation_content").val().length > 0 ){
        $("#submit").attr("disabled",false);
        $("#submit").addClass("active");
    }
})
$(".start2").click(function(){  //二级
    var img = $(this).find("img").attr("src");
    img = img.split("/")[img.split("/").length-2];
    $(".evaluate").find("img").attr("src", img + "/icon_star_no.png");
    $(".start1").find("img").attr("src", img + "/icon_star_yes.png");
    $(this).find("img").attr("src", img + "/icon_star_yes.png");
    score = 2;
    if( $(".evaluation_content").val().length > 0 ){
        $("#submit").attr("disabled",false);
        $("#submit").addClass("active");
    }
})
$(".start3").click(function(){  //三级
    var img = $(this).find("img").attr("src");
    img = img.split("/")[img.split("/").length-2];
    $(".evaluate").find("img").attr("src", img + "/icon_star_no.png");
    $(".start1").find("img").attr("src", img + "/icon_star_yes.png");
    $(".start2").find("img").attr("src", img + "/icon_star_yes.png");
    $(this).find("img").attr("src", img + "/icon_star_yes.png");
    score = 3;
    if( $(".evaluation_content").val().length > 0 ){
        $("#submit").attr("disabled",false);
        $("#submit").addClass("active");
    }
})
$(".start4").click(function(){  //四级
    var img = $(this).find("img").attr("src");
    img = img.split("/")[img.split("/").length-2];
    $(".evaluate").find("img").attr("src", img + "/icon_star_no.png");
    $(".start1").find("img").attr("src", img + "/icon_star_yes.png");
    $(".start2").find("img").attr("src", img + "/icon_star_yes.png");
    $(".start3").find("img").attr("src", img + "/icon_star_yes.png");
    $(this).find("img").attr("src", img + "/icon_star_yes.png");
    score = 4;
    if( $(".evaluation_content").val().length > 0 ){
        $("#submit").attr("disabled",false);
        $("#submit").addClass("active");
    }
})
$(".start5").click(function(){  //五级
    var img = $(this).find("img").attr("src");
    img = img.split("/")[img.split("/").length-2];
    $(".evaluate").find("img").attr("src", img + "/icon_star_yes.png");
    score = 5;
    if( $(".evaluation_content").val().length > 0 ){
        $("#submit").attr("disabled",false);
        $("#submit").addClass("active");
    }
}) 
$(".container #uploadForm").on('change','#Upload',function(){
    var inputFile = $("#Upload");
    const file = this.files[0] // 单个文件直接files[0]就可以取到，多个文件要做循环
    if (!file) return // 清空inputFile内容时，不执行下面的代码
    if (!/image\/\w+/.test(file.type)) return console.log('只支持png，jpg等图片格式') // 判断是否为图片文件,否就跳出function
    if (file.type === 'image/svg+xml') return console.log('不支持上传svg图片') // 或是根据需求判断某种格式图片文件，否就跳出function
    if (file.size > 5242880) return console.log('只支持上传5m以下大小的图片') // 判断上传图片大小，否就跳出function
    const fileReader = new FileReader() // 创建FileReader对象
    fileReader.readAsDataURL(file) // 开始读取指定的file中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
    fileReader.onload = function (e) { // 当读取完成
        $(inputFile).parent().append( '<button class="delete">x</button>' );
        $(inputFile).parent().css("border","none");
        $(inputFile).parent().find( 'img' ).attr('src',e.currentTarget.result);
        $(inputFile).parent().find( 'img' ).css('width',"58px");
        $(inputFile).parent().find( 'img' ).css('height',"58px")
        $(inputFile).parent().find( 'img' ).css('margin',0)
        $(inputFile).attr('id',"");
        $(inputFile).css('z-index',-1);
        var str = `
             <div class="Choose_photo">      
                <img src="images/icon_photo.png" alt="">
                <input id="Upload" type="file" name="file" accept="image/*">
            </div> 
             `
        $(".container #uploadForm").append( str );
        var input_lenght = $("#uploadForm input");
        if( input_lenght.length>=11 ){
            $("#Upload").parent().hide();
            $(".Hint").hide();
        }
    }
})
$(".container").on('click','button',function(){ 
    $(this).parent().remove();
    var input_lenght = $("#uploadForm input");
    if( input_lenght.length <= 10){
        $("#Upload").parent().show();
        $(".Hint").show();
    }
})
$(".evaluation_content").blur(function(){
    if( $(this).val().length > 0 ){
        $("#submit").attr("disabled",false);
        $("#submit").addClass("active");
    }
})
$(".evaluation_content").keyup(function(){
    if( score != "" ){
        if( $(this).val().length > 0 ){
            $("#submit").attr("disabled",false);
            $("#submit").addClass("active"); 
        }else{
            $("#submit").attr("disabled",true);
            $("#submit").removeClass("active"); 
        }
    } 
})



var evaluate_judge = 1;
$("#submit").click(function(){
    var token = localStorage.token;
    
    var img_url= [];   
    var picturePathArry= "";   
    var file_img = $(".container #uploadForm input"); 
    if( file_img.length >1 ){
        for(i=0;i<file_img.length-1;i++){
            picturePathArry = file_img[i].files[0];
            var abc = new FormData();
            abc.append( 'token',token );
            abc.append( 'type',"evaluate" );
            abc.append( 'img',picturePathArry );
            $.ajax({
                method: "POST",
                url: url + "v1/upload/picture",
                async: true,
                dataType: "json",
                data:abc,
                processData: false,
                contentType: false,
                xhrFields: {
                    withCredentials: true
                }
            })
            .done( function(data){
                console.log( data );
                if( data.code == "success" ){
                    console.log( data.data.picturePath )
                    img_url.push( data.data.picturePath );
                    evaluate_judge = 1;
                    return;
                }
                if( data.code == "account_token_invalid" ){
                    evaluate_judge = 2;
                    $(".modal-body p").html( '身份已失效,请重新登陆,<a href="login.html">点击后跳转登陆页面<a/>' );
                    $('#myModal').modal('show');
                    return;
                }
                if( data.code == "image_create_fail" ){
                    evaluate_judge = 2;
                    $(".modal-body p").html( '图片上传失败,请重新上传' );
                    $('#myModal').modal('show');
                    return;
                }
            } )
        }
    } 
    
    if( score == "" ){
        $(".modal-body p").html( '请选取评分等级' );
        $('#myModal').modal('show');
        return;
    }
    if( $(".evaluation_content").val().length == 0 ){
        $(".modal-body p").html( '请填写评价内容' );
        $('#myModal').modal('show');
        return;
    }
    if( picturePathArry.length == 0 ){
        picturePathArry = "";
    }
    setTimeout(function(){
        if( evaluate_judge == 1 ){
            console.log( img_url );
            img_url = JSON.stringify( img_url );
            var content = $(".evaluation_content").val();
            $.ajax({
                method: "POST",
                url: url + "v1/order/evaluate",
                async: true,
                dataType: "json",
                data:{
                    token:token,
                    orderId:orderId,
                    score:score,
                    content:content,
                    picturePathArry:img_url
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if( data.code == "success" ){
                    $(".modal-body p").html( '评价成功,<a href="my_order.html">点击返回订单页面</a>' );
                    $('#myModal').modal('show');
                    return;
                }
                if( data.code == "account_token_invalid" ){
                    $(".modal-body p").html( '身份已失效,请重新登陆' );
                    $('#myModal').modal('show');
                    return;
                }
                if( data.code == "already_evaluated" ){
                    $(".modal-body p").html( '该订单已经评价过了,<a href="my_order.html">点击返回订单页面</a>' );
                    $('#myModal').modal('show');
                    return;
                }
                if( data.code == "evaluate_fail" ){
                    $(".modal-body p").html( '评价失败' );
                    $('#myModal').modal('show');
                    return;
                }
            })
        }
    },1000)
})
$(document).ready(function(){
    add_content();
})



