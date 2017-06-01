var oNav = document.getElementById( 'nav' );
var timer = setInterval( fn , 1000 );
fn();
function fn()
{
	var nowDate = new Date();
//	var endDate = new Date( 2016,9,24,12,22,00 );
	var endDate = new Date( 2016,8,25);
	var lastTime =endDate.getTime() - nowDate.getTime();

	var oSecond = parseInt( lastTime/1000 )%60;
	var oMinute = parseInt( lastTime/1000/60 )%60;
	var oHour = parseInt( lastTime/1000/60/60 );   //23.5(小时)  -->  23小时30分钟
	var oDay = parseInt(oHour/24)
	function clock( n )
	{
		if( n < 10 )
		{
			n = '0' + n;
		}
		return n;
	}
	
	if( lastTime <= 0 )
	{
		clearInterval( timer );
		oHour = 0;
		oMinute = 0;
		oSecond = 0;
	}
	oNav.innerHTML = '倒计时：' + clock(oDay) + '天';
//	oNav.innerHTML = '抢购还有：' + clock(oHour) + '时' + clock(oMinute) + '分' + clock(oSecond) + '秒';
	
}