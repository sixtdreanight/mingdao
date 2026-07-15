import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm Paper & Ink palette
        paper: {
          DEFAULT: '#F9F6F0',   // page background — warm, not cold white
          hover: '#F3EFE7',     // subtle hover state
        },
        ink: {
          DEFAULT: '#1C1917',   // primary text — warm charcoal
          muted: '#78716C',     // secondary text — pencil gray
          faint: '#A8A29E',     // tertiary text — barely there
        },
        amber: {
          light: '#FEF3C7',     // accent background
          DEFAULT: '#B7611E',   // accent — desk lamp glow
          deep: '#92400E',      // accent hover/active
        },
        sage: {
          light: '#ECF4EE',     // trust background
          DEFAULT: '#3B6B4F',   // trust/positive — calm green
          deep: '#2D5A3E',      // trust hover
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
