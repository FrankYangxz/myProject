function pagedate() {
	$.ajax({
		type: "POST",
		url: "../../../business/?r=commodityBase/index",
		data: {
			type: 1,
			page: 1,
			num: 10000
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				/*轮播图*/
				var html = '';
				for (j = 0; j < r.data.recommendation.length; j++) {
					var img_list = '<li><img src="' + r.data.recommendation[j].background + '" /> </li>'
					var banner_img_list = $("#picList").html();
					$("#picList").html(banner_img_list + img_list);
					html++;
				}
				for (k = 0; k < html; k++) {
					if (k == 0) {
						$("nav").html('<a href="javascript:;" class="active"></a>');
					} else {
						$("nav").append('<a href="javascript:;"></a>');
					}
				}

				/*list*/
				for (var i = 0; i < r.data.list.length; i++) {
					var btitle = r.data.list[i].name;
					var prefecture = '<h3>' + btitle + '</h3>';
					var list_total = $(".page").html();
					$(".page").html(list_total + prefecture);
					var detail_list = r.data.list[i].list.length;
					for (var j = 0; j < detail_list; j++) {
						var list = '<div class="list" onclick="list(' + r.data.list[i].list[j].id + ', \'' + r.data.list[i].list[j].name + '\')"><div class="prefecture"><div class="icon"><img src="' + r.data.list[i].list[j].icon + '"></div><div class="description"><h4>' + r.data.list[i].list[j].name + '</h4><p>' + r.data.list[i].list[j].description + '</p></div></div></div>';
						$(".page").append(list);
					}
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

/*list*/

function list_detail() {
	var id = GetQueryString('_id');
	//临时处理
	if (!id) {
		id = GetQueryString('typeId');
	}

	$.ajax({
		type: "get",
		url: "../../../business/?r=commodityBase/getList",
		data: {
			typeId: id
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				for (var i = 0; i < r.data.list.length; i++) {
					var o_money = r.data.list[i].price.originalPrice;
					var oMoney = o_money.split('.');
					var n_money = r.data.list[i].price.finalPrice;
					var nMoney = n_money.split('.');
					var xingji = r.data.list[i].price.levelShowUrl;
					var inventory = r.data.list[i].showWarningInfo.inventory;
					if (xingji == '') {
						//alert(11111);
						var list = '<div class="goods" onclick="goods_detail(' + r.data.list[i].id + ')"><img class="goods_bg" src="' + r.data.list[i].backgroundImg + '"><div class="price"><p class="title">' + r.data.list[i].name + '</p><div class="star_level"><p class="new_price">￥' + nMoney[0] + '<i>/' + r.data.list[i].unit + ' </i></p></div><p class="old_price">原价：<span>' + oMoney[0] + '</span></p></div></div>';

					} else if (inventory <= 5) {
						var list = '<div class="goods" onclick="goods_detail(' + r.data.list[i].id + ')"><img class="goods_bg" src="' + r.data.list[i].backgroundImg + '"><div class="price"><p class="title">' + r.data.list[i].name + '</p><div class="star_level"><p class="new_price">￥' + nMoney[0] + '<i>/' + r.data.list[i].unit + ' </i></p><p class="level"><img src="' + xingji + '"><span class="residue">仅剩<i>' + inventory + '</i>件</span></p></div><p class="old_price">原价：<span>' + oMoney[0] + '</span></p></div></div>';
					} else {
						var list = '<div class="goods" onclick="goods_detail(' + r.data.list[i].id + ')"><img class="goods_bg" src="' + r.data.list[i].backgroundImg + '"><div class="price"><p class="title">' + r.data.list[i].name + '</p><div class="star_level"><p class="new_price">￥' + nMoney[0] + '<i>/' + r.data.list[i].unit + ' </i></p><p class="level"><img src="' + xingji + '"></p></div><p class="old_price">原价：<span>' + oMoney[0] + '</span></p></div></div>';
					}
					$(".list").append(list);

				}
			}
		},
		error: function() {
			alert('当前操作用户太多，请稍等！')
		}
	});
};
/*goods_detail*/
function detail() {
	var id = GetQueryString('_id');
	$.ajax({
		type: "get",
		url: "../../../business/?r=commodityBase/get",
		data: {
			id: id
		},
		dataType: "json",
		cache: "false",
		success: function(r) {
			if (r.code == 0) {
				var o_money = r.data.price.originalPrice;
				var oMoney = o_money.split('.');
				var n_money = r.data.price.finalPrice;
				var nMoney = n_money.split('.');
				$("#img_bg").attr("src", r.data.backgroundImg);
				var d_xingji = r.data.price.levelShowUrl;
				var inventory = r.data.showWarningInfo.inventory;
				if (d_xingji !== '') {
					$(".xingji").removeClass('inventory_none');
					$(".xingji").attr("src", d_xingji);
				}
				if (inventory <= 5) {
					$(".residue").removeClass('inventory_none');
					$(".inventory").html(inventory);
				}

				$("#o_money").html(oMoney[0]);
				$("#n_money").html(nMoney[0]);
				$("#unit").html(r.data.unit);
				$("#detail_intro").html(r.data.name);
				for (var i = 0; i < r.data.discription.length; i++) {
					var d_attr = r.data.discription[i].attr;
					var d_value = r.data.discription[i].value;
					var detail_content = '<p><span class="detail_1">' + d_attr + '</span><span class="detail_2">' + d_value + '</span></p>'
					$(".intro_detail").append(detail_content);
					var list_total = $(".intro_detail").html();
					$(".intro_detail").html(list_total);

				}
				for (var j = 0; j < r.data.photo.length; j++) {
					var detail_imgs = '<img src="' + r.data.photo[j] + '">';
					$(".detail_img").append(detail_imgs);
					var list_img_total = $(".detail_img").html();
					$(".detail_img").html(list_img_total);
				}
				for (var k = 0; k < r.data.price.priceList.length; k++) {
					var k_price = parseFloat(r.data.price.priceList[k].price) / 100;
					var k_unit = r.data.price.priceList[k].unit;
					var k_icon = r.data.price.priceList[k].icon;
					var k_list = '<li><img src="' + k_icon + '"><div>' + k_price + '/' + k_unit + '</div></li>'
					$(".xj_price ul").append(k_list);

				}

			}
		},
		error: function() {
			alert('当前操作用户太多，请稍等！')
		}
	});
};