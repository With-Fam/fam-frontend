/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.capitalize-first::first-letter': {
          'text-transform': 'uppercase',
        },
      })
    }),
      require("tailwindcss-animate")
],
  theme: {
      ...defaultTheme,
  	extend: {
  		fontFamily: {
  			abc: [
  				'ABCROM Regular',
  				'sans'
  			],
  			abcMedium: [
  				'ABCROM Medium',
  				'sans'
  			],
  			abcWide: [
  				'ABCROM Wide Medium',
  				'sans'
  			]
  		},
  		fontSize: {
  			xxs: '0.625rem'
  		},
  		transitionProperty: {
  			height: 'height'
  		},
  		colors: {
  			white: {
  				secondary: '#D9D9D9',
  				DEFAULT: '#ffffff',
  				primary: '#fafafa'
  			},
  			orange: {
  				DEFAULT: '#F54D18',
  				light: 'rgba(245, 77, 24, 0.1)'
  			},
  			yellow: {
  				DEFAULT: '#FFE500',
  				dark: '#FFAC31'
  			},
  			pink: {
  				DEFAULT: '#FDA4FF'
  			},
  			blue: {
  				DEFAULT: '#2E6CE4',
  				light: '#00b2d9'
  			},
  			grey: {
  				light: '#EBEBEB',
  				DEFAULT: '#A7A7A7',
  				dark: '#7A7A7A'
  			},
  			red: {
  				DEFAULT: '#FF0000'
  			},
  			background: 'hsl(var(--background))',
  			green: {
  				DEFAULT: '#45D039',
  				light: '#45D0391A'
  			},
  			status: {
  				red: '#F00',
  				green: '#45D039',
  				purple: '#8146FF'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			card: '0px 0px 16.625px 0px rgba(0, 0, 0, 0.10);'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
}

export default config
