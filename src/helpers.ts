import { parseURL } from './url'
type Tab = chrome.tabs.Tab

export const js = (filename: string): string =>
  chrome.extension.getURL(['/injectees/', filename].join(''))

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const $id = (id: string) =>
  document.getElementById(id)

export const not = (fn: Function) =>
  (...args: any[]) =>
    !fn(...args)

export const getUriFromTab = (tab: Tab) =>
  parseURL(tab.url.replace(/#.*$/, '')).host
