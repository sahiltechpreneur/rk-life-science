"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ProductCard from "./ProductCard"
import { FiTrendingUp } from "react-icons/fi"

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
    <section className="pt-20">
      <div className="flex items-center justify-between mb-10">
          <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                  You May Also Like
                  <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                      <FiTrendingUp /> Trending
                  </span>
              </h2>
              <p className="text-gray-500 font-medium">Customers who viewed this item also bought</p>
          </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            image={p.image?.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`}
            description={p.description?.substring(0, 60) + "..."}
            price={p.price}
          />
        ))}
      </div>
    </section>
  )
}