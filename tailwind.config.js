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
        '.min-h-5em': {
          'min-height': '5em',
        },
        '.orange-gradient': {
          background: 'linear-gradient(120deg, #ee964b 0%, #f4d35e 100%)',
          transition: 'all .4s ease-out',
        },
        '.silver-gradient': {
          background: 'linear-gradient(120deg, #ebedee 0%, #EFF1F1 100%)',
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
