
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066CC',
          600: '#0052A3',
          700: '#003D7A',
          800: '#002952',
          900: '#001429',
        },
        success: {
          50: '#E6F7F0',
          100: '#CCEFE0',
          200: '#99DFC2',
          300: '#66CFA3',
          400: '#33BF85',
          500: '#00A86B',
          600: '#008656',
          700: '#006540',
          800: '#00432B',
          900: '#002215',
        },
        pending: {
          50: '#FFF4EB',
          100: '#FFE9D6',
          200: '#FFD3AD',
          300: '#FFBD85',
          400: '#FFA75C',
          500: '#FF8C42',
          600: '#CC7035',
          700: '#995428',
          800: '#66381A',
          900: '#331C0D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
