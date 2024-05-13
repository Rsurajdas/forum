/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      scale: {
        101: '1.01',
        102: '1.02',
      },
    },
    container: {
      center: true,
      xl: {
        width: '1280px',
      },
    },
  },
  plugins: [],
};
