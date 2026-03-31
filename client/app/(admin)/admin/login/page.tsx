"use client"

import { useContext, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiLock, FiMail, FiArrowLeft, FiShield } from "react-icons/fi"
import API from "@/lib/api"
import { AuthContext } from "@/context/AuthContext"

export default function AdminLogin(){
    const router = useRouter()
    const { login } = useContext(AuthContext)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError("")
        setIsLoading(true)
        
        try {
            const res = await API.post("/auth/login", { email, password })
            
            if (res.data.success && res.data.user.role === 'admin') {
                // Store regular user token for AuthContext
                login(res.data.token, res.data.user)
                
                // Keep the admin flag for AdminClientWrapper
                localStorage.setItem("admin", "true")
                
                router.push("/admin/dashboard")
            } else {
                setError("You do not have administrator permissions.")
                setIsLoading(false)
            }
        } catch (err: any) {
            console.error("Admin Login Error:", err)
            setError(err.response?.data?.error || "Invalid admin credentials")
            setIsLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            
            <div className="w-full max-w-md">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 shadow-2xl relative overflow-hidden">
                    
                    <div className="text-center mb-8 relative z-10">
                        <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                            <FiShield className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-100">Admin Portal</h1>
                        <p className="text-xs text-slate-400 mt-1">Sign in to manage your store</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center mb-5 relative z-10">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                        
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Admin email
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input 
                                    type="email" 
                                    placeholder="admin@rklifescience.com" 
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors placeholder:text-slate-600" 
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)} 
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 text-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors placeholder:text-slate-600" 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)} 
                                    required
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 shadow-lg shadow-emerald-900/20"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>

                        <div className="text-center pt-2">
                            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">
                                <FiArrowLeft className="w-3 h-3" />
                                Return to storefront
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}