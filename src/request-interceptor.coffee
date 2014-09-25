stats = require './stats'
js = require('./helpers').js

redirect = (url, tabId, normalizedUrl) ->
	if tabId
		if tabId > 0
			chrome.pageAction.show tabId

		stats.addBoost tabId, normalizedUrl

	console.log "boosted", normalizedUrl, js url

	{redirectUrl: js url}

module.exports =
	redirect: redirect
	ALLOW_REQUEST_TOKEN: {cancel: false}
