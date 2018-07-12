try { 
	function x () {
  var dom = webengage.require('webengage/dom');
  var Laptops = dom.queryOne('#bc .scnd span').innerHTML;
  var ruleData = {};
      
  if (Laptops) {
    ruleData['Laptops'] = true;
  }
  
  webengage.screen(ruleData);
}

webengage.onReady(x);
 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', '~f05d520');
	 }
 }
