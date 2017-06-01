//底部的js代码不可外联，勿动！
		//顶部的轮播图
			 var swiper = new Swiper('.lunbo .swiper-container', {
		        pagination: '.lunbo .swiper-pagination',
		        paginationClickable: '.swiper-pagination',
		        spaceBetween: 30,
		        effect: 'fade',
		        loop:true,
		        autoplay: 3000,
		  });
//中间的3D轮播图
		    var swiper = new Swiper('.lunbo3D .swiper-container', {
		        pagination: '.lunbo3D .swiper-pagination',
		        effect: 'coverflow',
		        grabCursor: true,
		        centeredSlides: true,
		        slidesPerView: 'auto',
		        initialSlide :1,
		        coverflow: {
		            rotate: 50,
		            stretch: 0,
		            depth: 100,
		            modifier: 1,
		            slideShadows : true
		        }
		    });
//底部的平面轮播图
	    		var swiper = new Swiper('.vr_lunbo .swiper-container', {
		        pagination: '.vr_lunbo .swiper-pagination',
		        slidesPerView: 1.3,
		        centeredSlides: true,
		        paginationClickable: true,
		        spaceBetween: 15,
		        grabCursor: true,
		        initialSlide :1,
		    });