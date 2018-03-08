var content_url = window.location.href;
content_url = content_url.split("?")[ content_url.split("?").length-1 ];
orderId = content_url.split("=")[ content_url.split("=").length-1 ];
console.log( content_url );
var token = localStorage.token;
$.ajax({
    method: "GET",
    url: url + "v1/order/detail",
    async: true,
    dataType: "json",
    data:{
        orderId:orderId
    },
    xhrFields: {
        withCredentials: true
    }
})
.done(function(data){
    console.log( data );
    if( data.code == "success" ){
        var order_data = data.data.order;
        $(".order_number span").html( order_data.orderNo );
        $(".Hotel_name a").html( order_data.hotel.name );
        $(".Hotel_name a").attr( "href","hotel_details.html?"+order_data.hotel._id );
        $(".Room_type span").html( order_data.roomName );
        $(".create_time span").html( moment(order_data.create_time).format('YYYY-MM-DD') );
        $(".check_time span").html(   moment(order_data.check_in_time).format('YYYY-MM-DD')+"至"+moment(order_data.check_out_time).format('YYYY-MM-DD') );
        $(".Guest_name span").html( order_data.customerName );
        $(".Guest_phone span").html( order_data.customerPhone );
    }
})

$("#cancel").click(function(){
    $.ajax({
        method: "POST",
        url: url + "v1/order/cancle",
        async: true,
        dataType: "json",
        data:{
            token:token,
            orderId:orderId
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if( data.code == "success" ){
            $(".modal-body p").html( '取消订单成功,<a href="my_order.html">点击后返回我的订单页面</a>' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "account_token_invalid" ){
            $(".modal-body p").html( '身份已失效,请重新登陆,<a href="login.html">点击后返回登陆页面</a>' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "order_not_found" ){
            $(".modal-body p").html( '订单不存在' );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "order_cancel_fail" ){
            $(".modal-body p").html( '订单取消失败,请重新取消' );
            $('#myModal').modal('show');
        }
        
    })
})