$("#oFoot").load("foot.html");
//点击展示问题的答案
$(".ques").on("click",function(){
	$(this).css({
		"background":"url(part/img/jiao_06.png) no-repeat left center",
		"background-size":"0.2rem 0.2rem"
	});
	$(this).siblings().slideToggle();
});
//点击显示更多问题
var s=0;
$(".lookMore").on("click",function(){
	$(".moreQuestion").slideToggle();
	if ( s == 0 ) {
		$(this).find("span").html("收起更多");
		$(this).find("img").attr("src","part/img/xia_03.png");
		return s = 1;
	} else if ( s == 1 ) {
		$(this).find("span").html("展开更多");
		$(this).find("img").attr("src","part/img/more_03.png");
		return s = 0;
	}
})
//渲染城市
var oData;
getAjax( "r=city/getList", oData , getSuccess , getDefault )
function getSuccess( data ){
	var data = data.data.list;
	for ( var i = 0 ; i < data.length; i ++ ) {
		$(".cityName").append("<li>" + data[i] + "</li>");
	}
}
function getDefault(){ }
$(".tuijian").on("click",function(){
	var  oCity = $("#oList input").val();
	var customName = $("#customName").val();
	var customTel = $("#customTel").val();
	var referTel = $("#referTel").val();
	var referName = $("#referName").val();
	var referEmail = $("#referEmail").val();
	if ( oCity == "" ) {
		alert("请选择城市");
		return false;
	} else if ( customName == "" ) {
		alert("请输入客户姓名");
		return false;
	}else if ( customTel == "" ) {
		alert("请输入客户电话");
		return false;
	}else if ( referName == "" ) {
		alert("请输入推荐人姓名");
		return false;
	}else if ( referTel == "" ) {
		alert("请输入推荐人电话");
		return false;
	}
	var oData = {cityName:oCity,customName:customName,customTel:customTel,type:1,referenceName:referName,referenceTel:referTel,referenceEmail:referEmail};
	OAJAX ( "r=reference/create" , oData , oSuccessCallBack , oErrorCallBack );
})
function oSuccessCallBack( data ){
	console.log(data)
	if ( data.code == 0 ) {
//		alert("推荐成功！")
		$(".oZheZhao").show();
		$(".oTuisuccess").show();
	}
}
function oErrorCallBack(){ }
$(".oFanhui").on("click",function(){
	$(".oZheZhao").hide();
	$(".oTuisuccess").hide();
})






























