//测试数据 正式上线 删除
var configIos = {
    scheme: '<?php echo $returnMessage['deepShareInfo']['url']['ios'] ? $returnMessage['deepShareInfo']['url']['ios'] : ''; ?>',
    path: '<?php echo $backurl; ?>'
};

var configAdr = {
    scheme: '<?php echo $returnMessage['deepShareInfo']['url']['android'] ? $returnMessage['deepShareInfo']['url']['android'] : ''; ?>',
    path: '<?php echo $backurl; ?>'

};
var pc_path = '<?php echo $backurl; ?>';
var inviteUserName = '<?php echo $returnMessage['userName'];?>';
var inviteUserPhoto = '<?php echo $returnMessage['userPhoto'] . s150; ?>';

//doc加载完成初始化数据
$(document).ready(function() {
//		document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
//		$('title').html(inviteUserName + '的邀请');
//		$('#invite-user-name').html(inviteUserName);
//		$('#invite-user-photo').attr('src', inviteUserPhoto);
//		$('#J-regist-app').attr('href', pc_path);
//		is_weixn();//判断页面是微信打开
    		init_argument();
});
	   /**
	    浏览器版本信息
	    * @type {Object}
	    * @return {Boolean}  返回布尔值
	    */
	    function browser() {
	        var u = window.navigator.userAgent.toLowerCase();
	        var app = navigator.appVersion.toLowerCase();
	        return {
	            txt: u, // 浏览器版本信息
	            version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
	            msie: /msie/.test(u) && !/opera/.test(u), // IE内核
	            mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
	            safari: /safari/.test(u) && !/chrome/.test(u), //是否为safair
	            chrome: /chrome/.test(u), //是否为chrome
	            opera: /opera/.test(u), //是否为oprea
	            presto: u.indexOf('presto/') > -1, //opera内核
	            webKit: u.indexOf('applewebkit/') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, //火狐内核
	            mobile: !!u.match(/applewebkit.*mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), //ios终端
	            android: u.indexOf('android') > -1, //android终端
	            iPhone: u.indexOf('iphone') > -1, //是否为iPhone
	            iPad: u.indexOf('ipad') > -1, //是否iPad
	            webApp: !!u.match(/applewebkit.*mobile.*/) && u.indexOf('safari/') == -1, //是否web应该程序，没有头部与底部
	            weiXin:u.match(/MicroMessenger/i) == 'micromessenger'
	        };
	    }
	
	    //页面参数信息体
	    var config = {
	        scheme: '',
	        path: '',
	        device:{
	            weixin:false,
	            ios:false,
	            android:false,
	            other:false
	        }
	    };
	
	    function init_argument() {
	        var b=browser();
	
	        if (b.weiXin) {
	            config.device.weixin = true;
	        }
	
	         if(b.ios||b.iPhone||b.iPad){
	            config.scheme = configIos.scheme;//初始化替换
	            config.path = configIos.path;//初始化替换
	            config.device.ios = true;
	
	        }else if(b.android){
	            config.scheme = configAdr.scheme;//初始化替换
	            config.path = configAdr.path;//初始化替换
	            config.device.android = true;
	        }else {
	            //非客户端浏览器打开
	             config.device.other = true;
	             config.path = pc_path;
	        }
	    }
	
	    function open_appstore() {
			window.location= config.path;
	    }
	
	    function open_client() {
	        if (config.device.weixin || config.device.other) {
	            open_hint_ui();
	        } else {
	           window.location=config.scheme;
	        }
	
	    }
	
	
	     //非客户端浏览器打开页面
	    function open_hint_ui() {
	
	        if(config.device.ios){
	            //alert('ios ui');
	            $(".notice_mark,.notice_img").show();
	        }else if(config.device.android){
	            $(".notice_mark,.notice_img").show();
	        }else {
	        		open_appstore();
	            //非客户端浏览器打开
	            //$(".notice_mark,.notice_img").show();
	        }
	    }	


function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();  
    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
    	  // 微信打开
    	  
       
    } else {   
      //不是微信打开
      init_argument();
    }  
}  

