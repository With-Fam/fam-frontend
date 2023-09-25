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
      },
      lineHeight: {
        h1: '88px',
        h2: '72px',
        h3: '56px',
        h4: '40px',
        h5: '32px',
      },
    },
  },
  plugins: [],
}

export default config
