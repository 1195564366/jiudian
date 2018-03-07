var orderId = window.location.href.split("?")[ window.location.href.split("?").length-1 ];
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
    var order_data = data.data.order;
    if( data.code == "success" ){
        $(".state span").html( order_data.status );
        $(".money_1 span").html( order_data.amount );
        $(".money_2 span").html( order_data.amount );
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