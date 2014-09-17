h = require '../configs/hash-config'
interceptor = require '../request-interceptor'
sx = require './config-syntax'

module.exports = (url, tabId)->
	return if url[0] is 'chrome-extension'

	checkUrl = url[1].replace sx.URL_QUERY_TAG, ''

	# url totally match the library + version + cdn address
	if comparisonHash[checkUrl]
		return interceptor.redirect comparisonHash[checkUrl], tabId, url[1]

	return interceptor.ALLOW_REQUEST_TOKEN;


comparisonHash = {};
keys = Object.keys h;

# fill in comparison map
keys.forEach (key)->
	entry = h[key]

	if entry.versions
		entry.versions.forEach (version)->
			entry.urls.forEach (url)->
				hashUrl = url.replace sx.VERSION_TAG, version
				comparisonHash[hashUrl] =
						entry.file.replace(sx.NAME_TAG, key).replace(sx.VERSION_TAG, version)

	else
		entry.urls.forEach (url)->
			comparisonHash[url] =
					entry.file.replace(sx.NAME_TAG, key)