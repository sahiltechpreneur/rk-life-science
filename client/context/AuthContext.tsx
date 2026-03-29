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
            const isAdmin = localStorage.getItem("admin") === "true"
            
            if (token) {
                try {
                    const res = await API.get("/user/profile", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    // Merge token with profile data and admin status
                    setUser({ token, role: isAdmin ? 'admin' : res.data.role, ...res.data })
                } catch (e: any) {
                    console.error("Auth initialization issue:", e.response?.data?.error || e.message)
                    // Only log out if the token is explicitly rejected by the server
                    if (e.response?.status === 401 || e.response?.status === 403) {
                        localStorage.removeItem("token")
                        // If token fails, but they have admin flag, maybe they are still an admin via portal
                        setUser(isAdmin ? { role: 'admin' } : null)
                    } else {
                        // Keep the token for now, maybe it's a temporary 500 error
                        setUser({ token, role: isAdmin ? 'admin' : 'user' })
                    }
                }
            } else if (isAdmin) {
                // Admin Portal session (no token yet)
                setUser({ role: 'admin' })
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
        localStorage.removeItem("admin")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}