/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '.src/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}', // Adjust these paths based on your project structure
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
