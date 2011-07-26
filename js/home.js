
var carouselImages = ["home-assets/uja-oldexercise-bg.jpg","home-assets/uja-girl-bw-bg.jpg","home-assets/uja-oldexercise-bw-bg.jpg"];

var rotate_int;
        
jQuery(function () {
        //Load the slideshow
        rotate_int= setInterval('rotate()', 5000);
        //set bg-container interactivity
        jQuery('#add-box').click(loadExt);
        //assign #slide-nav interactivity
        slideInter();
});

function slideInter(){
        jQuery('#slide-nav li:eq(0)').click('home1',rotation);
        jQuery('#slide-nav li:eq(1)').click('home2',rotation);
        jQuery('#slide-nav li:eq(2)').click('home3',rotation);
        jQuery('#slide-nav li:eq(3)').click('home4',rotation);
}

function loadExt() {
    clearInterval(rotate_int);//stop the rotate loop
    var current = jQuery('#bg-container').attr('class');//the current bg-container class
    if (current == 'home1') {
        //navigation window
    }
    else if (current == 'home2') {
        //navigation window
    }
    else if (current == 'home3') {
        //navigation window
    }
    else {
        //navigation window
    }
}

//call each time a button or arrow is clicked
function rotation(cur){
    clearInterval(rotate_int);//stop the rotate loop
    var current = jQuery('#bg-container').attr('class');//the current bg-container class
    var class_to = cur.data;
    jQuery('#bg-container').css({ opacity: 0.2 })
    .removeClass(current)
    .addClass(class_to)
    .animate({ opacity: 1.0 }, 2000);
}

//automatic rotate function of background images
function rotate() {
    var current = jQuery('#bg-container').attr('class');//the current bg-container class
    if (current == 'home1') {
    jQuery('#bg-container').css({ opacity: 0.2 })
    .removeClass('home1')
    .addClass('home2')
    .animate({ opacity: 1.0 }, 2000);
    }
    else if (current == 'home2') {
    jQuery('#bg-container').css({ opacity: 0.2 })
    .removeClass('home2')
    .addClass('home3')
    .animate({ opacity: 1.0 }, 2000);
    }
    else if (current == 'home3') {
    jQuery('#bg-container').css({ opacity: 0.2 })
    .removeClass('home3')
    .addClass('home4')
    .animate({ opacity: 1.0 }, 2000);
    }
    else {
    jQuery('#bg-container').css({ opacity: 0.2 })
    .removeClass('home4')
    .addClass('home1')
    .animate({ opacity: 1.0 }, 2000);
    }
};
