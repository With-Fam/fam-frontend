/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
<<<<<<< HEAD
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.capitalize-first::first-letter': {
          'text-transform': 'uppercase',
        },
      })
    }),
  ],
=======

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
>>>>>>> origin/main
  theme: {
    ...defaultTheme,
    extend: {
      fontFamily: {
        abc: ['ABCROM Regular', 'sans'],
        abcMedium: ['ABCROM Medium', 'sans'],
        abcWide: ['ABCROM Wide Medium', 'sans'],
      },
<<<<<<< HEAD
      fontSize: {
        xxs: '0.625rem',
      },
      transitionProperty: {
        height: 'height',
      },
=======
>>>>>>> origin/main
      colors: {
        orange: {
          DEFAULT: '#F54D18',
        },
        yellow: {
          DEFAULT: '#FFE500',
<<<<<<< HEAD
          dark: '#FFAC31',
=======
>>>>>>> origin/main
        },
        pink: {
          DEFAULT: '#FDA4FF',
        },
<<<<<<< HEAD
        blue: {
          DEFAULT: '#2E6CE4',
        },
=======
>>>>>>> origin/main
        grey: {
          light: '#EBEBEB',
          DEFAULT: '#A7A7A7',
          dark: '#7A7A7A',
        },
        background: {
          DEFAULT: '#F7F7F7',
<<<<<<< HEAD
          secondary: '#F3F3F3',
          tertiary: '#F8F8F8',
          icon: '#ECECEC',
=======
>>>>>>> origin/main
        },
        status: {
          red: '#F00',
          green: '#45D039',
          purple: '#8146FF',
        },
      },
      boxShadow: {
        card: '0px 0px 16.625px 0px rgba(0, 0, 0, 0.10);',
<<<<<<< HEAD
=======
        row: '0px 0px 9.57213px 0px rgba(0, 0, 0, 0.10)',
>>>>>>> origin/main
      },
    },
  },
}

export default config
