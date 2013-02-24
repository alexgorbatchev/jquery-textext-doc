$('#example').textext
  plugins : 'tags'

  tags :
    items : [ 'San Francisco', 'New York' ]

    input :
      plugins : 'autocomplete'

      autocomplete :
        items : dataCities
