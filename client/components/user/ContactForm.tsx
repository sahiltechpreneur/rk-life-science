"use client"
import { useState } from "react"
import { FiSend } from "react-icons/fi"

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
      setError("Please fill out all required fields.")
      return
    }

    const nameRegex = /^[A-Za-z\s]+$/
    if(!nameRegex.test(form.name)) {
      setError("Name must contain only letters and spaces.")
      return
    }

    if(form.feedback.trim().length < 10) {
      setError("Your message must be at least 10 characters long.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false)
        setSuccess("Message sent successfully! We will get back to you soon.")
        setForm({ name: "", email: "", feedback: "" })
    }, 1500)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {error && (
            <div className="bg-red-50 text-red-500 px-5 py-4 rounded-xl font-bold flex items-center border border-red-100">
                {error}
            </div>
        )}
        
        {success && (
            <div className="bg-primary/10 text-primary px-5 py-4 rounded-xl font-bold flex items-center border border-primary/20">
                {success}
            </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium placeholder:text-gray-400"
                    placeholder="John Doe"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <input 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium placeholder:text-gray-400"
                    placeholder="john@example.com"
                />
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Your Message</label>
            <textarea 
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium placeholder:text-gray-400 resize-none"
                placeholder="How can we help you?"
            ></textarea>
        </div>
        
        <button 
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full md:w-auto md:ml-auto flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary'}`}
        >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <FiSend className={isSubmitting ? 'animate-pulse' : ''} />
        </button>
      </form>
    </div>
  )
}