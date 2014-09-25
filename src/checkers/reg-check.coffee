config = require '../configs/reg-config'
sx = require './config-syntax'
interceptor = require '../request-interceptor'
fn = require('../helpers').fn

keys = Object.keys config
regExps = {}

# prebuild regexps
keys.forEach (key)->
	regExps[key] = new RegExp key

module.exports = (normalizedUrl, tabId)->
	return if normalizedUrl.isExtension
	url = normalizedUrl.uri

	console.log('reg check', url)

	matchedKeys = keys.filter matchUrl url
	versionedKeys = matchedKeys.filter withVersions
	unversionedKeys = matchedKeys.filter fn.not withVersions

	substitutedVersionedUrls = versionedKeys.map extractVersion url
	.filter hasExtractedVersion
	.map extractedVersion
	.filter hasDefinedSubstitution
	.map substitute(url)

	substitutedUnversionedUrls = unversionedKeys.map substituteUnversioned(url)

	newUrls = substitutedVersionedUrls.concat substitutedUnversionedUrls

	if newUrls.length > 0
		url.boostedBy = 'reg'
		interceptor.redirect newUrls[0], tabId, url
	else
		interceptor.ALLOW_REQUEST_TOKEN;

matchUrl = (url)->
	(key)->
		regExps[key].test url

withVersions = (url)->
	(key) ->
		config[key].versions isnt undefined

extractVersion = (url)->
	(key)->
		[key, regExps[key].exec url]

hasExtractedVersion = (keyVersionMatch)->
	[..., versionMatch] = keyVersionMatch
	versionMatch?.length > 1

extractedVersion = (keyVersionMatch) ->
	[key, versionMatch] = keyVersionMatch
	[key, versionMatch[1]]

hasDefinedSubstitution = (keyVersion)->
	[key, version] = keyVersion
	config[key].versions.indexOf version > -1

substitute = (url) ->
	(keyVersion) ->
		[key, version] = keyVersion
		config[key].file.replace sx.VERSION_TAG, version

substituteUnversioned = (url)->
	(key) ->
		config[key].file;