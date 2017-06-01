//意见反馈
$(".oSubYiJian").click(function(){
	var oYiJian = $(".oYiJianInfo textarea").val();
	var oId = $("#oProblemId").val();
	if ( oYiJian == "" || oId == "" ){
		alert("请完善数据再提交");
		return false;
	}else{
		var oData = {orderCode:oId,description:oYiJian};
		OAJAX( "r=feedback/create" , oData , oFanKuiSuccessGG , oFanKuiDefaultGG )
		console.log(oData)
	}
});
function oFanKuiSuccessGG(data){
	console.log(data)
	if (data.code == 0) {
		$('.oZheFeiQi').hide();
		$('.oYiJianFanKui').hide();
		$(".oYiJianInfo textarea").val("");
		$("#oProblemId").val("");
	}
}
function oFanKuiDefaultGG(){	 }
//创建新推荐
var oDatas;
var oCityCustom;
getAjax( "r=city/getList" , oDatas , getSuccess , getDefault );
function getSuccess (data){
	var data = data.data.list;
	for ( var i = 0 ; i < data.length; i++  ) {
		$("#oCity").append("<option value="+data[i]+">"+data[i]+"</option>");
	}
	$('#oCity').comboSelect();
	$(".combo-dropdown li").click(function(){
		oCityCustom = $(this).data("value");
	})
}
function getDefault (){
	console.log(11)
}
$('.oTelCus').blur(function(){
	var oKeHuTel = $('.oTelCus').val();
	if( !(/^1[34578]\d{9}$/.test(oKeHuTel) ) ){ 
		$('.oTelCus').val('');
		alert("手机号码格式错误！")
    }
})
$("#subNewInfo").click(function(){
	console.log(11)
	var oselect = $("#oCity").val();
	var oCusN = $(".oNameCus").val(); 
	var oCusTel = $(".oTelCus").val();
	var referenceName = sessionStorage.name;
	var referenceTel = sessionStorage.currentUserTel;
	var referenceEmail = sessionStorage.email;
	if ( oselect == "" || oCusN == "" || oCusTel == "" ) {
		alert("请完善数据！");
		return false;
	}else{
		var oData = {cityName:oselect,customName:oCusN,customTel:oCusTel,referenceName:referenceName,referenceTel:referenceTel,referenceEmail:referenceEmail};
		console.log( oData );
		OAJAX( "r=reference/create" , oData , oFanKuiSuccessWW , oFanKuiDefaultWW );
	}
});
function oFanKuiSuccessWW(data){
	$(".oTuiJianfo").hide();
	$('.oZheFeiQi').hide();
	$("#oCity").val("");
	$(".oNameCus").val("");
	$(".oTelCus").val("");
	location.reload();
}
function oFanKuiDefaultWW( ){}
//重置密码
$(".oResetPassWord").click(function(){
	$('.oZheFeiQi').show();
	$('.oPassword').show();
})
//点击重置密码
$('.oGetMa').click(function(){
	var oTel = $("#oTel").val();
	if ( oTel == "" ) {
		alert("请输入手机号码");
		return false;
	} else if( !(/^1[34578]\d{9}$/.test( oTel ) ) ){
		alert("手机号码格式不正确");
		return false;
	}else{
		$(this).hide();
		$('.oDaojiShi').show();
		var time = 60;
		setTime=setInterval(function(){
	        if(time<=0){
	            clearInterval(setTime);
	            $('.oDaojiShi').hide();
	            $('.oGetMa').show();
	            $('.oDaojiShi i').text(60);
	            return;
	        }
	        time--;
	        $('.oDaojiShi i').text( time);
	    },1000);
	    var oData = {tel:oTel,type:2}
	    OAJAX( "r=code/apply" , oData , oFanKuiSuccessDD ,oFanKuiDefaultDD )
	}
})
function oFanKuiSuccessDD(){}
function oFanKuiDefaultDD(){
	alert("请重新申请验证码");
}
//提交密码
$('.oQueRen').click(function(){
	var oTel = $("#oTel").val();
	var oYanZheng = $("#oYanZheng").val();
	var oNewPwd = $('#oNewPwd').val();
	var oNewPwdSecond = $('#oNewPwdSecond').val();
	if ( oNewPwd != oNewPwdSecond) {
		alert("密码不一致！")
		return false;
	}else{
		var oDataS = {tel:oTel,code:oYanZheng,password:oNewPwd};
		OAJAX( "r=acount/reset" , oDataS , oFanKuiSuccess ,oFanKuiDefault );
	}
})
function oFanKuiSuccess(data){
		if ( data.code == 0 ) {
			$('.oZheFeiQi').hide();
			$('.oPassword').hide();
			$("#oTel").val("");
			$("#oYanZheng").val("");
			$('#oNewPwd').val("");
			$('#oNewPwdSecond').val("");
		} 
}
function oFanKuiDefault (){
	console.log("失败")
}
$('.oZheFeiQi').click(function(){
	$('.oZheFeiQi').hide();
	$('.oShouKuan').hide();
	$('.oJingGao').hide();
	$('.oSubSuccess').hide();
	$(".oPassword").hide();
	$(".oTuiJianfo").hide();
	$(".oYiJianFanKui").hide();
})
//意见反馈
$('.oYiJian').click(function(){
	$('.oZheFeiQi').show();
	$('.oYiJianFanKui').show();
})
//推荐新人
$('.oCreat').click(function(){
	$('.oZheFeiQi').show();
	$('.oTuiJianfo').show();
})

//补充信息
$('.oMoneyInfo').click(function(){
	$('.oZheFeiQi').show();
	$('.oShouKuan').show();
})

//退出登录
$(".oExit").click(function(){
	var odatas;
	OAJAX ( "r=acount/logout" , odatas , logoutSuccesss , logoutFalse )
	function logoutSuccesss( data ){
		if (data.code == 0){
			console.log("退出成功！")
			sessionStorage.clear();
			location.href="index.html";
		}
	}
	function logoutFalse(){}
});



