"use client"

import CartItem from "@/components/user/CartItem"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { FiShoppingBag, FiArrowRight, FiShield } from "react-icons/fi"

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

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-[80vh]">
        
        {/* Header */}
        <div className="bg-gray-900 text-white py-12 md:py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent"></div>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
                    <FiShoppingBag className="text-emerald-400" />
                    Shopping Cart
                </h1>
                <p className="text-gray-400 font-medium">Review your items before proceeding to checkout.</p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 -mt-8 relative z-20">
            {cart.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-sm">
                        <FiShoppingBag className="w-10 h-10 text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 font-medium mb-8 max-w-md">Looks like you haven't added any products to your cart yet. Browse our catalog to find what you need.</p>
                    <Link 
                        href="/product"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-emerald-600 border border-transparent rounded-2xl hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-lg hover:-translate-y-1"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(p => (
                            <CartItem
                                key={p.id}
                                id={p.id}
                                name={p.name}
                                image={p.image?.startsWith("http") ? p.image : `http://localhost:5000/uploads/${p.image}`}
                                price={p.price}
                                quantity={p.quantity}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>

                    {/* Order Summary sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-black text-gray-900 mb-6 pb-6 border-b border-gray-100">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>Subtotal ({cart.length} items)</span>
                                    <span className="text-gray-900 font-bold">NPR {subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600 font-bold">Free</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-6 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-900 font-bold">Total Amount</span>
                                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                                        NPR {subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium mt-2 text-right">Taxes applied at checkout</p>
                            </div>

                            <Link 
                                href="/checkout"
                                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gray-900 border border-transparent rounded-2xl hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                Proceed to Checkout
                                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
                                <FiShield className="text-emerald-500" />
                                Secure Checkout System
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