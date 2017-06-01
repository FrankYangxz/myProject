var t=0;
$("#oList input").on("click",function(){
	document.activeElement.blur();   //禁止键盘弹出
//	$(".cityName").slideToggle();
	$(this).siblings(".cityName").slideToggle();
	if ( t == 0 ) {
		$(this).siblings(".oListImg").attr("src","part/img/jiao_04.png");
		return t=1;
	} else if ( t == 1) {
		$(this).siblings(".oListImg").attr("src","part/img/jiao_03.png");
		return t=0;
	}
	
})
//静态时用
$(".cityName li").on("click",function(){
	var oVal = $(this).text();
	$("#oList input").val( oVal );
//	$(".cityName").slideToggle();
	$(this).parent().slideToggle();
	$(".oListImg").attr("src","part/img/jiao_03.png");
	return t=0;
});
//动态添加元素时使用
$(".cityName").on("click","li", function() {
     var oVal = $(this).text();
	$("#oList input").val( oVal );
//	$(".cityName").slideToggle();
	$(this).parent().slideToggle();
	$(".oListImg").attr("src","part/img/jiao_03.png");
	return t=0;
   });