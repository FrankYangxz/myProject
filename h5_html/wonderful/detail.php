<?php 
#加载基础类库
require '../config.php';
#获取数据
$param['id'] = $_GET['_id'] ? $_GET['_id'] : 0;
$data = _get('activity/get', $param);

function buildDetailActivityObject(array $data) {
    return '
        <div class="active_img"><img src="'.$data['AcInfo']['img'][0].'"></div>
		<div class="content">
			<h3 class="title">'.$data['AcInfo']['topic'].'</h3>
			<p><img src="i/icon_s.jpg">开始时间：<span class="start_time">'.changeTimeStyle($data['AcInfo']['startTime']).'</span></p>
			<p><img src="i/icon_e.jpg">结束时间：<span class="end_time">'.changeTimeStyle($data['AcInfo']['endTime']).'</span></p>
			<p><img src="i/icon_a.jpg"><span class="address">'.$data['AcInfo']['addressString'].'</span></p>
			<p>报名人数限制：<span class="number">'.changeLimitNumStyle($data['AcInfo']['limitNum']).'</span></p>
			<p>报名截止时间：<span class="abort_time">'.changeTimeStyle($data['AcInfo']['dealTime']).'</span></p>
			<div class="infor">'.showExtraInfo($data['AcInfo']['info']).'</div>
			<input style="none repeat scroll 0% 0%;" class="btn" id="button" value="" type="submit">   
		</div>';
}

function changeTimeStyle($date) {
    return $date == '无限制' ? $date : date('Y.m.d H:i', $date);
}

function changeLimitNumStyle($num) {
    return $num = '无限制' ? $num : $num.'人';
}

function showExtraInfo(array $info) {
    $returnData = '';
    foreach ($info as $index) {
        $returnData .= '<p class="info_key">'.$index['key'].'：<span class="info_value">'.$index['value'].'</span></p>';
    }
    return $returnData;
}

function buildJoinAcList($data) {
    return '<div class="detail_person">
				<div class="photo"><img src="'.$data['userIM']['photo'].'"></div>
				<div class="person">
					<p class="name">'.$data['userShowName'].'</p>
					<p class="about_time">报名时间 '.date('Y-m-d H:i', $data['singUpTime']).'</p>
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
		<link rel="stylesheet" type="text/css" href="c/a.css" />
		<link rel="stylesheet" type="text/css" href="c/mytips.css" />
		<script src="../public/j/jquery-1.9.1.min.js"></script>
		<script src="../public/j/fun.js"></script>
		<script src="j/active.js"></script>
		<script src="j/mytips.js"></script>
		<script>
			$(document).ready(function() {
				document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
			});
		</script>
	</head>

	<body>
		<div class="page">
		    <div class="loading dis_load">
				<div class="load"><img src="../public/i/loading.gif">加载中...</div>
			</div>
			<div class="changeTitle" onclick="goBack()"><img src="../public/i/anniu_02.jpg">
				<p>返回</p>
			</div>
			<?php 
			   echo buildDetailActivityObject($data);
			?>
			<h4 class="total_num">已有<spn class="apply_nun"><?php echo $data['AcListNum'];?></spn>位伙伴报名</h4>
			<i class="icon">&nbsp;</i>
			<div class="apply_person" style="display: block;">
				<?php 
				    foreach ($data['AcList'] as $value) {
				        echo buildJoinAcList($value);
				    }
				?>
			</div>
		</div>
	</body>
	<script>
		$(document).ready(function() {
			var SingUp = <?php echo $data['hadSingUp'] ? 1 : 0; ?>;
			var myTime = <?php echo time(); ?>;
			var dtime = <?php echo $data['AcInfo']['dealTime']; ?>;
			var etime = <?php echo $data['AcInfo']['endTime']; ?>;
				
			changeSingUpButten(SingUp, myTime, dtime, etime);
		})
	</script>
<script src="../public/j/statistics.js"></script>
</html>