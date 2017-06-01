//单选
$('.oTi li').click(function(){
	var index = $(this).index();
	$(this).find("input").attr("checked", true);
	$(this).siblings().find("input").attr("checked", false);
});


//加入试卷
$(".add_shijuan_dan").on("click",function(){
	var num = Number( $(this).parents().siblings().find("figure").html() );
	$('.oDanXuan a').eq( num-2 ).addClass('on');
})
//$(".add_shijuan_duo").on("click",function(){
//	var num = Number( $(this).parents().siblings().find("figure").html() );
////	console.log( num-1);
//	$('.oDuoXuan a').eq( num-1 ).addClass('on');
//})

//从试卷中去掉
$('.oDanXuan a').click(function(){
	$(this).removeClass('on');
})
$('.oDuoXuan a').click(function(){
	$(this).removeClass('on');
})

//打开详情页
$('.look_jiexi_dan01').on("click",function(event){
	$('.look_jiexi_dan_content01').toggle();
})
$('.look_jiexi_dan02').on("click",function(event){
	$('.look_jiexi_dan_content02').toggle();
})
$('.look_jiexi_dan03').on("click",function(event){
	$('.look_jiexi_dan_content03').toggle();
})

$('.look_jiexi_duo01').on("click",function(event){
	var num = Number( $(this).parents().siblings().find("figure").html() );
	$('.look_jiexi_duo_content01').toggle();
})
