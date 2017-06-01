//头部
var s=0,m=0,t=0;
//点击顶部按钮
$(".oMUne").on('click',function(){
	if( t == 0 ){
		$(this).find("img").attr("src","part/img/kai_03.jpg");
		$(".topList").stop().animate({"opacity":"1"},50);
		$(".topList").slideToggle(500);
		return t = 1;
	}else if ( t == 1 ){
		$(this).find("img").attr("src","part/img/shou_03.jpg");
		$(".topList").stop().animate({"opacity":"0.8"},50);
		$(".topList").slideToggle(500);
		return t = 0;
	}
})
//点击找办公室
$(".oLookOffice").click(function(){
	if( m == 0 ){
		$(this).find("img").attr("src","part/img/xia.png");
		$(".oCity").slideToggle(500);
		return m = 1;
	}else if ( m == 1 ){
		$(this).find("img").attr("src","part/img/shang.png");
		$(".oCity").slideToggle(500);
		return m = 0;
	}
})
//点击产品类型
$(".productType").click(function(){
	if( s == 0 ){
		$(this).find("img").attr("src","part/img/xia.png");
		$(".productTypeCon").slideToggle(500);
		return s = 1;
	}else if ( s == 1 ){
		$(this).find("img").attr("src","part/img/shang.png");
		$(".productTypeCon").slideToggle(500);
		return s = 0;
	}
})
//底部
var x=0,y=0,z=0;
//点击快速入口
$(".oLookOfficefooter").click(function(){
	if( x == 0 ){
		$(this).find("img").attr("src","part/img/xia.png");
		$(".oCityfooter").slideToggle(500);
		return x = 1;
	}else if ( x == 1 ){
		$(this).find("img").attr("src","part/img/shang.png");
		$(".oCityfooter").slideToggle(500);
		return x = 0;
	}
})
//点击那是支持
$(".productTypefooter").click(function(){
	if( y == 0 ){
		$(this).find("img").attr("src","part/img/xia.png");
		$(".productTypeConfooter").slideToggle(200);
		return y = 1;
	}else if ( y == 1 ){
		$(this).find("img").attr("src","part/img/shang.png");
		$(".productTypeConfooter").slideToggle(200);
		return y = 0;
	}
})
//点击关于我们
$(".aboutUs").click(function(){
	if( z == 0 ){
		$(this).find("img").attr("src","part/img/xia.png");
		$(".aboutUsCon").slideToggle(500);
		return z = 1;
	} else if ( z == 1 ){
		$(this).find("img").attr("src","part/img/shang.png");
		$(".aboutUsCon").slideToggle(500);
		return z = 0;
	}
})
