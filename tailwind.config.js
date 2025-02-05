/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable class-based dark mode (you can also use 'media' if you want to follow the user's system preference)
  important: true, // Ensures Tailwind classes have higher priority
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
        width: "width",
      },
      animation: {
        progress: "progress 2s ease-in-out infinite",
      },
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Add custom colors for dark mode
        darkBackground: "#1f1f1f", // Dark background color
        darkForeground: "#f0f0f0", // Light foreground color for dark mode
      },
      // You can also extend other theme aspects like spacing, fontSize, etc. based on your design
    },
  },
  plugins: [],
};
