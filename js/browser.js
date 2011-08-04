var ua = navigator.userAgent;
if (ua.indexOf("BlackBerry") >= 0){
    var newstyle = '<style type="text/css">#wrap-container {margin: 0 auto;width: 998px;}</style>'
    jQuery(newstyle).appendTo('head');
}