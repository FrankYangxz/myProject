///////////商机列表
//tap切换 全部，更新提星，带创建商机
$('.oAll').click(function(){
	$(this).addClass("oColor").siblings().removeClass("oColor");
})
$('.oTiXing').click(function(){
	$(this).addClass("oColor").siblings().removeClass("oColor");
})
$('.oChuang').click(function(){
	$(this).addClass("oColor").siblings().removeClass("oColor");
})
//废弃原因提交
$('._Feiqi').click(function(){
	$('.oZheFeiQi').show();
	$('.oReason').show();
})
$('.oZheFeiQi').click(function(){
	$('.oZheFeiQi').hide();
	$('.oReason').hide();
	$('.oTXSuccess').hide();
})