import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import i18n from '../../lib/i18n'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '15618538703'

const NAV_LINKS = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.services', to: '/servicios' },
  { key: 'nav.products', to: '/productos' },
  { key: 'nav.brands', to: '/#marcas' },
  { key: 'nav.contact', to: '/contacto' },
]

const LOCALES = [
  { code: 'es', flag: '🇨🇴', label: 'ES' },
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'fr', flag: '🇫🇷', label: 'FR' },
]

function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return scrolled
}

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const scrolled = useScrollPosition()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg' : 'bg-dark'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="FG Appliance Service logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className="font-inter text-sm text-neutral hover:text-accent transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language selector */}
            <div className="flex items-center gap-1">
              {LOCALES.map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => i18n.changeLanguage(code)}
                  className={`text-xs font-poppins font-semibold px-2 py-1 rounded transition-colors ${
                    i18n.language === code ? 'text-accent' : 'text-neutral hover:text-white'
                  }`}
                  aria-label={`Cambiar idioma a ${label}`}
                >
                  {flag} {label}
                </button>
              ))}
            </div>

            {/* CTA button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-dark font-poppins font-bold text-sm px-4 py-2 rounded-lg hover:bg-accentDark transition-colors"
            >
              {t('nav.consult')}
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <span className="block w-6 h-0.5 bg-current mb-1.5 transition-all" />
            <span className="block w-6 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark overflow-hidden border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(({ key, to }) => (
                <Link
                  key={key}
                  to={to}
                  className="font-inter text-neutral hover:text-accent transition-colors py-1"
                >
                  {t(key)}
                </Link>
              ))}

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                {LOCALES.map(({ code, flag, label }) => (
                  <button
                    key={code}
                    onClick={() => i18n.changeLanguage(code)}
                    className={`text-xs font-poppins font-semibold px-2 py-1 rounded transition-colors ${
                      i18n.language === code ? 'text-accent' : 'text-neutral hover:text-white'
                    }`}
                  >
                    {flag} {label}
                  </button>
                ))}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-dark font-poppins font-bold text-sm px-4 py-2 rounded-lg hover:bg-accentDark transition-colors text-center"
              >
                {t('nav.consult')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
