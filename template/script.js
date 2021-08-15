var $updating = false, start = new Date().getTime();

document.addEventListener('DOMContentLoaded', function(event){
    var home = document.querySelector('#menu .navbar-brand'),
        gtt = document.querySelector('.icon-go-to-top'),
        scb = document.querySelector('.scrollbar'),
        ul = document.getElementsByTagName('ul')[0],
        lis = ul.children,
        firstLI = lis[0];
    firstLI.addEventListener('mouseenter', function(){sh('show')});
    ul.addEventListener('mouseleave', function(){sh('hide')});
    if ( home ) {
        home.innerText = document.title.split('-')[0].trim();
        home.onclick = function(){window.location = './'};
        gtt.addEventListener('click', function(){scb.scrollTop=0});
        scb.addEventListener('scroll', function(){
            if (this.scrollTop <= 46)
                $(gtt).fadeOut();
            else
                $(gtt).fadeIn();
        });
    }
});

function sh(display){
    var li = document.getElementsByTagName('ul')[0].children,
        firstLI = li[0];
    if (display === 'show')
        document.getElementsByTagName('ul')[0].classList.add('shadow');
    else
        document.getElementsByTagName('ul')[0].classList.remove('shadow');
    for (var i=0;i<li.length;i++){
        if (i > 0)
            if (display === 'show') {
                li[i].classList.remove('hidden');
            } else {
                li[i].classList.add('hidden');
            }
        else
            if (display !== 'show')
                li[i].classList.remove('active');
            else
                li[i].classList.add('active');
    }
}

function loadingText(text, callback){
    var $div = document.createElement('div'),
        printers = $('.printers');
    $('.printers').text('')
    if (!$updating)
        start = (new Date()).getTime()
    $('.overlay').fadeIn(callback)
    $('.container h3,#footer .info').hide()
    $('.scrollbar').html('<div id="result"></div>')
    for(i=0; i<text.length;i++)
        $($div).append('<span class="letter">'+text.toUpperCase()[i]+'</span>')
    $('#pageload').html($div).show()
}
//# sourceURL=siger/template/script.js