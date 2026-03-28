"use client"

import { useEffect, useState, useContext } from "react"
import API from "@/lib/api"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { AuthContext } from "@/context/AuthContext"
import { useNotification } from "@/context/NotificationContext"
import { FiUser, FiMail, FiPhone, FiEdit2, FiCamera, FiPackage, FiLogOut, FiTrash2, FiClock, FiCheckCircle, FiTruck, FiShoppingBag, FiAlertCircle } from "react-icons/fi"
import Link from "next/link"

type Order = {
  id: number
  total: number
  status: string
  created_at: string
}

type User = {
  id: number
  fname: string
  lname: string
  email: string
  phone: string
  image?: string
  orders: Order[]
}

export default function ProfilePage() {
    const { user: authUser, loading, login, logout } = useContext(AuthContext)
    const { showNotification } = useNotification()
    const [user, setUser] = useState<User | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [timedOut, setTimedOut] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!user) setTimedOut(true)
        }, 8000) // 8 second timeout
        return () => clearTimeout(timer)
    }, [user])

    useEffect(() => {
        if (authUser?.token) fetchProfile(authUser.token)
    }, [authUser])

    const fetchProfile = async (token: string) => {
        try {
            const res = await API.get("/user/profile", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUser(res.data)
        } catch (err: any) {
            console.error(err)
            if (err.response?.status === 404 || err.response?.status === 401) {
                logout()
                window.location.href = "/"
            } else {
                showNotification("Failed to load profile.", "error")
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const updateProfile = async () => {
        if (!user || !authUser?.token) return
        setIsSaving(true)
        try {
            await API.put("/user/profile", user, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            showNotification("Profile updated", "success")
        } catch (err) {
            console.error(err)
            showNotification("Failed to update profile", "error")
        } finally {
            setIsSaving(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !user || !authUser?.token) return
        
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        
        try {
            setUploadingImage(true)
            const res = await API.put("/user/profile-image", formData, {
                headers: { 
                    Authorization: `Bearer ${authUser.token}`,
                    "Content-Type": "multipart/form-data" 
                }
            })
            
            const newImageUrl = res.data.imageUrl
            setUser({ ...user, image: newImageUrl })
            login(authUser.token, { ...authUser, image: newImageUrl })
            
            showNotification("Profile photo updated", "success")
        } catch (err) {
            console.error(err)
            showNotification("Failed to upload photo", "error")
        } finally {
            setUploadingImage(false)
        }
    }

    const deleteAccount = async () => {
        if (!user || !authUser?.token) return
        const confirmDelete = confirm("Are you sure you want to permanently delete your account? This cannot be undone.")
        if (!confirmDelete) return

        try {
            await API.delete("/user/delete", {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            logout()
            window.location.href = "/" 
        } catch (err) {
            console.error(err)
            showNotification("Failed to delete account", "error")
        }
    }

    const handleCancelOrder = async (orderId: number) => {
        if (!authUser?.token) return
        if (!confirm("Cancel this order?")) return

        try {
            await API.put(`/orders/${orderId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            showNotification("Order cancelled", "success")
            fetchProfile(authUser.token)
        } catch (err: any) {
            console.error(err)
            showNotification(err.response?.data?.error || "Failed to cancel order", "error")
        }
    }

    const getStatusIcon = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return <FiClock className="w-3.5 h-3.5" />
            case 'processing': return <FiPackage className="w-3.5 h-3.5" />
            case 'shipped': return <FiTruck className="w-3.5 h-3.5" />
            case 'delivered': return <FiCheckCircle className="w-3.5 h-3.5" />
            default: return <FiClock className="w-3.5 h-3.5" />
        }
    }

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

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24 px-4">
                <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 border-3 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                    <h2 className="text-lg font-semibold text-gray-900">Loading your profile</h2>
                    <p className="text-gray-500 text-sm max-w-xs mt-1">Please wait while we fetch your account details and order history.</p>
                    
                    {timedOut && (
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                            <p className="text-sm text-amber-600 mb-4 bg-amber-50 px-4 py-2 rounded-lg border border-amber-100 italic">
                                This is taking longer than expected.
                            </p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 shadow-sm transition-all active:scale-95"
                            >
                                Reload page
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="bg-gray-50 min-h-screen pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Profile Header */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8 shadow-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div className="relative group">
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {user.image ? (
                                        <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-semibold text-gray-500 uppercase">
                                            {user.fname?.charAt(0)}{user.lname?.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <FiCamera className="w-5 h-5 text-white" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                                </label>
                            </div>
                            <div className="text-center sm:text-left flex-1">
                                <h1 className="text-xl font-bold text-gray-900">{user.fname} {user.lname}</h1>
                                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                                <p className="text-gray-400 text-xs mt-0.5">{user.phone}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors rounded-lg"
                            >
                                <FiLogOut className="w-4 h-4" />
                                Sign out
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Account Settings */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FiUser className="w-4 h-4 text-emerald-500" />
                                    Account details
                                </h2>
                                
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">First name</label>
                                        <input
                                            name="fname" 
                                            value={user.fname} 
                                            onChange={handleChange}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Last name</label>
                                        <input
                                            name="lname" 
                                            value={user.lname} 
                                            onChange={handleChange}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                        <input
                                            value={user.email} 
                                            disabled
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                                        <input
                                            name="phone" 
                                            value={user.phone} 
                                            onChange={handleChange}
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                    
                                    <button
                                        onClick={updateProfile} 
                                        disabled={isSaving}
                                        className="w-full mt-2 bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-70"
                                    >
                                        {isSaving ? "Saving..." : "Save changes"}
                                    </button>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="mt-6 bg-red-50 rounded-xl border border-red-100 p-5 text-center">
                                <FiAlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                <h3 className="text-sm font-medium text-red-800 mb-1">Delete account</h3>
                                <p className="text-xs text-red-600 mb-3">Permanently remove your account and data</p>
                                <button
                                    onClick={deleteAccount}
                                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                                >
                                    Delete account
                                </button>
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                    <div className="flex items-center gap-2">
                                        <FiPackage className="w-4 h-4 text-gray-500" />
                                        <h2 className="text-base font-semibold text-gray-900">Order history</h2>
                                    </div>
                                </div>

                                {user.orders && user.orders.length > 0 ? (
                                    <div className="divide-y divide-gray-50">
                                        {user.orders.map((order) => (
                                            <div key={order.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                                                        <FiShoppingBag className="w-4 h-4 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-medium text-gray-900 text-sm">Order #{order.id}</h3>
                                                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getStatusStyle(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-400">
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between sm:justify-end gap-4">
                                                    <span className="font-semibold text-gray-900 text-sm">
                                                        NPR {Number(order.total).toLocaleString()}
                                                    </span>
                                                    
                                                    {order.status === 'pending' && (
                                                        <button 
                                                            onClick={() => handleCancelOrder(order.id)}
                                                            className="text-xs text-red-500 hover:text-red-600"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <FiShoppingBag className="w-5 h-5 text-gray-300" />
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-1">No orders yet</h3>
                                        <p className="text-xs text-gray-400 mb-4">Start shopping to see your orders here</p>
                                        <Link href="/product" className="text-xs text-emerald-600 font-medium hover:text-emerald-700">
                                            Browse products →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}