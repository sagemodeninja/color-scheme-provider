declare module '@sagemodeninja/color-scheme-provider' {
    type Callback = () => void;

    class ColorSchemeProvider {
        preferredColorScheme: string;
        colorScheme: string;
        subscribeNotification(callback: Callback): void;
        toggle(): void;
    }

    const colorSchemeProvider: ColorSchemeProvider;

    export default colorSchemeProvider;
}
