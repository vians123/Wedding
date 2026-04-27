import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FFFEFC",
          100: "#FFF9F2",
          200: "#FFF2E5",
        },
        beige: {
          50: "#FBF7F1",
          100: "#F5EEE3",
          200: "#EADDCB",
        },
        blush: {
          50: "#FFF6F8",
          100: "#FDE9EF",
          200: "#F6C9D6",
          300: "#EFA7BE",
        },
        gold: {
          50: "#FFF8E9",
          100: "#FBECC8",
          200: "#EFCF84",
          300: "#D9B35A",
          400: "#B98C2E",
        },
        ink: {
          50: "#6C6A67",
          100: "#4A4846",
          200: "#2C2A28",
          300: "#161514",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(20, 18, 16, 0.08)",
        ring: "0 0 0 1px rgba(20, 18, 16, 0.08)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

