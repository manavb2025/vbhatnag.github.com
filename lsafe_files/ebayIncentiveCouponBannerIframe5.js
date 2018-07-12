(function(){
	var itemId = coupon_itemid;
	var url = rtmurl;
	var qa = qastatus;
	var rtmslotid = slotid;
	var style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = '.arr { position: absolute; height: 20px; width: 20px; top:80px; left: -11px; background: #FFFFFF; transform: rotate(45deg); border-left: 1px solid #dddddd; border-bottom: 1px solid #dddddd; } a.gspr.oly-c { font-size: 0px; position: absolute; top: 6px; right: 0px; display: block; background:url(https://secureir.ebaystatic.com/cr/v/c1/misc/couponlayout_imagesprite.png) no-repeat !important; height:20px; width:20px; } .cp-overlay { border: 1px solid #dddddd; padding:15px; background: #FFFFFF; box-shadow: 8px 8px 13px #6b6a6a; box-sizing: border-box; outline:none; position:absolute; min-width:380px; width:76%; max-width:430px; display:none; z-index:9999; } #rtm_html_19310{position:relative;} .offer_block_coupon{display:block; width:100%; height:50px;} .offer_block_coupon span{display:inline-block; width:21%; text-align:right;} a.couponlink{position:relative; display:inline-block; width:auto; padding:4px 10px; background:#aaaaaa; color:#ffffff !important; text-decoration:none; border-radius:3px; -moz-border-radius:3px; -webkit-border-radius:3px; margin-left:10px;} .spinner {   display: block; position: absolute; top: 40%; left:45%; z-index: -1; margin: 0 auto;    width: 50px; height: 50px; background: url(https://ir.ebaystatic.com/cr/v/c1/spinner30x30.svg) no-repeat center center; background-size: cover; -webkit-animation: spin 600ms linear infinite;  -moz-animation: spin 600ms linear infinite; animation: spin 600ms linear infinite; }'
	document.getElementsByTagName('head')[0].appendChild(style);
	var node = '';
	var yxc=location.search.replace('?','').split('&');var node='';for(var i=0;i<yxc.length;i++){var _a=yxc[i].split('=');if((_a.length == 2)&&(_a[0]=='aff_source')&&(_a[1]!='')){node+=(node==''?'':'&')+'aff_source='+encodeURIComponent(_a[1]);}}if(node!=''){node = "&"+node.toLowerCase();}	

	
	$('#offer_block_coupon').css({'display':'block'});
	
	if( qa ){/*if QA then add iframe to the page*/
		$('#'+rtmslotid).append('<iframe id="inc_banner" scrolling="no" frameborder="0" src="'+ url +'/wgt/incentive_banner?itemId='+ itemId +'&channel=FULL_SITE&callback=callback" style="position:relative;left:0%;top:0px;width:100%;height:50px;padding:0;"></iframe>');
		
	}
	var showcp = function(){
		var pos = $('#offer_block_coupon').offset();
		var lpos = $('#LeftSummaryPanel').offset();
		var fpos = {
			'top':( pos['top'] - lpos['top'] - 80 ),
			'left':'56%'
		};
		$('#cp-couponbubble').css({'top':fpos['top'] +'px','left':fpos['left']});
		$('#cp-couponbubble').show();
	}

	$('#LeftSummaryPanel').append('<div id="cp-couponbubble" class="cp-overlay" tabindex="-1" role="alertdialog" aria-describedby="bub_help1-ariadesc"> <div class="arr"></div> <a href="javascript:;" class="gspr oly-c" data-dismiss="olay" title="close" role="button">Close</a> <span class="spinner"></span><iframe id="couponinfo" scrolling="no" frameborder="0" width="100%" height="255" src="'+ url +'/wgt/incentive_recommendation?itemId='+ itemId +'&channel=FULL_SITE&callback=callback'+node+'"></iframe> </div>');

	$('a.couponlink').click(showcp);
	$('.cp-overlay a.gspr.oly-c').click(function(e){e.stopPropagation(); $('#cp-couponbubble').hide();});
})();