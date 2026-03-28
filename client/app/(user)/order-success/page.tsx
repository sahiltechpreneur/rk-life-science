"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import API from "@/lib/api"
import { FiCheckCircle, FiPackage, FiShoppingBag, FiArrowRight, FiHome } from "react-icons/fi"
import Link from "next/link"

function OrderSuccessContent() {
    const params = useSearchParams()
    const router = useRouter()
    const orderId = params.get("order")
    const [order, setOrder] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (orderId) fetchOrderDetails()
        else setLoading(false)
    }, [orderId])

    const fetchOrderDetails = async () => {
        try {
            const res = await API.get(`/orders/${orderId}`)
            setOrder(res.data)
        } catch (error) {
            console.error("Failed to fetch order details", error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-100 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Finalizing your order...</p>
        </div>
    )

    return (
        <div className="bg-gray-50 min-h-screen py-20 px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto">
                    {/* Success Hero Card */}
                    <div className="bg-white rounded-[2rem] shadow-xl shadow-emerald-500/5 border border-emerald-50 overflow-hidden relative mb-10">
                        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                        <div className="p-10 text-center">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100/50 shadow-inner">
                                <FiCheckCircle className="w-10 h-10 animate-bounce" />
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
                            <p className="text-gray-500 font-medium text-lg">Thank you for your purchase. Your order is being processed.</p>
                            
                            <div className="mt-8 inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Number</span>
                                <span className="text-xl font-black text-emerald-600">#{orderId || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    {order && (
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-10">
                            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                                <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                                    <FiShoppingBag className="text-emerald-500" /> Order Summary
                                </h2>
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{order.items.length} Items</span>
                            </div>
                            
                            <div className="p-6 sm:p-8 space-y-6">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shadow-sm">
                                                {item.image_url ? (
                                                    <img 
                                                       src={item.image_url.startsWith("http") ? item.image_url : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${item.image_url}`} 
                                                       alt={item.name} 
                                                       className="w-full h-full object-cover" 
                                                    />
                                                ) : (
                                                    <FiPackage className="text-gray-300 w-6 h-6" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-400 font-medium">Quantity: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-black text-gray-900">NPR {Number(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                                
                                <div className="pt-6 border-t border-gray-100 flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-gray-500 font-medium">
                                        <span>Subtotal</span>
                                        <span>NPR {Number(order.order.total).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-emerald-500 font-bold">
                                        <span>Shipping</span>
                                        <span>FREE</span>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Paid</span>
                                        <span className="text-3xl font-black text-gray-900">NPR {Number(order.order.total).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link 
                            href="/product"
                            className="bg-white text-gray-900 border border-gray-200 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <FiShoppingBag /> Continue Shopping
                        </Link>
                        <Link 
                            href="/profile"
                            className="bg-gray-900 text-white border border-transparent font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200"
                        >
                            <FiPackage /> View My Orders <FiArrowRight />
                        </Link>
                    </div>
                    
                    <div className="mt-12 text-center text-gray-400 text-sm font-medium">
                        <p>Need help with your order? <Link href="/contact" className="text-emerald-500 hover:underline">Contact Support</Link></p>
                    </div>
            </div>
        </div>
    )
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading...</p>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    )
}
