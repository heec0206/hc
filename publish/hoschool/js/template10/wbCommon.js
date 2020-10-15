$(document).ready(function() {
	popupS();
	cropS();
	customSelect();
	menuS();
	// minH();
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
	// $(".topAllMenu .topAllMenuIn > ul > li >
	// a").attr("href","javascript:void(0);");
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
		// headerH = $(".subVisual").outerHeight() +
		// $(".footerLayout").outerHeight();
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
		// document.title = "나의 홈 | MYCLIP | 웅진씽크빅";
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
 * $(window).load(function(){ $(window).on( 'resize', createSlick ); });
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
		// $(".topAllMenu ul > li > a").attr("href","javascript:void(0);");
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
	 * $(".select_box").each(function(){ selectW =
	 * $(this).find("select").width(); $(this).find("label").css("width",selectW +
	 * "px"); console.log(selectW); });
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
function tabsClick(targetClass, targetId, obj){

	$(obj).parent("li").siblings("li").removeClass("active");
	$(obj).parent("li").addClass("active");
	$("." + targetClass).hide();
	$(targetId).show();

}



/*
 * function popupRe(){ if($("body").hasClass("popup_open")){
 * $(".popup_Box").each(function(){ if($(this).css("display")=="block"){ popupB =
 * $(this).find(".popup_BoxIn").height(); popupH =
 * $(this).find(".popupH").height(); popupF = $(this).find(".popupF").height();
 * popupSH = popupB-((popupH+1) + popupF) - 35; if(popupSH < 0){
 * $(this).find(".popupCBox").css("height","auto"); }else{
 * $(this).find(".popupCBox").css("height",popupSH); } } }); } }
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
		markEnd : 500, // 기준점 마지막
		markInterval : 100, // 기준점 간격
		
		// pie
		donut_width : 100, 
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
		        chartObj.dataset.colorset = ['white'];
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

		    createTooltip: function(){
		        var tooltip = Nwagon.createSvgElem('g', {'class':'tooltip'});
		        
		        var tooltipbg = Nwagon.createSvgElem('rect', {});
		        tooltip.appendChild(tooltipbg);

		        var tooltiptxt = Nwagon.createSvgElem('text', {});
		        tooltip.appendChild(tooltiptxt);

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
		        for(var i=0; i<arr.length; i++){
		            total+=arr[i];
		        }
		        for(i=0; i<arr.length; i++){
		            var degree = 360 * (arr[i]/total);
		            angles['angles'].push(degree);
		            angles['percent'].push(arr[i]/total);
		            angles['values'].push(arr[i]);
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
		            var angles = {'angles':[], 'percent':[], 'values':[]};
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
		                            }
		                        }
		                        else{
		                            points_to_draw = 'M0 0 L 0 0 Z';
		                        }
		                    }
		                    path = Nwagon.createSvgElem('path', {'class':'sector fill' + [j],'d':points_to_draw, 'fill':colors[j]});
		                    
		                    
		                    
		                    donuts.appendChild(path);
		                }
		                else{
		                    
		                    var attributes = {'cx':0, 'cy':0, 'r':radius, 'stroke':'transparent', 'fill': colors[j]};
		                    path = Nwagon.createSvgElem('circle', attributes);
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
							sector.setAttribute('transform','rotate('+ angle_to_rotate +')');
						}

		                var tooltip_angle = (Math.PI * (angle_to_rotate-90))/180; 
		                var tooltip_y = radius * Math.sin(tooltip_angle); 
		                var tooltip_x = radius * Math.cos(tooltip_angle);// *
																			// Math.cos(angle_to_rotate);

		                var degree_value = angles['values'][j].toFixed(0);
		                text_to_add = names[j] ? (names[j]+ '(' +(angles['percent'][j]*100).toFixed(1) +'%) ' + degree_value) : 'undefiend';
		            
		                path.onmouseover = Nwagon.showToolTip(tooltip, tooltip_x, tooltip_y, text_to_add, 14, 7, 18);
		                path.onmouseout = Nwagon.hideToolTip(tooltip);
		                
		                /*
		                   접근성 관련 텍스트 생성 주석 
		                   
		                   create_data_li(text_to_add); 
		                  
		                 */
		            }
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
		
		/* IE8 이하 버전때의 출력방식 변경  */

		var Nwagon_ie = {

		    setStyles: function(obj, styles){
		        for (var key in styles) {
		            if (styles.hasOwnProperty(key)) {
		                obj.style[key] = styles[key];
		            }
		        }
		    },

		    setAttributes: function(obj, attributes){
		        for (var key in attributes) {
		            if (attributes.hasOwnProperty(key)) {
		                obj.setAttribute(key, attributes[key]);
		            }
		        }
		    },
		    createChartArea: function(id, width, height){

				var chartDiv = document.getElementById(id);
				chartDiv.style.cssText = 'width: '+ width+'px; height:'+ height + 'px';
				// var textArea = document.createElement('ul');
				// textArea.className = 'accessibility';
				// chartDiv.appendChild(textArea);

				var vml = document.createElement("v:group");
				vml.setAttribute('class', id);
				vml.setAttribute("coordsize", width + " " + height);
				vml.setAttribute('aria-hidden', 'true');
				vml.style.cssText = 'width: '+ width+'px; height:'+ height + 'px;position:absolute;';

				var rect = document.createElement('v:rect');
				var style_attr = {'width': width + 'px', 'height': height + 'px'};
				
				/* 보더 주석 Nwagon_ie.setStyles(rect, style_attr); */
				
				rect.setAttribute('stroked','true');
				vml.appendChild(rect);
				chartDiv.appendChild(vml);
				return vml;
		    },  

		    createTooltip: function(parentCanvas){
		        var tip = document.createElement('div');
		        var textNode = document.createTextNode('');
		        tip.appendChild(textNode);
		        parentCanvas.appendChild(tip);
		        return tip;
		    },

		    showToolTip: function(tooltip, px,  py, value){
		        return function(){
		            tooltip.style.cssText = 'display: block; padding: 0 5px 0 5px; background-color:#f9f9f9; border: 1px solid #666; position:absolute; z-index:100';
		            tooltip.lastChild.nodeValue = value;
		            tooltip.style.left = px + 'px'; 
		            tooltip.style.top = (py -15) + 'px'; 
		            tooltip.style.fontSize = '12px'; 
		        }
		    },

		    hideToolTip: function(tooltip){
		        return function(){
		            tooltip.style.cssText = "display: none";
		        }
		    },

		    drawWedges: function(cx, cy, r, fillcolor, start_a, end_a, s_attr){
		        var wedge = document.createElement("v:shape"); 
		        var sa = Math.round(start_a * 65535); 
		        var a = -Math.round(end_a * 65536);  
		        var path = "M " + cx + " " + cy + " AE " + cx + " " + cy + " " + r + " " + r + " " + sa + " " + a + " X E"; 

		        attributes = {'path': path, 'fillcolor': fillcolor, 'strokecolor': '#FFFFFF', 'strokeweight':'0px'};    
		        Nwagon_ie.setAttributes(wedge, attributes);
		        Nwagon_ie.setStyles(wedge, s_attr);
		        return wedge;
		    },

		    drawVertex: function(x, y, fill){
		        var circle = document.createElement('v:oval');
		        circle.setAttribute('fillcolor', fill); 
		        circle.setAttribute('strokecolor', fill);
		        circle.setAttribute('strokeweight', '1px');
		        circle.style.cssText = 'z-index:99; width:6px; height:6px';
		        circle.style.top = (y-3) + 'px';
		        circle.style.left = (x-3) + 'px';

		        return circle;
		    },
		    drawFields_for_circular_type_chart: function(fields, colors, canvas, h){
		    	
		    	/* 범례 주석 
		        var style_attr = {};
		        if(fields.length){
		            var lx = 5, ly=10;
		            var field_div = document.createElement('div');
		            
		            style_attr = {'width':Math.round(h/2) + 'px', 'height': Math.round(h*(2/3)) + 'px', 'left': h + 'px', 'top': '70px', 'position':'absolute'};
		            Nwagon_ie.setStyles(field_div, style_attr);
		            field_div.className = 'fields_area';
		            canvas.appendChild(field_div);
		            var attributes = {};

		            for(var i = 0; i<fields.length; i++){
		                var badge = document.createElement("v:rect"); 
		                style_attr = {'width':'20px', 'height': '15px', 'left':'5px', 'top': (ly+i*30) + 'px'};
		                Nwagon_ie.setStyles(badge, style_attr);    
		                attributes = {'fillcolor':colors[i], 'strokecolor': '#FFFFFF', 'strokeweight':'1px'};    
		                Nwagon_ie.setAttributes(badge, attributes);
		                field_div.appendChild(badge); 

		                var name = document.createElement('div'); 
		                name.appendChild(document.createTextNode(fields[i])); 
		                style_attr = {'position':'absolute', 'left': (lx + 30) + 'px', 'top': (ly + 30*i) + 'px', 'fontSize': '12px'};
		                Nwagon_ie.setStyles(name, style_attr);    
		                field_div.appendChild(name); 
		            }
		        }
		        
		        */
		    },
		    polar: {
		        drawPolarChart: function(obj){
		            var width = obj.width, height = obj.height;
		            var values = obj.dataset['values'];
		            var canvas = Nwagon_ie.createChartArea(obj.chart_div, width, height);         
		            var angles = {'angles':[], 'percent':[], 'values':[]};
		            if(obj.chartType == 'polar_pie'){
		                var degree_values = obj.dataset['degree_values'];
		                if(degree_values){
		                    angles = Nwagon.getAngles(degree_values, angles);
		                }
		            }  
		            if(canvas && obj.legend['names'] && obj.dataset){
		                this.drawBackground(canvas, angles['angles'], obj.chartType, obj.legend['names'], obj.dataset, obj.increment, obj.max, obj.core_circle_radius, height);
		                this.drawForeground(canvas, obj.chart_div, angles, obj.chartType, obj.legend, obj.dataset, obj.core_circle_radius, obj.core_circle_value, obj.max, height);
		                if(obj.dataset['fields']){
		                    Nwagon_ie.drawFields_for_circular_type_chart(obj.dataset['fields'], obj.dataset['colorset'], canvas, height);
		                }
		            }
		        },
		        drawForeground: function(canvas, parentDiv, angles, chart_type, legend, dataset, core_circle_radius, core_value, max, h){
		            var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
		            var create_data_li = function(text_to_add){
		                if(ul){
		                    var li = document.createElement('li');
		                    li.innerHTML = text_to_add;
		                    ul.appendChild(li);
		                }
		            };
		            var cx = Math.round(h/2), cy=Math.round(h/2);
		            var names = legend['names']; // names' dimension should
													// match dataset['values']'s
													// dimension
		            var data = dataset['values'];
		            var colors = dataset['colorset'];
		            var opacities = dataset['opacity'];
		            var len = data.length;
		            var start_angle = 90;
		            var style_attr = {};
		            var opacity = 80;
		            var angle_accumulate = Math.PI/2; 
		            if(len){
		                var angle = Math.round(360/len);
		                var angle_in_pie = (Math.PI*2/len);
		                var _text_to_add = '';
		                for(var j=0; j<len; j++){
		                    if(angles['angles'].length){ // polar area chart
		                        angle = angles['angles'][j];
		                        angle_in_pie = (angles['angles'][j] * Math.PI)/180;
		                    }
		                    var sub_data = data[j];
		                    var sub_len = sub_data.length;
		                    var sub_angle = angle/sub_len;
		                    var sub_angle_in_pie = angle_in_pie/sub_len;  
		                    for(var k = 0; k < sub_len; k++){
		                        if(opacities.length){
		                            opacity = Nwagon.getOpacity(opacities, sub_data[k], max) * 100;
		                        }
		                        style_attr = {'cssText':'position:absolute', 'width': canvas.style.width, 'height': canvas.style.height, 'filter': 'alpha(opacity='+ opacity +')' };
		                        var wedge = Nwagon_ie.drawWedges(cx, cy, sub_data[k]+core_circle_radius, colors[j], start_angle, sub_angle, style_attr);
		                        canvas.appendChild(wedge);  
		                        start_angle-=sub_angle;

		                        // draw labels
		                        var label_angle = angle_accumulate + (sub_angle_in_pie/2);
		                        var line_width = max + core_circle_radius + 20;
		                        var x_cord = (cx - 5 - Math.round(line_width * Math.cos(label_angle)));
		                        var y_cord = (h - 5 - cy - Math.round((line_width) * Math.sin(label_angle)));
		                        var label = document.createElement('div'); 
		                        label.appendChild(document.createTextNode(names[j][k]));
		                        style_attr = {'position':'absolute', 'left': x_cord + 'px', 'top': y_cord + 'px', 'fontSize': '13px'};
		                        Nwagon_ie.setStyles(label, style_attr);
		                        canvas.appendChild(label);
		                        _text_to_add = names[j][k] + '('+ sub_data[k] +')';
		                        angle_accumulate+=sub_angle_in_pie;
		                        /* 접근성 관련 텍스트 
		                        create_data_li(_text_to_add);
		                        */
		                    }
		                    
		                }
		                if(core_circle_radius > 0){ // draw core circle and
													// value
		                    style_attr = {'cssText':'position:absolute', 'width': canvas.style.width, 'height': canvas.style.height};
		                    var inner_circle = Nwagon_ie.drawWedges(cx, cy, core_circle_radius, '#FFFFFF', 0, 360, style_attr);
		                    canvas.appendChild(inner_circle);
		                    // TODO: core text
		                    var label = document.createElement('div'); 
		                    label.appendChild(document.createTextNode(core_value));
		                    style_attr = {'cssText':'position:absolute; z-index:100', 'left': cx-(core_circle_radius/2) + 'px', 'top': cy-5 + 'px', 'fontSize': '12px'};
		                    Nwagon_ie.setStyles(label, style_attr);
		                    canvas.appendChild(label);
		                }
		            }
		        },
		        drawBackground: function(canvas, angles, chart_type, obj_names, dataset, increment, max_radius, core_circle_radius, h){
		            var cx = Math.round(h/2), cy=Math.round(h/2);
		            var data = dataset['values'];
		            var len = data.length;
		            
		            var draw_bg_circles = function(radius){
		                var sa = Math.round(90 * 65535); 
		                var a = -Math.round((360)* 65536); 
		                var circle = document.createElement("v:shape"); 
		                var path = 'AE ' + cx + ' ' + cy + ' ' + radius + ' ' + radius +  ' ' + sa + ' ' + a + ' X E';     
		                var attributes = {'path': path, 'fillcolor': '#FFFFFF', 'strokecolor': '#CCC', 'strokeweight':'1px'};    
		                Nwagon_ie.setAttributes(circle, attributes);
		                var style_attr = {'cssText':'position:absolute', 'width': canvas.style.width, 'height': canvas.style.height};
		                Nwagon_ie.setStyles(circle, style_attr);
		                canvas.appendChild(circle);  
		            };
		            
		            // draw bg circles and y labels
		            var r = max_radius + core_circle_radius;
		            while(r > core_circle_radius){
		                draw_bg_circles(r);
		                var label = document.createElement('div'); 
		                label.appendChild(document.createTextNode((r-core_circle_radius).toString()));
		                style_attr = {'cssText':'position:absolute; z-index:100', 'left': cx + 'px', 'top': (h-cy-r-10) + 'px', 'fontSize': '12px'};
		                Nwagon_ie.setStyles(label, style_attr);
		                canvas.appendChild(label);
		                r-=increment;
		            }

		            // straight lines
		            var rotate_angle = 0, tweak_angle = Math.PI/2; // start at
																	// 90 degree
		            if(len){
		                var angle = (2*Math.PI)/len;
		                for(var j=0; j<len; j++)
		                {
		                    if(angles.length){  // for(polar_pie)
		                        rotate_angle += (angles[j] * Math.PI)/180;
		                    } 
		                    else{
		                        rotate_angle = angle * j;
		                    }
		                    var line_width = max_radius + core_circle_radius;
		                    var line = document.createElement('v:shape'); 
		                    var path = 'M '+ cx + ' '+ cy + 'L ' + (cx- Math.round(line_width * Math.cos(rotate_angle + tweak_angle))) +' ' + (h - cy - Math.round((line_width) * Math.sin(rotate_angle+tweak_angle)));
		                    var attributes = {'path': path, 'strokecolor': '#CCC', 'strokeweight':'1px'};    
		                    Nwagon_ie.setAttributes(line, attributes);
		                    style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height};
		                    Nwagon_ie.setStyles(line, style_attr);
		                    canvas.appendChild(line);
		                    
		                    var sub_data = data[j];
		                    if(sub_data){
		                        var sub_len = sub_data.length;
		                        for (var k = 1; k < sub_len; k++)
		                        {
		                            var inner_rotate_angle = rotate_angle + (angle/sub_len*k) +tweak_angle;
		                            
		                            var inner_line = document.createElement('v:shape'); 
		                            var path = 'M '+ cx + ' '+ cy + 'L ' + (cx- Math.round(line_width * Math.cos(inner_rotate_angle))) +' ' + (h - cy - Math.round((line_width) * Math.sin(inner_rotate_angle)));
		                            var attributes = {'path': path, 'strokecolor': '#CCC', 'strokeweight':'1px'};    
		                            Nwagon_ie.setAttributes(inner_line, attributes);
		                            style_attr = {'position':'absolute', 'width': canvas.style.width, 'height': canvas.style.height};
		                            Nwagon_ie.setStyles(inner_line, style_attr);
		                            canvas.appendChild(inner_line);
		                        }
		                    }
		                }
		            }
		        }
		    },

		    donut:{
		        drawDonutChart: function(obj){

		            var width = obj.width, height = obj.height;
		            var canvas = Nwagon_ie.createChartArea(obj.chart_div, width, height);
		            var angles = {'angles':[], 'percent':[], 'values':[]};
		            var degree_values = obj.dataset['values'];
		            if(degree_values){
		                angles = Nwagon.getAngles(degree_values, angles);
		            }
		            this.drawDonut(obj.chart_div, angles, obj.chartType, canvas, obj.dataset, obj.core_circle_radius, obj.donut_width, height);
		            Nwagon_ie.drawFields_for_circular_type_chart(obj.dataset['fields'], obj.dataset['colorset'], canvas, height);
		        }, 

		        drawDonut: function(parentDiv, angles, chartType, canvas, data, core_radius, donut_width, h){
		            var radius = donut_width + core_radius;
		            var ul = document.getElementById(parentDiv).getElementsByTagName('ul')[0];
		            var create_data_li = function(text_to_add){
		                if(ul){
		                    var li = document.createElement('li');
		                    li.innerHTML = text_to_add;
		                    ul.appendChild(li);
		                }
		            };

		            var tooltip = Nwagon_ie.createTooltip(canvas);
		            var values = data['values'];
		            var colors = data['colorset'];
		            var fields = data['fields'];
		            var angle_int = angles['angles'];
		            var attributes = {}, style_attr = {};;
		            var start_angle = 90; // Tweak the angles so that our pie
											// goes clockwise from 12 o'clock.
		            var text_to_add = '';
		            var cx = Math.round(h/2), cy = Math.round(h/2); 
		            
		            for(var i = 0; i < angle_int.length; i++) { 
		                
		                style_attr = {'cssText':'position:absolute', 'width': canvas.style.width, 'height': canvas.style.height /*
																																 * ,'filter':
																																 * 'alpha(opacity=80)'
																																 */};
		                var wedge = Nwagon_ie.drawWedges(cx, cy, radius, colors[i], start_angle, angle_int[i], style_attr);
		                
		                canvas.appendChild(wedge);  

		                var tooltip_angle = (Math.PI * start_angle)/180; 
		                var tooltip_x = cx + radius * Math.cos(tooltip_angle);
		                var tooltip_y = cy + radius * Math.sin(tooltip_angle); 
		                var degree_value = angles['values'][i].toFixed(0);
		                text_to_add = fields[i] ? (fields[i]+ '(' +(angles['percent'][i]*100).toFixed(1) +'%) ' + degree_value) : 'undefiend';
		                wedge.onmouseover = Nwagon_ie.showToolTip(tooltip, tooltip_x, tooltip_y, text_to_add);
		                // wedge.onmouseout = Nwagon_ie.hideToolTip(tooltip);

		                if(chartType == 'donut'){
		                    style_attr = {'cssText':'position:absolute; z-index:50', 'width': canvas.style.width, 'height': canvas.style.height};
		                    var wedge2 = Nwagon_ie.drawWedges(cx, cy, core_radius, '#FFFFFF', start_angle, angle_int[i], style_attr);
		                    canvas.appendChild(wedge2);  
		                }
		                start_angle -= angle_int[i];  
		                // 접근성관련 텍스트 create_data_li(text_to_add);
		            }
		        }
		    }, 
		};	
				
		Nwagon.chart({'dataset': {values: data,fields: txtBox}});
				
	}else {
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
		}
		
		tN.find(".chartIn").append("</ul>");
		tN.append("</div>");
		tN.find(".mark li:last-child").addClass("last");
		tN.css({
			"height"   :   options.height+"px",
		});
		
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
				}
				else if(margin < 21){
					margin = 20;
				}
			}
			tN.css("margin", margin +"px");
			
			if(options.type == "horizontal"){
				tN.find(".progress li").each(function(index){
					listData = $(this).find(".data").text();
					thisW = $(this).closest(".chart").outerWidth();
					listN = 100/ (tN.find(".mark").children("li").length-1);
					$(this).find(".bar").css("width",(thisW * ((listData*listN)/options.markInterval))/100 - 4 + "px");
				});	
			}else{
				tN.find(".bar").css("width", barHeight + "px");
				tN.find(".triangle").css({
					// 'top' : dataH+5 + "px",
					'border'        :  (barHeight/2) + "px solid #fff" ,
					'border-bottom' :  (barHeight/2) + "px solid transparent",
					'border-top'    :  "none"
				});
				tN.find(".progress li").each(function(index){
					proNum = $(this).find(".progressBox").length;
					$(this).find(".progressWrap").css("width",(proNum*barHeight) + (proNum-1)*10 + "px");			
				});
			}
		}
		
		tnSet();
		
		$(window).resize(function(){
			tnSet();
		});
	}
}





