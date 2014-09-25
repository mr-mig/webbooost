sx = require './checkers/config-syntax'

module.exports = (url)->
	parsed = url.split '://'

	result =
		schema: parsed[0]
		uri: parsed[1].replace sx.URL_QUERY_TAG, ''
	result.isExtension = result.schema is 'chrome-extension'
	result.library = result.uri.split('/')[1]

	result
