import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export default function Button({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-poppins font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-coral text-white hover:bg-coral/90 focus-visible:ring-coral',
    secondary: 'bg-navy text-white hover:bg-navy/90 focus-visible:ring-navy',
    outline: 'border-2 border-coral text-coral hover:bg-coral hover:text-white focus-visible:ring-coral',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20bd5a] focus-visible:ring-[#25D366]',
  }
  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  )
}
