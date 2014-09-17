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

loadStats = ->
	if localStorage["stats"]
		stats = JSON.parse localStorage["stats"]

	if not stats
		stats =
			tabStats: {}
			allStats: {}
			totalTimeSaved: 0

	# prevent mem leak across runs
	stats.tabStats = {};

	stats.addBoost = (tabId) ->
		if not @tabStats[tabId]
			@tabStats[tabId] =
				count: 0
				time: 0

		@tabStats[tabId].count += 1

		# hack
		@tabStats[tabId].time += random 5, 30
		localStorage["stats"] = JSON.stringify @
		@tabStats[tabId]

	stats.get = (id) ->
		stats.tabStats[id]

	stats

$id = (id) ->
	document.getElementById id