$(document).ready(function() {
	quickTopBtn();
	cropS();
	customSelect();
	popupS();
});

$(document).on("click",function(){

});

$(window).resize(function(){

});

$(window).scroll(function(event){
	
});

$(window).load(function(){
	//$(window).on( 'resize', createSlick );
	titleS();
	menuS();
});
	
	
function titleS(){
	var urlName = location.href; 
	if(urlName.indexOf("index") > -1){
		document.title = "웅진씽크빅 | 강의실 홈";
		$(".lnb > ul > li").eq(0).addClass("active");
	}else if(urlName.indexOf("notice") > -1){
		document.title = "웅진씽크빅 | 공지사항";
		$(".lnb > ul > li").eq(1).addClass("active");		
	}else if(urlName.indexOf("survey") > -1){
		document.title = "웅진씽크빅 | 설문참여";
		$(".lnb > ul > li").eq(2).addClass("active");		
	}else if(urlName.indexOf("reference") > -1){
		document.title = "웅진씽크빅 | 자료실";
		$(".lnb > ul > li").eq(3).addClass("active");		
	}else if(urlName.indexOf("question") > -1){
		document.title = "웅진씽크빅 | 학습문의";
		$(".lnb > ul > li").eq(4).addClass("active");		
	}
}

function menuS(){
	pageW = $("body").innerWidth();
	windowH = $(window).height();
	pageH = $("body").height();

	if(pageH > windowH){
		pageW = pageW+17;
	}else{
		pageW = pageW;
	}
	
	if(pageW > 1199){
		$("body").addClass("pc");
	}else{
		$("body").addClass("mob");
	}

	$(window).resize(function(){
		pageW = $("body").innerWidth();
		windowH = $(window).height();
		pageH = $("body").height();
		
		if(pageH > windowH){
			if($("body").hasClass("active")){
				pageW = pageW;
			}else{
				pageW = pageW+17;
			}
		}else{
			pageW = pageW;
		}
		
		if(pageW > 1199){
			$("body").removeClass("mob").removeClass("mActive").addClass("pc");
			$(".bg_trans").hide();
			$(".topNav ul li.mob").removeClass("active");
		}else{
			$("body").removeClass("pc").addClass("mob");
		}
	});
	
	$(document).on('click',".mob .topNav ul li.mob",function(e){
		$(this).addClass("active");
		$("body").addClass("mActive");
		$(".bg_trans").fadeIn(400);
	});
	$(document).on('click',".mob .lnb .mob button, .mob .bg_trans",function(){
		$(".mob .topNav ul li.mob").removeClass("active");
		$("body").removeClass("mActive");
		$(".bg_trans").fadeOut(400);	
	});
	/*
	$(".topNavIn > ul > li > ul").each(function(){
		var cloneN = $(this).siblings("a").clone().attr("href","javascript:void(0);");
		$(this).prepend("<li class='cloneN'>" + "</li>");
		$(this).find(".cloneN").html(cloneN).hide();
		$(this).find(".cloneN").click(function(){
			$(".topNavIn > ul").removeClass("active");
			$(".topNavIn > ul > li > ul").fadeOut(300);
		});
	});

	$(document).on('click',".mob .topNavIn > ul > li > a",function(e){
		e.preventDefault();
		var listN = $(this).parent().index();
		$(this).closest("ul").addClass("active");
		$(this).siblings("ul").show();
		$(this).siblings("ul").find(".cloneN").show();
		$(this).siblings("ul").css("top",(-listN*100)+(-listN*2)+"%");
	});
	*/
}

function reviewMore(){
	$(".reviewMore").click(function(){
		$(this).parent(".info").removeClass("ellipsis");
	});
}

//topBtn
function quickTopBtn(){
	$(window).scroll(function(){
		var scrollValue = $(document).scrollTop(); 
		if(scrollValue > 50){
			$(".toQuickBtn").fadeIn(300);
		}else{
			$(".toQuickBtn").fadeOut(300);
		}
	});
	
	$(".toTopBtn").click(function(){
		$("html,body").animate({scrollTop:0},350);
	});	
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
		  'filter'                : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src=" +  $(this).attr('src') + ",sizingMethod='scale')",
		  '-ms-filter'            : "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +  $(this).attr('src') + "',sizingMethod='scale')",
		});		
	});

	$(window).resize(function(){
		$(".cropImg").each(function(){
			cropH =  $(this).parent().height();
			$(this).siblings(".cropBox").css({
			  'height'                : cropH,
			});
		});
	});
}

/*
function lectureListen(){
	$('.lectureToget .lectureListen').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: '.lectureToget .lecture-prev', //prev 버튼
		nextArrow: '.lectureToget .lecture-next', //netx 버튼
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
	
	var listNum = $(".lectureToget .lectureListen .slick-slide").length;
	var listNum = listNum - $(".lectureToget .lectureListen .slick-cloned").length;
	
	$(".lectureToget .lectureBtn .now").text("1");
	$(".lectureToget .lectureBtn .max").text(Math.ceil(listNum/3));
	
	$(".lectureToget .lectureListen").on("init", function(event, slick){
		var num = $(".lectureToget .lectureListen .slick-current.slick-active").attr("data-slick-index");
		$(".lectureToget .lectureBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		$(".lectureToget .lectureBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
	$(".lectureToget .lectureListen").on("afterChange", function(event, slick, currentSlide){
		var num = $(".lectureListen .slick-current.slick-active").attr("data-slick-index");
		$(".lectureToget .lectureBtn .now").text(parseInt(Math.ceil(num/3)+1));		
		$(".lectureToget .lectureBtn .max").text(parseInt(Math.ceil(slick.slideCount/3)));		
	});
}
*/

function faq(){
	$(".lectureQue a").click(function(){
		var lectureQue = $(this).siblings(".lectureQueInfo").css("display");
		if(lectureQue == "none"){
			$(this).siblings(".lectureQueInfo").slideDown(300);
	   }else{
			$(this).siblings(".lectureQueInfo").slideUp(300);
	   }		
	});
	
	$(".chapter a").click(function(){
		var chapter = $(this).siblings(".chapter_content").css("display");
		if(chapter == "none"){
			$(this).addClass("active");
			$(this).siblings(".chapter_content").slideDown(300);
	   }else{
			$(this).removeClass("active");
			$(this).siblings(".chapter_content").slideUp(300);
	   }		
	});
}


function checkboxAll(){	
	$(".inputList input[type=checkbox]").click(function(){
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
	$(".select_box").each(function(){
		selectW = $(this).find("select").width();
		$(this).find("label").css("width",selectW + "px");
		console.log(selectW);
	});
	*/

	$(".select_box select").change(function(){
		var changeTxt = $(this).find("option:selected").text();
		$(this).siblings("label").text(changeTxt);
	});
	$(".select_box select").focus(function(){
		$(this).parent().addClass("focus");
	});
	$(".select_box select").blur(function(){
		$(this).parent().removeClass("focus");
	});
	
	$(".select_box label").on('click',function(){
		//$(this).siblings("select").trigger();
	});

};




function createSlick(){  
	$(".slickSlider").not('.slick-initialized').slick({
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



/* 반응형 popup  */
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
			//winH = window.outerHeight;
			//bodyH = $("html").outerHeight();
			//winH = (winH - bodyH)/2;
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
			//$(n).find(".popup_close").focus();
			popH = $(n).find(".popup_BoxIn").height() - ($(n).find(".popupH").outerHeight() + $(n).find(".popupF").outerHeight() + 60 );
			$(n).find(".popupCBox").css("height", popH + "px");

			scrollH = $(document).scrollTop();
			//console.log(scrollH);
			$("body").addClass("popup");
			if( navigator.platform){
				if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
					$("body").css("position","fixed");
				}
			}
		//popupRe();
		});
	}
	$(n).find(".popup_bg").click(function(){
		$(n).fadeOut(300);
		$("body").removeClass("popup");
		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				$("body").css("position","static");
				$(document).scrollTop(scrollH);
			}
		}
	});
	
	$(window).resize(function(){
		popH = $(n).find(".popup_BoxIn").height() - ($(n).find(".popupH").outerHeight() + $(n).find(".popupF").outerHeight() + 60);
		$(n).find(".popupCBox").css("height", popH + "px");
	});

}

/*
function popupRe(){
	if($("body").hasClass("popup_open")){
		$(".popup_Box").each(function(){
			if($(this).css("display")=="block"){
				popupB = $(this).find(".popup_BoxIn").height();
				popupH = $(this).find(".popupH").height();
				popupF = $(this).find(".popupF").height();
				popupSH = popupB-((popupH+1) + popupF) - 35;
				if(popupSH < 0){
					$(this).find(".popupCBox").css("height","auto");
				}else{
					$(this).find(".popupCBox").css("height",popupSH);
				}
			}
		});
	}
}
*/


