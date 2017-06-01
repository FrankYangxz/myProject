$('.s_title h2').click(function(){
	var index = $(this).index();
	$(this).addClass("on").siblings().removeClass("on");
	if ( index == 0) {
		$('.chuzhong').css({"display":"block"});
		$('.gaozhong').css({"display":"none"});
	} else{
		$('.chuzhong').css({"display":"none"});
		$('.gaozhong').css({"display":"block"});
	}
	
})

$(".formatter a").on("click",function(){
	$(this).addClass("on").siblings().removeClass("on");
});
//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、初中的 
if( $("#duoxuan_fenzhi_chu").blur() && $("#duoxuan_shuliang_chu").blur() && $("#danxuan_fenzhi_chu").blur() && $("#danxuan_shuliang_chu").blur() ){
	$("#danxuan_fenzhi_chu").blur(function(){
		chu();
	});
	$("#danxuan_shuliang_chu").blur(function(){
		chu();
	});
	$("#duoxuan_fenzhi_chu").blur(function(){
		chu();
	});
	$("#duoxuan_shuliang_chu").blur(function(){
		chu();
	});
}
function chu(){
	var danFen = $('#danxuan_fenzhi_chu').val();
	var danShu = $('#danxuan_shuliang_chu').val();
	var duoFen = $('#duoxuan_fenzhi_chu').val();
	var duoShu = $('#duoxuan_shuliang_chu').val(); 
	$('.danxuan_zongfen_chu').html(danFen * danShu); 	
	$('.duoxuan_zongfen_chu').html(duoFen * duoShu);
	$(".fenzhi_chu").html( Number(danFen) + Number(duoFen) );
	$(".shuliang_chu").html( Number(danShu) + Number(duoShu) );
	$('.zongfen_chu').html(Number(danFen) * Number(danShu) + Number(duoFen) * Number(duoShu));
}


