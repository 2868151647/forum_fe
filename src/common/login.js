$(document).ready(function(){

    $(".button_left_next").click(function(){
    $(".login_left_info").css("background-color","rgba(0,0,0,0)");
    $(".login_left").animate({
        height:"400px",
        top:"-50px"
    });
    $(".login_left_info input").fadeIn(1000).css("display","block");
    $(".exit1").css("display","block");
    $(".button_left").css('display','block');
    $(".button_left_next").css('display','none');
    //  console.log($("#username").val());
    //  console.log($(".pwd").val());
    
})
    $(".exit1").click(function(){
    // $(".login_left_info").css("background-color","rgba(238,135,204,0.2)");
    $(".login_left").animate({
        height:"280px",
        top:0
    });
    $(".login_left_info input").css("display","none");
    $(".exit1").css("display","none");
    $(".button_left").attr("type","button");
    $(".button_left").css('display','none');
    $(".button_left_next").css('display','block');
    
})

//right
$('.getcode').css('display','none')
$(".button_right_next").click(function(){
    $(".login_right_info").css("background-color","rgba(0,0,0,0)");
    $(".login_right").animate({
        height:"480px",
        top:"-50px"
    });
    $(".login_right_info input").fadeIn(1000).css("display","block");
    $(".exit2").css("display","block");
    $(".sign_up").css("marginTop","-50px");
    $('.button_right_next').css('display','none')
    $('.getcode').css('display','block')
    $('.button_right').css('display','block')
})
    $(".exit2").click(function(){
    // $(".login_right_info").css("background-color","rgba(238,135,204,0.2)");
    $(".login_right").animate({
        height:"280px",
        top:0
    });
    $(".login_right_info input").css("display","none");
    $(".exit2").css("display","none");
    $(".sign_up").css("marginTop",0)
    $('.button_right_next').css('display','block')
    $('.getcode').css('display','none')
    $('.button_right').css('display','none')
   
})
})   