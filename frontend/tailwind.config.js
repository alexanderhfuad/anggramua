/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f7",
          100: "#ffe4f0",
          500: "#ec4899",
          700: "#be185d",
          900: "#831843"
        }
      },
      boxShadow: {
        glow: "0 10px 40px rgba(236, 72, 153, 0.35)"
      }
    }
  },
  plugins: []
};
