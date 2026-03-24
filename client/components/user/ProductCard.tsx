"use client"

import Link from "next/link"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { FiShoppingCart, FiEye, FiBox } from "react-icons/fi"

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to product detail
    if (!user) {
        // Optional: show a nice toast instead of alert in the future
      alert("Please login to add products to your cart.")
      router.push("/auth/login")
      return
    }
    addToCart({ id, name, image, price, quantity: 1 })
    alert(`${name} has been added to your cart!`)
  }

  return (
    <Link href={`/product/${id}`} className="group relative bg-white block rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all flex-col overflow-hidden">
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
            <button 
                onClick={handleAddToCart} 
                className="bg-white p-2 rounded-full text-primary hover:bg-lightGreen border border-gray-100 shadow-sm"
                title="Add to Cart"
            >
                <FiShoppingCart className="w-5 h-5" />
            </button>
        </div>
        
        {/* Image Container */}
        <div className="relative h-56 lg:h-64 mb-5 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center">
            {image ? (
                <img 
                    src={image} 
                    className="h-full w-full object-cover" 
                    alt={name} 
                />
            ) : (
                <FiBox className="w-12 h-12 text-gray-300" />
            )}
        </div>
        
        {/* Content */}
        <div className="flex-1 px-2 pt-1">
            <h3 className="font-semibold text-gray-900 text-lg sm:text-xl line-clamp-1 mb-1.5 group-hover:text-primary transition-colors">{name}</h3>
            <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px] mb-5 font-normal">{description}</p>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 px-2 border-t border-gray-50">
            <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">Price</span>
                <span className="font-bold text-gray-900 text-lg">NPR {Number(price).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-sm font-semibold text-primary group-hover:text-white group-hover:bg-primary px-4 py-2 rounded-xl transition-colors">
                Details <FiEye className="ml-2 w-4 h-4" />
            </div>
        </div>
    </Link>
  )
}