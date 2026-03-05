"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import SimilarProducts from "@/components/user/SimilarProducts"

type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export default function ProductDetailPage() {

  const params = useParams()
  const { id } = params
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // TODO: Fetch product from backend using id
    const allProducts: Product[] = [
      { id: 1, name: "Vitamin C", image: "/images/vitamin-c.jpg", description: "Boost immunity", price: 500 },
      { id: 2, name: "Multivitamin", image: "/images/multivitamin.jpg", description: "Complete nutrition", price: 1200 },
      { id: 3, name: "Omega 3", image: "/images/omega3.jpg", description: "Heart health", price: 800 },
    ]
    const found = allProducts.find(p => p.id === Number(id))
    setProduct(found || null)
  }, [id])

  if(!product) return <p className="text-center py-20">Product not found</p>

  return (
    <Container>
      <div className="py-12 grid md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-2xl font-bold text-darkGreen mt-4">Rs. {product.price}</p>
          <div className="mt-6">
            <Button text="Add to Cart" />
          </div>
        </div>
      </div>

      <SimilarProducts />
    </Container>
  )
}