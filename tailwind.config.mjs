import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ["light"], // Only enable the light theme
  },
}; 