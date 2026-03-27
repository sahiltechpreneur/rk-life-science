"use client"

import CartItem from "@/components/user/CartItem"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { FiShoppingBag, FiArrowRight, FiShield, FiTrash2 } from "react-icons/fi"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  )

  const handleQuantityChange = (id: number, qty: number) => {
    updateQuantity(id, qty)
  }

  const handleRemove = (id: number) => {
    removeFromCart(id)
  }

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-gray-700">Home</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Cart</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your cart</h1>
                <p className="text-gray-500 text-sm mt-1">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              {cart.length > 0 && (
                <button 
                  onClick={() => cart.forEach(item => removeFromCart(item.id))}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingBag className="w-6 h-6 text-gray-300" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                Looks like you haven't added anything yet. Browse our products to get started.
              </p>
              <Link 
                href="/product"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Browse products
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-3">
                {cart.map(p => (
                  <CartItem
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    image={p.image?.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`}
                    price={p.price}
                    quantity={p.quantity}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-gray-900 mb-5 pb-4 border-b border-gray-100">
                    Order summary
                  </h2>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900 font-medium">NPR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-900 font-medium">Total</span>
                      <span className="text-xl font-bold text-emerald-600">
                        NPR {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-right">
                      Taxes included where applicable
                    </p>
                  </div>

                  <Link 
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Checkout
                    <FiArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <FiShield className="w-3 h-3" />
                    Secure checkout
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}