import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../../hooks/useSettings'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '15618538703'

const COUNTERS = [
  { value: 15, suffix: '+', labelKey: 'hero.counter_years' },
  { value: 500, suffix: '+', labelKey: 'hero.counter_clients' },
  { value: 1000, suffix: '+', labelKey: 'hero.counter_repairs' },
  { value: 100, suffix: '%', labelKey: 'hero.counter_guarantee' },
]

function AnimatedCounter({ value, suffix, labelKey }: { value: number; suffix: string; labelKey: string }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, Math.round)

  useEffect(() => {
    if (inView) {
      animate(motionValue, value, { duration: 2, ease: 'easeOut' })
    }
  }, [inView, motionValue, value])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex items-end gap-0.5">
        <motion.span className="font-poppins font-bold text-3xl sm:text-4xl text-white">
          {rounded}
        </motion.span>
        <span className="font-poppins font-bold text-2xl sm:text-3xl text-accent mb-0.5">{suffix}</span>
      </div>
      <span className="font-inter text-xs sm:text-sm text-textLight/80 text-center mt-1">{t(labelKey)}</span>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const { settings } = useSettings()

  const locale = (typeof window !== 'undefined' ? localStorage.getItem('fg_locale') : null) || 'es'
  const heroSubtitle = settings.hero?.subtitle?.[locale as 'es' | 'en' | 'fr'] || t('hero.subtitle')

  const handleScrollToServices = () => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-white bg-contain bg-[center_30%] bg-no-repeat"
        style={{ backgroundImage: "url('/images/fondo.png')" }}
      />
      {/* Sin overlay — fondo blanco en los bordes */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col flex-1 justify-end pb-32">
        <div className="max-w-3xl">
          {/* Caja azul con blur que encierra el contenido */}
          <div className="bg-[#0D6EA0]/80 backdrop-blur-md rounded-2xl px-8 py-10 shadow-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
            >
              <span className="text-white">Servicio técnico confiable y </span>
              <span className="text-accent">electrodomésticos reacondicionados al </span>
              <span className="text-white">mejor precio</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-inter text-lg sm:text-xl text-white/90 mb-10 max-w-2xl"
            >
              {heroSubtitle}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={handleScrollToServices}
                className="font-poppins font-bold text-base px-8 py-4 rounded-lg bg-accent text-dark hover:bg-accentDark transition-colors"
              >
                {t('hero.cta_services')}
              </motion.button>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-poppins font-bold text-base px-8 py-4 rounded-lg bg-white/20 border-2 border-white text-white hover:bg-white hover:text-dark transition-colors text-center backdrop-blur-sm"
              >
                {t('hero.cta_whatsapp')}
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Counters bar */}
      <div className="relative z-10 w-full bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {COUNTERS.map((counter) => (
              <AnimatedCounter key={counter.labelKey} {...counter} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
