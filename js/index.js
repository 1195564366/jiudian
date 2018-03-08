
function city_request(){    //封装请求城市数据
    $.ajax({
        method: "GET",
        // url: url+"v1/city/list",
        url: "php/city.js",
        dataType: "json",
        async: true,
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        if(data.code == "success"){
            city_name_all = data.data; //保存所有城市数据到定义的容器中
            console.log( city_name_all );
            triangle_position( city_name_all.hot ); //控制中间部分热门城市导航栏和三角的位置
        }
    })
}
$("#search_btn").click(function(){
    if( $(".city_input").val().length == 0){
        // alert("请先选择城市");
        $(".modal-body p").html( "请先选择城市" );
        $('#myModal').modal('show');
        
        return;
    }else{
        var checkTime = "";
        if( $(".time_input").attr("data-time") != undefined && $(".time_input").attr("data-time") != ""){
            checkTime = $(".time_input").attr("data-time");
        }
        var hotelKeyword = "";
        if( $(".hotelKeyword").val().length != 0 ){
            hotelKeyword = $(".hotelKeyword").val();
        }
        $.ajax({
            method:"GET",
            url: url+"v1/hotel/list",
            dataType: "json",
            async: true,
            data:{
                cityName:$(".city_input").val(),
                limit:1,
                page:1,
                checkTime:checkTime,
                hotelKeyword: hotelKeyword
            },
            xhrFields: {
                withCredentials: true
            }
            })
            .done(function(data){
                console.log( data );
                if( data.code == "success"){
                    localStorage.cityName = $(".city_input").val();
                    localStorage.checkTime = $(".time_input").attr("data-time");
                    localStorage.hotelKeyword = $(".hotelKeyword").val();
                    localStorage.time = $(".time_input").val();
                    window.location.href = "hotel_screening.html";
                }else{
                    // alert("该城市暂无酒店信息");
                    $(".modal-body p").html( "该城市暂无酒店信息" );
                    $('#myModal').modal('show');
                }
            }) 
    }
})
/**
 * @param  {} data 城市名称数组
 */
function triangle_position(data){       //控制中间部分热门城市导航栏和三角的位置
    var hot_str = "";
    for( i=0 ; i<data.length; i++){
        hot_str += '<li>'+ data[i].cityName +'<div class="triangle"></div></li>'
    }
    $(".hot_hotel .hot_hotel_title .name").append( hot_str );
    $(".hot_hotel .hot_hotel_title .name li .triangle").css("left","2px");
    var triangle_all = $(".hot_hotel .hot_hotel_title .name li .triangle");
    for( i=0;i<triangle_all.length;i++){
        var left = ( $( triangle_all[i] ).parent().width() - 14 ) / 2;
        $( triangle_all[i] ).css("left",left);
    }
    $(".hot_hotel .hot_hotel_title .name li")[0].className = "active";
    var city_name_all = $(".hot_hotel .hot_hotel_title .name li");
    city_name_all = $( city_name_all[0] ).html().split("<");
    city_name_all = city_name_all[0];
    hot_city_data_request( city_name_all );
}
/**
 * @param  {} data 城市名称
 */
function hot_city_data_request( data ){    //请求热门城市数据并追加到页面上
    $.ajax({
        method: "GET",
        url:url+"v1/hotel/list",
        dataType: "json",
        async: true,
        data:{
            cityName:data,
            limit: 8,
            page:1,
        },
        xhrFields: {
            withCredentials: true
        }
    })
    .done(function(data){
        console.log(data);
        if(data.code == "success"){
            var city_data = data.data.hotelList;
            var str = "";
            for( i=0;i<city_data.length;i++ ){
                var style = ""
                if( city_data[i].price < 300){
                    style = "高档型"
                }else if( city_data[i].price>=300 ){
                    style = "豪华型"
                } 
                str += `
                    <li>
                        <a href="hotel_details.html?`+ city_data[i]._id +`">
                            <img src="`+  url_img+city_data[i].picture[0] +`" alt="">
                            <div class="mask">
                                <div class="name">
                                    <span class="hotel_name" title="`+ city_data[i].name +`">`+ city_data[i].name +`</span>
                                    <span class="style">`+ style +`</span>
                                </div>
                                <div class="price">
                                    ¥`+ city_data[i].price +`
                                </div>
                            </div>
                        </a>
                    </li>
                `
            }
            $(".hot_hotel .hot_hotel_main .error").remove();
            $(".hot_hotel .hot_hotel_main ul li").remove();
            $(".hot_hotel .hot_hotel_main ul").append(str);
            return;
        }
        if(data.code == "hotel_not_found"){
            $(".hot_hotel .hot_hotel_main .error").remove();
            $(".hot_hotel .hot_hotel_main ul li").remove();
            $(".hot_hotel .hot_hotel_main").append('<div class="error"><img src="images/abc.png">暂无酒店数据</div>');
        }
    })
}
$(".hot_hotel .hot_hotel_title .name").on('click','li',function(){ //中间热门城市控制数据切换和三角位置切换
    $(".hot_hotel .hot_hotel_title .name li").removeClass("active");
    $(this).addClass("active");
    var city_name = $(this).html();
    city_name = city_name.split("<");
    city_name = city_name[0];
    hot_city_data_request( city_name );
})
$(".time_input").click(function(){
    $(".city_input").parent().find(".city_data").hide();
    $(".city_data").find(".city_name").remove();
})
$(".city_input").click(function(){
   date_time_hide();
})









