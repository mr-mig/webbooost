import { getUriFromTab } from './helpers.js'
type Tab = chrome.tabs.Tab
type PageConfig = {
    id: string
    [key: string]: any
} 

export class State {
    private vals: { [key: string]: PageConfig }
    private storage: Storage

    constructor(storage: Storage) {
        this.storage = storage
        const serialized = storage.getItem('state')
        this.vals = serialized ? JSON.parse(serialized) : {}
    };

    public forHost(host: string) {
        return this.vals[host]
    }
    
    public get(tabId: number, cb: (p: PageConfig) => void) {
        chrome.tabs.get(tabId, (tab: Tab) => {
            const id = getUriFromTab(tab)
            const pageConfig = this.vals[id] || { id }
            cb(pageConfig)
        })
    }

    public sync(pageConfig: PageConfig) { 
        this.vals[pageConfig.id] = pageConfig
        this.storage.setItem('state', JSON.stringify(this))
        return this
    }
}

export const load = () => new State(localStorage)
