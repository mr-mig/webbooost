import { ParsedURL, ResourceMap } from '../domain'
import { block, ALLOW_REQUEST_TOKEN} from '../requestInterceptor'

// todo import real filters
const blockList = {
  'bla.com': true
} as ResourceMap

const isInBlocklist = (host: string) =>
  blockList[host]

export const check = (parsedURL: ParsedURL, tabId: number) => {
  if (parsedURL.isExtension) return

  //host totally matches the MSVP entry
  if (isInBlocklist(parsedURL.host)){
    parsedURL.boostedBy = 'msvp'
    return block(tabId, parsedURL)
  } else {
    return ALLOW_REQUEST_TOKEN
  }
}
