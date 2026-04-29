import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Product, Locale } from '../../types'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '15618538703'

// Placeholder images by category
const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  neveras: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80',
  lavadoras: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80',
  secadoras: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80',
  estufas: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  aires: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  default: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
}

interface ProductCardProps {
  product: Product
  locale: Locale
  index?: number
}

export default function ProductCard({ product, locale, index = 0 }: ProductCardProps) {
  const { t } = useTranslation()
  const name = product.name[locale] || product.name.es
  const description = product.description[locale] || product.description.es
  const images = product.imageUrls?.length
    ? product.imageUrls
    : product.imageUrl
    ? [product.imageUrl]
    : [CATEGORY_PLACEHOLDERS[product.category] || CATEGORY_PLACEHOLDERS.default]

  const [imgIndex, setImgIndex] = useState(0)
  const whatsappMsg = t('products.whatsapp_msg', { name, price: product.price })
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={images[imgIndex]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {product.status === 'out_of_stock' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="font-poppins font-bold text-white text-sm bg-red-500 px-3 py-1 rounded-full">
              {t('products.out_of_stock')}
            </span>
          </div>
        )}
        {/* Navegación de imágenes */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors text-sm"
            >‹</button>
            <button
              onClick={() => setImgIndex(i => (i + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors text-sm"
            >›</button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-poppins font-bold text-base text-textMain mb-1 line-clamp-2">{name}</h3>
        <p className="font-inter text-sm text-textMain/60 mb-3 line-clamp-2 flex-1">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-poppins font-bold text-xl text-coral">${product.price.toLocaleString()}</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-poppins font-semibold text-sm px-4 py-2 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
          >
            💬 {t('products.consult_btn')}
          </a>
        </div>
      </div>
    </motion.div>
  )
}
