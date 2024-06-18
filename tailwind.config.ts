/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
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
  theme: {
    ...defaultTheme,
    extend: {
      fontFamily: {
        abc: ['ABCROM Regular', 'sans'],
        abcMedium: ['ABCROM Medium', 'sans'],
        abcWide: ['ABCROM Wide Medium', 'sans'],
      },
      fontSize: {
        xxs: '0.625rem',
      },
      transitionProperty: {
        height: 'height',
      },
      colors: {
        white: {
          secondary: '#D9D9D9',
          DEFAULT: '#ffffff',
        },
        orange: {
          DEFAULT: '#F54D18',
          light: 'rgba(245, 77, 24, 0.1)',
        },
        yellow: {
          DEFAULT: '#FFE500',
          dark: '#FFAC31',
        },
        pink: {
          DEFAULT: '#FDA4FF',
        },
        blue: {
          DEFAULT: '#2E6CE4',
          light: '#00b2d9',
        },
        grey: {
          light: '#EBEBEB',
          DEFAULT: '#A7A7A7',
          dark: '#7A7A7A',
        },
        background: {
          DEFAULT: '#F7F7F7',
          secondary: '#F3F3F3',
          tertiary: '#F8F8F8',
          icon: '#ECECEC',
        },
        green: {
          DEFAULT: '#45D039',
          light: '#45D0391A',
        },
        status: {
          red: '#F00',
          green: '#45D039',
          purple: '#8146FF',
        },
      },
      boxShadow: {
        card: '0px 0px 16.625px 0px rgba(0, 0, 0, 0.10);',
      },
    },
  },
}

export default config
