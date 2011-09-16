---
title: Purchase
layout: default
---
The pricing for TextExt plugin is set up ala-cart, ie each plugin is sold separately and you can create your own bundle and just pay for what you going to use. There's no spearate download required after the purchase. I trust that you aren't going to steal from me so this is an honour based system. If you have already downloaded and stared using the TextExt component, all you need to do is to check below which components you are using and click the magic pay button.

The moneys that you pay go towards two very important causes: a) keeping me alive and b) supplying me with beer. Having both, I will continue working on TextExt and *you get all future updates completely free*. If you buy the whole shenanigans, I will get pissed drunk on your behalf and maybe email you the pictures of what that looked like!

<div class="alert-message info">
	As an introductory offer and to help spread the word around, you get to name the price! That's right, for limited time only, you can pay whatever you think this component is worth to you!
</div>

<form id="purchase" class="form-stacked" method="post" action="">
	<fieldset>
		<legend>Available Components</legend>

		<div class="clearfix">
			<div class="input">
				<ul class="inputs-list">
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.core.js" id="check_core" checked="true" />
							<span>TextExt core <span class="price">$5</span></span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.plugin.ajax.js" id="check_ajax" checked="true" />
							<span>Ajax plugin <span class="price">$5</span></span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.plugin.autocomplete.js" id="check_autocomplete" checked="true" />
							<span>Autocomplete plugin <span class="price">$5</span></span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.plugin.filter.js" id="check_filter" checked="true" />
							<span>Filter plugin <span class="price">$5</span></span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.plugin.focus.js" id="check_focus" checked="true" />
							<span>Focus plugin <span class="price">$5</span></span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.plugin.prompt.js" id="check_prompt" checked="true" />
							<span>Prompt plugin <span class="price">$5</span></span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.plugin.suggestions.js" id="check_suggestions" checked="true" />
							<span>Suggestions plugin <span class="price">$5</span></span>
						</label>
					</li>
					<li>
						<label>
							<input type="checkbox" name="price" data-price="5" value="textext.plugin.tags.js" id="check_tags" checked="true" />
							<span>Tags plugin <span class="price">$5</span></span>
						</label>
					</li>
				</ul>
			</div>
		</div>
	</fieldset>

	<div id="total">Total: <strike><span class="value">$0</span></strike> For limited time you name the price!</div>

	<div class="actions">
		<button class="btn primary">Send Beer Moneys!</button>
	</div>
</form>

<script src="/js/purchase.js" type="text/javascript">
</script>

