$(function()
{
	var form       = $('#purchase'),
		checkboxes = form.find('input:checkbox')
		;

	form.submit(function(e)
	{
		_gaq.push(['_trackEvent', 'Purchase', 'Counter']);

		checkboxes.filter(':checked').each(function()
		{
			var self = $(this);
			_gaq.push(['_trackEvent', 'Purchase', self.val()]);
		});
	});

	function updatePrice()
	{
		var price = 0;

		checkboxes.filter(':checked').each(function()
		{
			price += parseInt($(this).data('price'));
		});

		$('#total .value').html('$' + price);
	};

	checkboxes.change(function()
	{
		updatePrice();
	});

	updatePrice();
});
