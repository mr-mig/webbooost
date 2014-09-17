Array::last = ->
	@[this.length - 1];

String::endsWith = (suffix) ->
	@indexOf(suffix, @length - suffix.length) isnt -1

module.exports =
	js: js
	getRandom: random
	loadStats: loadStats
	$id : $id


js = (filename) ->
	chrome.extension.getURL ['/injectees/', filename].join ""

random = (min, max) ->
	Math.floor(Math.random() * (max - min + 1)) + min

$id = (id) ->
	document.getElementById id

fn =
	not: (cb)-> ()-> not cb()