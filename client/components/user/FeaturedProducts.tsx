"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import API from "@/lib/api"

type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products")
        const data = await res.json()
        // Take the first 3 products as featured
        setProducts(data.slice(0, 3))
      } catch (err) {
        console.error("Failed to fetch featured products", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <section className="py-20 bg-lightGreen">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">Featured Products</h2>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <p className="text-gray-600 animate-pulse text-lg">Loading amazing products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard 
                key={p.id}
                id={p.id}
                name={p.name}
                image={p.image?.startsWith("http") ? p.image : `http://localhost:5000/uploads/${p.image}`}
                description={p.description?.substring(0, 60) + "..."}
                price={p.price}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </section>
  )
}