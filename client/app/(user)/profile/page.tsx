"use client"

import { useEffect, useState, useContext } from "react"
import API from "@/lib/api"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { AuthContext } from "@/context/AuthContext"
import { FiUser, FiMail, FiPhone, FiEdit2, FiCamera, FiPackage, FiLogOut, FiTrash2, FiClock, FiCheckCircle, FiTruck, FiShoppingBag } from "react-icons/fi"
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
    const [user, setUser] = useState<User | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

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
                logout() // Token invalid or user deleted
                window.location.href = "/"
            } else {
                alert("Failed to load profile. Please try again.")
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
            alert("Profile updated successfully")
        } catch (err) {
            console.error(err)
            alert("Failed to update profile")
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
            
            alert("Profile image updated successfully!")
        } catch (err) {
            console.error(err)
            alert("Failed to upload profile image")
        } finally {
            setUploadingImage(false)
        }
    }

    const deleteAccount = async () => {
        if (!user || !authUser?.token) return
        const confirmDelete = confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")
        if (!confirmDelete) return

        try {
            await API.delete("/user/delete", {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            logout()
            window.location.href = "/" 
        } catch (err) {
            console.error(err)
            alert("Failed to delete account")
        }
    }

    const handleCancelOrder = async (orderId: number) => {
        if (!authUser?.token) return
        if (!confirm("Are you sure you want to cancel this order?")) return

        try {
            await API.put(`/orders/${orderId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            alert("Order cancelled successfully")
            fetchProfile(authUser.token) // Refresh data
        } catch (err: any) {
            console.error(err)
            alert(err.response?.data?.error || "Failed to cancel order")
        }
    }

    const getStatusIcon = (status: string) => {
        switch(status.toLowerCase()) {
            case 'pending': return <FiClock className="w-4 h-4" />
            case 'processing': return <FiPackage className="w-4 h-4" />
            case 'shipped': return <FiTruck className="w-4 h-4" />
            case 'delivered': return <FiCheckCircle className="w-4 h-4" />
            default: return <FiClock className="w-4 h-4" />
        }
    }

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

    if (!user) {
        return (
            <div className="min-h-[80vh] flex justify-center items-center bg-gray-50">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading your profile...</p>
                </div>
            </div>
        )
    }

    return (
        <ProtectedRoute>
            <div className="bg-gray-50 min-h-screen pb-20">
                
                {/* Header Profile Dashboard */}
                <div className="bg-gray-900 text-white py-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent"></div>
                    
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] overflow-hidden bg-gray-800 border-2 border-gray-700 shadow-xl flex items-center justify-center">
                                    {user.image ? (
                                        <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl font-black text-gray-600 uppercase">{user.fname?.charAt(0)}</span>
                                    )}
                                </div>
                                <label className="absolute inset-0 bg-black/60 rounded-[2rem] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                                    <FiCamera className="w-6 h-6 mb-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{uploadingImage ? "Uploading" : "Change"}</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                                </label>
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black mb-1">{user.fname} {user.lname}</h1>
                                <p className="text-gray-400 font-medium flex items-center gap-2"><FiMail /> {user.email}</p>
                            </div>
                        </div>
                        
                        <button
                            onClick={logout}
                            className="bg-white/10 hover:bg-red-500 hover:text-white border border-white/20 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                        >
                            <FiLogOut /> Sign Out
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        
                        {/* Settings Column */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                                    <FiUser className="text-emerald-500" /> Account Details
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="relative">
                                        <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">First Name</label>
                                        <input
                                            name="fname" value={user.fname} onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">Last Name</label>
                                        <input
                                            name="lname" value={user.lname} onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-4 px-1 bg-gray-50 text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address (Locked)</label>
                                        <input
                                            name="email" value={user.email} disabled
                                            className="w-full bg-gray-50 border border-gray-200 text-gray-500 text-sm rounded-xl px-4 py-3 outline-none font-medium cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                                        <input
                                            name="phone" value={user.phone} onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    
                                    <button
                                        onClick={updateProfile} disabled={isSaving}
                                        className="w-full mt-4 bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                                    >
                                        <FiEdit2 /> {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-red-50 rounded-3xl p-6 shadow-sm border border-red-100 text-center">
                                <FiTrash2 className="w-8 h-8 text-red-500 mx-auto mb-3" />
                                <h3 className="font-bold text-red-900 mb-1">Danger Zone</h3>
                                <p className="text-xs text-red-700 font-medium mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                <button
                                    onClick={deleteAccount}
                                    className="bg-white text-red-600 font-bold text-sm border border-red-200 px-6 py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-colors"
                                >
                                    Delete My Account
                                </button>
                            </div>
                        </div>

                        {/* Orders Column */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                                <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center"><FiPackage /></div>
                                        Order History
                                    </h2>
                                    <span className="bg-white border border-gray-200 text-gray-600 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                                        {user.orders.length} Total
                                    </span>
                                </div>

                                {user.orders && user.orders.length > 0 ? (
                                    <div className="divide-y divide-gray-50">
                                        {user.orders.map((order) => (
                                            <div key={order.id} className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200 shadow-inner">
                                                        <FiShoppingBag className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                                                {getStatusIcon(order.status)} {order.status}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-500">
                                                            Placed {new Date(order.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t border-gray-100 sm:border-0 pt-4 sm:pt-0">
                                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider sm:mb-1">Amount Total</span>
                                                        <span className="font-black text-gray-900 text-lg">NPR {Number(order.total).toLocaleString()}</span>
                                                    </div>
                                                    
                                                    {order.status === 'Pending' && (
                                                        <button 
                                                            onClick={() => handleCancelOrder(order.id)}
                                                            className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-100 transition-all flex items-center gap-1.5"
                                                        >
                                                            <FiTrash2 className="w-3.5 h-3.5" /> Cancel Order
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center flex flex-col items-center">
                                        <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <FiShoppingBag className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                                        <p className="text-gray-500 font-medium max-w-sm mb-6">Looks like you haven't placed any orders with us yet. Discover our amazing products!</p>
                                        <Link href="/product" className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors">
                                            Start Shopping
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