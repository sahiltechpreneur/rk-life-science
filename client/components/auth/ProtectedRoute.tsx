"use client"

import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: any }) {

    const { user, loading } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {

        if (!loading && !user) {
            router.push("/auth/login")
        }

    }, [user, loading, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4" />
                <p className="text-sm font-bold text-gray-900">Verifying session...</p>
            </div>
        )
    }

    if (!user) return null

    return children
}