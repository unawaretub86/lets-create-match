/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Escanea todos los archivos en src/app
    './src/components/**/*.{js,ts,jsx,tsx}', // Escanea todos los archivos en src/components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};