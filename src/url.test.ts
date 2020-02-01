import { ParsedURL, parseURL } from './url'

describe('URL', () => {
  it('Resource URLs should be parsed correctly', () => {
    const URL = 'http://somedomain.com/js/jquery-1.11.2.min.js'
    const result:ParsedURL = parseURL(URL)
  
    expect(result.schema).toEqual('http')
    expect(result.host).toEqual('somedomain.com')
    expect(result.isExtension).toEqual(false)
    expect(result.uri).toEqual('somedomain.com/js/jquery-1.11.2.min.js')
    expect(result.library).toEqual('jquery-1.11.2.min.js')
  })
  
  it('Resource URLs should be parsed correctly', () => {
    const URL = 'https://somedomain.com/js/jquery-1.11.2.min.js'
    const result = parseURL(URL)
  
    expect(result.schema).toEqual('https')
    expect(result.host).toEqual('somedomain.com')
    expect(result.isExtension).toEqual(false)
    expect(result.uri).toEqual('somedomain.com/js/jquery-1.11.2.min.js')
    expect(result.library).toEqual('jquery-1.11.2.min.js')
  })
  
  it('Extension URLs should be parsed correctly', () => {
    const URL = 'chrome-extension://blabla_some_extension_code/jquery-1.11.2.min.js'
    const result = parseURL(URL)
  
    expect(result.schema).toEqual('chrome-extension')
    expect(result.host).toEqual('blabla_some_extension_code')
    expect(result.isExtension).toEqual(true)
    expect(result.uri).toEqual('blabla_some_extension_code/jquery-1.11.2.min.js')
    expect(result.library).toEqual('jquery-1.11.2.min.js')
  })
  
})
