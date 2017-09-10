import { URL_QUERY_TAG } from './checkers/configSyntax'

export type URL = string

export type ParsedURL = {
  schema: string,
  uri: string,
  isExtension: boolean,
  host: string,
  library: string
}

const last = (arr: string[]) => arr[arr.length - 1]

export const parseURL = (url: URL): ParsedURL => {
  const splitted = url.split('://')
  const [schema, path, ] = splitted

  const result = {
    schema,
    uri: path.replace(URL_QUERY_TAG, ''),
    isExtension: false,
    host: '',
    library: ''
  }

  result.isExtension = result.schema === 'chrome-extension'

  const parsedLibrary = result.uri.split('/')

  const [host] = parsedLibrary

  result.host = host
  result.library = last(parsedLibrary)

  return result
}
