import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        surface: "var(--surface)",
        primary: "var(--primary)",
        muted: "var(--muted)",
        blue: "var(--blue)",
        orange: "var(--orange)",
      },
    },
  },
  plugins: [],
};
export default config;
