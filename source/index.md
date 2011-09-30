---
title: ''
layout: home
---
<h2>Demo</h2>

<textarea id="textarea" rows="1"> </textarea>

<script type="text/javascript">
	$('#textarea').textext({
		plugins : 'tags prompt focus autocomplete ajax',
		tagsItems : [ 'jquery', 'plugin', 'tags', 'autocomplete' ],
		prompt : 'Add one...',
		ajax : {
			url : '/manual/examples/data.json',
			dataType : 'json',
			cacheResults : true
		}
	});
</script>

{% include about.html %}
