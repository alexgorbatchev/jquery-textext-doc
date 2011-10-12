$(function()
{
	var form       = $('#download'),
		checkboxes = form.find('input:checkbox')
		;

	form.submit(function(e)
	{
		_gaq.push(['_trackEvent', 'Download', 'Counter']);

		console.log(e);
		checkboxes.filter(':checked').each(function()
		{
			var self = $(this);
			_gaq.push(['_trackEvent', 'Download', self.val()]);
		});
	});
});
