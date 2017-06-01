//验证客户手机号码
$('#customTel').blur(function(){
	var oKeHuTel = $('#customTel').val();
	if( !(/^1[34578]\d{9}$/.test(oKeHuTel) ) ){ 
		$('#customTel').val('');
		alert("手机号码格式有误");
		return false;
    }
})
$('#referTel').blur(function(){
	var oKeHuTel = $('#referTel').val();
	if( !(/^1[34578]\d{9}$/.test(oKeHuTel) ) ){ 
		$('#referTel').val('');
		alert("手机号码格式有误");
		return false;
    }
})

//验证推荐人邮箱
$('#referEmail').blur(function(){
	var oKeHuTel = $('#referEmail').val();
	var reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
	if( !(reg.test(oKeHuTel) ) ){ 
		$('#referEmail').val("");
       	alert("邮箱格式有误");
       	return false;
    }
})