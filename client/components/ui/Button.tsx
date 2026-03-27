import { forwardRef } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  children?: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  onClick?: () => void
  className?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  text,
  children,
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  className = '',
  disabled,
  type = 'button',
  ...props
}, ref) => {
  // Base styles — clean, modern, with subtle transitions
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  // Variant styles — grounded, no over-the-top gradients, just solid colors that feel intentional
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm hover:shadow",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
    success: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 shadow-sm",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400"
  }

  // Size styles — comfortable padding, consistent proportions
  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-md",
    md: "px-4 py-2 text-sm gap-2 rounded-lg",
    lg: "px-6 py-3 text-base gap-2 rounded-xl"
  }

  // Width styles
  const widthStyles = fullWidth ? "w-full" : ""

  // Loading spinner — subtle, doesn't steal attention
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin h-3.5 w-3.5" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )

  const content = (
    <>
      {loading && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{text || children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  )

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${widthStyles}
    ${loading ? 'cursor-wait' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  // If href is provided, render as Link
  if (href) {
    return (
      <Link 
        href={href}
        className={combinedClassName}
        onClick={onClick}
      >
        {content}
      </Link>
    )
  }

  // Otherwise render as button
  return (
    <button
      ref={ref}
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'

export default Button