"use client"

import { useContext, useState } from "react"
import API from "@/lib/api"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"

export default function LoginPage() {

    const { login } = useContext(AuthContext)
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError("") // Clear errors

        try {
            const res = await API.post("/auth/login", {
                email,
                password
            })
            login(res.data.token, res.data.user)
            router.push("/")
        } catch (err) {
            setError("Invalid login credentials")
        }
    }

    return (

        <div className="flex justify-center items-center min-h-screen bg-gray-50 bg-gradient-to-br from-green-50 to-primary/10">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-primary">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">Please enter your details to sign in</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            placeholder="xyz@example.com"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            <a href="#" className="hidden text-xs text-primary hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold w-full py-3 rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
                        Sign In
                    </button>
                    
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="text-primary font-semibold hover:underline">
                            Register here
                        </Link>
                    </p>

                </form>
            </div>

        </div>

    )
}