
$(".verification_information .phone").blur(function(){  //身份验证 手机号码输入框失去焦点判断输入信息
    remove_error($(".verification_information .phone_error"),"21px");
    phone_error( $(this) );
})
$(".verification_information .graphical_yzm").click(function(){     //身份验证 图文验证码点击切换
    Gvc( $(this) );
})
$(".verification_information .img_yzm").blur(function(){    //身份验证 图文验证码输入框失去焦点判断输入信息
    remove_error($(".verification_information .img_yzm_error"),"21px");
    img_yzm( $(this) );
})

$(".verification_information .yzm").blur(function(){    //身份验证 短信验证码输入框失去焦点判断输入信息
    remove_error($(".verification_information .yzm_error"),"30px");
    SMS_yzm( $(this), "9px");
})
$(".verification_information .submit_yzm").click(function(){    //身份验证 获取短信按钮点击事件
    Obtain_SMS_judge( $(".verification_information .phone_error") , $(".verification_information .img_yzm_error") , "phone_error" , "img_yzm_error" , $(".verification_information .phone") , $(".verification_information .img_yzm") , "21px" , "21px" , 0 , 0 , $(this), $(".verification_information .see_yzm"),"reset");
})
$(".verification_information .see_yzm").click(function(){   //身份验证 查看短信按钮点击事件
    see_yzm( $(".verification_information .phone").val(), "reset", $(".verification_information .img_yzm").val());
})



$(".verification_information .next_step").click(function(){     //身份验证 按钮点击事件
    if( $(".verification_information .yzm").val() != SMS_yzm_storage ){
        $(".modal-body p").html( "短信验证码错误" );
        $('#myModal').modal('show');
        return;
    }
    if( $(".verification_information .yzm").val() == SMS_yzm_storage ){
        localStorage.reset_phone = $(".verification_information .phone").val();
        $(".verification_information").css("display","none");
        $(".reset_pwd_information").css("display","block");
        $(".reset_pwd").css("color","#5944C3");
        $(".reset_pwd").css("opacity",1);
        $(".reset_pwd").css("border-top","3px solid #5944C3");
        $(".reset_pwd").find(".circular").css("background","#5944C3");
    }
})

var pwd = ""; //重复密码判断条件
$(".reset_pwd_information .pwd1").blur(function(){  //重置密码 第一输入密码框失去焦点判断输入信息是否完整
    pwd = $(this).val();
    remove_error($(".reset_pwd_information .pwd1_error"),"24px");
    if( $(this).val() == ""){
        $(this).parent().append('<div class="pwd1_error error">'+ input_pwd1 +'</div>');
        $(this).parent().css("margin-bottom","3px");
        return
    }
    if( $(this).val().length<6 || $(this).val().length>32 ){
        $(this).parent().append('<div class="pwd1_error error">'+ pwd_length_error +'</div>');
        $(this).parent().css("margin-bottom","3px");
        return
    }
})

$(".reset_pwd_information .pwd2").blur(function(){  //重置密码 第二输入密码框失去焦点判断输入信息是否完整
    remove_error($(".reset_pwd_information .pwd2_error"),"24px");
    if( $(this).val() == ""){
        $(this).parent().append('<div class="pwd2_error error">'+ input_pwd2 +'</div>');
        $(this).parent().css("margin-bottom","3px");
        return
    }
    if( $(this).val() != pwd){
        $(this).parent().append('<div class="pwd2_error error">'+ two_pwd_error +'</div>');
        $(this).parent().css("margin-bottom","3px");
        return
    }
})

$(".reset_pwd_information .next_step").click(function(){    //
    $.ajax({
        method:"POST",
        url: url+"v1/account/reset",
        async: true,
        data:{
            phone: $(".verification_information .phone").val(),
            smsCaptcha: SMS_yzm_storage,
            password:   $(".reset_pwd_information .pwd2").val()
            },
        xhrFields: {
            withCredentials: true
        },
    })
    .done(function(data){
        console.log(data);
        if( data.code == "success" ){
            $(".reset_pwd_information").css("display","none");
            $(".success_information").css("display","block");
            $(".success").css("color","#5944C3");
            $(".success").css("opacity",1);
            $(".success").css("border-top","3px solid #5944C3");
            $(".success").find(".circular").css("background","#5944C3");
            var timer = 9;  
            setInterval(function(){
                if( timer == 0){
                    window.location.href = "login.html";
                }
                $(".success_information .time").html(timer);
                timer--;
            },1000)
            return;
        }
        if( data.code == "param_incomplete"){
            $(".modal-body p").html( "修改密码信息填写不完整,请刷新页面后重新填写修改信息" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "phone_format_error"){
            $(".modal-body p").html( "手机号码格式不正确,请刷新页面后重新填写" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "password_format_error"){
            $(".modal-body p").html( "密码格式不正确,请刷新页面后重新填写" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "sms_captcha_not_found"){
            $(".modal-body p").html( "短信验证码不存在,请刷新页面后重新获取" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "sms_captcha_fail"){
            $(".modal-body p").html( "短信验证码错误,请刷新页面后重新获取" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "account_not_found"){
            $(".modal-body p").html( "该手机号码尚未注册账号,请先注册账号" );
            $('#myModal').modal('show');
            return
        }
    })
})

$(document).ready(function(){
    register_header();
    modal();
    register_footer();
    Gvc( $(".verification_information .graphical_yzm") );
})

$(".verification_information input").keyup(function(){
    verification_judge();
})
$(".reset_pwd_information input").keyup(function(){
    reset_pwd_judge();
})
function verification_judge(){  // 判断身份验证下一步按钮是否启用
    var judge = 1;  
    if( $(".verification_information .phone").val() == ""){
        judge ++;
    }
    if( $(".verification_information .phone_error").length != 0){
        judge ++;
    }
    if( $(".verification_information .phone").val().length != 11){
        judge ++;
    }
    if( !(/^1[34578]\d{9}$/.test( $(".verification_information .phone").val() )) ){
        judge ++;
    }
    if( $(".verification_information .img_yzm").val() == ""){
        judge ++;
    }
    if( $(".verification_information .img_yzm").val().length != 4){
        judge ++;
    }
    if( $(".verification_information .img_yzm_error").length != 0){
        judge ++;
    }
    if( $(".verification_information .yzm").val() == ""){
        judge ++;
    }
    if( $(".verification_information .yzm").val().length != 6){
        judge ++;
    }
    if( $(".verification_information .yzm_error").length != 0){
        judge ++;
    }
    if( judge == 1 ){
        $(".verification_information .next_step").attr('disabled',false);
        $(".verification_information .next_step").css("background","#5944C3");
    }
    if( judge != 1 ){
        $(".verification_information .next_step").attr('disabled',true);
        $(".verification_information .next_step").css("background","rgba(0,0,0,.35)");
    }

    if( $(".verification_information .phone").val().length == 11 ){
        if( $(".verification_information .phone_error").length != 0 ){
            if( $(".verification_information .phone_error").html() == input_phone_number){
                remove_error( $(".verification_information .phone_error") , "21px")
            }
        }
    }
    if( $(".verification_information .phone").val().length != 0){
        if( $(".verification_information .phone_error").length !=0 ){
            if( $(".verification_information .phone_error").html() == input_phone_number ){
                remove_error( $(".verification_information .phone_error") , '21px');
            }
        }
    }
    if( $(".verification_information .phone").val().length == 0){
        if( $(".verification_information .phone_error").length !=0 ){
            if( $(".verification_information .phone_error").html() == phone_number_format_error ){
                remove_error($(".verification_information .phone_error"),'21px');
                $(".verification_information .phone").parent().append('<div class="phone_error error">'+ input_phone_number +'</phone>');
                $(".verification_information .phone").parent().css("margin-bottom",0);
                return;
            }
            if( $(".verification_information .phone_error").html() == phone_length_eleven ){
                remove_error($(".verification_information .phone_error"),'21px');
                $(".verification_information .phone").parent().append('<div class="phone_error error">'+ input_phone_number +'</phone>');
                $(".verification_information .phone").parent().css("margin-bottom",0);
                return;
            }
        }
    }
    if( $(".verification_information .phone").val().length == 11 ){
        remove_error($(".verification_information .phone_error"),"21px");
        if( !(/^1[34578]\d{9}$/.test( $(".verification_information .phone").val() )) ){
            $(".verification_information .phone").parent().append('<div class="phone_error error">'+ phone_number_format_error +'</div>');
            $(".verification_information .phone").parent().css("margin-bottom",0);
        }
    }
    if( $(".verification_information .img_yzm").val().length != 0){
        if( $(".verification_information .img_yzm_error").length !=0 ){
            if( $(".verification_information .img_yzm_error").html() == input_img_yzm ){
                remove_error($(".verification_information .img_yzm_error"),'21px');
            }
        }
    }   
    if( $(".verification_information .img_yzm").val().length == 0){
        if( $(".verification_information .img_yzm_error").length !=0 ){
            if( $(".verification_information .img_yzm_error").html() == img_yzm_length_error ){
                remove_error($(".verification_information .img_yzm_error"),'21px');
                $(".verification_information .img_yzm").parent().append('<div class="img_yzm_error error">'+ input_img_yzm +'</div>');
                $(".verification_information .img_yzm").parent().css("margin-bottom",0);
            }
        }
    }
    if( $(".verification_information .img_yzm").val().length == 4){
        remove_error($(".verification_information .img_yzm_error"),'21px');
    }

    if( $(".verification_information .yzm").val().length == 6 ){
        if( $(".verification_information .yzm_error").length != 0 ){
            if( $(".verification_information .yzm_error").html() == yzm_length_error ){
                remove_error( $(".verification_information .yzm_error") , "30px");
            }
        }
    }
    if( $(".verification_information .yzm").val().length != 0 ){
        if( $(".verification_information .yzm_error").length != 0 ){
            if( $(".verification_information .yzm_error").html() == input_yzm ){
                remove_error( $(".verification_information .yzm_error") , "30px");
            }
        }
    }
    if( $(".verification_information .yzm").val().length == 0 ){
        if( $(".verification_information .yzm_error").length != 0 ){
            if( $(".verification_information .yzm_error").html() == yzm_length_error ){
                remove_error( $(".verification_information .yzm_error") , "30px");
                $(".verification_information .yzm").parent().append('<div class="yzm_error error">'+ input_yzm +'</div>');
                $(".verification_information .yzm").parent().css("margin-bottom","9px");
            }
        }
    }
}

function reset_pwd_judge(){  // 判断重置密码下一步按钮是否启用
    var judge = 1;
    if( $(".reset_pwd_information .pwd1").val() == "" ){
        judge ++;
    }
    if( $(".reset_pwd_information .pwd1_error").length != 0 ){
        judge ++;
    }
    if( $(".reset_pwd_information .pwd2").val() == "" ){
        judge ++;
    }
    if( $(".reset_pwd_information .pwd2_error").length != 0 ){
        judge ++;
    }
    if( $(".reset_pwd_information .pwd1").val() != $(".reset_pwd_information .pwd2").val() ){
        judge ++;
    }
    if( judge == 1){
        $(".reset_pwd_information .next_step").attr('disabled',false);
        $(".reset_pwd_information .next_step").css('background',"#5944C3");
    }
    if( judge != 1 ){
        $(".reset_pwd_information .next_step").attr('disabled',true);
        $(".reset_pwd_information .next_step").css('background',"rgba(0,0,0,.35)");
    }  
    if( $(".reset_pwd_information .pwd1").val().length == 0 ){
        if( $(".reset_pwd_information .pwd1_error").length != 0 ){
            if( $(".reset_pwd_information .pwd1_error").html() == pwd_length_error ){
                remove_error( $(".reset_pwd_information .pwd1_error") , "24px");
                $(".reset_pwd_information .pwd1").parent().append('<div class="pwd1_error error">'+ input_pwd1 +'</div>')
                $(".reset_pwd_information .pwd1").parent().css("margin-bottom","3px")
            }
        }
    }
    if( $(".reset_pwd_information .pwd1").val().length != 0 ){
        if( $(".reset_pwd_information .pwd1_error").length != 0 ){
            if( $(".reset_pwd_information .pwd1_error").html() == input_pwd1 ){
                remove_error( $(".reset_pwd_information .pwd1_error") , "24px");
            }
        }
    }
    if( $(".reset_pwd_information .pwd1").val().length >= 6 ){
        if( $(".reset_pwd_information .pwd1_error").length != 0 ){
            if( $(".reset_pwd_information .pwd1_error").html() == pwd_length_error ){
                remove_error( $(".reset_pwd_information .pwd1_error") , "24px");
            }
        }
    }
    if( $(".reset_pwd_information .pwd2").val().length != 0 ){
        if( $(".reset_pwd_information .pwd2_error").length != 0){
            if( $(".reset_pwd_information .pwd2_error").html() == input_pwd2 ){
                remove_error($(".reset_pwd_information .pwd2_error"),"24px")
            }
        }
    }
    if( $(".reset_pwd_information .pwd2").val().length == $(".reset_pwd_information .pwd1").val().length ){
        if( $(".reset_pwd_information .pwd1").val() != $(".reset_pwd_information .pwd2").val()){
            remove_error($(".reset_pwd_information .pwd2_error"),"24px");
            $(".reset_pwd_information .pwd2").parent().append('<div class="pwd2_error error">'+ two_pwd_error +'</div>');
            $(".pwd2").parent().css("margin-bottom","3px");
        }
    } 
    if( $(".reset_pwd_information .pwd2").val().length == 0 ){
        if( $(".reset_pwd_information .pwd2_error").length != 0){
            if( $(".reset_pwd_information .pwd2_error").html() == two_pwd_error ){
                remove_error($(".reset_pwd_information .pwd2_error"),"24px");
                $(".reset_pwd_information .pwd2").parent().append('<div class="pwd2_error error">'+ input_pwd2 +'</div>');
                $(".reset_pwd_information .pwd2").parent().css("margin-bottom","3px");
            }
        }
    }
    
}
