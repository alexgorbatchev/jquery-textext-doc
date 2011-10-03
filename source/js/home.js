(function()
{
	var about    = $('#about-section'),
		masthead = $('#masthead .content'),
		blocks   = []
		;
	
	about.find('p:nth(0), p:nth(1)').appendTo(masthead);

	about.find('> *').each(function()
	{
		var item = $(this);

		if(item.is('h2'))
			blocks.push([ item ]);
		else
			blocks[blocks.length - 1].push(item);
	});

	$(blocks[0]).each(function()
	{
		$(this).appendTo($('#new-about'));
	});

	$('#demo textarea').textext({
		plugins : 'tags prompt focus autocomplete ajax',
		tagsItems : [ 'jquery', 'plugin', 'tags', 'autocomplete' ],
		prompt : 'Add one...',
		ajax : {
			url : '/manual/examples/data.json',
			dataType : 'json',
			cacheResults : true
		}
	});
})();
