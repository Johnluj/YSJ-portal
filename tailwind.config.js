/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ysj-dark-green': '#0F3D1F',
        'ysj-green': '#228B22',
        'ysj-gold': '#FFD700',
        'ysj-cream': '#F5F5DC',
      },
    },
  },
  plugins: [],
}
