$(document).ready(function() {
	popupS();
	cropS();
	customSelect();
	anchorAni();
	winPop();
	sorting();
	//minH();
	/* 산출물관리 html include */
	$(".headerInclude").load("include/topLayout.html");
	$(".footerInclude").load("include/footerLayout.html");
	/* EOD : 산출물관리 html include */
});


$(document).on("click",function(){

});

$(window).resize(function(){
	winPop();
});


$(window).load(function(){
	//$(".topAllMenu .topAllMenuIn > ul > li > a").attr("href","javascript:void(0);");
});
$(window).scroll(function(){

});

function anchorAni(){
	function tnSet(){
		var insertDelay = $(window).outerHeight()/5;
		var winH = $(window).outerHeight();
		var scrollH = $(window).scrollTop();

		$('.anchorAni').each(function(){
			thisH = $(this).outerHeight();
			thisP = ($(this).offset().top + insertDelay)-thisH/2;
			trans = $(this).attr("data-transition");
			$(this).css("transition-duration",trans);

			if((thisP < winH) || (thisP-winH) < scrollH) {
				$(this).addClass("active");
			}else{
				$(this).removeClass("active");
			}
		});
	}

	$(window).resize(function(){
		tnSet();
	});

	$(window).scroll(function(){
		tnSet();
	});
}

function sorting(){
	$(".sorting").on("click",function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
		}else{
			$(this).addClass("active");
		}
	});
}

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

/* 새창 팝업 */
function winPop(){
	popH = $(window).outerHeight() - parseInt($(".windowPopH").outerHeight()) - parseInt($(".windowPopBtn").outerHeight());
	$(".windowPopBox").css("height",popH-80 + "px");
	$(".windowPopBox").closest("html").css({
		"overflow-y"	:		"hidden",
		"min-width"		:		"1264px",
		"background"	:		"#fff",
	});
	$(".windowPopBox").closest("body").css({
		"overflow-y"	:		"hidden",
		"min-width"		:		"1264px",
		"background"	:		"#fff",
	});
}
/* EOD : 새창 팝업 */

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

		tN.addClass("pie");

		var txtBox = new Array(); // 데이터 배열 선언
		var Tdata = new Array(); // 텍스트 배열 선언
		var proli = tN.find(".progress li"); // 데이터 개수 파악


		tN.find(".progress li").each(function(index){

			txtBox.push($(this).find(".txt").text()); // 차트의 데이터값 배열에 입력
			Tdata.push($(this).find(".data").text()); // 차트의 텍스트값 배열에 입력

		});


		var data = new Array(); // 문자열 변환을 위한 데이터 배열

		for(var i=0; i<proli.length; i++){

			data.push(eval(Tdata[i]));

		} // 배열 데이터 수식 배열 데이터로 변환


		var chartWidth = tN.innerWidth(); // 차트의 가로값
		var chartHeight = options.height; // 차트 높이
		var chartdw = options.donut_width; // pie 차트 도넛 가로값
		var charttype = options.type; // 차트 유형
		var chartName = options.title; // 차트 네임
		var chartColor = options.colorset;
		var chartDiv = tN;

		var CONST_SVG_URL = 'http://www.w3.org/2000/svg';
		var VML_NAME_SPACE = 'urn:schemas-microsoft-com:vml'
		var CONST_MAX_RADIUS = 100;
		var CONST_DECREMENT = 20;

		var Nwagon = {
		    chart: function(options){
		        var isIE_old = false;
		        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { // test for
																	// MSIE x.x;
		            var ieversion = new Number(RegExp.$1); // capture x.x
															// portion and store
															// as a number
		            if (ieversion <= 8){

		                isIE_old = true;
		                if(!document.namespaces['v']) {
		                   document.namespaces.add('v', VML_NAME_SPACE);
		                }
		            }
		        }

		        var chartObj = new Object();

		        chartObj.chartType = charttype;
		        chartObj.dataset = options['dataset'];
		        chartObj.dataset.colorset = chartColor;
		        chartObj.width = chartWidth;
		        chartObj.height = chartHeight;
		        chartObj.chart_div = chartDiv.selector;
		        chartObj.legend = options['legend'];
		        chartObj.donut_width = chartdw;

		        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;

		        if(regExp.test(chartObj.chart_div)){
		        	var t = chartObj.chart_div.replace(regExp, "");
		        	chartObj.chart_div = t;
	        	}
	        	;

		        // ************ values.length should be equal to names.length
				// **************//
		        switch (chartObj.chartType)
		        {

		            case ('donut') :
		            case ('pie') :
		                chartObj.core_circle_radius = 0;
		                if(chartObj.chartType == 'donut'){
		                    chartObj.core_circle_radius = options['core_circle_radius'];
		                }

		                chartObj.donut_width = chartdw;

		                isIE_old ? Nwagon_ie.donut.drawDonutChart(chartObj) : this.donut.drawDonutChart(chartObj);
		                break;
		        }
		    },

		    createChartArea: function(parentSVG, chartType, viewbox, width, height){

		        var chartDiv = document.getElementById(parentSVG);

		        // var textArea = document.createElement('ul');
		        // textArea.className = 'accessibility';
		        // chartDiv.appendChild(textArea);

		        tN.append("<div class='title'>" + chartName + '</div>'); // 타이틀 생성

		        var attr = {'version':'1.1', 'width':width, 'height':height, 'viewBox':viewbox, 'class':'Nwagon_' + chartType, 'aria-hidden':'true'};
		        var svg = Nwagon.createSvgElem('svg', attr);
		        chartDiv.appendChild(svg);

		        return svg;
		    },

		    createSvgElem: function(elem, attr){
		        var svgElem = document.createElementNS(CONST_SVG_URL, elem);
		        Nwagon.setAttributes(svgElem, attr);
		        return svgElem;
		    },

		    setAttributes: function(svgObj, attributes){
		        var keys_arr = Object.keys(attributes);
		        var len = keys_arr.length;
		        for(var i = 0; i<len; i++){
		            svgObj.setAttribute(keys_arr[i], attributes[keys_arr[i]]);
		        }
		    },

		    getMax: function(a){
		        var maxValue = 0;
		        if(a.length){
		            for (var j = 0; j < a.length; j++)
		            {
		                var a_sub = a[j];
		                if(a_sub.length){
		                    for(var k = 0; k<a_sub.length; k++){
		                        if (typeof(a_sub[k]) == 'number' && a_sub[k] > maxValue) maxValue = a_sub[k];
		                    }
		                }
		                else{
		                    if (typeof(a[j]) == 'number' && a[j] > maxValue) maxValue = a[j];
		                }
		            }
		        }
		        return maxValue;
		    },

		    createTooltip: function(tooltip, px, py, value, height, ytextOffset, yRectOffset){

		    	var tooltip = Nwagon.createSvgElem('g', {'class':'tooltip'});

		        return tooltip;
		    },

		    showToolTip: function(tooltip, px, py, value, height, ytextOffset, yRectOffset){
		        return function(){
		            tooltip.style.cssText = "display: block";
		            var text_el = tooltip.getElementsByTagName('text')[0];
		            text_el.textContent = ' '+value;
		            Nwagon.setAttributes(text_el, {'x':px, 'y':py-ytextOffset, 'text-anchor':'middle'});
		            var width = text_el.getBBox().width;
		            Nwagon.setAttributes(tooltip.getElementsByTagName('rect')[0], {'x':(px-width/2)-5, 'y':py-yRectOffset, 'width':width+10,'height':height});
		        }
		    },

		    hideToolTip: function(tooltip){
		        return function(){
		           tooltip.style.cssText = "display: none";
		        }
		    },

		    getAngles: function(arr, angles){

		        var total = 0;
		        var start = 0;
		        var end = 0;

		        for(var i=0; i<arr.length; i++){
		            total+=arr[i];

		        }
		        for(i=0; i<arr.length; i++){
		            var degree = 360 * (arr[i]/total);

		            angles['angles'].push(degree);
		            angles['percent'].push(arr[i]/total);
		            angles['values'].push(arr[i]);

		            end = end + angles['angles'][i];
		            start = end - angles['angles'][i];

		            mid = (end + start) / 2

		            angles['mid'].push(mid);

		        }
		        return angles;


		    },

		    getOpacity: function(opa, r, max_r){
		                var len  = opa.length;
		                var interval = max_r/len;
		                var value = Math.ceil(r/interval);
		                return opa[value-1];
		    },


		    donut: {
		        drawDonutChart: function(obj){
		            var width = obj.width, height = obj.height;
		            var viewbox = '-' + width/2 + ' -' + height/2 + ' ' + width + ' ' + height;
		            var svg =  Nwagon.createChartArea(obj.chart_div, obj.chartType, viewbox, width, height);
		            var angles = {'angles':[], 'percent':[], 'values':[],'mid':[]};
		            var degree_values = obj.dataset['values'];

		            if(degree_values){
		                angles = Nwagon.getAngles(degree_values, angles);
		            }
		            this.drawDonut(obj.chart_div, angles, obj.chartType, svg, obj.dataset, obj.core_circle_radius, obj.donut_width);
		            if(obj.core_circle_radius == 0){
		                this.drawField(obj.dataset['fields'], obj.dataset['colorset'], svg, obj.donut_width/2);
		            }
		            else{
		                this.drawField(obj.dataset['fields'], obj.dataset['colorset'], svg, obj.donut_width);
		            }

		        },
		        drawDonut: function(parentDiv, angles, chart_type, parentSVG, data, core_radius, donut_width){
		            // var core_circle_radius = core_radius;
		            var radius = donut_width + core_radius;

		            var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];


		            var create_data_li = function(text_to_add){
		                if(ul){
		                    var li = document.createElement('li');
		                    li.innerHTML = text_to_add;
		                    ul.appendChild(li);
		                }
		            };

		            var foreground = Nwagon.createSvgElem('g', {'class':'foreground'});
		            parentSVG.appendChild(foreground);
		            var donuts = Nwagon.createSvgElem('g', {'class':'donuts'});
		            foreground.appendChild(donuts);
		            var tooltip = Nwagon.createTooltip();
		            foreground.appendChild(tooltip);

		            var varg = tN.find("g.donuts");

		            /* 차트 패턴 생성 */
								/*
		            var attr1 = {'id':'pattern1', 'patternUnits':'userSpaceOnUse','patternTransform':'matrix(1,0,0,1,0,0)','width':'20','height':'20'};
			        var pat1 = Nwagon.createSvgElem('pattern', attr1);

			        var attrimg1 = {'href':'/images/template10/resp/default/usr/dateType_chart_pink.png','x':'0','y':'0','width':'20','height':'20'};
			        var imga1 = Nwagon.createSvgElem('image', attrimg1);

			        var attr2 = {'id':'pattern2', 'patternUnits':'userSpaceOnUse','patternTransform':'matrix(1,0,0,1,0,0)','width':'20','height':'20'};
			        var pat2 = Nwagon.createSvgElem('pattern', attr2);

			        var attrimg2 = {'href':'/images/template10/resp/default/usr/dateType_chart_yellow.png','x':'0','y':'0','width':'20','height':'20'};
			        var imga2 = Nwagon.createSvgElem('image', attrimg2);

			        var attr3 = {'id':'pattern3', 'patternUnits':'userSpaceOnUse','patternTransform':'matrix(1,0,0,1,0,0)','width':'20','height':'20'};
			        var pat3 = Nwagon.createSvgElem('pattern', attr3);

			        var attrimg3 = {'href':'/images/template10/resp/default/usr/dateType_chart_skyblue2.png','x':'0','y':'0','width':'20','height':'20'};
			        var imga3 = Nwagon.createSvgElem('image', attrimg3);

		            varg.append(pat1);
		            varg.find("#pattern1").append(imga1);
		            varg.append(pat2);
		            varg.find("#pattern2").append(imga2);
		            varg.append(pat3);
		            varg.find("#pattern3").append(imga3);
								*/
		            var colors = data['colorset'];

		            var length = angles['angles'].length;
		            var arch_end_x = 0, arch_end_y = 0;
		            var points_to_draw = '', text_to_add = '';
		            var names = data['fields'];
		            var angle_to_rotate = 0;
		            var sub_angle = angle_in_int = angle_in_int_accumulate = 0;

		            for(var j=0; j<length; j++)
		            {
		                var path;
		                if(angles['percent'][j] < 1){
		                    sub_angle = (Math.PI*2) * angles['percent'][j];
		                    angle_in_int = angles['angles'][j];
		                    if(j > 0){
		                        angle_in_int_accumulate+=angles['angles'][j-1];
		                    }
		                    if(core_radius > 0) {
		                        if(sub_angle){
		                            arch_end_x = (radius)*Math.sin(sub_angle);
		                            arch_end_y = sub_angle ? -(radius*Math.sin(sub_angle)/Math.tan(sub_angle)) : 0;

		                            var end_x = core_radius*Math.sin(sub_angle);
		                            var end_y = sub_angle ? -(core_radius*Math.sin(sub_angle)/Math.tan(sub_angle)) : 0;

		                            if(sub_angle > Math.PI){
		                                points_to_draw = 'M0 '+ -core_radius+ ' L0 ' +'-'+radius +' A ' + radius + ' ' + radius + ' 0 1 1 ' + arch_end_x +' '+ arch_end_y +' L '+ end_x +' '+ end_y;
		                                points_to_draw+= ' A ' + core_radius + ' ' + core_radius + ' 0 1 0 0 '+ -core_radius + ' Z';
		                            }
		                            else
		                            {
		                                points_to_draw = 'M0 '+ -core_radius+ ' L0 ' +'-'+radius +' A ' + radius + ' ' + radius + ' 0 0 1 ' + arch_end_x +' '+ arch_end_y +' L '+ end_x +' '+ end_y;
		                                points_to_draw+= ' A ' + core_radius + ' ' + core_radius + ' 0 0 0 0 '+ -core_radius + ' Z';
		                            }
		                        }
		                        else{
		                            points_to_draw = 'M0 0 L 0 0 Z';
		                        }

		                    }
		                    else{
		                        if(sub_angle){
															arch_end_x = radius*Math.sin(sub_angle);
															arch_end_y = sub_angle ? -(radius*Math.sin(sub_angle)/Math.tan(sub_angle)) : 0;
																	if(sub_angle > Math.PI){
			                                points_to_draw = 'M0 0 L0 ' +'-'+radius +' A ' + radius + ' ' + radius + ' 0 1 1 ' + arch_end_x +' '+ arch_end_y +' L0 0 Z';
			                            }
			                            else{
			                                points_to_draw = 'M0 0 L0 ' +'-'+radius +' A ' + radius + ' ' + radius + ' 0 0 1 ' + arch_end_x +' '+ arch_end_y +' L0 0 Z';
																			//points_to_draw = 'M5 0 L5 ' +'-'+radius +' A ' + radius + ' ' + radius + ' 0 0 1 ' + arch_end_x +' '+ Number(arch_end_y-5) +' L5 -5 Z';
			                            }
		                        }
		                        else{
		                            points_to_draw = 'M0 0 L 0 0 Z';
		                        }
		                    }

		                    path = Nwagon.createSvgElem('path', {'class':'sector fill' + [j], 'd':points_to_draw, 'fill':colors[j]});

		                    donuts.appendChild(path);
		                }
		                else{
		                    attributes = {'cx':0, 'cy':0, 'r':radius, 'class':'sector fill' + [j], 'stroke':'transparent', 'fill': colors[j]};
		                    attributesZero = {'cx':0, 'cy':0, 'r':radius, 'stroke':'transparent', 'fill': '#eee'};

		                    zeroData = "";
		                    for (i=0; i<proli.length; i++){
			                    zeroData += "0";
		                    }

		                    if(chartDiv.find(".data").text() == zeroData){
		                    	path = Nwagon.createSvgElem('circle', attributesZero);
		                    }else{
		                    	path = Nwagon.createSvgElem('circle', attributes);
		                    }

		                    donuts.appendChild(path);


		                    if(core_radius > 0){
		                        var inner_attributes = {'cx':0, 'cy':0, 'r':core_radius, 'stroke':'transparent', 'fill-opacity': 1, 'fill': 'white'};
		                        var inner_circle = Nwagon.createSvgElem('circle', inner_attributes);
		                        donuts.appendChild(inner_circle);
		                    }
		                }

		                if(angles['angles'].length){
		                    angle_to_rotate = angle_in_int_accumulate;
		                }
		                else{
		                    angle_to_rotate = (angle_in_int*j);
		                }
						var sectors = document.querySelectorAll('#' + parentDiv +  ' .Nwagon_'+chart_type+' .foreground .sector');

						if(sectors.length > 0){
							var sector = sectors[sectors.length-1];

							if(j==0){
								sector.setAttribute('transform','scale(1.077) rotate('+ angle_to_rotate +')');
								sector.setAttribute('stroke','#fff');
								sector.setAttribute('stroke-width','6');
							}else{
								sector.setAttribute('transform','rotate('+ angle_to_rotate +')');
							}
						}


						text_to_add = names[j] ? (angles['percent'][j]*100).toFixed(0) : 'undefiend';


		                if(10 < text_to_add){

		                	var tooltip_radius = radius + 10;

		                }else{

		                	var tooltip_radius = (radius * 2) + 30;

		                }

				        var tooltip_angle = (Math.PI * (angles['mid'][j]-90))/180;

		                var tooltip_y = (tooltip_radius * Math.sin(tooltip_angle) / 2) + 8;
		                var tooltip_x = (tooltip_radius * Math.cos(tooltip_angle) / 2) - 17;// *
																			// Math.cos(angle_to_rotate);

		                /* 툴팁 영역 생성 */


		                if(0 == text_to_add){
		                	var tooltiptxt = Nwagon.createSvgElem('text', {'x':0,'y':0,'display':'none'});
		                }else if(10 < text_to_add){
		                	var tooltiptxt = Nwagon.createSvgElem('text', {'x':tooltip_x,'y':tooltip_y});
		                }else if("NaN" == text_to_add){
		                	var tooltiptxt = Nwagon.createSvgElem('text', {'x':0,'y':0});
	                    }else{
		                	var tooltip_x = (tooltip_radius * Math.cos(tooltip_angle) / 2) - 10;
		                    var tooltiptxt = Nwagon.createSvgElem('text', {'x':tooltip_x,'y':tooltip_y,'class':'small'});
		                }
		                tooltip.appendChild(tooltiptxt);

				        /* % 수치 텍스트 노드 생성 */
		                var setTextVal = text_to_add == 'NaN' ? '0': text_to_add;
				        var txtNode = document.createTextNode(setTextVal + '%');
				        tooltiptxt.appendChild(txtNode);

		                // path.onmouseover = Nwagon.showToolTip(tooltip, tooltip_x, tooltip_y, text_to_add, 14, 7, 18);
		                // path.onmouseout = Nwagon.hideToolTip(tooltip);

		                /*
		                   접근성 관련 텍스트 생성 주석

		                   create_data_li(text_to_add);

		                */

		            }

		           /* dataN = [];
		            listN = tN.find(".progress li .data span").length;

		            tN.find(".progress li").each(function(){
		            	if($(this).find(".data span").text() == "0"){
		            		dataN.push($(this).find(".data span").text());
		            	}
		            });

            		if(dataN.length == listN){
            			tooltiptxt = Nwagon.createSvgElem('text', {'x':0,'y':0});
            			tooltip.append(tooltiptxt);
            			tooltiptxt.appendChild(txtNode);
	            	}*/
		        },



		        drawField: function(fields_names, colorset, parentSVG, width){
					if(fields_names.length)
					{
						/* 범례 생성 주석

						var fields = Nwagon.createSvgElem('g', {'class':'fields'});
						parentSVG.appendChild(fields);
						var attributes = {};
						var height = 15;
						var numOfFields = fields_names.length;

						for (var i = 0; i<numOfFields; i++)
						{
							var px = width * 4;
							var py = (30*i) - (numOfFields * height); // 70 ;

							attributes = {'x':px, 'y':py-2, 'width':20, 'height':height, 'fill':colorset[i]};
							var badge = Nwagon.createSvgElem('rect', attributes);
							fields.appendChild(badge);

							attributes = {'x':px+25, 'y':py+10, 'alignment-baseline':'unset'};
							var name = Nwagon.createSvgElem('text', attributes);
							name.textContent = fields_names[i];
							fields.appendChild(name);
						}

						*/
					}
		        }

		    },

		};

		Nwagon.chart({'dataset': {values: data,fields: txtBox}});

	}else if(options.type == "vertical"){
		dataH = tN.find(".data").css("font-size");
		dataH = dataH.replace(/[^0-9]/g,"");
		tN.find(".chartIn").prepend("<ul class='mark'>");
		var markNum = options.markInterval+1;

		tN.addClass("vertical");
		tN.find(".progress").wrap("<div class='lineBox'></div>");
		tN.find(".lineBox").append("<ul class='line'>");

		for(var i = 0; i < markNum; i++) {
			markValue = ((options.markEnd-options.markStart) /options.markInterval)*i ;
			if(i==0) {
				tN.find(".mark").prepend("<li><span>" + options.markStart + "</span></li>");
			}else {
				tN.find(".mark").prepend("<li><span>" + markValue + "</span></li>");
			}
			tN.find(".line").prepend("<li></li>");
			tN.find(".line li:last-child").addClass("last");
		}
		tN.find(".chartIn").append("</div></ul>");
		tN.find(".mark li, .line li").css("height", (100/options.markInterval) + "%");

		markH = tN.find(".mark li span").css("font-size");
		markH = markH.replace(/[^0-9]/g,"");
		tN.find(".mark li span").css("top", "-" + markH/2 + "px");

		setTimeout(function(){
			tN.find(".progress li .progressWrap").each(function(index){
				speedTurm = (options.speed+(options.speedTurm * index))/1000;

				if(options.drawing == "percent"){
					thisH = parseInt($(this).find(".data").text()) * (options.height/100) ;
				}else{
					thisH = parseInt($(this).find(".data").text());
					thisH = (options.height/(options.markStart+options.markEnd)) * thisH ;
				}

				proNum = $(this).index();

				if(options.markSpace == "small"){
					$(this).css({
						"width"					:		options.barHeight + "px",
						"margin"				:		"0 0 0 " + proNum*(10) + "px",
					});
				}else if(options.markSpace == "print"){
					//$(this).css("margin","0 0 0 " + (proNum*(10))/4 + "px");
					if(options.solo == "true"){
						$(this).css({
							"width"					:		options.barHeight + "px",
							"margin" 				:		"0 0 0 10px",
						});
					}else{
						$(this).css({
							"width"					:		options.barHeight/1.5 + "px",
							"margin" 				:		"0 0 0 3px",
						});
					}

				}else{
					$(this).css({
						"width"					:		options.barHeight + "px",
						"margin" 				:		"0 0 0 " + proNum*(options.barHeight) + "px",
					});
				}

				if(options.animation =! "false"){
					$(this).find(".bar").css("transition"	, "height " + speedTurm +"s ease");
				}

				if(options.markSpace == "print"){
					$(this).find(".bar").css("width", options.barHeight/1.6 + "px");
					$(this).find(".date").css("letter-spacing","-1px");
				}else{
					$(this).find(".bar").css("width", options.barHeight + "px");
				}

				$(this).find(".bar").css({
					//"width"				: options.barHeight + "px",
					"height"			: thisH + "px",
					"transform"		:	"perspective(500px) rotate(.001deg)",
				});

				strN = $(this).find(".data").text().toString();

				if($(this).find(".data").text().toString().length > 3){
					$(this).find(".data").css({
						"font-size"				:		"16px",
						"letter-spacing"	:		"-1.6px",
						"left"						:		"-1px",
					});
				}else{
					if(thisH < 35){
							$(this).find(".data").addClass("rowData");
					}
				}
			});
		},0);

		if(options.markOption == "true"){
			markH = tN.find(".mark li span").css("font-size");
			markH = markH.replace(/[^0-9]/g,"");
			tN.find(".mark li span").css("top", "-" + markH/2 + "px");
		} else if(options.markOption == "custom"){
			tN.find(".mark").html("<li style='line-height:1.15; margin:10px 0 0 0;'>정답률<br/>/<br/>영역</li>");
			tN.find(".mark").css("font-size","15px");
		} else if(options.markOption == "customTime"){
			tN.find(".mark").html("<li style='line-height:1.15; margin:10px 0 0 0;'>학습<br/>시간</li>");
		} else if(options.markOption == "false"){
			tN.find(".mark").remove();
		}

		dataH = parseInt(tN.find(".data").css("font-size"));

		tN.find(".chartIn").append("</ul>");
		tN.append("</div>");
		tN.find(".mark li:last-child").addClass("last");

		tN.css({
			"height"   :   options.height+"px",
		});
	}else if(options.type == "line") {
		tN.addClass("line");
		tN.find(".chartIn").prepend("<ul class='mark'>");
		tN.find(".progress").wrap("<div class='lineBox'></div>");
		tN.find(".lineBox").append("<ul class='line'>");
		tN.find(".chartIn").append("</div></ul>");
		tN.append("<ul class='gubunBox'></ul>");
		tN.find(".chartIn").prepend("<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' version='1.1'></svg>");
		tN.find("svg").css({
			"height"			:			options.height + "px",
			//"height"			:			(options.height+(options.circleHeight)) - ((options.height/options.markInterval)*2) + "px",
			//"top"					:			(options.height/options.markInterval) + "px",
		});

		var proN = tN.find(".progressWrap").length;
		var liN = tN.find(".progress li").length;
		var arrData = [];
		for(i=0; i<proN; i++){
			arrData.push(tN.find(".data").eq(i).text());
		}
		var arrMax = Math.max.apply(null, arrData);
		var arrMin = Math.min.apply(null, arrData);

		for(i=0; i<proN; i++){
			entryH = 0;
			thisH = tN.find(".progressWrap").eq(i).find(".data").html();
			thisH = ((options.height-(options.circleHeight+options.barWidth)-entryH)/(options.markStart+options.markEnd)) * thisH;

			if(options.markPoint == "entryPoint"){
				svgH = options.height - ((options.height/options.markInterval)*2);
				tN.find("svg").css({
					"margin-top"					:			"-" + (options.height/options.markInterval)/2 + "px",
				});
				//entryH = parseInt(options.height/options.markInterval);
				//entry = parseInt(options.height/options.markInterval);

				thisH = tN.find(".progressWrap").eq(i).find(".data").html();
				thisH = ( (svgH / (arrMax-arrMin)) * (thisH-(arrMin)) ) + (options.height/options.markInterval);

				if($(".progressWrap").eq(i).find(".data").html() == arrMax){
					//thisH = options.height/options.markInterval;
				}
			}

			listNo = tN.find(".progressWrap").eq(i).parent("li").index();
			svgNS   = "http://www.w3.org/2000/svg";
			circle = document.createElementNS(svgNS,"circle");
			txt = document.createElementNS(svgNS,"text");
			groupG = document.createElementNS(svgNS,"g");
			listN = tN.find(".progressWrap").length / tN.find(".progress li").length;
			listW = tN.find(".progressWrap").outerWidth()/2;
			listW = tN.find(".progressWrap").outerWidth() * (i%listN) + listW;
			markN = (tN.find(".mark").children("li").length-1);
			//topH = ((options.height-entryH) - (thisH) + options.circleHeight/2) +1;
			topH = ((options.height-((options.circleHeight+options.barWidth)/2)-entryH) - (thisH));

			if($(".progressWrap").eq(i).find(".data").html() < 5){
				//topH = ((options.height-entryH) - (thisH) + options.circleHeight/2)-2;
			}

			if(i < liN){
				tN.find("svg").append(groupG);
			}

			circle.setAttribute("cx",listW);
			circle.setAttribute("cy",topH);
			circle.setAttribute("r",options.circleHeight/2);
			tN.find("svg g").eq(listNo).append(circle);

			//if(i < (proN/liN)){
			if((proN/liN) <= i && i < proN || options.markOptions == "league"){
				gubun = tN.find(".progress li").eq(0).find(".gubun").eq(i-proN/liN).html();
				tN.find(".gubunBox").append("<li>" + gubun + "</li>");

				if(options.markOptions == "league"){
					txtN = tN.find(".progress li").find(".progressWrap").eq(i).find(".data").text();
					/*
					if(txtN < 20){
						topH = topH - 35;
					}
					tN.find("svg g").eq(0).append(txt);
					txtNum = txtN.replace(/[^0-9]/g,"");
					if(txtNum.length == 2){
						txtW = 10;
					}else if(txtNum.length == 3){
						txtW = 16;
					}else{
						txtW = 20;
					}
					*/
					txtW = 16;
				}else{
					txtN = tN.find(".progress li").eq(1).find(".progressWrap").eq(i-proN/liN).find(".data").text() + "점";
					tN.find("svg g").eq(1).append(txt);
					txtW = 16;
				}

				txtY = 6;
				txt.textContent = txtN;
				txt.setAttribute("x",listW-txtW);
				txt.setAttribute("y",topH + ((options.height/options.markInterval)/2) + txtY);
				txt.setAttribute("r",options.circleHeight/2);
				txt.setAttribute("fill","#222");
				txt.setAttribute("stroke-width","0");
			}
			tN.find("svg g").eq(listNo).attr("fill", "#fff");
			tN.find("svg g").eq(listNo).attr("stroke", options.background[listNo]);
			tN.find("svg g").eq(listNo).attr("stroke-width", options.barWidth);
		}

		if(options.markOptions == "league"){
			tN.addClass("league");
			for(i=0; i <= options.markNum; i++){
				tN.find(".mark").prepend("<li>" + options.markName[i] + "</li>");
			}
			tN.find(".mark").find("li").eq(options.markNum).addClass("last");
		}

		for(i=0; i < options.markInterval+1; i++) {
			tN.find(".line").prepend("<li></li>");
			tN.find(".line li:last-child").addClass("last");
		}

		tN.find(".data").remove();
		tN.find(".line li").css("height", (100/options.markInterval) + "%");

		tN.find("svg g").each(function(index){
			circleN = $(this).find("circle").length;
			var pointers = [];
			idx = 0;

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


		if(options.animation != "false"){
			tN.find("svg").css({
				"width"	:	"100%",
				"transition"	:	"width 1.66s ease",
			});
		}
		tN.find("svg").attr("class","active");

		tN.css({
			"height"   :   options.height + "px",
		});

		/*
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
		*/
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

			for(i=0; i<proN; i++){
				listN = tN.find(".progressWrap").length / tN.find(".progress li").length;
				listW = tN.find(".progressWrap").outerWidth()/2;
				listW = tN.find(".progressWrap").outerWidth() * (i%listN) + listW;
				tN.find("svg circle").eq(i).attr("cx",listW);
				txtW = 16;

				tN.find("svg text").eq(i).attr("x",listW-txtW);
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

		}
	}

	//tnSet();

	$(window).resize(function(){
		tnSet();
	});

}
