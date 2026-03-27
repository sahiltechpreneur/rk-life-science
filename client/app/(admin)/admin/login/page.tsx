"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiLock, FiMail, FiArrowLeft, FiShield } from "react-icons/fi"

export default function AdminLogin(){
    const router = useRouter()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError("")
        setIsLoading(true)
        
        const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

        setTimeout(() => {
            if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
                localStorage.setItem("admin","true")
                router.push("/admin/dashboard")
            } else {
                setError("Invalid admin credentials")
                setIsLoading(false)
            }
        }, 500)
    }

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                    
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <FiShield className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">Admin Portal</h1>
                        <p className="text-xs text-gray-500 mt-1">Sign in to manage your store</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm text-center mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                Admin email
                            </label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input 
                                    type="email" 
                                    placeholder="admin@rklifescience.com" 
                                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)} 
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors" 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)} 
                                    required
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>

                        <div className="text-center pt-2">
                            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
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