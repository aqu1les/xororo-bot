module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'primary-lighten': 'var(--primary-lighten)',
        'primary-dark': 'var(--primary-dark)',
        secondary: 'var(--secondary)',
        'secondary-light': 'var(--secondary-light)',
        'secondary-dark': 'var(--secondary-dark)'
      }
    }
  },
  plugins: []
};
