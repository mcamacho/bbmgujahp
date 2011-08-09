//company developer -> bbmg.com
//developer -> mauricio camacho mcamacho@bbmg.com



var rotate_int;//variable that receives the setinterval return
var button_index = 0;//variable that receives the index button
var actual_slide_class;//slide checked class name

var imageAbbrev = imageset.images;//use the json images var
var totalImages = imageAbbrev.length;//total amount of images
var iteration = imageset.iteration;//use the json iteration var
var fadeTime = imageset.fadeTime;//use the json fade var

var columnAbbrev = columnset.column;//use the json column var

//preload images
(function() {
        imgpreload = new Image();
        qtt = imageAbbrev.length;
        for(i=0;i<qtt;i++){
                imgpreload.src = imageset.pathFolder + imageAbbrev[i].imgfile;
        }
})();

function divBgInit() {
        //add the css and the markup divs necesary for the different backgrounds
        cssString = '<style type="text/css">\r\n';
        for (t in imageAbbrev){
                cssString += '#bg-container div.home' + t + ' {';
		cssString += 'background-image: url(' + imageset.pathFolder + imageAbbrev[t].imgfile + ')';
                cssString += '}\r\n';
                //add the div necesary for the different backgrounds
                jQuery('<div class="home' + t + '"></div>').appendTo('#bg-container').css('display','none');
        }
        cssString += '</style>';
        jQuery(cssString).appendTo('head');
        
        //add class 'home0' to #bg-container
        jQuery('#bg-container div.home0').css('display','block');
        actual_slide_class = 'home0';
        
        //add #over-bg to #bg-container
        jQuery('<div id="over-bg"></div>').appendTo('#bg-container');
}
function colInit() {
        //include the data from the json script
        nextIcon ='<img src="images/core/next.png" alt="next" />';
        for (k in columnAbbrev){
                imagepath = columnset.pathFolder + columnAbbrev[k].imgfile;
                jQuery('div.col-content:eq(' + k + ') > a').attr('href',columnAbbrev[k].contentlink);
                jQuery('div.col-content:eq(' + k + ') img.thumb').attr({'src': imagepath, 'alt': columnAbbrev[k].header});
                jQuery('div.col-content:eq(' + k + ') h3 a, div.col-content p a').attr('href',columnAbbrev[k].contentlink);
                jQuery('div.col-content:eq(' + k + ') h3 a').html(columnAbbrev[k].header);
                jQuery('div.col-content:eq(' + k + ') p a').html(columnAbbrev[k].shorttext + nextIcon);
                
                sourcelink = columnAbbrev[k].contentlink;
                sourcelink = sourcelink.replace('://','%3A%2F%2F');
                sourcelink = sourcelink.replace('/','%2F');
                fbpath = '<iframe src="http://www.facebook.com/plugins/like.php?href=' + sourcelink +'&amp;send=false&amp;layout=button_count&amp;width=50&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:50px; height:21px;position:relative;top:1px;" allowTransparency="true"></iframe>';
                ttpath ='<a href="http://twitter.com/share" class="twitter-share-button" data-url="' + columnAbbrev[k].contentlink + '" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
                jQuery(fbpath).appendTo('div.col-social:eq(' + k + ')');
                jQuery(ttpath).appendTo('div.col-social:eq(' + k + ')');
                
                jQuery('div.link-boxes:eq(' + k + ') a.link-box1:eq(0)').attr('href',columnAbbrev[k].textlink1.link);
                jQuery('div.link-boxes:eq(' + k + ') a.link-box1:eq(0) span').html(columnAbbrev[k].textlink1.text  + nextIcon);
                if(jQuery('div.link-boxes:eq(' + k + ') a.link-box1:eq(1)')){
                        jQuery('div.link-boxes:eq(' + k + ') a.link-box1:eq(1)').attr('href',columnAbbrev[k].textlink2.link);
                        jQuery('div.link-boxes:eq(' + k + ') a.link-box1:eq(1) span').html(columnAbbrev[k].textlink2.text  + nextIcon);
                }
        }
}

function navInit() {
        //construct the html
        jQuery('<ul id="slide-nav"></ul>').appendTo('#nav-box');
        element = jQuery('<li></li>')
                .appendTo('#slide-nav');
        jQuery('<a href="" class="navigator back">&#60</a>')
                .appendTo(element)
                .click({direction:'backward'}, rotControl);
        for (t in imageAbbrev){
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
        jQuery('#slide-nav a.navigator').hover( function () {jQuery(this).addClass("hover");},
                                                function () {jQuery(this).removeClass("hover");});    
}

function navText(index){
        jQuery('#nav-box h2').html(imageAbbrev[index].title);
        Cufon.replace('#nav-box h2', { fontFamily: 'FranklinGothicURW-Dem' });
        jQuery('#nav-box p:eq(0)').html(imageAbbrev[index].line1);
        jQuery('#nav-box p:eq(1)').html(imageAbbrev[index].line2);
}

//automatic rotate function of background images
function rotate() {
        current = actual_slide_class;//the current bg-container class
        classNumber = current.charAt(current.length-1) * 1;
        newbgclass = classNumber < (totalImages - 1) ? 'home' +  (classNumber + 1) : 'home0';
        bgClass(current, newbgclass);
        interButton(classNumber < (totalImages - 1) ? classNumber + 1 : 0);
};

function bgClass(oldclass, newclass){
        actual_slide_class = newclass;
        oldc = '#bg-container div.' + oldclass;
        newc = '#bg-container div.' + newclass;
        jQuery(oldc).hide();
        jQuery(newc).fadeIn(fadeTime);
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
        current = actual_slide_class;//the current bg-container class
        class_to = cur.data.classto;
        bgClass(current, class_to);
        
        button = cur.data.button * 1;
        interButton(button);
}

function interactInit(){
        //set bg-container interactivity
        jQuery('#slide-hover, #nav-box h2, #nav-box p').click(loadExt);
        jQuery('#nav-box h2, #nav-box p').css('cursor', 'pointer')
                                        .hover(
                                               function(){jQuery('#nav-box h2, #nav-box p').addClass('hover');},
                                               function(){jQuery('#nav-box h2, #nav-box p').removeClass('hover');});
        
        //add interaction to the tell us button
        jQuery(".link-box2").colorbox({innerWidth:"450px", innerHeight:"470px", scrolling:false, inline:true, href:"#tellus", onOpen:tellusCheck});
}

function loadExt(event) {
        event.preventDefault();
        clearInterval(rotate_int);//stop the rotate loop
        current = actual_slide_class;//the current bg-container class
        classNumber = current.charAt(current.length-1) * 1;//json node index
        linkpath =imageAbbrev[classNumber].link.path;//vimeo video number or uri page link
        //conditional between uri and video number
        if(linkpath.indexOf('http') < 0){
                videowidth = 600;
                videoheight = 450;
                videopath = 'http://player.vimeo.com/video/' + linkpath + '?title=0&amp;byline=0&amp;portrait=0';
                videocaption = imageAbbrev[classNumber].link.optCaption;
                videolink = imageAbbrev[classNumber].link.optLink;
                videotitle = '<p><a href="' + videolink + '" target="_blank" >' + videocaption + '</a></p>';
                jQuery.colorbox({title:videotitle, iframe:true, innerWidth:videowidth, innerHeight:videoheight, href:videopath});
        }else{
                window.open(linkpath, '_blank');
        }
}
function assignCufon(){
        Cufon.replace('div.col-about h2', { fontFamily: 'FranklinGothicURW-Dem' });
        Cufon.replace('#find-help, #donate', { fontFamily: 'FranklinGothicURW-Dem' });
        Cufon.replace('div.col-content h3 a', { fontFamily: 'FranklinGothicURW-Dem' });
        Cufon.replace('div.link-boxes span', { fontFamily: 'FranklinGothicURW-Dem' });
        Cufon.replace('div.col-more a', { fontFamily: 'FranklinGothicURW-Dem' });
        Cufon.replace('div.foot-col h2 a', { fontFamily: 'FranklinGothicURW-Dem' });
}

function tellusCheck(){
        if ( jQuery('#tellus-form').css('display') == 'none'){
                jQuery('#tellus-form').show();
                jQuery('#thank-you').hide();
        }
}
function tellusInit(){
        jQuery('#tellus-form').validate({
                submitHandler: function(form) {
                        ajaxrequest();
                },
                debug: true
        });
        
        $('#name, #email, #comment').placeholder();
        d = new Date();
        curr_date = d.getMonth() + "-" + d.getDate() + "-" + d.getFullYear();
        jQuery('#date').attr('value',curr_date);
}
function ajaxrequest(){
        jQuery.ajax({
                type: "POST",
                url: "feedback.php",
                data: jQuery('#tellus-form').serialize(),
                success: function(msg){
                        if( msg.indexOf(':0,') < 0 && msg.indexOf(':103,') < 0) {
                                cleanform();
                                jQuery('#tellus-form').hide();
                                jQuery('#thank-you').show();
                        }
                }
        });
}
function cleanform(){
        jQuery(':input','#tellus-form')
                .not(':submit, :hidden')
                .val('')
                .removeAttr('checked');
}

function ie6browser(){
        //png transparency
        jQuery('#content').supersleight();
}

//----------------------------
//jquery function that initiates when html is loaded
jQuery(function () {
        //construct and add the div for each background
        divBgInit();
        
        //initiate the h2, and lines text
        navText(0);
        
        //if the image slide contains more than 1 image navInit and rotate
        if (imageAbbrev.length > 1){
                //construct nav bar and assign interactivity based on json elements
                navInit();
                
                //Load the slideshow
                rotate_int= setInterval('rotate()', iteration);
        }
        
        //initiate the columcontent
        colInit();
        
        //add interactivity
        interactInit();
        
        //assign cufon font
        assignCufon();
                
        //add date input field and validation functionality to tellus form
        tellusInit();
        
        //add png ie6 transparency
        ie6browser();
});

