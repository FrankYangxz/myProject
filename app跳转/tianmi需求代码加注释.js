$(document).ready(function() {
	$('.invite_click').bind('click', function(){
		var ua = navigator.userAgent.toLowerCase();  
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
	    	 	//微信打开的时候
	    	 	open_hint_ui();//展示提示右上角打开浏览器位置的图片
	    } else {   
	      //不是微信打开的时候
	      open_client();
	    }  
	});
})

//注释：1.页面中class名为cell下的.service,.buy,.cart都需要添加上面的这个点击事件；