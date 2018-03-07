//判断手机号码格式
$(".phone").blur(function(){
    remove_error($(".phone_error"),"21px");
    phone_error( $(this) );
})


//图文验证长度
$(".img_yzm").blur(function(){
    remove_error($(".img_yzm_error"),"21px");
    img_yzm( $(this) );
})


$(".submit_yzm").click(function(){  // 获取短信验证码按钮点击事件
    Obtain_SMS_judge( $(".phone_error") , $(".img_yzm_error") , "phone_error" , "img_yzm_error" , $(".phone") , $(".img_yzm") , "21px" , "21px" , 0 , 0 , $(this), $(".see_yzm"), "register");
})

//查看短信验证码
$(".see_yzm").click(function(){
    see_yzm($(".phone").val(),"register");
})


$(".graphical_yzm").click(function(){   //点击切换图文验证码
    Gvc($(".graphical_yzm"));
});

$(".yzm").blur(function(){  //短信验证码提示信息
    remove_error($(".yzm_error"),"21px");
    SMS_yzm( $(this) , 0);
})

var pwd = ""; //重复密码判断条件
$(".pwd1").blur(function(){
    pwd = $(this).val();
    remove_error($(".pwd1_error"),"21px");
    if( $(this).val() == ""){
        $(this).parent().append('<div class="pwd1_error error">'+ input_pwd1 +'</div>');
        $(this).parent().css("margin-bottom",0);
        return
    }
    if( $(this).val().length<6 || $(this).val().length>32 ){
        console.log(3);
        $(this).parent().append('<div class="pwd1_error error">'+ pwd_length_error +'</div>');
        $(this).parent().css("margin-bottom",0);
        return
    }
})

$(".pwd2").blur(function(){
    remove_error($(".pwd2_error"),"21px");
    if( $(this).val() == ""){
        $(this).parent().append('<div class="pwd2_error error">'+ input_pwd2 +'</div>');
        $(this).parent().css("margin-bottom",0);
        return
    }
    if( $(this).val() != pwd){
        $(this).parent().append('<div class="pwd2_error error">'+ two_pwd_error +'</div>');
        $(this).parent().css("margin-bottom",0);
        return
    }
})

$(".submit_register").click(function(){ //提交注册数据
    var phone = $(".phone").val();
    var password = $(".pwd2").val();
    var smsCaptcha = $(".yzm").val();
    $.ajax({
        method: "POST",
        url: url + "v1/account/register",
        async: true,
        dataType: "json",
        data:{
            phone:phone,
            password:password,
            smsCaptcha:smsCaptcha
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(
        function(data){
            console.log(data);
           if(data.code == "success"){
               alert("注册成功,即将跳转到登陆页面");
               window.location.href="login.html";
               return;
           }
           if(data.code == "param_incomplete"){
                alert("注册信息输入不完整");
                return;
            }
            if(data.code == "phone_format_error"){
                alert("手机号码格式不正确");
                return;
            }
            if(data.code == "password_format_error"){
                alert("密码格式不正确");
                return;
            }
            if(data.code == "sms_captcha_not_found"){
                alert("短信验证码不存在,请重新获取");
                return;
            }
            if(data.code == "sms_captcha_illegal"){
                alert("非法短信验证码,请重新获取");
                return;
            }
            if(data.code == "sms_captcha_fail"){
                alert("短信验证码错误,请重新获取");
                return;
            }
            if(data.code == "phone_has_registered"){
                alert("该手机号码已被注册");
                return;
            }
            if(data.code == "account_create_fail"){
                alert("注册失败,请重新注册");
                return;
            }
        }
    )
})
$(document).ready(function(){
    register_header();
    register_footer();
    // Gvc($(".graphical_yzm"));
})


$(".register input").keyup(function(){
    register_judge();
})
function register_judge(){ //判断注册按钮是否启用
    var judge = 1;  //判断按钮
    if( $(".phone").val() =="" ){
        judge ++;
    }
    if($(".phone_error").length != 0){
        judge ++;
    }
    if($(".img_yzm_error").length != 0){
        judge ++;
    }
    if($(".yzm_error").length != 0){
        judge ++;
    }
    if($(".pwd1_error").length != 0){
        judge ++;
    }
    if($(".pwd2_error").length != 0){
        judge ++;
    }
    if( $(".img_yzm").val() =="" ){
        judge ++;
    }
    if( $(".img_yzm").val().length != 4 ){
        judge ++;
    }
    if( $(".yzm").val() =="" ){
        judge ++;
    }
    if( $(".yzm").val().length != 6 ){
        judge ++;
    }
    if( $(".pwd1").val() =="" ){
        judge ++;
    }
    if( $(".pwd2").val() =="" ){
        judge ++;
    }
    if( $(".pwd1").val() != $(".pwd2").val()){
        judge ++;
    }
    if( judge == 1){
        $(".submit_register").attr('disabled',false);
        $(".submit_register").css('background',"#5944C3");
    }
    if( judge != 1 ){
        $(".submit_register").attr('disabled',true);
        $(".submit_register").css('background',"rgba(0,0,0,.35)");
    }  
    if( $(".phone").val().length != 0){
        if( $(".phone_error").length != 0){
            if( $(".phone_error").html() == input_phone_number ){
                remove_error($(".phone_error"),"21px")
            }
        }
    }
    if( $(".phone").val().length == 0){
        if( $(".phone_error").length != 0){
            if( $(".phone_error").html() == phone_number_format_error ){
                remove_error($(".phone_error"),"21px");
                $(".phone").parent().append('<div class="phone_error error">'+ input_phone_number +'</phone>');
                $(".phone").parent().css("margin-bottom",0);
            }
        }
    }
    if( $(".phone").val().length == 11 ){
        remove_error($(".phone_error"),"21px");
        if( !(/^1[34578]\d{9}$/.test($(".phone").val())) ){
            $(".phone").parent().append('<div class="phone_error error">'+ phone_number_format_error +'</div>');
            $(".phone").parent().css("margin-bottom",0);
        }
    }

    if( $(".img_yzm").val().length != 0){
        if( $(".img_yzm_error").length != 0){
            if( $(".img_yzm_error").html() == input_img_yzm ){
                remove_error($(".img_yzm_error"),"21px")
            }
        }
    }

    if( $(".img_yzm").val().length == 4){
        if( $(".img_yzm_error").length != 0){
            if( $(".img_yzm_error").html() == img_yzm_length_error ){
                remove_error($(".img_yzm_error"),"21px")
            }
        }
    }

    if( $(".img_yzm").val().length == 0){
        if( $(".img_yzm_error").length != 0){
            if( $(".img_yzm_error").html() == img_yzm_length_error ){
                remove_error($(".img_yzm_error"),"21px");
                $(".img_yzm").parent().append('<div class="img_yzm_error error">'+ input_img_yzm +'</div>');
                $(".img_yzm").parent().css("margin-bottom",0);
            }
        }
    }

    if( $(".yzm").val().length != 0){
        if( $(".yzm_error").length != 0){
            if( $(".yzm_error").html() == input_yzm ){
                remove_error($(".yzm_error"),"21px")
            }
        }
    }
    if( $(".yzm").val().length == 6 ){
        if( $(".yzm_error").length != 0){
            if( $(".yzm_error").html() == yzm_length_error ){
                remove_error($(".yzm_error"),"21px")
            }
        }
    }
    if( $(".pwd1").val().length != 0 ){
        if( $(".pwd1_error").length != 0){
            if( $(".pwd1_error").html() == input_pwd1 ){
                remove_error($(".pwd1_error"),"21px")
            }
        }
    }
    if( $(".pwd2").val().length != 0 ){
        if( $(".pwd2_error").length != 0){
            if( $(".pwd2_error").html() == input_pwd2 ){
                remove_error($(".pwd2_error"),"21px")
            }
        }
    }
    if( $(".pwd2").val().length == 0 ){
        if( $(".pwd2_error").length != 0){
            if( $(".pwd2_error").html() == two_pwd_error ){
                remove_error($(".pwd2_error"),"21px");
                $(".pwd2").parent().append('<div class="pwd2_error error">'+ input_pwd2 +'</div>');
                $(".pwd2").parent().css("margin-bottom",0);
            }
        }
    }
    if( $(".pwd2").val().length == $(".pwd1").val().length ){
        if( $(".pwd1").val() != $(".pwd2").val()){
            remove_error($(".pwd2_error"),"21px");
            $(".pwd2").parent().append('<div class="pwd2_error error">'+ two_pwd_error +'</div>');
            $(".pwd2").parent().css("margin-bottom",0);
        }else{
            remove_error($(".pwd2_error"),"21px");
        }
    } 
}










                