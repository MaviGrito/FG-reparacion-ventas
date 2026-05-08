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
        className="absolute inset-0 bg-white bg-contain bg-[center_10%] sm:bg-[center_30%] bg-no-repeat"
        style={{ backgroundImage: "url('/images/fondo.png')" }}
      />
      {/* Sin overlay — fondo blanco en los bordes */}

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col flex-1 justify-end pb-20 pt-24">
        {/* Elipse gigante que se sale por la izquierda — solo se ve la mitad derecha */}
        <div className="relative w-full mt-2 sm:mt-8">
          {/* Círculo desktop */}
          <div
            className="absolute bg-[#2196D3]/85 rounded-full hidden sm:block"
            style={{
              width: 'clamp(560px, 95vw, 1200px)',
              height: 'clamp(560px, 95vw, 1200px)',
              left: 'clamp(-420px, -42vw, -240px)',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          {/* Círculo mobile — más grande y subido */}
          <div
            className="absolute bg-[#2196D3]/85 rounded-full sm:hidden"
            style={{
              width: '520px',
              height: '520px',
              left: '-200px',
              top: '-60px',
            }}
          />
          {/* Texto encima del círculo */}
          <div className="relative z-10 pl-6 sm:pl-16 lg:pl-24 pr-3 sm:pr-0 sm:max-w-2xl py-6 sm:py-28">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-poppins font-bold text-xl sm:text-5xl lg:text-6xl leading-tight mb-3 sm:mb-6 uppercase"
            >
              <span className="text-white">SERVICIO TÉCNICO CONFIABLE Y </span>
              <span className="text-accent">ELECTRODOMÉSTICOS REACONDICIONADOS AL </span>
              <span className="text-white">MEJOR PRECIO</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-inter text-sm sm:text-xl text-white mb-4 sm:mb-10"
            >
              {heroSubtitle}
            </motion.p>

            <div className="flex flex-row sm:flex-row gap-2 sm:gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={handleScrollToServices}
                className="font-poppins font-bold text-xs sm:text-base px-3 sm:px-8 py-2 sm:py-4 rounded-lg bg-accent text-dark hover:bg-accentDark transition-colors whitespace-nowrap"
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
                className="font-poppins font-bold text-xs sm:text-base px-3 sm:px-8 py-2 sm:py-4 rounded-lg bg-white/20 border-2 border-white text-white hover:bg-white hover:text-dark transition-colors text-center backdrop-blur-sm whitespace-nowrap"
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
