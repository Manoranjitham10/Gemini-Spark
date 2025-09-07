/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scan all React files
  ],
  theme: {
    extend: {
      // Optional: extend colors, spacing, or other utilities if needed
      colors: {
        'custom-gray': '#e5e7eb', // example custom color
      },
      maxWidth: {
        'chat': '24rem', // max width for chat container
      },
    },
  },
  plugins: [],
}
