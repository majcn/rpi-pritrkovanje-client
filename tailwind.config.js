const konstaConfig = require('konsta/config');

const config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = konstaConfig(config);
