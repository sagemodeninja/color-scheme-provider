const COLOR_SCHEME_DB = 'colorSchemeDb'
const COLOR_SCHEME_STORE = 'colorSchemeStore'
const COLOR_SCHEME_KEY = 'color-scheme'

export class ColorSchemeStore {
    public async get() {
        const connection = await ColorSchemeStore.connect()
        return await ColorSchemeStore.get(connection)
    }

    public async put(value: string) {
        const connection = await ColorSchemeStore.connect()
        await ColorSchemeStore.put(connection, value)
    }

    private static connect(version: number = 1) {
        return new Promise<IDBDatabase>((resolve, reject) => {
            try {
                const request = indexedDB.open(COLOR_SCHEME_DB, version)

                request.onupgradeneeded = () =>
                    this.onUpgradeNeeded(request, version)

                request.onsuccess = () => {
                    resolve(request.result)
                }

                request.onerror = () => {
                    throw `Failed to open '${COLOR_SCHEME_DB}'. Error: ${request.error}`
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    private static onUpgradeNeeded(request: IDBOpenDBRequest, version: number) {
        const db = request.result
        db.createObjectStore(COLOR_SCHEME_STORE, { keyPath: 'key' })
    }

    private static startTransaction(connection: IDBDatabase, mode: IDBTransactionMode) {
        const trans = connection.transaction(COLOR_SCHEME_STORE, mode)
        return trans.objectStore(COLOR_SCHEME_STORE)
    }

    private static get(connection: IDBDatabase) {
        return new Promise<string | undefined>((resolve, reject) => {
            try {
                const store = this.startTransaction(connection, 'readonly')
                const request = store.get(COLOR_SCHEME_KEY)

                request.onsuccess = () => resolve(request.result?.value)

                request.onerror = () => {
                    throw `Failed to retrieve color scheme. Error: ${request.error}`
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    private static put(connection: IDBDatabase, value: string) {
        return new Promise<void>((resolve, reject) => {
            try {
                const store = this.startTransaction(connection, 'readwrite')
                const request = store.put({
                    key: COLOR_SCHEME_KEY,
                    value: value
                })

                request.onsuccess = () => resolve()

                request.onerror = () => {
                    throw `Failed to store color scheme. Error: ${request.error}`
                }
            } catch (e) {
                reject(e)
            }
        })
    }
}