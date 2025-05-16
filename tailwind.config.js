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
    extend: {},
  },
  plugins: [],
}

