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
        return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-gray-600">Loading...</p></div>
    }

    if (!user) return null

    return children
}