"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useNotification } from "@/context/NotificationContext"
import { FiMail, FiLock, FiArrowRight, FiCheckCircle } from "react-icons/fi"

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
                const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: form.email })
                })
                const data = await res.json()
                if (data.success) {
                    setOtpSent(true)
                    setSuccessMsg("An OTP has been sent to your email.")
                } else {
                    setError(data.error || "Failed to send OTP.")
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
            setError("Please enter the 6-digit OTP.")
            return
        }

        if (form.newPassword.length < 6) {
            setError("Password must be at least 6 characters long.")
            return
        }

        if (form.newPassword !== form.confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setIsLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, otp, newPassword: form.newPassword })
            })
            const data = await res.json()
            if (data.success) {
                showNotification("Password reset successfully! You can now log in.", "success")
                router.push("/auth/login")
            } else {
                setError(data.error || "Failed to reset password. Invalid OTP.")
            }
        } catch (err) {
            setError("Network error. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center py-20 min-h-[90vh] bg-gray-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-gray-50 to-gray-50 px-4">

            <div className="w-full max-w-lg bg-white shadow-2xl rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white mb-6 shadow-lg shadow-blue-500/20 transform -rotate-6">
                            <FiLock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 mb-2">
                            Reset Password
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {otpSent ? `Enter the OTP sent to ${form.email}` : "Enter your email to receive a reset code."}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                            {error}
                        </div>
                    )}

                    {successMsg && !error && (
                        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl text-sm font-bold border border-emerald-100 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                            {successMsg}
                        </div>
                    )}

                    {!otpSent ? (
                        <div className="relative">
                            <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <FiMail className="w-5 h-5" />
                            </div>
                            <input required name="email" type="email" placeholder="john@example.com" onChange={handleChange} className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium" />
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in slide-in-from-right duration-500">
                            <div className="relative">
                                <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">One Time Password</label>
                                <input 
                                    required 
                                    type="text"
                                    maxLength={6}
                                    placeholder="123456" 
                                    value={otp} 
                                    onChange={(e) => setOtp(e.target.value)} 
                                    className="w-full text-center tracking-[0.5em] text-2xl font-black bg-white border border-gray-200 text-gray-900 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                                />
                            </div>

                            <div className="relative mt-6">
                                <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">New Password</label>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <FiLock className="w-5 h-5" />
                                </div>
                                <input required name="newPassword" type="password" placeholder="••••••••" onChange={handleChange} className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium" />
                            </div>

                            <div className="relative">
                                <label className="absolute -top-2 left-4 px-1 bg-white text-[10px] font-bold uppercase tracking-wider text-gray-400">Confirm Password</label>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <FiLock className="w-5 h-5" />
                                </div>
                                <input required name="confirmPassword" type="password" placeholder="••••••••" onChange={handleChange} className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium" />
                            </div>
                        </div>
                    )}

                    <button 
                        disabled={isLoading}
                        className="group relative w-full flex items-center justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gray-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 mt-8 disabled:opacity-70 disabled:hover:transform-none"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                {otpSent ? "Resetting..." : "Sending OTP..."}
                            </span>
                        ) : (
                            <span className="flex items-center">
                                {otpSent ? "Reset Password" : "Send Reset Link"}
                                {otpSent ? <FiCheckCircle className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" /> : <FiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </span>
                        )}
                    </button>
                    
                    <p className="text-center text-sm font-medium text-gray-500 mt-8">
                        Remember your password?{" "}
                        <Link href="/auth/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors border-b-2 border-blue-600/20 hover:border-blue-600 pb-0.5">
                            Sign in here
                        </Link>
                    </p>

                </form>
            </div>

        </div>
    )
}
