interface MapEmbedProps {
  src: string
  title?: string
}

export default function MapEmbed({ src, title = 'Ubicación F&G' }: MapEmbedProps) {
  return (
    <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
