var hotelId = window.location.href;
    hotelId = hotelId.split("?")[hotelId.split("?").length-1];  //获取到酒店id
//获取微信分享二维码
function erweima(){
    $(".Hotel_head_right .Scan img").attr("src",url+"v1/hotel/share");
}
//页面跳转进来发送请求获取酒店信息
function Page_Jump(){
    $.ajax({
        method: "GET",
        url: url+"v1/hotel/detail",
        // url: "php/jiudianxiangqing.js",
        dataType: "json",
        async: true,
        data:{
            hotelId: hotelId 
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data);
        
        if( data.code == "success" ){
            var Hotel_data = data.data.hotel;
            //酒店名称
            $(".Hotel_name").html( Hotel_data.name );
            $(".Hotel_name").attr( "title",Hotel_data.name );
            localStorage.HotelName = Hotel_data.name;

            //酒店星级
            $(".Hotel_Star ul li").remove();
            var Hotel_star = "";
            for(i=0;i<Hotel_data.star_level;i++){
                Hotel_star += '<li><img src="images/icon_star.png" alt=""></li>';
            }
            $(".Hotel_Star ul").append( Hotel_star );

            //酒店位置
            $(".Hotel_position").html( Hotel_data.address );
            $(".Hotel_position").attr( "title", Hotel_data.address );
            localStorage.HotelPosition = Hotel_data.address;
            //酒店评分
            $(".Hotel_score_head span").html( Hotel_data.overall_rating );

            //酒店点评数
            $(".Hotel_score_foot span").html( Hotel_data.comment_num );

            //酒店最低价格起
            $(".Hotel_price span").html( "¥"+Hotel_data.price );

            //酒店图片
            $(".big_photo").attr("src", url_img + Hotel_data.picture[0]);
            $(".small_photo li").remove();
            var small_photo_str = "";
            for(i=1;i<Hotel_data.picture.length;i++){
                small_photo_str += '<li><img src="'+ url_img + Hotel_data.picture[i] +'" alt=""></li>';
            }
            $(".small_photo").append( small_photo_str );
            localStorage.Hotel_picture = Hotel_data.picture[0];
            

            //酒店介绍下面简介
            $(".History_of_development div").remove();
            var History_development_str = "";
            if( Hotel_data.hotel_introductio.basic_info != undefined  ){
                for(i=0;i<Hotel_data.hotel_introductio.basic_info.length;i++){
                    History_development_str +='<div>'+ Hotel_data.hotel_introductio.basic_info[i] +'</div>'
                }
            }
            if( Hotel_data.hotel_introductio.contact_way != undefined ){
                localStorage.Hotelphone = Hotel_data.hotel_introductio.contact_way[0];
                for(i=0;i<Hotel_data.hotel_introductio.contact_way.length;i++){
                    History_development_str +='<div>'+ Hotel_data.hotel_introductio.contact_way[i] +'</div>'
                }
            }
            $(".History_of_development").append( History_development_str );
            
            

            //酒店介绍下面介绍
            $(".Hotel_Introduction").html( Hotel_data.hotel_introductio.detail );
            
            //综合设施
            if( Hotel_data.hotel_facilities.integrated != undefined ){
                var integrated_str = "";
                for(i=0;i<Hotel_data.hotel_facilities.integrated.length;i++){
                    integrated_str += '<div>'+ Hotel_data.hotel_facilities.integrated[i] +'</div>';
                }
                $(".integrated").append( integrated_str );
            }
            
            //客房设施
            if( Hotel_data.hotel_facilities.room != undefined ){
                var room_str = "";
                for(i=0;i<Hotel_data.hotel_facilities.room.length;i++){
                    room_str += '<div>'+ Hotel_data.hotel_facilities.room[i] +'</div>';
                }
                $(".room").append( room_str );
            }

            //服务项目
            if( Hotel_data.hotel_facilities.service_items != undefined ){
                var service_items_str = "";
                for(i=0;i<Hotel_data.hotel_facilities.service_items.length;i++){
                    service_items_str += '<div>'+ Hotel_data.hotel_facilities.service_items[i] +'</div>';
                }
                $(".Service_Items").append( service_items_str );
            }

            //活动设施
            if( Hotel_data.hotel_facilities.service_items != undefined ){
                var activity_str = "";
                for(i=0;i<Hotel_data.hotel_facilities.activity.length;i++){
                    activity_str += '<div>'+ Hotel_data.hotel_facilities.activity[i] +'</div>';
                }
                $(".activity").append( activity_str );
            }

            //入店和离店
            $(".entry_time span").html( Hotel_data.hotel_policy.entry_time );   //入店
            $(".departure_time span").html( Hotel_data.hotel_policy.departure_time );   //离店

            //儿童政策
            $(".child_policy").html( Hotel_data.hotel_policy.child_policy )
            
            //宠物
            $(".pet_policy").html( Hotel_data.hotel_policy.pet_policy )

            //地图

            var map_str = `
                <script type="text/javascript">
                    const map = new BMap.Map("container")
                    const point = new BMap.Point(`+ Hotel_data.location.lng +`,`+ Hotel_data.location.lat +`)
                    map.centerAndZoom(point, 15)
                    map.enableScrollWheelZoom(true) // 启用滚轮放大缩小，默认禁用
                    map.addControl(new BMap.ScaleControl()) // 添加控件，比例尺控件
                    const marker = new BMap.Marker(point)
                    map.addOverlay(marker) // 添加标注点
                    const content = '`+ Hotel_data.name +`'
                    const LabelOptions = {}
                    const Label = new BMap.Label(content, LabelOptions)
                    const label = new BMap.Label(content, {offset: new BMap.Size(20)})
                    
                    marker.setLabel( label ) // 给标注点添加标注文本
                </script>
            `
            $(".map").append( map_str );
        }
    })
}

//酒店图片点击切换事件
$(".small_photo").on('click','li',function(){
    var small_img_url = $(this).find("img").attr("src");
    var big_img_url = $(".big_photo").attr("src");
    $(this).find("img").attr("src",big_img_url);
    $(".big_photo").attr("src",small_img_url);
})
//房型预定 日历
/**
 * @param  {} year  年份
 * @param  {} month 月份  
 * @param  {} day_one   当前日历显示天数的第一个li
 */
function getWeek(year,month,day_one){  //判断月份第一天是周几
    //1.根据年度和月份，创建日期
    //应该先对year,month进行整数及范围校验的。
        var margin_left = 30;
        var d = new Date();
        d.setYear(year);
        d.setMonth(month-1);
        d.setDate(1);
        d.getDay(); //判断月份第一天是周几 周天 返回 0
        week = d.getDay();
        day_one.css("margin-left", margin_left  * d.getDay()+"px" );
}     
/**
 * @param  {} year  年
 * @param  {} month 月
 * @param  {} day   日
 */
var time_stamp = ""; //用来保存时间戳
function Conversion_timestamp(year,month,day){ //转换指定时间时间戳
    // 获取某个时间格式的时间戳
    var stringTime = year+"-"+month+"-"+day;
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    time_stamp = timestamp2;
}

/**
 * @param  {} year  传入指定年份
 * @param  {} month 传入指定月份
 */
var days;   //保存指定月份天数
function judge_day_number(year,month){  //判读传入年月下的这个月的天数
    if( month == 2){
        days = year % 4 == 0 ? 29 : 28;
    }else if( month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
        days = 31;
    }else{
        days = 30;
    }
}

/**
 * @param  {} year  传入左边日历年份
 * @param  {} month 传入左边日历月份
 * @param  {} year_btn 年按钮
 * @param  {} month_btn 月按钮
 */
function last_btn(year,month,year_btn,month_btn){    //判断上年上月按钮是否显示
    if( year <= new Date().getFullYear() ){
        year_btn.css("display","none");
    }else{
        year_btn.css("display","block");
    }
    if( month<= new Date().getMonth()+1 && year <= new Date().getFullYear()){
        month_btn.css("display","none");
    }else{
        month_btn.css("display","block");
    }
}
/**
 * @param  {} left_year         左侧日历年
 * @param  {} left_month        左侧日历月
 * @param  {} now_day           当前日
 * @param  {} element_delete          先清除天
 * @param  {} element_add           哪个日历里添加
 * @param  {} element           日历动态填充年
 * @param  {} element           日历动态填充月
 */
function Add_a_calendar( left_year , left_month , now_day , element_delete , element_add , element_year , element_month){    //网页打开页面上动态添加 左边日历 和 右边日历
    element_delete.remove();
    var day = now_day; //当前日
    
    var left_day_str = ""; //日历天数动态数据
    var right_day_str = ""; //日历天数动态数据
    var now_year =  left_year; //日历年
    var now_month =  left_month; //日历月
    element_year.html( now_year );
    element_month.html( now_month );
    judge_day_number( now_year , now_month); //判读传入年月下的这个月的天数
    for( i=1;i<days+1;i++ ){
        Conversion_timestamp( now_year , now_month , i);
        if( i<day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li class="disable" data-day="'+ i +'">'+ i +'</li>';
        }else if( i == day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li data-time="'+ (time_stamp*1000+86400000-3600000) +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-week="'+ now_year +'-'+ now_month+'-'+ i +'" data-day="今天">今天</li>';
            continue;
        }else{
            left_day_str += '<li data-time="'+ time_stamp*1000 +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-week="'+ now_year +'-'+ now_month+'-'+ i +'" data-day="'+ i +'">'+ i +'</li>';
        } 
    }
    element_add.append( left_day_str );
    getWeek( now_year , now_month , $(".calendar_time .day li:first-child") );
}


/**
 * @param  {} left_year         左侧日历年
 * @param  {} left_month        左侧日历月
 * @param  {} now_day           当前日
 * @param  {} element_delete          先清除天
 * @param  {} element_add           哪个日历里添加
 * @param  {} element           日历动态填充年
 * @param  {} element           日历动态填充月
 */
function Add_a_calendar_1( left_year , left_month , now_day , element_delete , element_add , element_year , element_month){ 
    element_delete.remove();
    var day = now_day; //当前日
    var left_day_str = ""; //日历天数动态数据
    var right_day_str = ""; //日历天数动态数据
    var now_year =  left_year; //日历年
    var now_month =  left_month; //日历月
    element_year.html( now_year );
    element_month.html( now_month );
    judge_day_number( now_year , now_month); //判读传入年月下的这个月的天数
    for( i=1;i<days+1;i++ ){
        Conversion_timestamp( now_year , now_month , i);
        if( i<day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li class="disable" data-day="'+ i +'">'+ i +'</li>';
        }else if( i == day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li data-time="'+ (time_stamp*1000+86400000-3600000) +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-week="'+ now_year +'-'+ now_month+'-'+ i +'" data-day="今天">今天</li>';
            continue;
        }else{
            left_day_str += '<li data-time="'+ time_stamp*1000 +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-week="'+ now_year +'-'+ now_month+'-'+ i +'" data-day="'+ i +'">'+ i +'</li>';
        } 
    }
    element_add.append( left_day_str );
    getWeek( now_year , now_month , $(".Check_calendar .day li:first-child") );
}
/**
 * @param  {} left_year         右侧日历年
 * @param  {} left_month        右侧日历月
 * @param  {} now_day           当前日
 * @param  {} element_delete          先清除天
 * @param  {} element_add           哪个日历里添加
 * @param  {} element           日历动态填充年
 * @param  {} element           日历动态填充月
 */
function Add_a_calendar_2( left_year , left_month , now_day , element_delete , element_add , element_year , element_month){ 
    element_delete.remove();
    var day = now_day; //当前日
    var left_day_str = ""; //日历天数动态数据
    var right_day_str = ""; //日历天数动态数据
    var now_year =  left_year; //日历年
    var now_month =  left_month; //日历月
    element_year.html( now_year );
    element_month.html( now_month );
    judge_day_number( now_year , now_month); //判读传入年月下的这个月的天数
    for( i=1;i<days+1;i++ ){
        Conversion_timestamp( now_year , now_month , i);
        if( i<day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li class="disable" data-day="'+ i +'">'+ i +'</li>';
        }else if( i == day && now_year == new Date().getFullYear() && now_month == new Date().getMonth()+1 ){
            left_day_str += '<li data-time="'+ (time_stamp*1000+86400000-3600000) +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-week="'+ now_year +'-'+ now_month+'-'+ i +'" data-day="今天">今天</li>';
            continue;
        }else{
            left_day_str += '<li data-time="'+ time_stamp*1000 +'" data-id="'+ now_year +'年'+ now_month+'月'+ i +'日" data-week="'+ now_year +'-'+ now_month+'-'+ i +'" data-day="'+ i +'">'+ i +'</li>';
        } 
    }
    element_add.append( left_day_str );
    getWeek( now_year , now_month , $(".Check_out_calendar .day li:first-child") );
}
//日历天点击事件
//入住
$(".Check_calendar .day ul").on('click','li',function(){
    if( $(this).attr("class") != "disable"){

        Check_judge = 1;
        setTimeout(function(){
            $(".Check_calendar").hide();
        },300)
        var data_day_li = $(".Check_calendar .day ul li");
        for( i=0;i<data_day_li.length;i++ ){
            $( data_day_li[i] ).html( $( data_day_li[i] ).attr("data-day") );
        }
        $(this).html("入住");
        $("input.Check").val( $(this).attr("data-id") );
        $("input.Check").attr( "data-time", $(this).attr("data-time"));
        Check_out_mian_judge = 2;
        if( Check_mian_judge === 2 && Check_out_mian_judge === 2){
            $(".Check_out").val("");
            $(".Check_out").attr("data-time","");
            var Check_out_li = $(".Check_out_calendar .day li");
            for(i=0;i<Check_out_li.length;i++){
                $(Check_out_li[i]).removeClass("active");
                $(Check_out_li[i]).html( $(Check_out_li[i]).attr('data-day') );
                $(".Statistics").html("");
                $(".Check_out_week").html("");
            }
            Check_mian_judge = 1;
        }
        $(this).addClass("active").siblings().removeClass("active");
        var time = $(this).attr("data-week");
        time = time.split("-");
        var year = time[0];
        var month = time[1];
        var day = time[2];
        var d = new Date();
        d.setYear(year);
        d.setMonth(month-1);
        d.setDate(day);
        d.getDay();
        switch ( d.getDay() ){
            case 0: $(".Check_week").html("星期日");break;
            case 1: $(".Check_week").html("星期一");break;
            case 2: $(".Check_week").html("星期二");break;
            case 3: $(".Check_week").html("星期三");break;
            case 4: $(".Check_week").html("星期四");break;
            case 5: $(".Check_week").html("星期五");break;
            case 6: $(".Check_week").html("星期六");break;
        }
    }
})
//退房
$(".Check_out_calendar .day ul").on('click','li',function(){
    
    if( $(this).attr("class") != "disable"){
        if( $(".Check").attr("data-time") == undefined || $(".Check").attr("data-time") == ""){
            // alert("请先选择入住时间");
            $(".modal-body p").html( "请先选择入住时间" );
            $('#myModal').modal('show');
            Check_out_judge = 1;
            return;
        }
        if( $(this).attr("data-time") <= $(".Check").attr("data-time")){
            // alert("退房时间不能等于或小于入住时间");
            $(".modal-body p").html( "退房时间不能等于或小于入住时间" );
            $('#myModal').modal('show');
            Check_out_judge = 1;
            return;
        }
        Check_out_judge = 1;
        setTimeout(function(){
            $(".Check_out_calendar").hide();
        },300)
        var data_day_li = $(".Check_out_calendar .day ul li");
        for( i=0;i<data_day_li.length;i++ ){
            $( data_day_li[i] ).html( $( data_day_li[i] ).attr("data-day") );
        }
        $(this).html("退房");
        $("input.Check_out").val( $(this).attr("data-id") );
        $("input.Check_out").attr( "data-time", $(this).attr("data-time"));
        $(this).addClass("active").siblings().removeClass("active");
        Check_mian_judge = 2;
        Check_out_mian_judge = 1;
        var time = $(this).attr("data-week");
        time = time.split("-");
        var year = time[0];
        var month = time[1];
        var day = time[2];
        var d = new Date();
        d.setYear(year);
        d.setMonth(month-1);
        d.setDate(day);
        d.getDay();
        switch ( d.getDay() ){
            case 0: $(".Check_out_week").html("星期日");break;
            case 1: $(".Check_out_week").html("星期一");break;
            case 2: $(".Check_out_week").html("星期二");break;
            case 3: $(".Check_out_week").html("星期三");break;
            case 4: $(".Check_out_week").html("星期四");break;
            case 5: $(".Check_out_week").html("星期五");break;
            case 6: $(".Check_out_week").html("星期六");break;
        }
        var time= $(this).attr("data-time") - $(".Check").attr("data-time");
            // time / 




            $(".Statistics").html( "共"+ Math.ceil(time/86400000) + "晚");
    }
})

var  left_year = new Date().getFullYear();      //入住日历年
var  left_month = new Date().getMonth()+1;      //入住日历月
$(".Check_calendar .next_month").click(function(){      //入住下月按钮
    left_month ++;
    if( left_month == 13 ){
        left_month = 1;
        left_year ++ ;
    }
    Add_a_calendar_1( left_year , left_month , new Date().getDate() ,$(".Check_calendar .day ul li"),$(".Check_calendar .day ul"),$(".Check_calendar .header .years .year"), $(".Check_calendar .header .years .month"));
    last_btn(left_year , left_month, $(".Check_calendar .last_year") ,$(".Check_calendar .last_month"));
})
$(".Check_calendar .last_month").click(function(){      //入住上月按钮
    left_month --;
    if( left_month == 0 ){
        left_month = 12;
        left_year -- ;
    }
    Add_a_calendar_1( left_year , left_month , new Date().getDate() ,$(".Check_calendar .day ul li"),$(".Check_calendar .day ul"),$(".Check_calendar .header .years .year"), $(".Check_calendar .header .years .month"));
    last_btn(left_year , left_month, $(".Check_calendar .last_year") ,$(".Check_calendar .last_month"));
})
$(".Check_calendar .next_year").click(function(){      //入住下年按钮
    left_year ++;
    Add_a_calendar_1( left_year , left_month , new Date().getDate() ,$(".Check_calendar .day ul li"),$(".Check_calendar .day ul"),$(".Check_calendar .header .years .year"), $(".Check_calendar .header .years .month"));
    last_btn(left_year , left_month, $(".Check_calendar .last_year") ,$(".Check_calendar .last_month"));
})
$(".Check_calendar .last_year").click(function(){      //入住上年按钮
    left_year --;
    if( left_year <= new Date().getFullYear() && left_month < new Date().getMonth()+1){
        left_year = new Date().getFullYear();
        left_month = new Date().getMonth()+1;
        Add_a_calendar_1( left_year , left_month , new Date().getDate() ,$(".Check_calendar .day ul li"),$(".Check_calendar .day ul"),$(".Check_calendar .header .years .year"), $(".Check_calendar .header .years .month"));
        last_btn(left_year , left_month, $(".Check_calendar .last_year") ,$(".Check_calendar .last_month"));
    }else{
        Add_a_calendar_1( left_year , left_month , new Date().getDate() ,$(".Check_calendar .day ul li"),$(".Check_calendar .day ul"),$(".Check_calendar .header .years .year"), $(".Check_calendar .header .years .month"));
        last_btn(left_year , left_month, $(".Check_calendar .last_year") ,$(".Check_calendar .last_month"));
    }
})


var  right_year = new Date().getFullYear();      //退房日历年
var  right_month = new Date().getMonth()+1;      //退房日历月
$(".Check_out_calendar .next_month").click(function(){      //退房下月按钮
    right_month ++;
    if( right_month == 13 ){
        right_month = 1;
        right_year ++ ;
    }
    Add_a_calendar_2( right_year , right_month , new Date().getDate() ,$(".Check_out_calendar .day ul li"),$(".Check_out_calendar .day ul"),$(".Check_out_calendar .header .years .year"), $(".Check_out_calendar .header .years .month"));
    last_btn(right_year , right_month, $(".Check_out_calendar .last_year") ,$(".Check_out_calendar .last_month"));
})
$(".Check_out_calendar .last_month").click(function(){      //退房上月按钮
    right_month --;
    if( right_month == 0 ){
        right_month = 12;
        right_year -- ;
    }
    Add_a_calendar_2( right_year , right_month , new Date().getDate() ,$(".Check_out_calendar .day ul li"),$(".Check_out_calendar .day ul"),$(".Check_out_calendar .header .years .year"), $(".Check_out_calendar .header .years .month"));
    last_btn(right_year , right_month, $(".Check_out_calendar .last_year") ,$(".Check_out_calendar .last_month"));
})
$(".Check_out_calendar .next_year").click(function(){      //退房下年按钮
    right_year ++;
    Add_a_calendar_2( right_year , right_month , new Date().getDate() ,$(".Check_out_calendar .day ul li"),$(".Check_out_calendar .day ul"),$(".Check_out_calendar .header .years .year"), $(".Check_out_calendar .header .years .month"));
    last_btn(right_year , right_month, $(".Check_out_calendar .last_year") ,$(".Check_out_calendar .last_month"));
})
$(".Check_out_calendar .last_year").click(function(){      //退房上年按钮
    right_year --;
    if( right_year <= new Date().getFullYear() && right_month < new Date().getMonth()+1){
        right_year = new Date().getFullYear();
        right_month = new Date().getMonth()+1;
        Add_a_calendar_2( right_year , right_month , new Date().getDate() ,$(".Check_out_calendar .day ul li"),$(".Check_out_calendar .day ul"),$(".Check_out_calendar .header .years .year"), $(".Check_out_calendar .header .years .month"));
        last_btn(right_year , right_month, $(".Check_out_calendar .last_year") ,$(".Check_out_calendar .last_month"));
    }else{
        Add_a_calendar_2( right_year , right_month , new Date().getDate() ,$(".Check_out_calendar .day ul li"),$(".Check_out_calendar .day ul"),$(".Check_out_calendar .header .years .year"), $(".Check_out_calendar .header .years .month"));
        last_btn(right_year , right_month, $(".Check_out_calendar .last_year") ,$(".Check_out_calendar .last_month"));
    }
})

//控制日历显示隐藏
var Check_judge = 1;
var Check_mian_judge = 1;
var Check_out_mian_judge = 1;
$(".Check").click(function(){
    event.stopPropagation();
    if( Check_judge === 1){
        $(".Check_calendar").show();
        Check_judge = 2;
        return;
    }
    if( Check_judge === 2){
        $(".Check_calendar").hide();
        Check_judge = 1;
    }
})
var Check_out_judge = 1;
$(".Check_out").click(function(){
    event.stopPropagation();
    if( $(".Check").val().length == 0 ||  $(".Check").attr("data-time") == undefined || $(".Check").attr("data-time") == ""){
        // alert("请先选择入住时间")
        $(".modal-body p").html( "请先选择入住时间" );
        $('#myModal').modal('show');
        return;
    }
    if( Check_out_judge === 1){
        $(".Check_out_calendar").show();
        Check_out_judge = 2;
        return;
    }
    if( Check_out_judge === 2){
        $(".Check_out_calendar").hide();
        Check_out_judge = 1;
    }
})

$(".Inquire_room").click(function(){
    if( $(".Check").attr("data-time") != undefined  && $(".Check_out").attr("data-time") == undefined){
        // alert("入住和退房时间必须同时选择或者同时不选")
        $(".modal-body p").html( "入住和退房时间必须同时选择或者同时不选" );
        $('#myModal').modal('show');
        return;
    }
    if( $(".Check").attr("data-time") == undefined  && $(".Check_out").attr("data-time") != undefined){
        // alert("入住和退房时间必须同时选择或者同时不选")
        $(".modal-body p").html( "入住和退房时间必须同时选择或者同时不选" );
        $('#myModal').modal('show');
        return;
    }
    if( $(".Check").attr("data-time") != ""  && $(".Check_out").attr("data-time") == ""){
        // alert("入住和退房时间必须同时选择或者同时不选")
        $(".modal-body p").html( "入住和退房时间必须同时选择或者同时不选" );
        $('#myModal').modal('show');
        return;
    }
    if( $(".Check").attr("data-time") == ""  && $(".Check_out").attr("data-time") != ""){
        // alert("入住和退房时间必须同时选择或者同时不选")
        $(".modal-body p").html( "入住和退房时间必须同时选择或者同时不选" );
        $('#myModal').modal('show');
        return;
    }
    var checkTime = "";
    if( $(".Check").attr("data-time") != undefined && $(".Check_out").attr("data-time") != undefined && $(".Check").attr("data-time") != ""  &&  $(".Check_out").attr("data-time") != ""){
        checkTime = $(".Check").attr("data-time") + "," + $(".Check_out").attr("data-time");
    } 
    $.ajax({
        method:"GET",
        url: url + "v1/hotel/room",
        // url: "php/fangxing.js",
        dataType: "json",
        async: true,
        data:{
            hotelId:hotelId,
            checkTime: checkTime 
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            var roomList = data.data.roomList;
            var str = `<table>
                            <tr>
                                <td>房型详情</td>
                                <td>床型</td>
                                <td>面积</td>
                                <td>上网方式</td>
                                <td>早餐</td>
                                <td>窗户</th>
                                <td>取消规则</td>
                                <td>房价</td>
                            </tr>
            `
            for(i=0;i<roomList.length;i++){
                var url_Jump = "";
                if( roomList[i].count == 0 ){
                    url_Jump = `<a>已订完</a>`;
                }else{
                    var Check_time = "";
                    var Check_out_time = "";
                    var Check_data_time = ""
                    var Check_out_data_time = ""
                    var Check_week = ""
                    var Check_out_week = ""
                    if( $(".Check").attr("data-time") != undefined && $(".Check_out").attr("data-time")){
                        Check_time  =  $(".Check").val();
                        Check_out_time  = $(".Check_out").val();
                        Check_data_time  =  $(".Check").attr("data-time");
                        Check_out_data_time  = $(".Check_out").attr("data-time");
                        Check_week = $(".Check_week").html()
                        Check_out_week = $(".Check_out_week").html();
                    }
                    url_Jump = `<a href="reserve.html?id=`+ hotelId +`?RoomCount=`+ roomList[i].count +`?RoomName=`+ roomList[i].name +`?RoomPrice=`+ roomList[i].price +`?position=`+ localStorage.HotelPosition +`?HotelName=`+ localStorage.HotelName +`?BedType=`+ roomList[i].bedType+`?RoomArea=`+ roomList[i].area +`?wayOfInternet=`+ roomList[i].wayOfInternet +`?breakfast=`+ roomList[i].breakfast +`?HotelPhone=`+ localStorage.Hotelphone +`?Check_time=`+ Check_time +`?Check_out_time=`+ Check_out_time +`?Check_data_time=`+ Check_data_time +`?Check_out_data_time=`+ Check_out_data_time +`?Check_week=`+ Check_week +`?Check_out_week=`+ Check_out_week +`?Hotel_picture=`+localStorage.Hotel_picture +`" class="active">预定</a>`;
                    // url_Jump = `<a href="reserve.html?酒店ID=`+ hotelId +`?房间数量=`+ roomList[i].count +`?房间名称=`+ roomList[i].name +`?房间价格=`+ roomList[i].price +`?酒店位置=`+ localStorage.HotelPosition +`?酒店名称=`+ localStorage.HotelName +`?床型=`+ roomList[i].bedType+`?房间面积=`+ roomList[i].area +`?WIFI=`+ roomList[i].wayOfInternet +`?早餐=`+ roomList[i].breakfast +`?酒店电话=`+ localStorage.Hotelphone +`?入住时间=`+ Check_time +`?退房时间=`+ Check_out_time +`?入住时间戳=`+ Check_data_time +`?退房时间戳=`+ Check_out_data_time +`?入住星期几=`+ Check_week +`?退房星期几=`+ Check_out_week +`?酒店照片=`+localStorage.Hotel_picture +`" class="active">预定</a>`;
                }
                str +=`
                        <tr>
                        <td><div title="`+ roomList[i].name +`">`+ roomList[i].name +`</div></td>
                        <td><div title="`+ roomList[i].bedType +`">`+ roomList[i].bedType +`</div></td>
                        <td><div title="`+ roomList[i].area +`">`+ roomList[i].area +`M²</div></td>
                        <td><div title="`+ roomList[i].wayOfInternet +`">`+ roomList[i].wayOfInternet +`</div></td>
                        <td><div title="`+ roomList[i].breakfast +`">`+ roomList[i].breakfast +`</div></td>
                        <td><div title="`+ roomList[i].window +`">`+ roomList[i].window +`</div></td>
                        <td><div title="`+ roomList[i].cancelOfRules +`">`+ roomList[i].cancelOfRules +`</div></td>
                        <td>¥<span>`+ roomList[i].price +`</span></td>
                        <td class="Jump">`+ url_Jump +`</td>
                    </tr>
                `
            }
            str += `</table>`
            $(".Details_of_the_house_type").find("table").remove();
            $(".Details_of_the_house_type").append( str );
        }
    })
})
var top_scroll = $(".Skip_navigation_bar").offset().top;
$(document).scroll(function(){
    if( $(document).scrollTop() >= top_scroll  ){
        $(".Skip_navigation_bar").addClass("active")
        setInterval(function(){
            var width_nav = ($(window).width() - $(".Skip_navigation_bar").width() )/2 ;
            if( width_nav < 0 ){
                width_nav = 0
                
            }
            $(".Skip_navigation_bar").css("left", width_nav );
        })
    }
    if( $(document).scrollTop() < top_scroll ){
        $(".Skip_navigation_bar").removeClass("active");
    }
    if( $(document).scrollTop() >= $(".User_evaluation").offset().top - 120){
        $("#User_evaluation").addClass("active").siblings().removeClass("active");
        return;
    }
    if( $(document).scrollTop() >= $(".Hotel_map").offset().top - 120){
        $("#Traffic_position").addClass("active").siblings().removeClass("active");
        return;
    }
    if( $(document).scrollTop() >= $(".Hotel_information").offset().top - 120 ){
        $("#Hotel_xinxi").addClass("active").siblings().removeClass("active");
        return;
    }
    if( $(document).scrollTop() >= $(".Room_type_reservation").offset().top -120 ){
        $("#room_Reserve").addClass("active").siblings().removeClass("active");
        return;
    }
})

// 中间导航条点击事件
$("#User_evaluation").click(function(){     //用户评价
    $(this).addClass("active").siblings().removeClass("active");
    $(document).scrollTop( $(".User_evaluation").offset().top - 100 ) 
})
$("#Traffic_position").click(function(){     //交通位置
    $(this).addClass("active").siblings().removeClass("active");
    $(document).scrollTop( $(".Hotel_map").offset().top - 100 ) 
})
$("#Hotel_xinxi").click(function(){     //酒店信息
    $(this).addClass("active").siblings().removeClass("active");
    $(document).scrollTop( $(".Hotel_information").offset().top - 100 ) 
})
$("#room_Reserve").click(function(){     //房型预定
    $(this).addClass("active").siblings().removeClass("active");
    $(document).scrollTop( $(".Room_type_reservation").offset().top - 100 ) 
})


//页面跳转加载评论
/**
 * @param  {} page  页数
 * @param  {} sort  全部，好评，差评，有图，['all', 'praise', 'negative', 'picture']
 */
function comment_loading( page , sort){ 
    $.ajax({
        method:"GET",
        url: url + "v1/hotel/evaluate/list",
        // url:"php/pinglun.js",
        dataType: "json",
        async: true,
        data:{
            hotelId: hotelId ,
            limit: 3,
            page: page,
            sort: sort
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if( data.code == "success"){
            var evaluate_data = data.data.evaluate;
            var evaluate_str = "";
            $(".evaluate .main").remove();
            for( i=0;i<evaluate_data.length;i++ ){
                var img_str = "";
                var start_str = "";
                if( evaluate_data[i].picture.length != 0 ){
                    img_str += '<br><br>'
                    for( a=0;a<evaluate_data[i].picture.length;a++ ){
                        img_str += '<img src="'+ url_img + evaluate_data[i].picture[a] +'" alt="">'
                        // img_str += '<img src="images/index_banner.png" alt="">'
                    }
                }
                for(a=0;a<evaluate_data[i].score;a++){
                    start_str += '<li><img src="images/icon_star.png" alt=""></li>'
                }
                evaluate_str +=`
                    <div class="main">
                        <div class="User_data">
                            <img src="`+ url_img+evaluate_data[i].account.avatar +`" alt="" class="user_img">
                            <div class="user_name" title="`+ evaluate_data[i].account.name +`">`+ evaluate_data[i].account.name +`</div>
                        </div>
                        
                        <div class="right_evaluate">
                            <div class="head">
                                <div class="score">
                                    <ul>
                                    `+ start_str +`
                                    </ul>
                                </div>
                                <div class="Publication_time">
                                    `+ moment(evaluate_data[i].create_time).format('YYYY-MM-DD') +`
                                </div>
                            </div>
                            <div class="subject">
                                `+ evaluate_data[i].content +`
                                
                                `+ img_str +`
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                `
            }
            $(".evaluate .main").remove();
            $(".evaluate").append( evaluate_str );
            //评论底下分页动态加载
            $(".Review_page .Middle ").html("");
            var Review_page_str = "";
            var btn_left ="";
            var btn_right = "";
            if( page == 1 && page == Math.ceil( data.data.count/3 ) ){
                btn_left = '<button class="upper_page prohibit" disabled="disabled"> < </button>';
                btn_right = '<button class="lower_page prohibit" disabled="disabled"> > </button>';
            }else if( page == 1 ){
                btn_left = '<button class="upper_page prohibit" disabled="disabled"> < </button>';
                btn_right = '<button class="lower_page active"> > </button>';
            }else if( page == Math.ceil( data.data.count/3 ) ){
                btn_left = '<button class="upper_page active"> < </button>';
                btn_right = '<button class="lower_page prohibit" disabled="disabled"> > </button>';
            }else {
                btn_left = '<button class="upper_page active"> < </button>';
                btn_right = '<button class="lower_page active"> > </button>';
            }
            if( data.data.count/3 > 6){
                Review_page_str = btn_left +`
                    <div> 1 </div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>···</div>
                    <div>`+ Math.ceil( data.data.count/3 ) +`</div>
                `+btn_right;
            }else{
                var btn_str="";
                for( i=1;i<Math.ceil( data.data.count/3 )+1;i++ ){
                    btn_str += '<div>'+ i +'</div>';
                }
                Review_page_str = btn_left + btn_str + btn_right;
            }
            $(".Review_page .Middle").append( Review_page_str );
            var x = page-1
            $(".Review_page .Middle div")[x].className = "active";
        }
        if( data.code == "evaluate_not_found" ){
            $(".evaluate .main").remove();
            //评论底下分页动态加载
            $(".Review_page .Middle ").html("");
            setTimeout(function(){
                // alert( "该评价暂无评论" )
                $(".modal-body p").html( "该评价暂无评论" );
                $('#myModal').modal('show');
            },200)
        }
    })
}
function comment_loading1( page , sort){ 
    $.ajax({
        method:"GET",
        url: url + "v1/hotel/evaluate/list",
        // url:"php/pinglun.js",
        dataType: "json",
        async: true,
        data:{
            hotelId: hotelId ,
            limit: 3,
            page: page,
            sort: sort
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if( data.code == "success"){
            console.log( data )
            var evaluate_data = data.data.evaluate;
            var evaluate_str = "";
            $(".evaluate .main").remove();
            for( i=0;i<evaluate_data.length;i++ ){
                var img_str = "";
                var start_str = "";
                if( evaluate_data[i].picture.length != 0 ){
                    img_str += '<br><br>'
                    for( a=0;a<evaluate_data[i].picture.length;a++ ){
                        img_str += '<img src="'+ url_img + evaluate_data[i].picture[a] +'" alt="">'
                        // img_str += '<img src="images/index_banner.png" alt="">'
                    }
                }
                for(a=0;a<evaluate_data[i].score;a++){
                    start_str += '<li><img src="images/icon_star.png" alt=""></li>'
                }
                evaluate_str +=`
                    <div class="main">
                        <div class="User_data">
                            <img src="`+ url_img+evaluate_data[i].account.avatar +`" alt="" class="user_img">
                            <div class="user_name" title="`+ evaluate_data[i].account.name +`">`+ evaluate_data[i].account.name +`</div>
                        </div>
                        
                        <div class="right_evaluate">
                            <div class="head">
                                <div class="score">
                                    <ul>
                                    `+ start_str +`
                                    </ul>
                                </div>
                                <div class="Publication_time">
                                    `+ moment(evaluate_data[i].create_time).format('YYYY-MM-DD') +`
                                </div>
                            </div>
                            <div class="subject">
                                `+ evaluate_data[i].content +`
                                
                                `+ img_str +`
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                `
            }
            $(".evaluate").append( evaluate_str );
        }
    })
}
var sort = "all";   //保存评论类型
var page_i = 1 //保存评论当前页
$(".Review_page .Middle").on('click','div',function(){
    var div_i = $(".Review_page .Middle div");
    if( $(div_i[div_i.length-1]).html() <= 6 ){
        page_i = $(this).html();
        comment_loading1( page_i , sort );
        if( page_i == 1 ){
            $(".upper_page").attr("disabled",true);
            $(".upper_page").addClass("prohibit");
        }
        if( page_i != 1 ){
            $(".upper_page").attr("disabled",false);
            $(".upper_page").removeClass("prohibit");
        }
        if( page_i == $(div_i[div_i.length-1]).html() ){
            $(".lower_page").attr("disabled",true);
            $(".lower_page").addClass("prohibit");
        }
        if( page_i != $(div_i[div_i.length-1]).html() ){
            $(".lower_page").attr("disabled",false);
            $(".lower_page").removeClass("prohibit");
        }
        $(this).addClass("active").siblings().removeClass("active");
    }else{
        if( $(this).html() != "···"){
            page_i = $(this).html();
            comment_loading1( page_i , sort );
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
            if( page_i == Number( $(x[x.length-1]).html() )-3 ){
            
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
        page_i -- ;
        for( i=0;i<div_i.length;i++ ){
            if( $(div_i[i]).html() == page_i ){
                $(div_i[i]).addClass("active").siblings().removeClass("active");
            }
        }
        if( page_i == 1 ){
            $(".upper_page").attr("disabled",true);
            $(".upper_page").addClass("prohibit");
        }
        $(".lower_page").attr("disabled",false);
        $(".lower_page").removeClass("prohibit");
        comment_loading1( page_i , sort );
    }else{
        page_i -- ;
        comment_loading1( page_i , sort );
        if( page_i == 1 ){
            $(".upper_page").attr("disabled",true);
            $(".upper_page").addClass("prohibit");
            return;
        }
        if( page_i == Number( $(div_i[div_i.length-6]).html() ) ){
            $(div_i[div_i.length-2]).html("···");
            for( i=0;i<div_i.length-2;i++ ){
                $(div_i[i]).html( Number(  $(div_i[i]).html()-1 ) );
            }
            $(".lower_page").attr("disabled",false);
            $(".lower_page").removeClass("prohibit");
        }
        for( i=0;i<div_i.length;i++ ){
            if( Number( $(div_i[i]).html() ) == page_i ){
                $(div_i[i]).addClass("active").siblings().removeClass("active");
            }
        }
    }
})
//评论右箭头点击事件
$(".Middle").on('click','.lower_page',function(){
    var div_i = $(".Review_page .Middle div");
    if( $(div_i[div_i.length-1]).html() <= 6 ){
        page_i ++ ;
        for( i=0;i<div_i.length;i++ ){
            if( $(div_i[i]).html() == page_i ){
                $(div_i[i]).addClass("active").siblings().removeClass("active");
            }
        }
        if( page_i == $(div_i[div_i.length-1]).html() ){
            $(".lower_page").attr("disabled",true);
            $(".lower_page").addClass("prohibit");
        }
        $(".upper_page").attr("disabled",false);
        $(".upper_page").removeClass("prohibit");
        comment_loading1( page_i , sort );
    }else{
        page_i ++ ;
        console.log( page_i+2 == Number( $(div_i[div_i.length-1]).html() ) );
        console.log( page_i+2 == Number( $(div_i[div_i.length-2]).html() ) );
        
        for(i=0;i<div_i.length;i++){
            if( $(div_i[i]).html() == "···" ){
                if( page_i == Number( $(div_i[div_i.length-3]).html()  )){
                    for( i=0;i<div_i.length-2;i++ ){
                        var x =  Number( $(div_i[i]).html());
                        x++;
                        $(div_i[i]).html( x );
                    }
                }
                for(i=0;i<div_i.length;i++){
                    if( $(div_i[i]).html() == page_i ){
                        $(div_i[i]).addClass("active").siblings().removeClass("active");
                    }
                }
            } 
        }
        if( page_i == Number( $(div_i[div_i.length-1]).html() )-3 ){
            
            $(div_i[div_i.length-2]).html( Number( $(div_i[div_i.length-1]).html() )-1 );

            $(".lower_page").attr("disabled",true);
            $(".lower_page").addClass("prohibit");
        }
        if( Number( $(div_i[0]).html() ) != 1 ){
            $(".upper_page").attr("disabled",false);
            $(".upper_page").removeClass("prohibit");
            
        }
        comment_loading1( page_i , sort );
    }
})

// 评价导航条点击
$("#all").click(function(){     //全部
    sort = "all";
    page_i = 1;
    comment_loading( page_i , sort );
    $(this).addClass("active").siblings().removeClass("active");
})
$("#good").click(function(){     //好评
    sort = "praise";
    page_i = 1;
    comment_loading( page_i , sort );
    $(this).addClass("active").siblings().removeClass("active");
})
$("#bad").click(function(){     //差评
    sort = "negative";
    page_i = 1;
    comment_loading( page_i , sort );
    $(this).addClass("active").siblings().removeClass("active");
})
$("#photo").click(function(){     //有图
    sort = "picture";
    page_i = 1;
    comment_loading( page_i , sort );
    $(this).addClass("active").siblings().removeClass("active");
})

$(".calendar_time").click(function(){
    event.stopPropagation();
})
$(document).click(function(){
    Check_judge = 1;
    Check_out_mian_judge = 1;
    $(".calendar_time").hide();
})
$(document).ready(function(){
    Page_Jump();
    erweima();  //分享二维码
    comment_loading( page_i , sort ); //页面跳转加载一页评论
    Add_a_calendar( right_year , right_month , new Date().getDate() ,$(".calendar_time .day ul li"),$(".calendar_time .day ul"),$(".calendar_time .header .years .year"), $(".calendar_time .header .years .month")); //页面打开加载日历
    last_btn(   right_year , right_month , $(".last_year") ,$(".last_month"));
})