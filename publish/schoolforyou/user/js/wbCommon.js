$(document).ready(function() {
	popupS();
	cropS();
	customSelect();
	menuS();
	//minH();
	/* 산출물관리 html include */	
	$(".headerInclude").load("include/topLayout.html");
	$(".etc_headerInclude").load("include/etc_topLayout.html");
	$(".footerInclude").load("include/footerLayout.html");
	/* EOD : 산출물관리 html include */
});

	
$(document).on("click",function(){

});

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


$(window).load(function(){
	//$(".topAllMenu .topAllMenuIn > ul > li > a").attr("href","javascript:void(0);");
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

/*
$(window).load(function(){
	$(window).on( 'resize', createSlick );
});
*/

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
	
	/* 접근성 */
	$(document).on('mouseenter focus',".pc .topNav .topNavIn > ul > li > a",function(e){
		$(".pc .topNav .topNavIn > ul > li").removeClass("active");
		$(".pc .topNav .topNavIn > ul > li > ul").hide();
		$(this).parent().addClass("active");
		$(this).siblings("ul").show();
	});
	
	$(document).on('mouseleave',".pc .topNav .topNavIn > ul > li",function(e){
		$(".pc .topNav .topNavIn > ul > li").removeClass("active");
		$(".pc .topNav .topNavIn > ul > li > ul").hide();
	});
	
	$(document).on('mouseenter focus',".pc .topNav .topNavIn > ul > li > ul > li > a",function(e){
		$(".pc .topNav .topNavIn ul > li > ul > li").removeClass("active");
		$(this).parent().addClass("active");
	});

	$(document).on('focus',".pc .topInfoList, .pc .topLayoutIn h1",function(e){
		$(".pc .topNav .topNavIn > ul > li > ul").hide();
		$(".pc .topNav .topNavIn > ul > li").removeClass("active");		
	});
	
	$(document).on('focus',".pc .topAfterInfo > li > a",function(e){
		$(".msg_contents").fadeOut(400);
	});
	
	$(document).on('click',".pc .topAllMenuBtn",function(e){
		$(".pc .topAllMenu").fadeIn(400);
	});

	$(document).on('click',".pc .topAllMenuClose",function(e){
		$(".pc .topAllMenu").fadeOut(400);
	});
	
	$(document).on('click',".pc .msg_btn",function(e){ 
		if($(".msg_contents").css("display") == "block"){
			$(".msg_contents").fadeOut(400);
			$(this).attr("title","쪽지함 열기");
		}else{
			$(".msg_contents").fadeIn(400);
			$(this).attr("title","쪽지함 닫기");
		}
	});
	
	$(document).on('click',".mob .topAllMenuBtn",function(e){
		$("html").addClass("active");
		$(".mob .topAllMenu").addClass("active");
	});
	
	$(document).on('click',".mob .topAllMenuClose, .mob .mob_bg",function(e){
		$("html").removeClass("active");
		$(".mob .topAllMenu").removeClass("active");
	});

	$(document).on('click',".mob .msg_btn",function(e){ 
		if($(".msg_contents").css("display") == "block"){
			$(".msg_contents").fadeOut(400);
			$(this).attr("title","쪽지함 열기");
		}else{
			$(".msg_contents").fadeIn(400);
			$(this).attr("title","쪽지함 닫기");
		}
	});

	$(document).on('click',".mob .topLayout .topAllMenu .topAllMenuIn > ul > li > a",function(e){
		if($(this).parent().hasClass("active")){
			$(this).siblings("ul").slideUp(400);
			$(this).parent().removeClass("active");			
		}else{
			$(this).siblings("ul").slideDown(400);
			$(this).parent().addClass("active");			
		}
	});
	/* EOD : 접근성 */
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
	/*
	$(".select_box").each(function(){
		selectW = $(this).find("select").width();
		$(this).find("label").css("width",selectW + "px");
		console.log(selectW);
	});
	*/

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
			popP = $(".popup_Box .popupCBox").css("padding");
			popP = popP.replace(/[^0-9]/g,'');
			popH = $(n).find(".popup_BoxIn").height() - ($(n).find(".popupH").outerHeight() + $(n).find(".popupF").outerHeight() + popP*2 + 2 );

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
		$(n).show(0,function(){
			popP = $(".popup_Box .popupCBox").css("padding");
			popP = popP.replace(/[^0-9]/g,'');
			popH = $(n).find(".popup_BoxIn").height() - ($(n).find(".popupH").outerHeight() + $(n).find(".popupF").outerHeight() + popP*2 + 2 );
			$(n).find(".popupCBox").css("height", popH + "px");
		});
	});

}


/* 서브 탭 스크립트 */
function tabsClick(targetClass, targetId, obj){

	$(obj).parent("li").siblings("li").removeClass("active");
	$(obj).parent("li").addClass("active");
	$("." + targetClass).hide();
	$(targetId).show();

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

$.fn.chart = function(options){
	var defaults = {
		type : 'horizontal', // horizontal, vertical
		margin : 40,
		speed :    3000, // bar animation speed
		speedTurm : 1000, // bar animation turm speed
		height :    200, // chart height 
		barHeight : 20,  // bar height, 짝수만
		
		//기준점
		markStart : 0, //기준점 시작
		markEnd : 500, //기준점 마지막
		markInterval : 100 //기준점 간격
	} 
	var options = $.extend(defaults, options);
	var tN = $(this);
	var dataH = tN.find(".data").css("font-size");
	dataH = dataH.replace(/[^0-9]/g,"");
	tN.find(".chartIn").prepend("<ul class='mark'>");
	var markNum = (options.markEnd/options.markInterval)+1;
	if(options.type == "horizontal"){
		tN.addClass("horizontal");
		for(var i = 0; i < markNum; i++) {
			markValue = options.markInterval*i ;
			if(i==0) {
				tN.find(".mark").append("<li><span>" + options.markStart + "</span></li>");
			}else {
				tN.find(".mark").append("<li><span>" + markValue + "</span></li>");
			}
		}
		listN = 100/ (tN.find(".mark").children("li").length-1);
		tN.find(".mark li").each(function(index){
			markW = $(this).find("span").outerWidth();
			$(this).find("span").css({
				"margin"    :     "0 -" + markW/2 + "px 0 0"
			});
		});
		tN.find(".bar").append("<span class='triangle'></span>");
		tN.find(".triangle").css({
			'border'        :  (options.barHeight/2) + "px solid #fff" ,
			'border-right'  :  "none",
			'border-left'   :  (options.barHeight/2) + "px solid transparent"
		});
		
		tN.find(".progress li").each(function(index){
			speedTurm = (options.speed+(options.speedTurm * index))/1000;
			$(this).find(".bar").css("transition","width " + speedTurm +"s ease");
		});
		tN.find(".bar").css("height",options.barHeight + "px");
		tN.find(".data span").css("line-height", options.barHeight + "px");
		
	}else if(options.type =="vertical"){
		tN.addClass("vertical");
		tN.find(".progress").wrap("<div class='lineBox'></div>");
		tN.find(".lineBox").append("<ul class='line'>");

		for(var i = 0; i < markNum; i++) {
			markValue = options.markInterval*i ;
			if(i==0) {
				tN.find(".mark").prepend("<li><span>" + options.markStart + "</span></li>");
			}else {
				tN.find(".mark").prepend("<li><span>" + markValue + "</span></li>");
			}
			tN.find(".line").prepend("<li></li>");
			tN.find(".line li:last-child").addClass("last");
		}
		tN.find(".chartIn").append("</div></ul>");
		listN = (tN.find(".mark").children("li").length-1);
		tN.find(".mark li, .line li").css("height", 100/listN + "%");
		
		markH = tN.find(".mark li span").css("font-size");
		markH = markH.replace(/[^0-9]/g,"");
		tN.find(".mark li span").css("top", "-" + markH/2 + "px");				
		tN.find(".bar").css("width",options.barHeight + "px");
		
		tN.find(".progress li").each(function(index){
			proNum = $(this).find(".progressBox").length;
			$(this).find(".progressWrap").css("width",(proNum*options.barHeight) + (proNum-1)*10 + "px");			
		});

		tN.find(".progress li .progressBox").each(function(index){
			proNum = $(this).index();
			$(this).css("margin","0 0 0 " + proNum*(options.barHeight+10) + "px");
			speedTurm = (options.speed+(options.speedTurm * index))/1000;
			$(this).find(".bar").css("transition", "height " + speedTurm +"s ease");
			listData = $(this).find(".data").text();
			thisH = (options.height/listN)/options.markInterval;
			$(this).find(".bar").css("height", (thisH*listData)-4 + "px");
		});	
		
		tN.find(".bar").append("<span class='triangle'></span>");
		dataH = parseInt(tN.find(".data").css("font-size"));
		tN.find(".triangle").css({
			//'top'           :  dataH+5 + "px",
			'border'        :  (options.barHeight/2) + "px solid #fff" ,
			'border-bottom' :  (options.barHeight/2) + "px solid transparent",
			'border-top'    :  "none"
		});
	}else{
		alert("chart의 type값을 지정해주세요.")
	}
	tN.find(".chartIn").append("</ul>");
	tN.append("</div>");
	tN.find(".mark li:last-child").addClass("last");
	tN.css({
		"height" :  options.height+"px",
		"margin"  : options.margin +"px"
	});
	
	function tnSet(){
		if(options.type == "horizontal"){
			tN.find(".progress li").each(function(index){
				listData = $(this).find(".data").text();
				thisW = $(this).closest(".chart").outerWidth();
				$(this).find(".bar").css("width",(thisW * (listData*listN)/options.markInterval)/100 - 4 + "px");
			});			
		}else{
			
		}
	}
	tnSet();
	$(window).resize(function(){
		tnSet();
	});
 }
