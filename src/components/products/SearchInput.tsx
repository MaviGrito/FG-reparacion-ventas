import { useTranslation } from 'react-i18next'

interface SearchInputProps {
  value: string
  onChange: (v: string) => void
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const { t } = useTranslation()
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textMain/40">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('products.search_placeholder')}
        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border font-inter text-sm text-textMain placeholder:text-textMain/40 focus:outline-none focus:border-coral transition-colors"
      />
    </div>
  )
}
