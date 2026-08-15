/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm neutral ink for text on white
        ink: {
          DEFAULT: '#1A1815',
          muted: '#6B655C',
          light: '#8D867B',
        },
        // Gold / bronze accent, matched to the packages flyer
        gold: {
          50: '#FBF8F1',
          100: '#F5EBD8',
          200: '#E8D6AE',
          300: '#D9BC7C',
          400: '#C7A04F',
          500: '#B08830',
          600: '#946E26',
          700: '#75561E',
        },
        // Page surfaces
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FAF8F4',
          border: '#EAE5DC',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['"Playfair Display"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'eyebrow': '0.22em',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(26, 24, 21, 0.04), 0 8px 24px -12px rgba(26, 24, 21, 0.10)',
        'card-hover': '0 2px 4px rgba(26, 24, 21, 0.05), 0 18px 40px -16px rgba(26, 24, 21, 0.18)',
        'nav': '0 1px 0 rgba(26, 24, 21, 0.06), 0 8px 30px -20px rgba(26, 24, 21, 0.25)',
      },
    },
  },
  plugins: [],
}
