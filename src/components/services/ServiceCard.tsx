import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '15618538703'

export interface ServiceData {
  id: string
  titleKey: string
  shortKey: string
  longKey: string
  whatsappKey: string
  imageUrl: string
  icon: ReactNode
}

interface ServiceCardProps {
  service: ServiceData
  expanded?: boolean
}

export default function ServiceCard({ service, expanded = false }: ServiceCardProps) {
  const { t } = useTranslation()

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t(service.whatsappKey))}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(232,82,58,0.25)' }}
      transition={{ duration: 0.4 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-md flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.imageUrl}
          alt={t(service.titleKey)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Icon badge */}
        <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xl shadow-md">
          {service.icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-poppins font-bold text-lg text-textMain mb-3">
          {t(service.titleKey)}
        </h3>
        <p className="font-inter text-sm text-textMain/70 leading-relaxed flex-1 mb-5">
          {t(expanded ? service.longKey : service.shortKey)}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 font-poppins font-semibold text-sm px-5 py-3 rounded-lg bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors"
        >
          <span>💬</span>
          {t('services.consult_btn')}
        </a>
      </div>
    </motion.div>
  )
}
