import '/public/css/app.css'
import { ColorSchemeProvider, ColorSchemeValues } from './color-scheme-provider'

const colorSchemeProvider = new ColorSchemeProvider()

colorSchemeProvider.subscribe(scheme => {
    console.log(`Color scheme changed to ${scheme}.`)
    document.body.dataset.colorScheme = scheme
})

document.addEventListener('DOMContentLoaded', () => {
    const selectScheme = document.getElementById('select_color_scheme') as HTMLSelectElement
    const button = document.getElementById('set_scheme')

    button.addEventListener('click', async () => {
        const scheme = selectScheme.value;
        colorSchemeProvider.update(scheme as ColorSchemeValues)
    })
})