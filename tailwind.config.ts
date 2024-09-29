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
      colors: {
        'link-green': '#009100',
        'link-active-green': '#09ca09',
        'heading-green': '#009100',
      },
      fontFamily: {
        'open-sans': ['var(--font-open-sans)'],
        'montserrat': ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
};
export default config;
