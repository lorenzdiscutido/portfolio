import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#0f1115",
        surface: "#1e2128",
        primary: "#f8fafc",
        muted: "#94a3b8",
        blue: "#0052FF",
        orange: "#FF7A00",
      },
    },
  },
  plugins: [],
};
export default config;
