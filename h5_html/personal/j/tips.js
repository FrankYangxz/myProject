function tips() {
	/*发布按钮*/
	$(".issue a").bind("click", function(event) {
		if ($(".tips_box").is(':visible')) {
			$(".tips_box").hide();
		} else {
			$(".tips_box").text("");
			$(".tips_box").show();
			var tips = '<div class="ball"><p class="tip_content">在APP里发布内容体验更优哦，是否现在下载？</p><p class="btns clearfix"><a class="tip_btn tips2" href="http://a.app.qq.com/o/simple.jsp?plg_nld=1&pkgname=com.nashwork.space&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_nld=1&plg_vkey=1">立即下载</a></p></div>'
			$(".tips_box").html(tips);
		}
		event.stopPropagation();
		$('.tips2').on('click', function(event) {
			event.stopPropagation();
		});
	});
	/*私信按钮*/
	$(".call a,.support_change .call_it").bind("click", function(event) {
		if ($(".tips_box").is(':visible')) {
			$(".tips_box").hide();
		} else {
			$(".tips_box").text("");
			$(".tips_box").show();
			var tips = '<div class="ball"><p class="tip_content">在APP里才能私信TA哦，是否现在下载？</p><p class="btns clearfix"><a class="tip_btn tips2" href="http://a.app.qq.com/o/simple.jsp?plg_nld=1&pkgname=com.nashwork.space&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_nld=1&plg_vkey=1">立即下载</a></p></div>'
			$(".tips_box").html(tips);
		}
		event.stopPropagation();
		$('.tips2').on('click', function(event) {
			event.stopPropagation();
		});
	})
	/*购物按钮*/
	$(".buy a").bind("click", function(event) {
		if ($(".tips_box").is(':visible')) {
			$(".tips_box").hide();
		} else {
			$(".tips_box").text("");
			$(".tips_box").show();
			var tips = '<div class="ball"><p class="tip_content">在APP里购买商品更优惠哦，是否现在下载？</p><p class="btns clearfix"><a class="tip_btn tips2" href="http://a.app.qq.com/o/simple.jsp?plg_nld=1&pkgname=com.nashwork.space&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_nld=1&plg_vkey=1">立即下载</a></p></div>'
			$(".tips_box").html(tips);
		}
		event.stopPropagation();
		$('.tips2').on('click', function(event) {
			event.stopPropagation();
		});
	});
	/*标签提示*/
	$(".no_tips a").bind("click", function(event) {
		if ($(".tips_box").is(':visible')) {
			$(".tips_box").hide();
		} else {
			$(".tips_box").text("");
			$(".tips_box").show();
			var tips = '<div class="ball"><p class="tip_content">在APP里才能编辑个性标签哦，是否现在下载？</p><p class="btns clearfix"><a class="tip_btn tips2" href="http://a.app.qq.com/o/simple.jsp?plg_nld=1&pkgname=com.nashwork.space&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_nld=1&plg_vkey=1">立即下载</a></p></div>'
			$(".tips_box").html(tips);
		}
		event.stopPropagation();
		$('.tips2').on('click', function(event) {
			event.stopPropagation();
		});
	});
	$('.tips_box').on('click', function(event) {
		$(this).hide();
		event.stopPropagation();

	});
	
}