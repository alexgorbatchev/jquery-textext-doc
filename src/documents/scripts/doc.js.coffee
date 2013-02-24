do ->
  $('section.example').each ->
    section = $ @
    id = section.attr 'id'

    section.find('script[type="text/example"]').each ->
      src = $(@).html()
      src = src.replace '#example', "##{id} .example"
      src = src.replace /^(.*)$/mg, '  $1'
      src = 'do ->\n' + src

      CoffeeScript.run src

  do ->
    scroller = -> $('html, body').stop()

    $('article').find('h2, h3').each ->
      header  = $ @
      target  = $ 'nav .auto'
      navItem = header.clone()
      a       = navItem.find 'a[name]'

      if a.length
        a.attr 'href', '#' + a.attr 'name'
        a.attr 'name', null
        header.html header.find('a[name]').html()

      target.append navItem

    section = document.location.hash.substr(1)

    if section
      setTimeout (-> scrollToSection '#' + section, 0), 0

    window.onhashchange = -> scrollToSection location.hash

    scrollToSection = (section, duration = 300) ->
      scrollTop = $(section).offset().top - parseInt($('body').css 'paddingTop')
      scroller().animate { scrollTop }, duration, 'swing', -> window.location.hash = section

    $('nav').delegate 'a[href^=\"#\"]', 'click', (e) ->
      e.preventDefault()
      scrollToSection $(this).attr 'href'

    # Make external links open in a new tab.
    # $("a:not([href^=\"#\"])").attr "target", "_blank"

