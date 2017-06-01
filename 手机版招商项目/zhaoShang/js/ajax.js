//发送
function OAJAX ( oUrl , oData , oSuccessCallBack , oErrorCallBack ){
	$.ajax({
		type:"post",
		url:"http://refertest.nashwork.com:8001/?"+oUrl,
		data:oData,
		dataType: "jsonp",
		success:function ( Data ){
			oSuccessCallBack( Data );
		},
		error:function( Data ){
			oErrorCallBack( Data );
		}
	});
}
//获取
function getAjax( oUrl, oData , getSuccess , getDefault ){
	$.ajax({
		type:"get",
		url:"http://refertest.nashwork.com:8001/?"+oUrl,
		data:oData,
		dataType:"jsonp",
		async:false,
		success:function(data){
			getSuccess(data);
		},
		error:function(){
			getDefault();
		}
	});
}
