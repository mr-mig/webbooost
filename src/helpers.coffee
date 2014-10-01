js = (filename) ->
	chrome.extension.getURL ['/injectees/', filename].join ""

random = (min, max) ->
	Math.floor(Math.random() * (max - min + 1)) + min

$id = (id) ->
	document.getElementById id

fn =
	not: (cb)->
		->
			not cb arguments...

module.exports =
	js: js
	random: random
	$id: $id
	fn: fn
