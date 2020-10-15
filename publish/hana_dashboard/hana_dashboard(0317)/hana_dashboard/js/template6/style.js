jQuery(document).ready( function() {

	//GNB영역
	/*jQuery('.gnb').find('.twoDepth').parent('li').addClass('gnbChild');
    jQuery('.gnb').find('.threeDepth').parent('li').addClass('gnbChild');
    
    jQuery('.gnb >.gnbChild').prepend("<div class='toggleMenu'></div>");
    jQuery('.gnb .twoDepth > .gnbChild a').prepend("<div class='toggleMenu'></div>");*/

    
	/*jQuery('.gnb > li > .toggleMenu').click(function(){
		if (jQuery('body').width() < 1200 ) {
			jQuery(this).parent('li').children('.twoDepth').slideToggle();
			jQuery(this).parent('li').toggleClass('open');
		} 
	});*/
	/*jQuery('.gnb .twoDepth .gnbChild > .toggleMenu').click(function(){
		jQuery(this).parent('li').children('.threeDepth').slideToggle();
		jQuery(this).parent('li').toggleClass('open');
		return false;
	});*/

	//LNB 영역
	jQuery('.lnb').find('.twoDepth, .threeDepth').parent('li').addClass('lnbChild');
	jQuery('.lnb').find('.twoDepth, .threeDepth').hide();
	jQuery('.lnb > ul >.lnbChild, .lnb .twoDepth > .lnbChild').prepend("<div class='toggleMenu'></div>");
 
    if(jQuery('.lnb li').hasClass('active')) {
        jQuery('.lnb li.active').parents('li').addClass('open');
        jQuery('.lnb li.active').parents('.twoDepth, .threeDepth').show();
    }else {
        jQuery(this).hide();
	}
    jQuery('.lnb > ul > .lnbChild > .toggleMenu').click(function(){
//    	jQuery('.lnb .twoDepth').slideUp().parent('li').removeClass('open');
    	if(jQuery(this).parent('li').hasClass('open')===true ){
    		jQuery(this).parent('li').removeClass('open');
    		jQuery(this).parent('li').children('.twoDepth').slideUp();
    	}else {
    		jQuery(this).parent('li').addClass('open');
    		jQuery(this).parent('li').children('.twoDepth').slideDown();
    	}
		return false;
	});
    jQuery('.lnb .twoDepth > .lnbChild > .toggleMenu').click(function(){
//    	jQuery('.lnb .threeDepth').slideUp().parent('li').removeClass('open');
    	
    	if(jQuery(this).parent('li').hasClass('open')===true ){
    		jQuery(this).parent('li').removeClass('open');
    		jQuery(this).parent('li').children('.threeDepth').slideUp();
    	}else {
    		jQuery(this).parent('li').addClass('open');
    		jQuery(this).parent('li').children('.threeDepth').slideDown();
    	}
		return false;
	});
    /*jQuery('.lnb > ul > li > a').click(function(){
		jQuery(this).next('.twoDepth').slideToggle();
		jQuery(this).parent('li').toggleClass('open');
		return false;
	});
    
	jQuery('.lnb .twoDepth > li > a').click(function(){
		jQuery(this).next('.threeDepth').slideToggle();
		jQuery(this).parent('li').toggleClass('open');
		return false;
	});*/


    // top button
	jQuery(window).on("scroll resize", function(){
		var wt = jQuery(this).scrollTop();
		var btn_top = jQuery(".topBox");

		if(wt > 150){
			if(jQuery("#footer").offset() != null || jQuery("#footer").offset() != undefined){
				if(jQuery("#footer").offset().top  - jQuery(window).height() < wt){
				   btn_top.stop().animate({opacity:1});
				   btn_top.css({position:"absolute",bottom:"10px"})
				}else {
					btn_top.css({position:"",bottom:"10px"})
					btn_top.stop().animate({opacity:1});
				}
			}
		}else{
			btn_top.stop().animate({opacity:0});
		}

		if(wt > 300){
			jQuery('#header.sub').addClass('scroll');
			jQuery('#header.sub').css({
				opacity: "1",
				transition: "0.3s"
			});

		}else{
			jQuery('#header.sub').removeClass('scroll');
		}

	});

	//FAQ 스크립트
	jQuery(".faq a").click(function() {
	    jQuery(this).next().slideToggle("fast").parent().siblings().removeClass('active').children("div").slideUp("fast");
	    jQuery(this).parent('li').toggleClass('active');
	    return false;
	});
});

function openSearch() {
	
	var searchLi = jQuery('.fixMenu li.search').not('.active');
	
	searchLi.each(function(){
		jQuery('.fixMenu .searchBox').show(); 
		jQuery('.fixMenu .search').addClass('active');
		jQuery('#header').addClass('search');
		jQuery('body').append('<div class="searchDim"></div>');
	})

}
function closedSearch() { 
	jQuery('.fixMenu .searchBox').hide(); 
	jQuery('.fixMenu .search').removeClass('active');
	jQuery('#header').removeClass('search');
	jQuery('.searchDim').remove();
}




function allMenu() {
    //body width
    var bodyWidth = jQuery('#header').width(); 
    if(bodyWidth < 1083){
    	jQuery('#wrap').toggleClass('moH');
    	jQuery('#header').toggleClass('mActive');
        //jQuery('.menuDim').toggle();
    	
    	if(jQuery('#header').hasClass('mActive')){
    		console.log('mobileBtnOff');
    	}else{
    		console.log('mobileBtnOn');
    	}
    } else {
        jQuery('#header').toggleClass('active');
        jQuery('.btnMenu').toggleClass('active');
        //jQuery('.menuDim').toggle();
    }
}



function tabList(num){	
    var f = jQuery('.tab-js').find('li');
    for ( var i = 0; i < f.length; i++ ) {			
        if ( i == num) {			
            f.eq(i).addClass('active');	
            jQuery('.tabLayer' + i ).show();
        } else {
            f.eq(i).removeClass('active');					
            jQuery('.tabLayer' + i ).hide();
        }
    }
};



