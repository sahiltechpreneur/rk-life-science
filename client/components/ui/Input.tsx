type Props = {
  placeholder: string
  type?: string
}

export default function Input({ placeholder, type = "text" }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  )
}