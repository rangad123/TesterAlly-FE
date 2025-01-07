// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "node_modules/flowbite-react/lib/esm/**/*.js",
  "./node_modules/flowbite/**/*.js"
];
export const theme = {
  extend: {},
};
export const plugins = [require("@tailwindcss/forms"), require("flowbite/plugin")];