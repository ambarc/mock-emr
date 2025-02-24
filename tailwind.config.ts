import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor: {
        DEFAULT: {
          'h2': 'rgb(17, 24, 39)', // text-gray-900
          'h3': 'rgb(17, 24, 39)', // text-gray-900
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
