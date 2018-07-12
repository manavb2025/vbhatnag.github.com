(function(){

    var creative = {};
    var timeline = new TimelineMax(),
    	bannerAd = document.getElementById("banner"),
        // allDivs = banner.querySelectorAll("*"),
        allDivs = bannerAd.children,   
    	divsLoaded = 0,
    	divsTotal;

    // Turn elements opacity off
    for (i = 0; i < allDivs.length; i++) {
        allDivs[i].style.opacity = 0;
    }
    //

    // Load Dom
    document.addEventListener('DOMContentLoaded', domLoaded, false);
    window.addEventListener('load', windowLoaded, false);

    function domLoaded(e) {
        console.log('Dom Has Loaded');

        divsTotal = allDivs.length;
        for (i = 0; i < allDivs.length; i++) {
            allDivs[i];
            runPreloader(allDivs[i].getAttribute("id"));
        }
    }

    function windowLoaded(e) {
        console.log('Window Has Loaded');
    }
    //

    // Image Preloader
    function runPreloader(myDiv) {

        var imgLoadPls = imagesLoaded('#' + myDiv + '', {
            background: true
        },
        function() {

            divsLoaded++;
            console.log('Images Loaded?', myDiv, imgLoadPls.images.length );
            // console.log("DIVS LOADED: ", divsLoaded, "DIVS TOTAL: ", divsTotal);

            if (divsLoaded === divsTotal) {
                frameOne();
            }
        });
    }
    //

    // Animation Station
    function frameOne() {
    	TweenMax.to(bannerAd, 0.2, {opacity:1});
        TweenMax.set([
            "#clouds",
            "#dude",
            "#icon",
            "#mountains",
            "#rocks",
            "#text1",
            "#logo",
        ], {opacity:1});

        TweenMax.from(clouds,  15, {x:20, force3D:false, rotation:0.01});
        TweenMax.from(rocks,  15, {y:50, rotation:0.01});
        TweenMax.from("#mountains",  15, {scale:1.3, y:-5, force3D:false, rotation:0.01});
        TweenMax.from("#dude",  7, {scale:1.3, y:-5, x:30, force3D:false, ease: Power1.easeOut, rotation:0.01});
        TweenMax.from("#icon",  7, {x:-40, force3D:false, ease: Power1.easeOut, rotation:0.01});
        // TweenMax.from("#rock1",  15, {x:-100, ease:Power1.easeOut});
        // TweenMax.from([server, ripple2, ripple],  15, {x:200});

        TweenMax.from(text1,  1, {opacity:0});
        TweenMax.to(text1,  0.5, {opacity:0, delay:3});

        TweenMax.delayedCall(3.5, frameTwo);
    }

    function frameTwo () {
        TweenMax.set([
            "#text2",   
        ], {opacity:1});

        TweenMax.from(text2,  1, {opacity:0});
        TweenMax.to(text2,  0.5, {opacity:0, delay:3});

        TweenMax.delayedCall(3.5, frameThree);
    }

    function frameThree () {
        TweenMax.set([
            "#text3",       
        ], {opacity:1});

        TweenMax.from(text3,  1, {opacity:0});
        TweenMax.to(text3,  1.5, {scale:0.7, x:-41, y:-20, force3D:false, delay:3});

        TweenMax.delayedCall(3.5, frameFour);
    }

    function frameFour() {
        TweenMax.set([
            "#text4",
            // "#text5",
            "#text6",
            ctaCon  
        ], {opacity:1});

        TweenMax.staggerFromTo([
            "#text4",
            // "#text5",
            "#text6",
            ctaCon
        ], 1, {opacity:0}, {opacity:1}, 0.3);

        TweenMax.delayedCall(2, ctaAnimation);
    }    

    function ctaAnimation(){
        bannerAd.removeEventListener("mouseover", ctaAnimation);
        TweenMax.set(cta_outline, {scale:1, opacity:1});
        
        TweenMax.to(cta_outline, 1.5, {scale:1.1, opacity:0, onComplete:ctaOver});
    }

    function ctaOver(){
        bannerAd.addEventListener("mouseover", ctaAnimation);
        TweenMax.set(cta_outline, {scale:0.9, opacity:0});
        
        TweenMax.to(cta_outline, 1, {scale:1, opacity:1});
    }
    //

    // Random
    function Random (max) {
        return Math.random()*max;
    }

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //

    //Scale
    // TweenMax.to("#element", 8, {scale:3, force3D:false});

    ////Delete Dellayed Call
    //TweenMax.killTweensOf(myFunction);

    ////Clip
    // TweenMax.set(elem, 0.5, {clip:"rect(0px heightpx widthpx 0px)"});

    ////GSAP Timeline
    // function timelinefunk(){

    // var tl = new TimelineMax(); 

    //     tl.to(banner, 0.2, {opacity:1});            

    //     tl.set([circle], {opacity:1});
    //     tl.to(circle, 0.5, {x:250});

    // return tl;
    // }
})();
