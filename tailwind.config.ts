import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "dark-primary": "#222831",
      "light-primary": "#393e46",
      "dark-secondary": "#f96d00",
      "light-secondary": "#f2f2f2",
      cyan: "#0e7490",
      red: "#B22222",
      white: "#FDFEFE",
      black: "#17202A",
    },
  },
  plugins: [],
};
export default config;
