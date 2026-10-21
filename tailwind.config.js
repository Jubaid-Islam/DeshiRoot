
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f4',
          100: '#e3eae3',
          200: '#c5d5c5',
          600: '#52796f',
          800: '#2f3e46',
          900: '#1b4332', // Main Forest Green from DeshiRoot logo
        },
        khaki: {
          50: '#faf8f5',
          100: '#f3ede2',
          200: '#e5d7c3',
          700: '#8c7051',
        },
        citrusYellow: '#f5b000', // Yellow accent line from DeshiRoot logo
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}