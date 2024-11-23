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
    },
  },
  plugins: [require('flowbite/plugin')],
};
