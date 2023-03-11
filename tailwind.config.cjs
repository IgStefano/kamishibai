/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      burgundy: {
        DEFAULT: "#AD3525",
        50: "#DD8B8D",
        100: "#D27270",
        200: "#C66B5F",
        300: "#BA483D",
        400: "#AD3525",
        500: "#942C1E",
        600: "#7B2318",
        700: "#621B12",
        800: "#48130C",
        900: "#2D0C07",
      },
      lightYellow: {
        DEFAULT: "#FCE9C6",
        50: "#FEFAC8",
        100: "#FEF6C7",
        200: "#FDF2C7",
        300: "#FCE9C6",
        400: "#E7D8B6",
        500: "#D2C6A6",
        600: "#BEB496",
        700: "#A9A186",
        800: "#948F76",
        900: "#807C66",
      },
      gray: colors.gray,
    },
    extend: {
      dropShadow: {
        default: "1px 2px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
