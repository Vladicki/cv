// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // Ensure your 'content' array correctly points to all files
  // where you use Tailwind classes (e.g., your React components)
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // This is the crucial line for dark mode by class
  darkMode: "class",
  theme: {
    extend: {
      // Define your custom colors here. These will be the base colors.
      // You'll then use the 'dark:' prefix to change them in dark mode.
      colors: {
        "white-50": "#e6f2ff", // Your custom light-ish color
        "black-50": "#1c1c21", // Your custom dark-ish color
        "black-100": "#0e0e10", // Another dark custom color
        "blue-accent": "#007bff", // An accent color, for example
        // ... any other custom colors from your @theme block
      },
      fontFamily: {
        sans: ["Mona Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
