//点击底部的四个按钮，字体颜色变化
			$('.list li').on('click',function(){
				$(this).find('a').css({'color':"#f3a85f"});
				$(this).siblings().find('a').css({'color':"#333"});
			})
		//社区里面的频道部分，点击附近nearby，热门new，最新last三个按钮
			$('.pindao_header_list li').on('click',function(){
				var index = $(this).index();
				$(this).addClass('back').siblings().removeClass('back');
				if ( index == 0) {
					$('.zuijin').show().siblings().hide();
				} else if ( index == 1) {
					$('.remen').show().siblings().hide();
				}else{
					$('.fujin').show().siblings().hide();
				}
			})
			
			//点击加号按钮，弹出下载框
			$('.found_tiezi a').on("click",function(){
				$('.oZhezhao_load').animate({"left":"0"},200)
			})
			$('.zhazhao_top').on("click",function(){
				$('.oZhezhao_load').animate({"left":"-100vw"},200)
			})
		