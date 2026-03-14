"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"

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
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">Our Selection</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Products</span>
          </h3>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto font-medium">Discover our highest-rated nutraceuticals handpicked for exceptional quality and performance.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-3xl p-4 h-[400px] border border-gray-100 shadow-sm flex flex-col">
                    <div className="w-full h-56 bg-gray-100 rounded-2xl mb-5"></div>
                    <div className="h-5 bg-gray-100 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 mb-auto"></div>
                    <div className="flex justify-between mt-4">
                        <div className="h-5 bg-gray-100 rounded w-1/3"></div>
                        <div className="h-8 bg-gray-100 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
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
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-500 font-medium">No featured products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}