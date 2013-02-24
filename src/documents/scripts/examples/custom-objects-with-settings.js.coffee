itemsManagerOpts =
  toStringField : 'city'
  toValueField  : 'id'

$('#example').textext
  plugins : 'tags'

  tags :
    items        : [ dataById[14], dataById[1] ]
    itemsManager : itemsManagerOpts

    input :
      plugins : 'autocomplete'

      autocomplete :
        items        : dataSource
        itemsManager : itemsManagerOpts
