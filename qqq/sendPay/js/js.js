$('#sendPay').on('click',function(){
	$('.mask').addClass('hide').siblings('.maskCon').addClass('hide');
});
$('.close').on('click',function(){
	$('.mask').removeClass('hide').siblings('.maskCon').removeClass('hide');
});
//60秒倒计时获取验证码
	var countdown=60; 
	function settime(val) { 
		if (countdown < 0) { 
			val.removeAttribute("disabled");    
			val.value="重新获取"; 
			countdown = 60; 
		} else { 
			if(val.value!="重新获取"){
				val.setAttribute("disabled", true); 
				val.value="重新发送(" + countdown + ")"; 
				countdown--; 
			}else{
				clearTimeout(timer);	
			}
		} 
		var timer = setTimeout(function() { 
			settime(val) 
		},1000) 
	} 
		
