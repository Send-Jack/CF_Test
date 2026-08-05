/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme-aware semantic tokens (RGB-channel CSS variables, support opacity modifiers)
        app: 'rgb(var(--bg) / <alpha-value>)',
        'app-surface': 'rgb(var(--surface) / <alpha-value>)',
        'app-surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        'app-surface-3': 'rgb(var(--surface-3) / <alpha-value>)',
        'app-fg': 'rgb(var(--fg) / <alpha-value>)',
        'app-muted': 'rgb(var(--muted) / <alpha-value>)',
        'app-faint': 'rgb(var(--faint) / <alpha-value>)',
        'app-border': 'rgb(var(--border) / <alpha-value>)',
        'app-border-soft': 'rgb(var(--border-soft) / <alpha-value>)',
        'app-border-strong': 'rgb(var(--border-strong) / <alpha-value>)',
        'app-accent': 'rgb(var(--accent) / <alpha-value>)',
        'app-accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
        'app-accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
        'app-danger': 'rgb(var(--danger) / <alpha-value>)',
        'app-warning': 'rgb(var(--warning) / <alpha-value>)',
        'app-success': 'rgb(var(--success) / <alpha-value>)',
        // Graphite-black background ramp
        base: {
          950: '#0a0b0e',
          900: '#0e1014',
          850: '#121419',
          800: '#16181d',
          750: '#1a1d23',
          700: '#202329',
        },
        // Application surfaces (slightly lighter)
        surface: {
          900: '#141619',
          800: '#191c20',
          700: '#1f2329',
          600: '#262a31',
          500: '#2e333b',
        },
        // Soft grey borders
        edge: {
          DEFAULT: '#2a2e36',
          soft: '#22252c',
          strong: '#383d47',
        },
        // Text
        ink: {
          DEFAULT: '#eef0f3',
          muted: '#9aa3b2',
          faint: '#6b7280',
        },
        // Violet primary accent
        violet: {
          50: '#f1ecff',
          100: '#e3d8ff',
          200: '#c9b4ff',
          300: '#a98cff',
          400: '#8b66ff',
          500: '#7c4dff',
          600: '#6b36f0',
          700: '#5a28d4',
          800: '#3e1aa0',
        },
        // Status colors
        success: {
          400: '#4ade80',
          500: '#34d399',
          600: '#22c55e',
        },
        warn: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        critical: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'dash-flow': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.22,1,0.36,1) both',
        'dash-flow': 'dash-flow 1.2s linear infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
