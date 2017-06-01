$(document).ready(function(){
	//封装计时器
	function fClock( $deadline , $dom ){
		var $atimer = setInterval(again,1000);
		again();
		function again(){
			var $nowDate = new Date();
			//var $endDate = new Date(2016,5,30,18,00,00);
			var $lastTime = $deadline.getTime() - $nowDate.getTime();
			
			var $second = parseInt( $lastTime/1000 )%60;
			var $minute = parseInt( $lastTime/1000/60 )%60;
			var $hour = parseInt( $lastTime/1000/60/60 );
			
			if( $lastTime <= 0 ){
				clearInterval( $atimer );
				$hour = 0;
				$minute = 0;
				$second = 0;
			}
			function fn( n ){
				if( n < 10 ){
					n = '0' + n;
				}
				return n;
			}
			//在这里可以显示时分秒
//			$dom.html( fn($hour)+'时'+fn($minute)+'分'+fn($second)+'秒');
			$dom.html('倒计时：'+ parseInt(fn($hour)/24)+'天');
		}
	}
	
	//调用函数
//			fClock( new Date(2016,9,25,18,00,00) , $('#nav') );
	//     设置截止时间，设置倒计时现实的位置$('#nav')
	fClock( new Date(2016,9,25) , $('#nav') );
   
})