import colorSchemeProvider from './color-scheme-provider';

colorSchemeProvider
    .subscribeNotification(() => {
        console.log(`Color scheme changed to ${colorSchemeProvider.colorScheme}.`);
    });

document.addEventListener('DOMContentLoaded', () => {
    const selectScheme = document.getElementById('select_color_scheme') as HTMLSelectElement;
    const button = document.getElementById('set_scheme');

    button.addEventListener('click', () => {
        const scheme = selectScheme.value;
        colorSchemeProvider.preferredColorScheme = scheme;
    });
});