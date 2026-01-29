/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "orangemunda": "#FC5D0D",
        "spacecraft": "#F7F7F7",
        "black": "#000000",
        "white": "#FFFFFF",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Inter", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
