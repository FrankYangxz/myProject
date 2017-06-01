function computeTodayStart() {
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	var day = new Date().getDate();
	var s_t = (new Date(year + '/' + month + '/' + day)).getTime();
	//alert("当天的开始时间：" + s_t);
	return s_t;

}

function computeTodayEnd() {
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	var day = new Date().getDate();
	var e_t = (new Date(year + '/' + month + '/' + day + ' 23:59:59')).getTime();
	//alert("当天的结束时间：" + e_t);
	return e_t;

}

function computeWeeKStart() {
	//本周开始
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	var day = new Date().getDate();
	var thisWeekStart; //本周周一的时间
	if (new Date().getDay() == 0) { //周天的情况；
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) + 6) * 86400000;
	} else {
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) - 1) * 86400000;
	}
	//alert("本周的开始时间：" + thisWeekStart);
	return thisWeekStart;

}

function computeWeekEnd() {
	//本周结束
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	var day = new Date().getDate();
	var thisWeekStart; //本周周一的时间
	if (new Date().getDay() == 0) { //周天的情况；
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) + 6) * 86400000;
	} else {
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) - 1) * 86400000;
	}
	//alert("本周结束时间：" + thisWeekStart);
	return thisWeekStart;

}

function computeWeekDay() {
	//本周周五
	var weekDateEnd = computeWeekEnd() - 2 * 86400000; //周五
	//alert("本周周五截止时间：" + weekDateEnd);
	return weekDateEnd;

}

function computeNextWeekStart() {
	//获得下周时间
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	var day = new Date().getDate();
	var thisWeekStart; //本周周一的时间
	if (new Date().getDay() == 0) { //周天的情况；
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) + 6) * 86400000;
	} else {
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) - 1) * 86400000;
	}
	var NextWeekStart = thisWeekStart + 7 * 86400000; //下周周一的时间
	//alert("获得下周开始时间：" + NextWeekStart);
	return NextWeekStart;

}

function computeNextWeekEnd() {
	//获得下周时间
	var year = new Date().getFullYear();
	var month = new Date().getMonth() + 1;
	var day = new Date().getDate();
	var thisWeekStart; //本周周一的时间
	if (new Date().getDay() == 0) { //周天的情况；
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) + 6) * 86400000;
	} else {
		thisWeekStart = (new Date(year + '/' + month + '/' + day)).getTime() - ((new Date().getDay()) - 1) * 86400000;
	}
	var NextWeekEnd = thisWeekStart + 7 * 86400000; //下周周日的时间
	var NextWeekEndDate = new Date(NextWeekEnd);
	//alert("获得下周结束时间：" + NextWeekEndDate);
	return NextWeekEndDate;

}

function active(selectVal,s_text) {

	if (selectVal == 0) {
		var s_t = -2;
		var e_t = -2;
	}
	if (selectVal == 1) {
		var s_t = -3;
		var e_t = -3;
	}
	if (selectVal == 2) {
		//当天
		var s_t = Math.floor(computeTodayStart() / 1000);
		var e_t = Math.floor(computeTodayEnd() / 1000);

	}
	if (selectVal == 3) {
		//本周工作日
		var s_t = Math.floor(computeWeeKStart() / 1000);
		var e_t = Math.floor(computeWeekDay() / 1000);
	}
	if (selectVal == 4) {
		//本周周末
		var s_t = Math.floor(computeWeekDay() / 1000);
		var e_t = Math.floor(computeWeekEnd() / 1000);

	}
	if (selectVal == 5) {
		//下周
		var s_t = Math.floor(computeNextWeekStart() / 1000);
		var e_t = Math.floor(computeNextWeekEnd() / 1000);
	}
	if (selectVal == 6) {
		var s_t = -1;
		var e_t = -1;
	}
	
	var nsid = GetQueryString('nsid');
	$.ajax({
		type: "get",
		url: "../../community/?r=activity/fetchList",
		data: {
			startTime: s_t,
			endTime: e_t,
			page: 1,
			num: 100000,
			nsid: nsid ? nsid : 0
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				//alert("123123selectText:"+selectText);
				if (r.data.length == 0) {
					alert(s_text + "暂时没有活动哦~");
					//myTips(s_text + "暂时没有活动哦~","success");
				} else {
					for (var i = 0; i < r.data.length; i++) {
						var a_Id = r.data[i].AcInfo.id;
						var a_img = r.data[i].AcInfo.img;
						var a_singuototle = r.data[i].AcListNum;
						var a_address = r.data[i].AcInfo.addressString;
						var myDate = new Date();
						var myTime = myDate.getTime();
						//alert("当前时间：" + myTime);
						var stime = r.data[i].AcInfo.startTime * 1000;
						//alert("活动开始时间：" + stime);
						var etime = r.data[i].AcInfo.endTime * 1000;
						//alert("活动结束时间：" + etime);
						var starttime = new Date(stime);
						var endtime = new Date(etime);
						var syear = starttime.getFullYear();
						var smouth = parseInt(starttime.getMonth() + 1) < 10 ? '0' + parseInt(starttime.getMonth() + 1) : parseInt(starttime.getMonth() + 1);
						var sdata = starttime.getDate() < 10 ? '0' + starttime.getDate() : starttime.getDate();
						var shour = starttime.getHours() < 10 ? '0' + starttime.getHours() : starttime.getHours();
						var sminute = starttime.getMinutes() < 10 ? '0' + starttime.getMinutes() : starttime.getMinutes();
						var ssecond = starttime.getSeconds() < 10 ? '0' + starttime.getSeconds() : starttime.getSeconds();
						if (myTime >= etime) {
							var list = '<div class="list" onclick="a_detail(' + r.data[i].AcInfo.id + ')"><div class="active"><img class="goods_bg" src="' + a_img + '"><div class="intro over"><p>活动已结束</p></div></div><div class="cont clearfix"><p class="a_addr"><img src="i/icon_a.jpg">' + a_address + '</p><p class="person_total"><img src="i/icon_p_05.jpg">' + a_singuototle + '</p></div></div>';
							$(".page").append(list);
						} else {
							if (stime - myTime <= 5 * 24 * 3600 * 1000 && stime - myTime >= 1 * 24 * 3600 * 1000) {
								show_time(smouth, sdata, syear, shour, sminute, ssecond, a_Id);
								var list = '<div class="list" onclick="a_detail(' + r.data[i].AcInfo.id + ')"><div class="active"><img class="goods_bg" src="' + a_img + '"><div class="count_down" id="count_down_' + r.data[i].AcInfo.id + '"><p>倒计时<span id="djs_' + a_Id + '"></span></p></div><div class="intro"><p>活动时间：' + syear + '.' + smouth + '.' + sdata + ' ' + shour + ':' + sminute + '</p></div></div><div class="cont clearfix"><p class="a_addr"><img src="i/icon_a.jpg">' + a_address + '</p><p class="person_total"><img src="i/icon_p_05.jpg">' + a_singuototle + '</p></div></div>';
								$(".page").append(list);
								$(".count_down").css("display", "block");

							} else {
								var list = '<div class="list" onclick="a_detail(' + r.data[i].AcInfo.id + ')"><div class="active"><img class="goods_bg" src="' + a_img + '"><div class="intro"><p>活动时间：' + syear + '.' + smouth + '.' + sdata + ' ' + shour + ':' + sminute + '</p></div></div><div class="cont clearfix"><p class="a_addr"><img src="i/icon_a.jpg">' + a_address + '</p><p class="person_total"><img src="i/icon_p_05.jpg">' + a_singuototle + '</p></div></div>';
								$(".page").append(list);
							}
						}

					}
				}

			}else if (r.code == 11001){
				window.location.href = '/App/login/login.html?from=' + escape(window.location.href);
			} else {
				alert("请联系工作人员！");
			}
		},
		error: function(r) {
			alert("请联系工作人员！");
		}
	});

}

function active_detail() {
	var id = GetQueryString('_id');
	var nsid = GetQueryString('nsid');
	$.ajax({
		type: "get",
		url: "../../community/?r=activity/get",
		data: {
			id: id,
			nsid: nsid ? nsid : 0
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				var txt = $("#button").val();
				var topic = r.data.AcInfo.topic;
				var address = r.data.AcInfo.addressString;
				var SingUp = r.data.hadSingUp;
				var SingUpNum = r.data.AcListNum;
				var limitNum = r.data.AcInfo.limitNum;
				if (r.data.AcInfo.info.length != 0) {
					for (var i = 0; i < r.data.AcInfo.info.length; i++) {
						var infor_k = r.data.AcInfo.info[i].key;
						var infor_v = r.data.AcInfo.info[i].value;
						var infolist = '<p class="info_key">' + infor_k +'：<span class="info_value">' + infor_v + '</span></p>'
						$(".infor").append(infolist);
					}
				}

				var myDate = new Date();
				var myTime = myDate.getTime();
				//alert("当前时间：" + myTime);
				var stime = r.data.AcInfo.startTime * 1000;
				var etime = r.data.AcInfo.endTime * 1000;
				var starttime = new Date(stime);
				var endtime = new Date(etime);
				
				if(r.data.AcInfo.dealTime == '无限制') {
					var dtime = -1;
					var dealTime = '无限制';
					$(".abort_time").html(dealTime);
				}else {
					var dtime = r.data.AcInfo.dealTime * 1000;
					var dealTime = new Date(dtime);
					var dyear = dealTime.getFullYear();
					var dmouth = parseInt(dealTime.getMonth() + 1) < 10 ? '0' + parseInt(dealTime.getMonth() + 1) : parseInt(dealTime.getMonth() + 1);
					var ddata = dealTime.getDate() < 10 ? '0' + dealTime.getDate() : dealTime.getDate();
					var dhour = dealTime.getHours() < 10 ? '0' + dealTime.getHours() : dealTime.getHours();
					var dminute = dealTime.getMinutes() < 10 ? '0' + dealTime.getMinutes() : dealTime.getMinutes();
					$(".abort_time").html(dyear + "." + dmouth + "." + ddata + " " + dhour + ":" + dminute);
				}
				
				var syear = starttime.getFullYear();
				var smouth = parseInt(starttime.getMonth() + 1) < 10 ? '0' + parseInt(starttime.getMonth() + 1) : parseInt(starttime.getMonth() + 1);
				var sdata = starttime.getDate() < 10 ? '0' + starttime.getDate() : starttime.getDate();
				var shour = starttime.getHours() < 10 ? '0' + starttime.getHours() : starttime.getHours();
				var sminute = starttime.getMinutes() < 10 ? '0' + starttime.getMinutes() : starttime.getMinutes();
				var eyear = endtime.getFullYear();
				var emouth = parseInt(endtime.getMonth() + 1) < 10 ? '0' + parseInt(endtime.getMonth() + 1) : parseInt(endtime.getMonth() + 1);
				var edata = endtime.getDate() < 10 ? '0' + endtime.getDate() : endtime.getDate();
				var ehour = endtime.getHours() < 10 ? '0' + endtime.getHours() : endtime.getHours();
				var eminute = endtime.getMinutes() < 10 ? '0' + endtime.getMinutes() : endtime.getMinutes();
				
				$(".active_img img").attr("src", r.data.AcInfo.img);
				$(".title").html(topic);
				$(".start_time").html(syear + "." + smouth + "." + sdata + " " + shour + ":" + sminute);
				$(".end_time").html(eyear + "." + emouth + "." + edata + " " + ehour + ":" + eminute);
				$(".address").html(address);
				$(".number").html(limitNum);
				$(".apply_nun").html(SingUpNum);
				if (SingUp) {
					if (myTime < dtime) {
						$("#button").val("取消报名");
						$("#button").css("background", '#fea100');
						$("#button").bind("click", function() {
							unsignup();
						})
					}
					if (myTime >= dtime) {
						$("#button").val("取消报名");
						$("#button").css("background", '#8b8b8b');
					}
					if (myTime >= etime) {
						$("#button").val("活动已结束");
						$("#button").css("background", '#8b8b8b');
					}
				} else {
					if (myTime >= etime) {
						$("#button").val("活动已结束");
						$("#button").css("background", '#8b8b8b');
					}else {
						if (myTime >= dtime && dtime != -1) {
							$("#button").val("报名截止");
							$("#button").css("background", '#8b8b8b');
						}else {
							$("#button").val("我要报名");
							$("#button").css("background", '#fea100');
							$("#button").bind("click", function() {
								signup();
							})
						}
					}
				}

				if (r.data.AcList.length != 0) {
					$(".apply_person").css("display", 'block');
					for (var i = 0; i < r.data.AcList.length; i++) {
						var SingUpname = r.data.AcList[i].userIM.nickname;
						var SingUpphoto = r.data.AcList[i].userIM.photo;
						var singUptime = r.data.AcList[i].singUpTime * 1000;
						var SUTime = new Date(singUptime);
						var SUyear = SUTime.getFullYear();
						var SUmouth = parseInt(SUTime.getMonth() + 1) < 10 ? '0' + parseInt(SUTime.getMonth() + 1) : parseInt(SUTime.getMonth() + 1);
						var SUdata = SUTime.getDate() < 10 ? '0' + SUTime.getDate() : SUTime.getDate();
						var SUhour = SUTime.getHours() < 10 ? '0' + SUTime.getHours() : SUTime.getHours();
						var SUminute = SUTime.getMinutes() < 10 ? '0' + SUTime.getMinutes() : SUTime.getMinutes();
						var SingUpList = '<div class="detail_person"><div class="photo"><img src="' + SingUpphoto + '"></div><div class="person"><p class="name">' + SingUpname + '</p><p class="about_time">报名时间 ' + SUyear + '.' + SUmouth + '.' + SUdata + ' ' + SUhour + ':' + SUminute + '</p></div></div>'
						$(".apply_person").append(SingUpList);
					}
				}

			}else if (r.code == 11001){
				window.location.href = '/App/login/login.html?from=' + escape(window.location.href);
			} else {
				alert("请联系工作人员！");
			}
		},
		error: function(r) {
			alert("请联系工作人员！");
		}
	});

}
/*报名*/
function signup() {
	var id = GetQueryString('_id');
	var nsid = GetQueryString('nsid');
	$(".loading").removeClass("dis_load"); /*显示loading*/
	$.ajax({
		type: "post",
		url: "../../community/?r=activity/singUp",
		data: {
			id: id,
			nsid: nsid ? nsid : 0
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				$(".loading").addClass("dis_load"); /*加载完隐藏loading*/
				myTips("恭喜你，已报名成功！","success");
				window.location.reload();

			}else if (r.code == 1000){
				$(".loading").addClass("dis_load"); /*加载完隐藏loading*/
				myTips(r.extra,"success");
			}
			else if (r.code == 11001){
				window.location.href = '/App/login/login.html?from=' + escape(window.location.href);
			} else {
				$(".loading").addClass("dis_load"); /*加载完隐藏loading*/
				alert("请联系工作人员！");
			}
		},
		error: function(r) {
			$(".loading").addClass("dis_load"); /*加载完隐藏loading*/
			alert("请联系工作人员！");
		}
	});

}
/*取消报名*/
function unsignup() {
	var id = GetQueryString('_id');
	var nsid = GetQueryString('nsid');
	$(".loading").removeClass("dis_load"); /*显示loading*/
	$.ajax({
		type: "post",
		url: "../../community/?r=activity/cancle",
		data: {
			id: id,
			nsid: nsid ? nsid : 0
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				//alert("已取消成功！");
				$(".loading").addClass("dis_load"); /*加载完隐藏loading*/
				myTips("已取消报名！","success");
				window.location.reload();
			}else if (r.code == 11001){
				window.location.href = '/App/login/login.html?from=' + escape(window.location.href);
			} else {
				$(".loading").addClass("dis_load"); /*加载完隐藏loading*/
				alert("请联系工作人员！");
			}
		},
		error: function(r) {
			$(".loading").addClass("dis_load"); /*加载完隐藏loading*/
			alert("请联系工作人员！");
		}
	});

}

function show_time(smouth, sdata, syear, shour, sminute, ssecond, a_Id) {
	$('#djs_' + a_Id).downCount({
		//date: '12/24/2020 12:00:00',
		date: smouth + "/" + sdata + "/" + syear + " " + shour + ":" + sminute + ":" + ssecond,
		offset: +10,
		acId: a_Id
	}, function() {
		//alert('倒计时结束!');
	});
}

function changeSingUpButten (SingUp, myTime, dtime, etime) {
	if (SingUp) {
		if (myTime < dtime) {
			$("#button").val("取消报名");
			$("#button").css("background", '#fea100');
			$("#button").bind("click", function() {
				unsignup();
			})
		}
		if (myTime >= dtime) {
			$("#button").val("取消报名");
			$("#button").css("background", '#8b8b8b');
		}
		if (myTime >= etime) {
			$("#button").val("活动已结束");
			$("#button").css("background", '#8b8b8b');
		}
	} else {
		if (myTime >= etime) {
			$("#button").val("活动已结束");
			$("#button").css("background", '#8b8b8b');
		}else {
			if (myTime >= dtime && dtime != -1) {
				$("#button").val("报名截止");
				$("#button").css("background", '#8b8b8b');
			}else {
				$("#button").val("我要报名");
				$("#button").css("background", '#fea100');
				$("#button").bind("click", function() {
					signup();
				})
			}
		}
	}
}