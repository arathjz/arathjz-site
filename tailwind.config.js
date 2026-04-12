/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        hairline: 'rgb(var(--color-hairline) / <alpha-value>)',

        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)',
          mute: 'rgb(var(--color-ink-mute) / <alpha-value>)',
          dim: 'rgb(var(--color-ink-dim) / <alpha-value>)',
        },

        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
        },

        terminal: 'rgb(var(--color-terminal) / <alpha-value>)',

        line: {
          DEFAULT: 'rgb(var(--color-line) / <alpha-value>)',
          dim: 'rgb(var(--color-line-dim) / <alpha-value>)',
          hover: 'rgb(var(--color-line-hover) / <alpha-value>)',
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
