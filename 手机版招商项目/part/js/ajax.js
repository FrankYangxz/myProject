//发送
function OAJAX ( oUrl , oData , oSuccessCallBack , oErrorCallBack ){
	$.ajax({
		type:"post",
		url:"http://refertest.nashwork.com:8001/?"+oUrl,
		data:oData,
		timeout:5000,
		dataType: "jsonp",
		success:function ( Data ){
			oSuccessCallBack( Data );
		},
		error:function( XMLHttpRequest,status ){
			if(status=='timeout'){ 
	　　　　　 	 alert("超时");
	　　　　	}else{
				oErrorCallBack();
			}
		}
	});
}
//获取
function getAjax( oUrl, oData , getSuccess , getDefault ){
	$.ajax({
		type:"get",
		url:"http://refertest.nashwork.com:8001/?"+oUrl,
		data:oData,
		timeout:5000,
		dataType:"jsonp",
		async:false,
		success:function(data){
			getSuccess(data);
		},
		error:function( XMLHttpRequest,status ){
			if(status=='timeout'){ 
	　　　　　 	 alert("超时");
	　　　　	} else {
				oErrorCallBack();
			}
		}
	});
}
$(".backImg").on("click",function(){
	window.history.go(-1);
})