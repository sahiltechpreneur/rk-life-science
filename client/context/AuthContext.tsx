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
            const isAdminFlag = localStorage.getItem("admin") === "true"
            
            if (token) {
                try {
                    const res = await API.get("/user/profile", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    // Ensure admin flag is synced if the role is admin
                    if (res.data.role === 'admin') localStorage.setItem("admin", "true")
                    
                    setUser({ token, ...res.data })
                } catch (e: any) {
                    console.error("Auth initialization issue:", e.response?.data?.error || e.message)
                    // If server explicitly rejects, clear the session
                    if (e.response?.status === 401 || e.response?.status === 403) {
                        localStorage.removeItem("token")
                        if (!isAdminFlag) setUser(null)
                        else setUser({ role: 'admin' }) // Fallback for portal access
                    } else {
                        // Network error, keep existing state if possible
                        setUser({ token, role: isAdminFlag ? 'admin' : 'user' })
                    }
                }
            } else if (isAdminFlag) {
                // Legacy Portal support
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