import { useTranslation } from 'react-i18next'
import { useSettings } from '../../hooks/useSettings'
import MapEmbed from './MapEmbed'
import type { Locale } from '../../types'

const FIXED_ADDRESS = '941 S Military Trl Suite F8, West Palm Beach, FL 33415'
const FIXED_MAP_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.4523!2d-80.07441!3d26.68912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88df2a3b6b6b6b6b%3A0x1234567890abcdef!2s941%20S%20Military%20Trl%2C%20West%20Palm%20Beach%2C%20FL%2033415!5e0!3m2!1sen!2sus!4v1'

export default function LocationSection() {
  const { t, i18n } = useTranslation()
  const { settings } = useSettings()
  const locale = (i18n.language?.slice(0, 2) as Locale) || 'es'

  const hours =
    typeof settings.businessHours === 'object'
      ? settings.businessHours[locale] || settings.businessHours.es
      : settings.businessHours

  const address = FIXED_ADDRESS
  const mapUrl = FIXED_MAP_URL
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  const waLink = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`

  return (
    <section className="bg-light py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-dark">{t('location.title')}</h2>
          <p className="font-inter text-textMain/70 mt-2">{t('location.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <MapEmbed src={mapUrl} />

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="font-poppins font-semibold text-sm text-primary uppercase tracking-wide mb-1">
                {t('location.address_label')}
              </p>
              <p className="font-inter text-textMain">{address}</p>
            </div>

            <div>
              <p className="font-poppins font-semibold text-sm text-primary uppercase tracking-wide mb-1">
                {t('location.hours_label')}
              </p>
              <p className="font-inter text-textMain">{hours}</p>
            </div>

            <div>
              <p className="font-poppins font-semibold text-sm text-primary uppercase tracking-wide mb-1">
                {t('location.phone_label')}
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-primaryDark hover:text-primary transition-colors"
              >
                +1 (561) 853-8703
              </a>
              <a
                href={`https://wa.me/15618534450`}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-inter text-primaryDark hover:text-primary transition-colors mt-1"
              >
                +1 (561) 853-4450
              </a>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-poppins font-bold px-6 py-3 rounded-xl bg-accent text-dark hover:bg-accentDark transition-colors"
            >
              📍 {t('location.directions_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
