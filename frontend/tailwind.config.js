export default {
  content: ['./index.html', './src/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        glass: '0 24px 80px rgba(15, 23, 42, 0.28)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(167,139,250,0.20), transparent 45%), radial-gradient(circle at bottom right, rgba(52,211,153,0.14), transparent 30%)'
      }
    }
  },
  plugins: []
};
