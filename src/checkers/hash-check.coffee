h = require '../configs/hash-config'
interceptor = require '../request-interceptor'
sx = require './config-syntax'

module.exports = (normalizedUrl, tabId)->
	return if normalizedUrl.isExtension

	checkUrl = normalizedUrl.uri
	# console.log('hash check', checkUrl)

	# url totally match the library + version + cdn address
	if comparisonHash[checkUrl]
		normalizedUrl.boostedBy = 'hash'
		interceptor.redirect comparisonHash[checkUrl], tabId, normalizedUrl
	else
		interceptor.ALLOW_REQUEST_TOKEN;


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

console.log('comparison hash in hash-check', comparisonHash)
