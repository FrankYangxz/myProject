<?php 
header('Content-Type:text/html;charset=utf-8');
#判断邀请码是否是有效数据
if(!$returnMessage['userId']){
	echo "<script>alert('非法链接');window.location='http://nash.work';</script>";
	exit();
}
$backurl = "/checkCode/" . $returnMessage['userImAccount'];

?>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<link href="/community/img/logo.png" rel="shortcut icon">
		<title>邀请</title>
		<link rel="stylesheet" type="text/css" href="/community/css/public.css" />
		<link rel="stylesheet" type="text/css" href="/community/css/invite.css" />
		<script src="/community/js/jquery-1.10.1.min.js"></script>
		<script type="text/javascript" src="/community/js/statistics.js"></script>
	</head>

	<body>
		<div class="warp">
			<div class="in_content">
				<div class="border_style">
					<div class="headimg">
						<img id="invite-user-photo" src="">
					</div>
					<div class="mcontent">
						<div class="mcla radioBox">我是你的朋友<span id="invite-user-name"></span>,我极力向你推荐纳什空间.立即注册,开创属于你的办公社交圈.</div>
						<div class="jb"><img src="/community/img/invite/pdj.png"></div>
					</div>
				</div>
				<div class="social_hub border_style">
					<h3>纳什空间,颠覆你的办公社交圈</h3>
					<ul>
						<li>随时随地，想聊就聊</li>
						<li class="f_right">智能匹配，更多发现</li>
						<li>共享服务，生态办公</li>
						<li class="f_right">个人主页，一目了然</li>
					</ul>
				</div>
				<div class="need border_style">
					<ul>
						<li><img src="/community/img/invite/ztz.png"><p>找投资</p></li>
						<li><img src="/community/img/invite/zrc.png"><p>找合作</p></li>
						<li><img src="/community/img/invite/zxm.png"><p>找项目</p></li>
						<li><img src="/community/img/invite/yykf.png"><p>预约看房</p></li>
						<li><img src="/community/img/invite/yygw.png"><p>预定工位</p></li>
						<li><img src="/community/img/invite/cyfw.png"><p>创业服务</p></li>
						
					</ul>
				</div>
				<div class="company">
					<h3>不仅是我们公司,<br>很多企业都已经加入纳什空间</h3>
					<ul>
						<li><img src="/community/img/invite/36kr.jpg"></li>
						<li><img src="/community/img/invite/af.jpg"></li>
						<li style="margin-right: 0;"><img src="/community/img/invite/ddxz_logo.jpg"></li>
						<li><img src="/community/img/invite/djyy.jpg"></li>
						<li><img src="/community/img/invite/jatx.jpg"></li>
						<li style="margin-right: 0;"><img src="/community/img/invite/jsg.jpg"></li>
						<li><img src="/community/img/invite/kls.jpg"></li>
						<li><img src="/community/img/invite/lfs.jpg"></li>
						<li style="margin-right: 0;"><img src="/community/img/invite/lyh.jpg"></li>
						<li><img src="/community/img/invite/lzyb.jpg"></li>
						<li><img src="/community/img/invite/regus.jpg"></li>
						<li style="margin-right: 0;"><img src="/community/img/invite/ub.jpg"></li>
						<li><img src="/community/img/invite/xflt.png"></li>
						<li><img src="/community/img/invite/zgzf.jpg"></li>
						<li style="margin-right: 0;"><img src="/community/img/invite/zxfy.jpg"></li>						
					</ul>
					
				</div>
				<a id="J-regist-app" href="javascript:;" class="invite_click"><p>点击接受邀请</p></a>
			</div>

		</div>
	</body>
	
	<script type="text/javascript">
		//测试数据 正式上线 删除 htttp://: 
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
	    		document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
	    		$('title').html(inviteUserName + '的邀请');
	    		$('#invite-user-name').html(inviteUserName);
	    		$('#invite-user-photo').attr('src', inviteUserPhoto);
	    		$('#J-regist-app').attr('href', pc_path);
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
	    
	    $(document).ready(function() {
			$('.next-page').bind('click', function(){
				open_client();
			});
		})
	
//	    window.addEventListener("DOMContentLoaded", function(){
//	    		document.getElementsByClassName("next-page").addEventListener('click', open_client, false);
////	        document.getElementById("J-call-app").addEventListener('click',open_client,false);
////	        document.getElementById("button1").addEventListener('click',open_client,false);
////	        document.getElementById("J-regist-app").addEventListener('click',open_appstore,false);
//	    }, false);
	</script>

</html>