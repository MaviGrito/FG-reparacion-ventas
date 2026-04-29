import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useRecentProducts } from '../../hooks/useRecentProducts'
import ProductCard from '../products/ProductCard'
import Spinner from '../common/Spinner'

export default function ProductsPreview() {
  const { t, i18n } = useTranslation()
  const locale = (i18n.language as 'es' | 'en' | 'fr') || 'es'
  const { products, loading } = useRecentProducts(6)

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-textMain mb-3">
            {t('products.title')}
          </h2>
          <p className="font-inter text-textMain/60 max-w-xl mx-auto">{t('products.subtitle')}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">📦</div>
            <p className="font-inter text-textMain/60">{t('products.empty_title')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} locale={locale} index={i} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 font-poppins font-semibold text-base px-8 py-4 rounded-lg bg-navy text-white hover:bg-navy/90 transition-colors"
          >
            {t('products.view_all')} →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
