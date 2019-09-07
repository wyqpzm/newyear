$(function () {
    //排行榜
    var fuck =  $(".fuck_info");
    var title = $(".title li");
    pub_hide(".close",".fuck");//关闭fuck
    pub_shwo(".gz",".fuck",title,0);
    title.click(function () {
        fuck.hide();
        title.removeClass("active");
        var _this = $(this);
        _this.addClass("active");
        fuck.eq(_this.index()).show();
    });
    pub_shwo(".phbs",".fuck",title,1);
    pub_shwo(".ph",".fuck",title,1);
    //微信诱导分享
    pub_shwo(".share",".wx_fx");//分享显示
    pub_hide(".wx_fx",".wx_fx");//关闭诱导分享
    function pub_hide(one,two,there){
        $(one).click(function () {
            $(two).fadeOut();
            $(there).hide()
        })
    }
    function pub_shwo(one,two,there,fore){
        $(one).click(function () {
            $(two).fadeIn();
            $(there).eq(fore).click();
        })
    }

    //排行榜
    $(".phbs").click(function(){
        $.getJSON("http://*********/rank_list",function(res){
            if(res.errorcode==0){

                $(".fuck").fadeIn();
                title.eq(1).click();
                $("#rank_list").html("");
                for(var i=0;i<res.data.length;i++){
                    $("#rank_list").append("<ul><li class='num'>No:"+(i+1)+"</li><li class='img'><img src="+res.data[i].image_url+"></li><li class='name'>"+res.data[i].member_name+"</li><li class='data'>"+res.data[i].score+"秒</li> </ul>");
                }
                for(var ii=0;ii<=4;ii++){
                    $('#rank_list ul').eq(ii).find("li").css({color:"#ffd91d"});
                }

            }
        })
    })
    //我的奖品
    $(".my_jp").click(function(){
        $.getJSON("http://***********",function(res){
            console.info(res);
            if(res.errorcode==0){
                $(".fuck").fadeIn()
                title.eq(2).click();
                $(".blods").show();
                $("#list").html("");
                $("#list").append("<ul><li class='num'>"+res.data.prize+"</li><li class='name'>"+res.data.name+"</li><li class='data'>"+res.data.datatime+"</li> </ul>");
            }else{
                $(".dq").show();
                $("#list").hide()
                $(".blods").hide();
            }
        })
    })
})