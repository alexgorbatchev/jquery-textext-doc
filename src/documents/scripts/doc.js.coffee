$ ->
  $('section.example').each ->
    section = $ @
    # id = 'section' + Math.round Math.random() * 999999
    # section.attr 'id': id

    id = section.attr 'id'

    section.find('script[type="text/example"]').each ->
      src = $(@).html()
      src = src.replace '#example', "##{id} #example"

      CoffeeScript.run src

  do ->
    scroller = -> $('html, body').stop()

    $('#content h1, #content h2, #content h3').each ->
      header = $ @

      navItem = header.clone()
      a = navItem.find 'a[name]'

      if a.length
        a.attr 'href', '#' + a.attr 'name'
        a.attr 'name', null

        $('nav').append navItem

        header.html header.find('a[name]').html()

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

