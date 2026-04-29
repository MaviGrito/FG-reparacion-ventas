import { useTranslation } from 'react-i18next'

interface Brand {
  id: string
  content: React.ReactNode
}

const BRANDS: Brand[] = [
  {
    id: 'samsung',
    content: (
      <span className="font-poppins font-bold text-2xl text-gray-800 tracking-widest">
        SAMSUNG
      </span>
    ),
  },
  {
    id: 'lg',
    content: (
      <span className="font-poppins font-black text-3xl text-[#A50034]">
        LG
      </span>
    ),
  },
  {
    id: 'ge',
    content: (
      <span className="font-poppins font-black text-3xl text-gray-800">
        GE
      </span>
    ),
  },
  {
    id: 'bosch',
    content: (
      <span className="font-poppins font-bold text-2xl text-gray-800 tracking-wider">
        BOSCH
      </span>
    ),
  },
  {
    id: 'whirlpool',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Whirlpool
      </span>
    ),
  },
  {
    id: 'maytag',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Maytag
      </span>
    ),
  },
  {
    id: 'frigidaire',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Frigidaire
      </span>
    ),
  },
  {
    id: 'kenmore',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Kenmore
      </span>
    ),
  },
  {
    id: 'electrolux',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Electrolux
      </span>
    ),
  },
  {
    id: 'mabe',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Mabe
      </span>
    ),
  },
  {
    id: 'haier',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Haier
      </span>
    ),
  },
  {
    id: 'panasonic',
    content: (
      <span className="font-poppins font-bold text-xl text-gray-800">
        Panasonic
      </span>
    ),
  },
]

export default function BrandsCarousel() {
  const { t } = useTranslation()

  return (
    <section className="bg-light py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="font-poppins font-bold text-3xl text-textMain mb-2">
          {t('brands.title')}
        </h2>
        <p className="font-inter text-textMain/60">{t('brands.subtitle')}</p>
      </div>

      <div className="overflow-hidden">
        <div className="animate-scroll flex">
          {/* Original list */}
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="flex-shrink-0 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
            >
              {brand.content}
            </div>
          ))}
          {/* Duplicated list for seamless loop */}
          {BRANDS.map((brand) => (
            <div
              key={`${brand.id}-dup`}
              className="flex-shrink-0 px-8 py-4 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-default"
            >
              {brand.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
