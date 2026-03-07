"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"

export default function RegisterPage() {

    const router = useRouter()
    const { login } = useContext(AuthContext)
    const [form, setForm] = useState({
        fname: "", lname: "", email: "", phone: "", password: "", confirm: ""
    })
    const [error, setError] = useState("")

    const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e: any) => {
        e.preventDefault() // prevent page reload
        setError("")
        
        if (form.password !== form.confirm) {
            setError("Passwords do not match")
            return
        }

        if (!/^9[87]\d{8}$/.test(form.phone)) {
            setError("Phone must start with 98 or 97 and 10 digits")
            return
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (data.success) {
                login(data.token || "dummy_token", data.user)
                router.push("/")
            } else {
                setError(data.error || "Failed to register")
            }
        } catch (err) {
            setError("Registration failed due to network error.")
        }
    }

    return (
        <div className="flex justify-center items-center py-20 min-h-screen bg-gray-50 bg-gradient-to-tl from-green-50 to-primary/10">

            <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-primary">
                            Create Account
                        </h1>
                        <p className="text-gray-500 mt-2 text-sm">Join R. K. Life Science today.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">First Name</label>
                            <input name="fname" placeholder="John" onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Last Name</label>
                            <input name="lname" placeholder="Doe" onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Email Address</label>
                        <input name="email" type="email" placeholder="john@example.com" onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                        <input name="phone" placeholder="98XXXXXXXX" onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                            <input name="password" type="password" placeholder="••••••••" onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                            <input name="confirm" type="password" placeholder="••••••••" onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" required />
                        </div>
                    </div>

                    <button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold w-full py-3 mt-4 rounded-lg shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
                        Register Account
                    </button>
                    
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                            Login here
                        </Link>
                    </p>

                </form>
            </div>

        </div>
    )
}