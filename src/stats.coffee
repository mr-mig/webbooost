random = require('./helpers').random

if localStorage["stats"]
	stats = JSON.parse localStorage["stats"]

if not stats
	stats =
		tabStats: {}
		allStats: {}
		totalTimeSaved: 0

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

stats.reset = ->
	# prevent mem leak across runs
	stats.tabStats = {};

module.exports = stats