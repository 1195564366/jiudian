var room_money = ""; //房间单价用来计算总价
var room_count = ""; //房间剩余数量用来判断加减按钮
var Hotel_ID = "";  //保存酒店id
var Room_Name = ""; //保存房间名称
//入住退房日历
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
            alert("请先选择入住时间");
            Check_out_judge = 1;
            return;
        }
        if( $(this).attr("data-time") <= $(".Check").attr("data-time")){
            alert("退房时间不能等于或小于入住时间");
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
        var Check_out_data_time = Number( $(".Check_out").attr("data-time") );
        var Check_data_time = Number( $(".Check").attr("data-time") );
        var time= $(this).attr("data-time") - $(".Check").attr("data-time");
            $(".Statistics").html( "共"+ Math.ceil(time/86400000) + "晚");
            $(".Room_price span").html( room_money*Math.ceil( (Check_out_data_time-Check_data_time)/86400000) );
            $(".all_price span").html( room_money*Math.ceil(( Check_out_data_time-Check_data_time)/86400000) );
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
        alert("请先选择入住时间")
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

function add_content(){ //动态添加页面跳转来的内容
    var content_url = window.location.href;
    content_url = content_url.split("?");
    console.log( content_url );

    //酒店照片
    var Hotel_price = content_url[ content_url.length-1 ].split("=")[ content_url[ content_url.length-1 ].split("=").length-1 ];
    Hotel_price = url_img + Hotel_price; 
    $(".Hotel_price img").attr("src",Hotel_price);

    //退房星期几
    var Check_out_week = content_url[ content_url.length-2 ].split("=")[ content_url[ content_url.length-2 ].split("=").length-1 ];
    Check_out_week  =  decodeURI( Check_out_week );
    $(".Check_out_week").html( Check_out_week );

    //入住星期几
    var Check_week = content_url[ content_url.length-3 ].split("=")[ content_url[ content_url.length-3 ].split("=").length-1 ];
    Check_week  =  decodeURI( Check_week );
    $(".Check_week").html( Check_week );
    //退房时间戳
    var Check_out_data_time = content_url[ content_url.length-4 ].split("=")[ content_url[ content_url.length-4 ].split("=").length-1 ];
    $(".Check_out").attr( "data-time", Check_out_data_time );
    //入住时间戳
    var Check_data_time = content_url[ content_url.length-5 ].split("=")[ content_url[ content_url.length-5 ].split("=").length-1 ];
    $(".Check").attr( "data-time", Check_data_time );
    //判断住几晚
    var night = Check_out_data_time - Check_data_time
    night =  Math.ceil(night/86400000) ;
    $(".Statistics").html( "共"+ night +"晚" )
    //退房年月日
    var Check_out_time = content_url[ content_url.length-6 ].split("=")[ content_url[ content_url.length-6 ].split("=").length-1 ];
    Check_out_time = decodeURI( Check_out_time )
    $(".Check_out").val(Check_out_time );
    //入住年月日
    var Check_time = content_url[ content_url.length-7 ].split("=")[ content_url[ content_url.length-7 ].split("=").length-1 ];
    Check_time = decodeURI( Check_time )
    $(".Check").val(Check_time );
    //商家热线
    var HotelPhone = content_url[ content_url.length-8 ].split("=")[ content_url[ content_url.length-8 ].split("=").length-1 ];
    HotelPhone = decodeURI( HotelPhone );
    HotelPhone = HotelPhone.split("电话")[HotelPhone.split("电话").length-1];
    $(".Hotel_phone span").html( HotelPhone );
    //早餐
    var breakfast = content_url[ content_url.length-9 ].split("=")[ content_url[ content_url.length-9 ].split("=").length-1 ];
    breakfast = decodeURI( breakfast );
    $(".breakfast span").html( breakfast );
    //宽带
    var WIFI = content_url[ content_url.length-10 ].split("=")[ content_url[ content_url.length-10 ].split("=").length-1 ];
    WIFI = decodeURI( WIFI );
    $(".Room_wifi span").html( WIFI );
    //面积
    var RoomArea = content_url[ content_url.length-11 ].split("=")[ content_url[ content_url.length-11 ].split("=").length-1 ];
    RoomArea = decodeURI( RoomArea );
    $(".Room_area span").html( RoomArea );
    //床型
    var BedType = content_url[ content_url.length-12 ].split("=")[ content_url[ content_url.length-12 ].split("=").length-1 ];
    BedType = decodeURI( BedType );
    $(".BedType span").html( BedType );
    //酒店名称
    var HotelName = content_url[ content_url.length-13 ].split("=")[ content_url[ content_url.length-13 ].split("=").length-1 ];
    HotelName = decodeURI( HotelName );
    $(".Hotel_name").html( HotelName );
    $(".Hotel_name").attr( "title",HotelName );
    //酒店位置
    var position = content_url[ content_url.length-14 ].split("=")[ content_url[ content_url.length-14 ].split("=").length-1 ];
    position = decodeURI( position );
    $(".Hotel_position").html( position );
    $(".Hotel_position").attr( "title",position );
    //房间单价
    var RoomPrice = content_url[ content_url.length-15 ].split("=")[ content_url[ content_url.length-15 ].split("=").length-1 ];
    room_money = RoomPrice;
    $(".Room_price span").html( RoomPrice*Math.ceil( (Check_out_data_time-Check_data_time)/86400000) );
    $(".all_price span").html( RoomPrice*Math.ceil(( Check_out_data_time-Check_data_time)/86400000) );
    //房间名称
    var RoomName = content_url[ content_url.length-16 ].split("=")[ content_url[ content_url.length-16 ].split("=").length-1 ];
    RoomName = decodeURI( RoomName );
    $(".Room_type_name span").html( RoomName );
    $(".Room_name").html( RoomName );
    Room_Name = RoomName;
    //房间剩余数量 
    room_count  = content_url[ content_url.length-17 ].split("=")[ content_url[ content_url.length-17 ].split("=").length-1 ];
    $(".room_count").html("剩余"+ room_count +"间");
    if( room_count == 1 ){
        $(".reduce").attr("disabled",true);
        $(".reduce").css("background",'url("images/icon_plus_2.png") 9px 9px no-repeat');
    }
    //酒店ID
    Hotel_ID = content_url[ content_url.length-18 ].split("=")[ content_url[ content_url.length-18 ].split("=").length-1 ];
}

//房间数量用户选择判断
$(".count").blur(function(){
    if( Number( $(this).val()) < 1 ){
        alert("房间数量不能低于1间");
        $(this).val( 1 );
    }
    if( Number( $(this).val()) > room_count ){
        alert( "房间数量超过剩余房间数量,剩余房间数"+ room_count);
        $(this).val( room_count );
    }
    var x= $(this).val();
    var time_i = Number($(".Check_out").attr("data-time"))-Number($(".Check").attr("data-time"));
    $(".Room_price span").html( room_money *Math.ceil( time_i/86400000)*x );
    $(".all_price span").html( room_money *Math.ceil( time_i/86400000)*x );
})
$(".count").keyup(function(){
    if( Number( $(this).val()) >= room_count ){
       
        $(".reduce").attr("disabled",true);
        $(".reduce").css( "background", 'url("images/icon_plus_2.png") no-repeat 9px 9px');
    }else{
        $(".reduce").attr("disabled",false);
        $(".reduce").css( "background", 'url("images/icon_plus.png") no-repeat 9px 9px');
    }
    if( Number( $(this).val()) <= 1 || $(this).val() == ""){
        $(".plus").attr("disabled",true);
        $(".plus").css( "background", 'url("images/icon_minus.png") no-repeat 9px 9px');
    }else{
        $(".plus").attr("disabled",false);
        $(".plus").css( "background", 'url("images/icon_minus_2.png") no-repeat 9px 9px');
    }
    if( Number( $(this).val()) > room_count ){
        alert( "剩余2间" );
        $(this).val( 2 );
        var time_i = Number($(".Check_out").attr("data-time"))-Number($(".Check").attr("data-time"));
        $(".Room_price span").html( room_money *Math.ceil( time_i/86400000)*$(this).val() );
        $(".all_price span").html( room_money *Math.ceil( time_i/86400000)*$(this).val() );
        }
    var x= $(this).val();
    var time_i = Number($(".Check_out").attr("data-time"))-Number($(".Check").attr("data-time"));
    $(".Room_price span").html( room_money *Math.ceil( time_i/86400000)*x );
    $(".all_price span").html( room_money *Math.ceil( time_i/86400000)*x );
})
//减房间数
$(".plus").click(function(){
    var x = $(".count").val();
    x--;
    $(".count").val( x );
    var time_i = Number($(".Check_out").attr("data-time"))-Number($(".Check").attr("data-time"));
    $(".Room_price span").html( room_money *Math.ceil( time_i/86400000)*x );
    $(".all_price span").html( room_money *Math.ceil( time_i/86400000)*x );
    if( x == 1){
        $(".plus").attr("disabled",true);
        $(".plus").css( "background", 'url("images/icon_minus.png") no-repeat 9px 9px');
    }
    if( x <  room_count ){
        $(".reduce").attr("disabled",false);
        $(".reduce").css( "background", 'url("images/icon_plus.png") no-repeat 9px 9px');
    }
})
//加房间数
$(".reduce").click(function(){
    var x = $(".count").val();
    x++;
    $(".count").val( x );
    var time_i = Number($(".Check_out").attr("data-time"))-Number($(".Check").attr("data-time"));
    $(".Room_price span").html( room_money *Math.ceil( time_i/86400000)*x );
    $(".all_price span").html( room_money *Math.ceil( time_i/86400000)*x );
    if( x == room_count){
        $(".reduce").attr("disabled",true);
        $(".reduce").css( "background", 'url("images/icon_minus.png") no-repeat 9px 9px');
    }
    if( x >  1 ){
        $(".plus").attr("disabled",false);
        $(".plus").css( "background", 'url("images/icon_plus.png") no-repeat 9px 9px');
    }
})
$(".user_name input").keyup(function(){         //客户姓名 input输入事件
    if( $(this).val().length <= 0 ){
        $(".user_name .error").html("请输入姓名");
        return;
    }
    if( $(this).val().length > 0 ){
        $(".user_name .error").html("");
    }
})
$(".user_phone input").keyup(function(){        //联系方式 input输入事件
    $(".user_phone .error").html("");
    if( $(this).val().length <= 0 ){
        $(".user_phone .error").html("请输入手机号码");
        return;
    }
    if( $(this).val().length  == 11 ){
        if( !(/^1[34578]\d{9}$/.test( $(this).val() )) ){
            $(".user_phone .error").html("手机号码格式不对");
        }
    }
})
//提交订单
$(".Submit_Order").click(function(){
 
    if( $(".user_name input").val().length <= 0 ){
        $(".user_name .error").html("请输入姓名");
        return;
    }
    if( $(".user_phone input").val().length <= 0 ){
        $(".user_phone .error").html("请输入手机号码");
        return;
    }
    if( $(".user_phone input").val().length != 11 ){
        $(".user_phone .error").html("手机号码位数不对");
        return;
    }
    if(  !(/^1[34578]\d{9}$/.test( $(".user_phone input").val() )) ){
        $(".user_phone .error").html("手机号码格式不对");
        return;
    }
    if( $(".Check").attr( "data-time" ) == undefined || $(".Check").attr( "data-time" ) == "" || $(".Check_out").attr( "data-time" ) == undefined || $(".Check_out").attr( "data-time" ) == ""){
        alert( "请先选择入住和退房事件" );
        return;
    }
    var token = localStorage.token;
    var hotelId = Hotel_ID;
    var checkTime = $(".Check").attr( "data-time" )+","+$(".Check_out").attr( "data-time" );
    var roomNumber = $(".count").val();
    var customerName = $(".user_name input").val();
    var customerPhone = $(".user_phone input").val();
    var roomName =  Room_Name;
    $.ajax({
        method: "POST",
        url: url + "v1/order/create",
        async: true,
        type:"String",
        ContentType:'application/x-www-form-urlencoded',
        data:{
            token:token,
            roomName:roomName,
            hotelId:hotelId,
            checkTime:checkTime,
            roomNumber:roomNumber,
            customerName:customerName,
            customerPhone:customerPhone
        },
        xhrFields: {
            withCredentials: true
        },
    })
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            var room_data = data.data;
            window.location.href = "payment.html?hotelName="+ room_data.hotelName + "?hotelPicture="+room_data.hotelPicture+"?orderAmount="+room_data.orderAmount+"?roomName="+ room_data.roomName +"?_id="+room_data._id;
            return
        }
        if( data.code = "phone_format_error" ){
            alert("手机号码格式错误")
            return;
        }
        if( data.code = "phone_format_error" ){
            alert("手机号码格式错误")
            return;
        }
        if( data.code = "account_token_invalid"){
            alert("身份已失效,请重新登陆")
            return;
        }
        if( data.code = "room_not_found"){
            alert("房间已经被定完")
            return;
        }
        if( data.code = "room_number_not_enough"){
            alert("可预订房间数小于预订房间数")
            return;
        }
        if( data.code = "order_create_fail"){
            alert("订单创建失败,请重新创建")
            return;
        }
    })
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
    add_content();
    Add_a_calendar( right_year , right_month , new Date().getDate() ,$(".calendar_time .day ul li"),$(".calendar_time .day ul"),$(".calendar_time .header .years .year"), $(".calendar_time .header .years .month")); //页面打开加载日历
    last_btn(   right_year , right_month , $(".last_year") ,$(".last_month"));
})
