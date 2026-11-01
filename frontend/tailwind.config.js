/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'morphia-blue': '#C9D9E8',
        'morphia-beige': '#E6D8C3',
        'morphia-cream': '#F8F2E4',
        'morphia-white': '#FFFFFF',
        'morphia-dark': '#1E1E1C',
        'morphia-muted': '#6E655F',
        'morphia-gold': '#C5A059',
        'morphia-silver': '#A8A9AD',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
