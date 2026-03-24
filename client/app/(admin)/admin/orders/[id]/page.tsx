"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { FiArrowLeft, FiUser, FiMapPin, FiMail, FiPhone, FiCreditCard, FiClock, FiCheckCircle, FiTruck, FiPackage, FiXCircle, FiSettings, FiShoppingCart } from "react-icons/fi"

/**
 * OrderDetailsPage Component (Admin)
 * This page allows administrators to view the full details of a specific order,
 * including customer info, shipping details, and items purchased.
 * It also provides functionality to update the order's status (e.g., Shipped, Delivered).
 */
export default function OrderDetailsPage() {
    const params = useParams()
    const { id } = params
    const [order, setOrder] = useState<any>(null)
    const [isUpdating, setIsUpdating] = useState(false)

    // Fetch order data on component mount or when ID changes
    useEffect(() => {
        fetchOrder()
    }, [id])

    /**
     * Fetches order and order items from the backend API
     */
    const fetchOrder = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`)
            const data = await res.json()
            setOrder(data)
        } catch (error) {
            console.error("Failed to fetch order", error)
        }
    }

    /**
     * Updates the order status in the database
     * Note: Setting status to 'Delivered' automatically marks the order as 'Paid' in the backend.
     */
    const updateStatus = async (status: string) => {
        setIsUpdating(true)
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            })
            // Refresh order data to show updated status and payment status if applicable
            await fetchOrder()
        } catch (error) {
            console.error("Failed to update status", error)
        } finally {
            setIsUpdating(false)
        }
    }

    if (!order) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-medium">Loading order details...</p>
        </div>
    )

    /**
     * Returns the appropriate icon based on order status
     */
    const getStatusIcon = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return <FiClock className="w-5 h-5" />
            case 'processing': return <FiPackage className="w-5 h-5" />
            case 'shipped': return <FiTruck className="w-5 h-5" />
            case 'delivered': return <FiCheckCircle className="w-5 h-5" />
            case 'cancelled': return <FiXCircle className="w-5 h-5" />
            default: return <FiClock className="w-5 h-5" />
        }
    }

    /**
     * Returns the tailwind style classes for status badges
     */
    const getStatusStyle = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return 'bg-amber-50 text-amber-600 border-amber-200'
            case 'processing': return 'bg-blue-50 text-blue-600 border-blue-200'
            case 'shipped': return 'bg-indigo-50 text-indigo-600 border-indigo-200'
            case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-200'
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-200'
            default: return 'bg-gray-50 text-gray-600 border-gray-200'
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-[85vh] bg-transparent">
            {/* Header / Back Navigation */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/orders" 
                        className="p-2 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                            Order #{order.order.id}
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${getStatusStyle(order.order.status)}`}>
                                {getStatusIcon(order.order.status)}
                                {order.order.status}
                            </span>
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium flex items-center gap-2">
                            <FiClock className="w-4 h-4" />
                            Placed on {new Date(order.order.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Status Updater Dropdown */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm relative z-10">
                    <div className="pl-3 text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <FiSettings className="w-4 h-4" /> 
                        Update Status
                    </div>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <select
                        onChange={(e) => updateStatus(e.target.value)}
                        value={order.order.status}
                        disabled={isUpdating}
                        className="bg-transparent border-none text-sm font-bold text-gray-900 focus:ring-0 cursor-pointer pr-8 py-2 disabled:opacity-50"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Customer & Summary */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Customer Information Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
                        
                        <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 relative z-10">
                            <FiUser className="w-5 h-5 text-blue-500" />
                            Customer Information
                        </h2>
                        
                        <div className="space-y-5 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 border border-blue-200">
                                    {order.order.customer_name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Name</p>
                                    <p className="font-bold text-gray-900">{order.order.customer_name}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 border border-gray-100">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                                    <a href={`mailto:${order.order.email}`} className="font-medium text-gray-700 hover:text-blue-600 transition-colors break-all">
                                        {order.order.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 border border-gray-100">
                                    <FiPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                                    <p className="font-medium text-gray-700">{order.order.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>

                        <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2 relative z-10">
                            <FiMapPin className="w-5 h-5 text-emerald-500" />
                            Shipping Details
                        </h2>
                        
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-200 mt-1">
                                <FiTruck className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Address</p>
                                <p className="font-medium text-gray-700 leading-relaxed max-w-[200px]">
                                    {order.order.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Items & Payment Summary */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Order Items Table */}
                    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                <FiShoppingCart className="w-6 h-6 text-amber-500" />
                                Order Items
                            </h2>
                            <span className="bg-gray-100 text-gray-600 py-1 px-3 rounded-full text-xs font-bold">
                                {order.items.reduce((acc: number, item: any) => acc + item.quantity, 0)} Items
                            </span>
                        </div>

                        <div className="space-y-4">
                            {order.items.map((item: any, idx: number) => (
                                <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl transition-colors hover:bg-gray-50 ${idx !== order.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0 overflow-hidden">
                                            {item.image_url ? (
                                                <img 
                                                    src={item.image_url.startsWith("http") ? item.image_url : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${item.image_url}`} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <FiPackage className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1 font-medium text-emerald-600">NPR {Number(item.price).toLocaleString()} <span className="text-gray-400 font-normal">per unit</span></p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between sm:justify-end gap-8 sm:w-1/3 border-t sm:border-none border-gray-100 pt-4 sm:pt-0 mt-2 sm:mt-0">
                                        <div className="text-center">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Qty</p>
                                            <p className="font-bold text-gray-900 bg-gray-100 px-3 flex items-center justify-center rounded-lg h-8">×{item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subtotal</p>
                                            <p className="font-black text-gray-900 text-lg">NPR {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-32 -translate-y-32"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full -translate-x-20 translate-y-20"></div>

                        <h2 className="text-xl font-black mb-6 flex items-center gap-2 relative z-10 text-white">
                            <FiCreditCard className="w-6 h-6 text-emerald-400" />
                            Payment Summary
                        </h2>

                        <div className="space-y-4 relative z-10 border-b border-gray-700 pb-6 mb-6">
                            <div className="flex justify-between items-center text-gray-300">
                                <span className="font-medium">Subtotal</span>
                                <span className="font-bold text-white">NPR {(order.order.total - (order.order.shipping_charge || 0)).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                                <span className="font-medium">Shipping</span>
                                <span className={Number(order.order.shipping_charge) === 0 ? "font-bold text-emerald-400" : "font-bold text-white"}>
                                    {Number(order.order.shipping_charge) === 0 ? "Free" : `NPR ${Number(order.order.shipping_charge).toLocaleString()}`}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-gray-300">
                                <span className="font-medium">Tax</span>
                                <span className="font-bold text-white">NPR 0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end relative z-10">
                            <div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Grand Total</p>
                                <p className="text-4xl font-black text-white">NPR {Number(order.order.total).toLocaleString()}</p>
                            </div>
                            <span className={`px-4 py-2 border rounded-xl font-bold text-sm tracking-wide ${
                                order.order.payment_status?.toLowerCase() === 'paid'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            }`}>
                                {order.order.payment_status || 'UNPAID'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}