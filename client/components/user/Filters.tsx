"use client"
import { useState } from "react"
import { FiChevronDown } from "react-icons/fi"

type Props = {
  onFilterChange: (filters: { price: string; rating: string }) => void
}

export default function Filters({ onFilterChange }: Props) {

  const [price, setPrice] = useState("all")
  const [rating, setRating] = useState("all")

  function handleChange() {
    onFilterChange({ price, rating })
  }

  return (
    <div className="space-y-4">
      {/* Price Filter */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Price range
        </label>
        <div className="relative">
          <select
            value={price}
            onChange={(e) => { setPrice(e.target.value); handleChange() }}
            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors cursor-pointer"
          >
            <option value="all">All prices</option>
            <option value="0-500">Under NPR 500</option>
            <option value="500-1000">NPR 500 - 1,000</option>
            <option value="1000-5000">NPR 1,000+</option>
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Customer rating
        </label>
        <div className="relative">
          <select
            value={rating}
            onChange={(e) => { setRating(e.target.value); handleChange() }}
            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors cursor-pointer"
          >
            <option value="all">All ratings</option>
            <option value="4">★★★★ & above (4+)</option>
            <option value="3">★★★ & above (3+)</option>
            <option value="2">★★ & above (2+)</option>
          </select>
          <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Active Filters Summary */}
      {(price !== "all" || rating !== "all") && (
        <div className="pt-2">
          <button
            onClick={() => {
              setPrice("all")
              setRating("all")
              onFilterChange({ price: "all", rating: "all" })
            }}
            className="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}