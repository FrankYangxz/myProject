<?php 
#加载基础类库
require '../config.php';
#获取列表类型参数
$type = $_GET['_id'] ? $_GET['_id'] : 0;
$listTypeArr = activityListTypeParam($type);
#获取数据
$param['page'] = 1;
$param['num'] = 100000;
$param['startTime'] = $listTypeArr['startTime'];
$param['endTime'] = $listTypeArr['endTime'];
$data = _get('activity/fetchList', $param);

function activityListTmp($data) {
    $isOver = activityIsOver($data['AcInfo']['endTime']);
    $countString = activityCountDown($data['AcInfo']['startTime']);
    return '<div class="list" onclick="rend('.$data['AcInfo']['id'].');">
				<div class="a_img"></div>
				<div class="a_detail">
					<img class="goods_bg" src="'.$data['AcInfo']['img'][0].'">
					<div class="data">
						<img src="i/date.png">
						<p class="data_mouth">'.date('m', $data['AcInfo']['startTime']).'月</p>
						'.activiDay($data['AcInfo']['startTime'], $data['AcInfo']['endTime']).'
					</div>
					'.($countString ? '<div class="count_down"><p>倒计时:'.$countString.'</p></div>' : '<div class="count_down display_none"><p></p></div>').'
					<div class="intro '.($isOver ? 'over' : '').' ">
						<p class="a_time '.($isOver ? 'display_none' : '').' ">时间：<span>'.date('H:i', $data['AcInfo']['startTime']).'-'.date('H:i', $data['AcInfo']['endTime']).'</span></p>
						<p class="a_addr '.($isOver ? 'display_none' : '').' ">'.$data['AcInfo']['addressString'].'</p>
						<p class="a_over '.($isOver ? '' : 'display_none').' ">活动已结束</p>
					</div>
					<div class="cont clearfix">
						<p class="a_title">'.$data['AcInfo']['topic'].'</p>
						'.activitySingUp($data['AcListNum']).'
					</div>
				</div>
			</div>';
}

function activityListTypeParam($type) {
    $weekStart = _getWeekStartTimeStamp();
    switch ($type) {
        case 0:
            #全部活动
            return array('startTime' => -2, 'endTime' => -2);break;
        case 1:
            #我报名的活动
            return array('startTime' => -3, 'endTime' => -3);break;
        case 2:
            #今天活动
            $date = date('Y-m-d');
            $startTime = strtotime($date . ' 00:00:00');
            $endTime = strtotime($date . ' 23:59:59');
            return array('startTime' => $startTime, 'endTime' => $endTime);break;
        case 3:
            #本周工作日
            $date = date('Y-m-d', $weekStart);
            $startTime = strtotime($date . ' 00:00:00');
            $date = date('Y-m-d', $weekStart+4*24*3600);
            $endTime = strtotime($date . ' 23:59:59');
            return array('startTime' => $startTime, 'endTime' => $endTime);break;
        case 4:
            #本周周末
            $date = date('Y-m-d', $weekStart+5*24*3600);
            $startTime = strtotime($date . ' 00:00:00');
            $date = date('Y-m-d', $weekStart+6*24*3600);
            $endTime = strtotime($date . ' 23:59:59');
            return array('startTime' => $startTime, 'endTime' => $endTime);break;
        case 5:
            #下周
            $date = date('Y-m-d', $weekStart+7*24*3600);
            $startTime = strtotime($date . ' 00:00:00');
            $date = date('Y-m-d', $weekStart+13*24*3600);
            $endTime = strtotime($date . ' 23:59:59');
            return array('startTime' => $startTime, 'endTime' => $endTime);break;
        case 6:
            #往期精彩
            return array('startTime' => -1, 'endTime' => -1);break;
        default:
            return array('startTime' => -2, 'endTime' => -2);break;
    }
}

function activiDay($startTime, $endTime) {
    $start = date('d', $startTime);
    $end = date('d', $endTime);
    $startMonth = date('m', $startTime);
    $endMonth = date('m', $endTime);
    
    if ($startMonth != $endMonth) {
        $nowMonth = date('m');
        if ($startMonth == $nowMonth) {
            $BeginDate=date('Y-m-01', strtotime(date("Y-m-d")));
            $end = date('d', strtotime("$BeginDate +1 month -1 day"));
        }else {
            $start = '01';
        }
    }
    
    return $start == $end ? '<p class="data_date single">'.$start.'</p>' : '<p class="data_date">'.$start.'-'.$end.'</p>';
}

function activitySingUp($num) {
    return $num ? '<p class="person_total"><img src="i/icon_p_05.jpg">'.$num.'人报名</p>' : '';
}

function activityCountDown($start) {
    $time = $start - time();
    $returnStr = $time/3600;
    
    if ($returnStr <= 0 ) {
        return '';
    }
    if ($returnStr < 1) {
        return intval($returnStr * 60) . "分钟";
    }
    if ($returnStr >= 1 && $returnStr <= 6) {
        return intval($returnStr) . '小时';
    }
    if ($returnStr >= 6 && $returnStr < 24) {
        return '1天';
    }
    if ($returnStr >= 24 && $returnStr < 48) {
        return '2天';
    }
    if ($returnStr >= 48 && $returnStr < 36) {
        return '3天';
    }
    return '';
}

function activityIsOver($end) {
    return (time() - $end) > 0 ? TRUE : FALSE;
}

/**
 * 获取本周开始时间
 *
 * @param int $baseTimeStamp 基准时间戳
 * @return int
 */
function _getWeekStartTimeStamp($baseTimeStamp = NULL) {
    if (!$baseTimeStamp) $baseTimeStamp = time();
    $week = date('w', $baseTimeStamp);
    $day = $week ? date('d', $baseTimeStamp)-$week+1 : date('d', $baseTimeStamp)-7+1;
    return mktime(0,0,0,date('m', $baseTimeStamp),$day,date('Y', $baseTimeStamp));
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
		<script src="../public/j/jquery-1.9.1.min.js"></script>
		<script src="j/jquery.downCount.js"></script>
		<script src="../public/j/fun.js"></script>
		<script src="j/active.js"></script>
		<script>
			$(document).ready(function() {
				document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
			});
		</script>
	</head>

	<body>

		<div class="page">
			<select value="全部活动" class="select" id="active">
               <option value ="0">全部活动</option>
               <option value ="1" <?php if($type == 1) echo 'selected'; ?> >我报名的活动</option>
               <option value="2"  <?php if($type == 2) echo 'selected'; ?> >今天活动</option>
               <option value="3"  <?php if($type == 3) echo 'selected'; ?> >本周工作日</option>
               <option value="4"  <?php if($type == 4) echo 'selected'; ?> >本周周末</option>
               <option value="5"  <?php if($type == 5) echo 'selected'; ?> >下周</option>
               <option value="6"  <?php if($type == 6) echo 'selected'; ?> >往期精彩</option>
            </select>
			<?php 
			  foreach ($data as $value) {
			      echo activityListTmp($value);
			  }
			?>
		</div>
	<script>
		$('#active').bind('change', function(){
			var type = $('#active').val();
			window.location.href = 'list.php?_id=' + type;
		});
		
		function rend(id) {
			window.location.href = 'detail.php?_id=' + id;
		}
	</script>
	</body>
	<script src="../public/j/statistics.js"></script>
</html>