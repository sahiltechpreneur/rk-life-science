"use client"

import { useEffect, useState } from "react"
import API from "@/lib/api"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function ProfilePage() {

    const [user, setUser] = useState<any>(null)

    const token = localStorage.getItem("token")

    useEffect(() => {

        fetchProfile()

    }, [])

    const fetchProfile = async () => {

        const res = await API.get(
            "/user/profile",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        setUser(res.data)
    }

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const updateProfile = async () => {

        await API.put(
            "/user/profile",
            user,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        alert("Profile updated")
    }

    const deleteAccount = async () => {

        await API.delete(
            "/user/delete",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        alert("Account deleted")
    }

    if (!user) return <p>Loading...</p>

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
                    className="w-full border p-2"
                />

                <input
                    name="lname"
                    value={user.lname}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <input
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <input
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full border p-2"
                />

                <button
                    onClick={updateProfile}
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Update Profile
                </button>

                <button
                    onClick={deleteAccount}
                    className="bg-red-500 text-white px-6 py-2 rounded"
                >
                    Delete Account
                </button>

                <div className="mt-10">

                    <h2 className="text-xl font-semibold">
                        My Orders
                    </h2>

                    <p className="text-gray-500">
                        Orders will appear here
                    </p>

                </div>

            </div>
        </ProtectedRoute>
    )
}