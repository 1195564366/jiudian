$("main .login .nav ul li").click(function(){
    $(this).parent().find("li").removeClass("active");
    $(this).addClass("active");
    if( $(this).attr("data-id") == 1 ){
        $(".account_login").css("display","block");
        $(".SMS_login").css("display","none");
    }else if( $(this).attr("data-id") == 2 ){
        $(".account_login").css("display","none");
        $(".SMS_login").css("display","block"); 
    }
})

$("main .login .account_login ul li input").focus(function(){   //input选中切换图片
    var src = $(this).parent().find("img").attr("src");
    src = src.split(".");
    src = src[0] + "_selected." + src[1];
    $(this).parent().find("img").attr("src",src);
    // console.log(src);
}).blur(function(){
    var src = $(this).parent().find("img").attr("src");
    src = src.split("_selected");
    src = src[0] + src[1];
    $(this).parent().find("img").attr("src",src);
})

$(".account_login .phone").blur(function(){ //账号登陆 账户输入框失去焦点判断
    remove_error($(".account_login").parent().find(".phone_error"),"25px")
    if( $(this).val() == "" ){
        $(this).parent().append('<div class="phone_error error">请输入用户名或手机号</div>');
        $(this).parent().css("margin-bottom","4px");
        return;
    }
})

$(".account_login .pwd").blur(function(){ //账号登陆 密码输入框失去焦点判断
    remove_error($(".account_login").parent().find(".pwd_error"),"21px")
    if( $(this).val() == "" ){
        $(this).parent().append('<div class="pwd_error error">'+ input_pwd1 +'</div>');
        $(this).parent().css("margin-bottom",0);
        return;
    }
    if( $(this).val().length<6 || $(this).val().length>32){
        $(this).parent().append('<div class="pwd_error error">密码位数不对,请仔细输入</div>');
        $(this).parent().css("margin-bottom",0);
        return;
    }
})


$("#account_login").click(function(){   //账号登陆发送登陆请求
    var nameOrPhone = $(".account_login .phone").val();
    var password = $(".account_login .pwd").val();
    $.ajax({
        method: "POST",
        url: url + "v1/account/login",
        dataType: "json",
        async: true,
        data: {
            nameOrPhone:nameOrPhone,
            password:password
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            console.log(data);
            if( data.code == "success" ){
                localStorage.id = data.data.account._id;
                localStorage.token = data.data.account.token;
                localStorage.name = data.data.account.name;
                localStorage.avatar = data.data.account.avatar;
                var str = `
                    <div class="prompt" style="color:#00CC66;margin-top:10px">
                        <img src="images/loading.gif" alt="" width="21px" style="vertical-align: middle;">
                        登陆成功,正在进入网站首页
                    </div>
                `
                $("#account_login").parent().append(str);
                $("#account_login").parent().css("margin-bottom","26px");
                setTimeout(function(){
                    window.location.href = "index.html"; 
                },3000)
                return;
            }
            if( data.code == "account_password_error" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        账号或密码错误
                    </div>
                `
                $("#account_login").parent().append(str);
                $("#account_login").parent().css("margin-bottom","26px");
                return;
            }
            if( data.code == "account_login_fail" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        登陆失败,请重新登陆
                    </div>
                `
                $("#account_login").parent().append(str);
                $("#account_login").parent().css("margin-bottom","26px");
                return;
            }
            if( data.code == "param_incomplete" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        请查看登陆信息是否填写完整
                    </div>
                `
                $("#account_login").parent().append(str);
                $("#account_login").parent().css("margin-bottom","26px");
                return;
            }
        }
    )
})


$(".SMS_login .phone").blur(function(){ //短信快捷登陆 手机号码输入框失去焦点判断输入信息是否完整
    remove_error($(".SMS_login .phone_error"),"21px")
    phone_error( $(this) );
})

$(".SMS_login .img_yzm").blur(function(){ //短信快捷登陆 图文验证码输入框失去焦点判断输入信息是否完整
    remove_error($(".SMS_login .img_yzm_error"),"21px");
    img_yzm( $(this) )
})

$(".SMS_login .graphical_yzm").click(function(){    //短信快捷登陆 切换图文验证码
    Gvc($(this));
})

$(".SMS_login .submit_yzm").click(function(){   //短信快捷登陆 获取短信验证码按钮事件
    Obtain_SMS_judge( $(".SMS_login .phone_error") , $(".SMS_login .img_yzm_error") , "phone_error" , "img_yzm_error" , $(".SMS_login .phone") , $(".SMS_login .img_yzm") , "21px" , "21px" , 0 , 0 , $(".SMS_login .submit_yzm"), $(".SMS_login .see_yzm"),"login");
})

$(".SMS_login .see_yzm").click(function(){   //短信快捷登陆 查看短信验证码按钮事件
    see_yzm($(".SMS_login .phone").val(),"login");
})
$(".yzm").blur(function(){  //短信快捷登陆 短信验证码输入框失去焦点判断输入内容是否完整
    remove_error($(".yzm_error"),"33px");
    SMS_yzm( $(this) , "12px")
})

$("#SMS_login").click(function(){ //短信快捷登陆发送登陆请求
    $.ajax({
        method: "POST",
        url: url + "v1/account/login/fast",
        async: true,
        dataType: "json",
        data:{
            phone: $(".SMS_login .phone").val(),
            smsCaptcha: $(".SMS_login .yzm").val()
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            console.log(data);
            if( data.code == "success" ){
                localStorage.id = data.data.account._id;
                localStorage.token = data.data.account.token;
                localStorage.name = data.data.account.name;
                localStorage.avatar = data.data.account.avatar;
                var str = `
                    <div class="prompt" style="color:#00CC66;margin-top:10px">
                        <img src="images/loading.gif" alt="" width="21px" style="vertical-align: middle;">
                        登陆成功,正在进入网站首页
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                setTimeout(function(){
                    window.location.href = "index.html";
                },3000)
                return;
            }
            if( data.code == "param_incomplete" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        请查看登陆信息是否填写完整
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                return;
            }
            if( data.code == "phone_format_error" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        手机号码格式不正确
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                return;
            }
            if( data.code == "sms_captcha_not_found" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        短信验证码不存在请重新获取
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                return;
            }
            if( data.code == "sms_captcha_illegal" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        非法短信验证码,请查看输入是否有误
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                return;
            }
            if( data.code == "sms_captcha_fail" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        短信验证码错误,请重新获取
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                return;
            }
            if( data.code == "account_login_fail" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        登陆失败,请重新登陆
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                return;
            }
            if( data.code == "account_not_found" ){
                var str = `
                    <div class="prompt" style="color:red;margin-top:10px">
                        <img src="images/error.png" alt="" width="21px" style="vertical-align: middle;">
                        账号不存在,请先创建账号
                    </div>
                `
                $("#SMS_login").parent().append(str);
                $("#SMS_login").parent().css("margin-bottom","23px");
                return;
            }
        }
    )
})

$(document).ready(function(){
    register_header();
    register_footer();
    Gvc($(".SMS_login .graphical_yzm"));
})




$(".account_login input").keyup(function(){ //判断短信快捷登陆 登陆按钮是否启用
    account_login_judge();
    $(".prompt").remove();
})
function account_login_judge(){ //判断账号登陆 登陆按钮是否启用
    var judge = 1;  //判断开关
    if( $(".account_login .phone").val() == ""){
        judge ++;
    }
    if( $(".account_login .pwd").val() == ""){
        judge ++;
    }
    if( $(".account_login .pwd").val().length < 6){
        judge ++;
    }
    
    if( $(".account_login .phone_error").length != 0 ){
        judge ++;
    }
    if( $(".account_login .pwd_error").length != 0 ){
        judge ++;
    }
    if( judge == 1 ){
        $("#account_login").attr('disabled',false);
        $("#account_login").css('background',"#5944C3");
    }
    if( judge != 1 ) {
        $("#account_login").attr('disabled',true);
        $("#account_login").css('background',"rgba(0,0,0,.35)");
    }

    if( $(".account_login .pwd").val().length >= 6){
        remove_error($(".account_login .pwd_error"),'21px');
    }
    if( $(".account_login .pwd_error").length != 0){
        if( $(".account_login .pwd_error").html() == input_pwd1){
            if( $(".account_login .pwd").val().length != 0){
                remove_error($(".account_login .pwd_error"),'21px');
            }
        }
    }
    if( $(".account_login .phone").val().length != 0){
        remove_error($(".account_login .phone_error"),'25px')
    }
}
$(".SMS_login input").keyup(function(){ //判断短信快捷登陆 登陆按钮是否启用
    SMS_login_judge();
})
function SMS_login_judge(){ //判断短信快捷登陆 登陆按钮是否启用
    var judge = 1   //判断开关
    if( $(".SMS_login .phone").val() =="" ){
        judge ++;
    }
    if( $(".SMS_login .phone").val().length != 11 ){
        judge ++;
    }
    if( $(".SMS_login .phone_error").length != 0 ){
        judge ++;
    }
    if( $(".SMS_login .img_yzm").val() =="" ){
        judge ++;
    }
    if( $(".SMS_login .img_yzm").val().length != 4 ){
        judge ++;
    }
    if( $(".SMS_login .img_yzm_error").length != 0 ){
        judge ++;
    }
    if( $(".SMS_login .yzm").val() == "" ){
        judge ++;
    }
    if( $(".SMS_login .yzm").val().length != 6 ){
        judge ++;
    }
    if( judge == 1 ){
        $("#SMS_login").attr('disabled',false);
        $("#SMS_login").css('background',"#5944C3");
    }
    if( judge != 1 ) {
        $("#SMS_login").attr('disabled',true);
        $("#SMS_login").css('background',"rgba(0,0,0,.35)");
    }
    if( $(".SMS_login .phone").val().length != 0){
        if( $(".SMS_login .phone_error").length !=0 ){
            if( $(".SMS_login .phone_error").html() == input_phone_number ){
                remove_error($(".SMS_login .phone_error"),'21px');
            }
        }
    }
    if( $(".SMS_login .phone").val().length == 0){
        if( $(".SMS_login .phone_error").length !=0 ){
            if( $(".SMS_login .phone_error").html() == phone_number_format_error ){
                remove_error($(".SMS_login .phone_error"),'21px');
                $(".SMS_login .phone").parent().append('<div class="phone_error error">'+ input_phone_number +'</phone>');
                $(".SMS_login .phone").parent().css("margin-bottom",0);
                return;
            }
            if( $(".SMS_login .phone_error").html() == phone_length_eleven ){
                remove_error($(".SMS_login .phone_error"),'21px');
                $(".SMS_login .phone").parent().append('<div class="phone_error error">'+ input_phone_number +'</phone>');
                $(".SMS_login .phone").parent().css("margin-bottom",0);
                return;
            }
        }
    }
    if( $(".SMS_login .phone").val().length == 11 ){
        remove_error($(".SMS_login .phone_error"),"21px");
        if( !(/^1[34578]\d{9}$/.test($(".SMS_login .phone").val())) ){
            $(".SMS_login .phone").parent().append('<div class="phone_error error">'+ phone_number_format_error +'</div>');
            $(".SMS_login .phone").parent().css("margin-bottom",0);
        }
    }
    if( $(".SMS_login .img_yzm").val().length != 0){
        if( $(".SMS_login .img_yzm_error").length !=0 ){
            if( $(".SMS_login .img_yzm_error").html() == input_img_yzm ){
                remove_error($(".SMS_login .img_yzm_error"),'21px');
            }
        }
    }      
    if( $(".SMS_login .img_yzm").val().length == 0){
        if( $(".SMS_login .img_yzm_error").length !=0 ){
            if( $(".SMS_login .img_yzm_error").html() == img_yzm_length_error ){
                remove_error($(".SMS_login .img_yzm_error"),'21px');
                $(".SMS_login .img_yzm_error").parent().append('<div class="img_yzm_error error">'+ input_img_yzm +'</phone>');
                $(".SMS_login .img_yzm_error").parent().css("margin-bottom",0);
            }
        }
    }

    if( $(".SMS_login .img_yzm").val().length == 4){
        remove_error($(".SMS_login .img_yzm_error"),'21px');
    }
    if( $(".SMS_login .yzm").val().length != 0){
        if( $(".SMS_login .yzm_error").length !=0 ){
            if( $(".SMS_login .yzm_error").html() == input_yzm ){
                remove_error($(".SMS_login .yzm_error"),'33px');
            }
        }
    }
    if( $(".SMS_login .yzm").val().length == 0){
        if( $(".SMS_login .yzm_error").length !=0 ){
            if( $(".SMS_login .yzm_error").html() == yzm_length_error ){
                remove_error($(".SMS_login .yzm_error"),'33px');
                $(".SMS_login .yzm").parent().append('<div class="yzm_error error">'+ input_yzm +'</phone>');
                $(".SMS_login .yzm").parent().css("margin-bottom","12px");
            }
        }
    }
    if( $(".SMS_login .yzm").val().length == 6){
        remove_error($(".SMS_login .yzm_error"),'33px')
    }
}

$("input").click(function(){
    remove_error($(".prompt"),"57px")
})