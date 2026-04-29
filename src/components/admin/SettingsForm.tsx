import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../../hooks/useSettings'
import { updateSettings } from '../../services/firestoreService'

export default function SettingsForm() {
  const { t } = useTranslation()
  const { settings, loading } = useSettings()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [form, setForm] = useState({
    whatsappNumber: '',
    whatsappNumber2: '',
    hero_title_es: '',
    hero_title_en: '',
    hero_title_fr: '',
    hero_subtitle_es: '',
    hero_subtitle_en: '',
    hero_subtitle_fr: '',
    mapEmbedUrl: '',
    businessHours_es: '',
    businessHours_en: '',
    businessHours_fr: '',
    facebook: '',
    instagram: '',
    youtube: '',
  })

  useEffect(() => {
    if (!loading) {
      setForm({
        whatsappNumber: settings.whatsappNumber || '',
        whatsappNumber2: settings.whatsappNumber2 || '',
        hero_title_es: settings.hero.title.es || '',
        hero_title_en: settings.hero.title.en || '',
        hero_title_fr: settings.hero.title.fr || '',
        hero_subtitle_es: settings.hero.subtitle.es || '',
        hero_subtitle_en: settings.hero.subtitle.en || '',
        hero_subtitle_fr: settings.hero.subtitle.fr || '',
        mapEmbedUrl: settings.mapEmbedUrl || '',
        businessHours_es: settings.businessHours.es || '',
        businessHours_en: settings.businessHours.en || '',
        businessHours_fr: settings.businessHours.fr || '',
        facebook: settings.socialLinks?.facebook || '',
        instagram: settings.socialLinks?.instagram || '',
        youtube: settings.socialLinks?.youtube || '',
      })
    }
  }, [loading, settings])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      await updateSettings({
        whatsappNumber: form.whatsappNumber,
        whatsappNumber2: form.whatsappNumber2 || undefined,
        hero: {
          title: { es: form.hero_title_es, en: form.hero_title_en, fr: form.hero_title_fr },
          subtitle: { es: form.hero_subtitle_es, en: form.hero_subtitle_en, fr: form.hero_subtitle_fr },
        },
        mapEmbedUrl: form.mapEmbedUrl,
        businessHours: { es: form.businessHours_es, en: form.businessHours_en, fr: form.businessHours_fr },
        socialLinks: {
          facebook: form.facebook || undefined,
          instagram: form.instagram || undefined,
          youtube: form.youtube || undefined,
        },
      })
      setMessage({ type: 'success', text: t('admin.saved') })
    } catch {
      setMessage({ type: 'error', text: t('errors.generic') })
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border-2 border-border font-inter text-sm focus:outline-none focus:border-coral transition-colors'
  const labelClass = 'block font-inter text-sm font-medium text-textMain mb-1'
  const sectionTitle = 'font-poppins font-semibold text-base text-navy mb-3 mt-6'

  if (loading) return <div className="py-8 text-center font-inter text-textMain/60">Cargando...</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl">
      <p className={sectionTitle}>WhatsApp</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>WhatsApp principal</label>
          <input name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>WhatsApp secundario (opcional)</label>
          <input name="whatsappNumber2" value={form.whatsappNumber2} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <p className={sectionTitle}>Hero — Título</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Título (ES)</label>
          <input name="hero_title_es" value={form.hero_title_es} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Título (EN)</label>
          <input name="hero_title_en" value={form.hero_title_en} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Título (FR)</label>
          <input name="hero_title_fr" value={form.hero_title_fr} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <p className={sectionTitle}>Hero — Subtítulo</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Subtítulo (ES)</label>
          <textarea name="hero_subtitle_es" value={form.hero_subtitle_es} onChange={handleChange} rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Subtítulo (EN)</label>
          <textarea name="hero_subtitle_en" value={form.hero_subtitle_en} onChange={handleChange} rows={3} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Subtítulo (FR)</label>
          <textarea name="hero_subtitle_fr" value={form.hero_subtitle_fr} onChange={handleChange} rows={3} className={inputClass} />
        </div>
      </div>

      <p className={sectionTitle}>Mapa</p>
      <div>
        <label className={labelClass}>URL embed de Google Maps</label>
        <input name="mapEmbedUrl" value={form.mapEmbedUrl} onChange={handleChange} className={inputClass} />
      </div>

      <p className={sectionTitle}>Horario de Atención</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Horario (ES)</label>
          <input name="businessHours_es" value={form.businessHours_es} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Horario (EN)</label>
          <input name="businessHours_en" value={form.businessHours_en} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Horario (FR)</label>
          <input name="businessHours_fr" value={form.businessHours_fr} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <p className={sectionTitle}>Redes Sociales</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Facebook</label>
          <input name="facebook" value={form.facebook} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Instagram</label>
          <input name="instagram" value={form.instagram} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>YouTube</label>
          <input name="youtube" value={form.youtube} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      {message && (
        <p className={`font-inter text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
          {message.text}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="font-poppins font-semibold px-8 py-3 rounded-xl bg-navy text-white hover:bg-navy/90 transition-colors disabled:opacity-60"
        >
          {saving ? t('admin.saving') : t('admin.save')}
        </button>
      </div>
    </form>
  )
}
