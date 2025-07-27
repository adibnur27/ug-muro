/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deepBlend: "#0f0a18",
      },
      fontFamily: {
        rajdhani: ['"Rajdhani"', "sans-serif"],
        orbitron: ['"Orbitron"', "sans-serif"],
        exo: ['"Exo 2"', "sans-serif"],
        prompt: ['"Prompt"', "sans-serif"],
        space: ['"Space Grotesk"', "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-slower': 'spin 10s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
