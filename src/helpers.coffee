parseUrl = require('./url')

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

# return normalized website URI
getUriFromTab = (tab) ->
	parseUrl(tab.url.replace(/#.*$/, '')).host


module.exports = {
	js
	random
	$id
	fn
	getUriFromTab
}
