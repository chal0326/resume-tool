import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import filters from 'tailwindcss-filters';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      colors: {
        olive: '#738561',
        darkGreen: '#33443C',
        yellow: '#F4B860',
        greyGreen: '#CAD2C5',
        deepBlueGreen: '#264653',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [
    forms,
    typography,
    filters,
  ],
}
