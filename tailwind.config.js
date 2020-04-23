const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    colors: {
      blue: '#0d3b66',
      'light-blue': '#224F75',
      cream: '#f9f8f4',
      red: '#f1554c',
      yellow: '#f4d35e',
      orange: '#ee964b',
      silver: '#eae9f2',
      gray: '#696871',
      darkgray: '#444349',
      white: '#fff',
    },
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.orange-gradient': {
          background: 'linear-gradient(120deg, #f9f8f4 0%, #eae9f2 100%)',
        },
        '.silver-gradient': {
          background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
        },
        '.rounded-xl': {
          'border-radius': '1rem',
          'border-top-left-radius': '0',
          'border-bottom-left-radius': '0',
        },
        '.h-min-10': {
          'min-height': '10rem',
        },
      }

      addUtilities(newUtilities)
    }),
  ],
}
