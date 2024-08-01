module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'purple-600': '#6b46c1',
        'purple-700': '#553c9a',
        'indigo-500': '#667eea',
        'indigo-600': '#5a67d8',
        'red-600': '#e53e3e',
        'green-600': '#48bb78',
      },
      fontFamily: {
        'serif': ['Aref Ruqaa', 'serif'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
