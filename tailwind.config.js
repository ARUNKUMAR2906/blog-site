/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs", // Tell Tailwind to scan your EJS files for class names
    "./public/**/*.html", // Include this if you have any static HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
