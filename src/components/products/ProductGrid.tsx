import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useProducts } from '../../hooks/useProducts'
import { ProductCategory, Locale } from '../../types'
import ProductCard from './ProductCard'
import CategoryFilter from './CategoryFilter'
import SearchInput from './SearchInput'
import Spinner from '../common/Spinner'

type FilterValue = ProductCategory | 'all'
const PAGE_SIZE = 12

interface ProductGridProps {
  locale: Locale
}

export default function ProductGrid({ locale }: ProductGridProps) {
  const { t } = useTranslation()
  const { products, loading, error, retry } = useProducts()
  const [category, setCategory] = useState<FilterValue>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const FIXED_KEYS = ['neveras', 'lavadoras', 'secadoras', 'estufas', 'aires', 'electrico', 'otro']

  // Detecta categorías personalizadas que existan en los productos
  const customCategories = useMemo(() => {
    const all = products.map(p => p.category)
    const unique = [...new Set(all)]
    return unique.filter(c => !FIXED_KEYS.includes(c))
  }, [products])

  const filtered = useMemo(() => {
    let result = products
    if (category !== 'all') result = result.filter(p => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => {
        const name = (p.name[locale] || p.name.es).toLowerCase()
        const desc = (p.description[locale] || p.description.es).toLowerCase()
        return name.includes(q) || desc.includes(q)
      })
    }
    return result
  }, [products, category, search, locale])

  const paginated = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = paginated.length < filtered.length

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  if (error) return (
    <div className="text-center py-20">
      <p className="font-poppins font-bold text-xl text-textMain mb-2">{t('products.error_title')}</p>
      <p className="font-inter text-textMain/60 mb-6">{t('products.error_subtitle')}</p>
      <button onClick={retry} className="bg-coral text-white font-poppins font-semibold px-6 py-3 rounded-lg hover:bg-coral/90 transition-colors">
        {t('products.retry')}
      </button>
    </div>
  )

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1"><SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} /></div>
        <CategoryFilter active={category} onChange={(c) => { setCategory(c); setPage(1) }} customCategories={customCategories} />
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <p className="font-poppins font-bold text-xl text-textMain mb-2">{t('products.empty_title')}</p>
          <p className="font-inter text-textMain/60">{t('products.empty_subtitle')}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {paginated.map((product, i) => (
              <ProductCard key={product.id} product={product} locale={locale} index={i} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage(p => p + 1)}
                className="font-poppins font-semibold px-8 py-3 rounded-lg border-2 border-navy text-navy hover:bg-navy hover:text-white transition-all"
              >
                {t('products.load_more')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
