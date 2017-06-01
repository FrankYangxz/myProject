var myScroll;
var pullDownFlag = 0;
var pullUpFlag = 0;

var $pullDownHeight = $("#pullDown").height();
var $pullUpHeight = $("#pullUp").height();
function loaded(){
	//实例化
	myScroll = new IScroll("#wrapper",{
			/*需要使用iscroll-probe.js才能生效
			 * probeType：1  滚动不繁忙的时候触发
			probeType：2  滚动时每隔一定时间触发
			probeType：3  每滚动一像素触发一次*/
			probeType: 3,
			//        momentum: false,//关闭惯性滑动
			mouseWheel: true, //鼠标滑轮开启
			scrollbars: true, //滚动条可见
			fadeScrollbars: true, //滚动条渐隐
			interactiveScrollbars: true, //滚动条可拖动
			shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
			useTransform: true, //CSS转化
			useTransition: true, //CSS过渡//iphone下面打开，解决闪屏问题
			bounce: true, //反弹,否则不能进行上下滚动
			freeScroll: false, //只能在一个方向上滑动
			startX: 0,
			startY: 0,
	});
	//实现功能
	//判断我们当前滚动条所在的位置
	myScroll.on("scroll",positionJudge);
	//结束滚动需要执行的事件
	alert(aaaaaaa);
	myScroll.on("scrollEnd",action);
}





function positionJudge(){
	//通过this.y来判断当前滚动条的位置
//	console.log(this.y);
	
	if(this.y > $pullDownHeight){
		$("#pullDown").html("松开刷新页面");
		pullDownFlag = 1;
	}else if(this.y < (this.maxScrollY - $pullUpHeight)){
		$("#pullUp").html("松开加载数据");
		pullUpFlag = 1;
	}
}

function action(){
	alert(1)
	if(pullDownFlag == 1){
//		alert("ok")
		pullDownAction();
		$("#pullDown").html("下拉刷新");
		pullDownFlag = 0;
	}else if(pullUpFlag == 1){
		pullUpAction();
		$("#pullUp").html("上拉加载");
		pullUpFlag = 0;
	}
}

/**
 * 下拉刷新执行函数
 */
function pullDownAction(){
	setTimeout(function(){
		window.location.reload();
		//更新我们的滚动区域
		myScroll.refresh();
	},1000);
}

/**
 * 上拉加载执行函数
 */
function pullUpAction(){
//	setTimeout(function(){
//		for (var i = 0; i < 10; i++) {
//			$("#list").append("<li>我是测试数据"+i+"</li>")
//		}
		loadData();
		//更新我们的滚动区域
		myScroll.refresh();
//	},1000);
}

function loadData(){
	$.ajax({
		"url":"http://datainfo.duapp.com/shopdata/getGoods.php?callback=",
		"dataType":"JSONP",
		beforeSend:function(){
			$("#loading").show();
		},
		success:function(data){
			$("#loading").hide();
			console.log(data)
		}
	})
}
