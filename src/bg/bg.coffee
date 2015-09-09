stats = require('../stats')

hashCheck = require '../checkers/hash-check'
regCheck = require '../checkers/reg-check'
msvpCheck = require '../checkers/msvp-check'
interceptor = require '../request-interceptor'
parseUrl = require '../url'
loadState = require '../state'

checkers = [hashCheck, regCheck, msvpCheck]

# webpage-specific settings are stored in this object
state = loadState

# need to maintain listeners, because all already opened tabs will not be boosted otherwise...
# furthermore, all tabs with changed URLs will not be boosted...
tabListeners = {}

# set listener for each created/reloaded tab
# this is needed because tabId and website URL will not be available otherwise inside the listener
chrome.tabs.onUpdated.addListener (tabId, change, tab) ->
	# sync state on each refresh/creation to have less syncing penalty
	state = loadState()

	# if the page is reloaded and the URL is changed or it is a first installation of the extension...
	# tab object is IMMUTABLE, surprise surprise!
	# So, we need to add new listeners for a tab with a new URL...
	if change.status is 'loading' and (change.url or not tabListeners[tabId])
		if tabListeners[tabId]
			chrome.webRequest.onBeforeRequest.removeListener(tabListeners[tabId])

		tabListeners[tabId] = checkUrl(tab);
		chrome.webRequest.onBeforeRequest.addListener(
			tabListeners[tabId],
			urls: ['http://*/*', 'https://*/*', 'chrome-extension://*/*'],
			tabId: tab.id
			["blocking"]
		)

# cleanup all those listeners
chrome.tabs.onRemoved.addListener (tabId, removeObj) ->
	chrome.webRequest.onBeforeRequest.removeListener(tabListeners[tabId])
	tabListeners[tabId] = null


checkUrl = (tab) ->
	# tab object is immutable
	# So there is a guarantee that tab.url will be the same in this scope
	(request)->
		return interceptor.ALLOW_REQUEST_TOKEN if request.method isnt 'GET'

		normalizedUrl = parseUrl request.url

		# do nothing if boosting was disabled for given website
		siteUrl = parseUrl tab.url
		return interceptor.ALLOW_REQUEST_TOKEN if state.forHost(siteUrl.host)?.disabled is true

		for check in checkers
			result = check normalizedUrl, request.tabId
			return result if result?.redirectUrl or result?.cancel

		return interceptor.ALLOW_REQUEST_TOKEN
