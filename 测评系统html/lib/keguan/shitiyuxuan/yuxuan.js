//二级联动
$('.one h2').click(function(){
	
	$('.zhishi_two').hide();
	$('.two h2').removeClass("on");
	$('.zhishi_one').show();
	
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$('.zhishi_one #select_label').eq(index).css({"display":"block"}).siblings().css({"display":"none"});
})
$('.two h2').click(function(){
	
	$('.zhishi_one').hide();
	$('.one h2').removeClass("on");
	$('.zhishi_two').show();
	
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	$('.zhishi_two #select_label').eq(index).css({"display":"block"}).siblings().css({"display":"none"});
})
//难度加减
var num = 0;
$('.jiayi').click(function(){
	console.log(num);
	num ++;
	if(num >= 3 ){
		num = 3;
	}
	$('.Val001').val(num);
})
$('.jianyi').click(function(){
	num --;
	if(num <= 0 ){
		num = 0;
	}
	$('.Val001').val(num);
})
//单选
$('.toto li').click(function(){
	var index = $(this).index();
	$(this).find("input").attr("checked", true);
	$(this).siblings().find("input").attr("checked", false);
});



////选择联动     懵逼啊。哈哈哈哈  加入试卷
$('.join').click(function(){
		var m = $(this).data('value');
		$("#yang_"+m).attr('class', 'on');
})

$(".lookJieXi").click(function(){
	var s = $(this).data('value');
	$("#yang_"+ s).toggle();
	$("#OImg"+ s).toggleClass("xuanzhuan");
});


$(".oDan a").click(function(){
	$(this).removeClass("on");	
})














