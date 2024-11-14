import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import filters from 'tailwindcss-filters';

export default {
  content: [
   "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        colors: {
          olive: '#738561',
          darkGreen: '#33443C',
          yellow: '#F4B860',
          greyGreen: '#CAD2C5',
          deepBlueGreen: '#264653',
        },
      },
    },
  
    plugins: [
    forms,
    typography,
    filters, // Add this line if you installed tailwindcss-filters
  ],
}
