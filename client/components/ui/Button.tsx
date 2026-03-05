type Props = {
  text: string
  onClick?: () => void
}

export default function Button({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
    >
      {text}
    </button>
  )
}