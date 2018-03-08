var status = "";    //用来保存订单状态
var orderNo = "";   //订单号
var customerName = ""; //客户名
var checkTime = ""; //预订时间段，入住和离店毫秒级时间戳，用英文逗号拼成字符串
var page = 1; //第几页（必须大于0）
$(".nav ul li").click(function(){
    page = 1;   
    $(this).addClass("active").siblings().removeClass("active");
    if( $(this).html() == "全部订单" ){
        status = "";
        status = "";    //用来保存订单状态
        orderNo = "";   //订单号
        customerName = ""; //客户名
        checkTime = ""; //预订时间段，入住和离店毫秒级时间戳，用英文逗号拼成字符串
    }else{
        status = $(this).html();
    }
    request_data( page,status,orderNo,customerName,checkTime )
})
/**
 * @param  {} page  页数
 * @param  {} status    订单状态
 * @param  {} orderNo   订单号
 * @param  {} customerName  客户名
 * @param  {} checkTime 预订时间段，入住和离店毫秒级时间戳，用英文逗号拼成字符串
 */
function request_data( page,status,orderNo,customerName,checkTime ){
    var token = localStorage.token;
    $.ajax({
        method:"GET",
        url: url + "v1/order/list",
        dataType: "json",
        async: true,
        data:{
            token:token,
            status: status,
            orderNo:orderNo,
            customerName:customerName,
            checkTime:checkTime,
            limit:6,
            page:page
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            var order_data = data.data.orderList;
            var order_str = `
                        <table>
                            <tr>
                                <td>订单号</td>
                                <td>名称</td>
                                <td>下单时间</td>
                                <td>旅客</td>
                                <td>总金额</td>
                                <td>订单状态</td>
                                <td>操作</td>
                            </tr>`
            for(i=0;i<order_data.length;i++){
                var order_a="";
                if( order_data[i].status == "预定中" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>&nbsp;&nbsp;<a href="cancel_order.html?_id='+ order_data[i]._id +'">取消预定</a>&nbsp;&nbsp;<button data-id="'+ order_data[i]._id +'">完成</button>';
                }
                if( order_data[i].status == "待支付" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>&nbsp;&nbsp;<a href="payment.html?hotelName='+ order_data[i].hotel.name+'?hotelPicture='+ order_data[i].hotel.picture[0]+'?orderAmount='+ order_data[i].amount +'?roomName='+ order_data[i].roomName +'?_id='+ order_data[i]._id +'">去支付</a>';
                }
                if( order_data[i].status == "已完成" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>&nbsp;&nbsp;<a href="evaluate.html?hotelName='+ order_data[i].hotel.name+'?hotelPicture='+ order_data[i].hotel.picture[0]+'?orderAmount='+ order_data[i].amount +'?roomName='+ order_data[i].roomName +'?_id='+ order_data[i]._id +'">去评价</a>';
                }
                if( order_data[i].status == "已取消" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>';
                }
                order_str +=`
                <tr>
                    <td title="`+ order_data[i].orderNo +`">`+ order_data[i].orderNo +`</td>
                    <td>
                        <div title="`+ order_data[i].hotel.name +`">`+ order_data[i].hotel.name +`</div>
                        <div title="`+ order_data[i].roomName +`">`+ order_data[i].roomName +`</div>
                    </td>
                    <td>`+ order_data[i].create_time +`</td>
                    <td title="`+ order_data[i].customerName +`">`+ order_data[i].customerName +`</td>
                    <td>¥`+ order_data[i].amount +`</td>
                    <td>`+ order_data[i].status +`</td>
                    <td>
                        `+ order_a +`
                    </td>
                </tr>
                `
            }   
            order_str += '</table>';
            $(".Order_details table").remove();
            $(".Order_details .error").remove();
            $(".Order_details").append( order_str ); 
            //评论底下分页动态加载
            $(".Review_page .Middle ").html("");
            var Review_page_str = "";
            var btn_left ="";
            var btn_right = "";
            if( page == 1 && page == Math.ceil( data.data.count/6 ) ){
                btn_left = '<button class="upper_page prohibit" disabled="disabled"> < </button>';
                btn_right = '<button class="lower_page prohibit" disabled="disabled"> > </button>';
            }else if( page == 1 ){
                btn_left = '<button class="upper_page prohibit" disabled="disabled"> < </button>';
                btn_right = '<button class="lower_page active"> > </button>';
            }else if( page == Math.ceil( data.data.count/6 ) ){
                btn_left = '<button class="upper_page active"> < </button>';
                btn_right = '<button class="lower_page prohibit" disabled="disabled"> > </button>';
            }else {
                btn_left = '<button class="upper_page active"> < </button>';
                btn_right = '<button class="lower_page active"> > </button>';
            }
            if( data.data.count/6 > 6){
                Review_page_str = btn_left +`
                    <div class="active"> 1 </div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>···</div>
                    <div>`+ Math.ceil( data.data.count/6 ) +`</div>
                `+btn_right;
            }else{
                var btn_str="";
                for( i=1;i<Math.ceil( data.data.count/6 )+1;i++ ){
                    btn_str += '<div>'+ i +'</div>';
                }
                Review_page_str = btn_left + btn_str + btn_right;
            }
            $(".Review_page .Middle").append( Review_page_str );
            $(".Review_page .Middle div")[page-1].className = "active";        
        }else{
            $(".Review_page .Middle ").html("");
            $(".Order_details table").remove();
            $(".Order_details .error").remove();
            $(".Order_details").append('<div class="error">暂无对应订单</div>')
            // $(".modal-body p").html( "该选项未查询到订单" );
            // $('#myModal').modal('show');
        }
    })
}
function request_data1( page,status,orderNo,customerName,checkTime ){
    var token = localStorage.token;
    $.ajax({
        method:"GET",
        url: url + "v1/order/list",
        dataType: "json",
        async: true,
        data:{
            token:token,
            status: status,
            orderNo:orderNo,
            customerName:customerName,
            checkTime:checkTime,
            limit:6,
            page:page
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            var order_data = data.data.orderList;
            var order_str = `
                        <table>
                            <tr>
                                <td>订单号</td>
                                <td>名称</td>
                                <td>下单时间</td>
                                <td>旅客</td>
                                <td>总金额</td>
                                <td>订单状态</td>
                                <td>操作</td>
                            </tr>`
            for(i=0;i<order_data.length;i++){
                var order_a="";
                if( order_data[i].status == "预定中" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>&nbsp;&nbsp;<a href="cancel_order.html?_id='+ order_data[i]._id +'">取消预定</a>&nbsp;&nbsp;<button data-id="'+ order_data[i]._id +'">完成</button>';
                }
                if( order_data[i].status == "待支付" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>&nbsp;&nbsp;<a href="payment.html?hotelName='+ order_data[i].hotel.name+'?hotelPicture='+ order_data[i].hotel.picture[0]+'?orderAmount='+ order_data[i].amount +'?roomName='+ order_data[i].roomName +'?_id='+ order_data[i]._id +'">去支付</a>';
                }
                if( order_data[i].status == "已完成" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>&nbsp;&nbsp;<a href="evaluate.html?hotelName='+ order_data[i].hotel.name+'?hotelPicture='+ order_data[i].hotel.picture[0]+'?orderAmount='+ order_data[i].amount +'?roomName='+ order_data[i].roomName +'?_id='+ order_data[i]._id +'">去评价</a>';
                }
                if( order_data[i].status == "已取消" ){
                    order_a = '<a href="see_order.html?'+order_data[i]._id+'">查看</a>';
                }
                order_str +=`
                <tr>
                    <td title="`+ order_data[i].orderNo +`">`+ order_data[i].orderNo +`</td>
                    <td>
                        <div title="`+ order_data[i].hotel.name +`">`+ order_data[i].hotel.name +`</div>
                        <div title="`+ order_data[i].roomName +`">`+ order_data[i].roomName +`</div>
                    </td>
                    <td>`+ order_data[i].create_time +`</td>
                    <td title="`+ order_data[i].customerName +`">`+ order_data[i].customerName +`</td>
                    <td>¥`+ order_data[i].amount +`</td>
                    <td>`+ order_data[i].status +`</td>
                    <td>
                        `+ order_a +`
                    </td>
                </tr>
                `
            }   
            order_str += '</table>';
            $(".Order_details table").remove();
            $(".Order_details .error").remove();
            $(".Order_details").append( order_str );        
        }
    })
}

$(".Review_page .Middle").on('click','div',function(){
    var div_i = $(".Review_page .Middle div");
    if( $(div_i[div_i.length-1]).html() <= 6 ){
        page = $(this).html();
        request_data( page,status,orderNo,customerName,checkTime );
        if( page == 1 ){
            $(".upper_page").attr("disabled",true);
            $(".upper_page").addClass("prohibit");
        }
        if( page != 1 ){
            $(".upper_page").attr("disabled",false);
            $(".upper_page").removeClass("prohibit");
        }
        if( page == $(div_i[div_i.length-1]).html() ){
            $(".lower_page").attr("disabled",true);
            $(".lower_page").addClass("prohibit");
        }
        if( page != $(div_i[div_i.length-1]).html() ){
            $(".lower_page").attr("disabled",false);
            $(".lower_page").removeClass("prohibit");
        }
        $(this).addClass("active").siblings().removeClass("active");
    }else{
        if( $(this).html() != "···"){
            page = $(this).html();
            request_data1( page,status,orderNo,customerName,checkTime );
            $(this).addClass("active").siblings().removeClass("active");
            var x = $(".Middle div");
            var this_html = Number( $(this).html() );
            var last_html = Number( $(x[x.length-1]).html() );
            var left_html = Number($(x[0]).html())
            if( left_html != 1 ){
                if( this_html == left_html ){  
                    $(".lower_page").removeClass("prohibit");
                    $(".lower_page").attr("disabled",false);
                    if( Number( $(x[x.length-2]).html() ) == (last_html-1) ){
                        $(x[x.length-2]).html( "···" );  
                    }
                    for(i=0;i<(x.length-2);i++){
                        $(x[i]).html( Number( $(x[i]).html() )-1 );
                    } 
                    var b = $(".Middle div");
                    for( i=0;i<b.length;i++ ){
                        if( Number( $(b[i]).html() ) == this_html ){
                            $(b[i]).addClass("active").siblings().removeClass("active");
                        }
                    }
                    if( Number($(b[0]).html() == 1) ){
                        $(".upper_page").addClass("prohibit");
                        $(".upper_page").attr("disabled",true);
                    }
                }
            }
            if( this_html ==  last_html ){
                for(i=0,a=(last_html-(x.length-1));i<x.length;i++,a++){
                    $(".lower_page").addClass("prohibit");
                    $(".lower_page").attr("disabled",true);
                    $(".upper_page").removeClass("prohibit");
                    $(".upper_page").attr("disabled",false);
                    $(x[i]).html( a );
                }
            }
            if( this_html == Number( $(x[3]).html() ) ){ 
                if( this_html == last_html-2 ){
                    $(x[x.length-2]).html( last_html-1 );
                    return;
                }
                for( i=0;i<x.length-2;i++ ){
                    var a = Number( $(x[i]).html() );
                    a = a+1
                    $(x[i]).html( a );
                }
                for(i=0;i<x.length-2;i++){
                    if( Number( $(x[i]).html() ) == this_html ){
                        $(x[i]).addClass("active").siblings().removeClass("active");
                    }
                }
                $(".upper_page").removeClass("prohibit");
                $(".upper_page").attr("disabled",false);
            }
            if( page == Number( $(x[x.length-1]).html() )-3 ){
            
                $(x[x.length-2]).html( Number( $(x[x.length-1]).html() )-1 );
    
                $(".lower_page").attr("disabled",true);
                $(".lower_page").addClass("prohibit");
            }
        }
        
    }
})
//评论左箭头点击事件
$(".Middle").on('click','.upper_page',function(){
    var div_i = $(".Review_page .Middle div");
    if( $(div_i[div_i.length-1]).html() <= 6 ){
        page -- ;
        for( i=0;i<div_i.length;i++ ){
            if( $(div_i[i]).html() == page ){
                $(div_i[i]).addClass("active").siblings().removeClass("active");
            }
        }
        if( page == 1 ){
            $(".upper_page").attr("disabled",true);
            $(".upper_page").addClass("prohibit");
        }
        $(".lower_page").attr("disabled",false);
        $(".lower_page").removeClass("prohibit");
        request_data1( page,status,orderNo,customerName,checkTime );
    }else{
        page -- ;
        request_data1( page,status,orderNo,customerName,checkTime );
        if( page == 1 ){
            $(".upper_page").attr("disabled",true);
            $(".upper_page").addClass("prohibit");
            return;
        }
        if( page == Number( $(div_i[div_i.length-6]).html() ) ){
            $(div_i[div_i.length-2]).html("···");
            for( i=0;i<div_i.length-2;i++ ){
                $(div_i[i]).html( Number(  $(div_i[i]).html()-1 ) );
            }
            $(".lower_page").attr("disabled",false);
            $(".lower_page").removeClass("prohibit");
        }
        for( i=0;i<div_i.length;i++ ){
            if( Number( $(div_i[i]).html() ) == page ){
                $(div_i[i]).addClass("active").siblings().removeClass("active");
            }
        }
    }
})
//评论右箭头点击事件
$(".Middle").on('click','.lower_page',function(){
    var div_i = $(".Review_page .Middle div");
    if( $(div_i[div_i.length-1]).html() <= 6 ){
        page ++ ;
        for( i=0;i<div_i.length;i++ ){
            if( $(div_i[i]).html() == page ){
                $(div_i[i]).addClass("active").siblings().removeClass("active");
            }
        }
        if( page == $(div_i[div_i.length-1]).html() ){
            $(".lower_page").attr("disabled",true);
            $(".lower_page").addClass("prohibit");
        }
        $(".upper_page").attr("disabled",false);
        $(".upper_page").removeClass("prohibit");
        request_data1( page,status,orderNo,customerName,checkTime );
    }else{
        page ++ ;
        for(i=0;i<div_i.length;i++){
            if( $(div_i[i]).html() == "···" ){
                if( page == Number( $(div_i[div_i.length-3]).html()  )){
                    for( i=0;i<div_i.length-2;i++ ){
                        var x =  Number( $(div_i[i]).html());
                        x++;
                        $(div_i[i]).html( x );
                    }
                }
                for(i=0;i<div_i.length;i++){
                    if( $(div_i[i]).html() == page ){
                        $(div_i[i]).addClass("active").siblings().removeClass("active");
                    }
                }
            } 
        }
        if( page == Number( $(div_i[div_i.length-1]).html() )-3 ){
            
            $(div_i[div_i.length-2]).html( Number( $(div_i[div_i.length-1]).html() )-1 );

            $(".lower_page").attr("disabled",true);
            $(".lower_page").addClass("prohibit");
        }
        if( Number( $(div_i[0]).html() ) != 1 ){
            $(".upper_page").attr("disabled",false);
            $(".upper_page").removeClass("prohibit");
            
        }
        request_data1( page,status,orderNo,customerName,checkTime );
    }
})


$(".orderNo").keyup(function(){
   if(  $(this).val().length>0 ){
       $("#query").attr("disabled",false);
       $("#query").addClass("active");
   }else{
    $("#query").attr("disabled",true);
    $("#query").removeClass("active");
   }
})
$(".customerName").keyup(function(){
    if(  $(this).val().length>0 ){
        $("#query").attr("disabled",false);
        $("#query").addClass("active");
    }else{
     $("#query").attr("disabled",true);
     $("#query").removeClass("active");
    }
})
$(".checkTime").keyup(function(){
    if(  $(this).val().length>0 ){
        $("#query").attr("disabled",false);
        $("#query").addClass("active");
    }else{
     $("#query").attr("disabled",true);
     $("#query").removeClass("active");
    }
    
})
var time_stamp = ""; //用来保存时间戳
function Conversion_timestamp(year,month,day){ //转换指定时间时间戳
    // 获取某个时间格式的时间戳
    var stringTime = year+"-"+month+"-"+day;
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    time_stamp = timestamp2;
}
$("#query").click(function(){
    orderNo = $(".orderNo").val();
    customerName = $(".customerName").val();
    var time_val = $(".checkTime").val().split(/[^0-9]/ig);
    if( $(".checkTime").val().length !=  0 && time_val.length != 6){
        $(".modal-body p").html( "输入预定时间段不正确" );
        $('#myModal').modal('show');
        return;
    }
    if( time_val.length == 6){
        if( time_val[1]<1 || time_val[1] >12){
            $(".modal-body p").html( "入住月不对" );
            $('#myModal').modal('show');
            return;
        }
        if( time_val[1] == 2 ){
            var days = time_val[0] % 4 == 0 ? 29 : 28;
            if( time_val[2]<1 || time_val[2] > days){
                $(".modal-body p").html( "入住日不对" );
                $('#myModal').modal('show');
                return;
            }
        }
        if( time_val[1] == 1 || time_val[1] == 3 || time_val[1] == 5 || time_val[1] == 7 || time_val[1] == 8 || time_val[1] == 10 || time_val[1] == 12  ){
            if( time_val[2]<1 || time_val[2] >31){
                $(".modal-body p").html( "入住日不对" );
                $('#myModal').modal('show');
                return;
            }
        }
        if( time_val[1] == 4 || time_val[1] == 6 || time_val[1] == 9 || time_val[1] == 11 ){
            if( time_val[2]<1 || time_val[2] >30){
                $(".modal-body p").html( "入住日不对" );
                $('#myModal').modal('show');
                return;
            }
        }
    
        if( time_val[4]<1 || time_val[4] >12){
            $(".modal-body p").html( "退房月不对" );
            $('#myModal').modal('show');
            return;
        }
        if( time_val[4] == 2 ){
            var days = time_val[0] % 4 == 0 ? 29 : 28;
            if( time_val[5]<1 || time_val[5] > days){
                $(".modal-body p").html( "退房日不对" );
                $('#myModal').modal('show');
                return;
            }
        }
        if( time_val[4] == 1 || time_val[4] == 3 || time_val[4] == 5 || time_val[4] == 7 || time_val[4] == 8 || time_val[4] == 10 || time_val[4] == 12  ){
            if( time_val[5]<1 || time_val[5] >31){
                $(".modal-body p").html( "退房日不对" );
                $('#myModal').modal('show');
                return;
            }
        }
        if( time_val[4] == 4 || time_val[4] == 6 || time_val[4] == 9 || time_val[4] == 11 ){
            if( time_val[5]<1 || time_val[5] >30){
                $(".modal-body p").html( "退房日不对" );
                $('#myModal').modal('show');
                return;
            }
        }
    
        Conversion_timestamp(time_val[0],time_val[1],time_val[2])
        var Check_time = time_stamp*1000;
        console.log( Check_time );
        Conversion_timestamp(time_val[3],time_val[4],time_val[5])
        var Check_out_time = time_stamp*1000;
        console.log( Check_out_time );
        if( Check_time == Check_out_time ){
            $(".modal-body p").html( "入住时间不能和退房时间相同" );
            $('#myModal').modal('show');
            return;
        }
        if( Check_time > Check_out_time ){
            $(".modal-body p").html( "入住时间不能小于退房时间" );
            $('#myModal').modal('show');
            return;
        }
        checkTime = Check_time+","+Check_out_time;
    }
    request_data( page,status,orderNo,customerName,checkTime );
})
$(".Order_details").on('click','button',function(){
    $.ajax({
        method:"POST",
        url: url + "v1/order/complete",
        dataType: "json",
        async: true,
        data:{
            orderId:$(this).attr("data-id")
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data)
        if( data.code == "success"){
            request_data( page,status,orderNo,customerName,checkTime );
            return;
        }
        if( data.code == "order_not_found"){
            $(".modal-body p").html( "订单不存在" );
            $('#myModal').modal('show');
            return;
        }
        if( data.code == "order_complete_fail"){
            $(".modal-body p").html( "订单完成订单失败" );
            $('#myModal').modal('show');
            return;
        }
    })
})
$(document).ready(function(){
    request_data( page,status,orderNo,customerName,checkTime );
})

