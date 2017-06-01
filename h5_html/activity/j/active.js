function active() {
	$.ajax({
		type: "get",
		url: "../../community/?r=activity/fetchList",
		data: {
			startTime: -2,
			endTime: -2,
			page: 1,
			num: 100000
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				//alert(r.data.length);
				for (var i = 0; i < r.data.length; i++) {
					var a_title = r.data[i].AcInfo.topic;
					var a_img = r.data[i].AcInfo.img;
					var stime = r.data[i].AcInfo.startTime * 1000;
					var etime = r.data[i].AcInfo.endTime * 1000;
					var starttime = new Date(stime);
					var endtime = new Date(etime);
					var syear = starttime.getFullYear();
					var smouth = parseInt(starttime.getMonth() + 1) < 10 ? '0' + parseInt(starttime.getMonth() + 1) : parseInt(starttime.getMonth() + 1);
					var sdata = starttime.getDate() < 10 ? '0' + starttime.getDate() : starttime.getDate();
					var shour = starttime.getHours() < 10 ? '0' + starttime.getHours() : starttime.getHours();
					var sminute = starttime.getMinutes() < 10 ? '0' + starttime.getMinutes() : starttime.getMinutes();
					var list = '<div class="list" onclick="a_detail(' + r.data[i].AcInfo.id + ')"><div class="a_active"><img class="goods_bg" src="' + a_img + '"></div><div class="a_detail"><p class="a_content">' + a_title + '</p><p class="a_time">活动时间：' + syear + '.' + smouth + '.' + sdata + ' ' + shour + ':' + sminute + '</p></div></div>';
					$(".page").append(list);
				}
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
	$.ajax({
		type: "get",
		url: "../../community/?r=activity/get",
		data: {
			id: id
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				var topic = r.data.AcInfo.topic;
				var address = r.data.AcInfo.addressString;
				var limitNum = r.data.AcInfo.limitNum;
				if (r.data.AcInfo.info.length != 0) {
					for (var i = 0; i < r.data.AcInfo.info.length; i++) {
						var infor_k = r.data.AcInfo.info[i].key;
						var infor_v = r.data.AcInfo.info[i].value;
						var infolist = '<p class="info_key">' + infor_k + '：<span class="info_value">' + infor_v + '</span></p>'
						$(".infor").append(infolist);
					}
				}
				var stime = r.data.AcInfo.startTime * 1000;
				var etime = r.data.AcInfo.endTime * 1000;
				var dtime = r.data.AcInfo.dealTime * 1000;
				var starttime = new Date(stime);
				var endtime = new Date(etime);
				var dealTime = new Date(dtime);
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
				var dyear = dealTime.getFullYear();
				var dmouth = parseInt(dealTime.getMonth() + 1) < 10 ? '0' + parseInt(dealTime.getMonth() + 1) : parseInt(dealTime.getMonth() + 1);
				var ddata = dealTime.getDate() < 10 ? '0' + dealTime.getDate() : dealTime.getDate();
				var dhour = dealTime.getHours() < 10 ? '0' + dealTime.getHours() : dealTime.getHours();
				var dminute = dealTime.getMinutes() < 10 ? '0' + dealTime.getMinutes() : dealTime.getMinutes();
				$(".active_img img").attr("src", r.data.AcInfo.img);
				$(".title").html(topic);
				$(".start_time").html(syear + "." + smouth + "." + sdata + " " + shour + ":" + sminute);
				$(".end_time").html(eyear + "." + emouth + "." + edata + " " + ehour + ":" + eminute);
				$(".abort_time").html(dyear + "." + dmouth + "." + ddata + " " + dhour + ":" + dminute);
				$(".address").html(address);
				$(".number").html(limitNum);

			} else {
				alert("请联系工作人员！");
			}
		},
		error: function(r) {
			alert("请联系工作人员！");
		}
	});

}