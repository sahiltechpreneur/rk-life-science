"use client"

import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: any }) {

    const { user } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {

        if (!user) {
            router.push("/auth/login")
        }

    }, [user])

    return children
}