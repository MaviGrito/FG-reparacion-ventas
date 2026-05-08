import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/layout/PageTransition'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ServicesGrid from '../components/services/ServicesGrid'

export default function Servicios() {
  const { t } = useTranslation()

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-dark to-primaryDark py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-poppins font-bold text-4xl sm:text-5xl text-white mb-4"
            >
              {t('services.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-inter text-white/70 text-lg max-w-xl mx-auto"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-primary py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ServicesGrid expanded={true} />
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}
