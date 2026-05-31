import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aegis-dark': '#0a0f1f',
        'aegis-darker': '#050a15',
        'aegis-card': '#111729',
        'aegis-border': '#1a2741',
        'aegis-accent': '#ff6b4a',
        'aegis-accent-light': '#ff8566',
        'aegis-success': '#00d084',
        'aegis-warning': '#ffa500',
        'aegis-critical': '#ff3333',
        'aegis-info': '#00b8e6',
        'aegis-text-primary': '#e8ecf1',
        'aegis-text-secondary': '#a0aec0',
        'aegis-text-tertiary': '#718096',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        mono: ['Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(255, 107, 74, 0.15)',
        'glow-md': '0 0 24px rgba(255, 107, 74, 0.2)',
        'glow-lg': '0 0 48px rgba(255, 107, 74, 0.25)',
        'glow-critical': '0 0 20px rgba(255, 51, 51, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan': 'scan 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 12px rgba(255, 107, 74, 0.2)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 24px rgba(255, 107, 74, 0.4)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
