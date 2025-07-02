/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core palette (mejorada)
        'omni-bg': '#0A0A0A',
        'omni-surface': '#1A1A1A',
        'omni-surface2': '#242424',
        'omni-border': '#2A2A2A',
        
        // Text (más profesional)
        'omni-text': '#F2F2F7',
        'omni-textDim': '#8E8E93',
        
        // Primary colors (más profesionales)
        'omni-cyan': '#0A84FF',
        'omni-cyanDim': '#0066CC',
        
        // Secondary (ajustada)
        'omni-green': '#00D762',
        'omni-greenDim': '#00A850',
        
        // Nuevos colores para x.key.mx
        'omni-key': '#FFD60A',
        'omni-security': '#00C7BE',
        
        // Status colors (mejorados)
        'omni-red': '#FF453A',
        'omni-redDim': '#CC2E24',
        'omni-yellow': '#FFD60A',
        'omni-purple': '#BF5AF2',
        
        // Gradients para efectos
        'omni-gradient-1': '#0A84FF',
        'omni-gradient-2': '#00C7BE',
        'omni-gradient-3': '#FFD60A',
        
        // Primary colors para compatibilidad
        primary: {
          50: '#eff6ff',
          500: '#0A84FF',
          600: '#0066CC',
          700: '#004499',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(10, 132, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(10, 132, 255, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#0A84FF' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(10, 132, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(10, 132, 255, 0.1) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'key-gradient': 'linear-gradient(135deg, #0A84FF 0%, #00C7BE 50%, #FFD60A 100%)',
      },
      backgroundSize: {
        grid: '20px 20px',
      },
      scale: {
        '95': '0.95',
        '102': '1.02',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};