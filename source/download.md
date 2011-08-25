---
title: Download
layout: default
---
I've created this super awesome download page for you! It lets you pick just what you need and gives back the googies! What's super awesome about it, is that you get everything, and I mean *everything*, in a single JavaScript file! That even includes images and CSS!

So when you add this component to the page, you only add ONE extra roundtrip to the server!

What are you waiting for? Take it for a spin!

<form id="download" method="post" action="http://localhost:3000/build">
	<input type="hidden" name="product" value="textext" />
	<input type="hidden" name="version" value="1.0" />

	<ul>
		<li>
			<input type="checkbox" name="compress" value="true" id="check_compress" checked="true" />
			<label for="check_compress">Compress Source</label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.core.js" id="check_core" checked="true" />
			<label for="check_core">TextExt core <span class="files">textext.core.js, textext.core.css</span></label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.plugin.ajax.js" id="check_ajax" checked="true" />
			<label for="check_ajax">Ajax plugin <span class="files">textext.plugin.ajax.js</span></label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.plugin.autocomplete.js" id="check_autocomplete" checked="true" />
			<label for="check_autocomplete">Autocomplete plugin <span class="files">textext.plugin.autocomplete.js, textext.plugin.autocomplete.css</span></label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.plugin.filter.js" id="check_filter" checked="true" />
			<label for="check_filter">Filter plugin <span class="files">textext.plugin.filter.js</span></label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.plugin.focus.js" id="check_focus" checked="true" />
			<label for="check_focus">Focus plugin <span class="files">textext.plugin.focus.js, textext.plugin.focus.css</span></label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.plugin.prompt.js" id="check_prompt" checked="true" />
			<label for="check_prompt">Prompt plugin <span class="files">textext.plugin.prompt.js, textext.plugin.prompt.css</span></label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.plugin.suggestions.js" id="check_suggestions" checked="true" />
			<label for="check_suggestions">Suggestions plugin <span class="files">textext.plugin.suggestions.js</span></label>
		</li>

		<li>
			<input type="checkbox" name="files" value="textext.plugin.tags.js" id="check_tags" checked="true" />
			<label for="check_tags">Tags plugin <span class="files">textext.plugin.tags.js, textext.plugin.tags.css</span></label>
		</li>
	</ul>

	<button>Get Code!</button>
</form>

