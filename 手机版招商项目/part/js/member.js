$("#oFoot").load("foot.html");
	$(".ques").on("click",function(){
		$(this).css({
			"background":"url(part/img/jiao_06.png) no-repeat left center",
			"background-size":"0.2rem 0.2rem"
		});
		$(this).siblings().slideToggle();
	});
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
	
	var col = 0; // 控制员工详情
	var ti = 0 ; // 控制是否查看过员工详情
	//点击查看员工详情
	$(".moreInformation").on("click",function(){
		if ( col == 1 ){
			$(".nashEmpolerInfo").slideToggle();
			return ti = 1; //此时才可以提交推荐信息
		}
	})
	$("#nashEmployerId").change(function(){
		var  oId = $(this).val();
		var oData = {employeeNumber:oId};
		OAJAX ( "r=acount/getInfoByEmployeeNumber" , oData , oSuccessCallBackId , oErrorCallBackId );
	})
	function oSuccessCallBackId ( data ){
		if ( data.code == 0  ) {
			var oName = data.data.nickname;
			var OTel = data.data.tel;
			$(".nashEmpolerName span").text(oName);
			$(".nashEmpolerEmail span").text(OTel);
			$(".moreInformation").css("background","#EF4351");
			return col = 1 ;
		} else if ( data.code == 10001 ){
			alert("账户不存在");
		} else {
			alert("响应失败")
		}
	}
	function oErrorCallBackId (){ }
	
	$(".tuijian").on("click",function(){
		if ( ti == 0  ) {
			alert("请查看详细信息")
		} else if ( ti == 1 ){
			var  oCity = $("#oList input").val();
			var customName = $("#customName").val();
			var customTel = $("#customTel").val();
			var employeeNumber = $("#nashEmployerId").val();
			if ( oCity == "" ) {
				alert("请选择城市");
				return false;
			} else if ( customName == "" ) {
				alert("请输入客户姓名");
				return false;
			}else if ( customTel == "" ) {
				alert("请输入客户电话");
				return false;
			}else if ( employeeNumber == "" ) {
				alert("请输入员工编号");
				return false;
			}
			var oData = {cityName:oCity,customName:customName,customTel:customTel,type:2,employeeNumber:employeeNumber};
			OAJAX ( "r=reference/create" , oData , oSuccessCallBack , oErrorCallBack );
		}
		
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



















































