"use client"
import { useState } from "react"
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi"

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!form.name.trim() || !form.email.trim() || !form.feedback.trim()) {
      setError("Please fill out all fields.")
      return
    }

    const nameRegex = /^[A-Za-z\s]+$/
    if(!nameRegex.test(form.name)) {
      setError("Name should only contain letters and spaces.")
      return
    }

    if(form.feedback.trim().length < 10) {
      setError("Message must be at least 10 characters.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.")
      return
    }

    setError("")
    setIsSubmitting(true)

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        
        if (data.success) {
            setSuccess("Thanks for reaching out! We'll get back to you soon.")
            setForm({ name: "", email: "", feedback: "" })
        } else {
            setError(data.error || "Failed to send message. Please try again.")
        }
    } catch (err) {
        setError("Network error. Please try again later.")
    } finally {
        setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
            <FiAlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-lg text-sm border border-emerald-100">
            <FiCheckCircle className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">Full name</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400"
              placeholder="John Doe"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-600">Email address</label>
            <input 
              type="email" 
              name="email" 
              value={form.email} 
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400"
              placeholder="hello@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-600">Message</label>
          <textarea 
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400 resize-none"
            placeholder="How can we help you?"
          />
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
          <FiSend className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  )
}