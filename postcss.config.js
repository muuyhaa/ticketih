// postcss.config.js (More robust ES Module format)
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss, // Pass the imported function reference
    autoprefixer,
  ],
};