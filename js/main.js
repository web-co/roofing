$(document).ready(function(){
	init();
});

function init() {
	var tm = TweenMax,
	$body = $('body'),
	$window = $(window),
	$footer = $('footer');

	footerPos();

	$('.disabled').on('click', function(event) { event.preventDefault(); });

	$window.on('resize', function() {
		footerPos();
	});

	function footerPos() {
		if ($window.height() > $body.height()) { $footer.addClass('fixed_footer'); }
		else { $footer.removeClass('fixed_footer'); }
	}

	$.fn.dialog = function() {
		var $this = $(this),
		$dialogWrapper = $('.dialog_wrapper'),
		$dialog = $('.dialog'),
		$dialogBg = $('.dialog_bg'),
		$dialogClose = $('.dialog_close'),
		wPosSet = $window.scrollTop(),
		wPosGet = $body.attr('data-scroll');
		$dialogWrapper.show();
		$dialogBg.show();
		$this.show();
		$body.addClass('dialog_opened');
		$body.css('top', - wPosSet+'px');
		$body.attr('data-scroll', wPosSet);
		if ($this.height() > $dialogWrapper.height()) {	$body.addClass('dialog_scrollable'); } else { $body.addClass('dialog_scrollable'); }
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { $body.addClass('dialog_scrollable_mobile'); }
		$dialogClose.on('click', function() {
			$dialog.hide();
			$dialogBg.hide();
			$dialogWrapper.hide();
			$body.removeClass('dialog_opened', 'dialog_scrollable_mobile');
			$window.scrollTop(wPosSet);
		});
	};

	$.fn.toast = function() {
		var $this = $(this),
		tl = new TimelineMax();
		if (!$this.hasClass('active')) {
			tl.fromTo($this, 0.3, {display: 'none', y: '100%', autoAlpha: 0}, {display: 'block', y: '0%', autoAlpha: 1, ease: Back.easeOut}).
			to($this, 0.3, {display: 'none', y: '100%', autoAlpha: 0, ease: Back.easeIn, delay: 3, onComplete: function() { $this.removeClass('active'); }});
		}
		$this.addClass('active');
	};

	$('.validate_form').each(function() {
		var $this = $(this),
		$validate = $this.find('.validate'),
		$validateEmail =  $this.find('.validate_email'),
		$validateTel = $this.find('.validate_tel'),
		$validatePass = $this.find('.validate_pass'),
		$validatePassConfirm = $this.find('.validate_pass_confirm'),
		$validateCaptcha = $this.find('.validate_captcha'),
		$validateCaptchaImg = $this.find('.validate_captcha_img'),
		checkEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
		checkTel =  /[0-9 -()+]+$/,
		randCaptcha = Math.floor(Math.random() * 9),
		arrayCaptcha = [ 08532, 20864, 38204, 42032, 49146, 59749, 60880, 67185, 68880 ];

		$validateCaptchaImg.attr('src', '../img/captcha/captcha_'+randCaptcha+'.png');

		$this.on('submit', function() {
			var error = '',
			passValue = $validatePass.val(),
			passConfirmValue = $validatePassConfirm.val();
			$validate.each(function() {
				var	value = $(this).val();
				checking(value.length === 0, $(this));
			});
			$validateEmail.each(function() {
				var	value = $(this).val();
				checking(checkEmail.test(value) === false, $(this));
			});
			$validateTel.each(function() {
				var	value = $(this).val();
				checking(value.length < 7 || (!checkTel.test(value)), $(this));
			});
			$validatePass.each(function() {
				checking(passValue === '' || passValue.length <= 6, $(this));
			});
			$validatePassConfirm.each(function() {
				checking(passValue != passConfirmValue || passValue === '', $(this));
			});
			$validateCaptcha.each(function() {
				var	value = $(this).val();
				checking(value != arrayCaptcha[randCaptcha], $(this));
			});
			function checking(check, $this) {
				if (check) { error++; $this.addClass('validate_error'); } else { $this.removeClass('validate_error'); }
			}
			if (error) {
				$('.error.toast').toast();
				return false;
			}
		});
	});

    /* var navMob = ($(window).width() <= 768) ? true : false;

    $(window).on('scroll', function () {
        var pos = $body.scrollTop(),
            headerHeight = $('.header').height() - $('.navigation').height(),
            checkWidth = ($(window).width() <= 992) ? true : false;

        if (pos >= headerHeight && checkWidth != true) {
            $('.header').addClass('fixed');
        } else {
            $('.header').removeClass('fixed');
        }
    }); */



	$('.testimonials_carousel').owlCarousel({
		singleItem: true,
		pagination: true,
        /* navigation: navMob, */
        touchDrag : false
	});
    $('.map_image').maphilight({
        stroke: false,
        //strokeColor: 'fee624',
        fillColor: 'fee624'

    });
	/* $('.header_main_menuBtn').on('click', function () {
		$('.navigation').slideToggle();
	}); */
   

	function addSlider() {

		if ($(window).width() <= 768) {
			$('.works_box').owlCarousel({
				singleItem: true,
                navigation : true,
                touchDrag : true
			});
		}
	}
	addSlider();
	$(window).resize(function () {
		addSlider();
	});

	$('.faq_block li > a').on('click', function (e) {
        e.preventDefault();

			 $('.faq_block li > div').slideUp();
			  $('.faq_block > li').removeClass('isOpen');

			 if (  $(this).next('div').is(':visible') ) {
				 $(this).next('div').slideUp();
			 } else {
			 	$(this).next('div').slideDown();
				$(this).parent('li').addClass('isOpen');
			 }

    });
	
	$('.logos_carousel').owlCarousel({
				autoHeight: true,
				items:4,
				loop:true,
				autoPlay: true,
				autoplayTimeout:500,
				autoplayHoverPause:false,
				autoWidth: true,
				responsive:{
					0:{
						items:1
					},
					600:{
						items:3
					},
					1000:{
						items:4
					}
				}
		});



    var sync1 = $(".gallery_slider_viewport");
    var sync2 = $(".gallery_slider_controls");
    var ctrls = ($(window).width() <= 550) ? true : false;
    sync1.owlCarousel({
        singleItem : true,
        slideSpeed : 1000,
        paginationNumbers: true,
        pagination: ctrls,
        navigation: ctrls,
        navigationText: ['&lsaquo;','&rsaquo;'],
        afterAction : syncPosition,
        responsiveRefreshRate : 200
    });
    sync2.owlCarousel({
        items : 7,
        itemsDesktop      : [1199,7],
        itemsDesktopSmall     : [979,6],
        itemsTablet       : [768,4],
        itemsMobile       : [479,2],
        pagination:false,
        navigation: true,
        navigationText: ['&lsaquo;','&rsaquo;'],
        responsiveRefreshRate : 100,
        afterInit : function(el){
            el.find(".owl-item").eq(0).addClass("synced");
        }
    });
    function syncPosition(el){
        var current = this.currentItem;
        sync2
            .find(".owl-item")
            .removeClass("synced")
            .eq(current)
            .addClass("synced");
        if(sync2.data("owlCarousel") !== undefined){
            center(current)
        }
    }
    sync2.on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).data("owlItem");
        sync1.trigger("owl.goTo",number);
    });

    function center(number){
        var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
        var num = number;
        var found = false;
        for(var i in sync2visible){
            if(num === sync2visible[i]){
                var found = true;
            }
        }

        if(found===false){
            if(num>sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", num - sync2visible.length+2)
            }else{
                if(num - 1 === -1){
                    num = 0;
                }
                sync2.trigger("owl.goTo", num);
            }
        } else if(num === sync2visible[sync2visible.length-1]){
            sync2.trigger("owl.goTo", sync2visible[1])
        } else if(num === sync2visible[0]){
            sync2.trigger("owl.goTo", num-1)
        }

    }


    var trigger = $('.gallery_slider_viewport').find('.owl-buttons');

    function checkCurSlide() {
        var lengthNumbers = $('.gallery_slider_viewport').find('.owl-page').length;
        var curNumber = $('.owl-page').filter('.active').find('.owl-numbers').html();
        var newStr = '<div>' + curNumber + ' of ' + lengthNumbers + '</div>';
        $('.controls_mobile').html(newStr)
    }
    checkCurSlide();
    trigger.on('click', function () {
        checkCurSlide();
    });

    $('.approach_list').find('li:has(.approach_list_more)').find('.approach_list_head').addClass('hasContent').on('click', function () {
        $(this).next('div').slideToggle();
    });
	
	
	/* if ($(window).width() >= 992) {
        $('.navigation').find('li').hover(
            function() {
                tm.to($(this).find('ul'), 0.3, {autoAlpha: 1, display: 'block'})
            },
            function() {
                tm.to($(this).find('ul'), 0.3, {autoAlpha: 0, display: 'none'})
            }
        );
    } else {
    	$('.navigation').find('li:has(ul) > a').on('click', function(e) {
				e.preventDefault();
				$('.navigation').find('li ul').slideUp();
				if ($(this).next('ul').is(':visible')) {
					$(this).next('ul').slideUp();
				} else {
					$(this).next('ul').slideDown();
				}
			})
    }; */
	
	//TOGGLE MENU TOP
  $(".tcon-menu--xcross").on('click', function(){
	  $(".menu_top").toggleClass('visible');
	  $('body').toggleClass('fixed');
  });

  
  $(document).mouseup(function (e){ 
        var div = $('.navigation .wrapper'); 
        if (!div.is(e.target) 
            && div.has(e.target).length === 0) {
            $(".menu_top").removeClass('visible');
			$(".tcon-menu--xcross").removeClass('tcon-transform');
			$('body').removeClass('fixed');
        }
    });
	
	 $('.header_main_locationBtn').on('click', function () {
        $('.service-area').slideToggle();
    }); 
	$(document).mouseup(function (e){ 
        var div = $('.header_main_locationBtn'); 
        if (!div.is(e.target) 
            && div.has(e.target).length === 0) {
            $(".service-area").slideUp();
        }
    });
	
	  $('.menu_top').find('li:has(ul) > a').on('click', function(e) {
				e.preventDefault();
				$('.menu_top').find('li ul').slideUp();
				if ($(this).next('ul').is(':visible')) {
					$(this).next('ul').slideUp();
				} else {
					$(this).next('ul').slideDown();
				}
			})
	  
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.scroll').fadeIn("slow");
        } else {
            $('.scroll').fadeOut("slow");
        }
    });
    $('.scroll').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

}
