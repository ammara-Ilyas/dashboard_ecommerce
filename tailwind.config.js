/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable class-based dark mode (you can also use 'media' if you want to follow the user's system preference)
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom variable for background color
        foreground: "var(--foreground)", // Custom variable for foreground color
        // Add custom colors for dark mode
        darkBackground: "#1f1f1f", // Dark background color
        darkForeground: "#f0f0f0", // Light foreground color for dark mode
      },
      // You can also extend other theme aspects like spacing, fontSize, etc. based on your design
    },
  },
  plugins: [],
};
