/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Add dark mode configuration
  theme: {
    extend: {   
      fontFamily: {
        anek: ["Anek Devanagari", "sans-serif"],
        poppins: ["Poppins", "sans"],
      },
      keyframes: { // Add keyframes for animation
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: { // Add animation
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          primary: "#64AFC2",
          secondary: "#624595",
          accent: "#F5A786",
          "base-200": "#E1E1E0",
          neutral: "#27241E",
          success: "#28965A",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
