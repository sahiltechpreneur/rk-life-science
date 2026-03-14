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
    <Link href={`/product/${id}`} className="group relative bg-white block rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex-col hover:-translate-y-1 overflow-hidden">
        {/* Hover Actions */}
        <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
            <button 
                onClick={handleAddToCart} 
                className="bg-white/95 backdrop-blur-md p-3 rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 shadow-lg hover:shadow-xl transition-all cursor-pointer z-20 hover:scale-110 active:scale-95"
                title="Add to Cart"
            >
                <FiShoppingCart className="w-5 h-5 fill-emerald-600/20" />
            </button>
        </div>
        
        {/* Image Container */}
        <div className="relative h-56 lg:h-64 mb-5 overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center group-hover:shadow-inner transition-shadow">
            {image ? (
                <img 
                    src={image} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={name} 
                />
            ) : (
                <FiBox className="w-12 h-12 text-gray-300" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
        </div>
        
        {/* Content */}
        <div className="flex-1 px-2">
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl line-clamp-1 mb-1.5 group-hover:text-emerald-600 transition-colors">{name}</h3>
            <p className="text-gray-500 text-sm line-clamp-2 min-h-[40px] mb-5 font-medium">{description}</p>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 px-2 border-t border-gray-50">
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Price</span>
                <span className="font-black text-gray-900 text-lg">Rs {Number(price).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-sm font-bold text-emerald-600 group-hover:text-white group-hover:bg-emerald-500 px-4 py-2 rounded-xl transition-colors">
                Details <FiEye className="ml-2 w-4 h-4" />
            </div>
        </div>
    </Link>
  )
}