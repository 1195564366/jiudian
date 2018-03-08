var yzm = ""; //判断验证码输入是否正确
/**
 * @param  {} error 提示信息元素
 * @param  {} px    提示信息元素父元素下边距
 */
function remove_error(error,px){    //判断提示信息是否存在清除
    error.parent().css("margin-bottom",px);
    if( error.length != 0 ){
        error.remove(); 
    }
}
/**
 * @param  {} element 保存图文验证码的元素
 */
function Gvc(element){ //获取图文验证码
    $.ajax({
        method: "GET",
        url: url + "v1/img/captcha",
        // dataType: "json",
        async: true,
        // 如果参数为json，加上这句  
        contentType:"text/json",  
        // 规定反参类型为text  
        dataType:"text",

        xhrFields: {
            withCredentials: true
        },
    })
    .done(
        function(data){
            element.html(data);
        }
    )
}



/**
 * @param  {} phone  手机号码
 * @param  {} type  获取验证码类型 register : 注册       reset : 找回      login : 登陆
 */
function see_yzm(phone,type){   //查看短信验证码
    $.ajax({
        method: "GET",
        url: url + "v1/sms/captcha/receive",
        async: true,
        data:{
            phone:phone,
            type:type,
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data);
        
        if(data.code == "success"){
            SMS_yzm_storage = data.data.smsCaptcha;
            console.log("短信验证码为："+ data.data.smsCaptcha);
            yzm = data.data.smsCaptcha;
            $(".modal-body p").html( "短信验证码为："+data.data.smsCaptcha );
            $('#myModal').modal('show');
            return;
        }
        if(data.code == "param_incomplete"){
            $(".modal-body p").html( "请输入手机号码" );
            $('#myModal').modal('show');
            return;
        }
        if(data.code == "phone_format_error"){
            $(".modal-body p").html( "手机号码格式不正确" );
            $('#myModal').modal('show');
            return;
        }
        if(data.code == "sms_captcha_not_found"){
            $(".modal-body p").html( "短信验证码不存在,请重新获取" );
            $('#myModal').modal('show');
            return;
        }
    })
}

//封装获取验证码按钮倒计时
/**
 * @param  {} obtain 获取验证码按钮
 * @param  {} see   查看验证码按钮
 * @param  {} count_down   倒计时数
 */
function timer(obtain,see,count_down){
    obtain.attr('disabled',true);
    obtain.css("background","rgba(0,0,0,.35)");
    see.attr('disabled',false);
    see.css("background","#5944C3");
    var str = "";
    var timer = window.setInterval(function(){
        str = count_down +"秒";
        obtain.html(str)
        if( count_down == 0){
            obtain.html("获取验证码");
            obtain.attr('disabled',false);
            obtain.css("background","#5944C3");
            see.attr('disabled',true);
            see.css("background","rgba(0,0,0,.35)");
            window.clearInterval(timer);
        }
        count_down --;
    },1000)
}
var SMS_yzm_storage =  "";  //保存短信验证码
/**
 * @param  {} phone 手机号码
 * @param  {} type  获取验证码类型 register : 注册       reset : 找回      login : 登陆
 * @param  {} imgCaptcha        图文验证码
 * @param  {} obtain    获取验证码按钮
 * @param  {} see       查看验证码按钮
 */
function Sac(phone,type,imgCaptcha,obtain,see){ //获取短信验证码
    $.ajax({
        method: "POST",
        url: url + "v1/sms/captcha",
        async: true,
        data:{
            phone:phone,
            type:type,
            imgCaptcha:imgCaptcha
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data);
        if( data.code == "success"){
            SMS_yzm_storage = data.data.smsCaptcha;
            console.log("短信验证码为:"+data.data.smsCaptcha);
            $(".modal-body p").html( "短信验证码为:"+data.data.smsCaptcha );
            $('#myModal').modal('show');
            timer(obtain,see,300);
            return
        }
        if( data.code == "param_incomplete"){
            $(".modal-body p").html( "请查看手机号码或图文验证码是否输入" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "phone_format_error"){
            $(".modal-body p").html( "手机号码格式有误,请仔细查看" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "captcha_fail"){
            $(".modal-body p").html( "图文验证码错误,请刷新图文验证码" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "account_has_registered"){
            $(".modal-body p").html( "该手机号码已被注册" );
            $('#myModal').modal('show');
            return
        }
        if( data.code == "sms_captcha_has_sent"){
            $(".modal-body p").html( "验证码已经发送,请5分钟后再试" );
            $('#myModal').modal('show');
            timer(obtain,see,300);
            return
        } 
    })
}
//封装短信验证码提示信息
function prompt(data){
    remove_error($(".yzm_error"),"21px");
    
}

/**
 * @param  {} element   手机号码输入框input
 */
function phone_error( element ){    //判断手机号码输入框输入信息是否完整
    if( element.val() == ""){
        element.parent().append('<div class="phone_error error">'+ input_phone_number + '</phone>');
        element.parent().css("margin-bottom",0);
        return;
    }
    if( element.val().length != 11 ){
        element.parent().append('<div class="phone_error error">'+ phone_length_eleven +'</div>');
        element.parent().css("margin-bottom",0);
        return;
    }
    if( !(/^1[34578]\d{9}$/.test( element.val() )) ){
        element.parent().append('<div class="phone_error error">'+ phone_number_format_error +'</phone>');
        element.parent().css("margin-bottom",0);
        return;
    }
}

/**
 * @param  {} element   图文验证码输入框input
 */
function img_yzm( element ){    //判断图文验证码输入框输入信息是否完整
    if( element.val() == ""){
        element.parent().append('<div class="img_yzm_error error">'+ input_img_yzm +'</phone>');
        element.parent().css("margin-bottom",0);
        return;
    }
    if( element.val().length != 4){
        element.parent().append('<div class="img_yzm_error error">'+ img_yzm_length_error +'</phone>');
        element.parent().css("margin-bottom",0);
        return;
    }
}
/**
 * @param  {} element   短信验证码输入框input
 * @param  {} px        短信验证码输入框元素父元素的下边框
 */
function SMS_yzm( element , px){    //判断短信验证码输入框输入信息是否完整
    if( element.val() == ""){
        element.parent().append('<div class="yzm_error error">'+ input_yzm +'</phone>');
        element.parent().css("margin-bottom", px);
        return;
    }
    if( element.val().length != 6){
        element.parent().append('<div class="yzm_error error">'+ yzm_length_error +'</phone>');
        element.parent().css("margin-bottom", px);
        return;
    }
}


/**
 * @param  {} phone_error       手机号码错误提示信息元素
 * @param  {} img_yzm_error     图文验证码错误提示信息元素
 * @param  {} phone_error_className      手机号码错误提示信息元素className
 * @param  {} img_yzm_error_className     图文验证码错误提示信息元素className
 * @param  {} phone             手机号码输入框
 * @param  {} img_yzm           图文验证码输入框
 * @param  {} phone_error_px    手机号码错误提示信息元素父元素下边距
 * @param  {} img_yzm_error_px  图文验证码错误提示信息元素父元素下边距
 * @param  {} phone_error_parent_bottom_px    手机号码错误提示信息元素显示 父元素下边距
 * @param  {} img_yzm_error_parent_bottom_px  图文验证码错误提示信息元素显示 父元素下边距
 * @param  {} click      获取验证码按钮
 * @param  {} see        查看验证码按钮
 * @param  {} type          获取验证码类型 register : 注册       reset : 找回      login : 登陆
 */

function Obtain_SMS_judge( phone_error, img_yzm_error, phone_error_className, img_yzm_error_className, phone , img_yzm, phone_error_px, img_yzm_error_px,phone_error_parent_bottom_px, img_yzm_error_parent_bottom_px, click, see, type){    //点击获取短信验证码 判断手机号码输入框和图文验证码输入框信息输入是否完整
    remove_error( phone_error , phone_error_px );
    remove_error( img_yzm_error , img_yzm_error_px );
    if( phone.val() == "" ){
        phone.parent().append('<div class="'+ phone_error_className +' error">'+ input_phone_number +'</div>');
        phone.parent().css("margin-bottom", phone_error_parent_bottom_px );
        return;
    }
    if( phone.val().length != 11 ){
        phone.parent().append('<div class="'+ phone_error_className +' error">'+ phone_length_eleven +'</div>');
        phone.parent().css("margin-bottom",0);
        return;
    }
    if(!(/^1[34578]\d{9}$/.test( phone.val() ))){
        phone.parent().append('<div class="'+ phone_error_className +' error">'+ phone_number_format_error +'</div>');
        phone.parent().css("margin-bottom", phone_error_parent_bottom_px );
        return;
    }
    if( img_yzm.val() =="" ){
        img_yzm.parent().append('<div class="'+ img_yzm_error_className +' error">'+ input_img_yzm +'</div>');
        img_yzm.parent().css("margin-bottom", img_yzm_error_parent_bottom_px );
        return;
    }
    if( img_yzm.val().length != 4){
        img_yzm.parent().append('<div class="'+ img_yzm_error_className +' error">'+ img_yzm_length_error +'</div>');
        img_yzm.parent().css("margin-bottom", img_yzm_error_parent_bottom_px );
        return;
    }
    Sac( phone.val(), type , img_yzm.val(),click,see); //获取短信验证码
}

//登陆注册重置密码 顶部底部加载
function register_header(){
    var str_header = `
        <header>
            <a href="index.html">
                <img src="images/logo_white_color.png" alt="">
                <div class="line"></div>
                <div class="project_name">酒店项目</div>
            </a> 
        </header>
    `
    $("body").prepend(str_header);
    console.log("页面顶部加载成功");
}
function modal(){
    var str = `
    <div class="modal fade" tabindex="-1" role="dialog" id="myModal">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">温馨提示</h4>
            </div>
            <div class="modal-body">
            <p>温馨提示</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
        </div>
    </div>
    `
    $("body").append(str);
    console.log("模态框加载成功");
}
function register_footer(){
    var str_footer = `
    <footer>
        Copyright © 2017 apis.sh All Rights Reserved | 陕ICP备15013925号-3
    </footer>
    `
    $("body").append(str_footer);
    console.log("页面底部加载成功");
}
