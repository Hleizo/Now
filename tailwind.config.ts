import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF5F2",
          100: "#FFE8E0",
          200: "#FFD0C2",
          300: "#FFB199",
          400: "#FF8A66",
          500: "#FF6B35",
          600: "#E55A2B",
          700: "#CC4A22",
          800: "#A33B1B",
          900: "#7A2C14",
        },
        surface: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
