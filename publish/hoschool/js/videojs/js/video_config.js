/*
video js custom
1. Space bar toggles play/pause.
2. Right and Left Arrow keys seek the video forwards and back.
3. Up and Down Arrow keys increase and decrease the volume.
4. M key toggles mute/unmute.
5. F key toggles fullscreen off and on. (Does not work in Internet Explorer)
6. Double-clicking with the mouse toggles fullscreen off and on.

## 수정사항, 2019.10.16. thLim
1. 전역변수 충돌 회피를 위하여 통합객체 _playerData 안에서 모두 관리되게 수정
2. 프로그래스바에 대한 컨트롤 이 가능하므로 전체재생시간이 총재생시간이 아니므로 마지막 재생위치와 재생시간은 별도로 관리해야 함
3. 플레이어가 실제 재생시간을 관리하지 않으므로 플레이 상태에 따라 재생시간이 합산되게 내부로직 구현
4. 이중타이머를 사용 : 실재생시간계산 용, 자동진도저장 용
5. 
*/
var _playerData = {}; // 플레이어 데이터 객체
var _videoSaveWorkType = ''; // 저장작업유형
/*
 * 자동저장 이벤트 발생 주기를 관리하는 인터벌 
 * 인자값으로 인터벌 주기를 받음(분)
 * 기본은 2분으로 설정됨
*/
var _autoSaveTimer;
function autoSaveTimer(autoSaveIntervalMin) {
	if(VIDEO_PLAYER!='undefined' && VIDEO_PLAYER.videoPlayer!='undefined') {
		if(autoSaveIntervalMin=='undefinded' || autoSaveIntervalMin==null || autoSaveIntervalMin=='')
			autoSaveIntervalMin = 2;
		
		autoSaveIntervalMin = 1000 * autoSaveIntervalMin * 60;
			
		if(_autoSaveTimer!=null) {
			clearInterval(_autoSaveTimer); // 자동저장 타이머 시간 초기화
		}
		_autoSaveTimer = setInterval(function() {
			if(!VIDEO_PLAYER.videoPlayer.paused()) {
				// 재생중지 중일 경우 자동저장 실행안함
				VIDEO_PLAYER.doSaveProgress('A');
			}
		}, autoSaveIntervalMin);
	}
}

// 플레이어 구동
function playContents(data) {
	if(data != 'undefined' && data!=null) {
		_playerData = data;
	} else {
		_playerData.autoSaveProgressYn = 'N'; // 자동진도저장허용여부
		_playerData.autoSaveIntervalMin = 2;
		_playerData.updateProgressUrl = ''; // 진도저장URL
		_playerData.timeRateYn = 'Y'; // 배속 재생시간 계산적용여부
		_playerData.startTime = 0; // 최초재생위치
		_playerData.maxStudyTime = 0; // 최대진도위치
		_playerData.firstYn = 'Y'; // 최초재생여부
		_playerData.finishYn = 'N'; // 재생완료여부
	}
	
	$(".videoSkipBtn").hide();
	
	// 플레이어 동영상URL 셋팅
	VIDEO_PLAYER.setSrc(_playerData.contUrlNomal);
	// 화질변경버튼
	VIDEO_PLAYER.videoPlayer.controlBar.QualityToggle.show(); 
	// 진도저장버튼
	if(_playerData.saveProgressBtnYn != 'undefined' && _playerData.saveProgressBtnYn=='N') {
		VIDEO_PLAYER.videoPlayer.controlBar.ProgressSaveToggle.hide(); // 진도저장버튼 숨김
	} else {
		VIDEO_PLAYER.videoPlayer.controlBar.ProgressSaveToggle.show(); // 진도저장버튼 보이기
	}
	// 자막버튼 활성화 여부
	if(_playerData.captionBtnYn != 'undefined' && _playerData.captionBtnYn=='N') {
		isVisibleCaptionBtn = false;
		$('.vjs-caption-control').hide(); 
	}
	// 북마크바(미구현-서버사이드구현필요)
	VIDEO_PLAYER.videoPlayer.controlBar.bookMarkAdd.hide();
	VIDEO_PLAYER.videoPlayer.controlBar.bookMarkToggle.hide();
	VIDEO_PLAYER.videoPlayer.controlBar.bookMarkLayer.hide();
	// 재생시간합에 배속적용여부
	if(_playerData.timeRateYn != 'undefined' && _playerData.timeRateYn=='N') {
		VIDEO_PLAYER.isTimeRate = false;
	}
	// seekbar 제어
	if(_playerData.progressControlYn != 'undefined' && _playerData.progressControlYn=='N') {
		// 학습완료가 아닐 경우만 프로그래스바 제어방지 적용
		if( _playerData.finishYn != 'Y' ) {
			VIDEO_PLAYER.isProgressControl = false;
			// 최대진도위치를 최종 진도위치로 셋팅
			if(_playerData.startTime != 'undefined' && _playerData.startTime!=null && _playerData.startTime>0) {
				VIDEO_PLAYER.maxStudyTime = _playerData.startTime;
				VIDEO_PLAYER.bfStudyTime = _playerData.startTime;
			} else {
				VIDEO_PLAYER.maxStudyTime = 0; 
			}
		}
	}
	// 자막영역 숨기기
	VIDEO_PLAYER.videoPlayer.controlBar.CaptionToggle.removeClass('vjs-caption-control-preview');
	
	// 학습주제 표시
	if ( data.markers != null ){
		VIDEO_PLAYER.videoPlayer.markers(data.markers);
	}
	
	VIDEO_PLAYER.defaultSettingRate();  // 1.0배속
	VIDEO_PLAYER.videoPlayer.volume(1.0); // 최대볼륨
	
	VIDEO_PLAYER.videoPlayer.ready(function() {
		VIDEO_PLAYER.videoPlayer.play();
		//console.log( 'playContents VIDEO_PLAYER.videoPlayer.ready end!! and video play~~' );
	});

	VIDEO_PLAYER.videoPlayer.on('loadedmetadata', function(){
		// 최초재생위치 설정
		if( _playerData.startTime != 'undefined' ) {
			VIDEO_PLAYER.maxStudyTime = _playerData.startTime;
			setTimeout(function(){VIDEO_PLAYER.videoPlayer.currentTime(_playerData.startTime);}, 500);
		}
	});
	/* 플레이어 재생시 이벤트 처리 */
	VIDEO_PLAYER.videoPlayer.on("play",function(){
		// 화면상의 재생버튼 비활성화
		$('.vjs-big-play-button').hide();
	});
	
	/* 배속 버튼 선택시 */
	$(".vjs-rateToggleBtn").on("click",function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(".vjs-rateToggleLayer").removeClass("on");
		}else{
			$(this).addClass("on");
			$(".vjs-rateToggleLayer").addClass("on");			
		}
	});
	
	/* 배속 리스트 팝업 배속 선택시 */
	$(".vjs-rateToggleLayer ul li a").on("click",function(){
		$(".vjs-rateToggleLayer ul li").removeClass("active");
		$(this).parent().addClass("active");
		
		//팝업 닫기
		$(".vjs-rateToggleLayer, .vjs-rateToggleBtn").removeClass("on")
		var rateName = $(this).html();
		$(".vjs-rateToggleBtn button").html(rateName);
	});

}

/* 일시중지 버튼 이벤트 발생 시 */
function callbackPause(){
	//console.log("## callbackPause.....");
	VIDEO_PLAYER.doSaveProgress('P'); // 현재 진도 저장
	// 화면상의 재생버튼 활성화
	$('.vjs-big-play-button').show();
}
/* 멈춤 */
function callbackStop(){
	//console.log("callbackStop : studyTime : " + VIDEO_PLAYER.studyTime);
	// 화면상의 재생버튼 활성화
	$('.vjs-big-play-button').show();
}
/* 콘텐츠 재생 종료 이벤트 */
function callbackEnded(){
	//console.log("callbackEnded : studyTime : " + VIDEO_PLAYER.studyTime);
	//VIDEO_PLAYER.doSaveProgress('E');
	// 재생종료 후 중지이벤트가 먼저 발생 하므로 저장이벤트를 발생할 경우 중복 이벤트가 발생하며 저장 fucntion 은 호출하나 실제 재생시간이 없으므로 서버전송이 발생하지 않음
	if(complateProgressCallBackFunc) {
		complateProgressCallBackFunc();
	}
	
	// 화면상의 재생버튼 활성화
	$('.vjs-big-play-button').show();
}

function callbackTimeupdate(){
	// 비디오 재생시만 재생시간 합산시작, 250ms 마다 실행됨
	// 현재 콘텐츠 재생이 완될 경우 타이머(재생시간합산, 자동진도저장)를 중지
	if ( false == VIDEO_PLAYER.videoPlayer.paused() ) {
		
	}
}

var VIDEO_PLAYER = {
	studyTime : 0, // 플레이어 프로그래스바 위치시간
	bfStudyTime : 0, // 플레이어 프로그래스바 기존 위치
	maxStudyTime : 0, // 프로그래스바 최대위치
	playRunTime : 0, // 최종재생시간
	bfPlayRunTime : 0, // 이전 진도저장 시 재생시간
	lastPlayTime : 0, // 최종저장 후 재생시간
	bfPlaybackRate : 1.0, // 이전 재생배속
	isTimeRate : true, // 재생시간합산 시 배속적용여부
	isProgressControl : true, // 진도제어가능여부
	isVisibleCaptionBtn : true, // 자막버튼보이기여부
	init : function(video_id){
		this.videoPlayer = videojs(video_id, {
		  controls: true,
		  autoplay: true,
		  preload: 'auto',
		  volume : 1.0
		});

		this.videoPlayer.ready(function() {
			this.hotkeys({
			  volumeStep: 0.1,
			  seekStep: 15,
			  enableMute: true,
			  enableFullscreen: true,
			  enableNumbers: false,
			  enableVolumeScroll: true,
			  // Enhance existing simple hotkey with a complex hotkey
			  fullscreenKey: function(e) {
				// fullscreen with the F key or Ctrl+Enter
				return ((e.which === 70) || (e.ctrlKey && e.which === 13));
			  },
			  // Custom Keys
			  customKeys: {
			    previousKey: {
	              key: function(e) {
	                return (e.which === 37);
	              },
	              handler: function(player, options, e) {
	                // Example
	                //alert(37);
	            	  VIDEO_PLAYER.previous();
	              }
	            },
			    nextKey: {
		              key: function(e) {
		                return (e.which === 39);
		              },
		              handler: function(player, options, e) {
		                // Example
		                //alert(37);
		            	  VIDEO_PLAYER.next();
		              }
		            },
				// Add new simple hotkey
				simpleKey: {
				  key: function(e) {
					// Toggle something with S Key
					return (e.which === 83);
				  },
				  handler: function(player, options, e) {
					// Example
					if (player.paused()) {
					  player.play();
					} else {
					  player.pause();
					}
				  }
				},
				// Add new complex hotkey
				complexKey: {
				  key: function(e) {
					// Toggle something with CTRL + D Key
					return (e.ctrlKey && e.which === 68);
				  },
				  handler: function(player, options, event) {
					// Example
					if (options.enableMute) {
					  player.muted(!player.muted());
					}
				  }
				},
				// Override number keys example from https://github.com/ctd1500/videojs-hotkeys/pull/36
				numbersKey: {
				  key: function(event) {
					// Override number keys
					return ((event.which > 47 && event.which < 59) || (event.which > 95 && event.which < 106));
				  },
				  handler: function(player, options, event) {
				  }
				},
				emptyHotkey: {
				  // Empty
				},
				withoutKey: {
				  handler: function(player, options, event) {
					  //console.log('withoutKey handler');
				  }
				},
				withoutHandler: {
				  key: function(e) {
					  return true;
				  }
				},
				malformedKey: {
				  key: function() {
					//console.log('I have a malformed customKey. The Key function must return a boolean.');
				  },
				  handler: function(player, options, event) {
					//Empty
				  }
				}
			  }
			});
			
			// seekbar 
			this.controlBar.progressControl.seekBar.on('mousedown', function(event) {
				//console.log("###controlBar.progressControl.seekBar VIDEO_PLAYER.getCurrentTime() : " + VIDEO_PLAYER.getCurrentTime());
	            //var seekBarEl = this.el();
	            //var seekBarRect = videojs.dom.getBoundingClientRect(seekBarEl);
	            //var seekBarPoint = videojs.dom.getPointerPosition(seekBarEl, event).x;
	            //var duration = VIDEO_PLAYER.videoPlayer.duration();
	            //var seekBarClickedTime = videojs.formatTime(seekBarPoint * duration, duration);
	            //console.log('Seekbar clicked time: ', seekBarClickedTime);
	            return false;
	        });
			
			var myPlayer = this;
			
			// 진행바 제어 
		    this.on("seeking", function(event) {
		    	// 해당 값들은 플레이 중 계속 증가되므로 이벤트 시점의 값으로 비교하기 위해 변수셋팅
		    	var _ctime = myPlayer.currentTime();
		    	var _bstime = parseFloat(VIDEO_PLAYER.bfStudyTime).toFixed(0);
		    	var _mstime = parseFloat(VIDEO_PLAYER.maxStudyTime).toFixed(0);
		    	 
		    	//console.log("## EVENT seeking ::: VIDEO_PLAYER.isProgressControl [", VIDEO_PLAYER.isProgressControl,"] maxStudyTime[",_mstime,"] bfStudyTime[", _bstime,"] currentTime[", _ctime,"]");
		    	
		    	if(!VIDEO_PLAYER.isProgressControl && _ctime>0) {
				    if( _mstime <= _ctime && _bstime != _ctime ) {
				    	//console.log("## EVENT seeking :: Go before currentTime >>> ", _bstime);
				    	if(_playerData.progressControlBlockMsg != 'undefined' && _playerData.progressControlBlockMsg!='') {
				    		VIDEO_PLAYER.showMessage(_playerData.progressControlBlockMsg);
				    	} else {
				    		VIDEO_PLAYER.showMessage('학습중인 경우에는 이동할 수 없습니다.');
				    	}
				    	
				    	myPlayer.currentTime(_bstime);  // seeking work
				    	return false;
				    } else {
				    	//console.log("## EVENT seeking :: Non before currentTime >>> ", _bstime);
				    }
		    	}
		    });
		    // 진행바 제어
		    this.on("seeked", function(event) {
		    	/*
		    	// 해당 값들은 플레이 중 계속 증가되므로 이벤트 시점의 값으로 비교하기 위해 변수셋팅
		    	var _ctime = parseFloat(myPlayer.currentTime()).toFixed(0);;
		    	var _bstime = parseFloat(VIDEO_PLAYER.bfStudyTime).toFixed(0);
		    	var _mstime = parseFloat(VIDEO_PLAYER.maxStudyTime).toFixed(0);
		    	var _dulation = myPlayer.getDuration(); //총 콘텐츠 시간
		    	 
		    	console.log("## EVENT seeked.... maxStudyTime[",_mstime,"] bfStudyTime[", _bstime,"] currentTime[", _ctime);
		    	
		    	if(!VIDEO_PLAYER.isProgressControl && _ctime>0) {
				    if ( _mstime > _ctime || _ctime == _bstime) {
				    	myPlayer.currentTime(_ctime);  // seeking work
				    	return false;
				    }
		    	}
		    	*/
		    });
		    
		    if( _playerData.autoSaveProgressYn == "Y") {
		    	// 진도자동저장
		    	autoSaveTimer(_playerData.autoSaveIntervalMin);
		    }
		    
		    // 재생시간계산 타이머 작동(1초단위로 실행)
	    	var _videoTimer = setInterval(function() {
		      if(!myPlayer.paused()) {
		    	  // 재생중일 경우만 작동
		    	  if(VIDEO_PLAYER.isTimeRate) {
		    		  VIDEO_PLAYER.playRunTime = VIDEO_PLAYER.playRunTime + (1 * VIDEO_PLAYER.bfPlaybackRate);
		    	  } else {
		    		  VIDEO_PLAYER.playRunTime = VIDEO_PLAYER.playRunTime + (1);
		    	  }
		    	  
		    	  // 1초마다 저장 시 씨크바를 연속 클릭했을 경우 기존 시간을 읽어버리는 문제 발생으로 초단위 증가로 변경
		    	  //VIDEO_PLAYER.bfStudyTime = parseFloat(VIDEO_PLAYER.getCurrentTime()).toFixed(0) ; // 재생위치기억
		    	  VIDEO_PLAYER.bfStudyTime++; // 재생위치기억
		    		  
	    		  if( VIDEO_PLAYER.bfStudyTime > VIDEO_PLAYER.maxStudyTime ) {
		    		  // 정상재생 위치가 최대 재생위치보다 클경우 갱신
		    		  VIDEO_PLAYER.maxStudyTime = VIDEO_PLAYER.bfStudyTime;
		    	  }
		      }
		    }, 1000);
		});

		this.textTracks = this.videoPlayer.textTracks();
		/* 플레이어 종료시 이벤트 처리 */
		this.videoPlayer.on('ended', callbackEnded);
		/* 플레이어 중지시 이벤트 처리 */
		this.videoPlayer.on('pause', callbackPause);
		/* 플레이어 자채 인터벌 이벤트 처리 */
		this.videoPlayer.on('timeupdate', callbackTimeupdate);
		
		this.videoPlayer.on('contextmenu', function(e) {
		    e.preventDefault();
		});		
		/* 플레이어 진행바 이벤트 처리 */
		videojs.getComponent("SeekBar").prototype.onMouseMove = function(event){
			alert('SeekBar onMouseMove');
		};
		/*
		this.SeekBar.onMouseMove = function(event){
			return false;
		};
		*/
	},
	setSrc : function(url){
		this.videoPlayer.src([{ type: "video/mp4", src: url }]);

		this.videoPlayer.addRemoteTextTrack({
			"kind":"captions",
			"language":"Korean",
			"label":"Korean",
			"src": _playerData.subTitleUrl
		}, false);

		this.videoPlayer.load();
	},
	getPlayer : function(){
		return this.videoPlayer;
	},
	doSynchronizedCaption : function(){
		if (this.videoPlayer.controlBar.CaptionToggle.hasClass('vjs-caption-control-on')) {
			this.textTracks[0].mode = "showing";
		} else {
			this.textTracks[0].mode = "hidden";
		}
	},
	toggleCaption : function(){
		// 자막보기 버튼 클릭
		//console.log("this.toggleCaption : CALL!!!!!!!!!!!!!!!");
		if (this.textTracks[0].mode == "showing") {
			this.textTracks[0].mode = "hidden";
			this.videoPlayer.controlBar.CaptionToggle.removeClass('vjs-caption-control-on');
			$('#VideoPlayerArea').css("padding-bottom",'0px');
		} else {
			this.textTracks[0].mode = "showing";
			this.videoPlayer.controlBar.CaptionToggle.addClass('vjs-caption-control-on');
			$('#VideoPlayerArea').css("padding-bottom",'80px');
		}
	},
	stop : function(){
		// 멈춤
		this.videoPlayer.pause();
		return true;
	},
	previous : function(){
		var prev_time = this.videoPlayer.currentTime() - 15;
		if(prev_time < 0) prev_time = 0;
		this.videoPlayer.currentTime(prev_time);
	},
	next : function(t){
		var duration = this.getDuration(); //총 콘텐츠 시간
		var next_time = this.videoPlayer.currentTime() + 15;
		if(next_time > duration) next_time = duration;
		
		if(!VIDEO_PLAYER.isProgressControl && this.getCurrentTime()>0) {
    		if(VIDEO_PLAYER.bfStudyTime>VIDEO_PLAYER.maxStudyTime) VIDEO_PLAYER.maxStudyTime = VIDEO_PLAYER.bfStudyTime;
    		
    		if ( VIDEO_PLAYER.maxStudyTime < next_time ) {
    			if(_playerData.progressControlBlockMsg != 'undefined' && _playerData.progressControlBlockMsg!='') {
		    		VIDEO_PLAYER.showMessage(_playerData.progressControlBlockMsg);
		    	} else {
		    		VIDEO_PLAYER.showMessage('학습중인 경우에는 이동할 수 없습니다.');
		    	}
	    		return false;
	    	} else {
	    		this.videoPlayer.currentTime(next_time);
	    	}
    	} else {
    		this.videoPlayer.currentTime(next_time);
    	}
	},
	getDuration : function(){
		var lengthOfVideo = this.videoPlayer.duration();
		return lengthOfVideo;
	},
	setPlaybackRate : function(speed){
		this.videoPlayer.playbackRate(speed);
		return true;
	},
	saveProgress : function(showMsg){ 
		//진도저장 버튼 클릭시에 호출
		this.doSaveProgress('S');
		return;
	},
	getPlayRunTime : function() {
		// 현재 재생시간
		return this.playRunTime;
	},
	getBfPlayRunTime : function() {
		// 이전 진도저장 시 재생시간
		return this.bfPlayRunTime;
	},
	getCurrentTime : function() {
		// 현재재생시간(위치)
		return parseFloat(this.videoPlayer.currentTime()).toFixed(0);
	},
	getBfPlaybackRate : function() {
		// 현재배속
		return this.bfPlaybackRate;
	},
	getPlaybackRate : function() {
		// 현재배속
		return this.videoPlayer.playbackRate();
	},
	doSaveProgress : function(tp){
		/* 진도율 저장 */
		//console.log("VIDEO_PLAYER.doSaveProgress called!! [", tp);

		if( _playerData=='undefined' || _playerData.updateProgressUrl=='undefined' || _playerData.updateProgressUrl=='') {
			_videoSaveWorkType = '';
			return false;
		} 

		var _playRunTime = this.playRunTime; // 현재 재생시간
		var _bfPlayRunTime = this.bfPlayRunTime; // 이전 진도저장 시 재생시간
		var _studyTime = parseFloat(this.getCurrentTime()).toFixed(0); // 현재재생시간(위치)
		var _playTimeGap = _playRunTime - _bfPlayRunTime; // 실재생시간 갭
		var _bfPlaybackRate = this.bfPlaybackRate; // 이전배속
		var _playbackRate = this.videoPlayer.playbackRate(); // 현재배속
		
		//console.log(">> bfPlayRunTime :: ", _bfPlayRunTime);
		//console.log(">> playRunTime :: ", _playRunTime);
		//console.log(">> CurrentTime :: ", _studyTime);
		//console.log(">> Gap1 :: ", _playRunTime - _bfPlayRunTime);
		//console.log(">> Gap2 :: ", _studyTime - _playRunTime);
		//console.log(">> playbackRate :: ", _playbackRate);
		//console.log(">> playTimeGap :: ", _playTimeGap);

		if( tp != 'A' ) {
			// 자동저장 이벤트가 아닐 경우 자동저장 타이머 초기화
			autoSaveTimer(autoSaveTimer(_playerData.autoSaveIntervalMin)); 
		}
		
		// 최초재생 또는 재생시간 변동이 있을 경우만 저장
		if( _playerData.firstYn == 'Y' || _playTimeGap > 0 ) {
			_videoSaveWorkType = tp; // 저장작업유형 셋팅
			
			var _paramData = getVideoPlayerSaveProgressParams();
			//console.log("doSaveProgress() param ::: \n", _paramData);
			
			$.ajax({
				type	 : "POST",
				url      : _playerData.updateProgressUrl,
				async    : false,
				data     : _paramData,
				success  : function(resData, statusText){
					//console.log("VIDEO_PLAYER.doSaveProgress result !! resData\n", resData);
					//console.log("VIDEO_PLAYER.doSaveProgress result !! statusText\n", statusText);
					
					if(resData.responseCode == '0'){
						// 기존 재생시간 변경
						VIDEO_PLAYER.bfPlayRunTime = _playRunTime;
						VIDEO_PLAYER.studyTime = _studyTime;
						VIDEO_PLAYER.bfPlaybackRate = _playbackRate;
						
						if(_videoSaveWorkType=='S') {
							//console.log("## doSaveProgress save event........ call return function");
							if(updateProgressCallBackFunc) {
								updateProgressCallBackFunc(resData, statusText);
								return;
							} else {
								VIDEO_PLAYER.showMessage('진도율이 저장되었습니다.');
							}
						} else if(_videoSaveWorkType=='E') {
							//console.log("## doSaveProgress ended event........ call return function");
							// 재생시간끝
							if(complateProgressCallBackFunc) {
								complateProgressCallBackFunc(resData, statusText);
								return;
							} else {
								alert('학습이 종료되었습니다.');
								//VIDEO_PLAYER.showMessage('학습이 종료되었습니다.');
							}
						} else if(_videoSaveWorkType=='P') {
							//console.log("## doSaveProgress pause event........ call return function");
							// 중지
							/*
							if(updateProgressCallBackFunc!='undefined') {
								updateProgressCallBackFunc(resData, statusText);
								return;
							} else {
								VIDEO_PLAYER.showMessage('학습이 중지되었습니다.');
							}
							*/
						}
					} else {
						//console.log('진도율 저장 에러!');
						if(_videoSaveWorkType=='S') {
							VIDEO_PLAYER.showMessage('진도율 저장시 오류가 발생하였습니다.');
						} else if(_videoSaveWorkType=='E') {
							// 재생시간끝
							VIDEO_PLAYER.showMessage('학습 종료 중 오류가 발생하였습니다.');
						} else if(_videoSaveWorkType=='P') {
							// 중지
							//VIDEO_PLAYER.showMessage('학습 중지 중 오류가 발생하였습니다.');
						}
					}
				},
				error    : function(){
					alert("서버와의 통시에 문제가 발생하였습니다. 재접속을 요청드립니다.");
					//console.log('진도율 저장 에러!');
				},
				dataType : 'json'
			});
			
			if ( _playerData.firstYn == 'Y') _playerData.firstYn = 'N'; // 최초 재생이후 무조건 N 으로
			
		}
	},
	showMessage : function(showMsg){
		//console.log('## showMessage event call!!!');
		$(".vjs-message-display").html(showMsg);
		$(".vjs-message-display").fadeIn(1000, function(){
			$('.vjs-message-display').fadeOut(2000); 
		});
	},
	// 화질선택 레이어
    viewQualityLayer : function(event) {
		this.videoPlayer.controlBar.QualityToggle.toggleClass("on");
		this.videoPlayer.controlBar.qualityLayer.toggleClass("on");

		if(this.videoPlayer.controlBar.QualityToggle.hasClass("vjs-quality-control-row-on")){
			this.videoPlayer.controlBar.qualityLayer.addClass("row-on");
			this.videoPlayer.controlBar.qualityLayer.removeClass("middle-on");
			this.videoPlayer.controlBar.qualityLayer.removeClass("high-on");

		}else if(this.videoPlayer.controlBar.QualityToggle.hasClass("vjs-quality-control-middle-on")){
			this.videoPlayer.controlBar.qualityLayer.removeClass("row-on");
			this.videoPlayer.controlBar.qualityLayer.addClass("middle-on");
			this.videoPlayer.controlBar.qualityLayer.removeClass("high-on");

		}else if(this.videoPlayer.controlBar.QualityToggle.hasClass("vjs-quality-control-high-on")){
			this.videoPlayer.controlBar.qualityLayer.removeClass("row-on");
			this.videoPlayer.controlBar.qualityLayer.removeClass("middle-on");
			this.videoPlayer.controlBar.qualityLayer.addClass("high-on");
		
		}else{
			//console.log("ERROR : 화질선택 옵션 표시");
		}
	},
	//북마크 등록 레이어
	viewBookAddLayer : function(event) {
		if(this.videoPlayer.bookMarkAddLayer.hasClass("on") == false) {
			$('.bookMarkAddTime').html(videojs.formatTime(this.videoPlayer.currentTime()));
			$('#bookMarkTime').val(this.videoPlayer.currentTime());
		}
		this.videoPlayer.controlBar.bookMarkAdd.toggleClass("on");
		this.videoPlayer.bookMarkAddLayer.toggleClass("on");
	},
	//북마크 리스트 레이어
    viewBookMarkLayer : function(event) {
		this.videoPlayer.controlBar.bookMarkToggle.toggleClass("on");
		this.videoPlayer.controlBar.bookMarkLayer.toggleClass("on");
	},
	changeQuality : function(res){
		this.videoPlayer.controlBar.QualityToggle.removeClass('vjs-quality-control-row-on');
		this.videoPlayer.controlBar.QualityToggle.removeClass('vjs-quality-control-middle-on');
		this.videoPlayer.controlBar.QualityToggle.removeClass('vjs-quality-control-high-on');
		this.videoPlayer.controlBar.QualityToggle.toggleClass("on");
		this.videoPlayer.controlBar.qualityLayer.toggleClass("on");
		
		var i_time = this.videoPlayer.currentTime();
		_playerData.startTime = i_time; 
		//console.log( 'changeQuality into i_time : ' + i_time);
		var i_playbackRate = this.videoPlayer.playbackRate();
		
		switch(res){
			case 350:
				this.videoPlayer.controlBar.QualityToggle.addClass('vjs-quality-control-row-on');
				this.setSrc((_playerData.contUrlRow == null || _playerData.contUrlRow == '')? _playerData.contUrlNomal : _playerData.contUrlRow);
				break;

			case 700:
				this.videoPlayer.controlBar.QualityToggle.addClass('vjs-quality-control-middle-on');
				this.setSrc(_playerData.contUrlNomal);
				break;
			
			case 1024:
				this.videoPlayer.controlBar.QualityToggle.addClass('vjs-quality-control-high-on');
				this.setSrc((_playerData.contUrlHigh == null || _playerData.contUrlHigh == '')? _playerData.contUrlNomal : _playerData.contUrlHigh);

				break;
		}
		
		VIDEO_PLAYER.videoPlayer.ready(function() {
			VIDEO_PLAYER.videoPlayer.playbackRate(i_playbackRate);
			VIDEO_PLAYER.videoPlayer.play();
			
			document.location.href="#qualityLocation";
			
			VIDEO_PLAYER.videoPlayer.playbackRate(i_playbackRate);
		});
		
		VIDEO_PLAYER.videoPlayer.on("play",function(){
			VIDEO_PLAYER.changeRate(1.0);
		});
		
		VIDEO_PLAYER.videoPlayer.on('loadedmetadata', function(){
			
		});
	},
	changeRate : function(speed){
		// 배속변경 이벤트, 변경 시 기존 재생시간을 배속에 맞춰 저장
		this.doSaveProgress('A');
		this.videoPlayer.playbackRate(speed);
		this.bfPlaybackRate = speed;
	},
	defaultSettingRate : function(){
		// 기본배속 적용
		var speed = 1.0;
		this.videoPlayer.playbackRate(speed);
	},
	viewRateLayer : function() {
		// 배속버튼 제어
		if(_playerData.timeRateBtnYn != 'undefined' && _playerData.timeRateBtnYn=='N') {
			if(_playerData.timeRateBtnBlockMsg != 'undefined' && _playerData.timeRateBtnBlockMsg!='') {
	    		VIDEO_PLAYER.showMessage(_playerData.timeRateBtnBlockMsg);
	    	} else {
	    		VIDEO_PLAYER.showMessage('해당 기능을 지원하지 않습니다.');
	    	}
		} else {
			if($('.vjs-rateToggleLayer').css('display')=='none') {
				$('.vjs-rateToggleLayer').css('display','block');
			} else {
				$('.vjs-rateToggleLayer').css('display','none');
			}
		}
	}
};

//북마크 선택시에 해당 시간의 위치에서 재생 시작
function fnBookmarkPlay(time){
	VIDEO_PLAYER.videoPlayer.pause(); 
	VIDEO_PLAYER.videoPlayer.currentTime(time);
	VIDEO_PLAYER.videoPlayer.play();
	VIDEO_PLAYER.viewBookMarkLayer();
}
//북마크 삭제
function fnBookmarkDelete(bookmarkSeq){
	$.ajax({
		url      : '/progressNew/deleteBookmark.do',
		async    : false,
		data     : {
			"bookmarkSeq" : bookmarkSeq
		},
		success  : bookmarkController.deleteBookmarkOk,
		error    : bookmarkController.notifyError,
		dataType : 'json'
	}); 
}
window.bookmarkController = {
	setBookmarkStyle : function(){
		//북마크 리스트 팝업 on효과
		$(".bookMarkC a").mouseenter(function(){
			$(this).parent().parent().addClass("on");
		});
		$(".bookMarkC a").mouseleave(function(){
			$(this).parent().parent().removeClass("on");
		});
		$(".bookMarkR button").mouseenter(function(){
			$(this).parent().parent().addClass("on");
		});
		$(".bookMarkR button").mouseleave(function(){
			$(this).parent().parent().removeClass("on");
		});
	},
	insertBookmarkOk : function(resData, statusText){
		if(resData.responseCode == '0'){
			var bookmarkHtmlTxt = '<li id="bookmark'+resData.data.bookmarkSeq+'"><div class="bookMarkL">'+resData.data.bookmarkTitle+'</div><div class="bookMarkC"><a href="javascript:fnBookmarkPlay('+resData.data.bookmarkTime+');">'+videojs.formatTime(resData.data.bookmarkTime)+'</a></div><div class="bookMarkR"><button onclick="fnBookmarkDelete(\''+resData.data.bookmarkSeq+'\');">X</button></li>';
			
			if ( '<p class="noBookMark">등록된 북마크가 없습니다.</p>' == $("#bookmarkUL").html()){
				$("#bookmarkUL").html(bookmarkHtmlTxt);
			} else {
				$("#bookmarkUL").append(bookmarkHtmlTxt);
			}
			
			$("#bookMarkAddTitle").val("");
			$(".vjs-message-display").html("북마크가 저장 되었습니다.");
			$(".vjs-message-display").fadeIn(1000, function(){
				$('.vjs-message-display').fadeOut(1000); 
			});
			
			bookmarkController.setBookmarkStyle();
		}else{
			$(".vjs-message-display").html("북마크가 저장이 되지 않았습니다.");
			$(".vjs-message-display").fadeIn(1000, function(){
				$('.vjs-message-display').fadeOut(1000); 
			});
		}
	},
	deleteBookmarkOk : function(resData, statusText){
		if(resData.responseCode == '0'){
			$("#bookmark"+resData.data.bookmarkSeq).hide();
			
			$(".vjs-message-display").html("북마크를 삭제하였습니다.");
			$(".vjs-message-display").fadeIn(1000, function(){
				$('.vjs-message-display').fadeOut(1000); 
			});
		}else{
			$(".vjs-message-display").html("북마크가 삭제 되지 않았습니다.");
			$(".vjs-message-display").fadeIn(1000, function(){
				$('.vjs-message-display').fadeOut(1000);
			});
		}
	},
	notifyError : function(){
		$(".vjs-message-display").html("처리중 오류가 발생 했습니다.");
		$(".vjs-message-display").fadeIn(1000, function(){
			$('.vjs-message-display').fadeOut(1000); 
		});
	}
};