import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // custom props if any
}

export default function Input({ className, ...props }: Props) {
  return (
    <input
      {...props}
      className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${className || ""}`}
    />
  )
}