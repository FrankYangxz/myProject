//点击底部的四个按钮，字体颜色变化
			$('.list li').on('click',function(){
				$(this).find('a').css({'color':"#f3a85f"});
				$(this).siblings().find('a').css({'color':"#333"});
			})
		
		//社区部分，里面的tab切换
			$('.guanzhu').on('click',function(){
				$('.chuangjian').removeClass('guancolor01').addClass('guancolor02');
				$('.guanzhu').removeClass('guancolor02').addClass('guancolor01');
	
				$('.creat').hide();
				$('.care').show();
			})
			$('.chuangjian').on('click',function(){
				$('.guanzhu').removeClass('guancolor01').addClass('guancolor02');
				$('.chuangjian').removeClass('guancolor02').addClass('guancolor01');
				
				$('.care').hide();
				$('.creat').show();
			})
			//点击加号按钮，弹出下载框
			$('.found_tiezi a').on("click",function(){
				$('.oZhezhao_load').animate({"left":"0"},200)
			})
			$('.zhazhao_top').on("click",function(){
				$('.oZhezhao_load').animate({"left":"-100vw"},200)
			})
			