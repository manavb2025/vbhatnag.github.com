/**
 * Script for Coupon Template in view item page. 
 * @author Shrinivas A
 */
/*global $, deliveryDate, deliveryCity,itemId*/
/*jslint browser:true */
var COUPON = (function () {
    "use strict";
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    
    function nextOffer(counter){
    	changeOffer(counter);
    }
    
    function prevOffer(counter){
    	changeOffer(counter);
    }
    
    function copyCode(couponcode, buttoncode){
    	var temp = document.createElement('input');
    	temp.setAttribute('id','hidden_select_field');
    	document.body.appendChild(temp);
    	var copycode = document.getElementById('hidden_select_field');
    	copycode.value = couponcode;
    	document.getElementById("hidden_select_field").select();
	    document.execCommand("copy");
	    copycode.remove(copycode.selectedIndex);
	    buttoncode.innerHTML = 'copied!';
	    window.setTimeout(function(){
	    	buttoncode.innerHTML = 'copy code';
	    },1000);
    }
    
    function changeOffer(pointer){
    	var couponwrapp = document.getElementsByClassName('couponwrapp');
    	for(var i=0; i<couponwrapp.length; i++){
    		couponwrapp[i].classList.add("hide");
    	}
    	var loading = document.getElementById('loading-bar');
    	loading.classList.remove("hide");
    	window.setTimeout(function(){
    		loading.classList.add("hide");
    		var elem = document.getElementById('offer-'+pointer)
    		if(elem != null){
    			elem.classList.remove("hide");
    		}
    	},200);
    }
    return{
    	initialize: function (data) {
    		//ajax call to service here. Initialize data and create array. Dummy array displayed below.
    	},
    	next:nextOffer,
    	prev:prevOffer,
    	copy:copyCode
    };
}());