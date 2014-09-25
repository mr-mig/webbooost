random = require('./helpers').random

if localStorage["stats"]
	stats = JSON.parse localStorage["stats"]

stats ?= {}
stats.tabStats ?= {}
stats.allStats ?=
	count : 0
stats.allStats.libs ?= {}

console.log stats

stats.addBoost = (tabId, normalizedUrl) ->
	if not @tabStats[tabId]
		@tabStats[tabId] =
			count: 0
			libs: []

	entry = @tabStats[tabId]
	lib = normalizedUrl.library

	# add stat for current tab
	entry.count += 1
	if lib not in entry.libs
		entry.libs.push lib


	# add global stat
	stats.allStats.count += 1
	if stats.allStats.libs[lib]
		stats.allStats.libs[lib].count += 1
	else
		stats.allStats.libs[lib] =
			count: 1

	localStorage["stats"] = JSON.stringify @
	entry

stats.get = (id) ->
	stats.tabStats[id]

stats.reset = ->
	# prevent mem leak across runs
	stats.tabStats = {};

module.exports = stats