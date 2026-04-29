import { useTranslation } from 'react-i18next'
import { ProductCategory } from '../../types'

type FilterValue = ProductCategory | 'all'

const FIXED_CATEGORIES: { value: ProductCategory; labelKey: string }[] = [
  { value: 'neveras', labelKey: 'products.filter_fridges' },
  { value: 'lavadoras', labelKey: 'products.filter_washers' },
  { value: 'secadoras', labelKey: 'products.filter_dryers' },
  { value: 'estufas', labelKey: 'products.filter_stoves' },
  { value: 'aires', labelKey: 'products.filter_ac' },
  { value: 'electrico', labelKey: 'products.filter_electrical' },
]

const FIXED_KEYS = FIXED_CATEGORIES.map(c => c.value)

interface CategoryFilterProps {
  active: FilterValue
  onChange: (cat: FilterValue) => void
  customCategories?: string[]
}

export default function CategoryFilter({ active, onChange, customCategories = [] }: CategoryFilterProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-2">
      {/* Todos */}
      <button
        onClick={() => onChange('all')}
        className={`font-poppins font-semibold text-sm px-4 py-2 rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
          active === 'all' ? 'bg-coral border-coral text-white' : 'bg-white border-border text-textMain hover:border-coral hover:text-coral'
        }`}
      >
        {t('products.filter_all')}
      </button>

      {/* Categorías fijas */}
      {FIXED_CATEGORIES.map(({ value, labelKey }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`font-poppins font-semibold text-sm px-4 py-2 rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
            active === value ? 'bg-coral border-coral text-white' : 'bg-white border-border text-textMain hover:border-coral hover:text-coral'
          }`}
        >
          {t(labelKey)}
        </button>
      ))}

      {/* Categorías personalizadas dinámicas */}
      {customCategories.filter(c => !FIXED_KEYS.includes(c) && c !== 'otro').map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`font-poppins font-semibold text-sm px-4 py-2 rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
            active === cat ? 'bg-coral border-coral text-white' : 'bg-white border-border text-textMain hover:border-coral hover:text-coral'
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}

      {/* Otros */}
      <button
        onClick={() => onChange('otro')}
        className={`font-poppins font-semibold text-sm px-4 py-2 rounded-full border-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
          active === 'otro' ? 'bg-coral border-coral text-white' : 'bg-white border-border text-textMain hover:border-coral hover:text-coral'
        }`}
      >
        {t('products.filter_other')}
      </button>
    </div>
  )
}
