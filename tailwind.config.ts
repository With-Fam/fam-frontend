/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...defaultTheme,
    extend: {
      fontFamily: {
        abc: ['ABCROM Regular', 'sans'],
        abcMedium: ['ABCROM Medium', 'sans'],
        abcWide: ['ABCROM Wide Medium', 'sans'],
      },
      colors: {
        orange: {
          DEFAULT: '#F54D18',
        },
        yellow: {
          DEFAULT: '#FFE500',
        },
        pink: {
          DEFAULT: '#FDA4FF',
        },
        grey: {
          light: '#EBEBEB',
          DEFAULT: '#A7A7A7',
          dark: '#7A7A7A',
        },
        background: {
          DEFAULT: '#F7F7F7',
        },
        status: {
          red: '#F00',
          green: '#45D039',
          purple: '#8146FF',
        },
      },
      boxShadow: {
        card: '0px 0px 16.625px 0px rgba(0, 0, 0, 0.10);',
        row: '0px 0px 9.57213px 0px rgba(0, 0, 0, 0.10)',
      },
    },
  },
}

export default config
