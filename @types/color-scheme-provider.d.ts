declare module '@sagemodeninja/color-scheme-provider' {
    type Callback = () => void;
  
    export default class ColorSchemeProvider {
      preferredColorScheme: string;
      colorScheme: string;
      subscribeNotification(callback: Callback): void;
    }
}