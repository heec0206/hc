$(document).ready(function() {
	popupS();
	cropS();
	customSelect();
	menuS();
	anchorAni();
	//minH();
	/* 산출물관리 html include */
	$(".headerInclude").load("include/topLayout.html");
	$(".footerInclude").load("include/footerLayout.html");
	/* EOD : 산출물관리 html include */
});


$(document).on("click",function(){

});


$(window).load(function(){

});

$(window).scroll(function(){

});

function minH(){
	windowH = $(window).height();
	htmlH = $("html").height() ;
	conH =  $(".subVisual").css("margin-bottom");
	headerH = $(".subVisual").outerHeight() + $(".footerLayout").outerHeight();
	minH = windowH - headerH - parseInt(conH);

	if(minH < windowH){
		$(".contentLayoutIn").css("min-height", minH + "px");
	}

	$(window).resize(function(){
		windowH = $(window).height();
		htmlH = $("html").height() ;
		conH =  $(".subVisual").css("margin-bottom");
		//headerH = $(".subVisual").outerHeight() + $(".footerLayout").outerHeight();
		headerH = $(".footerLayout").outerHeight();
		minH = windowH - headerH - parseInt(conH);

		if(minH < windowH){
			$(".contentLayoutIn").css("min-height", minH + "px");
		}else{

		}

	});
}

function titleS(){
	var urlName = location.href;
	if(urlName.indexOf("index.html") > -1){
		document.title = "스쿨포유";
	}else if(urlName.indexOf("use_") > -1){
		//document.title = "나의 홈 | MYCLIP | 웅진씽크빅";
		$(".pc .topNav .topNavIn > ul > li").eq(0).addClass("on");
	}else if(urlName.indexOf("myroom_") > -1){
		$(".pc .topNav .topNavIn > ul > li").eq(1).addClass("on");
	}else if(urlName.indexOf("community") > -1){
		$(".pc .topNav .topNavIn > ul > li").eq(2).addClass("on");
	}else if(urlName.indexOf("support_") > -1){
		$(".pc .topNav .topNavIn > ul > li").eq(3).addClass("on");
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

	if(pageW > 1099){
		$("body").addClass("pc");
	}else{
		$("body").addClass("mob");
		//$(".topAllMenu ul > li > a").attr("href","javascript:void(0);");
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

		if(pageW > 1099){
			$("body").removeClass("mob").removeClass("active").addClass("pc");
		}else{
			$("body").removeClass("pc").addClass("mob");
		}
	});
}

//mainBanner
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
	$(".select_box select").change(function(){
		var changeTxt = $(this).find("option:selected").text();
		$(this).siblings("label").find("span").text(changeTxt);
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

var popupB, popupH, popupC, popupF, popupSH;
function popupS(n,m,w,h){
	var filter = "win16|win32|win64|macintel|mac|";
	if(m == "close"){
		$(n).hide();
		$("body").removeClass("popup");
		if( navigator.platform){
			if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
				$("body").css("position","static");
				$(document).scrollTop(scrollH);
			}else{

			}
		}
	}else{
		$(n).show(0,function(){
			//winH = window.outerHeight;
			//bodyH = $("html").outerHeight();
			//winH = (winH - bodyH)/2;
			popupW = $(n).find(".popup_BoxIn").width();
			popupH = $(n).find(".popup_BoxIn").outerHeight();
			winH = $(window).outerHeight();
			winW = $(window).outerWidth();
			$(n).find(".popupCBoxIn").wrapInner("<div class='popupCBoxInS'></div>");

			if(w == undefined || w == "full"){
				//$(n).find(".popup_BoxIn").css({"width":"95%","margin-left":"0%","left":"2.5%"});
			}else{
				//$(n).find(".popup_BoxIn").css({"width":w,"margin-left":-(w/2),"left":"50%"});
			}
			if(h == undefined || h == "full"){
				//$(n).find(".popup_BoxIn").css({"height":"80%","top":"10%","margin-top":"0"});
			}else{
				//$(n).find(".popup_BoxIn").css({"height":h, "margin-top":-(h/2), "top":"50%"});
			}
			if(h == "auto"){
				popH = (winH-100) - $(n).find(".popupH").outerHeight() - $(n).find(".popupF").outerHeight()-30 ;
				if(winH < popupH-100){
					$(n).find(".popup_BoxIn").css({"width" :w, "top" : "5%"});
				}else{
					//$(n).find(".popup_BoxIn").css({"margin-top" : -(popupH/2)});
				}
				//$(n).find(".popup_BoxIn").css({"margin-left" : -(popupW/2)});
				$(n).find(".popupCBoxInS").css({"max-height" : popH });
			}
			if(w < winW-100){
				$(n).find(".popup_Box").css({"width":w});
			}else{
				$(n).find(".popup_Box").css({"width":"95%"});
			}

			scrollH = $(document).scrollTop();
			//console.log(scrollH);
			$("body").addClass("popup");
			if( navigator.platform){
				if( filter.indexOf(navigator.platform.toLowerCase())<0 ){
					$("body").css({"position":"fixed", "width":"100%"});
				}else{
					$("body").css({"position":"static"});
				}
			}
		//popupRe();
		});
	}

	/*
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
	*/

	$(window).resize(function(){
		popupW = $(n).find(".popup_BoxIn").width();
		popupH = $(n).find(".popup_BoxIn").outerHeight();
		winH = $(window).outerHeight();
		winW = $(window).outerWidth();

		if(h == "auto"){
			popH = (winH-100) - $(n).find(".popupH").outerHeight() - $(n).find(".popupF").outerHeight()-30 ;
			if(winH < popupH-100){
				$(n).find(".popup_BoxIn").css({"width" :w, "top" : "5%"});
			}else{
				//$(n).find(".popup_BoxIn").css({"margin-top" : -(popupH/2)});
			}
			//$(n).find(".popup_BoxIn").css({"margin-left" : -(popupW/2)});
			$(n).find(".popupCBoxInS").css({"max-height" : popH });
		}
		if(w < winW-100){
			$(n).find(".popup_Box").css({"width":w});
		}else{
			$(n).find(".popup_Box").css({"width":"95%"});
		}
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
