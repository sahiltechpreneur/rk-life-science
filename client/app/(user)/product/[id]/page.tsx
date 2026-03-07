"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useContext } from "react"

import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import SimilarProducts from "@/components/user/SimilarProducts"

import { useCart } from "@/context/CartContext"
import { AuthContext } from "@/context/AuthContext"

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

  const { addToCart } = useCart()
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {

    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))

  }, [id])

  if (!product) {
    return <p className="text-center py-20">Product not found</p>
  }

  return (

    <Container>

      <div className="py-12 grid md:grid-cols-2 gap-8">

        <div>
          <img
            src={product.image?.startsWith("http") ? product.image : `http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-96 object-cover rounded"
          />
        </div>

        <div>

          <h1 className="text-3xl font-bold text-primary">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <p className="text-2xl font-bold text-darkGreen mt-4">
            Rs. {product.price}
          </p>

          <div className="mt-6">

            <Button
              text="Add to Cart"
              onClick={() => {
                if (!user) {
                  alert("Please login to add products to the cart.")
                  router.push("/auth/login")
                  return
                }
                addToCart({
                  id: product.id,
                  name: product.name,
                  image: product.image,
                  price: product.price,
                  quantity: 1
                })
                alert(`${product.name} has been added to your cart!`)
              }}
            />

          </div>

        </div>

      </div>

      <SimilarProducts />

    </Container>
  )
}