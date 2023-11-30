/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      'xl': ['1.2rem', {
        lineHeight: '3rem'
        // letterSpacing: '-0.01em',  
        // fontWeight: '500',
      }]
  },
  plugins: [],
}
}