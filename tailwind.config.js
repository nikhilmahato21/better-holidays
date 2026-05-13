/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B3E',
        'navy-light': '#1a2f5e',
        gold: '#F5A623',
        'gold-dark': '#d4891a',
        teal: '#00C9A7',
        'teal-dark': '#00a589',
        crimson: '#E53935',
        'crimson-dark': '#c62828',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(13,27,62,0.85) 0%, rgba(13,27,62,0.4) 100%)',
      }
    },
  },
  plugins: [],
}
