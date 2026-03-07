"use client"

import { useEffect, useState, useContext } from "react"
import API from "@/lib/api"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { AuthContext } from "@/context/AuthContext"

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

    useEffect(() => {
        if (authUser?.token) fetchProfile(authUser.token)
    }, [authUser])

    const fetchProfile = async (token: string) => {
        try {
            const res = await API.get("/user/profile", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUser(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const updateProfile = async () => {
        if (!user || !authUser?.token) return
        try {
            await API.put("/user/profile", user, {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            alert("Profile updated successfully")
        } catch (err) {
            console.error(err)
            alert("Failed to update profile")
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
            
            // Update local state
            setUser({ ...user, image: newImageUrl })
            
            // Update global auth context so Navbar updates automatically
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
        const confirmDelete = confirm("Are you sure you want to delete your account?")
        if (!confirmDelete) return

        try {
            await API.delete("/user/delete", {
                headers: { Authorization: `Bearer ${authUser.token}` }
            })
            alert("Account deleted successfully")
            logout()
            window.location.href = "/" // redirect to homepage
        } catch (err) {
            console.error(err)
            alert("Failed to delete account")
        }
    }

    return (
        <ProtectedRoute>
            {user ? (
            <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">

                <div className="flex items-center justify-between border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Dashboard
                    </h1>
                    <button
                        onClick={logout}
                        className="text-red-600 font-medium hover:bg-red-50 px-4 py-2 rounded transition"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    
                    {/* Left Column: Profile Card */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                            
                            <div className="relative group w-32 h-32 mb-4">
                                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 border-4 border-primary/20 shadow-inner">
                                    {user.image ? (
                                        <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-4xl">
                                            {user.fname?.charAt(0) || "👤"}
                                        </div>
                                    )}
                                </div>
                                
                                <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity duration-300">
                                    <span className="text-sm font-semibold">{uploadingImage ? "..." : "Upload"}</span>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleImageUpload} 
                                        disabled={uploadingImage}
                                    />
                                </label>
                            </div>
                            
                            <h2 className="text-xl font-bold text-gray-800">{user.fname} {user.lname}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                            
                            <div className="w-full border-t my-4"></div>
                            
                            <button
                                onClick={deleteAccount}
                                className="text-sm text-red-500 hover:text-red-700 hover:underline w-full py-2"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Settings & Orders */}
                    <div className="md:col-span-2 space-y-8">
                        
                        {/* Account Settings */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h3>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">First Name</label>
                                    <input
                                        name="fname"
                                        value={user.fname}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Last Name</label>
                                    <input
                                        name="lname"
                                        value={user.lname}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Email Address</label>
                                    <input
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition bg-gray-50"
                                        disabled // Usually shouldn't change email easily
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-600">Phone Number</label>
                                    <input
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                                    />
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={updateProfile}
                                    className="bg-primary text-white px-6 py-2.5 rounded-lg shadow hover:bg-secondary hover:shadow-lg transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Order History */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Order History</h3>
                            
                            {user.orders && user.orders.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-gray-600">
                                        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 rounded-tl-lg">Order ID</th>
                                                <th className="px-4 py-3">Date</th>
                                                <th className="px-4 py-3">Amount</th>
                                                <th className="px-4 py-3 rounded-tr-lg">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user.orders.map((order) => (
                                                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                                                    <td className="px-4 py-3 font-medium text-gray-900">#{order.id}</td>
                                                    <td className="px-4 py-3">{new Date(order.created_at).toLocaleDateString()}</td>
                                                    <td className="px-4 py-3 font-medium text-gray-900">Rs {order.total}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                                                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <span className="text-4xl mb-2 block">📦</span>
                                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                                    <a href="/" className="text-primary font-medium hover:underline">Start shopping</a>
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
            ) : (
                <div className="flex justify-center items-center py-32 space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div className="w-3 h-3 bg-primary rounded-full animation-delay-200"></div>
                    <div className="w-3 h-3 bg-primary rounded-full animation-delay-400"></div>
                </div>
            )}
        </ProtectedRoute>
    )
}