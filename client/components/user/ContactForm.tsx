"use client"
import { useState } from "react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function ContactForm() {

  const [form, setForm] = useState({ name: "", email: "", feedback: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if(!form.name.trim() || !form.email.trim() || !form.feedback.trim()) {
      setError("All fields are required")
      return
    }

    const nameRegex = /^[A-Za-z\s]+$/
    if(!nameRegex.test(form.name)) {
      setError("Name must contain only letters and spaces.")
      return
    }

    if(form.feedback.trim().length < 10) {
      setError("Feedback must be at least 10 characters long.")
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(form.email)) {
      setError("Invalid email address")
      return
    }

    setError("")

    // TODO: send to backend API
    console.log("Form submitted:", form)
    setSuccess("Feedback submitted successfully")
    setForm({ name: "", email: "", feedback: "" })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <Input placeholder="Your Name" type="text" name="name" value={form.name} onChange={handleChange} />
        <Input placeholder="Email Address" type="email" name="email" value={form.email} onChange={handleChange} />
        <textarea 
          name="feedback"
          placeholder="Your Feedback"
          value={form.feedback}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
        <Button text="Submit Feedback" />
      </form>
    </div>
  )
}