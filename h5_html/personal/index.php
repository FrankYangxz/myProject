<?php 
#加载基础类库
require '../config.php';
#获取数据
$param['userId'] = $_GET['_id'] ? $_GET['_id'] : ($_COOKIE['currentUserId'] ? $_COOKIE['currentUserId'] : 0);
if (!$param['userId']) {
    echo '<script>window.location.href = "/App/login/login.html?from=" + escape(window.location.href);</script>';
    exit();
}

$data = _get('account/getUserProfile', $param);
$isCurrentUser = $_COOKIE['currentUserId'] == $param['userId'] ? TRUE : FALSE;
$sexString = $data['userProfile']['sex'] == 2 ? '她' : '他';

$param['page'] = $_GET['page'] ? $_GET['page'] : 1;
$currentPagedata = _get('message/getListByUserForPage', $param);
$param['page']++;
$nextPageData = _get('message/getListByUserForPage', $param);
$param['page']--;
$dataNum = count($data['list']);
$hadNextPageData = empty($nextPageData['list']) ? FALSE : TRUE;

function buildPersonalInfo($userProfile, $tagList) {
    return '<p class="personal_photo"><img src="'.$userProfile['photo'].'"></p>
			<p class="personal_name">'.$userProfile['name'].'</p>
			<p class="personal_introduce">'.$userProfile['jobName'].' '.$userProfile['company'].' '.($userProfile['space'] ? '@'.$userProfile['space'] : '').'</p>
			'.buildPersonalTagInfo($tagList);
}

function buildPersonalTagInfo($tagList) {
    return empty($tagList) ? buildPersonalEmptyTagInfo() : buildPersonalhadTagInfo($tagList);
}

function buildPersonalEmptyTagInfo() {
    return '<div class="personal_tips no_tips">
			    <a class="tip_click"><i>+</i>完善兴趣和才艺，展现更精彩的你！</a>
			</div>';
}

function buildPersonalhadTagInfo($tagList) {
    $returnData = '<div class="personal_tips">';
    $num = 1;
    foreach ($tagList as $value) {
        if ($num) {
            $returnData .= '<p class="box_up"><span>'.$value['name'].'</span></p>';
            $num = 0;
        }else {
            $returnData .= '<p class="box_down"><span>'.$value['name'].'</span></p>';
            $num = 1;
        }
    }
    $returnData .= '</div>';
    return $returnData;
}

function buildChannelMessageObject($data, $isCurrentUser = FALSE) {
    return '<div class="channel_page" onclick="detail('.$data['id'].', '.$data['messageType'].')" >
				<div class="channel_list">
					<div class="fri_photo">
						<a href="/App/personal/?_id='.$data['createUserInfo']['userId'].'&_type=personalHome">
						    <img src="'.$data['createUserInfo']['photo'].'">
						</a>    
					</div>
					<div class="main">
						'.buildChannelMessageHeader($data['createUserInfo']['showName'], $data['createUserInfo']['levelShowUrl'], $data['createTime'], $isCurrentUser).'
						<pre><span class="label_tips dynamic">#动态</span>'.$data['content'].'</pre>
						<ul class="imglist">
							'.buildChannelMessageImgList($data['img']).'
						</ul>'._retweetMessage($data['retweet']).'
						'.buildChannelMessageFooter($data['spaceName'], $data['views'], $data['channelName'], $data['likeNum'], $data['hadLike']).'
					</div>
				</div>
			</div>';
}
function buildChannelPostObject($data, $isCurrentUser = FALSE) {
    return '<div class="channel_page" onclick="detail('.$data['id'].', '.$data['messageType'].')" >
				<div class="channel_list">
					<div class="fri_photo">
						<a href="/App/personal/?_id='.$data['createUserInfo']['userId'].'&_type=personalHome">
						    <img src="'.$data['createUserInfo']['photo'].'">
						</a>
					</div>
					<div class="main">
						'.buildChannelMessageHeader($data['createUserInfo']['showName'], $data['createUserInfo']['levelShowUrl'], $data['createTime'], $isCurrentUser).'
						<h3 class="post_Tital"><span class="label_tips post">#帖子</span>'.$data['title'].'</h3>
						<pre>'.$data['content'].'</pre>
						<ul class="imglist">
							'.buildChannelMessageImgList($data['img']).'
						</ul>
						'.buildChannelMessageFooter($data['spaceName'], $data['views'], $data['channelName'], $data['likeNum'], $data['hadLike']).'
					</div>
				</div>
			</div>';
}

function buildChannelHongbaoObject($data, $isCurrentUser = FALSE) {
    return '<div class="channel_page" onclick="detail('.$data['id'].', '.$data['messageType'].')" >
				<div class="channel_list">
					<div class="fri_photo">
                        <a href="/App/personal/?_id='.$data['createUserInfo']['userId'].'&_type=personalHome">
						    <img src="'.$data['createUserInfo']['photo'].'">
						</a>
                    </div>
					<div class="main">
						<div class="top clearfix">
							'.buildChannelMessageHeader($data['createUserInfo']['showName'], $data['createUserInfo']['levelShowUrl'], $data['createTime'], $isCurrentUser).'
						</div>
						<!---红包样式开始---->
						<div class="hongbao">
							<img src="'.$data['hongbaoStyle']['bg_img_url'].'">
							<div class="box1"><img src="'.$data['hongbaoStyle']['money_img_url'].'"></div>
						</div>
						<!---红包样式结束---->
						'.buildChannelMessageFooter($data['spaceName'], $data['views'], $data['channelName'], $data['likeNum'], $data['hadLike']).'
					</div>
				</div>
			</div>';
}

function buildChannelMessageHeader($name, $level, $createTime, $isCurrentUser = FALSE) {
    return '<div class="top clearfix">
    			<div class="f_title">
    				<h2 class="clearfix"><p class="l_name">'._cutUserShowName($name).'</p><p class="xj_img">'.($level ? '<img src="'.$level.'">' : '').'</p></h2>
    				<time datetime="">'._messageShowTime($createTime).'</time>
    			</div>
    			<p class="call '.($isCurrentUser ? 'display_none' : '').'"><a href="#">私信</a></p>
    		</div>';
}

function buildChannelMessageFooter($space, $view, $channel, $likeNum, $hadLike) {
    $likeImg = $hadLike ? 'i/support_over.png' : 'i/support.png';
    return '<div class="map">
    			<p class="address">'.$space.'<span>'.$view.'阅读</span></p>
    		</div>
    		<div class="clearfix">
    			<p class="channel"><span>'.$channel.'❯</span></p>
    			<div class="interact ">
    				<p class="discuss fl"><img src="i/contents.jpg">评论</p>
    				<p class="click_num fr"><img src="'.$likeImg.'">'.$likeNum.'</p>
    			</div>
    		</div>';
}

function buildChannelMessageFooterForRetweet($channel) {
    return '<div class="clearfix">
    			<p class="channel"><span>'.$channel.'</span></p>
    		</div>';
}

function buildChannelMessageImgList($img) {
    $returnImgString = array();
    foreach ($img as $value) {
        $returnImgString[] = '<li><img src="'.$value.'!s150"></li>';
    }
    return implode(PHP_EOL, $returnImgString);
}

function _messageShowTime($time) {
    $_time = time () - $time;
    $returnStr = $_time / 60;
    if ($returnStr < 1) {
        return "刚刚发表";
    }
    if ($returnStr >= 1 and $returnStr < 60) {
        return floor ( $returnStr ) . '分钟前发表';
    }
    if ($returnStr >= 60 and $returnStr < 1440) {
        return date ( 'H:i', $time );
    }
    if ($returnStr >= 1440 and $returnStr < 43200) {
        return date ( 'm-d H:i', $time );
    }
    return date ( 'Y-m-d', $time );
}

function _retweetMessage($data) {
    if (!$data['messageInfo']['id']) return '';

    return '<div class="transpond">
    			<h4>转自<span class="transpond_name">'.$data['userInfo']['showName'].'</span></h4>
    			<pre>'.$data['messageInfo']['content'].'</pre>
    			<ul class="imglist">
    				'.buildChannelMessageImgList($data['messageInfo']['img']).'
    			</ul>
    			<!---转发样式结束---->
    			'.buildChannelMessageFooterForRetweet($data['messageInfo']['channelName']).'
    		</div>
    		<!---转发样式结束---->';
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
		<title><?php echo $data['userProfile']['name'];?>的个人主页</title>
		<link rel="stylesheet" type="text/css" href="../public/c/public.css" />
		<link rel="stylesheet" type="text/css" href="c/personal.css" />
		<script src="../public/j/jquery-1.9.1.min.js"></script>
		<script src="../public/j/fun.js"></script>
		<script src="j/tips.js"></script>
		<script>
			$(document).ready(function() {
				document.getElementsByTagName("html")[0].style.fontSize = document.documentElement.clientWidth / 10 + "px";
				tips();
			});
			function goBack() {
				if(window.history.length <= 2){
					window.location.href='/App/community/?_type=recommendHome&_id=0';
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
		<div class="personal">
			<?php 
			     echo buildPersonalInfo($data['userProfile'], $data['tagList']);
			?>
		</div>
		<div class="support_change">
		  <a href="supportList.php?_id=<?php echo $param['userId'];?>" class="support_it"><img src="i/support_over.png"><?php echo $data['likeListCountNum'] > 50 ? 50 : $data['likeListCountNum'] ;?>个人赞过<?php echo $isCurrentUser ? '我' : $sexString; ?></a>
		  <a href="#" class="call_it <?php echo $isCurrentUser ? 'display_none' : '';?>"><img src="i/message.png">私信<?php echo $sexString;?></a>
		</div>
		<div id="channel-message-list">
			<p class="dynamics"><?php echo $isCurrentUser ? '我的动态' : $sexString.'的动态'; ?></p>
			<?php 
    			foreach ($currentPagedata['list'] as $value) {
    			    switch ($value['messageType']) {
    			        case 1:
    			            echo buildChannelMessageObject($value, $isCurrentUser);
    			            break;
    			
    			        case 3:
    			            echo buildChannelPostObject($value, $isCurrentUser);
    			            break;
    			             
    			        case 2:
    			            echo buildChannelHongbaoObject($value, $isCurrentUser);
    			            break;
    			
    			        default:
    			            ;
    			            break;
    			    }
    			}
			?>
		</div>
		<div class="page_change">
    	  <?php 
    	      if ($param['page'] != 1) {
    	          echo '<a href="#" class="pev_page">上一页</a>';
    	      }
    	  ?>
    	  <?php 
    	      if ($hadNextPageData) {
    	          echo '<a href="#" class="next_page ">下一页</a>';
    	      }
    	  ?>
		</div>
		<div class="tips_box"></div>
	</body>
	
	<script type="text/javascript">
		$(function() {
			var page = GetQueryString('page');
			page = page ? page : 1;
			//上一页
			$('.pev_page').bind('click', function() {
				page--;
				window.location.href = 'index.php?_type=personalHome<?php echo $param['userId'] ? ('&_id='.$param['userId']) : '';?>&page=' + page;
			});
			//下一页
			$('.next_page').bind('click', function() {
				page++
				window.location.href = 'index.php?_type=personalHome<?php echo $param['userId'] ? ('&_id='.$param['userId']) : '';?>&page=' + page;
			});
		});

		function detail(msgId, msgType) {
			var currentUserId = getCookie('currentUserId');
			currentUserId = currentUserId ? currentUserId : 13865;
			if (msgType == 1) { //动态
				window.location.href = '/shareMessage/' + msgId + '/' + currentUserId + '?_type=timelineDetails&_id='+msgId;
			} else if (msgType == 2) { //红包
				window.location.href = '/shareHongBao/' + msgId + '/' + currentUserId + '?_type=envelopeDetails&_id='+msgId;
			} else if (msgType == 3) { //帖子
				window.location.href = '/sharePost/' + msgId + '/' + currentUserId + '?_type=postsDetails&_id='+msgId;
			} else {
				//暂不做处理
			}
		}
	</script>
	<script src="j/statistics.js"></script>

</html>