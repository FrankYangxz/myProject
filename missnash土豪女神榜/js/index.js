var screenHei = $(window).height();
//								console.log(screenHei);值为屏幕的高度
var listHei = $(".list").height();
//								console.log(listHei);值为ul的高度
var oLi = $('.list li').length;
var h = $('.list li').eq(oLi-1).outerHeight();
if (screenHei < listHei) {
	preHight += h;
	console.log(preHight );
	$('html body').animate({scrollTop:preHight + 'px'},500);
} 		