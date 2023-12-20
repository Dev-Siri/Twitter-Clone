import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        "extrabold-xl": "900",
      },
      colors: {
        "twitter-blue": "#1d9bf0",
        "darker-twitter-blue": "rgba(26,140,216,1.00)",
        "really-dark": "#080808",
      },
    },
  },
  plugins: [],
} satisfies Config;
