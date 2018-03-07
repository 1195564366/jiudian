function header(){  //动态页面顶部
    var str = `
    <header>
        <a href="index.html" class="logo">
            <img src="images/logo_white.png" alt="">
            <div class="vertical_line"></div>
            <div>酒店项目</div>
        </a>
        <div class="login_and_register">
            <a href="login.html">登陆</a>
            <a href="register.html">注册</a>
        </div>
        <div class="login_information">
            <img src="images/user_img_login.png" alt="" class="user_head_img">
            <div class="user_name">吕璐璐璐</div>
            <div class="switch_page">
                <img src="images/icon_pickup.png" alt="" class="control">
                <ul> 
                    <div class="triangle"></div>
                    <li>
                        <a href="my_order.html">
                            <img src="images/icon_my.png" alt="">
                            我的订单
                        </a>
                    </li>
                    <li>
                        <a href="account_settings.html">
                            <img src="images/icon_setting.png" alt="">
                            账户设置
                        </a>
                    </li>
                    <li>
                        <a onclick="localStorage_clear()"  href="login.html">
                            <img src="images/icon_out.png" alt="">
                            退出登陆
                        </a>
                    </li>
                </ul>
            </div>
            <a href="my_order.html" class="order_form">我的订单</a>
        </div>
    </header>
    `
    $("body").prepend(str);
    console.log("页面顶部加载成功");
}
function footer(){  //动态生成页面底部
    var str = `
        <footer>
            Copyright © 2017 apis.sh All Rights Reserved | 陕ICP备15013925号-3
        </footer>
    `
    $("body").append(str);
    console.log("页面底部加载成功");
}

function user_switch(){     //判断用户是否登陆导航栏显示用户信息
    if( localStorage.token != undefined && localStorage.token != ""){
        $(".login_and_register").css("display","none");
        $(".login_information").css("display","inline-block");
        $("header .user_name").html( localStorage.name );
        $("header .user_name").attr( "title",localStorage.name );
        $("header .user_head_img").attr( "src",url_img + localStorage.avatar );
    }
}
function localStorage_clear(){
    localStorage.clear(); 
}
$(document).ready(function(){
    header();
    footer();
    user_switch();
})