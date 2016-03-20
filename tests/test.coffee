require('chai').should()

parseUrl = require('../src/url')

describe 'http://somedomain.com/js/jquery-1.11.2.min.js', (t) ->
	testUrl = 'http://somedomain.com/js/jquery-1.11.2.min.js'
	result = parseUrl testUrl

	it 'schema should be parsed correctly for http', () ->
		result.schema.should.be.equal 'http'

	it 'host should be parsed correctly', () ->
		result.host.should.be.equal 'somedomain.com'

	it 'isExtension should be false', () ->
		result.isExtension.should.be.equal false

	it 'uri should be parsed correctly', () ->
		result.uri.should.be.equal 'somedomain.com/js/jquery-1.11.2.min.js'


describe 'chrome-extension://blabla_some_extension_code/jquery-1.11.2.min.js', (t) ->

	testUrl = 'chrome-extension://blabla_some_extension_code/jquery-1.11.2.min.js'
	r = parseUrl testUrl

	it 'schema should be parsed correctly for chrome-extension', () ->
		r.schema.should.be.equal 'chrome-extension'
