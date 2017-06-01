<?php
#加载基础类库
require '../config.php';
#获取数据
$param['startTime'] = -2;
$param['endTime'] = -2;
$param['page'] = 1;
$param['num'] = 100;

$data = FCurl::get(HOST . 'community/?r=activity/fetchList', $param);
$data = json_decode($data, TRUE);
$data = $data['data'];

/**
 * 构建活动列表对象
 * 
 * @param array $data
 * @return string
 */
function buildListActivityObject(array $data) {
    return '
        <div class="list" onclick="rend('.$data['id'].')">
			<div class="a_active">
				<img class="goods_bg" src="'.$data['img'][0].'">
			</div>
			<div class="a_detail">
				<p class="a_content">'.$data['topic'].'</p>
				<p class="a_time">活动时间：<span>'.date('Y-m-d H:i', $data['startTime']).'</span></p>
			</div>
		</div>';
}

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
		<link href="i/logo.png" rel="shortcut icon">
		<title>活动</title>
		<link rel="stylesheet" type="text/css" href="../public/c/public.css" />
		<link rel="stylesheet" type="text/css" href="c/active.css" />
		<script src="../public/j/jquery-1.9.1.min.js"></script>
			<script>
			$(document).ready(function() {
				document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
			});
		</script>
	</head>
	<body>
		<div class="page">
			<?php 
                foreach ($data as $value) {
                    echo buildListActivityObject($value['AcInfo']);
                }
            ?>
		</div>	
	</body>
	<script>
		function rend(detailId) {
			window.location.href = 'detail.php?&_type=activity&_id=' + detailId + '';
		}
	</script>
	<script src="../public/j/statistics.js"></script>
	
	<script src="j/active.js"></script>
</html>