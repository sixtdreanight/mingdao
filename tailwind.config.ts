import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm Professional palette — grounded in coaching & mentorship
        espresso: {
          DEFAULT: '#2C1A0E',   // headings, primary text — rich brown-black
          muted: '#4A3728',      // body text
          light: '#6B5A4E',      // secondary text
        },
        cream: {
          DEFAULT: '#FAF4EC',    // card surfaces — warm but not yellow
          bg: '#FDF9F4',         // page background — barely off-white
          line: '#D9C9B0',       // borders, dividers — taupe
        },
        terracotta: {
          light: '#F5E1D8',     // accent bg
          DEFAULT: '#C96442',   // primary accent — warm, emotional, human
          deep: '#A0452A',      // hover/active
        },
        sage: {
          light: '#EDF2EC',
          DEFAULT: '#4A6741',   // trust, positive states — calm green
          deep: '#3A5233',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        display: ['"Noto Sans SC"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        card: '0 0 0 1px rgba(44, 26, 14, 0.04)',
        'card-hover': '0 0 0 1px rgba(201, 100, 66, 0.15), 0 2px 8px rgba(44, 26, 14, 0.06)',
        panel: '-1px 0 0 rgba(44, 26, 14, 0.06)',
        popover: '0 4px 16px rgba(44, 26, 14, 0.08), 0 0 0 1px rgba(44, 26, 14, 0.04)',
      },
      borderRadius: {
        card: '4px',
        control: '6px',
        panel: '12px',
        dialog: '16px',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
    },
  },
  plugins: [],
};
export default config;
