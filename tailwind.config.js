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
            colors: {
                accent: 'hsl(213, 63%, 12%)', // #0B1C31
                'white': 'hsl(0, 0%, 99%)', // #FCFCFC
                'accent-half': 'hsla(213, 63%, 12%, 0.5)',
                secondary: 'hsla(197, 60%, 78%, 0.8)',
            },
        },
    },
    plugins: [],
}
