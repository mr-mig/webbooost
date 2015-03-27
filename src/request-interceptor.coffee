stats = require './stats'
js = require('./helpers').js

pageAction = (tabId, normalizedUrl) ->
	if tabId
		if tabId > 0
			chrome.pageAction.show tabId

		stats.addBoost tabId, normalizedUrl


redirect = (url, tabId, normalizedUrl) ->
	pageAction(tabId, normalizedUrl)
	console.log "boosted", normalizedUrl, js url
	{redirectUrl: js url}

block = (url, tabId, normalizedUrl) ->
	pageAction(tabId, normalizedUrl)
	console.log "blocked", normalizedUrl
	{cancel: true}

module.exports =
	redirect: redirect
	block: block
	ALLOW_REQUEST_TOKEN: {cancel: false}
