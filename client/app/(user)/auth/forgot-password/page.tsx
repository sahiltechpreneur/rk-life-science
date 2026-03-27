"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useNotification } from "@/context/NotificationContext"
import { FiMail, FiLock, FiArrowRight, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

export default function ForgotPasswordPage() {
    const router = useRouter()
    const { showNotification } = useNotification()
    const [form, setForm] = useState({
        email: "", newPassword: "", confirmPassword: ""
    })
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccessMsg("")
        
        if (!otpSent) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(form.email)) {
                setError("Please enter a valid email address.")
                return
            }

            setIsLoading(true)
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: form.email })
                })
                const data = await res.json()
                if (data.success) {
                    setOtpSent(true)
                    setSuccessMsg("Check your email for the verification code.")
                } else {
                    setError(data.error || "Failed to send code. Email may not be registered.")
                }
            } catch (err) {
                setError("Network error. Please try again.")
            } finally {
                setIsLoading(false)
            }
            return
        }

        // Final reset step
        if (!otp || otp.length < 6) {
            setError("Please enter the 6-digit verification code.")
            return
        }

        if (form.newPassword.length < 6) {
            setError("Password must be at least 6 characters.")
            return
        }

        if (form.newPassword !== form.confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, otp, newPassword: form.newPassword })
            })
            const data = await res.json()
            if (data.success) {
                showNotification("Password reset successful! Please log in.", "success")
                router.push("/auth/login")
            } else {
                setError(data.error || "Invalid or expired verification code.")
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
                            <FiLock className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Reset password
                        </h1>
                        <p className="text-sm text-gray-500">
                            {otpSent ? `Enter the 6-digit code sent to ${form.email}` : "Enter your email to receive a reset code"}
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
                            <FiAlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {successMsg && !error && (
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 p-3 rounded-lg text-sm mb-6">
                            <FiCheckCircle className="w-4 h-4 shrink-0" />
                            <span>{successMsg}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!otpSent ? (
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Email address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input 
                                        required 
                                        name="email" 
                                        type="email" 
                                        placeholder="hello@example.com" 
                                        onChange={handleChange}
                                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                        Verification code
                                    </label>
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

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                        New password
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input 
                                            required 
                                            name="newPassword" 
                                            type="password" 
                                            placeholder="••••••••" 
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                        Confirm password
                                    </label>
                                    <div className="relative">
                                        <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input 
                                            required 
                                            name="confirmPassword" 
                                            type="password" 
                                            placeholder="••••••••" 
                                            onChange={handleChange}
                                            className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <button 
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    {otpSent ? "Resetting..." : "Sending code..."}
                                </>
                            ) : (
                                <>
                                    {otpSent ? "Reset password" : "Send reset code"}
                                    {otpSent ? <FiCheckCircle className="w-3.5 h-3.5" /> : <FiArrowRight className="w-3.5 h-3.5" />}
                                </>
                            )}
                        </button>
                    </form>
                    
                    <p className="text-center text-xs text-gray-500 mt-6">
                        Remember your password?{" "}
                        <Link href="/auth/login" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                            Back to sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}