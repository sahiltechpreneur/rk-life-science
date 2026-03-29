"use client"

import { useEffect, useState, useContext } from "react"
import API from "@/lib/api"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { AuthContext } from "@/context/AuthContext"
import { useNotification } from "@/context/NotificationContext"
import { 
  FiUser, FiMail, FiPhone, FiEdit2, FiCamera, FiPackage, 
  FiLogOut, FiTrash2, FiClock, FiCheckCircle, FiTruck, 
  FiShoppingBag, FiAlertCircle, FiCreditCard, FiArrowRight 
} from "react-icons/fi"
import Link from "next/link"

type Order = {
  id: number
  total: number
  status: string
  created_at: string
  payment_method: string
  payment_status: string
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
    const { user: authUser, loading: authLoading, logout, login } = useContext(AuthContext)
    const { showNotification } = useNotification()
    
    const [user, setUser] = useState<User | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Redirect if definitely not logged in
    useEffect(() => {
        if (!authLoading && !authUser) {
            window.location.href = "/auth/login"
        }
    }, [authUser, authLoading])

    // Fetch profile data when auth is ready
    useEffect(() => {
        if (authUser?.token) {
            fetchProfileData(authUser.token)
        }
    }, [authUser?.token])

    const fetchProfileData = async (token: string) => {
        setIsFetching(true)
        setError(null)
        try {
            const res = await API.get("/user/profile", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUser(res.data)
        } catch (err: any) {
            console.error("Profile Fetch Error:", err)
            const msg = err.response?.data?.error || "Unable to load profile data."
            setError(msg)
            
            if (err.response?.status === 401) {
                logout()
                window.location.href = "/auth/login"
            }
        } finally {
            setIsFetching(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleUpdateProfile = async () => {
        if (!user || !authUser?.token) return
        setIsSaving(true)
        try {
            await API.put("/user/profile", {
                fname: user.fname,
                lname: user.lname,
                phone: user.phone
            }, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            showNotification("Profile updated successfully", "success")
        } catch (err: any) {
            showNotification(err.response?.data?.error || "Update failed", "error")
        } finally {
            setIsSaving(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0] || !authUser?.token) return
        
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        
        setUploadingImage(true)
        try {
            const res = await API.put("/user/profile-image", formData, {
                headers: { 
                    Authorization: `Bearer ${authUser.token}`,
                    "Content-Type": "multipart/form-data" 
                }
            })
            
            const newUrl = res.data.imageUrl
            if (user) setUser({ ...user, image: newUrl })
            
            // Sync with AuthContext so header updates
            login(authUser.token, { ...authUser, image: newUrl })
            
            showNotification("Profile photo updated", "success")
        } catch (err: any) {
            showNotification("Failed to upload photo", "error")
        } finally {
            setUploadingImage(false)
        }
    }

    const handleCancelOrder = async (orderId: number) => {
        if (!authUser?.token || !confirm("Are you sure you want to cancel this order?")) return

        try {
            await API.put(`/orders/${orderId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            showNotification("Order cancelled", "success")
            fetchProfileData(authUser.token)
        } catch (err: any) {
            showNotification(err.response?.data?.error || "Cancel failed", "error")
        }
    }

    // Helper for order status styling
    const getStatusTheme = (status: string) => {
        const s = status.toLowerCase()
        if (s === 'delivered') return 'bg-emerald-50 text-emerald-700 border-emerald-100'
        if (s === 'shipped') return 'bg-blue-50 text-blue-700 border-blue-100'
        if (s === 'processing') return 'bg-indigo-50 text-indigo-700 border-indigo-100'
        if (s === 'cancelled') return 'bg-red-50 text-red-700 border-red-100'
        return 'bg-amber-50 text-amber-700 border-amber-100' // Pending
    }

    // --- RENDER STATES ---

    if (authLoading || (isFetching && !user)) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4" />
                <h2 className="text-lg font-bold text-gray-900">Syncing your account</h2>
                <p className="text-gray-500 text-sm max-w-xs mt-1">Please wait while we verify your session and fetch your latest data.</p>
            </div>
        )
    }

    if (error && !user) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-6 border border-red-100 shadow-sm">
                    <FiAlertCircle className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Session initialization failed</h2>
                <p className="text-gray-500 text-sm max-w-sm mt-2 mb-8">{error}</p>
                <div className="flex gap-3">
                    <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">Retry</button>
                    <button onClick={logout} className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all">Sign Out</button>
                </div>
            </div>
        )
    }

    if (!user) return null

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50/50 pt-28 pb-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full -translate-y-32 translate-x-32 blur-3xl pointer-events-none" />
                        
                        <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-1 shadow-lg">
                                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                                        {user.image ? (
                                            <img src={user.image} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl font-bold text-emerald-600 uppercase">
                                                {user.fname[0]}{user.lname[0]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center shadow-md cursor-pointer hover:bg-emerald-50 transition-colors text-emerald-600">
                                    {uploadingImage ? <div className="w-3 h-3 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" /> : <FiCamera className="w-4 h-4" />}
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                                </label>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-black text-gray-900 leading-tight">
                                            {user.fname} {user.lname}
                                        </h1>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5"><FiMail className="w-4 h-4 text-emerald-500" /> {user.email}</span>
                                            <span className="flex items-center gap-1.5"><FiPhone className="w-4 h-4 text-emerald-500" /> {user.phone}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={logout}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-xs font-bold rounded-xl hover:bg-red-100 transition-all active:scale-95"
                                    >
                                        <FiLogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        
                        {/* Edit Profile */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <FiUser className="text-emerald-500" />
                                    Account Settings
                                </h2>
                                
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">First Name</label>
                                            <input name="fname" value={user.fname} onChange={handleChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Last Name</label>
                                            <input name="lname" value={user.lname} onChange={handleChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                                        <input name="phone" value={user.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" />
                                    </div>
                                    
                                    <button 
                                        onClick={handleUpdateProfile}
                                        disabled={isSaving}
                                        className="w-full bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold mt-2 shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                                    >
                                        {isSaving ? "Saving changes..." : "Save Profile Details"}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-red-50/50 rounded-3xl border border-red-100 p-6 flex flex-col items-center text-center">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm mb-3">
                                    <FiTrash2 className="w-5 h-5" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900">Danger Zone</h3>
                                <p className="text-xs text-gray-500 mt-1 mb-4">Permanently remove your account and all associated data.</p>
                                <button className="text-xs font-bold text-red-600 hover:text-red-700 underline" onClick={() => { if(confirm("Permanently delete your account?")) { /* delete logic */ }}}>Delete Account</button>
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm transition-all">
                                <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30 rounded-t-3xl">
                                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <FiPackage className="text-emerald-500" />
                                        Order History
                                    </h2>
                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-wider">
                                        {user.orders?.length || 0} Total
                                    </span>
                                </div>

                                <div className="p-2">
                                    {user.orders && user.orders.length > 0 ? (
                                        <div className="space-y-1">
                                            {user.orders.map((order) => (
                                                <div key={order.id} className="p-6 hover:bg-gray-50 rounded-2xl transition-all group border-b border-gray-50 last:border-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors shrink-0">
                                                                {order.payment_method === 'eSewa' ? <FiCreditCard className="w-5 h-5" /> : <FiTruck className="w-5 h-5" />}
                                                            </div>
                                                            <div>
                                                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                                    <span className="font-black text-gray-900 text-sm italic">RK#{order.id}</span>
                                                                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${getStatusTheme(order.status)}`}>
                                                                        {order.status}
                                                                    </span>
                                                                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${order.payment_status === 'Paid' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-gray-100 text-gray-400 border-gray-100'}`}>
                                                                        {order.payment_status}
                                                                    </span>
                                                                </div>
                                                                <p className="text-[11px] text-gray-400 font-medium">
                                                                    Placed on {new Date(order.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center justify-between sm:justify-end gap-6 sm:text-right border-t sm:border-0 pt-4 sm:pt-0">
                                                            <div>
                                                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total Paid</span>
                                                                <span className="text-lg font-black text-emerald-600">NPR {Number(order.total).toLocaleString()}</span>
                                                            </div>
                                                            {order.status.toLowerCase() === 'pending' && (
                                                                <button 
                                                                    onClick={() => handleCancelOrder(order.id)}
                                                                    className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            )}
                                                            <FiArrowRight className="text-gray-200 group-hover:text-emerald-400 transition-all translate-x-0 group-hover:translate-x-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center flex flex-col items-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-200 mb-4">
                                                <FiShoppingBag className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">Your bag is empty</h3>
                                            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-8 mt-1">Looks like you haven't placed any orders yet. Explore our high-quality medical supplies.</p>
                                            <Link href="/product" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white text-sm font-bold rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95">
                                                Start Shopping
                                                <FiArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </ProtectedRoute>
    )
}