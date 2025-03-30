/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      'sans': ['"Work Sans"', 'sans-serif']
    },
    colors: {
      primary: '#016A70',
      primarySaturated: '#418f94',
      secondary: '#8da9c4',
      secondarySaturated: '#83c5be',
      accent: '#00A9BC',
      neutral: {
        1: '#051923',
        2: '#134074',
        3: '#0582ca',
        4: '#023e7d'
      },
      neutralSaturated: {
        1: '#f0f0e1',
        2: '#a1a19c',
      },
      info: '#127be3',
      error: '#e09f3e',
      errorSaturated: '#ea634e'
    },
    animation: {
      'shift-right': 'shiftRight 0.3s linear 1, shiftLeft 0.3s linear 3.7s 1 normal forwards',
      'shift-down': 'shiftDown 0.3s linear 1, shiftUp 0.3s linear 9.7s 1 normal forwards',
      'open-dropdown': 'openDropdown 0.3s linear 1 forwards',
      'close-dropdown': 'closeDropdown 0.3s linear 1 forwards'
    },
    screens: {
      '2xl': { 'max': '1530px' },
      'xl': { 'max': '1415px', 'min': '1176px' },
      'lg': { 'max': '1175px' },
      'md': { 'max': '955px' },
      'sm': { 'max': '740px' },
      'xs': { 'max': '655px' }
    },
    extend: {
      keyframes: {
        shiftRight: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(0)' }
        },
        shiftLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-120%)' }
        },
        shiftDown: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(0)' }
        },
        shiftUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-120%)' }
        },
        openDropdown: {
          '0%': { transform: 'scaleY(0%)' },
          '100%': { transform: 'scaleY(100%)' }
        },
        closeDropdown: {
          '0%': { transform: 'scaleY(100%)' },
          '100%': { transform: 'scaleY(0%)' }
        }
      }
    },
  },
  plugins: [],
}

