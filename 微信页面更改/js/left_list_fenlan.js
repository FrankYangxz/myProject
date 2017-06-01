
$('#obig').on('click',function(){
	$('.fenlan').animate({'left':'0'},200)
	console.log(1)
})


$('.touming').on('click',function(){
	$('.fenlan').animate({'left':'-100vw'},200);
	$('#obig').css('display','block');
})

$('.list02 li').on('click',function(){
	$(this).addClass('afetrclick').siblings().removeClass('afetrclick')
})