import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nueva paleta FG Appliance Service
        primary: '#2196D3',       // Azul cielo — fondo dominante
        primaryDark: '#0D6EA0',   // Azul oscuro — hover, texto sobre azul
        accent: '#F5C518',        // Amarillo vibrante — botones de acción
        accentDark: '#D4A800',    // Amarillo dorado — texto sobre amarillo
        dark: '#1A1A1A',          // Negro — navbar, footer, texto
        light: '#F5F7FA',         // Blanco roto — fondos de sección
        neutral: '#B0BEC5',       // Gris neutro frío — fondos secundarios
        textMain: '#1A1A1A',      // Texto principal
        textLight: '#FFFFFF',     // Texto sobre fondos oscuros
        border: '#B0BEC5',        // Bordes de tarjetas
        // Mantener para WhatsApp
        whatsapp: '#25D366',
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
