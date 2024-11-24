/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.{html,js}", "./app/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors:{
        primary: '#C19C55',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
};
