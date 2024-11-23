/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.{html,js}", "./app/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        "main-color": "#c19d56",
        "second-color": "#c8c8c8",
        "carousel-color": "#F2EFEE",
      },
      margin: {
        carousel: "600px",
      },
    },
  },
  plugins: [],
};
