sx = require './checkers/config-syntax'

module.exports = (url)->
	parsed = url.split '://'
	[schema, path, ...] = parsed

	result =
		{
			schema
			uri: path.replace sx.URL_QUERY_TAG, ''
		}
	result.isExtension = result.schema is 'chrome-extension'
	result.library = result.uri.split('/').pop()

	result
