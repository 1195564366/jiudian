var orderId = ""    //订单ID
var score = ""      //评价分，最低1分，最高5分
var picturePathArry= [];     //评价照片地址数组，转成json字符串
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


function dataURLtoBlob(dataurl) {   //base64 转blod;
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
    dataurl = Blob;
    console.log( Blob );
    console.log( dataurl );
}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
//test:
var file = dataURLtoFile('data:text/plain;base64,YWFhYWFhYQ==', 'test.txt');
var delete_i = 0;
const inputFile = document.querySelector('#Upload') // 获取input元素
inputFile.onchange = function () {
    const file = this.files[0] // 单个文件直接files[0]就可以取到，多个文件要做循环
    if (!file) return // 清空inputFile内容时，不执行下面的代码
    if (!/image\/\w+/.test(file.type)) return console.log('只支持png，jpg等图片格式') // 判断是否为图片文件,否就跳出function
    if (file.type === 'image/svg+xml') return console.log('不支持上传svg图片') // 或是根据需求判断某种格式图片文件，否就跳出function
    if (file.size > 5242880) return console.log('只支持上传5m以下大小的图片') // 判断上传图片大小，否就跳出function
    const fileReader = new FileReader() // 创建FileReader对象
    fileReader.readAsDataURL(file) // 开始读取指定的file中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
    fileReader.onload = function (e) { // 当读取完成
    //   console.log(e.currentTarget.result) // 即为input选取的图片文件转化的base64格式字符串
        var result_file = e.currentTarget.result
        result_file = dataURLtoBlob( result_file );
        setTimeout( function(){
            console.log( result_file );
            result_file = dataURLtoFile( e.currentTarget.result , result_file.type );
            setTimeout(function(){
                console.log( result_file );
                // result_file = result_file.name;
                console.log( result_file );
                picturePathArry.push( result_file );
                console.log( picturePathArry );
            },300)
        },300 );
        var str = `
            <div class="img_cr" data-id="`+ delete_i +`">
                <img src="`+ e.currentTarget.result +`" alt="" class="img_show">
                <button class="delete">x</button>
            </div>
            `
        $(".container").append( str );
        delete_i ++;
        if( picturePathArry.length == 10 ){
            $(".Choose_photo").hide();
            $(".Hint").hide();
        } 
    }
}
Array.prototype.del=function(index){    //删除数组指定下标元素
    if(isNaN(index)||index>=this.length){  
        return false;  
    }  
    for(var i=0,n=0;i<this.length;i++){  
        if(this[i]!=this[index]){  
            this[n++]=this[i];  
        }  
    }  
    this.length-=1;  
};  
$(".container").on('click','button',function(){
    picturePathArry.del( $(this).parent().attr("data-id") );
    console.log( picturePathArry )
    $(this).parent().remove();
    var img_cr_all = $(".img_cr");
    for(i=0;i<img_cr_all.length;i++){
        $( img_cr_all[i] ).attr("data-id",i);
    }
    $(".Choose_photo").show();
    $(".Hint").show();
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
    // console.log( picturePathArry );
    var token = localStorage.token;
    // var abc=new FormData();
    // abc.append('token',token);
    // abc.append('type',"evaluate");
    // abc.append('img',picturePathArry);
    if( score == "" ){
        alert("请选取评分等级");
        return;
    }
    if( $(".evaluation_content").val().length == 0 ){
        alert("请填写评价内容");
        return;
    }
    if( picturePathArry.length != 0 ){
        var abc = new FormData();
        abc.append( 'token',token );
        abc.append( 'type',"evaluate" );
        abc.append( 'img',picturePathArry );
        $.ajax({
            method: "POST",
            url: url + "v1/upload/picture",
            headers: {
                Accept: "multipart/form-data"
            },
            async: true,
            dataType: "json",
            data:abc,
            // {
            //     token:token,
            //     type:"evaluate",
            //     img:picturePathArry
            // },
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
                // picturePathArry = arrayObject.toString(data.data.picturePath);
                // console.log( picturePathArry );
                // evaluate_judge = 2;
                return;
            }
            if( data.code == "account_token_invalid" ){
                alert("身份已失效,请重新登陆,点击后跳转登陆页面");
                window.location.href = "login.html";
                return;
            }
            if( data.code == "image_create_fail" ){
                alert("图片上传失败,请重新上传");
                return;
            }
        } )
    }
    if( picturePathArry.length == 0 ){
        picturePathArry = "";
    }
    setTimeout(function(){
        if( evaluate_judge == 2 ){
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
                    picturePathArry:picturePathArry
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                console.log(data);
            })
        }
    },1000)
})
$(document).ready(function(){
    add_content();
})



