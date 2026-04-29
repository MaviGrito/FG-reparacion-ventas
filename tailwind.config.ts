import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B2A6B',
        coral: '#E8523A',
        dark: '#0F172A',
        light: '#F8FAFC',
        textMain: '#1E293B',
        textLight: '#F1F5F9',
        border: '#E2E8F0',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
