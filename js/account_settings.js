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
        $(".user_head_img").attr("src",url_img + user_data.avatar);
        $("#UserName").val( user_data.name );
        $(".user_phone_number").html( user_data.phone );
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
            $(".modal-body p").html( '身份已失效,请重新登陆,<a href="login.html">点击跳转登陆页面</a>' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "image_create_fail" ){
            $(".modal-body p").html( '头像上传失败,请重新上传' );
            $('#myModal').modal('show');
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
            $(".modal-body p").html( '修改成功,3秒后页面将自动刷新后可查看修改内容' );
            $('#myModal').modal('show');
            setTimeout(function(){
                location.reload();
            },3000)
            return;
        }
        if( data.code == "name_format_error" ){
            $(".modal-body p").html( '用户名格式错误' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "account_token_invalid" ){
            $(".modal-body p").html( '身份已失效,请重新登陆,<a href="login.html">跳转登陆页面</a>' );
            $('#myModal').modal('show');
            
            return;
        }
        if( data.code == "account_detail_change_fail" ){
            $(".modal-body p").html( '修改失败' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "account_not_found" ){
            $(".modal-body p").html( '用户不存在' );
            $('#myModal').modal('show');
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
