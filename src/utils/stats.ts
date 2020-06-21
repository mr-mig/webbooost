import { getUriFromTab, not } from './helpers.js'
import { ParsedURL } from "./url.js"
type Tab = chrome.tabs.Tab

const STORAGE_KEY = 'stats'

type Counter = {
  count: number
}

type StatEntry = Counter & {
  libs: string[]
}

type TotalEntry = {
  count: number,
  libs: {
    [libName in string]: Counter
  }
}

export type Stats = {
  tabStats: {
    [pageURI in string]: StatEntry
  },
  allStats: TotalEntry
}

let stats: Stats = {
  tabStats: {},
  allStats: {
    count: 0,
    libs: {}
  }
}

if (localStorage.getItem(STORAGE_KEY)) {
  stats = JSON.parse(localStorage.getItem(STORAGE_KEY))
}

console.log('Stats:', stats)

const hasLib = (entry: StatEntry, lib: string) =>
  entry.libs.indexOf(lib) > -1

const doesNotHaveLib: (...args: any[]) => boolean =
  not(hasLib)

const addLib = (entry: StatEntry, lib: string) =>
  entry.libs.push(lib)

const increaseCount = (counter: Counter) =>
  counter.count += 1

const getPageEntry = (stats: Stats, pageURI: string) =>
  stats.tabStats[pageURI]

const hasPageEntry = (stats: Stats, pageURI: string) =>
  stats.tabStats[pageURI] !== undefined

const doesNotHavePageEntry: (...args: any[]) => boolean =
  not(hasPageEntry)

const createPageEntry = (stats:Stats, pageURI: string) =>
  stats.tabStats[pageURI] = {
    count: 0,
    libs: [] as string[]
  }

const getTotalEntry = (stats: Stats, lib: string) =>
  stats.allStats.libs[lib]

const hasTotalEntry = (stats: Stats, lib: string) =>
  stats.allStats.libs[lib] !== undefined

const doesNotHaveTotalEntry: (...args: any[]) => boolean = not(hasTotalEntry)

const createTotalEntry = (stats: Stats, lib: string) =>
  stats.allStats.libs[lib] = {
    count: 0
  }

const trackPageHit = (stats: Stats, pageURI: string, lib: string) => {
  if (doesNotHavePageEntry(stats, pageURI))
    createPageEntry(stats, pageURI)

  const entry = getPageEntry(stats, pageURI)
  addLib(entry, lib)
  increaseCount(entry)
}

const trackTotalHit = (stats: Stats, lib: string) => {
  if (doesNotHaveTotalEntry(stats, lib))
    createTotalEntry(stats, lib)

  const entry = getTotalEntry(stats, lib)
  increaseCount(entry)
}

export const addBoost = (tabId: number, parsedURL: ParsedURL) => {
  chrome.tabs.get(tabId, (tab: Tab) => {
    // .url requires "tabs" permission
    const pageURI = getUriFromTab(tab)
    const lib = parsedURL.library

    trackPageHit(stats, pageURI, lib)
    trackTotalHit(stats, lib)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
  })
}

export const getPageStats = (tabId: number, fn: Function) =>
  chrome.tabs.get(tabId, (tab: Tab) => {
    const pageURI = getUriFromTab(tab)
    fn(getPageEntry(stats, pageURI))
  })

