import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Scholar's Desk palette
        walnut: {
          DEFAULT: '#2C2416',   // desk surface — deep brown-black
          light: '#3D3224',     // slightly lighter
          surface: '#4A3F2F',   // hover/interactive states
        },
        paper: {
          DEFAULT: '#F5F0E8',   // page background — warm stone
          warm: '#FBF8F3',      // card bg — slightly warmer white
          line: '#E8E0D5',      // subtle dividers
        },
        brass: {
          light: '#F5E6D0',     // accent bg
          DEFAULT: '#C17F3E',   // accent — warm lamp glow
          deep: '#8B5E2F',      // hover/active
        },
        ink: {
          DEFAULT: '#1A1512',   // primary text — warm black
          muted: '#6B6258',     // secondary — warm gray
          faint: '#A09888',     // tertiary
        },
        sage: {
          light: '#EDF2EC',
          DEFAULT: '#4A6741',   // trust/positive — calm green
          deep: '#3A5233',
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
      boxShadow: {
        card: '0 1px 3px rgba(44, 36, 22, 0.06), 0 1px 2px rgba(44, 36, 22, 0.04)',
        'card-hover': '0 4px 12px rgba(44, 36, 22, 0.08)',
        panel: '-2px 0 12px rgba(44, 36, 22, 0.06)',
      },
    },
  },
  plugins: [],
};
export default config;
