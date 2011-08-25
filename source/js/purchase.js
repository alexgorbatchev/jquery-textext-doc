$(function()
{
	var checkboxes = $('#purchase').find('input:checkbox');

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
