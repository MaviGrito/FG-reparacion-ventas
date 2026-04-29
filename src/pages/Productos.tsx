import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductGrid from '../components/products/ProductGrid'

export default function Productos() {
  const { t, i18n } = useTranslation()
  const locale = (i18n.language as 'es' | 'en' | 'fr') || 'es'

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-16">
        <section className="bg-gradient-to-br from-dark to-navy py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-poppins font-bold text-4xl sm:text-5xl text-white mb-4"
            >
              {t('products.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-inter text-textLight/70 text-lg max-w-xl mx-auto"
            >
              {t('products.subtitle')}
            </motion.p>
          </div>
        </section>
        <section className="bg-light py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ProductGrid locale={locale} />
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}
