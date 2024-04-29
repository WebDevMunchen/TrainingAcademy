/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {   
      fontFamily: {
      titleFont: ['Dosis', 'sans-serif'],
      titleH3: ['Roboto Serif', 'serif']
    }
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
