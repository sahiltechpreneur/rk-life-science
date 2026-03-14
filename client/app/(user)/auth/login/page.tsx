"use client"

import { useContext, useState } from "react"
import API from "@/lib/api"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi"

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
        <div className="flex justify-center items-center min-h-[90vh] bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-gray-50 to-gray-50 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white mb-6 shadow-lg shadow-emerald-500/20 transform -rotate-6">
                            <FiLock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 font-medium">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative">
                            <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <FiMail className="w-5 h-5" />
                            </div>
                            <input
                                required
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute -top-6 right-2">
                                <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Forgot password?</a>
                            </div>
                            <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">Password</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <FiLock className="w-5 h-5" />
                            </div>
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button 
                        disabled={isLoading}
                        className="group relative w-full flex items-center justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gray-900 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:transform-none"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                Signing in...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                Sign In
                                <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </button>
                    
                    <p className="text-center text-sm font-medium text-gray-500 mt-8">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors border-b-2 border-emerald-600/20 hover:border-emerald-600 pb-0.5">
                            Create one now
                        </Link>
                    </p>

                </form>
            </div>

        </div>

    )
}