// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./assets/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'heading': '3rem',    // 48px
        'paragraph': '1.5rem' // 24px
      }
    },
  },
  plugins: [],
};
