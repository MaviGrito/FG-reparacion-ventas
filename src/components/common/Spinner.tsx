export default function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }
  return (
    <div className={`${sizes[size]} border-4 border-light/20 border-t-coral rounded-full animate-spin`} role="status" aria-label="Cargando" />
  )
}
