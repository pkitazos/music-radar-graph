import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-base": "#06070E",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "dark",
      {
        "neon-ish": {
          primary: "#84cc16",
          secondary: "#1fdf64",
          accent: "#f41f6d",
          neutral: "#191D24",
          "base-100": "#06070E",
          info: "#9ca3af",
          success: "#22c55e",
          warning: "#fbbf24",
          error: "#b91c1c",
        },
      },
    ],
  },
} satisfies Config;
