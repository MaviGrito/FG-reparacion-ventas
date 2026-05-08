import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, orderBy, limit, serverTimestamp, DocumentData, QueryDocumentSnapshot
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Product, Settings } from '../types'

// Default settings fallback
export const DEFAULT_SETTINGS: Settings = {
  whatsappNumber: '15618538703',
  hero: {
    title: { es: 'Servicio técnico confiable y electrodomésticos reacondicionados al mejor precio', en: 'Reliable appliance repair and reconditioned appliances at the best price', fr: 'Service technique fiable et électroménagers reconditionnés au meilleur prix' },
    subtitle: { es: 'Reparación, venta y servicios eléctricos domiciliarios.', en: 'Repair, sales, and home electrical services.', fr: 'Réparation, vente et services électriques à domicile.' },
  },
  counters: [
    { label: 'hero.counter_years', value: 15, suffix: '+' },
    { label: 'hero.counter_clients', value: 500, suffix: '+' },
    { label: 'hero.counter_repairs', value: 1000, suffix: '+' },
    { label: 'hero.counter_guarantee', value: 100, suffix: '%' },
  ],
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.4!2d-80.0722!3d26.6891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d8d9b0e1234567%3A0xabcdef1234567890!2s941%20S%20Military%20Trl%20Suite%20F8%2C%20West%20Palm%20Beach%2C%20FL%2033415!5e0!3m2!1sen!2sus!4v1',
  businessHours: {
    es: 'Lunes a Viernes: 8:00 AM - 6:00 PM | Sábados: 9:00 AM - 3:00 PM',
    en: 'Monday to Friday: 8:00 AM - 6:00 PM | Saturdays: 9:00 AM - 3:00 PM',
    fr: 'Lundi au Vendredi : 8h00 - 18h00 | Samedis : 9h00 - 15h00',
  },
  address: '941 S Military Trl Suite F8, West Palm Beach, FL 33415',
  socialLinks: {},
}

function toProduct(doc: QueryDocumentSnapshot<DocumentData>): Product {
  const data = doc.data()
  return { id: doc.id, ...data } as Product
}

export async function getProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(toProduct)
  } catch (error) {
    console.error('getProducts error:', error)
    throw error
  }
}

export async function getRecentProducts(count = 6): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(count))
    const snap = await getDocs(q)
    return snap.docs.map(toProduct)
  } catch (error) {
    console.error('getRecentProducts error:', error)
    throw error
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const snap = await getDoc(doc(db, 'products', id))
    if (!snap.exists()) return null
    return { id: snap.id, ...snap.data() } as Product
  } catch (error) {
    console.error('getProductById error:', error)
    throw error
  }
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt'>): Promise<string> {
  try {
    const ref = await addDoc(collection(db, 'products'), {
      ...data,
      createdAt: serverTimestamp(),
    })
    return ref.id
  } catch (error) {
    console.error('createProduct error:', error)
    throw error
  }
}

export async function updateProduct(id: string, data: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<void> {
  try {
    await updateDoc(doc(db, 'products', id), data)
  } catch (error) {
    console.error('updateProduct error:', error)
    throw error
  }
}

export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', id))
  } catch (error) {
    console.error('deleteProduct error:', error)
    throw error
  }
}

export async function getSettings(): Promise<Settings> {
  try {
    const snap = await getDoc(doc(db, 'settings', 'site'))
    if (!snap.exists()) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...snap.data() } as Settings
  } catch (error) {
    console.error('getSettings error:', error)
    return DEFAULT_SETTINGS
  }
}

export async function updateSettings(data: Partial<Settings>): Promise<void> {
  try {
    const ref = doc(db, 'settings', 'site')
    const snap = await getDoc(ref)
    if (snap.exists()) {
      await updateDoc(ref, data as DocumentData)
    } else {
      await addDoc(collection(db, 'settings'), { ...DEFAULT_SETTINGS, ...data })
    }
  } catch (error) {
    console.error('updateSettings error:', error)
    throw error
  }
}
