declare module '@sagemodeninja/color-scheme-provider' {
    export type ColorSchemeValues = 'auto' | 'dark' | 'light'
    export type Callback = (scheme: ColorSchemeValues) => void

    export class ColorSchemeProvider {
        subscribe(callback: Callback): void
        update(scheme: ColorSchemeValues): void
        toggle(): void
    }

    const colorSchemeProvider: ColorSchemeProvider
    export default colorSchemeProvider
}
