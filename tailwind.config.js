/** @type {import('tailwindcss').Config} */
export default {
  prefix:'tw-',
  content: [
    './index.html', 
    './src/pages/**/*.vue',
    './src/components/**/*.vue',
    "./src/*.vue",

  ],
  theme: {
    extend: {
      colors: {
        primary: '#00579d',
        secondary: '#3dccfd',
      },
    },
  },
  plugins: [],
}

