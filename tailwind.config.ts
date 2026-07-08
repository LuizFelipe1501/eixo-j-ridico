import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        planalto: {
          DEFAULT: "#14337C",
          deep: "#0C2258",
          soft: "#E9EFFB",
        },
        ipe: {
          DEFAULT: "#F2B90D",
          soft: "#FDF3D3",
        },
        concreto: "#F7F6F2",
        grafite: "#16181D",
        cinza: "#5B6270",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "system-ui", "sans-serif"],
        sans: ["'Instrument Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        wrap: "72rem",
      },
    },
  },
  plugins: [],
};
export default config;
