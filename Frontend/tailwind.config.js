/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 15px 3px rgba(59, 130, 246, 0.7)",
        "glow-hover": "0 0 20px 5px rgba(59, 130, 246, 0.9)",
        "inner-glow": "0 0 15px 3px rgba(253, 230, 138, 0.7)",
        "glow-red": "0 0 15px 3px rgba(255, 0, 0, 0.7)", // red glow
        "glow-red-hover": "0 0 20px 5px rgba(255, 0, 0, 0.9)",
      },
    },
  },
  plugins: [],
};
