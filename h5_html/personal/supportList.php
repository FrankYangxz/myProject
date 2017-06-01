<?php 
#加载基础类库
require '../config.php';
#获取数据
$param['userId'] = $_GET['_id'] ? $_GET['_id'] : ($_COOKIE['currentUserId'] ? $_COOKIE['currentUserId'] : 0);
$data = _get('account/getUserProfile', $param);
$isCurrentUser = $_COOKIE['currentUserId'] == $param['userId'] ? TRUE : FALSE;
$sexString = $data['userProfile']['sex'] == 2 ? '她' : '他';

function buildPersonalLikeListObject($data) {
    return '<div class="support_person clearfix">
				<div class="support_photo"><img src="'.$data['photo'].'"></div>
				<div class="support_name">'.$data['showName'].'</div>
			</div>';
}

?>

<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-status-bar-style" content="blank" />
		<meta name="format-detection" content="telephone=no" />
		<link href="i/logo.png" rel="shortcut icon">
		<title>赞过<?php echo $isCurrentUser ? '我' : $sexString;?>的人</title>
		<link rel="stylesheet" type="text/css" href="../public/c/public.css" />
		<link rel="stylesheet" type="text/css" href="c/support.css" />
		<script src="../public/j/jquery-1.9.1.min.js"></script>
		<script src="../public/j/fun.js"></script>
		<script>
			$(document).ready(function() {
				document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
			});
			function goBack() {
				if(window.history.length <= 2){
					window.location.href='/App/community/?_type=personalHome&_id=<?php echo $param['userId'];?>';
				}
				else{
					window.history.back(-1);
				}
			}
		</script>
	</head>

	<body>
		<img src="i/logo.png" style="position:fixed; display: none; z-index: -999;">
		<div class="changeTitle" onclick="goBack()"><img src="i/anniu_02.jpg">
			<p>返回</p>
		</div>
		<div class="support">
			<p>最近有<?php echo $data['likeListCountNum'] > 50 ? 50 : $data['likeListCountNum'] ;?>人赞过<?php echo $isCurrentUser ? '我' : $sexString;?>的动态</p>
			<div id="support_list">
				<?php 
				    foreach ($data['likeList'] as $value) {
				        echo buildPersonalLikeListObject($value);
				    }
				?>
			</div>
		</div>
	</body>
	<script src="j/statistics.js"></script>

</html>