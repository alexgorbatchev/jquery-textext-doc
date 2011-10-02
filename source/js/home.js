$(function()
{
	var about    = $('#about'),
		masthead = $('#masthead .content')
		;
	
	about.find('p:nth(0), p:nth(1)').appendTo(masthead);
});
