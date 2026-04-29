import { useState, useEffect } from 'react'
import { Settings } from '../types'
import { getSettings, DEFAULT_SETTINGS } from '../services/firestoreService'

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getSettings()
      .then(setSettings)
      .catch(() => setError('errors.generic'))
      .finally(() => setLoading(false))
  }, [])

  return { settings, loading, error }
}
