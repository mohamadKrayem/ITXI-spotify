/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
         "sm0": "200px",
         "sm1": "300",
         "sm2": "400px",
         "sm3": "500px",
         "smm": "600px",
         // "sm": "640px",
         // "md": "768px",
         // "lg": "1024px",
         // "xl": "1280px",
         // "2xl": "1536px",
      }
    },
  },
  plugins: [],
}