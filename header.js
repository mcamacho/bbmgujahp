//html markup copied from http://www.ujafedny.org/
var content = '<a id="logo" href="/"><span>Back to Home</span></a>'
+'<div id="utility">'
+'    <iframe id="welcomeFrame" src="http://www.ujafedny.org//UJAFNY/code/pages/LoginWelcome.php" scrolling="no" frameborder="no"></iframe>'
+'    <div id="search_box">'
+'        <form action="/search/" method="get">'
+'            <input id="search_box-query" type="text" name="query" />'
+'            <a class="button blue submit" tabindex="0" id="search_box-submit" >Search</a>'
+'        </form>'
+'    </div>'
+'    <div id="social-links">'
+'        <a href="http://www.facebook.com/ujafedny" class="facebook"></a>'
+'        <a href="http://twitter.com/UJAfedNY" class="twitter"></a>'
+'    </div>'
+'</div>';

document.getElementById('header').innerHTML = content;