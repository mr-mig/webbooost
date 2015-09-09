comparisonHash = require '../configs/msvp-config'
interceptor = require '../request-interceptor'
sx = require './config-syntax'

module.exports = (normalizedUrl, tabId)->
	return if normalizedUrl.isExtension

	checkHost = normalizedUrl.host
	# console.log('msvp check', checkHost)

	# host totally match the MSVP entry
	if comparisonHash[checkHost]
		normalizedUrl.boostedBy = 'msvp'
		interceptor.block comparisonHash[checkHost], tabId, normalizedUrl
	else
		interceptor.ALLOW_REQUEST_TOKEN;
