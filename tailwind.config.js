/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0d0d0d',
        surface: '#1a1a1a',
        hairline: '#1c1c1c',

        ink: {
          DEFAULT: '#f2ead8',
          soft: '#dccfb5',
          faint: '#bdb098',
          mute: '#cfcfcf',
          dim: '#968a78',
        },

        accent: {
          DEFAULT: '#f0b648',
          hover: '#ffcb6a',
        },

        terminal: '#6ee29a',

        line: {
          DEFAULT: '#4a4a4a',
          dim: '#5a5a5a',
          hover: '#8a8a8a',
        },
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        serif: ['Lora', 'serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
}
