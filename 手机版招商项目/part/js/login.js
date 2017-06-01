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
//验证码登录和密码登录切换
$(".codeLogin").on("click",function(){
	$(".oErrorTel").hide();
	$(".yanLoginFor").show();
	$(".passLoginFor").hide();
	$(this).addClass("oColor").siblings().removeClass("oColor");
	$(".passwordLoginCon").hide();
	$(".codeLoginCon").show();
})
$(".passwordLogin").on("click",function(){
	$(".oErrorTel").hide();
	$(".passLoginFor").css("display","block");
	$(".yanLoginFor").hide();
	$(this).addClass("oColor").siblings().removeClass("oColor");
	$(".codeLoginCon").hide();
	$(".passwordLoginCon").show();
})

//验证码切换倒计时
function tap (){
	$(".getCode").hide();
	$(".daoTime").show();
	var time = 60;
	setTime=setInterval(function(){
        if(time<=0){
            clearInterval(setTime);
            $('.daoTime').hide();
            $('.getCode').show();
             $('.daoTime i').text(60);
            return;
        }
        time--;
        $('.daoTime i').text( time);
    },1000);	
}		


$("#referTel").blur(function(){
	var oVal = $("#referTel").val();
	if( !(/^1[34578]\d{9}$/.test(oVal) ) ){ 
		$('#referTel').val('');
		$(".oErrorTel").show();
		return false;
   }
})
$("#referTelFor").blur(function(){
	var oVal = $("#referTelFor").val();
	if( !(/^1[34578]\d{9}$/.test(oVal) ) ){ 
		$('#referTelFor').val('');
		$(".oErrorTel").show();
		return false;
   }
})
$("#referTelFor").focus(function(){
	$(".oErrorTel").hide();
})
$("#referTel").focus(function(){
	$(".oErrorTel").hide();
})
//获取验证码
$(".getCode").on("click",function(){
	var loginTel = $("#referTel").val();
	if ( loginTel == "" ) {
		alert("请输入账号");
		return false;
	}
	var oData = {tel:loginTel,type:1};
	OAJAX( "r=code/apply" , oData , getYanZehMaSuccess , getYanZehMaDefault );
})
function getYanZehMaSuccess(data){
	if ( data.code == 0 ) {
		tap();
	}else if (data.code == "10000"){
		alert("账户被禁用，请联系管理员")
	}else if (data.code == "10001"){
		alert("账户不存在")
	}else if (data.code == "10002"){
		alert("登录密码错误")
	}else if (data.code == "10003"){
		alert("验证码信息过期")
	}else if (data.code == "10004"){
		alert("验证码信息不存在")
	}else if (data.code == "10005"){
		alert("无效的验证码信息")
	}else if (data.code == "10006"){
		alert("登录超时")
	}
}
function getYanZehMaDefault(){}

//验证码登录
$(".yanLoginFor").on("click",function(){
	var oTel = $("#referTel").val();
	var oCode = $("#codeYan").val();
	if ( oTel == "" ) {
		alert("请输入账号");
		return false;
	}
	if ( oCode == "" ) {
		alert("请输入验证码");
		return false;
	}
	var oData={tel:oTel,type:2,code:oCode};
	OAJAX( "r=acount/login" , oData , oSuccessCallBack , oErrorCallBack );
	
})
//密码登录
$(".passLoginFor").on("click",function(){
	var oTel = $("#referTelFor").val();
	var oPwd = $("#customTel").val();
	if ( oTel == "" ) {
		alert("请输入账号");
		return false;
	}
	if ( oPwd == "" ) {
		$('.oShuRuPwd').show();
		return false;
	} else if ( oTel == "" ) {
		$('.oErrTel').show();
		return false;
	}
	var oData={tel:oTel,type:1,passpord:oPwd};
	OAJAX( "r=acount/login" , oData , oSuccessCallBack, oErrorCallBack );
})
//验证码数据相应成功
function oSuccessCallBack (Data){
	var data = Data;
	//判断该账号是否存在 0== 存在  
	if ( data.code == "0" ) {
		var oType = data.data.acount.type;
		sessionStorage.setItem( "acountType" , oType );
		//判断该账号是1-客户  2-推荐人   3-客服
		if ( oType == 1 || oType == 2 ){
			//判断该账号是1-客户 2-推荐人
			//客户信息是否完善
			if ( data.data.acount.hadPayInfo == 0 ) {
				//客户信息不完整
				console.log(111)
				setCustomCookiePart(data);
//				window.location.href = "sjLIstLogin.html";						
			}else {
				//客户信息完善
				console.log(222)
				setCustomCooki(data);
//				window.location.href = "homelist.html";   //详情列表有银行开信心，员工	
			}
		} else if (oType == 3){
			//判断该账号3-客服
			console.log(333)
			setCustomCookiePart(data);
//			window.location.href = "sjLIst.html";    //客服
		}
	}else if (data.code == "10000"){
		alert("账户被禁用，请联系管理员")
	}else if (data.code == "10001"){
		//账户不存在
		$('.oZheZhao').show();
		$(".oTuiSuccess").show();
	}else if (data.code == "10002"){
		alert("登录密码错误")
	}else if (data.code == "10003"){
		alert("验证码信息过期")
	}else if (data.code == "10004"){
		alert("验证码信息不存在")
	}else if (data.code == "10005"){
		alert("无效的验证码信息")
	}else if (data.code == "10006"){
		alert("登录超时")
	}
}
function oErrorCallBack(){
	//账号不存在的话提示去首页注册
	alert("数据响应失败!")
}
//存贮客户的所有信息
function setCustomCooki(data){
	setCustomCookiePart( data );
	sessionStorage.setItem("totalMoney", data.data.acount.totalMoney );
	sessionStorage.setItem("bankName", data.data.payInfo.bankName );
	sessionStorage.setItem("bankNo", data.data.payInfo.bankNo );
	sessionStorage.setItem("bankAcountNo", data.data.payInfo.bankAcountNo );
}
//存贮客户的基础信息
function setCustomCookiePart(data){
	var name = data.data.acount.name;
	var tel = data.data.acount.tel;
	var email = data.data.acount.email;
	var currentUserTel = data.data.acount.currentUserTel;
	var employeeNumber = data.data.acount.employeeNumber;
	sessionStorage.setItem("name", name );
	sessionStorage.setItem("tel", tel );
	sessionStorage.setItem("email", email );
	sessionStorage.setItem("currentUserTel", currentUserTel );
	sessionStorage.setItem("employeeNumber", employeeNumber );
}
//客户登录失败
function customDefaultLogin(){
	alert("账号不存在或密码错误!");
}





























