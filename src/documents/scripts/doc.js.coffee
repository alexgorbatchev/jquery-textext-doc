$ ->
  $('section.example').each ->
    section = $ @
    id = 'section' + Math.round Math.random() * 999999

    section.attr 'id': id

    section.find('script[type="text/example"]').each ->
      src = $(@).html()
      src = src.replace '#example', "##{id} #example"

      CoffeeScript.run src

