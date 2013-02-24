class CustomItemManager extends $.fn.textext.ItemsManager
  toString : (item) ->
    switch typeof item
      when 'string' then result = (dataByCity[item] or {}).city
      when 'number' then result = (dataById[item] or {}).city
      when 'object' then result = item.city

    # console.log item, result, typeof item
    $.Deferred().resolve result, item

  toValue : (item) ->
    $.Deferred().resolve item.id

  fromString : (string) ->
    d    = $.Deferred()
    item = dataByCity[string]
    if item? then d.resolve item else d.reject()

  search : (query) ->
    super(query).pipe (items) ->
      items.sort (a, b) ->
        a = a.city
        b = b.city
        return -1 if a < b
        return 1 if a > b
        0

$('#example').textext
  plugins : 'tags'

  tags :
    manager : CustomItemManager
    items   : [ 14, 1 ]

    input :
      plugins : 'autocomplete'

      autocomplete :
        manager : CustomItemManager
        items   : dataSource
