/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'oxford-blue': '#00142F',
        'royal-blue': '#0022FF',
        'brandeis-blue': '#006FFC',
        'sky-blue': '#00BBF9', // Ensure this is defined
        'aquamarine': '#00F5D4', // Ensure this is defined
      },
      fontFamily: {
        'display': ['"Exo 2"', 'sans-serif'],
        'mono': ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

