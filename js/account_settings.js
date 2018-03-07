$.ajax({
    method:"GET",
    url: url + "v1/account/detail",
    dataType: "json",
    async: true,
    data:{
        token: localStorage.token 
    },
    xhrFields: {
        withCredentials: true
    }
})
.done(function(data){
    if( data.code == "success" ){
        var user_data = data.data.account;
        if( user_data.avatar != undefined){
            $(".upload").css("background","url("+ url_img + user_data.avatar +")");
            $(".upload").css("background-size","100% 100%");
        }
        $("#UserName").val( user_data.name );
        $(".user_phone_number").html( user_data.phone );
        // if( user_data.weipayId == "false"){
        //     $("#binding").addClass("active");
        //     $("#binding").attr("disabled",false);
        // }else if( user_data.weipayId == "true"){
        //     $("#binding").removeClass("active");
        //     $("#binding").attr("disabled",true);
        // }
    }
})
var avatarPath = ""
$("#Upload").change(function(){
    var inputFile = $("#Upload");
    const file = this.files[0] // 单个文件直接files[0]就可以取到，多个文件要做循环
    if (!file) return // 清空inputFile内容时，不执行下面的代码
    if (!/image\/\w+/.test(file.type)) return console.log('只支持png，jpg等图片格式') // 判断是否为图片文件,否就跳出function
    if (file.type === 'image/svg+xml') return console.log('不支持上传svg图片') // 或是根据需求判断某种格式图片文件，否就跳出function
    if (file.size > 5242880) return console.log('只支持上传5m以下大小的图片') // 判断上传图片大小，否就跳出function
    const fileReader = new FileReader() // 创建FileReader对象
    fileReader.readAsDataURL(file) // 开始读取指定的file中的内容。一旦完成，result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容。
    fileReader.onload = function (e) { // 当读取完成
        $("#Upload").parent().css("background","url("+ e.currentTarget.result +")");
        $("#Upload").parent().css("background-size","100% 100%");
    }
    var  img = $("#Upload")[0].files[0];
    var abc = new FormData();
        abc.append( 'token',localStorage.token );
        abc.append( 'type',"avatar" );
        abc.append( 'img',img );
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
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            avatarPath = data.data.picturePath;
            return;
        }
        if( data.code == "account_token_invalid" ){
            alert("身份已失效,请重新登陆");
            return;
        }
        if( data.code == "image_create_fail" ){
            alert("头像上传失败,请重新上传");
            return;
        }
    })
})

$("#Submit").click(function(){
    $.ajax({
        method: "POST",
        url: url + "v1/account/detail/change",
        async: true,
        dataType: "json",
        data:{
            token:localStorage.token,
            avatarPath:avatarPath,
            name:$("#UserName").val()
        },
        xhrFields: {
            withCredentials: true
        } 
    })
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            alert("修改成功,请重新登陆,查看修改后内容");
            return;
        }
        if( data.code == "name_format_error" ){
            alert("用户名格式错误");
            return;
        }
        if( data.code == "account_token_invalid" ){
            alert("身份已失效,请重新登陆");
            return;
        }
        if( data.code == "account_detail_change_fail" ){
            alert("修改失败");
            return;
        }
        if( data.code == "account_not_found" ){
            alert("用户不存在");
            return;
        }
    })
})
$("#binding").click(function(){
    $(".wechat_img_price img").attr("src",url+"v1/account/wei/bind?token="+localStorage.token);
    $(".WeChat_mask").show();
})
$(".WeChat_mask").click(function(){
    $(this).hide();
})
