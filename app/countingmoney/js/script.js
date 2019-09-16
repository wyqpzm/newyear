
    $(function () {
        var music=document.getElementById('music');
        var money =  $("body");
        var money_en =  $(".money_en");
        var i= 0,y=30;
        var off =true;
        money_en.on("touchstart", function(e) {

            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
            startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
        });
        money_en.on("touchend", function(e) {
            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
            moveEndX = e.originalEvent.changedTouches[0].pageX,
                moveEndY = e.originalEvent.changedTouches[0].pageY,
                X = moveEndX - startX,
                Y = moveEndY - startY;
            if ( Y < 0 ) {
                $('.ri').show();
                music.play();
                if(off){
                    var time= setInterval(function () {
                        $(".money_time span").html(y);
                        if(y<=0){
                            count = $(".money_add span").html();
                            clearInterval(time);
                            $(".money_en").remove();
                            $(".ri").hide();
                            $.post('/submitGame',{
                                number: number,
                                score: count
                            },function(res){
                                window.location.href="/detail";
                            })
                            
                        }
                        y--;
                    },1000);
                }
                off =false;
                $(".money_en,.money_pos").addClass('add');
                $(".money_two").show();
                $(".money_one").hide();

                setTimeout(function () {
                    music.play();
                },10);
                music.playbackRate = 4;
                music.defaultPlaybackRate = 4;
                money_en.find('img').animate({
                    "top":"-1000"
                },400, function () {
                    $(this).remove();
                    i+=100;
                    $(".money_add span").html(i)
                });
                setTimeout(function () {
                    money_en.append('<img src="countingmoney/images/4.jpg">');
                },100)
            }
        });
        document.addEventListener("WeixinJSBridgeReady", function () {
            music.load();
        }, false);
        $('#game-start').click(function(){
            console.log($('#phone').val());
            if(!$('#phone').val()){
                alert("请填写手机号")
            }else{
                $('#modal button').prop("disabled", true).html('开始……')
                number = $('#phone').val();
                $.get('/getGameConfig',function(res){
                    console.log(res);
                    $('#modal button').prop("disabled", false).html('开始')
                    if(res.data.start){
                        $('#modal').remove()
                    }else{
                        alert('游戏还未开始')
                    }
                })
            }
        })


    });

