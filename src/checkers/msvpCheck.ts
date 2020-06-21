import { ParsedURL, ResourceMap } from '../utils/domain.js'
import { block, ALLOW_REQUEST_TOKEN} from '../utils/requestInterceptor.js'

// todo import real filters
const blockList = {
  'bla.com': true
} as ResourceMap

const isInBlocklist = (host: string) =>
  blockList[host]

export const check = (parsedURL: ParsedURL, tabId: number) => {
  if (parsedURL.isExtension) return ALLOW_REQUEST_TOKEN

  //host totally matches the MSVP entry
  if (isInBlocklist(parsedURL.host)){
    parsedURL.boostedBy = 'msvp'
    return block(tabId, parsedURL)
  } else {
    return ALLOW_REQUEST_TOKEN
  }
}
