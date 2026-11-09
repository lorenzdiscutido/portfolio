import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        base: "rgb(var(--base) / <alpha-value>)",
        glass: "rgba(255, 255, 255, 0.05)",
      },
      borderColor: {
        base: "rgb(var(--base) / <alpha-value>)",
      },
      colors: {
        midnight: "#0a0f1c",
        oceanic: "#111827",
        frost: "#f8fafc",
        chartreuse: "#CCFF00",
        neonPink: "#FF007F",
        accent: "rgb(var(--accent) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        blue: {
          ...colors.blue,
          DEFAULT: "rgb(var(--blue) / <alpha-value>)",
        },
        orange: {
          ...colors.orange,
          DEFAULT: "rgb(var(--orange) / <alpha-value>)",
        },
      },
      keyframes: {
        "drift-a": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(18vw, 12vh, 0) scale(1.15)" },
          "66%": { transform: "translate3d(6vw, 28vh, 0) scale(0.9)" },
        },
        "drift-b": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(-20vw, -10vh, 0) scale(0.9)" },
          "66%": { transform: "translate3d(-8vw, -26vh, 0) scale(1.2)" },
        },
        "drift-c": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translate3d(-14vw, 16vh, 0) scale(1.25)", opacity: "1" },
        },
        "grid-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "drift-a": "drift-a 28s ease-in-out infinite",
        "drift-b": "drift-b 34s ease-in-out infinite",
        "drift-c": "drift-c 22s ease-in-out infinite",
        "grid-pulse": "grid-pulse 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
