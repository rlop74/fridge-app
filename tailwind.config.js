const colors = require("./styles/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "",
        secondary: "",
        tertiary: "",
        heading: colors.HEADING,
        cardBg: colors.CARD_BG,
        buttonBg: colors.BUTTON_BG,
      }
    },
  },
  plugins: [],
};
