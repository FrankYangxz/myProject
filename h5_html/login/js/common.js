function login(from) {
	var username = $('#userid').val();
	var password = $('#password').val();
	if (from == null) {
		from = '/App/community/?_type=recommendHome&_id=0';
	}
	if (!username) {
		alert('手机号不能为空');
		$('#userid').focus();
		return false;
	} else {
		//检查手机号格式合法性
	}

	if (!password) {
		alert('手机号不能为空');
		$('#password').focus();
		return false;
	}
	$(".login-btn").attr('disabled', true);
	$(".loading").removeClass("dis_load");
	$.ajax({
		type: "POST",
		url: "../../community/?r=phone_account/login",
		data: {
			phoneNum: username,
			password: $.md5(password),
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				//alert('登录成功');	
				window.location.href = from;
			} else if (r.code == 112) {
				alert('账户不存在');
				$(".loading").addClass("dis_load");
				$(".login-btn").removeAttr("disabled");
				$('#userid').focus();
			} else if (r.code == 113) {
				alert('登录密码错误');
				$(".loading").addClass("dis_load");
				$(".login-btn").removeAttr("disabled");
				$('#password').focus();
			} else {
				alert('请联系工作人员！');
				$(".loading").addClass("dis_load");
				$(".login-btn").removeAttr("disabled");
			}
		},
		error: function() {
			alert("请联系工作人员！");
			$(".loading").addClass("dis_load");
			$(".login-btn").removeAttr("disabled");
		}
	});
}

function sendMessage() {
	if ($("#userid").val() == "") {
		$("#userid").focus();
		alert("请输入你的手机号");
		return false;
	}

	$.ajax({
		url: "/community/?r=phone_account/getForgotCode",
		data: {
			phoneNum: $("#userid").val(),
			vcode: $('#scode').val(),
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {},
		success: function(data) {
			if (data.code == 0) {
				alert('短信已经发送，请查收');
			} else if (data.code == 401) {
				alert('验证码信息不正确');
				$('#scode').focus();
			} else if (data.code == 112) {
				alert('账户不存在');
			} else {
				alert('请联系工作人员！');
			}
			settime($('#getCode'), 60);
		},
		complete: function() {
			$("#getsysCode").attr('src', '/community/?r=vcode/getVcode&tm=' + Math.random());
			//			sessionCount();
		}
	});
}

function resetPassword() {
	var username = $('#userid').val();
	var code = $('#code').val();
	var psword = $('#password').val();

	if (!username) {
		alert('请填写手机号码');
		$('#userid').focus();
		return false;
	}
	if (!code) {
		alert('请短信验证码');
		$('#code').focus();
		return false;
	}
	if (!psword) {
		alert('请填写新的密码');
		$('#password').focus();
		return false;
	}

	$.ajax({
		type: "POST",
		url: "/community/?r=phone_account/resetPassword",
		data: {
			phoneNum: username,
			forgotCode: code,
			password: $.md5(psword),
		},
		dataType: 'json',
		cache: "false",
		timeout: 30000,
		success: function(r) {
			if (r.code == 0) {
				//alert('修改成功');
				window.location.href = 'login.html';
			} else if (r.code == 110 || r.code == 111) {
				alert('验证码信息错误');
			} else if (r.code == 112) {
				alert('注册账户不存在');
			} else {
				alert('请联系工作人员！');
			}
		},
		error: function() {
			alert('请联系工作人员！');
		}
	});
}