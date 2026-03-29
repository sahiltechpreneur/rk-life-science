"use client"

import { createContext, useState, useEffect } from "react"

import API from "@/lib/api"

export const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token")
            
            if (token) {
                try {
                    const res = await API.get("/user/profile", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    // Merge token with profile data
                    setUser({ token, ...res.data })
                } catch (e: any) {
                    console.error("Auth initialization issue:", e.response?.data?.error || e.message)
                    // Only log out if the token is explicitly rejected by the server
                    if (e.response?.status === 401 || e.response?.status === 403) {
                        localStorage.removeItem("token")
                        setUser(null)
                    } else {
                        // Keep the token for now, maybe it's a temporary 500 error
                        setUser({ token })
                    }
                }
            } else {
                setUser(null)
            }
            
            setLoading(false)
        }
        initAuth()
    }, [])

    const login = (token: any, userData?: any) => {
        localStorage.setItem("token", token)
        setUser({ token, ...userData })
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}