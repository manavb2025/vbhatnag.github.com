try { 
	function x () {
  var dom = webengage.require('webengage/dom');
  var SimType = dom.queryOne('#moreItemSpecifc dt[type]');
  var ref = dom.queryOne('.vip-title');
  var ruleData = {};
      
  if (SimType) {
    ruleData['SimType'] = true;
  }
  
  if(ref) {
    ruleData['ref'] = true;
  }
   
  webengage.screen(ruleData);
}

webengage.onReady(x);
 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', '~hg3cj1');
	 }
 }
