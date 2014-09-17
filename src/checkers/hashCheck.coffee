h = require '../configs/hash-config'
makeRedirect = require '../makeRedirect'
interceptor = require '../requestInterceptor'

module.exports = (url, tabId)->
	return if url[0] is 'chrome-extension'

	checkUrl = url[1].replace URL_QUERY_TAG, ''

	# url totally match the library + version + cdn address
	if comparisonHash[checkUrl]
		return interceptor.redirect comparisonHash[checkUrl], tabId, url[1]

	return interceptor.ALLOW_REQUEST_TOKEN;



VERSION_TAG = /\$version\$/
NAME_TAG = /\$name\$/
URL_QUERY_TAG = /\?.+$/

comparisonHash = {};
keys = Object.keys h;

# fill in comparison map
keys.forEach (key)->
	entry = h[key]

	if entry.versions
		entry.versions.forEach (version)->
			entry.urls.forEach (url)->
				hashUrl = url.replace VERSION_TAG, version
				comparisonHash[hashUrl] =
						entry.file.replace(NAME_TAG, key).replace(VERSION_TAG, version)

	else
		entry.urls.forEach (url)->
			comparisonHash[url] =
					entry.file.replace(NAME_TAG, key)