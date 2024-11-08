import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import filters from 'tailwindcss-filters';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    typography,
    filters, // Add this line if you installed tailwindcss-filters
  ],
}
