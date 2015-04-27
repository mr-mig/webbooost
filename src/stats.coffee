random = require('./helpers').random
getUriFromTab = require('./helpers').getUriFromTab

if localStorage["stats"]
	stats = JSON.parse localStorage["stats"]

stats ?= {}
stats.tabStats ?= {}
stats.allStats ?=
	count: 0
stats.allStats.libs ?= {}

console.log stats

stats.addBoost = (tabId, normalizedUrl) ->
	chrome.tabs.get tabId, (tab) =>
		# .url requires "tabs" permission
		pageUrl = getUriFromTab(tab)

		console.log "page url", pageUrl

		if not @tabStats[pageUrl]
			@tabStats[pageUrl] =
				count: 0
				libs: []

		entry = @tabStats[pageUrl]
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
	@

stats.get = (id, cb) ->
	chrome.tabs.get id, (tab) =>
		cb(
			stats.tabStats[getUriFromTab(tab)]
		)

module.exports = stats
