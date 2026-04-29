import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from '../locales/es.json'
import en from '../locales/en.json'
import fr from '../locales/fr.json'

const LOCALE_KEY = 'fg_locale'

function detectLocale(): string {
  const stored = localStorage.getItem(LOCALE_KEY)
  if (stored && ['es', 'en', 'fr'].includes(stored)) return stored
  const browser = navigator.language.slice(0, 2).toLowerCase()
  if (browser === 'en' || browser === 'fr') return browser
  return 'es'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: detectLocale(),
    fallbackLng: 'es',
    interpolation: { escapeValue: false },
  })

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LOCALE_KEY, lng)
})

export { LOCALE_KEY }
export default i18n
