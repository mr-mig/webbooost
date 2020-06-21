getUri = require('./helpers').getUriFromTab

load = ()->
	if localStorage["state"]
		state = JSON.parse localStorage["state"]

	state ?= {}


	state.get = (tabId, cb) ->
		chrome.tabs.get tabId, (tab) =>
			id = getUri(tab)
			pageConfig = state[id] || { id }
			cb(pageConfig)

	state.forHost = (host) ->
		state[host]

	state.sync = (pageConfig) ->
		state[pageConfig.id] = pageConfig
		localStorage["state"] = JSON.stringify @
		@

	state


module.exports = load
