import { js } from './helpers'
import { ParsedURL, strURL } from './url'
import { addBoost } from './stats'
type BlockingResponse = chrome.webRequest.BlockingResponse

const logAction = (tabId: number, parsedURL: ParsedURL) =>
  addBoost(tabId, parsedURL)

// redirect page resource to webboost resource
export const redirect = (url: strURL, tabId: number, parsedURL: ParsedURL): BlockingResponse => {
  logAction(tabId, parsedURL)
  return { redirectUrl: js(url) }
}

// used for msvp blocking
// no resource will be loaded
export const block = (tabId: number, parsedURL: ParsedURL): BlockingResponse => {
  logAction(tabId, parsedURL)
  return { cancel: true }
}

export const ALLOW_REQUEST_TOKEN = { cancel: true } as BlockingResponse
