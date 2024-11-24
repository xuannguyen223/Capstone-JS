/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{html,js}",
    "./app/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        "main-color": "#c19d56",
        "second-color": "#c8c8c8",
        "carousel-color": "#F2EFEE",
        primary: "#C19C55",
      },
      margin: {
        carousel: "600px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
