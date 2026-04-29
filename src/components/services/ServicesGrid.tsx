import { motion } from 'framer-motion'
import ServiceCard, { ServiceData } from './ServiceCard'

const SERVICES: ServiceData[] = [
  {
    id: 'fridge',
    titleKey: 'services.fridge.title',
    shortKey: 'services.fridge.short',
    longKey: 'services.fridge.long',
    whatsappKey: 'services.fridge.whatsapp',
    imageUrl: '/images/services/nevera.png',
    icon: '🧊',
  },
  {
    id: 'washer',
    titleKey: 'services.washer.title',
    shortKey: 'services.washer.short',
    longKey: 'services.washer.long',
    whatsappKey: 'services.washer.whatsapp',
    imageUrl: '/images/services/lavadora.png',
    icon: '🫧',
  },
  {
    id: 'stove',
    titleKey: 'services.stove.title',
    shortKey: 'services.stove.short',
    longKey: 'services.stove.long',
    whatsappKey: 'services.stove.whatsapp',
    imageUrl: '/images/services/estufa.png',
    icon: '🔥',
  },
  {
    id: 'ac',
    titleKey: 'services.ac.title',
    shortKey: 'services.ac.short',
    longKey: 'services.ac.long',
    whatsappKey: 'services.ac.whatsapp',
    imageUrl: '/images/services/aire.png',
    icon: '❄️',
  },
  {
    id: 'electrical',
    titleKey: 'services.electrical.title',
    shortKey: 'services.electrical.short',
    longKey: 'services.electrical.long',
    whatsappKey: 'services.electrical.whatsapp',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
    icon: '⚡',
  },
  {
    id: 'maintenance',
    titleKey: 'services.maintenance.title',
    shortKey: 'services.maintenance.short',
    longKey: 'services.maintenance.long',
    whatsappKey: 'services.maintenance.whatsapp',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    icon: '🔧',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface ServicesGridProps {
  expanded?: boolean
}

export default function ServicesGrid({ expanded = false }: ServicesGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {SERVICES.map((service) => (
        <ServiceCard key={service.id} service={service} expanded={expanded} />
      ))}
    </motion.div>
  )
}
