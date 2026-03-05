"use client"
type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex gap-2 justify-center mt-6">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            currentPage === p ? "bg-primary text-white" : "border"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  )
}