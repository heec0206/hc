$.fn.chart = function(options){
	var defaults = {
		type : 'horizontal', // horizontal, vertical
		margin : 40,
		speed :    3000, // bar animation speed
		speedTurm : 1000, // bar animation turm speed
		height :    200, // chart height
		barHeight : 20,  // bar height, 吏앹닔留�
		// 湲곗���
		markStart : 0, // 湲곗��� �쒖옉
		markEnd : 500, // 湲곗��� 留덉�留�
		markInterval : 100, // 湲곗��� 媛꾧꺽
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

			gX = $(this).attr("cx"); //x1 醫뚰몴
			gY = $(this).attr("cy"); //y1 醫뚰몴
			ngX = $(this).next().attr("cx"); //x2 醫뚰몴
			ngY = $(this).next().attr("cy"); //x2 醫뚰몴
			upX = gX-ngX; // x醫뚰몴 �대룞嫄곕━
			upY = gY-ngY; // y醫뚰몴 �대룞嫄곕━
			inclN  = upY/upX; //湲곗슱湲�
			angleN = Math.floor(Math.atan(upY/upX) * (180/Math.PI))//媛곷룄
			angleN = Number(angleN)+1;
			squarX = Math.pow(upX,2); // ��媛곸꽑湲몄씠 x媛� 怨듭떇
			squarY = Math.pow(upY,2); // ��媛곸꽑湲몄씠 y媛� 怨듭떇
			diagW = Math.floor(Math.sqrt(squarX+squarY));// ��媛곸꽑 湲몄씠
			diagW = diagW.toFixed(0);
		});
		tN.find("svg").attr("class","active");

		tN.css({
			"height"   :   options.height+"px",
		});

	}else{

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

		if(options.type == "vertical"){
			tN.find(".progress li").each(function(index){
				$(this).find(".progressBox").each(function(index){

					barH = options.barHeight[index];
					speedTurm = (options.speed + (options.speedTurm * index))/1000;

					$(this).find(".bar").append("<span class='radius'></span>");
					$(this).find(".radius").css({
						'border-top-width' : barH + "px" ,
						'border-top-left-radius'   :  barH + "px",
						'border-top-right-radius'  :  barH + "px",
					});

					listData = $(this).find(".data").find(".num").text();
					thisH = ((options.height)/listN)/options.markInterval;
					$(this).find(".bar").css({
						"width": barH + "px",
						"height": (thisH*listData) + "px",
					});
				});
			});

			tN.find(".progressBox").each(function(index){

				speedTurm = (options.speed + (options.speedTurm * index))/1000;

				$(this).find(".bar").css({
					"transition":"height " + speedTurm +"s ease",
				});

			});

	    }else{

			tN.addClass("multiBar");

			var newArr = [];

			titW = tN.find(".chart_tit").outerWidth();

			tN.find(".chart_tit").css("margin","0 0 0 -" + (titW / 2) + "px");


			tN.find(".progressWrap").each(function(index){

				speedTurm = (options.speed + (options.speedTurm * index))/1000;

				tN.css({
					"height"		:		options.height + "px",
					"width"			:		options.barHeight*3 + "px",
					"margin"		:		"0 0 0 " + -(options.barHeight/2) + "px",
					"transition"    :       "height " + speedTurm +"s ease"
				});


			});


			tN.find(".progress li .progressBox").each(function(index){
				listData = jQuery(this).find(".data").text();
				thisH = (options.height/listN)/options.markInterval;
				sumH = thisH*listData;
				indexN = jQuery(this).index();
				barH = options.barHeight;

				BoxN = jQuery(this).parent().find(".progressBox").length;
				txtH = jQuery(this).find(".data span").outerHeight() * BoxN;

				newArr.push(sumH);
				var newArrV = newArr.reduce((function(pre, value, idx, arr){
					return pre + value;
				}));

				if(jQuery(this).find(".data").text() == "0"){
					jQuery(this).css({
						"position"		:	"absolute",
						"text-indent"	:	"-9999px",
					});
				}


				jQuery(this).find(".bar").css({
					"height"			:	sumH + "px",
					"width"			:	barH + "px",
				});

				barOH = jQuery(this).find(".bar").outerHeight();

				var barArr = [];
				var sum = 0;

				barArr.push(barOH);
				sum += barArr[index];

				console.log(sum);


				if(indexN == 0){

				}else{
					jQuery(this).css("bottom", newArrV-newArr[indexN] + "px");
					if(BoxN == indexN+1){
						newArr = [];
					}
				}


			    /* �곗씠�곌� 0 �쇰븣 李⑦듃 誘몄텧�� */

				if(sumH == 0){


				}else{

					jQuery(this).find(".bar").append("<span class='radius'></span>");
					jQuery(this).find(".radius").css({
						'border-top-width' : barH + "px" ,
						'border-top-left-radius'   :  barH + "px",
						'border-top-right-radius'  :  barH + "px",
					});

				}

				dataH = jQuery(this).find(".data").outerHeight()/2;

				jQuery(this).find(".data span").css({
					"position"		:		"relative",
					"z-index"		:		"3",
					"margin"		:		"0 0 0 " + (options.barHeight+5) + "px",
				});




				/*

				if(jQuery(this).hasClass("graph02")){


					jQuery(this).find(".data span").css({

							"top"	: "3" + "px",

					});

				}else{

					jQuery(this).find(".data span").css({

						"top"	:	(sumH/2) + (dataH/2) + 2 + "px",

					});

				}

				*/


				jQuery(this).find(".data span").css({

					"top"	:	(sumH/2) + (dataH/2) + 2 + "px",

				});


				/*

				chartB = jQuery(this).css('bottom').replace(/[^0-9]/g,"");
				barOH = jQuery(this).find(".bar").outerHeight();


				if(jQuery(this).hasClass("graph02")){

					if(minH > chartB){

						jQuery(this).find(".data span").css("top","0");

					}else{

						jQuery(this).find(".data span").css("top",(sumH/2) + (dataH/2) + 2 + "px");

					}

				}else{

					if(minH > barOH){

						jQuery(this).find(".data span").css("top","3px");


					}else{

						jQuery(this).find(".data span").css("top",(sumH/2) + (dataH/2) + 2 + "px");

					}

				}


				if(jQuery(this).hasClass("graph02")){

					if(minH > chartB){

						jQuery(this).find(".data span").css("top",(sumH/2) + (dataH/2) + 2 + "px");

					}else{


						jQuery(this).find(".data span").css("top","0");

					}

				}else{

					if(minH > chartB){

						jQuery(this).find(".data span").css("top",(sumH/2) + (dataH/2) + 2 + "px");

					}else{

						jQuery(this).find(".data span").css("top","0");


					}

				}

				*/



				/*


				if(listData < "3"){
					jQuery(this).find(".data span").css("top", (sumH/2) + (dataH/2)-2 + "px");
				}

				*/

			});


			tN.find(".progressBox").css("overflow","inherit");

			/*

			jQuery(document).ready(function(){
				tN.find(".progress li").each(function(index){
					speed = options.speed/1000;
					speedTurm = options.speedTurm/1000;
					jQuery(this).find(".progressWrap").css({
						"height"		:		options.height + "px",
						"width"			:		options.barHeight*3 + "px",
						"margin"		:		"0 0 0 " + -(options.barHeight/2) + "px",
					});
				});

				tN.find(".progressWrap").each(function(index){
					speed = options.speed/1000;
					speedTurm = options.speedTurm/1000;

					$(this).css("transition","height " + speed + "s ease " + speedTurm*(index+1) + "s");

				});

				tN.find(".progressWrap").each(function(index){

					speedTurm = (options.speed + (options.speedTurm * index))/1000;

					$(this).css("transition","height " + speedTurm +"s ease");

				});


			});

			*/

		}

		tN.css({
			"height"  :  options.height+"px",
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
				thisW = $(this).closest(".progress").css("max-width");
				thisW = (thisW.replace(/[^0-9]/g,"")) - ($(this).find(".dataIn").outerWidth()+10);
				listN = 100/ (tN.find(".mark").children("li").length-1);
				txtW = markW + $(this).find(".dataIn").outerWidth();
				barH = options.barHeight;

				/*
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
				*/
				$(this).find(".bar").css({
					"width"			:	(thisW * ((listData*listN)/options.markInterval))/100 - 4 + "px",
					"border-radius"	:	"0 " + barH + "px " + barH + "px 0",
				});

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


			if(options.type == "vertical"){

				/* vertical */

				tN.find(".progress li").each(function(index){

					thisH = $(this).closest(".progress").css("max-height");
					thisH = (thisH.replace(/[^0-9]/g,"")) - ($(this).find(".dataIn").outerWidth()+10);

					var Narray =  new Array();
					sum = 0;

					$(this).find(".progressBox").each(function(index){

						data = $(this).find(".data .num").text();

						barH = options.barHeight[index];
						width = parseInt($(this).innerWidth());
						Narray.push(width);
						sum += Narray[index];
						margin = (width - barH) / 2;

						beforeW = parseInt(($(this).prev(".progressBox").css("width")));
						$(this).css("margin","0 0 0 " + beforeW + "px");

						$(this).find(".bar").css("margin","0 0 0 " + margin + "px");
						$(this).parent(".progressWrap").css("width", sum + "px");

					});
				});

			}else{


				/* multibar */




			}

		}
	}

	tnSet();

	$(window).resize(function(){
		tnSet();
	});
}
