$(".oSub").on("click",function(){
	$(".mengceng").css("display","block");
	$(".tianjia").css("display","block");
})
$(".tianjia p").eq(2).on("click",function(){
	$(".mengceng").css("display","none");
	$(".tianjia").css("display","none");
	window.location.href="index.html";
})

