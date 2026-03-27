"use client"

import { useContext, useState } from "react"
import API from "@/lib/api"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from "react-icons/fi"

export default function LoginPage() {

    const { login } = useContext(AuthContext)
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.")
            setIsLoading(false)
            return
        }

        try {
            const res = await API.post("/auth/login", {
                email,
                password
            })
            login(res.data.token, res.data.user)
            router.push("/")
        } catch (err) {
            setError("Invalid email or password. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24 pb-16">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <FiLock className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome back
                        </h1>
                        <p className="text-sm text-gray-500">
                            Sign in to your account
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
                            <FiAlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                Email address
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    required
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-medium text-gray-600">
                                    Password
                                </label>
                                <Link 
                                    href="/auth/forgot-password" 
                                    className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <FiArrowRight className="w-3.5 h-3.5" />
                                </>
                            )}
                        </button>
                    </form>
                    
                    <p className="text-center text-xs text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}