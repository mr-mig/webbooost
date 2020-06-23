import { strURL, ParsedURL } from './url.js'
export { strURL, ParsedURL } from './url.js'

export type InjecteesFilepath = string


export type ResourceDescriptor = {
  versions?: string[],
  urls: URL[],
  file: string
}

export type ResourceMap = {
  [resourceCDNURI in strURL]: InjecteesFilepath | boolean
}

export type RequestCheckFunction = (parsedURL: ParsedURL, tabId: number) => chrome.webRequest.BlockingResponse