<?php 
	//获取数据
	require_once '../../framework/util/FCurl.php';
	$param['accessToken'] = 'e10adc3949ba59abbe56e057f20f883e';
	$param['app_id'] = 17002;
	$data = FCurl::get('http://v2.nashspace.com:8001/community/?r=community/getList', $param);
	$data = json_decode($data, TRUE);
	
	#解析数据
	if($data['code'] != 0) {
		#数据错误处理
	}
	
	$data = $data['data'];
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-status-bar-style" content="blank" />
		<meta name="format-detection" content="telephone=no" />
		<link href="img/app/logo.png" rel="shortcut icon">
		<title>纳什空间线上社区</title>
		<link rel="stylesheet" type="text/css" href="css/public.css" />
		<link rel="stylesheet" type="text/css" href="css/app.css" />
		<script src="js/jquery-1.10.1.min.js"></script>
		<script src="js/index.js"></script>
		<script>
			$(document).ready(function() {
				document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
				fnLunbo('tabPic');
			})
		</script>
	</head>

	<body>
		<img src="img/app/logo.png" style="position:fixed; display: none; z-index: -999;">
		<!-- Swiper -->
		<div class="app_page">
			<div class="login-tab line-bottom">
				<a href="/App/community/" class="sel">首页</a>
				<a href="/App/channel/">频道</a>
				<a href="/App/channel/newList.html">最新</a>
			</div>
			<div id="tabPic">
				<ul id="picList">
					<li class="loop-img"><img src="img/app/loop3.jpg" /></li>
					<li class="loop-img"><img src="img/app/loop2.jpg" /></li>
					<li class="loop-img"><img src="img/app/loop4.jpg" /></li>
					<li class="loop-img"><img src="img/app/loop1.jpg" /></li>
				</ul>
				<div class="picMask">
					<nav>
						<a href="javascript:;" class="active"></a>
						<a href="javascript:;"></a>
						<a href="javascript:;"></a>
						<a href="javascript:;"></a>
					</nav>
				</div>
			</div>
				
			<div class="app_content">
				<?php 
					foreach($data['messageRe'] as $value) {
						$imgCount = count($value['img']);
						switch ($imgCount) {
							case '1':
								echo '<div class="article_list" onclick="rend('.$value['paramId'].')">
										<div class="article_photo"><img src="'.$value['img'][0].'" /></div>
										<div class="article_title">
											<div class="app_title">
												'.mb_substr($value['name'], 0, 30, 'utf-8');
												if($value['tagName']) echo '<p class="channel_tip" style="background:'.$value['background'].'">'.$value['tagName'].'</p>';
								echo			'</div>
											<div class="tip clearfix">
												<p class="date">'.date('Y-m-d', $value['createTime']).'</p>
												<p class="read">'.$value['views'].'阅读</p>
											</div>
										</div>
									</div>';
								break;
								
							case '3':
								echo '<div class="article_list" onclick="rend('.$value['paramId'].')" >
										<div class="space">
											<h4>'.mb_substr($value['name'], 0, 30, 'utf-8').'</h4>';
											if ($value['tagName']) echo '<p class="channel_tip">'.$value['tagName'].'</p>';	
								echo		'</div>
										<ul class="img_list">';
											foreach ($value['img'] as $imgindex) {
												echo '<li><img src="'.$imgindex.'" /></li>';
											}		
											
								echo		'</ul>
										<div class="tip border-bottom clearfix">
											<p class="date">'.date('Y-m-d', $value['createTime']).'</p>
											<p class="read">'.$value['views'].'阅读</p>
										</div>
									</div>';
								break;	
							
							default:
								
								break;
						}
					}	
				?>
			</div>
			
			<div class="tab">
				<a href="/App/community/" class="tab_over">社区</a>
				<a href="/App/business/welfare/">福利</a>
				<a href="http://a.app.qq.com/o/simple.jsp?plg_nld=1&pkgname=com.nashwork.space&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_nld=1&plg_vkey=1">下载APP</a>
			</div>
		</div>
	</body>
	<script type="text/javascript">
		function rend(msgId) {
			window.location.href = '/shareMessage/'+msgId+'/10002';
		}
		
	</script>
	<script src="js/statistics.js"></script>
</html>