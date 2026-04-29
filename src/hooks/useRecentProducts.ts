import { useState, useEffect } from 'react'
import { Product } from '../types'
import { getRecentProducts } from '../services/firestoreService'

export function useRecentProducts(count = 6) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getRecentProducts(count)
      .then(setProducts)
      .catch(() => setError('errors.generic'))
      .finally(() => setLoading(false))
  }, [count])

  return { products, loading, error }
}
