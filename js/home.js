
var imagset = {"images": [
        {"uri": "ome-assets/uja-girl-bg.jpg", "title": "Girl Writting", "subtitle": "Subtitle for Image One"},
        {"uri": "uja-oldexercise-bw-bg.jpg", "title": "All make exercise", "subtitle": "Subtitle for Image two"},
        {"uri": "ome-assets/uja-girl-bw-bg.jpg", "title": "Another Girl", "subtitle": "Subtitle for Image tree"},
        {"uri": "uja-oldexercise-bg.jpg", "title": "It's so funny", "subtitle": "Subtitle for Image Four"}
    ]
};



var rotate_int;//variable that receives the setinterval return
var button_index = 0;//variable that receives the index button

jQuery(function () {
        //Load the slideshow
        rotate_int= setInterval('rotate()', 5000);
        
        //set bg-container interactivity
        jQuery('#add-box').click(loadExt).css('cursor', 'pointer');
        
        //assign #slide-nav interactivity
        slideInter();
        
        //initiate the h2, h3 texts
        navText(0);
});

function navText(index){
        jQuery('#nav-box h2').text(imagset.images[index].title);
        jQuery('#nav-box h3').text(imagset.images[index].subtitle);
}

function slideInter(){
        jQuery('#slide-nav li[class*=navigator]:eq(0)').click('backward', rotControl).css('cursor', 'pointer');
        jQuery('#slide-nav li[class*=navigator]:eq(1)').click('foreward', rotControl).css('cursor', 'pointer');
        
        jQuery('#slide-nav li[class!=navigator]:eq(0)').click({classto:'home1', button:0}, rotation).css('cursor', 'pointer');
        jQuery('#slide-nav li[class!=navigator]:eq(1)').click({classto:'home2', button:1}, rotation).css('cursor', 'pointer');
        jQuery('#slide-nav li[class!=navigator]:eq(2)').click({classto:'home3', button:2}, rotation).css('cursor', 'pointer');
        jQuery('#slide-nav li[class!=navigator]:eq(3)').click({classto:'home4', button:3}, rotation).css('cursor', 'pointer');
}

function loadExt() {
    clearInterval(rotate_int);//stop the rotate loop
    var current = jQuery('#bg-container').attr('class');//the current bg-container class
    if (current == 'home1') {
        jQuery.colorbox({href:"home-assets/uja-boy-thumb.jpg"});
    }
    else if (current == 'home2') {
        jQuery.colorbox({inline:true, href:"#basic-form"});
    }
    else if (current == 'home3') {
        jQuery.colorbox({iframe:true, innerWidth:400, innerHeight:300, href:"http://player.vimeo.com/video/9594822?title=0&amp;byline=0&amp;portrait=0"});
    }
    else {
        //navigation window
    }
}

//call each time a direction button is clicked
function rotControl(direction){
    var back_class = button_index==0 ? 'home4' : 'home'+(button_index);
    var back_index = button_index==0 ? 3 : button_index-1;
    var fore_class = button_index==3 ? 'home1' : 'home'+(button_index+2);
    var fore_index = button_index==3 ? 0 : button_index+1;
    var obt = new Object();
    if(direction.data=='backward'){
        obt.data = {classto:back_class, button:back_index};    
    }else{
        obt.data = {classto:fore_class, button:fore_index};
    }
    rotation(obt);
}

//call each time a button is clicked
function rotation(cur){
    jQuery('#bg-container').stop(true, true);//stop the animation
    clearInterval(rotate_int);//stop the rotate loop
    var current = jQuery('#bg-container').attr('class');//the current bg-container class
    var class_to = cur.data.classto;
    bgClass(current, class_to);
    
    var button = cur.data.button;
    interButton(button);
}

//automatic rotate function of background images
function rotate() {
    var current = jQuery('#bg-container').attr('class');//the current bg-container class
    if (current == 'home1') {
        bgClass(current, 'home2');
        interButton(1);
    }
    else if (current == 'home2') {
        bgClass(current, 'home3');
        interButton(2);
    }
    else if (current == 'home3') {
        bgClass(current, 'home4');
        interButton(3);
    }
    else {
        bgClass(current, 'home1');
        interButton(0);
    }
};

function bgClass(oldclass, newclass){
    jQuery('#bg-container').css({ opacity: 0.2 })
    .removeClass(oldclass)
    .addClass(newclass)
    .animate({ opacity: 1.0 }, 2000);
}

function interButton(linum){
    button_index = linum;
    navText(linum);
    jQuery('#slide-nav li[class*=selected]').removeClass('selected');
    jQuery('#slide-nav li[class!=navigator]:eq('+linum+')').addClass('selected');
}
