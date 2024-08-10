/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        lightMode: {
          headerText: colors.neutral[900],
          subheading: colors.neutral[500],
          pfItemText: colors.neutral[600],
          pfItemBgColor: "hsl(0,0%,85%)",
          tagText: colors.white,
          tagBgColor: colors.neutral[600],
          footerText: colors.neutral[400],
          highlightColor: colors.cyan[600],
          bgColor: colors.white,
        },
        darkMode: {
          headerText: colors.neutral[100],
          subheading: colors.neutral[300],
          tagText: colors.neutral[200],
          tagBgColor: colors.neutral[700],
          pfItemText: colors.neutral[300],
          pfItemBgColor: "hsl(0,0%,35%)",
          footerText: colors.neutral[400],
          highlightColor: colors.cyan[600],
          bgColor: colors.neutral[800],
        },
      },
    },
  },
  plugins: [],
};
