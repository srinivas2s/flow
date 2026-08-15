import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flow: {
          bg: "var(--flow-bg)",
          surface: "var(--flow-surface)",
          elevated: "var(--flow-elevated)",
          "text-primary": "var(--flow-text-primary)",
          "text-secondary": "var(--flow-text-secondary)",
          muted: "var(--flow-muted)",
          accent: "var(--flow-accent)",
          "accent-hover": "var(--flow-accent-hover)",
          "accent-glow": "var(--flow-accent-glow)",
          border: "var(--flow-border)",
          danger: "#EF4444",
          success: "#10B981",
          warning: "#F59E0B",
        },
      },
      boxShadow: {
        "neu-raised": "var(--neu-shadow-raised)",
        "neu-flat": "var(--neu-shadow-flat)",
        "neu-pressed": "var(--neu-shadow-pressed)",
        "neu-glow": "var(--neu-shadow-glow)",
        "neu-card": "var(--neu-shadow-card)",
        "neu-pill": "var(--neu-shadow-pill)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
