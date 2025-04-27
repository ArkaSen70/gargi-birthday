/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
        },
        purple: {
          600: '#9333EA',
          900: '#4C1D95',
        },
        white: {
          DEFAULT: '#FFFFFF',
          '10': 'rgba(255, 255, 255, 0.1)',
          '20': 'rgba(255, 255, 255, 0.2)',
          '30': 'rgba(255, 255, 255, 0.3)',
          '40': 'rgba(255, 255, 255, 0.4)',
          '50': 'rgba(255, 255, 255, 0.5)',
        },
        black: {
          DEFAULT: '#000000',
          '30': 'rgba(0, 0, 0, 0.3)',
          '50': 'rgba(0, 0, 0, 0.5)',
        },
      },
      backgroundColor: {
        'white-10': 'rgba(255, 255, 255, 0.1)',
        'black-30': 'rgba(0, 0, 0, 0.3)',
        'black-50': 'rgba(0, 0, 0, 0.5)'
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.aspect-w-1': {
          position: 'relative',
          paddingBottom: '100%',
        },
        '.aspect-w-16': {
          position: 'relative',
          paddingBottom: '56.25%',
        },
        '.aspect-h-1': {
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
        '.aspect-h-9': {
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
      })
    },
  ],
} 