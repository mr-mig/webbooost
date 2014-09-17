loadStats = require('../helpers')()

ALLOW_REQUEST =
	cancel: false

checkUrl = (details)->
	return ALLOW_REQUEST if details.method isnt 'GET'

	urlData = details.url.split '://'
	result = hashChecker.check urlData, details.tabId

	return result if result?.redirectUrl

	# this kind of script injection
	# can potentionally break the page
	result = regChecker.check urlData, details.tabId
	return result if result?.redirectUrl

	return ALLOW_REQUEST


redirect = (url, tabId, originalUrl) ->
	if tabId
		if tabId > 0
			chrome.pageAction.show tabId

		stats.addBoost tabId

	console.log("boosted", originalUrl, js url)

	{redirectUrl: js url}


chrome.webRequest.onBeforeRequest.addListener(
	checkUrl,
	urls: ['http://*/*', 'https://*/*', 'chrome-extension://*/*'],
	types: ['script', 'stylesheet']

	["blocking"]
)