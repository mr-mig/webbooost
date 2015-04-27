getUri = require('./helpers').getUriFromTab

if localStorage["state"]
	state = JSON.parse localStorage["state"]

state ?= {}

state.get = (tabId, cb) ->
	chrome.tabs.get tabId, (tab) =>
		id = getUri(tab)
		pageConfig = state[id] || { id }
		cb(pageConfig)

state.sync = (pageConfig) ->
	state[pageConfig.id] = pageConfig
	localStorage["state"] = JSON.stringify @
	@

module.exports = state
