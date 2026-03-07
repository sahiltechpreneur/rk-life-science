"use client"

import Link from "next/link"
import Button from "@/components/ui/Button"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"

type Props = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export default function ProductCard({ id, name, image, description, price }: Props) {
  const { user } = useContext(AuthContext)
  const { addToCart } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add products to the cart.")
      router.push("/auth/login")
      return
    }
    addToCart({ id, name, image, price, quantity: 1 })
    alert(`${name} has been added to your cart!`)
  }

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <Link href={`/product/${id}`}>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded cursor-pointer" />
      </Link>
      <Link href={`/product/${id}`}>
        <h3 className="text-lg font-semibold mt-2 cursor-pointer">{name}</h3>
      </Link>
      <p className="text-gray-600 mt-1">{description}</p>
      <p className="text-primary font-bold mt-2">NPR {price}</p>
      <div className="mt-4">
        <Button text="Add to Cart" onClick={handleAddToCart} />
      </div>
    </div>
  )
}