import { test } from 'ava'
import { ParsedURL, parseURL } from './url'

test('Resource URLs should be parsed correctly', t => {
  const URL = 'http://somedomain.com/js/jquery-1.11.2.min.js'
  const result:ParsedURL = parseURL(URL)

  t.deepEqual(result.schema, 'http')
  t.deepEqual(result.host, 'somedomain.com')
  t.deepEqual(result.isExtension, false)
  t.deepEqual(result.uri, 'somedomain.com/js/jquery-1.11.2.min.js')
  t.deepEqual(result.library, 'jquery-1.11.2.min.js')
})

test('Resource URLs should be parsed correctly', t => {
  const URL = 'https://somedomain.com/js/jquery-1.11.2.min.js'
  const result = parseURL(URL)

  t.deepEqual(result.schema, 'https')
  t.deepEqual(result.host, 'somedomain.com')
  t.deepEqual(result.isExtension, false)
  t.deepEqual(result.uri, 'somedomain.com/js/jquery-1.11.2.min.js')
  t.deepEqual(result.library, 'jquery-1.11.2.min.js')
})

test('Extension URLs should be parsed correctly', t => {
  const URL = 'chrome-extension://blabla_some_extension_code/jquery-1.11.2.min.js'
  const result = parseURL(URL)

  t.deepEqual(result.schema, 'chrome-extension')
  t.deepEqual(result.host, 'blabla_some_extension_code')
  t.deepEqual(result.isExtension, true)
  t.deepEqual(result.uri, 'blabla_some_extension_code/jquery-1.11.2.min.js')
  t.deepEqual(result.library, 'jquery-1.11.2.min.js')
})
