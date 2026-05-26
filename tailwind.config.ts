import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        steel: "#5f6f7a",
        mist: "#eef3f6",
        signal: "#dd5c35",
        forest: "#2d6a4f",
        ocean: "#287c9f",
        amber: "#c9872b"
      },
      boxShadow: {
        panel: "0 16px 42px rgba(23, 32, 38, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
