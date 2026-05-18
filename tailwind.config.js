/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        gold: "#D4AF37",
        blood: "#8B0000",
        cream: "#F5E6CA",
        glow: "#FF4D4D"
      }
    }
  },
  plugins: [],
}
