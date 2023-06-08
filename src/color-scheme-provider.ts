type Callback = () => void;

class ColorSchemeProvider {
    private _callbacks: Set<Callback>;

    constructor() {
        this._callbacks = new Set();
        this.attachStorageListener();
    }

    get preferredColorScheme(): string {
        return window.localStorage.getItem('prefers-color-scheme');
    }

    set preferredColorScheme(value: string) {
        const options = ['auto', 'light', 'dark'];
        
        if (!options.includes(value))
            throw new Error(`Value "${value}" is not a valid preffered color scheme.`);

        if (this.preferredColorScheme === value) return;
        
        window.localStorage.setItem('prefers-color-scheme', value);
        this.notify();
    }

    get colorScheme(): string {
        const colorScheme = this.preferredColorScheme;
        
        if (!colorScheme || colorScheme === 'auto')
        {
            const media = '(prefers-color-scheme: dark)';
            const isDark = window.matchMedia && window.matchMedia(media).matches;

            return !isDark ? 'light' : 'dark';
        }

        return colorScheme;
    }

    public subscribeNotification(callback: Callback) {
        this._callbacks.add(callback);
    }

    private attachStorageListener() {
        window.onstorage = (event: StorageEvent) => {
            if (event.key === 'prefers-color-scheme') {
                this.notify();
            }
        };
    }

    private notify() {
        this._callbacks.forEach(callback => callback())
    }
}

const colorSchemeProvider = new ColorSchemeProvider();

export default colorSchemeProvider;