import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        green: {
          500: '#24AE7C',
          600: '#0D2A1F',
        },
        blue: {
          500: '#79B5EC',
          600: '#152432',
        },
        red: {
          500: '#F37877',
          600: '#3E1716',
          700: '#F24E43',
        },
        light: {
          200: '#E8E9E9',
        },
        dark: {
          200: '#0D0F10',
          300: '#131619',
          400: '#1A1D21',
          500: '#363A3D',
          600: '#76828D',
          700: '#ABB8C4',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      backgroundImage: {
        appointments: "url('/assets/images/appointments-bg.png')",
        pending: "url('/assets/images/pending-bg.png')",
        cancelled: "url('/assets/images/cancelled-bg.png')",
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
      borderImageSource: {
        'gradient-45deg':
          'linear-gradient(45deg, #4D62E5 0%, #87DDEE 45.31%, #B6F09C 100%)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.border-gradient-45deg': {
          'border-image-source': 'var(--border-gradient-45deg)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
} satisfies Config;

export default config;
