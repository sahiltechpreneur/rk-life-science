"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ProductCard from "./ProductCard"
import { FiTrendingUp, FiPackage } from "react-icons/fi"

type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export default function SimilarProducts() {
  const params = useParams()
  const { id } = params
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        const data: Product[] = await res.json()
        
        // Filter out the current product and grab 3
        const others = data.filter(p => p.id !== Number(id)).slice(0, 3)
        setProducts(others)
      } catch (err) {
        console.error("Failed to fetch similar products", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSimilar()
  }, [id])

  if (loading || products.length === 0) {
      // Don't render Section if no products or if loading for cleaner UI 
      return null;
  }

  return (
    <section className="py-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            You may also like
          </h2>
          <p className="text-sm text-gray-500">
            Customers who viewed this also bought
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-full">
          <FiTrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-medium text-emerald-600">Recommended for you</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image?.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`}
            description={p.description?.substring(0, 60) + (p.description?.length > 60 ? "..." : "")}
            price={p.price}
          />
        ))}
      </div>
    </section>
  )
}