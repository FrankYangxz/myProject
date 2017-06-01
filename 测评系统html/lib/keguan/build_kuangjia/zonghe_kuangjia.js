//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、综合初中的 
if( $("#duoxuan_fenzhi_zong_chu").blur() && $("#duoxuan_shuliang_zong_chu").blur() && $("#danxuan_fenzhi_zong_chu").blur() && $("#danxuan_shuliang_zong_chu").blur() && $("#tiankong_fenzhi_zong_chu").blur() && $("#tiankong_shuliang_zong_chu").blur() && $("#wenda_fenzhi_zong_chu").blur() && $("#wenda_shuliang_zong_chu").blur() && $("#zhengming_fenzhi_zong_chu").blur() && $("#zhengming_shuliang_zong_chu").blur() ){
		$("#danxuan_fenzhi_zong_chu").blur(function(){
			yang();
		});
		$("#danxuan_shuliang_zong_chu").blur(function(){
			yang();
		});
		$("#duoxuan_fenzhi_zong_chu").blur(function(){
			yang();
		});
		$("#duoxuan_shuliang_zong_chu").blur(function(){
			yang();
		});
		$("#tiankong_fenzhi_zong_chu").blur(function(){
			yang();
		});
		$("#tiankong_shuliang_zong_chu").blur(function(){
			yang();
		});
		$("#wenda_fenzhi_zong_chu").blur(function(){
			yang();
		});
		$("#wenda_shuliang_zong_chu").blur(function(){
			yang();
		});
		$("#zhengming_fenzhi_zong_chu").blur(function(){
			yang();
		});
		$("#zhengming_shuliang_zong_chu").blur(function(){
			yang();
    		});
}
function yang(){
	//拿到十个值
		var duoFen = $('#duoxuan_fenzhi_zong_chu').val();
		var duoShu = $('#duoxuan_shuliang_zong_chu').val(); 
		var danFen = $('#danxuan_fenzhi_zong_chu').val();
		var danShu = $('#danxuan_shuliang_zong_chu').val();
		var tianShu = $('#tiankong_shuliang_zong_chu').val();
		var tianFen = $('#tiankong_fenzhi_zong_chu').val();
		var wenShu = $('#wenda_shuliang_zong_chu').val();
		var wenFen = $('#wenda_fenzhi_zong_chu').val();
		var zhengShu = $('#zhengming_shuliang_zong_chu').val();
		var zhengFen = $('#zhengming_fenzhi_zong_chu').val();
		//单个的综合，分值*数量
		$('.danxuan_zongfen_zong_chu').html(danFen * danShu); 	
		$('.duoxuan_zongfen_zong_chu').html(duoFen * duoShu);
		$('.tiankong_zongfen_zong_chu').html(tianFen * tianShu); 	
		$('.wenda_zongfen_zong_chu').html(wenFen * wenShu);
		$('.zhengming_zongfen_zong_chu').html(zhengFen * zhengShu);
		//分值，数量的总和
		$(".fenzhi_zong_chu").html( Number(danFen) + Number(duoFen) + Number(tianFen) + Number(wenFen) + Number(zhengFen) );
		$(".shuliang_zong_chu").html( Number(danShu) + Number(duoShu) + Number(tianShu) + Number(wenShu) + Number(zhengShu) );
		//总分
		$('.zongfen_zong_chu').html(Number(danFen) * Number(danShu) + Number(duoFen) * Number(duoShu) + Number(tianFen) * Number(tianShu) + Number(wenFen) * Number(wenShu) + Number(zhengFen) * Number(zhengShu));
}
