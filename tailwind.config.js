/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('@tailwindcss/forms')],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    screens:{
      sm:'480px',
      md:'768px',
      lg:'1024px',
      xl:'1440px'
    },
    extend: {},
  },
  plugins: [],
  
}