import { URL_QUERY_TAG } from '../checkers/configSyntax.js'

export type strURL = string

export type ParsedURL = {
  schema: string,
  uri: string,
  path: string,
  isExtension: boolean,
  host: string,
  library: string,
  boostedBy?: 'hash' | 'msvp' | 'reg'
}

const last = (arr: string[]) => arr[arr.length - 1]

export const parseURL = (url: strURL): ParsedURL => {
  const splitted = url.split('://')
  const [schema, path, ] = splitted

  const result = {
    schema,
    uri: path.replace(URL_QUERY_TAG, ''), // params are stripped
    isExtension: false,
    host: '',
    path, // full path with params
    library: ''
  }

  result.isExtension = result.schema === 'chrome-extension'

  const parsedLibrary = result.uri.split('/')

  const [host] = parsedLibrary

  result.host = host
  result.library = last(parsedLibrary)

  return result
}
