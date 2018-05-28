// <![CDATA[
$(function() {

  // Slider
  $('#coin-slider').coinslider({width:990,height:300,opacity:1});

  // RADIUS BOX
  $('.content .mainbar .article, .content .sidebar .gadget').css({"border-radius":"8px", "-moz-border-radius":"8px", "-webkit-border-radius":"8px"});

});	

// Cufon
Cufon.replace('h2, h3, h4, h5, h6', { hover: true });
Cufon.replace('h1', { color: '-linear-gradient(#fff, #dadada)', hover: false});
//Cufon.replace('h1', { textShadow: '1px 1px #280101', color: '-linear-gradient(#fff, #e9e9e9)', hover: false});
//Cufon.replace('h1 span', { textShadow: '1px 1px #280101', color: '-linear-gradient(#a04242, #923434)', hover: false});
//Cufon.replace('h1 small', { textShadow: '0px 0px #f3eeee', color: '-linear-gradient(#f3eeee, #f3eeee)', hover: false});
//Cufon.replace('h1', { color: '-linear-gradient(#fff, #ffaf02)'});

// ]]>