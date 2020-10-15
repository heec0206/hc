(function ($) {
	var methods = {
		initUpload : function(option){			
			var fileoptions = $.extend(
					{},$.fn.fileUpload.fileDefaults,
					option || {}
				);
			this.each(function(){
				
				var $f = $(this);
				var s = fileoptions.seq;
				var bc = navigator.userAgent.toLowerCase();  //접속한 브라우저의 코드네임 소문자로 저장
				var f=fileoptions;
				var isBc
				if ( -1 != bc.indexOf('msie') ){
					isBc =  true; 
				}else{
					isBc =  false;
				}
				
				var exext = f.exExt;	//제외할 확장자
				var inext = f.inExt;	//허용하는 확장자
				
				var fieldset = $('<div id=\"fileForm_'+s+'\" style=\"width:'+f.formWidth+'\">'+
				'		<input type=\"hidden\" name=\"file_param\" value=\"'+f.paramName+'\"/>'+
				'		<input type=\"hidden\" name=\"'+f.paramName+'_size\" value=\"'+f.maxFileSize+'\"/>'+
				'		<input type=\"hidden\" name=\"'+f.paramName+'_path\" value=\"'+f.filePath+'\"/>'+
				'		</div>');
				
				
				var fileView = '';
				var filetag = '';
				var cnt = '1';
				if(f.adminYn == "N"){
					fileView = $('<div class=\"fileAttach fileView_'+s+'\"><input type="text" class="textInput fileName'+f.seq+'" readonly="readonly" /><button type="button" class="inside btnFind">파일찾기</button></div>');
					filetag ='<input type=\"file\" name=\"dummy\" value=\"\"/>';
				}else{
					fileView = $('<div class=\"fileView_'+s+'\" style=\"vertical-align:middle;\"></div>');
					filetag += '<ul class="file_filed">';
					filetag += '<li>';
					filetag += '<input type="text" class="" value="" readonly="" aria-hidden="true">';
					filetag += '<input id="input_file'+cnt+'" tabindex="-1" type=\"file\" class="'+f.paramName+'" name=\"'+f.paramName+'\" filerqyn=\"'+f.filerqyn+'\" msgname=\"'+f.msgname+'\" seq=\"'+s+'\" value=\"\" style=\"width:35%\"/>';
					filetag += '<label for="input_file'+cnt+'" class="btn_m_orange01" tabindex="0">찾아보기</label>';				
					filetag += '</li>';
					filetag += '</ul>';
					cnt++;
				}
				var file = $(filetag);
				file.change(function(){
					var v= $(this);
					var fileExt = (v.val()).slice(v.val().indexOf(".") + 1).toLowerCase(); //파일 확장자를 잘라내고, 비교를 위해 소문자로 만듭니다.
					var filenm = (v.val()).slice(v.val().lastIndexOf("\\") + 1);
					if(exext !=null && fileExt !=""){
						for(var i=0 ;i<exext.length;i++){	//제외확장자 체크
							if(exext[i].indexOf( fileExt) > -1){
								alert(fileExt+"은 첨부할 수 없는 확장자 입니다.");
								if(isBc){
									v.replaceWith( v.clone(true) );
								}else{
									v.val("");
								}										
								return this;
							}
						}
					}
					var isInFlag = true;
					if(inext !=null && fileExt !=""){
						for(var i=0 ;i<inext.length;i++){	//허용확장자 체크
							if(inext[i].indexOf( fileExt) > -1){
								isInFlag = false;
							}
						}
						if(isInFlag){
							alert(fileExt+"은 허용되지 않는 확장자 입니다.");
							if(isBc){
								v.replaceWith( v.clone(true) );
							}else{
								v.val("");
							}	
							return this;
						}
					}					
					
					if(f.fileAddYn == "Y" && f.adminYn == "N" && v.val() != ''){
						var filecnt = $("#fileList_"+s).find("li").size();
						if( f.max != 0 && f.max <=filecnt ){
							alert("최대 "+f.max+"개를 추가할 수 있습니다.");
							return this;
						}
						jQuery(".fileName"+f.seq).val(v.val());
						var flistTag = $('<li class="'+fileExt+'"></li>');
						flistTag.append($('<a href="#">'+filenm+'</a>'));
						var delset = $('<button type="button" class="btnDelete delbtn'+s+'">삭제</button>').bind('click',function(){
							$("."+f.paramName).eq($(".delbtn"+f.seq).index(this)).remove();
							$(this).parent().remove();
							$("."+f.paramName).each(function(key,obj){
								$(this).attr("name",f.paramName+"@"+key);		
							});	
							filecnt = $("#fileList_"+s).find("li").size();
							if(filecnt-1 == -1)
							{
								$("#fileList_"+s).hide();
							}
						});
						flistTag.append(delset);
						fileView.append(v.clone(true));
						v.addClass(f.paramName).hide();
						$("#fFileList_"+s).append(flistTag);
						if(filecnt >= 0)
						{
							$("#fileList_"+s).show();	
						}													
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);							
						});						
					}
				});

				fileView.append(file);
				if(f.fileAddYn == "Y" && f.adminYn == "Y" ){
					var addBtn = $('<input type="button" class=\"btn_m_plus\"  style=\"float: right;\" value="추가"/>');
					var delBtn = $('<input type="button" class=\"btn_m_minus\" style=\"float: right;display:none\" value="삭제"/>');
					
					addBtn.bind('click',function(){
						var file = $(this).prev().prev();
						var filecnt = $(".fileView_"+f.seq).find("ul li").size();
						
						if( f.max != 0 && f.max <=(filecnt + f.cnt)){
							alert("최대 "+f.max+"개를 추가할 수 있습니다.");
							return this;
						}
						if(file.val() == ""){
							alert("파일을 첨부 후 추가할 수 있습니다.");
								return this;
						}
						
						var fileView =  $(this).parent();
						var addbtn =  $(this);
						var delbtn =  $(this).next();
						var cfileView = fileView.clone(true);
						//cfileView.find(".addbtn").fileUpload('setAddEvent');
						$(cfileView).find("input[type=file]").val("");
						$(cfileView).find("input[type=text]").val("");
						$(cfileView).find(".btn_m_minus").show();

						$(fileView).parent().append(cfileView);
						if(f.adminYn == "N"){
							jQuery(".fileName"+f.seq).eq($("."+f.paramName).index(file)+1).val('');
						}
						addbtn.hide();
						delbtn.show();
						//파일 name변경
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);
							$(this).attr("id",'input_file'+key);
						});
						//파일  라벨 for 변경
						$(".btn_m_orange01").each(function(key,obj){
							$(this).attr("for",'input_file'+key);
						});
						
					});
					delBtn.bind('click',function(){
						var addbtn =  $(this).parent().prev().find(".btn_m_plus");
						var fileView = $(this).parent();
						
						if($(".btn_m_minus").length == 1){
							var cfileView = fileView.clone(true);
							//cfileView.find(".addbtn").fileUpload('setAddEvent');
							$(cfileView).find("input[type=file]").val("");
							$(cfileView).find("input[type=text]").val("");
							$(cfileView).find(".btn_m_minus").show();

							$(fileView).parent().append(cfileView);
						}
						
						fileView.remove();
						//파일 name변경
						$("."+f.paramName).each(function(key,obj){
							$(this).attr("name",f.paramName+"@"+key);
						});
						
						if($(".btn_m_minus").length <= 2){
							addbtn.show();
						}
						
					});
					$(fileView[0]).find('li').append(addBtn);
					$(fileView[0]).find('li').append(delBtn);
					//fileView.append(addBtn);
					//fileView.append(delBtn);
				}

				fieldset.append(fileView);
				
				
				var fList = f.fileList;
				if(f.listViewYn == "Y" && fList !=null && fList != undefined){	
					//파일 리스트
					var fileJ = "";
					
					if(f.adminYn == "N"){
						fileJ = $('<div id="fileList_'+s+'" class="listAttach" ></div>');
						fileJ.append("<ul id='fFileList_"+s+"'></ul><p class='info mobile'>일부기기에서는 첨부파일이 작동하지 않을 수 있습니다.</p>");
					}else{
						fileJ = $('<div id="fileList_'+s+'" class="bbs_modify_file" ></div>');
					}
					
					var fSpan = null;
					var fDown = null;
					var fDel = null;
					f.cnt = fList.length;						
					jQuery.each(fList,function(key,obj){
						if(f.adminYn == "Y"){								
						fSpan =$('<span id="delfile_'+obj.FILE_ID+'"></span>');
						fDown = $('<a href="javascript:void(0)">'+obj.ORIGIN_FILENM+'</a>').bind('click',function(){
							window.open("/common/file/FileDown.do?p_filegrp_id="+obj.FILEGRP_ID+"&p_file_id="+obj.FILE_ID);
						});
						fSpan.append(fDown);
			  			
						fDel = $('<a href="javascript:void(0)"><img src="/images/template5/icon_delete.png" alt="삭제"></a><br>').bind('click',function(){
							$("input[name='p_delfile']").val($("input[name='p_delfile']").val()+obj.FILE_ID+",");//file을 지정하는 jsp페이지에 hidden값으로 넣어준다.
							f.cnt = f.cnt-1;
							$('.fileView_'+s).show();
							
							$("#delfile_"+obj.FILE_ID).remove();		
						});
						fSpan.append(fDel);
						fSpan.append('<br/>');
						
						}else{
							fSpan =$('<li id="delfile_'+obj.FILE_ID+'" class="'+obj.FILE_EXT+'"></li>');
							fDown = $('<a href="javascript:void(0)">'+obj.ORIGIN_FILENM+'</a>').bind('click',function(){
								window.open("/common/file/FileDown.do?p_filegrp_id="+obj.FILEGRP_ID+"&p_file_id="+obj.FILE_ID);
							});
							fSpan.append(fDown);
							fDel = $('<button type="button" class="btnDelete">삭제</button>').bind('click',function(){
								$("input[name='p_delfile']").val($("input[name='p_delfile']").val()+obj.FILE_ID+",");//file을 지정하는 jsp페이지에 hidden값으로 넣어준다.
								f.cnt = f.cnt-1;
								var delcnt = $(".delbtn"+s).length;
								if(f.cnt == 0){
									if(delcnt > 0){
										$("#fileList_"+s).show();
									}else{
										$("#fileList_"+s).hide();
									}
								}
									
								$('.fileView_'+s).show();
								$("#delfile_"+obj.FILE_ID).remove();
							});
							fSpan.append(fDel);								
						}
						fileJ.append(fSpan);
					});
					fieldset.prepend(fileJ);
				}else{
					f.cnt = 0;	
				}
				
				$(this).html(fieldset);
				if(f.cnt >= f.max){
					$('.fileView_'+s).hide();
				}
				this.fileoptions = fileoptions ;
			})
			return this;
		},
		resetFile : function() {
			this.each(function(){
				$(this).fileUpload(this.fileoptions);
			});
			return this;
		},
		setFileParam : function(option) {			
			this.each(function(){
				var fileoptions = $.extend(
						{},this.fileoptions,
						option || {}
					);
				$(this).fileUpload(fileoptions);
			});
			return this;
		}
	}
	$.fn.fileUpload = function(o){
		if (methods[o]){
			return methods[o].apply(this, Array.prototype.slice.call(arguments, 1));
		}else{
			return methods.initUpload.apply(this, arguments);
		}
		
	}
	$.fn.fileUpload.fileDefaults = {
			seq : "1",
			list_target : "", //파일업로더가 들어갈 div의 id 값		
			cnt : 0,	//파일의 갯수
			max : 0,			//파일객체의 최대 갯수
			paramName : "p_addFile",	//파일객체의 파라미터 이름
			fileAddYn : "N",	//파일객체의 파라미터 이름
			listViewYn : "N",	//등록된 파일리스트 출력
			fileList : null,	//등록된 파일리스트
			filePath : '',
			formWidth : "100%",	//파일 폼의 width 값
			maxFileSize : 0,
			exExt : null,		//제외 확장자
			inExt : null,		// 허용 확장자
			adminYn : "Y",
			filerqyn : "N",		// 파일 필수 여부
			msgname : ""		// 파일 아이템 명
	}
	
})(jQuery);
