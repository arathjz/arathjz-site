/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        hairline: 'var(--color-hairline)',

        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
          faint: 'var(--color-ink-faint)',
          mute: 'var(--color-ink-mute)',
          dim: 'var(--color-ink-dim)',
        },

        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },

        terminal: 'var(--color-terminal)',

        line: {
          DEFAULT: 'var(--color-line)',
          dim: 'var(--color-line-dim)',
          hover: 'var(--color-line-hover)',
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
