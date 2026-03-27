"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { FiArrowLeft, FiUser, FiMapPin, FiMail, FiPhone, FiCreditCard, FiClock, FiCheckCircle, FiTruck, FiPackage, FiXCircle, FiSettings, FiShoppingCart, FiCalendar } from "react-icons/fi"

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
            <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-500">Loading order details...</p>
        </div>
    )

    /**
     * Returns the appropriate icon based on order status
     */
    const getStatusIcon = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return <FiClock className="w-3.5 h-3.5" />
            case 'processing': return <FiPackage className="w-3.5 h-3.5" />
            case 'shipped': return <FiTruck className="w-3.5 h-3.5" />
            case 'delivered': return <FiCheckCircle className="w-3.5 h-3.5" />
            case 'cancelled': return <FiXCircle className="w-3.5 h-3.5" />
            default: return <FiClock className="w-3.5 h-3.5" />
        }
    }

    /**
     * Returns the tailwind style classes for status badges
     */
    const getStatusStyle = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return 'bg-amber-50 text-amber-600'
            case 'processing': return 'bg-blue-50 text-blue-600'
            case 'shipped': return 'bg-indigo-50 text-indigo-600'
            case 'delivered': return 'bg-emerald-50 text-emerald-600'
            case 'cancelled': return 'bg-red-50 text-red-600'
            default: return 'bg-gray-50 text-gray-600'
        }
    }

    return (
        <div className="space-y-6">
            
            {/* Header / Back Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <Link 
                        href="/admin/orders" 
                        className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <FiArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-semibold text-gray-800">Order #{order.order.id}</h1>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusStyle(order.order.status)}`}>
                                {getStatusIcon(order.order.status)}
                                {order.order.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                            <FiCalendar className="w-3 h-3" />
                            {new Date(order.order.created_at).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Status Updater Dropdown */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                    <div className="flex items-center gap-1.5 px-2 text-xs text-gray-500">
                        <FiSettings className="w-3.5 h-3.5" />
                        <span>Status</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <select
                        onChange={(e) => updateStatus(e.target.value)}
                        value={order.order.status}
                        disabled={isUpdating}
                        className="bg-transparent border-none text-xs font-medium text-gray-700 focus:ring-0 cursor-pointer py-1.5 pr-6 disabled:opacity-50"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Customer & Summary */}
                <div className="lg:col-span-1 space-y-5">
                    {/* Customer Information Card */}
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <FiUser className="w-4 h-4 text-blue-500" />
                            <h2 className="text-sm font-semibold text-gray-700">Customer information</h2>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-medium">
                                    {order.order.customer_name?.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Name</p>
                                    <p className="text-sm font-medium text-gray-800">{order.order.customer_name}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <FiMail className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Email</p>
                                    <a href={`mailto:${order.order.email}`} className="text-sm text-gray-600 hover:text-blue-600 break-all">
                                        {order.order.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <FiPhone className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Phone</p>
                                    <p className="text-sm text-gray-600">{order.order.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address Card */}
                    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <FiMapPin className="w-4 h-4 text-emerald-500" />
                            <h2 className="text-sm font-semibold text-gray-700">Shipping address</h2>
                        </div>
                        
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                <FiTruck className="w-3.5 h-3.5" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Delivery address</p>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {order.order.address}, {order.order.city}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Items & Payment Summary */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Order Items Table */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FiShoppingCart className="w-4 h-4 text-emerald-500" />
                                <h2 className="text-sm font-semibold text-gray-700">Order items</h2>
                            </div>
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                                {order.items.reduce((acc: number, item: any) => acc + item.quantity, 0)} items
                            </span>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0 border border-gray-100">
                                            {item.image_url ? (
                                                <img 
                                                    src={item.image_url.startsWith("http") ? item.image_url : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${item.image_url}`} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <FiPackage className="w-5 h-5 text-gray-300" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-400">NPR {Number(item.price).toLocaleString()} each</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <p className="text-[10px] text-gray-400">Qty</p>
                                            <p className="text-sm font-medium text-gray-700">{item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-400">Subtotal</p>
                                            <p className="text-sm font-semibold text-gray-800">NPR {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-gray-800 rounded-xl p-5 text-white shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <FiCreditCard className="w-4 h-4 text-emerald-400" />
                            <h2 className="text-sm font-semibold">Payment summary</h2>
                        </div>

                        <div className="space-y-2 border-b border-gray-700 pb-4 mb-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Subtotal</span>
                                <span>NPR {(order.order.total - (order.order.shipping_charge || 0)).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-300">Shipping</span>
                                <span className={Number(order.order.shipping_charge) === 0 ? "text-emerald-400" : ""}>
                                    {Number(order.order.shipping_charge) === 0 ? "Free" : `NPR ${Number(order.order.shipping_charge).toLocaleString()}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Total</span>
                            <div className="text-right">
                                <span className="text-xl font-bold text-white">NPR {Number(order.order.total).toLocaleString()}</span>
                                <p className={`text-[10px] ${order.order.payment_status?.toLowerCase() === 'paid' ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {order.order.payment_status || 'UNPAID'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}