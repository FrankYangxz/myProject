

//单选
$('.toto li').click(function(){
	var index = $(this).index();
	$(this).find("input").attr("checked", true);
	$(this).siblings().find("input").attr("checked", false);
});

////选择联动     懵逼啊。哈哈哈哈  加入试卷
var yy= Number( $(".choce_All").val() ) + 1;
//点击一次有效
$('.join').one("click",function(){
	var m = yy++;
	$(".choce_All").html(m);
})

$(".lookJieXi").click(function(){
	var s = $(this).data('value');
	$("#yang_"+ s).toggle();
	$("#OImg"+ s).toggleClass("xuanzhuan");
});















