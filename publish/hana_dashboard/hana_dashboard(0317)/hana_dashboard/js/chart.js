$.fn.chart = function(options){
	var defaults = {
		type : 'horizontal', // horizontal, vertical
		margin : 40,
		speed :    3000, // bar animation speed
		speedTurm : 1000, // bar animation turm speed
		height :    200, // chart height
		barHeight : 20,  // bar height, 짝수만
		// 기준점
		markStart : 0, // 기준점 시작
		markEnd : 500, // 기준점 마지막
		markInterval : 100, // 기준점 간격
	} 
	var options = $.extend(defaults, options);
	var tN = $(this);
		
	var dataH = tN.find(".data").css("font-size");
	dataH = dataH.replace(/[^0-9]/g,"");
	tN.find(".chartIn").prepend("<ul class='mark'>");
	var markNum = (options.markEnd/options.markInterval)+1;
	var barlen = options.barHeight.length;
	
	if(options.type == "horizontal"){
		tN.addClass("horizontal");
		tN.find(".data").wrapInner("<div class='dataIn'></div>");
	
		for(var i = 0; i < markNum; i++) {
			markValue = options.markInterval*i ;								
			if(i==0) {
				tN.find(".mark").append("<li><span>" + options.markStart + "</span></li>");
			}else {
				tN.find(".mark").append("<li><span>" + markValue + "</span></li>");
			}						
		}
		
		if(options.markUse == "custom"){
			tN.find(".mark").hide();
			tN.find(".chartIn").prepend("<ul class='markN'></ul>");
			markNum = tN.find(".progress li").length;
			for(var i = 0; i < markNum; i++) {
				txtN = tN.find(".progress li").eq(i).find(".txt").html();
				tN.find(".markN").append("<li><div class='gubunBox'><div class='gubunBoxIn'>" + txtN + "</div></div>")
			}
		}
				
		listN = 100/ (tN.find(".mark").children("li").length-1);
		tN.find(".mark li").each(function(index){
			markW = $(this).find("span").outerWidth();
			$(this).find("span").css({
				"margin"    :     "0 -" + markW/2 + "px 0 0"
			});
		});
		
		tN.find(".progress li").each(function(index){
			speedTurm = (options.speed+(options.speedTurm * index))/1000;
			$(this).find(".bar").css("transition","width " + speedTurm +"s ease");
		});
		tN.find(".bar").css("height",options.barHeight + "px");
		tN.find(".data span").css("line-height", options.barHeight + "px");
		tN.closest(".chartBox").css("height", options.height + "px");
		tN.css({
			"height"   :   options.height+"px",
		});
	}else if(options.type == "line"){
		tN.addClass("line");

		for(var i = 0; i < markNum; i++) {
			markValue = options.markInterval*i ;
			if(i==0) {
				tN.find(".mark").prepend("<li><span>" + options.markStart + "</span></li>");
			}else {
				tN.find(".mark").prepend("<li><span>" + markValue + "</span></li>");
			}
			//tN.find(".line").prepend("<li></li>");
			//tN.find(".line li:last-child").addClass("last");
		}
		tN.find(".chartIn").append("</div></ul>");
		tN.append("<ul class='gubunBox'></ul>");
		gubunN = tN.find(".progress li").eq(0).find(".progressWrap").length;
		
		for(i=0; i<gubunN; i++){
			gubun = tN.find(".progress li").eq(0).find(".gubun").eq(i).html();
			tN.find(".gubunBox").append("<li>" + gubun + "</li>");
		}

		tN.find(".chartIn").prepend("<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'></svg>");
		tN.find("svg").css("height", options.height+(options.circleHeight) + "px");
		
		var proN = tN.find(".progressWrap").length;
			
		for(i=0; i<proN; i++){
			listN = $(".progressWrap").length / $(".progress li").length;
			indexN = (i%listN);
			listW = $(".progressWrap").outerWidth()/2;
			listW = ((($(".progressWrap").outerWidth()))*(indexN+1)) - listW;
			markN = (tN.find(".mark").children("li").length-1);
			thisH = ((options.height)/markN)/options.markInterval;
			dataN = $(".progressWrap").eq(i).find(".data").html();
			topH = (options.height) - (thisH*dataN) + options.circleHeight/2;
			listNo = $(".progressWrap").eq(i).parent("li").index();

			svgNS   = "http://www.w3.org/2000/svg";
			circle = document.createElementNS(svgNS,"circle");
			groupG = document.createElementNS(svgNS,"g");
			
			if(i < $(".progress li").length){
				tN.find("svg").append(groupG);
			}			
			
			circle.setAttribute("cx",listW);
			circle.setAttribute("cy",topH);
			circle.setAttribute("r",options.circleHeight/2);
			//circle.setAttribute("fill",options.background[listNo]);
			
			tN.find("svg g").eq(listNo).append(circle);
			tN.find("svg g").eq(listNo).attr("fill", options.background[listNo]);
			tN.find("svg g").eq(listNo).attr("stroke", options.background[listNo]);
			tN.find("svg g").eq(listNo).attr("stroke-width", "0");
		}
		
		
		tN.find("svg g").each(function(index){
			circleN = $(this).find("circle").length;
			var pointers = [];
			$(this).find("circle").each(function(){
				gX = $(this).attr("cx");
				gY = $(this).attr("cy");
				pointers.push(gX);
				pointers.push(gY);
			});
			
			svgNS   = "http://www.w3.org/2000/svg";
			polyline = document.createElementNS(svgNS,"polyline");
			polyline.setAttribute("points", pointers);
			polyline.setAttribute("fill","none");
			polyline.setAttribute("stroke-width",options.barWidth);
			tN.find("svg g").eq(index).prepend(polyline);
			
			gX = $(this).attr("cx"); //x1 좌표
			gY = $(this).attr("cy"); //y1 좌표
			ngX = $(this).next().attr("cx"); //x2 좌표
			ngY = $(this).next().attr("cy"); //x2 좌표
			upX = gX-ngX; // x좌표 이동거리
			upY = gY-ngY; // y좌표 이동거리
			inclN  = upY/upX; //기울기
			angleN = Math.floor(Math.atan(upY/upX) * (180/Math.PI))//각도
			angleN = Number(angleN)+1;
			squarX = Math.pow(upX,2); // 대각선길이 x값 공식 
			squarY = Math.pow(upY,2); // 대각선길이 y값 공식
			diagW = Math.floor(Math.sqrt(squarX+squarY));// 대각선 길이
			diagW = diagW.toFixed(0);
		});
		tN.find("svg").attr("class","active");
	}else {
		
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
		
		tN.find(".progress li .progressBox").each(function(index){
			speedTurm = (options.speed+(options.speedTurm * index))/1000;
			$(this).find(".bar").css("transition", "height " + speedTurm +"s ease");
			listData = $(this).find(".data").find(".num").text();
			thisH = (options.height/listN)/options.markInterval;
			$(this).find(".bar").css("height", (thisH*listData) + "px");
		});	
		
		tN.find(".bar").append("<span class='radius'></span>");
		dataH = parseInt(tN.find(".data").css("font-size"));
		tN.css({
			"height"   :   options.height+"px",
		});

		/* vertical */
		tN.find(".progress li").each(function(index){
			
			var Narray =  new Array();
			sum = 0;
			barS = 0;
			
			$(this).find(".progressBox").each(function(index){
				
				data = $(this).find(".data .num").text();
				width = parseInt($(this).outerWidth());		
				
				Narray.push(width);
				dataW = data.toString();
				dataWlen = dataW.length; 

				sum += Narray[index];
				barH = options.barHeight[index];

				$(this).find(".bar").css("width", barH + "px");

				if(data == 0){
					$(this).find(".bar").hide();
				}else{

					beforeW = parseInt(($(this).prev(".progressBox").css("width")));
					$(this).css("margin","0 0 0 " + beforeW + "px");
					if($(this).closest(".chart").attr("id") == "chart01"){	
						thisW = $(this).outerWidth();
						console.log(thisW);
					}
				}
				
				tN.find(".radius").css({
					'border-top-width' : barH + "px" ,
					'border-top-left-radius'   :  barH + "px",
					'border-top-right-radius'  :  barH + "px",
				});

			});
			
			$(this).find(".progressWrap").css("width", sum + "px");

		});


	}
	
	tN.find(".chartIn").append("</ul>");
	tN.append("</div>");
	tN.find(".mark li:last-child").addClass("last");

	function tnSet(){
		pageW = $(window).width();
		
		if(pageW > 640){
			barHeight = options.barHeight;
			margin = options.margin;
		}else{
			barHeight = options.barHeight/2;
			margin = options.margin/2;
			if(barHeight < 17){
				barHeight = 16;
			}else if(margin < 21){
				margin = 0;
			}
		}
		tN.css("margin", margin +"px");

			
		if(options.type == "horizontal"){
			markW = tN.find(".markN").outerWidth();
			tnW = tN.outerWidth();		
			tN.find(".progress").css({
				"max-width"		:	tnW - markW + "px",
				"margin-left"	:	markW + "px",
			});
			
			tN.find(".progress li").each(function(index){
				listData = $(this).find(".data").find(".num").text();
				thisW = $(this).closest(".chart").outerWidth();
				listN = 100/ (tN.find(".mark").children("li").length-1);
				txtW = markW + $(this).find(".dataIn").outerWidth();
				
				if($(this).find(".num").text() >= (options.markEnd - options.markInterval)){
					$(this).find(".bar").css({
						"width"			:	(thisW * ((listData*listN)/options.markInterval))/100 - 4 - txtW + "px",
						"border-radius"	:	"0 " + barH + "px " + barH + "px 0",
					});
				}else{
					$(this).find(".bar").css({
						"width"			:	(thisW * ((listData*listN)/options.markInterval))/100 - 4 + "px",
						"border-radius"	:	"0 " + barH + "px " + barH + "px 0",
					});
				}
			});	
		}else if(options.type == "line"){
			
			var proN = tN.find(".progressWrap").length;

			for(i=0; i<proN; i++){
				listN = $(".progressWrap").length / $(".progress li").length;
				indexN = (i%listN);
				listW = $(".progressWrap").outerWidth()/2;
				listW = ((($(".progressWrap").outerWidth()))*(indexN+1)) - listW;
				markN = (tN.find(".mark").children("li").length-1);
				thisH = ((options.height)/markN)/options.markInterval;
				dataN = $(".progressWrap").eq(i).find(".data").html();
				//topH = (options.height) - (thisH*dataN) + options.circleHeight;
				topH = (options.height) - (thisH*dataN) + options.circleHeight/2;
				listNo = $(".progressWrap").eq(i).parent("li").index();

				tN.find("svg circle").eq(i).attr("cx",listW);
				tN.find("svg circle").eq(i).attr("cy",topH);
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
			
		}else{
			
		}
	}
	
	tnSet();
	
	$(window).resize(function(){
		tnSet();
	});
}