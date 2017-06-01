    function validatemobile()
    {
        // $("#dateTips").html('');
        // $("#timeTips").html('');
        // $("#projectTips").html('');
        // $("#cityTips").html('');
        // $("#areaTips").html('');
        // $("#nameTips").html('');
        // $("#telTips").html('');
        // if($("#appointmentDate").val() == '')
        // {
        //     $("#dateTips").css("display", "block");
        //     $("#dateTips").html('请填写预约日期');
        //     $("#appointmentDate").val("");
        //     $("#appointmentDate").focus(); 
        //     return false;
        // }
        // else if($("#appointmentTime").val() == '')
        // {
        //     $("#timeTips").css("display", "block");
        //     $("#timeTips").html('请填写预约时间');
        //     $("#appointmentTime").val("");
        //     $("#appointmentTime").focus(); 
        //     return false;
        // }
        // else if($("#Project").val() == '')
        // {
        //     $("#projectTips").css("display", "block");
        //     $("#projectTips").html('请选择预约类型');
        //     $("#Project").val("");
        //     $("#Project").focus(); 
        //     return false;
        // }
        // else if($("#City").val() == '')
        // {
        //     $("#cityTips").css("display", "block");
        //     $("#cityTips").html('请选择预约城市');
        //     $("#City").val("");
        //     $("#City").focus(); 
        //     return false;
        // }
        // else if($("#area").val() == '')
        // {
        //     $("#areaTips").css("display", "block");
        //     $("#areaTips").html('请选择预约区域');
        //     $("#area").val("");
        //     $("#area").focus(); 
        //     return false;
        // }
        // else if($("#userName").val() == '')
        // {
        //     $("#nameTips").css("display", "block");
        //     $("#nameTips").html('请填写称呼');
        //     $("#userName").val("");
        //     $("#userName").focus(); 
        //     return false;
        // }
    	if($("#telephone").val().length == 0 || $("#telephone").val().length != 11) 
        {
    		$("#telTips").css("display", "block");
    		$("#telTips").html('请输入正确的手机号');
    		$("#telephone").val("");
    		$("#telephone").focus();
    		return false;
    	}
    	if(!(/^1[3|4|5|7|8]\d{9}$/.test($("#telephone").val()))) 
        {
    		$("#telTips").html('请输入有效的手机号');
    		return false;
    	}
        else
        {
            $("#appointment").submit();
        }
    }