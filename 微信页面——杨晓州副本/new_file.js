function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (userAgent.indexOf("Chrome") > -1){
	  return "Chrome";
	 }
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
var mb = myBrowser();
if ("IE" == mb) {
    $(".step_bar").css("top","34px");
}
if ("Chrome" == mb) {
  $(".step_bar").css("top","34px");
  $(".box").css("background","#007AFF");
}
