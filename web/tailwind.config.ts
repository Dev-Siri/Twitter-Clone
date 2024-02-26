import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontWeight: {
        "extrabold-xl": "900",
      },
      colors: {
        "twitter-blue": "#1d9bf0",
        "darker-twitter-blue": "rgba(26,140,216,1.00)",
        "dim-gray": "rgb(21, 32, 43)",
        "really-dark": "#080808",
        "slightly-less-dark": "#0D0D0D",
      },
    },
  },
  plugins: [],
} satisfies Config;
