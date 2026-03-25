import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './client/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A3A6B',
          dark: '#0D1B3E',
          light: '#2A5ABB',
        },
        accent: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        tv: {
          bg: '#04070F',
          card: '#0B0F1C',
          border: 'rgba(255,255,255,0.06)',
          teal: '#00C9A7',
          orange: '#FF6B35',
          blue: '#5C9EFF',
          purple: '#B48AFF',
          yellow: '#F0B429',
          red: '#FF4D4D',
          green: '#22C55E',
          text: '#E8EAF0',
          text2: '#7E8799',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
