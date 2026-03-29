"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useContext } from "react"
import SimilarProducts from "@/components/user/SimilarProducts"
import { useCart } from "@/context/CartContext"
import { AuthContext } from "@/context/AuthContext"
import { useNotification } from "@/context/NotificationContext"
import { FiShoppingCart, FiShield, FiTruck, FiBox, FiCheckCircle, FiArrowLeft } from "react-icons/fi"

type Product = {
  id: number
  name: string
  image: string
  images: string[]
  description: string
  price: number
  composition?: string
  packing?: string
  ingredients?: string
  advantages?: string
  content?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const { id } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const { addToCart } = useCart()
  const { user } = useContext(AuthContext)
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        // If images array is present and has at least one image, set it as the selected image
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0])
        } else if (data.image) {
          setSelectedImage(data.image)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false))
  }, [id])

  const getFullImageUrl = (img?: string | null) => {
    if (!img) return ""
    return img.startsWith("http") 
      ? img 
      : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${img}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-10 h-10 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-sm">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiBox className="w-6 h-6 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => router.push('/product')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to products
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!user) {
      showNotification("Please login to add items to your cart", "warning")
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
    showNotification(`${product.name} added to cart`, "success")
  }

  const handleBuyNow = () => {
    if (!user) {
      showNotification("Please login to buy items", "warning")
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
    router.push("/checkout")
  }

  // Construct full image URL
  const imageUrl = product.image?.startsWith("http") 
    ? product.image 
    : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${product.image}`

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
              
              {/* Product Gallery */}
              <div className="space-y-4">
                <div className="aspect-square rounded-xl bg-gray-50 flex items-center justify-center p-6 border border-gray-100 overflow-hidden">
                  {selectedImage ? (
                    <img
                      src={getFullImageUrl(selectedImage)}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain transition-all duration-300"
                    />
                  ) : (
                    <FiBox className="w-20 h-20 text-gray-300" />
                  )}
                </div>
                
                {/* Thumbnails */}
                {product.images && product.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                          selectedImage === img ? 'border-emerald-500 ring-2 ring-emerald-500/10' : 'border-gray-100 hover:border-emerald-200'
                        }`}
                      >
                        <img src={getFullImageUrl(img)} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 mb-3">
                    <FiCheckCircle className="w-3 h-3" />
                    In stock
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">
                    {product.name}
                  </h1>
                  <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-4">
                    NPR {Number(product.price).toLocaleString()}
                  </div>
                </div>

                {/* Quick Details Chips */}
                {(product.packing || product.composition) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.composition && (
                      <div className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600 border border-gray-100">
                        <span className="text-gray-400 mr-1">Composition:</span> {product.composition}
                      </div>
                    )}
                    {product.packing && (
                      <div className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-600 border border-gray-100">
                        <span className="text-gray-400 mr-1">Packing:</span> {product.packing}
                      </div>
                    )}
                  </div>
                )}

                <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
                  <p>{product.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-emerald-600 text-emerald-600 text-sm font-semibold rounded-lg hover:bg-emerald-50 transition-all active:scale-95 shadow-sm"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all active:scale-95 shadow-sm"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-emerald-600">
                      <FiShield className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">Authentic</p>
                      <p className="text-[11px] text-gray-400">100% genuine</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-emerald-600">
                      <FiTruck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">Fast delivery</p>
                      <p className="text-[11px] text-gray-400">Secure shipping</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Detailed Catalog Info */}
        {(product.ingredients || product.advantages || product.content) && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              {product.ingredients && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 uppercase tracking-tight text-xs border-b border-emerald-100 pb-1">Ingredients</h3>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-line">{product.ingredients}</p>
                </div>
              )}
              {product.advantages && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 uppercase tracking-tight text-xs border-b border-emerald-100 pb-1">Advantages</h3>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-line">{product.advantages}</p>
                </div>
              )}
              {product.content && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 uppercase tracking-tight text-xs border-b border-emerald-100 pb-1">More Details</h3>
                  <p className="text-gray-500 leading-relaxed whitespace-pre-line">{product.content}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <SimilarProducts />
      </div>
    </div>
  )
}