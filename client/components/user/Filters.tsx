"use client"
import { useState } from "react"

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
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
      <div>
        <label className="mr-2 font-semibold">Price:</label>
        <select
          value={price}
          onChange={(e) => { setPrice(e.target.value); handleChange() }}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="0-500">0-500</option>
          <option value="500-1000">500-1000</option>
          <option value="1000-5000">1000+</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">Rating:</label>
        <select
          value={rating}
          onChange={(e) => { setRating(e.target.value); handleChange() }}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="4">4 Stars & above</option>
          <option value="3">3 Stars & above</option>
          <option value="2">2 Stars & above</option>
        </select>
      </div>
    </div>
  )
}