/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...defaultTheme,
    extend: {
      fontSize: {
        h1: '80px',
        h2: '64px',
        h3: '40px',
        h4: '32px',
        h5: '24px',
        p1: '32px',
      },
      lineHeight: {
        h1: '88px',
        h2: '72px',
        h3: '56px',
        h4: '40px',
        h5: '22px',
        p3: '22px',
        p4: '20px',
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
    },
  },
  plugins: [],
}

export default config
