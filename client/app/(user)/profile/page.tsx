"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

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
  orders: Order[]
}

export default function ProfilePage() {

    const [user, setUser] = useState<User | null>(null)
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    useEffect(() => {
        if (token) fetchProfile()
    }, [token])

    const fetchProfile = async () => {
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
        if (!user) return
        try {
            await API.put("/user/profile", user, {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert("Profile updated successfully")
        } catch (err) {
            console.error(err)
            alert("Failed to update profile")
        }
    }

    const deleteAccount = async () => {
        if (!user) return
        const confirmDelete = confirm("Are you sure you want to delete your account?")
        if (!confirmDelete) return

        try {
            await API.delete("/user/delete", {
                headers: { Authorization: `Bearer ${token}` }
            })
            alert("Account deleted successfully")
            localStorage.removeItem("token")
            window.location.href = "/" // redirect to homepage
        } catch (err) {
            console.error(err)
            alert("Failed to delete account")
        }
    }

    if (!user) return <p className="text-center py-20">Loading...</p>

    return (
        <ProtectedRoute>
            <div className="max-w-xl mx-auto py-20 space-y-6">

                <h1 className="text-3xl font-bold text-primary">
                    Profile
                </h1>

                <input
                    name="fname"
                    value={user.fname}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="First Name"
                />

                <input
                    name="lname"
                    value={user.lname}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Last Name"
                />

                <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                />

                <input
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Phone"
                />

                <div className="flex gap-4">
                    <button
                        onClick={updateProfile}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                        Update Profile
                    </button>

                    <button
                        onClick={deleteAccount}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                    >
                        Delete Account
                    </button>
                </div>

                {/* User Orders */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-4">My Orders</h2>
                    {user.orders && user.orders.length > 0 ? (
                        <table className="w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 border">Order ID</th>
                                    <th className="p-3 border">Total</th>
                                    <th className="p-3 border">Status</th>
                                    <th className="p-3 border">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="p-3 border">#{order.id}</td>
                                        <td className="p-3 border">Rs {order.total}</td>
                                        <td className="p-3 border">{order.status}</td>
                                        <td className="p-3 border">{new Date(order.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500">No orders yet.</p>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    )
}