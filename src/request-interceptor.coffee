stats = require './stats'
js = require('./helpers').js

pageAction = (tabId, normalizedUrl) ->
		stats.addBoost tabId, normalizedUrl

# redirect page resource to webboost resource
redirect = (url, tabId, normalizedUrl) ->
	pageAction(tabId, normalizedUrl)
	console.log "boosted", normalizedUrl, js url
	{redirectUrl: js url}

# used for msvp blocking
# no resources will be loaded
block = (url, tabId, normalizedUrl) ->
	pageAction(tabId, normalizedUrl)
	console.log "blocked", normalizedUrl
	{cancel: true}

module.exports =
	redirect: redirect
	block: block
	ALLOW_REQUEST_TOKEN: {cancel: false}
