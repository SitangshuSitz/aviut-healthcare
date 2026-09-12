import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#12305B",
          blue: "#2E6FB0",
          red: "#E4463B",
          gold: "#D8A945",
          green: "#5FA35A",
          ink: "#0F1B2D",
          bg: "#F5F7FA",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,27,45,0.08), 0 1px 2px rgba(15,27,45,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
