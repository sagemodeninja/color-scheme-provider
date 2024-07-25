import { ColorSchemeStore } from './storage'

const BROADCAST_CHANNEL = 'color-scheme-provider'

export type ColorSchemeValues = 'auto' | 'dark' | 'light'
export type Callback = (scheme: ColorSchemeValues) => void;

export class ColorSchemeProvider {
    private readonly _store: ColorSchemeStore
    private readonly _subscribers: Callback[]
    private readonly _broadcastChannel: BroadcastChannel

    private _rawScheme: ColorSchemeValues
    private _normalScheme: ColorSchemeValues

    constructor() {
        this._store = new ColorSchemeStore()
        this._subscribers = []
        this._broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL)

        this.addEventListeners()
    }

    public async subscribe(callback: Callback) {
        this._subscribers.push(callback)
        await this.resolveColorScheme()
        callback(this._normalScheme)
    }

    public async update(scheme: ColorSchemeValues) {
        if (this._rawScheme === scheme) return

        await this._store.put(scheme)
        this._rawScheme = scheme

        this._broadcastChannel.postMessage(scheme)
        this.setInternalScheme(scheme)

        this.notifySubscribers()
    }

    public async toggle() {
        await this.resolveColorScheme()
        const scheme = this._normalScheme
        this.update(scheme === 'dark' ? 'light' : 'dark')
    }

    private addEventListeners() {
        this._broadcastChannel.addEventListener('message', (event: MessageEvent) => {
            this.setInternalScheme(event.data as ColorSchemeValues)
            this.notifySubscribers()
        })
    }

    /**
     * Retrieves color scheme from store if not yet done so.
     * Otherwise, internal states are kept fresh during this instance's lifetime via other efficient means.
     */
    private async resolveColorScheme() {
        if (!this._rawScheme) {
            const scheme = await this._store.get()
            this.setInternalScheme(scheme as ColorSchemeValues)
        }
    }

    private setInternalScheme(scheme: ColorSchemeValues) {
        this._rawScheme = scheme
        this._normalScheme = this.getNormalScheme()
    }

    private getNormalScheme() {
        const scheme = this._rawScheme

        if (!scheme || scheme === 'auto') {
            const media = '(prefers-color-scheme: dark)'
            const isDark = window.matchMedia && window.matchMedia(media).matches
            return !isDark ? 'light' : 'dark'
        }

        return scheme as ColorSchemeValues
    }

    private notifySubscribers() {
        const scheme = this._normalScheme
        this._subscribers.forEach(callback => callback(scheme))
    }
}

const colorSchemeProvider = new ColorSchemeProvider();
export default colorSchemeProvider;