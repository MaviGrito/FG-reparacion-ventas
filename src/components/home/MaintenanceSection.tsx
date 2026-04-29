import { motion } from 'framer-motion'

const REASONS = [
  {
    icon: '⏱️',
    title: 'Prolonga la vida útil',
    desc: 'Un equipo con mantenimiento regular puede durar el doble que uno descuidado, ahorrándote el costo de un reemplazo prematuro.',
  },
  {
    icon: '💰',
    title: 'Evita reparaciones costosas',
    desc: 'Detectar un problema pequeño a tiempo cuesta mucho menos que reparar una falla grave o reemplazar piezas dañadas por descuido.',
  },
  {
    icon: '⚡',
    title: 'Reduce el consumo eléctrico',
    desc: 'Los equipos sucios o con piezas desgastadas consumen más energía. El mantenimiento los mantiene eficientes y tu factura más baja.',
  },
  {
    icon: '🛡️',
    title: 'Mayor seguridad en el hogar',
    desc: 'Conexiones eléctricas en mal estado o filtros obstruidos pueden causar accidentes. El mantenimiento preventivo los evita.',
  },
]

export default function MaintenanceSection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-textMain mb-3">
            ¿Por qué hacer mantenimiento antes de que fallen?
          </h2>
          <p className="font-inter text-textMain/60 max-w-2xl mx-auto">
            No esperes a que tu equipo deje de funcionar. El mantenimiento preventivo es la decisión más inteligente y económica para cuidar tus electrodomésticos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-light rounded-2xl p-6 flex flex-col items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-poppins font-bold text-base text-textMain">{item.title}</h3>
              <p className="font-inter text-sm text-textMain/65 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '15618538703'}?text=${encodeURIComponent('Hola, me interesa agendar un mantenimiento preventivo.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-poppins font-semibold text-base px-8 py-4 rounded-lg bg-coral text-white hover:bg-coral/90 transition-colors"
          >
            🔧 Agenda tu mantenimiento ahora
          </a>
        </motion.div>
      </div>
    </section>
  )
}
