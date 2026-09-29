/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        booth: {
          bg: "#FAF6F0",           // Warm cream foundation
          surface: "#FFFDF9",      // Warm ivory cards
          card: "#F5ECE3",         // Soft oatmeal cardstock
          sand: "#EFE5D8",         // Muted tan background
          border: "#EADDCF",       // Soft biscuit hairline border
          "border-dark": "#D8C5B2", // Defined warm border
          espresso: "#24140E",     // Deep chocolate brown heading text (15.6:1 contrast)
          cocoa: "#5A382C",        // Medium warm cocoa body text (7.2:1 contrast)
          muted: "#8A6D60",        // Warm muted caramel brown
          caramel: "#B85B28",      // Primary action button (5.14:1 contrast with white)
          "caramel-hover": "#9E4C1E",
          "caramel-soft": "#F5E6DC",
          terracotta: "#D46B4F",
          peach: "#F4A68C",
          "peach-soft": "#FAECE7",
          rose: "#E59F96",
          dark: "#1A0F0A",         // Extra deep espresso
        },
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
      },
      fontFamily: {
        serif: [
          '"Fraunces"',
          '"Playfair Display"',
          'Georgia',
          'serif',
        ],
        sans: [
          '"Plus Jakarta Sans"',
          '"Outfit"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        warm: "0 4px 20px -2px rgba(58, 30, 18, 0.06)",
        "warm-md": "0 8px 30px -4px rgba(58, 30, 18, 0.08)",
        "warm-lg": "0 12px 40px -6px rgba(58, 30, 18, 0.12)",
        paper: "0 2px 8px rgba(36, 20, 14, 0.05), 0 1px 2px rgba(36, 20, 14, 0.08)",
      },
    },
  },
  plugins: [],
};
