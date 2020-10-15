$(document).ready(function() {
	popupS();
	cropS();
	customSelect();
	menuS();
	titleS();
	/* 산출물관리 html include */	
	$(".headerInclude").load("include/header.html");
	$(".footerInclude").load("include/footer.html");
	/* EOD : 산출물관리 html include */
	datepicker();
});

	
$(document).on("click",function(){

});

$(window).resize(function(){

});


$(window).load(function(){
	
});

$(window).scroll(function(){

});



function titleS(){
	var urlName = location.href; 
	
	if(urlName.indexOf("index.html") > -1){
		/*document.title = "스쿨포유";*/
	}else if(urlName.indexOf("minihp_") > -1){
		//$(".nav > ul > li").eq(0).addClass("on");
	}else if(urlName.indexOf("ho_") > -1){
		$(".nav > ul > li").eq(0).addClass("on");
	}else if(urlName.indexOf("health_") > -1){
		$(".nav > ul > li").eq(1).addClass("on");
	}else if(urlName.indexOf("e_") > -1){
		$(".nav > ul > li").eq(2).addClass("on");
	}else if(urlName.indexOf("support") > -1){
		$(".nav > ul > li").eq(3).addClass("on");
	}
	
	if(urlName.indexOf("membership_") > -1){
		$(".header").addClass("etc");
	}
}

function menuS(){	
	
	
	$(document).on('mouseenter focus',".topNavIn .nav ul li",function(e){
		
		
		$(this).addClass("active");
		$(".header").addClass("on");				
		$(".topNavIn .nav .dep2").show();
		$(".topSubMenu").show();
		
	});
	
	$(document).on('mouseleave focus',".topNavIn .nav > ul > li",function(e){
			
		$(".topNavIn .nav ul li").removeClass("active");
	});	
	

	$(document).on('mouseleave',".header",function(e){
		
		$(".topNavIn .nav ul li").removeClass("active");		
		$(".header").removeClass("on");
		$(".topNavIn .nav .dep2").hide();
		$(".topSubMenu").hide();
		
	});
}

// mainBanner
function mainBanner(){
	$('.mainBanner .slickSlider').slick({
		autoplay: true,
		autoplaySpeed: 3000,
		speed:1500,
		arrows : true,
		dots : false,
		pauseOnHover:false,
		pauseOnFocus: false,
		touchThreshold : 1000,
		
	}).slick("slickPause");

	setTimeout(function() {
		$('.mainBanner .slickSlider').slick("slickPlay");
	},1500);
	
	
	var listN = $(".mainBanner .slickSlider .slick-slide").length;
	var cloneN = $(".mainBanner .slickSlider .slick-cloned").length;
	var listN = (listN - cloneN);
	
	$(".mainBanner").append("<ul class='mainBannerAni'></ul>");
	for ( var i=0; i < listN; i++){
		$(".mainBanner .mainBannerAni").append("<li></li>");
	}

	$(".mainBannerAni li").eq(0).addClass("ani");
}

function cropS(){
	$(".cropImg").each(function () {
		cropH =  $(this).parent().height();
		imgLink = 'url(' + $(this).attr('src') + ')',
		cropBox = $('<div class="cropBox"></div>');

		$(this).hide();
		$(this).parent().prepend(cropBox);

		cropBox.css({
		  'height'                : cropH,
		  'background-image'      : 'url(' + $(this).attr('src') + ')',
		  'background-size'       : 'cover',
		  'background-repeat'     : 'no-repeat',
		  'background-position'   : '50% 50%',
		  //'filter'                : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" +  $(this).attr('src') + ", sizingMethod='scale') , progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff',GradientType=0 )",
		  //'-ms-filter'            : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" +  $(this).attr('src') + ", sizingMethod='scale') , progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff',GradientType=0 )",
		});		
	});
}

function checkboxAll(){	
	$(".checkList input[type=checkbox]").click(function(){
		var chkNum = $(this).parent().siblings().find("input[type=checkbox]");
		if($(this).hasClass("checkboxAll") == true){
			/* checkbox 전체선택 */
			if($(this).is(":checked") == true){
				chkNum.prop("checked",true);
				$(this).siblings().html("전체해제");
			}else{
				chkNum.prop("checked",false);
				$(this).siblings().html("전체선택");
			}
		}else{
			/* checkbox 전체선택 여부 */
			if(chkNum.length == chkNum.filter(":checked").length+1){
				chkNum.closest(".checkboxAll").prop("checked",true);
				chkNum.closest(".checkboxAll").prop("checked",true); $(this).parent().siblings().find(".checkboxAll + label").html("전체해제");
			}else{
				$(this).parent().siblings().find(".checkboxAll").prop("checked",false);
				$(this).parent().siblings().find(".checkboxAll + label").html("전체선택");
			}
		}
	});

};

/* selectBox 디자인 커스터마이징 */
function customSelect(){
	/*
	 * $(".select_box").each(function(){ selectW =
	 * $(this).find("select").width(); $(this).find("label").css("width",selectW +
	 * "px"); console.log(selectW); });
	 */

	$(".selectBox select").change(function(){
		var changeTxt = $(this).find("option:selected").text();
		$(this).siblings("label").find("span").text(changeTxt);
	});
	$(".selectBox select").focus(function(){
		$(this).parent().addClass("focus");
	});
	$(".selectBox select").blur(function(){
		$(this).parent().removeClass("focus");
	});
	
	$(".selectBox label").on('click',function(){
		// $(this).siblings("select").trigger();
	});

};

/* 반응형 popup */
var popupB, popupH, popupC, popupF, popupSH;
function popupS(n,m,w,h){
	var filter = "win16|win32|win64|macintel|mac|"; // PC�� 寃쎌슦 媛��ν븳 媛�
	if(m == "close"){
		$(n).fadeOut(300);
		$("body").removeClass("popup");
		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				$("body").css("position","static");
				$(document).scrollTop(scrollH);
			}
		}
	}else{
		$(n).show(0,function(){
			// winH = window.outerHeight;
			// bodyH = $("html").outerHeight();
			// winH = (winH - bodyH)/2;
			popupW = $(n).find(".popup_BoxIn").width();
			
			if(w == undefined || w == "full"){
				$(n).find(".popup_BoxIn").css({"width":"95%","margin-left":"0%","left":"2.5%"});
			}else{
				$(n).find(".popup_BoxIn").css({"width":w,"margin-left":-(w/2),"left":"50%"});
			}
			if(h == undefined || h == "full"){
				$(n).find(".popup_BoxIn").css({"height":"80%","top":"10%","margin-top":"0"});
			}else{
				$(n).find(".popup_BoxIn").css({"height":h, "margin-top":-(h/2), "top":"50%"});
			}			
			if(h == "auto" || h == "auto"){
				$(n).find(".popup_BoxIn").css({"margin-left" : - (popupW/2) });				
			}
			// $(n).find(".popup_close").focus();
			popP = $(".popup_Box .popupCBox").css("padding");
			popP = popP.replace(/[^0-9]/g,'');
			popH = $(n).find(".popup_BoxIn").height() - ($(n).find(".popupH").outerHeight() + $(n).find(".popupF").outerHeight() + popP*2 + 2 );

			scrollH = $(document).scrollTop();
			// console.log(scrollH);
			$("body").addClass("popup");
			if( navigator.platform){
				if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
					$("body").css("position","fixed");
				}
			}
		// popupRe();
		});
	}
	
	/*
	 * $(n).find(".popup_bg").click(function(){ $(n).fadeOut(300);
	 * $("body").removeClass("popup"); if( navigator.platform){ if(
	 * filter.indexOf(navigator.platform.toLowerCase())<0 ){
	 * $("body").css("position","static"); $(document).scrollTop(scrollH); } }
	 * });
	 */
	
	$(window).resize(function(){
		$(n).show(0,function(){
			popP = $(".popup_Box .popupCBox").css("padding");
			popP = popP.replace(/[^0-9]/g,'');
			popH = $(n).find(".popup_BoxIn").height() - ($(n).find(".popupH").outerHeight() + $(n).find(".popupF").outerHeight() + popP*2 + 2 );
			$(n).find(".popupCBox").css("height", popH + "px");
		});
	});

}


/* 서브 탭 스크립트 */
function tabsClick(targetClass, targetId, obj , option){

	$(obj).parent("li").siblings("li").removeClass("active");
	$(obj).parent("li").addClass("active");
	$("." + targetClass).hide();
	$(targetId).show();
	
	if(option == "slider"){
		$(function(){
			$('.slick-slider').slick({
				//autoplay: true,
				//autoplaySpeed: 3000,
				speed: 1500,
				arrows : true,
				dots : false,
				pauseOnHover:false,
				pauseOnFocus: false,
				touchThreshold : 1500,
				slidesToShow: 4,
			});
		});	
	}
}


function datepicker(){
	
	var datepicker_year = new Date();
   
	$.datepicker.setDefaults({
	    dateFormat: "yy-mm-dd",
	    prevText: '이전 달',
	    nextText: '다음 달',
	    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
	    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	    showMonthAfterYear: true,
	    yearSuffix: '년',
	    changeMonth: true,
	    changeYear: true,
	    yearRange: (datepicker_year.getFullYear()-50) + ':' + (datepicker_year.getFullYear())
	});

	$(".datepicker").datepicker();
}




