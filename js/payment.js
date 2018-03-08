var payType = "";//创建变量保存支付方式
var orderId = ""    //用来保存订单ID
$(".Alipay").click(function(){  //支付宝点击
    $(this).css("border","2px solid #FF5D5B");
    $(".WeChat").css("border","2px solid transparent");
    payType = "ali";
    $("#pay").attr("disabled",false);
    $("#pay").addClass("active");
})
$(".WeChat").click(function(){  //微信点击宝点击
    $(this).css("border","2px solid #FF5D5B");
    $(".Alipay").css("border","2px solid transparent");
    payType = "wei";
    $("#pay").attr("disabled",false);
    $("#pay").addClass("active");
})
function add_content(){ //动态添加页面跳转来的内容
    var content_url = window.location.href;
    content_url = content_url.split("?");
    console.log( content_url );
    //订单ID
    orderId = content_url[ content_url.length-1 ].split("=")[ content_url[ content_url.length-1 ].split("=").length-1 ];
    //房间名称
    $(".room_name").html( decodeURI( content_url[ content_url.length-2 ].split("=")[ content_url[ content_url.length-2 ].split("=").length-1 ] ) )
    //订单价格
    $(".room_price span").html( decodeURI( content_url[ content_url.length-3 ].split("=")[ content_url[ content_url.length-3 ].split("=").length-1 ] ) )
    $(".price_text span").html( decodeURI( content_url[ content_url.length-3 ].split("=")[ content_url[ content_url.length-3 ].split("=").length-1 ] ) )
    //酒店照片
    $( ".Order_details img" ).attr( "src",url_img + content_url[ content_url.length-4 ].split("=")[ content_url[ content_url.length-4 ].split("=").length-1 ] )
    //酒店名称
    $(".Hotel_name").html( decodeURI( content_url[ content_url.length-5 ].split("=")[ content_url[ content_url.length-5 ].split("=").length-1 ] ) )
}
$("#pay").click(function(){     //立即支付请求
    var token = localStorage.token;
    if( payType == "" ){
        $(".modal-body p").html( "请先选择支付方式" );
        $('#myModal').modal('show');
        return;
    }
    $.ajax({
        method:"POST",
        url: url+"v1/order/pay",
        async: true,
        data:{
            token:token,
            payType:payType,
            orderId:orderId
        },
        xhrFields: {
            withCredentials: true
        },
    })
    .done(function(data){
        console.log(data)
        if( data.code == "success" ){
            $(".modal-body p").html( '支付成功,<a href="index.html">点击后回到首页</a>' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "account_token_invalid" ){
            $(".modal-body p").html( '身份已失效,请重新登陆,<a href="login.html">点击后跳转登陆页面</a>' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "order_not_found" ){
            $(".modal-body p").html( '订单不存在,请重新下单' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "order_pay_fail" ){
            $(".modal-body p").html( '订单支付失败,请重新支付' );
            $('#myModal').modal('show');
            return;
        }
    })
})
$(document).ready(function(){
    add_content();
})