import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // custom props if any
}

export default function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 ${className || ""}`}
    />
  )
}