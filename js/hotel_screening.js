function city_request(){    //封装请求城市数据
    $.ajax({
        method: "GET",
        url: url+"v1/city/list",
        // url: "php/city.js",
        dataType: "json",
        async: true,
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if(data.code == "success"){
            city_name_all = data.data; //保存所有城市数据到定义的容器中
        }
    })
}

function search_input_assignment(){    //首页传过来的搜索参数传到input输入框
    if( localStorage.cityName != undefined){
        $(".city_input").val( localStorage.cityName );
    } 
    if( localStorage.time != undefined){
        $(".time_input").val( localStorage.time );
    } 
    if( localStorage.hotelKeyword != undefined){
        $(".hotelKeyword").val( localStorage.hotelKeyword );
    } 

    if( localStorage.checkTime != undefined){
        $(".time_input").attr("data-time", localStorage.checkTime );
    } 
    if( $(".hotelKeyword").val() != ""){
        $(".position .unlimited").removeClass("active");
    }
}

$(".position .unlimited").click(function(){ //位置不限点击事件
    $(this).addClass("active");
    $(".hotelKeyword").val("");
    $(".hotelKeyword").attr("data-positionType","");
    $(".hotelKeyword").attr("data-position","");
})
$(document).click(function(){   //点击页面其他地方关闭弹出框
    //字体颜色
    $(".Administrative_area").css("color","#3E3E3E");
    $(".trading_area").css("color","#3E3E3E");
    $(".Metro_station").css("color","#3E3E3E");
    $(".Station").css("color","#3E3E3E");
    $(".Scenic_spot").css("color","#3E3E3E");
    $(".Administrative_area_triangle").css("transform","rotate(0deg)"); //行政区
    $(".city_area_name").hide();                                        //行政区
    $(".trading_area_triangle").css("transform","rotate(0deg)");        //商圈
    $(".trading_area_name").hide();                                     //商圈
    $(".Metro_station_triangle").css("transform","rotate(0deg)");       //地铁站
    $(".Metro_station_name").hide();                                    //地铁站
    $(".Station_triangle").css("transform","rotate(0deg)");             //车站
    $(".Station_name").hide();                                          //车站
    $(".Scenic_spot_triangle").css("transform","rotate(0deg)");                  //景点
    $(".Scenic_spot_name").hide();                                      //景点
    Administrative_area_judge = 1;
    trading_area_judge = 1;
    Metro_station_judge = 1;
    Station_judge = 1;
    Scenic_spot_judge = 1;
})
$(".time_input").click(function(){
     //字体颜色
     $(".Administrative_area").css("color","#3E3E3E");
     $(".trading_area").css("color","#3E3E3E");
     $(".Metro_station").css("color","#3E3E3E");
     $(".Station").css("color","#3E3E3E");
     $(".Scenic_spot").css("color","#3E3E3E");
     $(".Administrative_area_triangle").css("transform","rotate(0deg)"); //行政区
     $(".city_area_name").hide();                                        //行政区
     $(".trading_area_triangle").css("transform","rotate(0deg)");        //商圈
     $(".trading_area_name").hide();                                     //商圈
     $(".Metro_station_triangle").css("transform","rotate(0deg)");       //地铁站
     $(".Metro_station_name").hide();                                    //地铁站
     $(".Station_triangle").css("transform","rotate(0deg)");             //车站
     $(".Station_name").hide();                                          //车站
     $(".Scenic_spot_triangle").css("transform","rotate(0deg)");                  //景点
     $(".Scenic_spot_name").hide();                                      //景点
     Administrative_area_judge = 1;
     trading_area_judge = 1;
     Metro_station_judge = 1;
     Station_judge = 1;
     Scenic_spot_judge = 1;

     $(".city_input").parent().find(".city_data").hide();
     $(".city_data").find(".city_name").remove();
})
$(".city_input").click(function(){
    //字体颜色
    $(".Administrative_area").css("color","#3E3E3E");
    $(".trading_area").css("color","#3E3E3E");
    $(".Metro_station").css("color","#3E3E3E");
    $(".Station").css("color","#3E3E3E");
    $(".Scenic_spot").css("color","#3E3E3E");
    $(".Administrative_area_triangle").css("transform","rotate(0deg)"); //行政区
    $(".city_area_name").hide();                                        //行政区
    $(".trading_area_triangle").css("transform","rotate(0deg)");        //商圈
    $(".trading_area_name").hide();                                     //商圈
    $(".Metro_station_triangle").css("transform","rotate(0deg)");       //地铁站
    $(".Metro_station_name").hide();                                    //地铁站
    $(".Station_triangle").css("transform","rotate(0deg)");             //车站
    $(".Station_name").hide();                                          //车站
    $(".Scenic_spot_triangle").css("transform","rotate(0deg)");                  //景点
    $(".Scenic_spot_name").hide();                                      //景点
    Administrative_area_judge = 1;
    trading_area_judge = 1;
    Metro_station_judge = 1;
    Station_judge = 1;
    Scenic_spot_judge = 1;

    date_time_hide();
})
var Administrative_area_city_input_val = "" //行政区判断城市输入框内容是否变化，如果变化就启用发送一请求事件
var Administrative_area_judge = 1; //行政区点击开关
var Administrative_area_judge_one = 1; //行政区只请求一次数据开关
var Administrative_area_data_existence = 1;   // 判断请求数据是否存在并且执行相应的方法
$(".Administrative_area").click(function(){     //行政区点击事件
    var html = $(this).find(".name").html();

    if( $(".city_input").val().length == 0){
        // alert("请先选择城市");
        $(".modal-body p").html( "请先选择城市" );
        $('#myModal').modal('show');
        return;
    }
    
    if( Administrative_area_city_input_val != $(".city_input").val() ){
        Administrative_area_judge_one = 1;
        Administrative_area_city_input_val = $(".city_input").val();
    }

    $(".trading_area").css("color","#3E3E3E");
    $(".Metro_station").css("color","#3E3E3E");
    $(".Station").css("color","#3E3E3E");
    $(".Scenic_spot").css("color","#3E3E3E");
    $(".trading_area_triangle").css("transform","rotate(0deg)");        //商圈
    $(".trading_area_name").hide();                                     //商圈
    $(".Metro_station_triangle").css("transform","rotate(0deg)");       //地铁站
    $(".Metro_station_name").hide();                                    //地铁站
    $(".Station_triangle").css("transform","rotate(0deg)");             //车站
    $(".Station_name").hide();                                          //车站
    $(".Scenic_spot_triangle").css("transform","rotate(0deg)");         //景点
    $(".Scenic_spot_name").hide();                                      //景点
    trading_area_judge = 1;
    Metro_station_judge = 1;
    Station_judge = 1;
    Scenic_spot_judge = 1;

    date_time_hide();
    $(".city_input").parent().find(".city_data").hide();
    $(".city_data").find(".city_name").remove();

    event.stopPropagation();
    if( Administrative_area_judge === 1){
        if( Administrative_area_judge_one === 1){
            $.ajax({
                method:"GET",
                url: url + "v1/city/area",
                // url: "php/xingzhengqu.js",
                dataType: "json",
                async: true,
                data:{
                    cityName: $(".city_input").val()
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if( data.code == "success"){
                    var area_data = data.data.area;
                    var str = ""
                    for(i=0;i<area_data.length;i++){
                        str += '<li title="'+ area_data[i] +'">'+ area_data[i] +'</li>'
                    }  
                    $(".Administrative_area .city_area_name ul li").remove();
                    $(".Administrative_area .city_area_name ul").append( str );
                    Administrative_area_judge_one = 2;
                    Administrative_area_data_existence = 1;
                }else{
                    Administrative_area_data_existence = 2;
                    
                    // alert("该城市暂无"+ html +"数据");
                    $(".modal-body p").html( "该城市暂无"+ html +"数据" );
                    $('#myModal').modal('show');
                    return;
                }
            })
        }
        setTimeout(function(){
            if( Administrative_area_data_existence === 1 ){
                $(this).find("img").css("transform","rotate(180deg)");
                $(".city_area_name").show();
                $(this).css("color","#5944C3");
                Administrative_area_judge = 2;
            }
        },100)
    }else if( Administrative_area_judge === 2 ){
        $(this).find("img").css("transform","rotate(0deg)");
        $(".city_area_name").hide();
        $(this).css("color","#3E3E3E");
        Administrative_area_judge = 1 ;
    }
    
})

$(".city_area_name").click(function(){      //阻止触发父元素行政区发送请求事件
    event.stopPropagation();
})
$(".city_area_name").on('click','li',function(){    //阻止触发父元素行政区发送请求事件
    event.stopPropagation();
    $(".hotelKeyword").attr("data-positionType",$(".Administrative_area .name").html() );
    $(".hotelKeyword").attr("data-position",$(this).html() );
    $(".hotelKeyword").val($(this).html() );
    $(this).parent().parent().hide();
    $(".Administrative_area").css("color","#3E3E3E");
    $(this).parent().parent().parent().find("img").css("transform","rotate(0deg)");
    Administrative_area_judge = 1 ;
    $(".position .unlimited").removeClass("active");
})


var trading_area_city_input_val = "" //商圈判断城市输入框内容是否变化，如果变化就启用发送一请求事件
var trading_area_judge = 1; //商圈开关
var trading_area_judge_one = 1 //商圈只请求一次数据开关
var trading_area_data_existence = 1;   // 判断请求数据是否存在并且执行相应的方法
$(".trading_area").click(function(){
    var html = $(this).find(".name").html();

    if( $(".city_input").val().length == 0){
        // alert("请先选择城市");
        $(".modal-body p").html( "请先选择城市" );
        $('#myModal').modal('show');
        return;
    }

    if( trading_area_city_input_val != $(".city_input").val() ){
        trading_area_judge_one = 1;
        trading_area_city_input_val = $(".city_input").val();
    }

    $(".Administrative_area").css("color","#3E3E3E");
    $(".Metro_station").css("color","#3E3E3E");
    $(".Station").css("color","#3E3E3E");
    $(".Scenic_spot").css("color","#3E3E3E");
    $(".Administrative_area_triangle").css("transform","rotate(0deg)"); //行政区
    $(".city_area_name").hide();                                        //行政区
    $(".Metro_station_triangle").css("transform","rotate(0deg)");       //地铁站
    $(".Metro_station_name").hide();                                    //地铁站
    $(".Station_triangle").css("transform","rotate(0deg)");             //车站
    $(".Station_name").hide();                                          //车站
    $(".Scenic_spot_triangle").css("transform","rotate(0deg)");                  //景点
    $(".Scenic_spot_name").hide();                                      //景点
    Administrative_area_judge = 1;
    Metro_station_judge = 1;
    Station_judge = 1;
    Scenic_spot_judge = 1;

    date_time_hide();
    $(".city_input").parent().find(".city_data").hide();
    $(".city_data").find(".city_name").remove();

    event.stopPropagation();
    if( trading_area_judge === 1 ){
        if( trading_area_judge_one === 1 ){
            $.ajax({
                method:"GET",
                url: url + "v1/city/trad",
                // url: "php/shangquan.js",
                dataType: "json",
                async: true,
                data:{
                    cityName: $(".city_input").val()
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if( data.code == "success"){
                    var area_data = data.data.trad;
                    var str = ""
                    for(i=0;i<area_data.length;i++){
                        str += '<li title="'+ area_data[i] +'">'+ area_data[i] +'</li>'
                    }  
                    $(".trading_area .trading_area_name ul li").remove();
                    $(".trading_area .trading_area_name ul").append( str );
                    trading_area_judge_one = 2;
                    trading_area_data_existence = 1;
                }else{
                    trading_area_data_existence = 2;
                    // alert("该城市暂无"+ html +"数据");
                    $(".modal-body p").html( "该城市暂无"+ html +"数据" );
                    $('#myModal').modal('show');
                    return;
                }
            })
        }
        setTimeout(function(){
            if( trading_area_data_existence === 1){
                $(this).find("img").css("transform","rotate(180deg)");
                $(this).css("color","#5944C3");
                $(".trading_area_name").show();
                trading_area_judge = 2;
            }
        },100)
    }else if( trading_area_judge === 2 ){
        $(this).find("img").css("transform","rotate(0deg)");
        $(this).css("color","#3E3E3E");
        $(".trading_area_name").hide();
        trading_area_judge = 1;
    }
})
$(".trading_area_name").click(function(){      //阻止触发父元素商圈发送请求事件
    event.stopPropagation();
})
$(".trading_area_name").on('click','li',function(){    //阻止触发父元素商圈发送请求事件
    event.stopPropagation();
    $(".hotelKeyword").attr("data-positionType",$(".trading_area .name").html() );
    $(".hotelKeyword").attr("data-position",$(this).html() );
    $(".hotelKeyword").val($(this).html());
    $(".trading_area").css("color","#3E3E3E");
    $(this).parent().parent().hide();
    $(this).parent().parent().parent().find("img").css("transform","rotate(0deg)");
    trading_area_judge = 1 ;
    $(".position .unlimited").removeClass("active");
})

var Metro_station_city_input_val = "" //地铁站判断城市输入框内容是否变化，如果变化就启用发送一请求事件
var Metro_station_data = {} //用来保存地铁站数据
var Metro_station = []  //用来保存地铁线路
var Metro_station_judge = 1; //地铁站开关
var Metro_station_judge_one = 1; //地铁站只请求一次数据
var Metro_station_data_existence = 1;   // 判断请求数据是否存在并且执行相应的方法
$(".Metro_station").click(function(){
    var html = $(this).find(".name").html();

    if( $(".city_input").val().length == 0){
        // alert("请先选择城市");
        $(".modal-body p").html( "请先选择城市" );
        $('#myModal').modal('show');
        return;
    }

    if( Metro_station_city_input_val != $(".city_input").val() ){
        Metro_station_judge_one = 1;
        Metro_station_city_input_val = $(".city_input").val();
    }

    $(".Administrative_area").css("color","#3E3E3E");
    $(".trading_area").css("color","#3E3E3E");
    $(".Station").css("color","#3E3E3E");
    $(".Scenic_spot").css("color","#3E3E3E");
    $(".Administrative_area_triangle").css("transform","rotate(0deg)"); //行政区
    $(".city_area_name").hide();                                        //行政区
    $(".trading_area_triangle").css("transform","rotate(0deg)");        //商圈
    $(".trading_area_name").hide();                                     //商圈
    $(".Station_triangle").css("transform","rotate(0deg)");             //车站
    $(".Station_name").hide();                                          //车站
    $(".Scenic_spot_triangle").css("transform","rotate(0deg)");         //景点
    $(".Scenic_spot_name").hide();                                      //景点
    Administrative_area_judge = 1;
    trading_area_judge = 1;
    Station_judge = 1;
    Scenic_spot_judge = 1;

    date_time_hide();
    $(".city_input").parent().find(".city_data").hide();
    $(".city_data").find(".city_name").remove();

    event.stopPropagation();
    if( Metro_station_judge === 1 ){
        if( Metro_station_judge_one === 1){
            $.ajax({
                method:"GET",
                url : url + "v1/city/subway/station",
                // url : "php/ditie.js",
                dataType: "json",
                async: true,
                data:{
                    cityName: $(".city_input").val()
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                console.log(data);
                if(data.code == "success"){
                    Metro_station.length = 0;
                    Metro_station_data = data.data.subway;
                    jQuery.each(Metro_station_data, function(i, val) {  
                        Metro_station.push( i ) ;   //将地铁线路追加进数组
                    }); 
                    var  Metro_station_str = "";
                    for(i=0;i<Metro_station.length;i++){
                        var Metro_station_i = Metro_station[i];
                        Metro_station_i = Metro_station_i.split("铁");
                        Metro_station_i = Metro_station_i[Metro_station_i.length-1];
                        Metro_station_str += '<li data-id="'+ Metro_station[i] +'">'+ Metro_station_i +'</li>';
                    }
                    var str = ""
                    for(i=0;i<Metro_station_data[Metro_station[0]].length;i++){
                        str += '<li title="'+ Metro_station_data[Metro_station[0]][i] +'"站>'+ Metro_station_data[Metro_station[0]][i] +'站</li>';
                    }
                    $(".Metro_station_name .title li").remove();
                    $(".Metro_station_name .title ul").append( Metro_station_str );
                    $(".Metro_station_name .main ul li").remove();
                    $(".Metro_station_name .main ul").append( str );

                    $(".Metro_station_name .title li")[0].className = "active";
                    Metro_station_judge_one = 2;
                    Metro_station_data_existence =1;
                }else{
                    Metro_station_data_existence = 2;
                    // alert("该城市暂无"+ html +"数据");
                    $(".modal-body p").html( "该城市暂无"+ html +"数据" );
                    $('#myModal').modal('show');
                }
            })
        }
        setTimeout(function(){
            if( Metro_station_data_existence === 1){
                $(this).find("img").css("transform","rotate(180deg)");
                $(this).css("color","#5944C3");
                $(".Metro_station_name").show();
                Metro_station_judge = 2;
            }
        },100)
    }else{
        $(this).css("color","#3E3E3E");
        $(".Metro_station_name").hide();
        $(this).find("img").css("transform","rotate(0deg)");
        Metro_station_judge = 1;
    }
})

$(".Metro_station_name .title ul").on('mouseover','li',function(){
    $(this).parent().children().removeClass("active");
    $(this).addClass("active");
    var this_Metro_station_name = $(this).attr("data-id");
    var this_Metro_station = Metro_station_data[ this_Metro_station_name ];
    var str = ""
    for(i=0;i<this_Metro_station.length;i++){
        str += '<li title="'+ this_Metro_station[i] +'站">'+ this_Metro_station[i] +'站</li>'
    }
    $(".Metro_station_name .main ul li").remove();
    $(".Metro_station_name .main ul").append( str );
})
$(".Metro_station_name").click(function(){      //阻止触发父元素地铁站发送请求事件
    event.stopPropagation();
})
$(".Metro_station_name .main ul").on('click','li',function(){    //阻止触发父元素地铁站发送请求事件
    event.stopPropagation();
    $(".hotelKeyword").attr( "data-positionType",$(".Metro_station .name").html() );
    $(".hotelKeyword").attr( "data-position",$(this).html() );
    $(".hotelKeyword").val( $(this).html() );
    $(".Metro_station").css("color","#3E3E3E");
    $(this).parent().parent().parent().hide();
    $(this).parent().parent().parent().parent().find("img").css("transform","rotate(0deg)");
    $(".position .unlimited").removeClass("active");
    Metro_station_judge = 1;
})

//车站
var Station_city_input_val = "" //车站判断城市输入框内容是否变化，如果变化就启用发送一请求事件
var Station_judge = 1 ; //车站开关
var Station_judge_one = 1;  // 车站数据请求一次开关
var Station_data = "" //保存车站数据
var Station_data_existence = 1;   // 判断请求数据是否存在并且执行相应的方法
$(".Station").click(function(){
    var html = $(this).find(".name").html();

    if( $(".city_input").val().length == 0){
        // alert("请先选择城市");
        $(".modal-body p").html( "请先选择城市" );
        $('#myModal').modal('show');
        return;
    }

    if( Station_city_input_val != $(".city_input").val() ){
        Station_judge_one = 1;
        Station_city_input_val = $(".city_input").val();
    }

    $(".Administrative_area").css("color","#3E3E3E");
    $(".trading_area").css("color","#3E3E3E");
    $(".Metro_station").css("color","#3E3E3E");
    $(".Scenic_spot").css("color","#3E3E3E");
    $(".Administrative_area_triangle").css("transform","rotate(0deg)"); //行政区
    $(".city_area_name").hide();                                        //行政区
    $(".trading_area_triangle").css("transform","rotate(0deg)");        //商圈
    $(".trading_area_name").hide();                                     //商圈
    $(".Metro_station_triangle").css("transform","rotate(0deg)");       //地铁站
    $(".Metro_station_name").hide();                                    //地铁站
    $(".Scenic_spot_triangle").css("transform","rotate(0deg)");                  //景点
    $(".Scenic_spot_name").hide();                                      //景点
    Administrative_area_judge = 1;
    trading_area_judge = 1;
    Metro_station_judge = 1;
    Scenic_spot_judge = 1;

    date_time_hide();
    $(".city_input").parent().find(".city_data").hide();
    $(".city_data").find(".city_name").remove();

    event.stopPropagation();
    if( Station_judge === 1 ){
        if( Station_judge_one === 1 ){
            $.ajax({
                method:"GET",
                url: url + "v1/city/station",
                // url: "php/chezhan.js",
                dataType: "json",
                async: true,
                data:{
                    cityName: $(".city_input").val()
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if(data.code == "success"){
                    $(".Train_station ul li").remove();
                    $(".Bus_station ul li").remove();
                    $(".Aircraft_station ul li").remove();
                    Station_data = data.data.station;
                    //火车站动态添加
                    var Train_station_data = Station_data["火车站"];
                    var Train_station_str = ""
                    if( Train_station_data.length <= 0){    //判断火车站数据是否有
                        Train_station_str = '<li>暂无数据</li>';
                        $(".Train_station ul").append( Train_station_str );
                    }else{
                        for(i=0;i<Train_station_data.length;i++){
                            Train_station_str += '<li title="'+ Train_station_data[i] +'">'+ Train_station_data[i] +'</li>';
                        }
                        $(".Train_station ul").append( Train_station_str );
                    }
                    //汽车站动态添加
                    var Bus_station_data = Station_data["长途汽车站"];
                    var Bus_station_str = ""
                    if( Bus_station_data.length <= 0){    //判断火车站数据是否有
                        Bus_station_str = '<li>暂无数据</li>';
                        $(".Bus_station ul").append( Bus_station_str );
                    }else{
                        for(i=0;i<Bus_station_data.length;i++){
                            Bus_station_str += '<li title="'+ Bus_station_data[i] +'">'+ Bus_station_data[i] +'</li>';
                        }
                        $(".Bus_station ul").append( Bus_station_str );
                    }
                    //飞机场动态添加
                    var Aircraft_station_data = Station_data["飞机场"];
                    var Aircraft_station_str = ""
                    if( Aircraft_station_data.length <= 0){    //判断火车站数据是否有
                        Aircraft_station_str = '<li>暂无数据</li>';
                        $(".Aircraft_station ul").append( Aircraft_station_str );
                    }else{
                        for(i=0;i<Aircraft_station_data.length;i++){
                            Aircraft_station_str += '<li title="'+ Aircraft_station_data[i] +'">'+ Aircraft_station_data[i] +'</li>';
                        }
                        $(".Aircraft_station ul").append( Aircraft_station_str );
                    }
                    Station_judge_one = 2;
                    Station_data_existence = 1;
                }else{
                    Station_data_existence = 2;
                    // alert("该城市暂无"+ html +"数据");
                    $(".modal-body p").html( "该城市暂无"+ html +"数据" );
                    $('#myModal').modal('show');
                }
            })
        } 
        setTimeout(function(){
            if( Station_data_existence ===1 ){
                $(this).find(".Station_triangle").css("transform","rotate(180deg)");
                $(this).css("color","#5944C3");
                $(".Station_name").show();
                Station_judge = 2;
            }
        },100)
    }else if( Station_judge === 2 ){
        $(this).find(".Station_triangle").css("transform","rotate(0deg)");
        $(this).css("color","#3E3E3E");
        $(".Station_name").hide();
        Station_judge = 1;
    }
})
$(".Station_name").click(function(){      //阻止触发父元素车站发送请求事件
    event.stopPropagation();
})
$(".Station_name").on('click','li',function(){    //阻止触发父元素车站发送请求事件
    event.stopPropagation();
    $(".hotelKeyword").attr( "data-positionType",$(".Station .name").html() );
    $(".hotelKeyword").attr( "data-position",$(this).html() );
    $(".hotelKeyword").val( $(this).html() );
    $(".trading_area").css("color","#3E3E3E");
    $(".Station_name").hide();
    $(".Station_triangle").css("transform","rotate(0deg)");
    Station_judge = 1;
    $(".position .unlimited").removeClass("active");
    $(".Station").css("color","#3E3E3E");
})

//景点
var Scenic_spot_city_input_val = "" //景点判断城市输入框内容是否变化，如果变化就启用发送一请求事件
var Scenic_spot_judge = 1; //景点点击开关
var Scenic_spot_judge_one = 1; //景点只请求一次数据开关
var Scenic_spot_data_existence = 1;   // 判断请求数据是否存在并且执行相应的方法
$(".Scenic_spot").click(function(){     //景点点击事件
    
    var html = $(this).find(".name").html();
    if( $(".city_input").val().length == 0){
        // alert("请先选择城市");
        $(".modal-body p").html( "请先选择城市" );
        $('#myModal').modal('show');
        return;
    }

    if( Scenic_spot_city_input_val != $(".city_input").val() ){
        Scenic_spot_judge_one = 1;
        Scenic_spot_city_input_val = $(".city_input").val();
    }

    $(".Administrative_area").css("color","#3E3E3E");
    $(".trading_area").css("color","#3E3E3E");
    $(".Metro_station").css("color","#3E3E3E");
    $(".Station").css("color","#3E3E3E");
    $(".Administrative_area_triangle").css("transform","rotate(0deg)"); //行政区
    $(".city_area_name").hide();                                        //行政区
    $(".trading_area_triangle").css("transform","rotate(0deg)");        //商圈
    $(".trading_area_name").hide();                                     //商圈
    $(".Metro_station_triangle").css("transform","rotate(0deg)");       //地铁站
    $(".Metro_station_name").hide();                                    //地铁站
    $(".Station_triangle").css("transform","rotate(0deg)");             //车站
    $(".Station_name").hide();                                          //车站
    Administrative_area_judge = 1;
    trading_area_judge = 1;
    Metro_station_judge = 1;
    Station_judge = 1;

    date_time_hide();
    $(".city_input").parent().find(".city_data").hide();
    $(".city_data").find(".city_name").remove();

    event.stopPropagation();
    if( Scenic_spot_judge === 1){
        if( Scenic_spot_judge_one === 1){
            $.ajax({
                method:"GET",
                url: url + "v1/city/view/spot",
                // url: "php/jingdian.js",
                dataType: "json",
                async: true,
                data:{
                    cityName: $(".city_input").val()
                },
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function(data){
                if( data.code == "success"){
                    var Scenic_spot_data = data.data.viewSpot;
                    var str = ""
                    for(i=0;i<Scenic_spot_data.length;i++){
                        str += '<li title="'+ Scenic_spot_data[i] +'">'+ Scenic_spot_data[i] +'</li>'
                    }  
                    $(".Scenic_spot .Scenic_spot_name ul li").remove();
                    $(".Scenic_spot .Scenic_spot_name ul").append( str );
                    Scenic_spot_judge_one = 2;
                    Scenic_spot_data_existence = 1;
                }else{
                    Scenic_spot_data_existence = 2;
                    // alert("该城市暂无"+ html +"数据");
                    $(".modal-body p").html( "该城市暂无"+ html +"数据" );
                    $('#myModal').modal('show');
                }
            })
        }
        setTimeout(function(){
            if( Scenic_spot_data_existence === 1){
                $(this).find("img").css("transform","rotate(180deg)");
                $(".Scenic_spot_name").show();
                $(this).css("color","#5944C3");
                Scenic_spot_judge = 2;
            }
        },100)
    }else if( Scenic_spot_judge === 2 ){
        $(this).find("img").css("transform","rotate(0deg)");
        $(".Scenic_spot_name").hide();
        $(this).css("color","#3E3E3E");
        Scenic_spot_judge = 1 ;
    }
    
})

$(".Scenic_spot_name").click(function(){      //阻止触发父元素景点被禁止事件
    event.stopPropagation();
})
$(".Scenic_spot_name").on('click','li',function(){    //阻止触发父元素景点发送请求事件
    event.stopPropagation();
    $(".hotelKeyword").attr("data-positionType",$(".Scenic_spot .name").html() );
    $(".hotelKeyword").attr("data-position",$(this).html() );
    $(".hotelKeyword").val($(this).html() );
    $(this).parent().parent().hide();
    $(".Scenic_spot").css("color","#3E3E3E");
    $(this).parent().parent().parent().find("img").css("transform","rotate(0deg)");
    Scenic_spot_judge = 1 ;
    $(".position .unlimited").removeClass("active");
})


$(".hotelKeyword").keyup(function(){
    if( $(this).val().length == 0 ){
        $(".position .unlimited").addClass("active");
        $(this).attr("data-positionType","");
        $(this).attr("data-position","");
    }
    if( $(this).val().length != 0 ){
        $(".position .unlimited").removeClass("active");
    }
})

// icon_checkbox_choose.png
// images/icon_checkbox.png
//价格
var data_i =   "" //判断是否点击的是当前的价格
$(".price ul li").click(function(){
    if( data_i != $(this).attr("data-price")){

        $(".hotelKeyword").attr("data-price",$(this).attr("data-price"));

        var li_img = $(".price ul li img");
        for( i=0;i<li_img.length;i++ ){
            var img_src = $(li_img[i]).attr("src");
            img_src = img_src.split("/");
            img_src = img_src[img_src.length-2]+"/icon_checkbox.png";
            $(li_img[i]).attr("src" , img_src);
            $(li_img[i]).attr("data-src" , "icon_checkbox_choose.png");
        }
        var src = $(this).find("img").attr("src");
        src = src.split("/");
        src1 = src[src.length-2]+ "/" +$(this).find("img").attr("data-src"); 
        $(this).find("img").attr("data-src",src[src.length-1]);
        $(this).find("img").attr("src",src1);

        $(".price .unlimited").removeClass("active");
        $(".Custom_price input").val("");
        $(".Custom_price button").css("background","#959595");
        $(".Custom_price button").css("opacity",.5);
        $(".Custom_price button").attr("disabled",true);
        data_i = $(this).attr("data-price");
    }else if( data_i == $(this).attr("data-price") ){
        $(".hotelKeyword").attr("data-price","");

        var src = $(this).find("img").attr("src");
        src = src.split("/");
        src1 = src[src.length-2]+ "/" +$(this).find("img").attr("data-src"); 
        $(this).find("img").attr("data-src",src[src.length-1]);
        $(this).find("img").attr("src",src1);

        data_i ="";
        $(".Custom_price input").val("");
        $(".price .unlimited").addClass("active");

        
    }
})

$(".price .unlimited").click(function(){
    data_i =   "";
    $(".hotelKeyword").attr("data-price","");
    $(this).addClass("active");
    $(".Custom_price input").val("");

    var li_img = $(".price ul li img");
    for( i=0;i<li_img.length;i++ ){
        var img_src = $(li_img[i]).attr("src");
        img_src = img_src.split("/");
        img_src = img_src[img_src.length-2]+"/icon_checkbox.png";
        $(li_img[i]).attr("src" , img_src);
        $(li_img[i]).attr("data-src" , "icon_checkbox_choose.png");
    } 

    $(".Custom_price button").css("background","#959595");
    $(".Custom_price button").css("opacity",.5);
    $(".Custom_price button").attr("disabled",true);
})

$(".Custom_price input").keyup(function(){
    if( $(".Custom_price input.lower_limit").val().length != 0 || $(".Custom_price input.Upper_limit").val().length != 0 ){
        data_i =   "";
        var li_img = $(".price ul li img");
        for( i=0;i<li_img.length;i++ ){
            var img_src = $(li_img[i]).attr("src");
            img_src = img_src.split("/");
            img_src = img_src[img_src.length-2]+"/icon_checkbox.png";
            $(li_img[i]).attr("src" , img_src);
            $(li_img[i]).attr("data-src" , "icon_checkbox_choose.png");
        } 
        $(".price .unlimited").removeClass("active");

        $(".Custom_price button").css("background","#959595");
        $(".Custom_price button").css("opacity",.5);
        $(".Custom_price button").attr("disabled",true);
    }
    if( $(".Custom_price input.lower_limit").val().length != 0 && $(".Custom_price input.Upper_limit").val().length != 0 ){
        $(".Custom_price button").css("background","#5944C3");
        $(".Custom_price button").css("opacity",1);
        $(".Custom_price button").attr("disabled",false);
    }
})
$(".Custom_price button").click(function(){
    if( $(".Custom_price input.Upper_limit").val() <= $(".Custom_price input.lower_limit").val() ){
        // alert("价格上限不能小于或等于价格下限");
        $(".modal-body p").html( "价格上限不能小于或等于价格下限" );
        $('#myModal').modal('show');
        return;
    }
    if( $(".Custom_price input.Upper_limit").val() > $(".Custom_price input.lower_limit").val() ){
        var price = $(".Custom_price input.lower_limit").val() + "," + $(".Custom_price input.Upper_limit").val()
        $(".hotelKeyword").attr("data-price",price);
    }
})


//星级
var star_i =   "" //判断是否点击的是当前的星级
$(".star ul li").click(function(){
    if( star_i != $(this).attr("data-star")){

        // $(".hotelKeyword").attr("data-star_i",$(this).attr("data-price"));

        var li_img = $(".star ul li img");
        for( i=0;i<li_img.length;i++ ){
            var img_src = $(li_img[i]).attr("src");
            img_src = img_src.split("/");
            img_src = img_src[img_src.length-2]+"/icon_checkbox.png";
            $(li_img[i]).attr("src" , img_src);
            $(li_img[i]).attr("data-src" , "icon_checkbox_choose.png");
        }
        var src = $(this).find("img").attr("src");
        src = src.split("/");
        src1 = src[src.length-2]+ "/" +$(this).find("img").attr("data-src"); 
        $(this).find("img").attr("data-src",src[src.length-1]);
        $(this).find("img").attr("src",src1);

        $(".star .unlimited").removeClass("active");
        star_i = $(this).attr("data-star");
    }else if( star_i == $(this).attr("data-star") ){
        $(".hotelKeyword").attr("data-starLevel","");
        $(".hotelKeyword").attr("data-specialLevel","");

        var src = $(this).find("img").attr("src");
        src = src.split("/");
        src1 = src[src.length-2]+ "/" +$(this).find("img").attr("data-src"); 
        $(this).find("img").attr("data-src",src[src.length-1]);
        $(this).find("img").attr("src",src1);

        star_i ="";
        $(".Custom_price input").val("");
        $(".star .unlimited").addClass("active");

        
    }
})
//星级点击事件
$(".star .starLevel").click(function(){
    if( star_i != $(this).attr("data-star") ){
        $(".hotelKeyword").attr("data-starLevel","");
        $(".hotelKeyword").attr("data-specialLevel","");
    }else if( star_i == $(this).attr("data-star") ){
        $(".hotelKeyword").attr("data-starLevel",$(this).attr("data-star"));
        $(".hotelKeyword").attr("data-specialLevel","");
    }
})
//品牌连锁点击事件
$(".star .specialLevel").click(function(){
    if( star_i != $(this).attr("data-star") ){
        $(".hotelKeyword").attr("data-starLevel","");
        $(".hotelKeyword").attr("data-specialLevel","");
    }else if( star_i == $(this).attr("data-star") ){
        $(".hotelKeyword").attr("data-starLevel","");
        $(".hotelKeyword").attr("data-specialLevel",$(this).attr("data-star"));
    }
})
// 星级不限点击事件
$(".star .unlimited").click(function(){
    star_i =   "";
    $(".hotelKeyword").attr("data-starLevel","");
    $(".hotelKeyword").attr("data-specialLevel","");
    $(this).addClass("active");

    var li_img = $(".star ul li img");
    for( i=0;i<li_img.length;i++ ){
        var img_src = $(li_img[i]).attr("src");
        img_src = img_src.split("/");
        img_src = img_src[img_src.length-2]+"/icon_checkbox.png";
        $(li_img[i]).attr("src" , img_src);
        $(li_img[i]).attr("data-src" , "icon_checkbox_choose.png");
    } 
})

//品牌
var brand_i = 1; //判断传参是否存在当前brand 
var brand_a = ""; //判断当前酒店是否被选取
$(".brand ul li").click(function(){
        if( brand_a.indexOf( $(this).attr("data-brand") ) == -1 ){

            var src = $(this).find("img").attr("src");
            src = src.split("/");
            src1 = src[src.length-2]+ "/" +$(this).find("img").attr("data-src"); 
            $(this).find("img").attr("data-src",src[src.length-1]);
            $(this).find("img").attr("src",src1);

            var brand = [];
            if( $(".hotelKeyword").attr("data-brand") == undefined){
                brand = [];
            }else if( $(".hotelKeyword").attr("data-brand")  == "" ){
                brand = [];
            }else{
                var brand_all = $(".hotelKeyword").attr("data-brand");
                brand_all = brand_all.split(",");
                brand .push( brand_all );
            }
            if( brand.length == 0){
                brand.push( $(this).attr("data-brand") ) ;
            }
            if( brand.length > 0 ){
                for( i=0 ; i<brand.length;i++){
                    if(  brand[i].indexOf( $(this).attr("data-brand") ) >= 0){
                        brand_i = 2;
                    }
                }
            }
            if( brand_i === 1 ){
                brand.push( $(this).attr("data-brand") ) ;
            }
            brand_i = 1;
            $(".hotelKeyword").attr("data-brand",brand);
            brand_a += $(this).attr("data-brand");
        }else if( brand_a.indexOf( $(this).attr("data-brand") ) >= 0 ){
            var src = $(this).find("img").attr("src");
            src = src.split("/");
            src1 = src[src.length-2]+ "/" +$(this).find("img").attr("data-src"); 
            $(this).find("img").attr("data-src",src[src.length-1]);
            $(this).find("img").attr("src",src1);

            var brand_all = $(".hotelKeyword").attr("data-brand");
            var cancel_i = ""; //用来删除取消的酒店
            brand_all = brand_all.split(",");
            var x  =  $(this).attr( "data-brand");
            for( i=0 ; i<brand_all.length;i++){
                if( x  == brand_all[i] ){ 
                    cancel_i = i;
                } 
            }
            brand_all.splice( cancel_i , 1 );
            $(".hotelKeyword").attr("data-brand",brand_all);
            var str = brand_a;
            var reg = new RegExp( $(this).attr("data-brand") );
            brand_a = str.replace(reg,"");
        }  
        if( brand_a != ""){
            $(".brand .unlimited").removeClass( "active" );
        } else {
            $(".brand .unlimited").addClass( "active" );
        }
})
//酒店不限点击事件
$(".brand .unlimited").click(function(){
    brand_a =   "";
    $(".hotelKeyword").attr("data-brand","");
    $(this).addClass("active");

    var li_img = $(".brand ul li img");
    for( i=0;i<li_img.length;i++ ){
        var img_src = $(li_img[i]).attr("src");
        img_src = img_src.split("/");
        img_src = img_src[img_src.length-2]+"/icon_checkbox.png";
        $(li_img[i]).attr("src" , img_src);
        $(li_img[i]).attr("data-src" , "icon_checkbox_choose.png");
    } 
})
//酒店更多点击事件
$(".brand .More").click(function(){
    // alert("暂无数据");
    $(".modal-body p").html( "正在上线中" );
    $('#myModal').modal('show');
})

var count = ""  //用来记录酒店数量
function Jump_execution(page){// 首页跳转过来执行方法
    
    if( localStorage.cityName != undefined ){
        var hotelKeyword = "";
        var checkTime = "";
        if( localStorage.hotelKeyword != undefined){
            hotelKeyword = localStorage.hotelKeyword;
        } 
        if( localStorage.checkTime != undefined){
            checkTime = localStorage.checkTime;
        } 
        $.ajax({
            method:"GET",
            url: url + "v1/hotel/list",
            // url: "php/jiudian.js",
            dataType: "json",
            data:{
                cityName: localStorage.cityName,
                limit: 5,
                page: page,
                checkTime: checkTime,
                hotelKeyword: hotelKeyword
            },
            async: true,
            xhrFields: {
                withCredentials: true
            }
        })
        .done(function(data){
            console.log(data);
            if( data.code == "success"){
                count = data.data.count;
                var str = "";
                var Hotel_data = data.data.hotelList;

                
                var star_level = "";    //保存星级图标个数
                var star_level_str = "";//保存星级图标
                for(i=0;i<Hotel_data.length;i++){
                    star_level = Hotel_data[i].star_level;
                    for(a=0; a<star_level; a++){
                        star_level_str += '<li><img src="images/icon_star.png" alt=""></li>';
                    }
                    str += `
                    <div class="Hotel">
                        <img src="`+ url_img+Hotel_data[i].picture[0] +`" alt="" class="Hotel_img">
                        <div class="Hotel_right">
                            <div class="Hotel_right_left">
                                <div class="title" title="`+ Hotel_data[i].name +`">`+ Hotel_data[i].name +`
                                </div>
                                <div class="score">
                                    <ul>`+ star_level_str +`
                                    </ul>
                                </div>
                                <div class="clear"></div>
                                <div class="address">
                                    `+ Hotel_data[i].address +`
                                    <span href="">-地图</span>
                                </div>
                            </div>
                            <div class="Hotel_right_middle">
                                <div class="Hotel_score">
                                    <span>`+ Hotel_data[i].overall_rating +`</span>/5分
                                </div>
                                <div class="evaluate_number">
                                    <span>`+ Hotel_data[i].comment_num +`</span>
                                    次点评
                                </div>
                            </div>
                            <div class="Hotel_right_right">
                                <div class="price">
                                    <span>¥`+ Hotel_data[i].price +`</span>
                                    起
                                </div>
                                <a href="hotel_details.html?`+ Hotel_data[i]._id +`">查看详情</a>
                            </div>
                        </div>
                    </div>
                    `
                    star_level_str = "";
                }
                
                
                
                    const map = new BMap.Map("container") // 创建一个地图实例，其参数可以是元素id也可以是元素对象
                    map.centerAndZoom(new BMap.Point(Hotel_data[0].location.lng , Hotel_data[0].location.lat ), 13) // 初始化地图，设置中心点坐标和地图级别
                    map.enableScrollWheelZoom(true) // 启用滚轮放大缩小，默认禁用
                    map.addControl(new BMap.ScaleControl()) // 添加控件，比例尺控件
                    map.addControl(new BMap.NavigationControl({
                    type: BMAP_NAVIGATION_CONTROL_ZOOM
                    })) // 添加控件，平移缩放控件，type值表示只显示控件的缩放部分功能
                    const hotelDataArry = [
                        {
                            name: Hotel_data[0].name ,
                            location: new BMap.Point( Hotel_data[0].location.lng , Hotel_data[0].location.lat )
                        },
                        {
                            name: Hotel_data[1].name ,
                            location: new BMap.Point( Hotel_data[1].location.lng , Hotel_data[1].location.lat )
                        },
                        {
                            name: Hotel_data[2].name ,
                            location: new BMap.Point( Hotel_data[2].location.lng , Hotel_data[2].location.lat )
                        },
                        {
                            name: Hotel_data[3].name ,
                            location: new BMap.Point( Hotel_data[3].location.lng , Hotel_data[3].location.lat )
                        },
                        {
                            name: Hotel_data[4].name ,
                            location: new BMap.Point( Hotel_data[4].location.lng , Hotel_data[4].location.lat )
                        }
                    ]
                    hotelDataArry.forEach(el => {
                    const marker = new BMap.Marker(el.location) // 创建标注点
                    map.addOverlay(marker) // 向地图添加标注点
                    marker.setLabel(new BMap.Label(el.name, {
                        offset: new BMap.Size(20)
                    })) // 向标注点添加标注文本
                    })
                
                
                $(".Hotel_information").append(str);
            }else{
                $(".modal-body p").html( "暂无酒店信息" );
                $('#myModal').modal('show');
            }
        })
    }
}
page_btn = 2;
//判断正在窗口到达加载中位置执行事件
function Jump_execution_scroll(){
    page = 2;
    
    return function(){
        Request_city_data_judge_two = 2;
        if( Jump_execution_scroll_judge === 1 ){
            if( $(document).scrollTop() + $(window).height() >= $(".loading").offset().top ){
                setTimeout(function(){
                    if( $(".Hotel_information .Hotel").length >= count ){
                        $(".loading").html("没有酒店信息了")
                        return;
                    }
                    Jump_execution( page++ ); 
                },300)   
            } 
        } 
        if( Jump_execution_scroll_judge === 2 ){
            if( $(document).scrollTop() + $(window).height() >= $(".loading").offset().top ){
                setTimeout(function(){
                    if( $(".Hotel_information .Hotel").length >= count ){
                        $(".loading").html("没有酒店信息了");
                        return;
                    }
                    Request_city_data(page_btn++,overallRating,price,distance);
                },300)   
            } 
        }
    }
}
var Jump_execution_scroll_judge = 1; //判断跳转过来页面是否滑动开关

var overallRating ="";
var price = "";
var distance = "";
// 搜索按钮点击事件
$("#search_btn").click(function(){
    if( $(".city_input").val().length == 0 ){
        // alert("请先选择城市");
        $(".modal-body p").html( "请先选择城市" );
        $('#myModal').modal('show');
    }else{
        page_btn = 2;
        Request_city_data_judge = 1;
        overallRating ="";
        price = "";
        distance = "";
        $(".Hotel_sorting li").removeClass("active");
        $(".Hotel_sorting li").find("img").remove();
        Request_city_data(1,overallRating,price,distance);
    }
})

/**
 * @param  {} page              第几页
 * @param  {} overallRating     评分，[1, -1]，正序1，倒序-1
 * @param  {} price             价格，[1, -1]
 * @param  {} distance          距离，[1]
 */
var Request_city_data_judge = 1; //判断加载酒店信息是否删除;
var Request_city_data_judge_two = 2; //判断加载酒店信息是否删除2;
function  Request_city_data( page , overallRating , price , distance){  //搜索发送请求事件
    
    var cityName = $(".city_input").val();      //城市名
    var checkTime = ""      //预订时间段，入住时间戳和离店时间戳，用英文逗号拼成字符串
    if( $(".time_input").attr( "data-time" ) != undefined ){
        checkTime = $(".time_input").attr( "data-time" );
    }
    var hotelKeyword = $(".hotelKeyword").val();    //酒店关键字/名称/位置
    var positionType = "";  //位置类型，['行政区', '商圈', '地铁站', '车站', '景点']
    var position = "";   //位置名称
    if( $(".hotelKeyword").attr("data-positionType") != undefined &&  $(".hotelKeyword").attr("data-position") != undefined ){
        positionType = $(".hotelKeyword").attr("data-positionType");
        position = $(".hotelKeyword").attr("data-position");
    }
    var priceRange = "";    //价格区间，下限价格和上限价格，用英文逗号拼成字符串
    if( $(".hotelKeyword").attr("data-price") != undefined ){
            priceRange = $(".hotelKeyword").attr("data-price");
    }
    var starLevel = "" //星级，[5, 4, 3, 2]
    if( $(".hotelKeyword").attr("data-starlevel") != undefined ){
        starLevel = $(".hotelKeyword").attr("data-starlevel");
    }
    var specialLevel = ""   //['经济连锁', '客栈公寓']
    if( $(".hotelKeyword").attr("data-speciallevel") != undefined ){
        specialLevel = $(".hotelKeyword").attr("data-speciallevel");
    }
    var brand = ""      //品牌，多选时品牌用英文逗号拼成字符串
    if( $(".hotelKeyword").attr("data-brand") != undefined ){
        brand = $(".hotelKeyword").attr("data-brand");
    }
    $.ajax({
        method:"GET",
        url: url + "v1/hotel/list",
        dataType: "json",
        data:{
            cityName: cityName, //城市名
            limit: 5,   //每页多少条信息
            page: page,     //第几页（必须大于0）
            checkTime: checkTime,   //预订时间段，入住时间戳和离店时间戳，用英文逗号拼成字符串
            hotelKeyword: hotelKeyword, //酒店关键字/名称/位置
            positionType:   positionType,   //位置类型，['行政区', '商圈', '地铁站', '车站', '景点']
            position:   position,   //位置名称
            priceRange: priceRange, //价格区间，下限价格和上限价格，用英文逗号拼成字符串
            starLevel: starLevel,   //星级，[5, 4, 3, 2]
            specialLevel:   specialLevel,   //['经济连锁', '客栈公寓']
            brand:  brand,  //品牌，多选时品牌用英文逗号拼成字符串
            overallRating: overallRating,   //评分，[1, -1]，正序1，倒序-1
            price:  price,   //价格，[1, -1]
            distance: distance  //距离，[1]
        },
        async: true,
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log( data );
        if( data.code == "success" ){
            Request_city_data_judge_two = 1;
            $(".loading").html('<img src="images/loading.gif" alt="">');
            count = data.data.count;
            Jump_execution_scroll_judge = 2;
            var str = "";
            var Hotel_data = data.data.hotelList;

            
            var star_level = "";    //保存星级图标个数
            var star_level_str = "";//保存星级图标
            for(i=0;i<Hotel_data.length;i++){
                star_level = Hotel_data[i].star_level;
                for(a=0; a<star_level; a++){
                    star_level_str += '<li><img src="images/icon_star.png" alt=""></li>';
                }
                str += `
                <div class="Hotel">
                    <img src="`+ url_img+Hotel_data[i].picture[0] +`" alt="" class="Hotel_img">
                    <div class="Hotel_right">
                        <div class="Hotel_right_left">
                            <div class="title" title="`+ Hotel_data[i].name +`">`+ Hotel_data[i].name +`
                            </div>
                            <div class="score">
                                <ul>`+ star_level_str +`
                                </ul>
                            </div>
                            <div class="clear"></div>
                            <div class="address">
                                `+ Hotel_data[i].address +`
                                <span href="">-地图</span>
                            </div>
                        </div>
                        <div class="Hotel_right_middle">
                            <div class="Hotel_score">
                                <span>`+ Hotel_data[i].overall_rating +`</span>/5分
                            </div>
                            <div class="evaluate_number">
                                <span>`+ Hotel_data[i].comment_num +`</span>
                                次点评
                            </div>
                        </div>
                        <div class="Hotel_right_right">
                            <div class="price">
                                <span>¥`+ Hotel_data[i].price +`</span>
                                起
                            </div>
                            <a href="hotel_details.html?`+ Hotel_data[i]._id +`">查看详情</a>
                        </div>
                    </div>
                </div>
                `
                star_level_str = "";
            }
                // $("#container").html("");
                const map = new BMap.Map("container") // 创建一个地图实例，其参数可以是元素id也可以是元素对象
                map.centerAndZoom(new BMap.Point(Hotel_data[0].location.lng, Hotel_data[0].location.lat ), 13) // 初始化地图，设置中心点坐标和地图级别
                map.enableScrollWheelZoom(true) // 启用滚轮放大缩小，默认禁用
                map.addControl(new BMap.ScaleControl()) // 添加控件，比例尺控件
                map.addControl(new BMap.NavigationControl({
                type: BMAP_NAVIGATION_CONTROL_ZOOM
                })) // 添加控件，平移缩放控件，type值表示只显示控件的缩放部分功能
                const hotelDataArry = [
                    {
                        name: Hotel_data[0].name ,
                        location: new BMap.Point( Hotel_data[0].location.lng , Hotel_data[0].location.lat )
                    },
                    {
                        name: Hotel_data[1].name ,
                        location: new BMap.Point( Hotel_data[1].location.lng , Hotel_data[1].location.lat )
                    },
                    {
                        name: Hotel_data[2].name ,
                        location: new BMap.Point( Hotel_data[2].location.lng , Hotel_data[2].location.lat )
                    },
                    {
                        name: Hotel_data[3].name ,
                        location: new BMap.Point( Hotel_data[3].location.lng , Hotel_data[3].location.lat )
                    },
                    {
                        name: Hotel_data[4].name ,
                        location: new BMap.Point( Hotel_data[4].location.lng , Hotel_data[4].location.lat )
                    },
                ]
                hotelDataArry.forEach(el => {
                const marker = new BMap.Marker(el.location) // 创建标注点
                map.addOverlay(marker) // 向地图添加标注点
                marker.setLabel(new BMap.Label(el.name, {
                    offset: new BMap.Size(20)
                })) // 向标注点添加标注文本
                })
                
            if( Request_city_data_judge ===  1 && Request_city_data_judge_two === 1){
                $(".Hotel_information .Hotel").remove();
            } 
            $(".Hotel_information").append(str);
            Request_city_data_judge_two = 2;
            Request_city_data_judge = 2;
        }else{
            $(".hotelKeyword").val("");
            $(".hotelKeyword").attr("data-positiontype","");
            $(".hotelKeyword").attr("data-position","");
            
            $(".Hotel_information .Hotel").remove();
            $(".Hotel_information").append('<div class="Hotel"><div class="error"><img src="images/abc.png">暂无酒店数据</div></div>');
            // alert("该设置地区暂无酒店数据");
            $(".modal-body p").html( "该选择范围暂无酒店数据" );
            $('#myModal').modal('show');
            $(".loading").html("");
            Jump_execution_scroll_judge = 3;
        }
    })
}






//排序
(function distance_click(){
    
    //评价点击切换事件
    var evaluate_judge = 1; //评论点击开关
    $(".Hotel_sorting .evaluate").click(function(){
        page_btn = 2;
        console.log("评价")
        distance_judge = 1  //距离点击发送请求开关
        price_judge = 1; //价格点击开关 
        $(".Hotel_sorting .price").find('img').remove();
        $(".Hotel_sorting .distance").find('img').remove();
        $(".Hotel_sorting .price").removeClass("active");
        $(".Hotel_sorting .distance").removeClass("active");
        price = "";
        distance = "";
        $(this).addClass("active");
        if( evaluate_judge === 1 ){
            $(this).find("img").remove();
            $(this).append('<img src="images/icon_arrow_down1_white.png" alt="">');
            overallRating = -1;
            Request_city_data_judge = 1;
            Request_city_data(1,overallRating,price,distance);
            evaluate_judge = 2;
            return;
        } 
        if( evaluate_judge === 2 ){
            $(this).find("img").remove();
            $(this).append('<img src="images/icon_arrow_up1_white.png" alt="">');
            overallRating = 1;
            Request_city_data_judge = 1;
            Request_city_data(1,overallRating,price,distance);
            evaluate_judge = 1;
        } 
    });
    //价格点击切换事件
    var price_judge = 1; //价格点击开关  
    $(".Hotel_sorting .price").click(function(){
        page_btn = 2;
        console.log("价格")
        distance_judge = 1  //距离点击发送请求开关
        evaluate_judge = 1; //评论点击开关
        $(".Hotel_sorting .evaluate").find('img').remove();
        $(".Hotel_sorting .distance").find('img').remove();
        $(".Hotel_sorting .evaluate").removeClass("active");
        $(".Hotel_sorting .distance").removeClass("active");
        overallRating = "";
        distance = "";
        $(this).addClass("active");
        if( price_judge === 1 ){
            $(this).find("img").remove();
            $(this).append('<img src="images/icon_arrow_down1_white.png" alt="">');
            price = -1;
            Request_city_data_judge = 1;
            Request_city_data(1,overallRating,price,distance);
            price_judge = 2;
            return;
        } 
        if( price_judge === 2 ){
            $(this).find("img").remove();
            $(this).append('<img src="images/icon_arrow_up1_white.png" alt="">');
            price = 1;
            Request_city_data_judge = 1;
            Request_city_data(1,overallRating,price,distance);
            price_judge = 1;
        } 
    });
    //距离点击切换事件
    var distance_judge = 1; //距离点击开关
    $(".Hotel_sorting .distance").click(function(){
        page_btn = 2;
        console.log("距离")
        evaluate_judge = 1; //评论点击开关
        price_judge = 1; //价格点击开关 
        $(".Hotel_sorting .evaluate").find('img').remove();
        $(".Hotel_sorting .price").find('img').remove();
        $(".Hotel_sorting .evaluate").removeClass("active");
        $(".Hotel_sorting .price").removeClass("active");
        overallRating = "";
        price = "";
        $(this).addClass("active");
        $(this).find("img").remove();
        $(this).append('<img src="images/icon_arrow_down1_white.png" alt="">');
        distance = 1;
        if( distance_judge === 1 ){
            Request_city_data_judge = 1;
            Request_city_data(1,overallRating,price,distance);
            distance_judge = 2;
        }
    });
})();
$(document).ready(function(){
    search_input_assignment();
    Jump_execution(1);
    window.addEventListener('scroll',_.throttle(Jump_execution_scroll(),1000));
})

var top_scroll = $("#container").offset().top;
$(document).scroll(function(){
    if( $(document).scrollTop() >= top_scroll  ){
        $("#container").css("position", "fixed" );
        $("#container").css("top", "40px" );
    }
    if( $(document).scrollTop() < top_scroll ){
        $("#container").css("position", "relative" );
        $("#container").css("top", 0 );
    }
})