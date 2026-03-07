"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState(null)

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            setUser({ token })
        }

    }, [])

    const login = (token: any) => {
        localStorage.setItem("token", token)
        setUser({ token })
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}