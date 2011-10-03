$(function()
{
	(function()
	{
		$('a').each(function()
		{
			var a = $(this);
			if((a.attr('href') || '').indexOf('http') == 0)
				a.addClass('external');
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
		$('#content').find('h1,h2,h3').wrapInner('<div class="page-header"/>');
	})();

	// add TOC to the API doc page
	(function()
	{
		var row = $('<div class="row"/>');

		$('#toc').append(row);

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
				return '<li><a href="#' + a.attr('name') + '">' + a.html() + '</a></li>';
			})
			.toArray();

			block = $('<div class="span4 columns"><h4>' + h3.html() + '</h4><ul>' + links.join('') + '</ul></div>');
			row.append(block);
		});
	})();

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

});
