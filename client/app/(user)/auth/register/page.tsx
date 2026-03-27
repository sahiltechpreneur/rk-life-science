"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import { AuthContext } from "@/context/AuthContext"
import Link from "next/link"
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

export default function RegisterPage() {
    const router = useRouter()
    const { login } = useContext(AuthContext)
    const [form, setForm] = useState({
        fname: "", lname: "", email: "", phone: "", password: "", confirm: ""
    })
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        
        if (!otpSent) {
            const nameRegex = /^[A-Za-z]+$/
            if (!nameRegex.test(form.fname) || !nameRegex.test(form.lname)) {
                setError("Names must contain only letters.")
                return
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(form.email)) {
                setError("Please enter a valid email address.")
                return
            }

            if (form.password.length < 6) {
                setError("Password must be at least 6 characters.")
                return
            }

            if (form.password !== form.confirm) {
                setError("Passwords do not match.")
                return
            }

            if (!/^9[87]\d{8}$/.test(form.phone)) {
                setError("Phone must start with 98 or 97 and be 10 digits.")
                return
            }

            setIsLoading(true)
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-register-otp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: form.email, fname: form.fname })
                })
                const data = await res.json()
                if (data.success) {
                    setOtpSent(true)
                } else {
                    setError(data.error || "Failed to send OTP. Email may be in use.")
                }
            } catch (err) {
                setError("Network error. Please try again.")
            } finally {
                setIsLoading(false)
            }
            return
        }

        // Final registration step
        if (!otp || otp.length < 6) {
            setError("Please enter the 6-digit OTP.")
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, otp })
            })
            const data = await res.json()
            if (data.success) {
                login(data.token || "dummy_token", data.user)
                router.push("/")
            } else {
                setError(data.error || "Registration failed. Invalid OTP.")
            }
        } catch (err) {
            setError("Network error. Please try again.")
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
                            <FiUser className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {otpSent ? "Verify your email" : "Create account"}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {otpSent ? `Enter the 6-digit code sent to ${form.email}` : "Join us to start shopping"}
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
                            <FiAlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!otpSent ? (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">First name</label>
                                        <input 
                                            required 
                                            name="fname" 
                                            placeholder="John" 
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Last name</label>
                                        <input 
                                            required 
                                            name="lname" 
                                            placeholder="Doe" 
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email address</label>
                                    <div className="relative">
                                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input 
                                            required 
                                            name="email" 
                                            type="email" 
                                            placeholder="hello@example.com" 
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone number</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input 
                                            required 
                                            name="phone" 
                                            placeholder="98XXXXXXXX" 
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
                                    <div className="relative">
                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input 
                                            required 
                                            name="password" 
                                            type="password" 
                                            placeholder="••••••••" 
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Confirm password</label>
                                    <input 
                                        required 
                                        name="confirm" 
                                        type="password" 
                                        placeholder="••••••••" 
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    />
                                </div>
                            </>
                        ) : (
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">Verification code</label>
                                <input 
                                    required 
                                    type="text"
                                    maxLength={6}
                                    placeholder="123456" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    className="w-full text-center tracking-[0.3em] text-lg font-mono px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                />
                                <p className="text-xs text-gray-400 text-center mt-2">
                                    Check your email for the 6-digit code
                                </p>
                            </div>
                        )}

                        <button 
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    {otpSent ? "Verifying..." : "Sending code..."}
                                </>
                            ) : (
                                <>
                                    {otpSent ? "Verify & create account" : "Continue"}
                                    {otpSent ? <FiCheckCircle className="w-3.5 h-3.5" /> : <FiArrowRight className="w-3.5 h-3.5" />}
                                </>
                            )}
                        </button>
                    </form>
                    
                    <p className="text-center text-xs text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}