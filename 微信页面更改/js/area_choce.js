//。。。。。。。。。。。点击类型
var mun = 0;
$('.list .type01').click(function(){
	if ( mun == 0) {
		$('.area').css('height','91.8512vw');
		$('.area_top').css('display',"block").siblings('.area_bottom').css('display',"block");
		$('.list_second_type').css('display','block').siblings().css('display','none');
		$('#obig').css('display','none');
		$('.list .type02').find('img').attr({'src':'img/WechatIMG1.png'});
		$('.list .type01').find('img').attr({'src':'img/We.png'});   
		$('body').css("overflow", "hidden");
		$('.area').show();
		return mun = 1;
	} else if ( mun == 1 ) {
		$('.list .type01').find('img').attr({'src':'img/WechatIMG1.png'});
		$('.area').hide();
		$('body').css("overflow", "auto");
		$('#obig').css('display','block');
		return mun = 0;
	}
})

//、、、、、、、、、、、点击区域
var sss = 0;
$('.list .type02').click(function(){
	if ( mun == 0) {
		$('.area').css('height','91.8512vw');
		$('.quyu').css('display','block');
		$('.area_top').css('display',"block").siblings('.area_bottom').css('display',"block");
		$('.list_second_area').css('display','block').siblings('.list_second_type').css('display','none');
		$('.list_second_area .left').css('width','47vw');
		$('.list_second_area .center').css({'width':'46.8vw','border':'none'});
		$('.list_second_area_left li').eq(0).addClass('color');
		$('.list_second_area_center li').eq(0).addClass('color');
		$('#obig').css('display','none');
		$('.list .type01').find('img').attr({'src':'img/WechatIMG1.png'});
		$('.list .type02').find('img').attr({'src':'img/We.png'});
		
		$('body').css("overflow", "hidden");
		$('.area').show();
		
		return mun = 1;
	} else if (mun == 1) {
		$('.area').hide();
		$('.list .type02').find('img').attr({'src':'img/WechatIMG1.png'});
		$('body').css("overflow", "auto");
		$('#obig').css('display','block');
		return mun = 0;
	}
})


$('.list_second_area_center li').on('click',function(){
	$('.area_top').css('display',"block").siblings('.area_bottom').css('display',"block");
	$('.list_second_area .left').css('width','30.23333333vw').siblings(".quyu").css({
		'width':'66vw',
		"float":"left"
	});
	$('.list_second_area .center').css({
		'border-right':'1px solid #e8e8e8',
		'width':'30vw'
	});
	$('.right').css({
		'display':'block',
		'width':'30vw',
		'float':'right'
	});
	$(this).addClass('color').siblings().removeClass('color')
	
	var index = $(this).index();
	console.log(index);
	$('.list_second_area_center_detail').eq(index).css('display','block').siblings().css('display','none');

})

//''''''''''''地铁
$('.list_second_area_left li').eq(1).on('click',function(){
	$(this).addClass('color').siblings().removeClass('color');
	$('.quyu').css('display','none');
	$('.ditie').css('display','block');
})
//l;;;;;;;;;;;区域
$('.list_second_area_left li').eq(0).on('click',function(){
	$(this).addClass('color').siblings().removeClass('color');
	$('.quyu').css('display','block');
	$('.ditie').css('display','none');
})

//'''''''''''ditie'
$('.ditie .list_second_area_center li').on('click',function(){
	var index= $(this).index();
	$('.ditie .right .list_second_area_center_detail').eq(index).css('display','block').siblings().css('display','none')
	
})

$('.area_bottom').on('click',function(){
	$('body').css("overflow", "auto");
	$('.area_top').css('display',"none").siblings('.area_bottom').css('display',"none");
	$('#obig').css('display','block');
	$('.area').css('height','0');
	$('.list li').find('img').attr({'src':'img/WechatIMG1.png'});
})


