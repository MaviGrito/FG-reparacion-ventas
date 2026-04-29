import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Product, ProductCategory } from '../../types'
import { createProduct, updateProduct } from '../../services/firestoreService'
import { uploadProductImages } from '../../services/storageService'

interface ProductFormProps {
  product?: Product
  onSuccess: () => void
  onCancel: () => void
}

const FIXED_CATEGORIES_DEFAULT: ProductCategory[] = ['neveras', 'lavadoras', 'secadoras', 'estufas', 'aires', 'electrico', 'otro']

type FormData = {
  name_es: string
  name_en: string
  name_fr: string
  desc_es: string
  desc_en: string
  desc_fr: string
  price: string
  category: ProductCategory
  customCategory: string
  status: 'available' | 'out_of_stock'
}

async function translateText(text: string, targetLang: string): Promise<string> {
  if (!text.trim()) return ''
  try {
    const res = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
    )
    const data = await res.json()
    return data[0].map((item: [string]) => item[0]).join('')
  } catch {
    return text
  }
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const { t } = useTranslation()
  const fileRef = useRef<HTMLInputElement>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    product?.imageUrls?.length ? product.imageUrls : product?.imageUrl ? [product.imageUrl] : []
  )
  const [saving, setSaving] = useState(false)
  const [translating, setTranslating] = useState(false)
  const [error, setError] = useState('')

  const FIXED_CATEGORIES: ProductCategory[] = FIXED_CATEGORIES_DEFAULT
  const isCustomCategory = product?.category && !FIXED_CATEGORIES.includes(product.category)

  const [form, setForm] = useState<FormData>({
    name_es: product?.name.es || '',
    name_en: product?.name.en || '',
    name_fr: product?.name.fr || '',
    desc_es: product?.description.es || '',
    desc_en: product?.description.en || '',
    desc_fr: product?.description.fr || '',
    price: product?.price?.toString() || '',
    category: isCustomCategory ? 'otro' : (product?.category || 'neveras'),
    customCategory: isCustomCategory ? (product?.category || '') : '',
    status: product?.status || 'available',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleAutoTranslate = async () => {
    if (!form.name_es && !form.desc_es) return
    setTranslating(true)
    try {
      const [name_en, name_fr, desc_en, desc_fr] = await Promise.all([
        translateText(form.name_es, 'en'),
        translateText(form.name_es, 'fr'),
        translateText(form.desc_es, 'en'),
        translateText(form.desc_es, 'fr'),
      ])
      setForm(prev => ({ ...prev, name_en, name_fr, desc_en, desc_fr }))
    } finally {
      setTranslating(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setImageFiles(prev => [...prev, ...files])
    setImagePreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))])
  }

  const removeImage = (index: number) => {
    // Only allow removing newly added files (not existing URLs)
    const existingCount = imagePreviews.length - imageFiles.length
    if (index >= existingCount) {
      const fileIndex = index - existingCount
      setImageFiles(prev => prev.filter((_, i) => i !== fileIndex))
    }
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const existingUrls = product?.imageUrls?.length
        ? product.imageUrls
        : product?.imageUrl ? [product.imageUrl] : []

      // Keep existing URLs that weren't removed
      const existingCount = imagePreviews.length - imageFiles.length
      const keptExisting = existingUrls.slice(0, existingCount)

      const productData = {
        name: { es: form.name_es, en: form.name_en || form.name_es, fr: form.name_fr || form.name_es },
        description: { es: form.desc_es, en: form.desc_en || form.desc_es, fr: form.desc_fr || form.desc_es },
        price: parseFloat(form.price) || 0,
        category: form.category === 'otro' && form.customCategory.trim()
          ? form.customCategory.trim().toLowerCase()
          : form.category,
        status: form.status,
        imageUrl: keptExisting[0] || '',
        imageUrls: keptExisting,
      }

      if (product) {
        let newUrls: string[] = []
        if (imageFiles.length) {
          newUrls = await uploadProductImages(imageFiles, product.id)
        }
        const allUrls = [...keptExisting, ...newUrls]
        await updateProduct(product.id, { ...productData, imageUrl: allUrls[0] || '', imageUrls: allUrls })
      } else {
        const newId = await createProduct(productData)
        if (imageFiles.length) {
          const newUrls = await uploadProductImages(imageFiles, newId)
          await updateProduct(newId, { imageUrl: newUrls[0] || '', imageUrls: newUrls })
        }
      }
      onSuccess()
    } catch (err) {
      console.error(err)
      setError(t('errors.generic'))
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 rounded-xl border-2 border-border font-inter text-sm focus:outline-none focus:border-coral transition-colors'
  const labelClass = 'block font-inter text-sm font-medium text-textMain mb-1'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Español + botón traducir */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.name_es')} <span className="text-coral">*</span></label>
          <input name="name_es" value={form.name_es} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('admin.desc_es')}</label>
          <textarea name="desc_es" value={form.desc_es} onChange={handleChange} rows={3} className={inputClass} />
        </div>
      </div>

      {/* Botón auto-traducir */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleAutoTranslate}
          disabled={translating || (!form.name_es && !form.desc_es)}
          className="font-poppins font-semibold text-sm px-5 py-2 rounded-xl bg-navy text-white hover:bg-navy/90 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {translating ? '⏳ Traduciendo...' : '🌐 Auto-traducir a EN y FR'}
        </button>
        <span className="font-inter text-xs text-textMain/50">O editá manualmente abajo</span>
      </div>

      {/* EN y FR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.name_en')}</label>
          <input name="name_en" value={form.name_en} onChange={handleChange} className={inputClass} placeholder="Se completa al traducir" />
        </div>
        <div>
          <label className={labelClass}>{t('admin.desc_en')}</label>
          <textarea name="desc_en" value={form.desc_en} onChange={handleChange} rows={3} className={inputClass} placeholder="Se completa al traducir" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('admin.name_fr')}</label>
          <input name="name_fr" value={form.name_fr} onChange={handleChange} className={inputClass} placeholder="Se completa al traducir" />
        </div>
        <div>
          <label className={labelClass}>{t('admin.desc_fr')}</label>
          <textarea name="desc_fr" value={form.desc_fr} onChange={handleChange} rows={3} className={inputClass} placeholder="Se completa al traducir" />
        </div>
      </div>

      {/* Precio, categoría, estado */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>{t('admin.price')}</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} min="0" step="0.01" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('admin.category')}</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {FIXED_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {form.category === 'otro' && (
            <input
              name="customCategory"
              value={form.customCategory}
              onChange={handleChange}
              placeholder="Escribí el nombre de la categoría"
              className={`${inputClass} mt-2`}
            />
          )}
        </div>
        <div>
          <label className={labelClass}>{t('admin.status')}</label>
          <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
            <option value="available">{t('products.available')}</option>
            <option value="out_of_stock">{t('products.out_of_stock')}</option>
          </select>
        </div>
      </div>

      {/* Múltiples imágenes */}
      <div>
        <label className={labelClass}>{t('admin.image')} <span className="font-inter text-xs text-textMain/50">(podés subir varias)</span></label>
        <div className="flex flex-wrap gap-3 mb-3">
          {imagePreviews.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt={`preview-${i}`} className="w-20 h-20 object-cover rounded-xl border border-border" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 text-center text-white text-[10px] bg-black/50 rounded-b-xl py-0.5">Principal</span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-20 h-20 rounded-xl border-2 border-dashed border-border hover:border-coral transition-colors flex items-center justify-center text-2xl text-textMain/40 hover:text-coral"
          >
            +
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
      </div>

      {error && <p className="font-inter text-sm text-red-500">{error}</p>}

      <div className="flex gap-3 justify-end pt-2">
        <button type="button" onClick={onCancel} className="font-poppins font-semibold px-6 py-3 rounded-xl border-2 border-border hover:border-navy transition-colors">
          {t('admin.cancel')}
        </button>
        <button type="submit" disabled={saving} className="font-poppins font-semibold px-6 py-3 rounded-xl bg-navy text-white hover:bg-navy/90 transition-colors disabled:opacity-60">
          {saving ? t('admin.saving') : t('admin.save')}
        </button>
      </div>
    </form>
  )
}
