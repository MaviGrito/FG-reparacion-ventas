import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ServicesGrid from '../services/ServicesGrid'

export default function ServicesPreview() {
  const { t } = useTranslation()

  return (
    <section className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-white mb-3">
            {t('services.title')}
          </h2>
          <p className="font-inter text-white/70 max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <ServicesGrid expanded={false} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 font-poppins font-bold text-base px-8 py-4 rounded-lg bg-accent text-dark hover:bg-accentDark transition-colors"
          >
            Ver todos los servicios →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
