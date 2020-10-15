jQuery(document).ready(function() {
	faq();
	quickTopBtn(); 
	//topBanner(); 
	mainBanner();
	//reviewMore();
	/*lectureListen();*/
	lectureLayer();
	popupS();
	customSelect();
	cropS();
	minH();
});

	
jQuery(document).on("click",function(){

});

jQuery(window).resize(function(){

});

jQuery(window).load(function(){
	titleS();
	menuS();
});
jQuery(window).scroll(function(){
	
	thisH = jQuery(document).scrollTop(); 
	mBannerH = jQuery(".topBanner").outerHeight();
	//console.log(thisH);
	if(jQuery("body").hasClass("mBanner")){
		if(thisH > mBannerH){
			jQuery("#header.main").addClass("mBanner");
			jQuery("#container").addClass("mBanner");			
		}else{
			jQuery("#header.main").removeClass("mBanner");
			jQuery("#container").removeClass("mBanner");			
		}
	}else{
		jQuery("#header.main").removeClass("mBanner");
		jQuery("#container").removeClass("mBanner");
	}
	/*
	if(thisH > 80){
		jQuery("body").addClass("mBanner");
	}else{
		jQuery("body").removeClass("mBanner");
	}
	*/
});

function minH(){
	
	windowH = jQuery(window).height();
	htmlH = jQuery("html").height() ;
	conH =  jQuery("#container.sub .containerIn").css("padding-bottom");
	headerH = jQuery(".topLayout").outerHeight() + jQuery(".subVisual").outerHeight() + jQuery("#footer").outerHeight();
	minH = windowH - headerH - parseInt(conH);
	
/*	console.log( "topLayout : " + jQuery(".topLayout").outerHeight() + "px" );
	console.log( "subVisual : " + jQuery(".subVisual").outerHeight() + "px" );
	console.log( "footer : " + jQuery("#footer").outerHeight() + "px" );
	console.log( "container.sub .containerIn : " + jQuery("#container.sub .containerIn").css("padding-bottom") + "px" );*/
	
	if(minH < windowH){
		jQuery("#container.sub .containerIn").css("min-height", minH + "px");
	}
	
	jQuery(window).resize(function(){
		windowH = jQuery(window).height();
		htmlH = jQuery("html").height() ;
		conH =  jQuery("#container.sub .containerIn").css("padding-bottom");
		headerH = jQuery(".topLayout").outerHeight() + jQuery(".subVisual").outerHeight() + jQuery("#footer").outerHeight();
		minH = windowH - headerH - parseInt(conH);
		
		if(minH < windowH){
			jQuery("#container.sub .containerIn").css("min-height", minH + "px");
		}else{
			
		}
		
	});
}
function menuClone(){
	jQuery(".topNavIn > ul > li > ul").each(function(){
		if(jQuery(this).parent().hasClass("last")){
			
		}else{
			var cloneN = jQuery(this).siblings("a").clone().attr("href","javascript:void(0);");
			jQuery(this).prepend("<li class='cloneN'>" + "</li>");
			jQuery(this).find(".cloneN").html(cloneN).hide();
			jQuery(this).find(".cloneN").click(function(){
				jQuery(".topNavIn > ul").removeClass("active");
				jQuery(".topNavIn > ul > li > ul").fadeOut(300);
			});
		}
	});	
}

function titleS(){
	var urlName = location.href; 
	if(urlName.indexOf("index.html") > -1){
		document.title = "30MINUTES";
	}else if(urlName.indexOf("myclip_") > -1){
		//document.title = "�섏쓽 �� | MYCLIP | �낆쭊�쏀겕鍮�";
		jQuery("#header.main .topNavIn > ul > li").eq(5).addClass("on");
	}else if(urlName.indexOf("eco_") > -1){
		jQuery("#header.main .topNavIn > ul > li").eq(1).addClass("on");
	}else if(urlName.indexOf("event_") > -1){
		jQuery("#header.main .topNavIn > ul > li").eq(2).addClass("on");
	}else if(urlName.indexOf("coulmn_") > -1){
		jQuery("#header.main .topNavIn > ul > li").eq(2).addClass("on");
	}else if(urlName.indexOf("support_") > -1){
		jQuery("#header.main .topNavIn > ul > li").eq(4).addClass("on");
	}
}


jQuery(window).load(function(){
	jQuery(window).on( 'resize', createSlick );
});
	
function lectureLayer(){
	if(jQuery("body").find(".lectureLayer").length){
		pageW = jQuery("body").innerWidth();
		windowH = jQuery(window).height();
		pageH = jQuery("body").height();

		if(pageH > windowH){
			pageW = pageW+17;
		}else{
			pageW = pageW;
		}
		
		if(pageW > 1199){

		}else{

		}
		
		jQuery(window).resize(function(){	
			if(pageH > windowH){
				pageW = pageW+17;
			}else{
				pageW = pageW;
			}
			if(pageW > 1199){
		
			}else{

			}
		});

		jQuery(window).scroll(function(){
			if(pageH > windowH){
				thisH = jQuery(document).scrollTop(); 
				/*footerH = jQuery(".sub_footer").offset().top;*/
				footerH = jQuery("#footer").offset().top;
				winH = jQuery(window).height();
				headerH = jQuery("#header").outerHeight();
				topBannerH = jQuery(".topBanner").outerHeight();
				//nowH = jQuery(".sub_footer").outerHeight() + jQuery(".lectureLayer").outerHeight() + jQuery("#header.main").height() + jQuery("#footer").outerHeight() + 98 ; 
				//console.log("footerH = " + footerH + "px" );
				//console.log("thisH = " + thisH + "px" );
				//console.log("winH = " + winH + "px" );
				//console.log( jQuery(".lectureLayer").outerHeight() );
				//sumH = (thisH+winH)-headerH-96;

				if(jQuery("body").hasClass("mBanner")){
					if( thisH >= footerH-(106+headerH+31+jQuery(".lectureLayer").outerHeight())){
						jQuery(".lectureBoxR").addClass("active").css({
							"top"      :     footerH-(116+headerH+topBannerH+31+jQuery(".lectureLayer").outerHeight()) + "px"
						});											
					}else{
						jQuery(".lectureBoxR").removeClass("active").css("top","0");
					}
				}else{
					if( thisH >= footerH-(106+headerH+jQuery(".lectureLayer").outerHeight())){
						jQuery(".lectureBoxR").addClass("active").css({
							"top"      :     footerH-(116+headerH+jQuery(".lectureLayer").outerHeight()) + "px"
						});												
					}else{
						jQuery(".lectureBoxR").removeClass("active").css("top","0");
					}
				}
			}		
		});
	}
}


function menuS(){
	pageW = jQuery("body").innerWidth();
	windowH = jQuery(window).height();
	pageH = jQuery("body").height();
	
	if(jQuery("body").find(".topBanner").css("display") == "block"){
		jQuery("body").addClass("banner");
	}
	
	if(pageH > windowH){
		pageW = pageW+17;
	}else{
		pageW = pageW;
	}
	
	if(pageW > 1199){
		jQuery("body").addClass("pc");
	}else{
		jQuery("body").addClass("mob");
	}

	jQuery(window).resize(function(){
		pageW = jQuery("body").innerWidth();
		windowH = jQuery(window).height();
		pageH = jQuery("body").height();
		
		if(pageH > windowH){
			if(jQuery("body").hasClass("active")){
				pageW = pageW;
			}else{
				pageW = pageW+17;
			}
		}else{
			pageW = pageW;
		}
		
		if(pageW > 1199){
			jQuery("body").removeClass("mob").removeClass("active").addClass("pc");
			jQuery("#header.main .topNavIn > ul").removeClass("active");
			jQuery(".topNav").css("height","40px");
			/*
			jQuery("#header.main .topNavIn > ul > li > ul").css({
				"top" : "40px",
				"display" : "none"
			});
			*/
			jQuery("#header.main .topNavIn > ul > li > ul").hide().css("top","40px");
		}else{
			jQuery("body").removeClass("pc").addClass("mob");
			jQuery(".topAllMenuBox").hide();
			jQuery("#header.main .topLayout .topLayoutIn .topAllMenu").removeClass("active");
			jQuery(".topNav").css("height","100%");
		}
	});

	jQuery(document).on('click',".mob .topLayout .hamburger",function(){
		if(jQuery("body").hasClass("active")){
			jQuery("body").removeClass("active");
		}else{
			jQuery("body").addClass("active");
			jQuery(".bg_trans").fadeIn(699);
		}
	});

	jQuery(document).on('click',"body.active .bg_trans",function(e){
		jQuery("#header.main .topNavIn > ul").removeClass("active");
		jQuery("body").removeClass("active");
		jQuery(this).hide();
	});
	
	jQuery(document).on('click',".mob #header.main .topNavIn > ul > li > a",function(e){

	});
	
	jQuery(document).on('mouseenter',".pc #header.main .topNavIn > ul > li",function(e){
		jQuery(this).addClass("active");
		jQuery(this).children("ul").show();
	});

	jQuery(document).on('mouseleave',".pc #header.main .topNavIn > ul > li",function(e){
		jQuery(this).removeClass("active");
		jQuery(this).children("ul").hide();
	});
	
	jQuery(document).on('focus',".mob #header.main .topLayout .topLayoutIn .search input",function(e){
		jQuery(this).parent().parent().addClass("active");
	});
	
	jQuery(document).on('blur',".mob #header.main .topLayout .topLayoutIn .search input",function(e){
		jQuery(this).parent().parent().removeClass("active");
	});	
	
	jQuery(document).on('click',".pc .topAllMenu",function(){
		/*
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(".topAllMenuBox").fadeOut(499);
		}else{
			$(this).addClass("active");
			$(".topAllMenuBox").fadeIn(499);
		}
		*/
		jQuery(this).addClass("active");
		jQuery(".topAllMenuBox").fadeIn(499);
	});
	jQuery(document).on('click',".pc .topAllMenuClose",function(){
		jQuery(this).removeClass("active");
		jQuery(".topAllMenuBox").fadeOut(499);
	});

	jQuery(document).on('click',".mob .topNavIn > ul > li > a",function(e){
		if(jQuery(this).parent().hasClass("last")){
			
		}else{
			e.preventDefault();
			var listN = jQuery(this).parent().index();
			jQuery(this).closest("ul").addClass("active");
			jQuery(this).siblings("ul").show();
			jQuery(this).siblings("ul").find(".cloneN").show();
			jQuery(this).siblings("ul").css("top",(-listN*100)+(-listN*2)+"%");
		}
	});

}

function reviewMore(){
	jQuery(".reviewMore").click(function(){
		jQuery(this).parent(".info").removeClass("ellipsis");
	});
}

//mainBanner
function mainBanner(){
	jQuery('.mainBanner .slickSlider').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		arrows : true,
		dots : false,
		fade : true,
		speed : 1500,
		pauseOnHover:false,
		pauseOnFocus: false,
		touchThreshold : 1000,
		
	}).slick("slickPause");

	setTimeout(function() {
		jQuery('.mainBanner .slickSlider').slick("slickPlay");
	},1500);
	
	
	var listN = jQuery(".mainBanner .slickSlider .slick-slide").length;
	var cloneN = jQuery(".mainBanner .slickSlider .slick-cloned").length;
	var listN = (listN - cloneN);
	
	jQuery(".mainBanner").append("<ul class='mainBannerAni'></ul>");
	for ( var i=0; i < listN; i++){
		jQuery(".mainBanner .mainBannerAni").append("<li></li>");
	}

	jQuery(".mainBannerAni li").eq(0).addClass("ani");

	jQuery(".mainBanner .slickSlider").on("beforeChange", function(event, slick, currentSlide){
		//jQuery(".slickNum .now").text("0" + parseInt(slick.currentSlide + 1));
		//jQuery(".slickNum .max").text(' / 0' + slick.slideCount);
		//console.log("slideCount" + slick.slideCount);
		jQuery(".mainBannerAni li").removeClass("ani");
		jQuery(".mainBannerAni li").removeClass("active");
		jQuery(".mainBannerAni li").eq(slick.currentSlide).addClass("active");
	});	
}
function myclipBest(){
	jQuery('.myclip_best .slickSlider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		speed:1000,
		arrows : true,
		dots : false,
		pauseOnHover:false,
		pauseOnFocus: false,
		//centerMode: true,
		//variableWidth: true,
		responsive: [
			{
				breakpoint: 820, 
				settings: {
					slidesToShow:2,
					slidesToScroll:1
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow:1,
					slidesToScroll:1
				}
			}
		]
	});
}

//topBtn
function quickTopBtn(){
	jQuery(window).scroll(function(){
		var scrollValue = jQuery(document).scrollTop(); 
		if(scrollValue > 150){
			jQuery(".toQuickBtn").fadeIn(300);
		}else{
			jQuery(".toQuickBtn").fadeOut(300);
		}
	});
	
	jQuery(".toTopBtn").click(function(){
		jQuery("html,body").animate({scrollTop:0},350);
	});	
}

function cropS(){
	jQuery(".cropImg").each(function () {
		cropH =  jQuery(this).parent().height();
		imgLink = 'url(' + jQuery(this).attr('src') + ')',
		cropBox = jQuery('<div class="cropBox"></div>');

		jQuery(this).hide();
		jQuery(this).parent().prepend(cropBox);

		cropBox.css({
		  'height'                : cropH,
		  'background-image'      : 'url(' + jQuery(this).attr('src') + ')',
		  'background-size'       : 'cover',
		  'background-repeat'     : 'no-repeat',
		  'background-position'   : '50% 50%',
		  'filter'                : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" +  jQuery(this).attr('src') + ",sizingMethod='scale')",
		  '-ms-filter'            : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +  jQuery(this).attr('src') + "',sizingMethod='scale')",
		});		
	});

	jQuery(window).resize(function(){
		jQuery(".cropImg").each(function(){
			cropH =  jQuery(this).parent().height();
			jQuery(this).siblings(".cropBox").css({
			  'height'                : cropH,
			});
		});
	});
}

function lectureListen(){
	jQuery('.lectureToget .lectureListen').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: '.lectureToget .lecture-prev', //prev 踰꾪듉
		nextArrow: '.lectureToget .lecture-next', //netx 踰꾪듉
		customPaging: function (slider, i) {
			return slider.slickCurrentSlide + '/' + (i + 1);
		},
		
		responsive: [
			{
				breakpoint: 820, 
				settings: {
					slidesToShow:2,
					slidesToScroll:2
				}
			},
			{
				breakpoint: 560,
				settings: {
					slidesToShow:1,
					slidesToScroll:1
				}
			}
		]
	});
	
	var listNum = jQuery(".lectureToget .lectureListen .slick-slide").length;
	var listNum = listNum - jQuery(".lectureToget .lectureListen .slick-cloned").length;
	
	jQuery(".lectureToget .lectureBtn .now").text("1");
	jQuery(".lectureToget .lectureBtn .max").text(Math.ceil(listNum/3));
	
	jQuery(".lectureToget .lectureListen").on("init", function(event, slick){
		var num = jQuery(".lectureToget .lectureListen .slick-current.slick-active").attr("data-slick-index");
		jQuery(".lectureToget .lectureBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		jQuery(".lectureToget .lectureBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
	jQuery(".lectureToget .lectureListen").on("afterChange", function(event, slick, currentSlide){
		var num = jQuery(".lectureListen .slick-current.slick-active").attr("data-slick-index");
		jQuery(".lectureToget .lectureBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		jQuery(".lectureToget .lectureBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
}

function faq(){
	jQuery(".lectureQue a").click(function(){
		var lectureQue = jQuery(this).siblings(".lectureQueInfo").css("display");
		if(lectureQue == "none"){
			jQuery(this).siblings(".lectureQueInfo").slideDown(300);
	   }else{
			jQuery(this).siblings(".lectureQueInfo").slideUp(300);
	   }		
	});
	
	jQuery(".chapter a").click(function(){
		var chapter = jQuery(this).siblings(".chapter_content").css("display");
		if(chapter == "none"){
			jQuery(this).addClass("active");
			jQuery(this).siblings(".chapter_content").slideDown(300);
	   }else{
			jQuery(this).removeClass("active");
			jQuery(this).siblings(".chapter_content").slideUp(300);
	   }		
	});
}


function checkboxAll(){	
	jQuery(".inputList input[type=checkbox]").click(function(){
		var chkNum = jQuery(this).parent().siblings().find("input[type=checkbox]");
		if(jQuery(this).hasClass("checkboxAll") == true){
			/* checkbox �꾩껜�좏깮 */
			if(jQuery(this).is(":checked") == true){
				chkNum.prop("checked",true);
				jQuery(this).siblings().html("�꾩껜�댁젣");
			}else{
				chkNum.prop("checked",false);
				jQuery(this).siblings().html("�꾩껜�좏깮");
			}
		}else{
			/* checkbox �꾩껜�좏깮 �щ� */
			if(chkNum.length == chkNum.filter(":checked").length+1){
				chkNum.closest(".checkboxAll").prop("checked",true);
				chkNum.closest(".checkboxAll").prop("checked",true); jQuery(this).parent().siblings().find(".checkboxAll + label").html("�꾩껜�댁젣");
			}else{
				jQuery(this).parent().siblings().find(".checkboxAll").prop("checked",false);
				jQuery(this).parent().siblings().find(".checkboxAll + label").html("�꾩껜�좏깮");
			}
		}
	});

};

/* selectBox �붿옄�� 而ㅼ뒪�곕쭏�댁쭠 */
function customSelect(){
	/*
	jQuery(".select_box").each(function(){
		selectW = jQuery(this).find("select").width();
		jQuery(this).find("label").css("width",selectW + "px");
		console.log(selectW);
	});
	*/

	jQuery(".select_box select").change(function(){
		var changeTxt = jQuery(this).find("option:selected").text();
		jQuery(this).siblings("label").text(changeTxt);
	});
	jQuery(".select_box select").focus(function(){
		jQuery(this).parent().addClass("focus");
	});
	jQuery(".select_box select").blur(function(){
		jQuery(this).parent().removeClass("focus");
	});
	
	jQuery(".select_box label").on('click',function(){
		//jQuery(this).siblings("select").trigger();
	});

};

//mainSlider
function mainSlider(){
	jQuery('.mainSlider .slickSlider').slick({
		autoplay: true,
		speed:1500,
		autoplaySpeed: 3000,
		prevArrow: '.slick-prev', //prev 踰꾪듉
		nextArrow: '.slick-next', //netx 踰꾪듉
		customPaging: function (slider, i) {
			return slider.slickCurrentSlide + '/' + (i + 1);
		}
	});
	

	/*
	jQuery('.action button').click(function() {
		var slideNo = jQuery(this).index();
		jQuery('.slider-for').slick('slickGoTo', slideNo);
	});
	*/


	// slide �꾩옱 諛� 珥� 媛쒖닔 count
	var listNum = jQuery(".mainSlider .slickSlider .slick-slide").length;
	var listNum = listNum - jQuery(".mainSlider .slickSlider .slick-cloned").length;
	jQuery(".slickNum .now").text("01");
	jQuery(".slickNum .max").text(' / 0' + listNum );
	
	 jQuery(".slickSlider").on("init", function(ready, event, slick){
		jQuery(".slickNum .now").text("0" + parseInt(slick.currentSlide + 1));
		jQuery(".slickNum .max").text(' / 0' + slick.slideCount);
	});
	jQuery(".slickSlider").on("afterChange", function(event, slick, currentSlide){
		jQuery(".slickNum .now").text("0" + parseInt(slick.currentSlide + 1));
		jQuery(".slickNum .max").text(' / 0' + slick.slideCount);
	});
	
	//slide �뺤� 諛� �뚮젅�� 踰꾪듉
	jQuery(".slick-stop").click(function(){
		if(jQuery(this).hasClass("slick-play")){
			jQuery(this).removeClass("slick-play").html("�뺤�");
			jQuery('.mainSlider .slickSlider').slick('slickPlay');	
		}else{
			jQuery(this).addClass("slick-play").html("�ъ깮");
			jQuery('.mainSlider .slickSlider').slick('slickPause');					
		}
	});
}

function createSlick(){  
	jQuery(".slickSlider").not('.slick-initialized').slick({
    autoplay: true,
    dots: true,
    responsive: [{ 
        breakpoint: 500,
        settings: {
            dots: false,
            arrows: false,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2
			} 
		}]
	});	
}

function recommendList(){
	jQuery('.recommend .courseList').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: '.recommend .course-prev', //prev 踰꾪듉
		nextArrow: '.recommend .course-next', //netx 踰꾪듉
		customPaging: function (slider, i) {
			return slider.slickCurrentSlide + '/' + (i + 1);
		},
		responsive: [
			{
				breakpoint: 820, 
				settings: {
					slidesToShow:2,
					slidesToScroll:2
				}
			},
			{
				breakpoint: 560,
				settings: {
					slidesToShow:1,
					slidesToScroll:1
				}
			}
		]
	});
	
	var listNum = jQuery(".recommend .courseList .slick-slide").length;
	var listNum = listNum - jQuery(".recommend .courseList .slick-cloned").length;
	
	jQuery(".recommend .courseBtn .now").text("1");
	jQuery(".recommend .courseBtn .max").text(Math.ceil(listNum/3));
	
	jQuery(".recommend .courseList").on("init", function(event, slick){
		var num = jQuery(".recommend .courseList .slick-current.slick-active").attr("data-slick-index");
		jQuery(".recommend .courseBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		jQuery(".recommend .courseBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
	jQuery(".recommend .courseList").on("afterChange", function(event, slick, currentSlide){
		var num = jQuery(".courseList .slick-current.slick-active").attr("data-slick-index");
		jQuery(".recommend .courseBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		jQuery(".recommend .courseBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
}

function popularList(){
	jQuery('.popular .courseList').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: '.popular .course-prev', //prev 踰꾪듉
		nextArrow: '.popular .course-next', //netx 踰꾪듉
		customPaging: function (slider, i) {
			return slider.slickCurrentSlide + '/' + (i + 1);
		},
		responsive: [
			{
				breakpoint: 820, 
				settings: {
					slidesToShow:2,
					slidesToScroll:2
				}
			},
			{
				breakpoint: 560,
				settings: {
					slidesToShow:1,
					slidesToScroll:1
				}
			}
		]
	});
	
	var listNum = jQuery(".popular .courseList .slick-slide").length;
	var listNum = listNum - jQuery(".popular .courseList .slick-cloned").length;
	
	jQuery(".popular .courseBtn .now").text("1");
	jQuery(".popular .courseBtn .max").text(Math.ceil(listNum/3));
	
	
	jQuery(".popular .courseList").on("init", function(event, slick){
		var num = jQuery(".popular .courseList .slick-current.slick-active").attr("data-slick-index");
		jQuery(".popular .courseBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		jQuery(".popular .courseBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
	jQuery(".popular .courseList").on("afterChange", function(event, slick, currentSlide){
		var num = jQuery(".courseList .slick-current.slick-active").attr("data-slick-index");
		jQuery(".popular .courseBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		jQuery(".popular .courseBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
}

function reviewList(){
	jQuery('.review .reviewList').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		prevArrow: '.review .course-prev', //prev 踰꾪듉
		nextArrow: '.review .course-next', //netx 踰꾪듉
		customPaging: function (slider, i) {
			return slider.slickCurrentSlide + '/' + (i + 1);
		},
		responsive: [
				/*
			{
				breakpoint: 960, 
				settings: {slidesToShow:2 }
			},
			{
				breakpoint: 768,
				settings: {slidesToShow:1 }
			}
			*/
		]
	});
	
	var listNum = jQuery(".review .reviewList .slick-slide").length;
	var listNum = listNum - jQuery(".review .reviewList .slick-cloned").length;
	
	jQuery(".review .courseBtn .now").text("1");
	jQuery(".review .courseBtn .max").text(listNum);
	
	
	jQuery(".review .reviewList").on("init", function(event, slick){

	});
	jQuery(".review .reviewList").on("afterChange", function(event, slick, currentSlide){
		//var num = jQuery(".review .reviewList .slick-current.slick-active").attr("data-slick-index");
		var num = jQuery(".review .reviewList .slick-active").attr("data-slick-index");
		jQuery(".review .courseBtn .now").text(parseInt(Math.ceil(num)+1));		
		jQuery(".review .courseBtn .max").text(listNum);
	});
}

function eventList(){
	jQuery('.eventMonth .eventList').slick({
		lazyLoad: 'ondemand',
		dots : true,
		arrows : false,
		autoplay: true,
		speed:1500,
		autoplaySpeed: 3000
	});
}

/* 諛섏쓳�� popup  */
var popupB, popupH, popupC, popupF, popupSH;
function popupS(n,m,w,h){
	var filter = "win16|win32|win64|macintel|mac|"; // PC占쏙옙 野껋럩�� 揶쏉옙占싸쎈립 揶쏉옙
	if(m == "close"){
		jQuery(n).fadeOut(300);
		jQuery("body").removeClass("popup");
		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				jQuery("body").css("position","static");
				jQuery(document).scrollTop(scrollH);
			}
		}
	}else{
		jQuery(n).show(0,function(){
			//winH = window.outerHeight;
			//bodyH = jQuery("html").outerHeight();
			//winH = (winH - bodyH)/2;
			popupW = jQuery(n).find(".popup_BoxIn").width();
			
			if(w == undefined || w == "full"){
				jQuery(n).find(".popup_BoxIn").css({"width":"95%","margin-left":"0%","left":"2.5%"});
			}else{
				jQuery(n).find(".popup_BoxIn").css({"width":w,"margin-left":-(w/2),"left":"50%"});
			}
			if(h == undefined || h == "full"){
				jQuery(n).find(".popup_BoxIn").css({"height":"80%","top":"10%","margin-top":"0"});
			}else{
				jQuery(n).find(".popup_BoxIn").css({"height":h, "margin-top":-(h/2), "top":"50%"});
			}			
			if(h == "auto" || h == "auto"){
				jQuery(n).find(".popup_BoxIn").css({"margin-left" : - (popupW/2) });				
			}
			//jQuery(n).find(".popup_close").focus();
			popH = jQuery(n).find(".popup_BoxIn").height() - (jQuery(n).find(".popupH").outerHeight() + jQuery(n).find(".popupF").outerHeight() + 60 );
			jQuery(n).find(".popupCBox").css("height", popH + "px");

			scrollH = jQuery(document).scrollTop();
			//console.log(scrollH);
			jQuery("body").addClass("popup");
			if( navigator.platform){
				if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
					jQuery("body").css("position","fixed");
				}
			}
		//popupRe();
		});
	}
/*	jQuery(n).find(".popup_bg").click(function(){
		jQuery(n).fadeOut(300);
		jQuery("body").removeClass("popup");
		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				jQuery("body").css("position","static");
				jQuery(document).scrollTop(scrollH);
			}
		}
	});*/
	
	jQuery(window).resize(function(){
		popH = jQuery(n).find(".popup_BoxIn").height() - (jQuery(n).find(".popupH").outerHeight() + jQuery(n).find(".popupF").outerHeight() + 60);
		jQuery(n).find(".popupCBox").css("height", popH + "px");
	});

}

/*
function popupRe(){
	if(jQuery("body").hasClass("popup_open")){
		jQuery(".popup_Box").each(function(){
			if(jQuery(this).css("display")=="block"){
				popupB = jQuery(this).find(".popup_BoxIn").height();
				popupH = jQuery(this).find(".popupH").height();
				popupF = jQuery(this).find(".popupF").height();
				popupSH = popupB-((popupH+1) + popupF) - 35;
				if(popupSH < 0){
					jQuery(this).find(".popupCBox").css("height","auto");
				}else{
					jQuery(this).find(".popupCBox").css("height",popupSH);
				}
			}
		});
	}
}
*/
