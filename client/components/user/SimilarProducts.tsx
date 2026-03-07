"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ProductCard from "./ProductCard"

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
        const res = await fetch("http://localhost:5000/api/products")
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

  return (
    <section className="py-12 mt-12 border-t">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-8">You may also like</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-gray-500 animate-pulse">Finding similar products...</p>
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
          <p className="text-gray-500">No similar products available at this time.</p>
        )}
      </div>
    </section>
  )
}