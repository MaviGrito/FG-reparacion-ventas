import { useTranslation } from 'react-i18next'
import { useSettings } from '../../hooks/useSettings'
import MapEmbed from './MapEmbed'
import type { Locale } from '../../types'

export default function LocationSection() {
  const { t, i18n } = useTranslation()
  const { settings } = useSettings()
  const locale = (i18n.language?.slice(0, 2) as Locale) || 'es'

  const hours =
    typeof settings.businessHours === 'object'
      ? settings.businessHours[locale] || settings.businessHours.es
      : settings.businessHours

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
  const waLink = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-dark">{t('location.title')}</h2>
          <p className="font-inter text-textMain/70 mt-2">{t('location.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <MapEmbed src={settings.mapEmbedUrl} />

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="font-poppins font-semibold text-sm text-coral uppercase tracking-wide mb-1">
                {t('location.address_label')}
              </p>
              <p className="font-inter text-textMain">{settings.address}</p>
            </div>

            <div>
              <p className="font-poppins font-semibold text-sm text-coral uppercase tracking-wide mb-1">
                {t('location.hours_label')}
              </p>
              <p className="font-inter text-textMain">{hours}</p>
            </div>

            <div>
              <p className="font-poppins font-semibold text-sm text-coral uppercase tracking-wide mb-1">
                {t('location.phone_label')}
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-navy hover:text-coral transition-colors"
              >
                +{settings.whatsappNumber}
              </a>
              {settings.whatsappNumber2 && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber2.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-inter text-navy hover:text-coral transition-colors mt-1"
                >
                  +{settings.whatsappNumber2}
                </a>
              )}
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-poppins font-semibold px-6 py-3 rounded-xl bg-navy text-white hover:bg-navy/90 transition-colors"
            >
              {t('location.directions_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
