////////////////////////////弹层//////////////////////////////////////
$('.oZheFeiQi').click(function(){
	$('.oZheFeiQi').hide();
	$('.oPassword').hide();
	$('.oYiJianFanKui').hide();
	$('.oTuiJianfo').hide();
})
//重置密码
$(".oResetPassWord").click(function(){
	$('.oZheFeiQi').show();
	$('.oPassword').show();
})
//倒计时
$('.oGetMa').click(function(){
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
})
//新密码提交
$('.oQueRen').click(function(){
	$('.oZheFeiQi').hide();
	$('.oPassword').hide();
	var oNewPwd = $('#oNewPwd').val();
	var oNewPwdSecond = $('#oNewPwdSecond').val();
	if ( oNewPwd != oNewPwdSecond) {
		alert("密码不一致！")
	}
	
})
//意见反馈
$('.oYiJian').click(function(){
	$('.oZheFeiQi').show();
	$('.oYiJianFanKui').show();
})
$('.oSubYiJian').click(function(){
	$('.oZheFeiQi').hide();
	$('.oYiJianFanKui').hide();
})
//推荐新人
$('.oCreat').click(function(){
	$('.oZheFeiQi').show();
	$('.oTuiJianfo').show();
})
$('.oBtn').click(function(){
	$('.oZheFeiQi').hide();
	$('.oTuiJianfo').hide();
})