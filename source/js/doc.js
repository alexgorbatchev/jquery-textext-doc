$(function()
{
    var topNav    = $('#top-nav'),
        manualNav = $('#manual-nav')
        ;

    function email()
    {
        // http://rumkin.com/tools/mailto_encoder/simple.php
        var ML=":\"<ab.ixrgf=oetl @h>mvc/";
        var MI="23@B8=:;1D36?><03?=759<843>FB=EA9D36?5F<D1C3?=759<843>FB=EA9D36?5F<D2G3C";
        var OT="";
        for(j=0;j<MI.length;j++){
            OT+=ML.charAt(MI.charCodeAt(j)-48);
        }
        return OT;
    };

    (function()
    {
        manualNav.find('a').each(function()
        {
            var a = $(this);

            if(window.location.pathname == a.attr('href'))
            {
                a.parents('li.dropdown').addClass('active');
                a.parent().addClass('active');

                $('#toc .nav-header').text(a.text());
            }
        });
    })();

    function enhanceMethodSignature(a)
    {
        var html = a.html();

        html = html.replace(/\((.+)\)\s*$/, function(match, args)
        {
            return '('
                + args.replace(/\w+/g, function(arg)
                {
                    return '<span class="param">' + arg + '</span>';
                })
                + ')'
            ;
        });

        a.html(html);

        function getParam(a)
        {
            return $(a)
                .parents('.method:first')
                    .find('.params .' + $(a).text())
                        .parents('li:first')
            ;
        };

        a.find('.param').hover(
            function() { getParam(this).addClass('highlight') },
            function() { getParam(this).removeClass('highlight') }
        );
    };

    // common DOM updates
    (function()
    {
        // $('#content').find('h1,h2,h3').wrapInner('<div class="page-header"/>');
        $('#nav').find('.' + ($(document.body).data('section') || 'nada')).addClass('active');
    })();

    // add TOC to the API doc page
    (function()
    {
        var toc = $('#toc');

        $('#api section h3').each(function()
        {
            var h3    = $(this),
                links = h3.parent().find('h4 a'),
                block
                ;

            if(links.length == 0)
                return;

            links = links.map(function()
            {
                var a = $(this);
                enhanceMethodSignature(a);
                return '<li><a href="#' + a.attr('name') + '">' + a.text().replace(/^[A-Z]\w+\./, '') + '</a></li>';
            })
            .toArray();

            block = $('<section><h3>' + h3.html() + '</h3><ul>' + links.join('') + '</ul>');
            toc.append(block);
        });
    })();

    (function()
    {
        $('body > .hero-unit .content')
            .append($('section#hero'))
            .find('h3').remove()
            ;
    })();

    // add rollover functionality to the method params 
    (function()
    {
        var params = /^([\w\.\…]+) (\{\w+\})?(.*)$/;

        $('#api ul.params li > p').each(function()
        {
            var p     = $(this),
                html  = p.html(),
                match = html.match(params)
                ;

            if(match)
            {
                p.html(
                    '<code class="var ' + match[1] + '">' + match[1] + '</code> '
                    + (match[2] ? '<code class="type">' + match[2] + '</code> ' : '')
                    + '<span class="desc">' + match[3] + '</span>'
                );
            }
        });

    })();

    $('a')
        .filter('*[href^="http://"], *[href^="https://"]')
        .filter(':not(*[href^="http://textextjs"])')
        .addClass('external')
        ;
    $('.email').html(email());
});
