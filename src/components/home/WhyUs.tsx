import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function WhyUs() {
  const { t } = useTranslation()
  const points = t('whyUs.points', { returnObjects: true }) as string[]

  return (
    <section className="bg-gradient-to-br from-dark to-primaryDark py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3"
            >
              {t('whyUs.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-inter text-white/70 mb-10"
            >
              {t('whyUs.subtitle')}
            </motion.p>

            <ul className="space-y-4">
              {points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-xl mt-0.5 flex-shrink-0">✅</span>
                  <span className="font-inter text-white/90 text-base">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: image (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <img
              src="/images/logo.png"
              alt="F&G Logo"
              loading="lazy"
              className="w-full max-h-[500px] object-contain rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
