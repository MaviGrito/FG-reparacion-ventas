import { Timestamp } from 'firebase/firestore'

export type Locale = 'es' | 'en' | 'fr'

export type ProductCategory =
  | 'neveras'
  | 'lavadoras'
  | 'secadoras'
  | 'estufas'
  | 'aires'
  | 'electrico'
  | 'otro'
  | string

export interface MultilingualField {
  es: string
  en: string
  fr: string
}

export interface Product {
  id: string
  name: MultilingualField
  description: MultilingualField
  price: number
  category: ProductCategory
  imageUrl: string
  imageUrls?: string[]
  status: 'available' | 'out_of_stock'
  createdAt: Timestamp
}

export interface Counter {
  label: string   // clave i18n
  value: number
  suffix: string  // "+", "%", ""
}

export interface Settings {
  whatsappNumber: string
  whatsappNumber2?: string
  hero: {
    title: MultilingualField
    subtitle: MultilingualField
  }
  counters: Counter[]
  mapEmbedUrl: string
  businessHours: MultilingualField
  address: string
  socialLinks: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export interface Brand {
  name: string
  logoType: 'svg' | 'text'
  svgContent?: string
}

export interface Service {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
  whatsappMessage: MultilingualField
  imageUrl: string
}
