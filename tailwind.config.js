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
      },
      fontFamily: {
        sans: ["Mona Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
  safelist: [
    // Your fallback class (always good to safelist if used dynamically)
    "bg-black-200",
    "text-[#0F0F0F]", // From React badge's textColor
    "text-[#F0F0F0]", // From React badge's textColor
    "text-white-50", // Your fallback text color (assuming white-50 is defined in theme.extend.colors)

    // Safelist all unique hex codes that appear in your `tech` and `experiences` data
    "bg-[#00d5f6]", // tech-react-blue
    "bg-[#009cf7]", // tech-docker-blue
    "bg-[#F0F0F0]", // tech-tailwind, tech-css-gray
    "bg-[#f8c325]", // tech-python-yellow
    "bg-[#f73c1c]", // tech-html-red, tech-git-red
    "bg-[#f18615]", // tech-js-orange
    "bg-[#373737]", // tech-github-dark
    "bg-[#7fd03e]", // tech-postgresql-green
    "bg-[#023530]", // tech-mongodb-green
    "bg-[#2e6ce6]", // tech-kubernetes-blue, tech-go-blue
    "bg-[#089d37]", // tech-neovim-green, tech-threejs-green
    "bg-[#f19733]", // tech-java-orange, tech-node-orange (and from your experiences.stack)
    "bg-[#000000]", // If you have a direct black hex not covered by black-200
  ],
};
