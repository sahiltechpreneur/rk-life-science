"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLogin(){
    const router = useRouter()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setError("")
        
        const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

        if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
            localStorage.setItem("admin","true")
            router.push("/admin/dashboard")
        } else {
            setError("Invalid admin credentials")
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
            
            <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-10 border border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6" >
                    
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/50 shadow-inner">
                            <span className="text-primary text-2xl">🔒</span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Portal</h1>
                        <p className="text-gray-400 mt-2 text-sm">Sign in to manage R. K. Life Science</p>
                    </div>

                    {error && (
                        <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">Admin Email</label>
                        <input 
                            type="email" 
                            placeholder="xyz@rk.com" 
                            className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-500" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-300">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-gray-900 border border-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-500" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)} 
                        />
                    </div>
                    
                    <button className="bg-primary hover:bg-secondary text-white font-bold tracking-wide w-full py-3 mt-4 rounded-lg shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 border border-primary/50">
                        Authorize Access
                    </button>

                    <div className="text-center mt-6">
                        <Link href="/" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                            &larr; Return to Storefront
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}