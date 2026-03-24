"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useContext } from "react"
import Container from "@/components/ui/Container"
import SimilarProducts from "@/components/user/SimilarProducts"
import { useCart } from "@/context/CartContext"
import { AuthContext } from "@/context/AuthContext"
import { FiShoppingCart, FiShield, FiTruck, FiBox, FiCheckCircle } from "react-icons/fi"

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
  const [isLoading, setIsLoading] = useState(true)
  
  const { addToCart } = useCart()
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
    )
  }

  if (!product) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-5 border border-gray-200">
                <FiBox className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
            <button 
                onClick={() => router.push('/product')}
                className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
                Back to Products
            </button>
        </div>
    )
  }

  const handleAddToCart = () => {
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
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="bg-white rounded-[2.5rem] p-6 lg:p-12 shadow-sm border border-gray-100 mb-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-lightGreen to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 relative z-10">
                
                {/* Product Image Gallery */}
                <div className="relative group">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8">
                        {product.image ? (
                            <img
                                src={product.image?.startsWith("http") ? product.image : `http://localhost:5000/uploads/${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <FiBox className="w-32 h-32 text-gray-200" />
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-lightGreen text-darkGreen border border-secondary uppercase tracking-wider mb-4">
                            <FiCheckCircle className="w-3.5 h-3.5" /> In Stock
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                            {product.name}
                        </h1>
                        <div className="flex items-end gap-3 mb-8">
                            <span className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                NPR {Number(product.price).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="prose mb-10 text-gray-600 font-medium leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-10 border-b border-gray-100">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gray-900 border border-transparent rounded-2xl hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            <FiShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            Add to Cart
                        </button>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                <FiShield className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Authentic</h4>
                                <p className="text-xs text-gray-500 font-normal">100% Genuine Quality</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                <FiTruck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Fast Delivery</h4>
                                <p className="text-xs text-gray-500 font-normal">Securely Packaged</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <SimilarProducts />
      </div>
    </div>
  )
}