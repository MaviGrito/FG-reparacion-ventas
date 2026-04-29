import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export default function Card({ hover = false, children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md overflow-hidden ${hover ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
