/** @type {import('tailwindcss').Config} */

var srcDir = '.'
export default {
    content: [
        `${srcDir}/components/**/*.{vue,js,ts}`,
        `${srcDir}/layouts/**/*.vue`,
        `${srcDir}/pages/**/*.vue`,
        `${srcDir}/composables/**/*.{js,ts}`,
        `${srcDir}/plugins/**/*.{js,ts}`,
        `${srcDir}/utils/**/*.{js,ts}`,
        `${srcDir}/App.{js,ts,vue}`,
        `${srcDir}/app.{js,ts,vue}`,
        `${srcDir}/Error.{js,ts,vue}`,
        `${srcDir}/error.{js,ts,vue}`,
        `${srcDir}/app.config.{js,ts}`,
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Proxima Nova', 'ui-sans-serif', 'system-ui'],
                serif: ['Mignon', 'ui-serif', 'Georgia']
            },
            backgroundImage: {
                tooth: 'url(/assets/icons/tooth.svg)',
            },
            backgroundSize: {
                'tooth-big': '10rem',
                'tooth-small': '4.71664rem',
            },
            colors: {
                accent: 'hsl(213, 63%, 12%)', // #0B1C31
                white: 'hsl(0, 0%, 99%)', // #FCFCFC
                'accent-half': 'hsla(213, 63%, 12%, 0.5)',
                secondary: 'hsla(197, 60%, 78%, 0.8)', // #CBE6F1CC
                'secondary-before': 'hsla(197, 58%, 87%, 0.8)', // #A7D6E9CC
                'secondary-disabled': 'hsla(197, 58%, 87%, 0.3)', // #F0F1F2
                blue: 'hsla(212, 79%, 19%, 1)', // #0A2D56
                gray: 'hsl(210, 7%, 95%)', // #F0F1F2
                'system-success': 'hsl(101, 49%, 66%)', // #98D27C
                'system-danger': 'hsl(4, 66%, 66%)', // #E1766F
                'system-warning': 'hsl(40, 93%, 71%)', // #FACB71
            },
        },
    },
    plugins: [],
}
