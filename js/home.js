
var rotate_int;//variable that receives the setinterval return
var button_index = 0;//variable that receives the index button

var jsonAbbrev = imageset.images;//use the json images var
var totalImages = jsonAbbrev.length;
var pathFolder = imageset.pathFolder;//use the json imagesPath var
var iteration = imageset.iteration;//use the json iteration var
var fadeTime = imageset.fadeTime;//use the json fade var

//preload images
(function() {
        imgpreload = new Image();
        qtt = jsonAbbrev.length;
        for(i=0;i<qtt;i++){
                imgpreload.src = pathFolder + jsonAbbrev[i].imgfile;
        }
})();


//jquery function that initiates when html is loaded
jQuery(function () {
        //construct and add the css styles for each background
        cssInit();
        
        //construct nav bar and assign interactivity based on json elements
        navInit();
        
        //initiate the h2, and lines text
        navText(0);
        
        //Load the slideshow
        rotate_int= setInterval('rotate()', iteration);
        
        //set bg-container interactivity
        jQuery('#add-box').click(loadExt).css('cursor', 'pointer');
        
        //add interaction to the tell us button
        jQuery(".link-box2").colorbox({width:"450px", inline:true, href:"#tellus-form"});
});

function cssInit() {
        //add the styles for the different backgrounds
        cssString = '<style type="text/css">';
        for (t in jsonAbbrev){
                cssString += '#bg-container.home' + t + ' {';
		cssString += 'background-image: url(' + pathFolder + jsonAbbrev[t].imgfile + ');';
                cssString += '}';
        }
        cssString += '</style>';
        $(cssString).appendTo('head');
        
        //add class 'home0' to #bg-container
        jQuery('#bg-container').addClass('home0');
}
function navInit() {
        //construct the html
        element = jQuery('<li></li>')
                .appendTo('#slide-nav');
        jQuery('<a href="" class="navigator back">&#60</a>')
                .appendTo(element)
                .click({direction:'backward'}, rotControl);
        for (t in jsonAbbrev){
                element = jQuery('<li></li>')
                        .appendTo('#slide-nav');
                jQuery('<a href="" class="button">O</a>')
                        .appendTo(element)
                        .click({classto:'home' + t, button:t}, rotation);
        }
        element = jQuery('<li></li>')
                .appendTo('#slide-nav');
        jQuery('<a href="" class="navigator fore">&#62</a>')
                .appendTo(element)
                .click({direction:'foreward'}, rotControl);
        
        //add class 'selected' to first li of the nav
        jQuery('#slide-nav a.button:eq(0)').addClass('selected');
        jQuery('#slide-nav a').click(function(event){event.preventDefault();});
        jQuery('#slide-nav a.navigator').hover( function () {$(this).addClass("hover");},
                                                function () {$(this).removeClass("hover");});
}

function navText(index){
        jQuery('#nav-box h2').text(jsonAbbrev[index].title);
        jQuery('#nav-box p:eq(0)').text(jsonAbbrev[index].line1);
        jQuery('#nav-box p:eq(1)').text(jsonAbbrev[index].line2);
}

//automatic rotate function of background images
function rotate() {
        current = jQuery('#bg-container').attr('class');//the current bg-container class
        classNumber = current.charAt(current.length-1) * 1;
        newbgclass = classNumber < (totalImages - 1) ? 'home' +  (classNumber + 1) : 'home0';
        bgClass(current, newbgclass);
        interButton(classNumber < (totalImages - 1) ? classNumber + 1 : 0);
};

function bgClass(oldclass, newclass){
        jQuery('#bg-container').css({ opacity: 0.2 })
                .removeClass(oldclass)
                .addClass(newclass)
                .animate({ opacity: 1.0 }, fadeTime);
}

function interButton(linum){
        button_index = linum;
        navText(linum);
        jQuery('#slide-nav a.selected').removeClass('selected');
        jQuery('#slide-nav a.button:eq('+linum+')').addClass('selected');
}

//call each time a direction button is clicked
function rotControl(dir){
        maxelement = totalImages - 1;
        back_class = button_index==0 ? 'home' + maxelement : 'home'+ (button_index-1);
        back_index = button_index==0 ? maxelement : (button_index-1);
        fore_class = button_index==maxelement ? 'home0' : 'home'+(button_index+1);
        fore_index = button_index==maxelement ? 0 : (button_index+1);
        var obt = new Object();
        if(dir.data.direction=='backward'){
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
        current = jQuery('#bg-container').attr('class');//the current bg-container class
        class_to = cur.data.classto;
        bgClass(current, class_to);
        
        button = cur.data.button * 1;
        interButton(button);
}

function loadExt() {
        clearInterval(rotate_int);//stop the rotate loop
        current = jQuery('#bg-container').attr('class');//the current bg-container class
        classNumber = current.charAt(current.length-1) * 1;//json node index
        linkpath =jsonAbbrev[classNumber].link.path;//video uri path
        //obtain the video uri path, width and height
        if(linkpath.indexOf('object') > 0 || linkpath.indexOf('iframe') > 0){
                s0 = linkpath.indexOf('src') + 5;
                s1 = linkpath.indexOf('"',s0);
                w0 = linkpath.indexOf('width') + 7;
                w1 = linkpath.indexOf('"',w0);
                h0 = linkpath.indexOf('height') + 8;
                h1 = linkpath.indexOf('"',h0);
                videowidth = linkpath.slice(w0,w1) * 1;
                videoheight = linkpath.slice(h0,h1) * 1;
                videopath = linkpath.slice(s0,s1);
                videocaption = jsonAbbrev[classNumber].link.optCaption;
                videolink = jsonAbbrev[classNumber].link.optLink;
                videotitle = '<p>' + videocaption + '</p>' + '<a href="' + videolink + '" target="_blank" >' + videolink + '</a>';
                jQuery.colorbox({title:videotitle, iframe:true, innerWidth:videowidth, innerHeight:videoheight, href:videopath});
        }else{
                window.open(linkpath, '_blank');
        }
        //else if (current == 'home2') {
        //    jQuery.colorbox({inline:true, href:"#basic-form"});
        //}
}
