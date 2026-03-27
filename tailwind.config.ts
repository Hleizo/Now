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
        // Primary Brand Navy - trust, reliability, strong brand foundation
        navy: {
          50: "#E6EAF0",
          100: "#C2CBDA",
          200: "#9AABC3",
          300: "#728BAC",
          400: "#4A6B95",
          500: "#0B1F3B",
          600: "#091A32",
          700: "#071529",
          800: "#051020",
          900: "#030B17",
        },
        // Primary Action Blue - CTA buttons, links, interactive elements
        action: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
          800: "#1E3A8A",
          900: "#1E3A5F",
        },
        // Deal/Promo Amber - discounts, urgency, attention
        deal: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        // Background colors
        surface: "#F8FAFC",
        card: "#FFFFFF",
        border: "#E5E7EB",
        // Text colors
        "text-primary": "#111827",
        "text-secondary": "#6B7280",
        "text-muted": "#9CA3AF",
        // Status colors
        success: "#16A34A",
        error: "#DC2626",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
        nav: "0 -1px 3px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
