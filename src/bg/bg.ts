import * as stats from '../stats'

import { check as hashCheck } from '../checkers/hashCheck'
import { check as regCheck } from '../checkers/regCheck'
import { check as msvpCheck } from '../checkers/msvpCheck'
import * as interceptor from '../requestInterceptor'
import { parseURL } from '../url'
import { load } from '../state'

const checkers = [hashCheck, regCheck, msvpCheck]

type TabListenerMap = {
  [tabId: number]: (r: chrome.webRequest.WebRequestDetails) => void
}

// webpage-specific settings are stored in this object
let state = load()

// need to maintain listeners, because all already opened tabs will not be boosted otherwise...
// furthermore, all tabs with changed URLs will not be boosted...
let tabListeners: TabListenerMap = {}

// set listener for each created/reloaded tab
// this is needed because tabId and website URL will not be available otherwise inside the listener
chrome.tabs.onUpdated.addListener((tabId: number, change: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  // sync state on each refresh/creation to have less syncing penalty
  state = load()

  // if the page is reloaded and the URL is changed or it is a first installation of the extension...
  // tab object is IMMUTABLE, surprise surprise!
  // So, we need to add new listeners for a tab with a new URL...
  if (change.status === 'loading' && (change.url || tabListeners[tabId] === undefined)) {
    const requestListener = tabListeners[tabId]

    if (requestListener !== undefined) {
      chrome.webRequest.onBeforeRequest.removeListener(requestListener)
    }

    tabListeners[tabId] = makeRequestListener(tab);

    chrome.webRequest.onBeforeRequest.addListener(
      requestListener,
      {
        tabId: tab.id,
        urls: ['http://*/*', 'https://*/*', 'chrome-extension://*/*']
      },
      ["blocking"]
    )
  }
})

// cleanup all those listeners
chrome.tabs.onRemoved.addListener(tabId => {
  chrome.webRequest.onBeforeRequest.removeListener(tabListeners[tabId]);
  tabListeners[tabId] = undefined;
})


// First time impression
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: 'https://www.facebook.com/WebBoostExtension/app/135876083099764/' })
  }
})

const makeRequestListener = (tab: chrome.tabs.Tab) =>
  // tab object is immutable
  // So there is a guarantee that tab.url will be the same in this scope
  (request: chrome.webRequest.WebRequestDetails) => {
    if (request.method !== 'GET') return interceptor.ALLOW_REQUEST_TOKEN

    const normalizedUrl = parseURL(request.url)

    // do nothing if boosting was disabled for given website
    const siteUrl = parseURL(tab.url)
    if (state.forHost(siteUrl.host)?.disabled === true) return interceptor.ALLOW_REQUEST_TOKEN

    for (let checkFn of checkers) {
      const result = checkFn(normalizedUrl, request.tabId)
      if (result?.redirectUrl || result?.cancel) return result
    }


    return interceptor.ALLOW_REQUEST_TOKEN
  }