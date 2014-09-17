stats = require('../stats')
stats.reset()

hashCheck = require '../checkers/hash-check'
regCheck = require '../checkers/reg-check'
interceptor = require '../request-interceptor'

checkers = [hashCheck, regCheck]


checkUrl = (request)->
	return interceptor.ALLOW_REQUEST_TOKEN if request.method isnt 'GET'

	urlData = request.url.split '://'

	for check in checkers
		result = check urlData, request.tabId
		return result if result?.redirectUrl

	return interceptor.ALLOW_REQUEST_TOKEN

chrome.webRequest.onBeforeRequest.addListener(
	checkUrl,
	urls: ['http://*/*', 'https://*/*', 'chrome-extension://*/*'],
	types: ['script', 'stylesheet']
	["blocking"]
)