$(document).ready(function() {
	popupS();
	cropS();
	customSelect();
	menuS();
	//minH();
	/* 산출물관리 html include */
	$(".headerInclude").load("include/topLayout.html");
	$(".footerInclude").load("include/footerLayout.html");
	/* EOD : 산출물관리 html include */
	winPop();
});


$(document).on("click",function(){

});


$(window).load(function(){

});

$(window).scroll(function(){

});

$(window).resize(function(){
	winPop();
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

function winPop(){
	popH = $(window).outerHeight() - parseInt($(".windowPopH").outerHeight()) - parseInt($(".windowPopBtn").outerHeight());
	$(".windowPopBox").css("height",popH-80 + "px");
	$(".windowPopBox").closest("html,body").css({
		"overflow-y"	:		"hidden",
		//"min-width"		:		"1264px",
		"background"	:		"#fff",
	});
}

/* 반응형 popup  */
var popupB, popupH, popupC, popupF, popupSH;
function popupS(n,m,w,h){
	var filter = "win16|win32|win64|macintel|mac|"; // PC�� 寃쎌슦 媛��ν븳 媛�
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
			if($(n).find(".popupCBoxInS").length == 0){
				$(n).find(".popupCBoxIn").wrapInner("<div class='popupCBoxInS'></div>");
			}

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



$.fn.chart = function(options){
	var defaults = {
		type : 'horizontal', // horizontal, vertical , pie
		margin : 40,
		speed :    3000, // bar animation speed
		speedTurm : 1000, // bar animation turm speed
		height :    200, // chart height
		barHeight : 20,  // bar height, 짝수만
		// 기준점
		markStart : 0, // 기준점 시작
		markEnd : 100, // 기준점 마지막
		markInterval : 7, // 기준점 간격
		drawing	:	"default",
		// pie
		donut_width : 75,
		title : '' ,
	}
	var options = $.extend(defaults, options);
	var tN = $(this);

	if(options.type == "pie"){
		var svgNS   = "http://www.w3.org/2000/svg";
		//var svgView = '-' + tN.outerWidth()/2 + ' -' + options.height/2 + ' ' + tN.outerWidth() + ' ' + options.height;
		var svgView = '-' + options.width/2 + ' -' + options.height/2 + ' ' + options.width + ' ' + options.height;

		tN.addClass("pie");
		//tN.append("<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='" + options.height + "'viewBox='" + svgView + "'version='1.1'></svg>");
		tN.append("<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='" + options.height + "'viewBox='" + svgView + "'version='1.1'></svg>");
		tN.find("svg").css("border","1px solid red");

		var listN = tN.find(".progress li").length;
		var txtArr = [];
		var angleArr = [];
		var angleMidArr = [];
		var angles = {'angles':[], 'percent':[], 'txt':[]};
		var total = 0;
		var end = 0;

		for(i=0; i<listN; i++){
			txtN = parseInt(tN.find(".progress li").eq(i).find(".data").text());
			txtArr.push(txtN);
		}

		console.log(txtArr + " : ggg");

		for(i=0; i<listN; i++){
				var groupG = document.createElementNS(svgNS,"g");
				var circle = document.createElementNS(svgNS,"circle");
				var path = document.createElementNS(svgNS,"path");
				var txt = document.createElementNS(svgNS,"text");

				tN.find("svg").append(groupG);
				txtN = tN.find(".progress li").eq(i).find(".data").text();
				sub_angle = (Math.PI*2) * (txtN/100);
				rotateAngle = 360 * (txtN/100);
				angleArr.push(rotateAngle);

				if(i>0){
					rotateAngleSum += angleArr[i-1];
				}else{
					rotateAngleSum = 0;
				}

				if(sub_angle){
					radiusX = options.width*Math.sin(sub_angle);
					radiusY = sub_angle ? -(options.width*Math.sin(sub_angle)/Math.tan(sub_angle)) : 0;
					if(sub_angle > Math.PI){
						if(txtN == 100){
							circle.setAttribute("fill", options.background[i]);
							circle.setAttribute("r", options.width);
							tN.find("g").eq(i).append(circle);
						}else{
							points_to_draw = 'M0 0 L0 ' +'-'+ options.width +' A ' + options.width + ' ' + options.width + ' 0 1 1 ' + radiusX +' '+ radiusY +' L0 0 Z';
						}
					}else{
							points_to_draw = 'M0 0 L0 ' +'-'+options.width +' A ' + options.width + ' ' + options.width + ' 0 0 1 ' + radiusX +' '+ radiusY +' L0 0 Z';
					}
					path.setAttribute("fill", options.background[i]);
					path.setAttribute('transform','rotate('+ rotateAngleSum +')');
					path.setAttribute("d", points_to_draw);
					tN.find("g").eq(i).append(path);
				}else{

				}

				if(10 < txtN){
					txtRadius = options.width + 10;
				}else{
					txtRadius = (options.width * 2) + 30;
				}

				end = end + angleArr[i];
				start = end - angleArr[i];
				mid = (end + start) / 2
				angleMidArr.push(mid);
				txtAngle = (Math.PI * (angleMidArr[i]-90))/180;
				txtRadiusX = (txtRadius * Math.cos(txtAngle) / 2) - 17;
				txtRadiusY = (txtRadius * Math.sin(txtAngle) / 2) + 8;

				txt.setAttribute("x",txtRadiusX);
				txt.setAttribute("y",txtRadiusY);

				if(options.markUnit){
					 txtN = txtN + options.markUnit;
				}
				txt.textContent = txtN;
				tN.find("g").eq(i).append(txt);

				if(txtN != 0 ){

				}

		}
		tN.find(".progress").remove();

	}else if(options.type == "horizontal"){
		tN.addClass("horizontal");
		tN.css("height",options.height+"px");

		listN = tN.find(".progress li").length;
		proN = tN.find(".progressWrap").length;


		for(i=0; i<proN; i++){
			speedTurm = (options.speed+(options.speedTurm * i))/1000;
			txtN = tN.find(".data").eq(i).text();

			if(options.markUnit){
				tN.find(".data").eq(i).text(txtN+options.markUnit);
			}

			tN.find(".graph").eq(i).css({
				"height"			:		options.barHeight + "px",
				"transition"	:		"width "	+	speedTurm + "s ease",
			});
		}
	}else if(options.type == "vertical"){
		tN.addClass("vertical");
		tN.css("height",options.height+"px");
		tN.find(".progress").wrap("<div class='lineBox'></div>");
		tN.find(".lineBox").append("<ul class='line'>");

		dataH = tN.find(".data").css("font-size").replace(/[^0-9]/g,"");
		proN = tN.find(".progressWrap").length;
		listN = tN.find(".progress li").length;

		for(i=0; i < options.markInterval; i++) {
			tN.find(".line").prepend("<li></li>");
		}

		if(options.markGubun == "true"){
			tN.find(".line").after("<ul class='gubunBox'>");

			for(i=0; i<listN; i++){
				tN.find(".gubunBox").append("<li>" + tN.find(".progress li").eq(i).find(".gubun").text() + "</li>");
			}
			tN.find(".gubunBox").append("</ul>");
			tN.css("padding","10px 0 50px 0");
			tN.find(".gubun").css({
				"left"		:		"-9999px",
				"position"			:		"absolute",
			});
		}

		if(options.markOption == "true"){
			tN.find(".chartIn").prepend("<ul class='mark'>");
			for(i=0; i<=options.markInterval; i++){
				markValue = parseInt((options.markEnd-options.markStart) /options.markInterval)*i ;
				if(i==0){
					tN.find(".mark").prepend("<li><span>" + options.markStart + "</span></li>");
				}else{
					tN.find(".mark").prepend("<li><span>" + markValue + "</span></li>");
				}
			}
			tN.find(".mark li").css("height", 100/(options.markInterval) + "%");
		}

		if(options.markLine == "false"){
			tN.find(".line").css("border","none").children("li").css("border-top","none");
		}

		tN.find(".chartIn").append("</div></ul>");
		tN.find(".line li").css("height", (100/options.markInterval) + "%");

		setTimeout(function(){
			for(i=0; i<proN; i++){
				speedTurm = (options.speed+(options.speedTurm * i))/1000;
				classN = (proN/tN.find(".progress li").length);
				tN.find(".bar").eq(i).addClass("type0"+( (i%classN)+1)).css("transition", speedTurm + "s");

				thisH = parseInt(tN.find(".data").eq(i).text());
				thisH = (options.height/(options.markStart+options.markEnd)) * thisH;
				proNum = tN.find(".progressWrap").eq(i).parent().index();

				if(i%classN != 0){
					tN.find(".progressWrap").eq(i).css("margin","0 0 0 " + ((options.barWidth)+5) + "px");
				}else{
					tN.find(".progressWrap").eq(i).css("margin","0 0 0 " + (-options.barWidth) + "px");
				}

				tN.find(".bar").eq(i).css({
					"width"				: options.barWidth + "px",
					"height"			: thisH + "px",
					"transform"		:	"perspective(500px) rotate(.001deg)",
				});

				if(thisH < tN.find(".data").css("top").replace(/[^0-9]/g,"")){
					tN.find(".data").eq(i).css({
						"top"		:		"0",
						"color"	:		"#222",
					});
				}

				if(options.markUnit){
					txt = tN.find(".data").eq(i).text();
					tN.find(".data").eq(i).text(txt+options.markUnit);
				}

			}
		},0);

		tN.find(".chartIn").append("</ul>");
		tN.append("</div>");
	}else if(options.type == "line") {
		tN.addClass("line");
		tN.find(".progress").wrap("<div class='lineBox'></div>");
		tN.find(".lineBox").append("<ul class='line'>");
		tN.find(".chartIn").append("</div></ul>");
		tN.find(".lineBox").append("<ul class='gubunBox'></ul>");
		tN.find(".chartIn").prepend("<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'></svg>");
		tN.css("height",options.height + "px");
		tN.find("svg").css({
			"height"				:		options.height + "px",
			"transition"		:	 "width " + options.transition,
		});

		for(i=0; i < options.markInterval; i++) {
			tN.find(".line").prepend("<li></li>");
		}

		if(options.markOption == "true"){
			tN.find(".chartIn").prepend("<ul class='mark'>");
			for(i=0; i<=options.markInterval; i++){
				markValue = parseInt((options.markEnd-options.markStart) /options.markInterval)*i ;
				if(i==0){
					tN.find(".mark").prepend("<li><span>" + options.markStart + "</span></li>");
				}else{
					tN.find(".mark").prepend("<li><span>" + markValue + "</span></li>");
				}
			}
			tN.find(".mark li").css("height", 100/(options.markInterval) + "%");
			tN.find("svg").css({
				"left"	:		tN.find(".mark").outerWidth()+"px",
			});
			tN.find("svg").css("width", "calc(100% - " + tN.find(".mark").outerWidth() + "px)");
		}

		tN.find(".line li").css("height", (100/options.markInterval) + "%");
		//tN.find(".line li").eq(options.markInterval).css("height","0");

		var proN = tN.find(".progressWrap").length;
		var liN = tN.find(".progress li").length;
		var pointers = [];
		var svgNS   = "http://www.w3.org/2000/svg";

		if(options.markDrawing == "percentage"){
			var arrData = [];
			for(i=0; i<proN; i++){
				arrData.push(tN.find(".data").eq(i).text());
			}
			var arrMax = Math.max.apply(null, arrData);
			var arrMin = Math.min.apply(null, arrData);
		}

		for(i=0; i<proN; i++){
			listNo = tN.find(".progressWrap").eq(i).parent("li").index();
			listN = tN.find(".progressWrap").length / tN.find(".progress li").length;
			listW = tN.find(".progressWrap").outerWidth()/2;
			listW = parseInt(tN.find(".progressWrap").outerWidth() * (i%listN) + listW);
			markN = (tN.find(".mark").children("li").length-1);
			thisH = tN.find(".progressWrap").eq(i).find(".data").html();
			thisH = ((options.height-(options.circleHeight+options.barWidth))/(options.markStart+options.markEnd)) * thisH;

			if(options.markDrawing == "percentage"){
				svgH = options.height - ((options.height/options.markInterval)*2);
				thisH = tN.find(".progressWrap").eq(i).find(".data").html();
				thisH = ( (svgH / (arrMax-arrMin)) * (thisH-(arrMin)) ) + (options.height/options.markInterval);

				tN.find("svg").css({
					//"margin-top"					:			"-" + (options.height/options.markInterval)/2 + "px",
				});
			}

			topH = parseInt((options.height-((options.circleHeight+options.barWidth)/2)) - (thisH));

			if(i < liN){
				groupG = document.createElementNS(svgNS,"g");
				tN.find("svg").append(groupG);
			}

			circle = document.createElementNS(svgNS,"circle");
			circle.setAttribute("cx",listW);
			circle.setAttribute("cy",topH);
			circle.setAttribute("r",options.circleHeight/2);
			tN.find("svg g").eq(listNo).append(circle);
			tN.find("svg g").eq(listNo).attr("fill", "#fff");
			tN.find("svg g").eq(listNo).attr("stroke", options.background[listNo]);
			tN.find("svg g").eq(listNo).attr("stroke-width", options.barWidth);
			pointers.push(listW);
			pointers.push(topH);

			if(options.markTooltip == "true"){
				txt = document.createElementNS(svgNS,"text");
				txtN = tN.find(".progress li").find(".progressWrap").eq(i).find(".data").text();

				if(options.markUnit){
					tN.find(".progress li").find(".progressWrap").eq(i).find(".data").text(txtN+options.markUnit);
					txtN = txtN + options.markUnit;
				}

				txtW = tN.find(".data").eq(i).outerWidth()/2;
				txtY = (options.circleHeight/2)+3;
				txt.textContent = txtN;
				txt.setAttribute("x",listW-txtW);

				if(options.height-(options.circleHeight/2)-tN.find(".data").eq(i).outerHeight() < topH ){
					topH = topH- (tN.find(".data").eq(i).outerHeight()+options.circleHeight+2) ;
				}
				txt.setAttribute("y", topH + (options.circleHeight+tN.find(".data").eq(i).outerHeight()/2) + 3);
				txt.setAttribute("r",options.circleHeight/2);
				txt.setAttribute("fill","#222");
				txt.setAttribute("stroke-width","0");
				tN.find("svg g").eq(listNo).append(txt);
			}

			if(i%(proN/liN) == (proN/liN)-1){
				polyline = document.createElementNS(svgNS,"polyline");
				polyline.setAttribute("points", pointers);
				polyline.setAttribute("fill","none");
				polyline.setAttribute("stroke",options.background[listNo]);
				polyline.setAttribute("stroke-width",options.barWidth);
				tN.find("circle").eq(i).closest("g").prepend(polyline);
				pointers = [];
			}

			if(options.markGubun == "true"){
				if(i<proN/liN){
					gubun = tN.find(".progress li").eq(0).find(".gubun").eq(i-proN/liN).html();
					tN.find(".gubunBox").append("<li>" + gubun + "</li>");
				}
				tN.css("padding", "10px 0 50px 0");
			}
		}

		if(options.markLine == "false"){
			tN.find(".line").css("border","none").find("li").css("border-top","none");
		}
		tN.find("svg").attr("class","active");

	}else if(options.type == "progress"){
		tN.addClass("proChart");

		svgNS   = "http://www.w3.org/2000/svg";
		circle = document.createElementNS(svgNS,"circle");
		txt = document.createElementNS(svgNS,"text");
		groupG = document.createElementNS(svgNS,"g");

		//tN.prepend("<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1' viewBox= '0 0 " + options.width*2 + " " + options.height*2 + "'></svg>");
		tN.prepend("<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1' viewBox= '0 0 42 42'></svg>");

		var listN = tN.find(".progress li").length;

		cxN = (options.width);
		cyN = (options.height);
		//rN = (options.width) - options.strokeWidth;
		rN = 15.91549430918954;
		var fill, stroke, strokeW, strokeDashArry, strokeDashSet, transN;
		transN = "none";

		function circleMake(name, cx, cy, r, fill, stroke, strokeW, strokeDashArry, strokeDashSet, transN) {
			circle = document.createElementNS(svgNS,"circle");
			circle.setAttribute('class', name);
	    circle.setAttribute('cx', cxN);
	    circle.setAttribute('cy', cyN);
	    circle.setAttribute('r', rN);
	    circle.setAttribute('fill', fill);
	    circle.setAttribute('stroke', stroke);
	    circle.setAttribute('stroke-width', strokeW);
			circle.setAttribute('stroke-dasharray', strokeDashArry);
			circle.setAttribute('stroke-dashoffset', strokeDashSet);
			if(name == "circleReval"){
				circle.setAttribute( "transform",  "rotate(-90 " + cxN + " " + cyN + ")");
			}
			tN.find("svg").append(circle);
		}

		circleMake("circleInner", cxN, cyN, rN, "#fff", "","","", "");
		circleMake("cicleBox", cxN, cyN, rN, "transparent", "#dedede", options.strokeWidth, "", "");

		for(i=0; i<listN; i++){
			offsetY = tN.find(".progress").find(".data").eq(i).text();
			circleMake("circleNums", cxN, cyN, rN, "transparent", options.fill[i], options.strokeWidth, offsetY + " " + (100-offsetY), (25+ parseInt(offsetY)));

			txt = document.createElementNS(svgNS,"text");
			tspan = document.createElementNS(svgNS,"text");

			txt.textContent = offsetY;
			tspan.textContent = "점";

			txt.setAttribute("font-size","7pt");
			txt.setAttribute("text-anchor","middle");
			txt.setAttribute("line-height","1");;
			txt.setAttribute("y","25");
			tspan.setAttribute("y","24");
			tspan.setAttribute("font-size","4.5pt");

			if(offsetY < 10){
				txt.setAttribute("x","45%");
			}else if(offsetY == 100){
				txt.setAttribute("x","41%");
				tspan.setAttribute("x","70%");
			}else{
				txt.setAttribute("x","45%");
				tspan.setAttribute("x","65%");
			}

			//txt.prepend(tspan);
			tN.find("svg").append(txt);
			tN.find("svg").append(tspan);
		}
		circleMake("circleReval", cxN, cyN, rN, "transparent", "#dedede", options.strokeWidth, 100, 0);

		tN.find("svg text").css({
			"text-anchor"	:	"middle",
			"line-height"	:	"1",
			"font-weight"	:	"700",
		});

		tN.find("svg text tspan").css({
			"font-weight"	:	"600",
		});

		//<p>radius  = 15.91549430918954 (this equates to a circumference length of 100)</p>
		//<p>stroke  = 10</p>
		//<p>viewBox = -{stroke/2} -{stroke/2} (radius * 2) + stroke (radius * 2) + stroke</p>

		$(".circleReval").attr("class","circleReval active");
		$(".circleReval.active").css("stroke-dashoffset","100");

		if(options.animation != "false"){
			$(".circleReval.active").css("transition","stroke-dashoffset " +  options.animation + "ease;");
		}

		tN.find(".progress").remove();
	}

	function tnSet(){
		if(options.type == "line"){
			groupN = tN.find("svg g").length;

			for(i=0; i<proN; i++){
				listN = tN.find(".progressWrap").length / tN.find(".progress li").length;
				listW = tN.find(".progressWrap").outerWidth()/2;
				listW = tN.find(".progressWrap").outerWidth() * (i%listN) + listW;
				txtW = tN.find(".data").eq(i).outerWidth()/2;
				tN.find("svg circle").eq(i).attr("cx",listW);

				if(options.markUnit){
					tN.find("svg text").eq(i).attr("x",listW-txtW);
				}
			}

			tN.find("svg g").each(function(index){
				var pointers = [];
				$(this).find("circle").each(function(){
					gX = $(this).attr("cx");
					gY = $(this).attr("cy");
					pointers.push(gX);
					pointers.push(gY);
				});
				tN.find("svg polyline").eq(index).attr("points",pointers);
			});

		}else if(options.type == "horizontal"){
			for(i=0; i<proN; i++){
				txtN = tN.find(".data").eq(i).text().replace(/[^0-9]/g,"");
				graphW = (txtN*100)/(options.markStart+options.markEnd);
				graphW = ((tN.find(".bar").outerWidth()*graphW)/100);
				if(tN.find(".bar").outerWidth() < graphW+(tN.find(".data").eq(i).outerWidth()+5)){
					tN.find(".graph").eq(i).css("margin-left", "-" + (tN.find(".data").eq(i).outerWidth()+5) + "px") ;
				}
				graphW = (graphW*100)/tN.find(".bar").outerWidth();
				tN.find(".graph").eq(i).css("width", graphW.toFixed(1) + "%");
			}
		}

	}

	tnSet();

	$(window).resize(function(){
		tnSet();
	});

}
