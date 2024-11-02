import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: '#4ade80',
          light: '#86efac',
          dark: '#22c55e',
        },
        gray: {
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          800: 'var(--gray-800)',
        }
      },
    },
  },
  plugins: [],
};
export default config;
