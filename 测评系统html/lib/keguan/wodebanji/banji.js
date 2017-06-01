//鼠标划过时改变样式
$(".r_body .class dd a").mousemove(function(){
	$(this).addClass("on").siblings().removeClass("on");
})
$(".r_body .class dd a").mouseleave(function(){
	$(this).removeClass("on");
})
//删除节点
$(".r_body .class dd a").click(function(){
	$(this).remove();
})
//删除学校
$('.del').click(function(){
	var s = $(this).data('value');
	if ( $(".del_" + s + " dd a").length == 0 ) {
		$(".del_"+ s).remove();
		$('.xian_' + s).remove();
	} 
})
//蒙层展示与消失，天加班机
$('.tjbj').click(function(){
	var val = $(this).data('value');
	var xuexiaoInfo = $(".zhongxue_" + val).html();
	console.log(xuexiaoInfo);//、、、、、、、、、、、、、、、、、、、、、、、、、、、拿到学校的信息
	
	//蒙层展示
	$(".mengceng").css("display",'block');
	$(".tianjia").css("display",'block');
	//添加班级
	$("#sub").on("click",function(){
		$(".mengceng").css("display",'none');
		$(".tianjia").css("display",'none');
	})
	//mengceng消失
	$(".close").on("click",function(){
		$(".mengceng").css("display",'none');
		$(".tianjia").css("display",'none');
	})
})

//添加学校
$(".tjxx").click(function(){
	$(".mengceng").css("display",'block');
	$(".tianjia_xx").css("display",'block');
	$("#sub").on("click",function(){
		$(".mengceng").css("display",'none');
		$(".tianjia_xx").css("display",'none');
	})
	//mengceng消失
	$(".close").on("click",function(){
		$(".mengceng").css("display",'none');
		$(".tianjia_xx").css("display",'none');
	})
	
})
















