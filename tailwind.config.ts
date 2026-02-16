import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  // 👇 ЦЕЙ БЛОК ШУКАЄ ФАЙЛИ ВСЮДИ (і в src, і в корені)
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"], // Тільки світла тема, щоб не плутатись
  },
};

export default config;