"use client"

import { useState } from "react"
import API from "@/lib/api"

export default function RegisterPage() {

    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e: any) => {
        console.log("Typing in:", e.target.name, "Value:", e.target.value); // Add this line
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const phoneRegex = /^(98|97)[0-9]{8}$/

        if (!phoneRegex.test(form.phone.trim())) {
            alert("Phone must start with 98 or 97")
            return
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        try {

            await API.post("/auth/register", {
                fname: form.fname,
                lname: form.lname,
                email: form.email,
                phone: form.phone,
                password: form.password
            })

            alert("Account created successfully")

        } catch (err) {
            alert("Registration failed")
        }

    }

    return (

        <div className="flex justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 border p-8 rounded-lg"
            >

                <h1 className="text-2xl font-bold text-center">
                    Create Account
                </h1>

                <input name="fname" placeholder="First Name" className="w-full border p-2" value={form.fname} onChange={handleChange} />
                <input name="lname" placeholder="Last Name" className="w-full border p-2" value={form.lname} onChange={handleChange} />
                <input name="email" placeholder="Email" className="w-full border p-2" value={form.email} onChange={handleChange} />
                <input name="phone" placeholder="Phone" className="w-full border p-2" value={form.phone} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" className="w-full border p-2" value={form.password} onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full border p-2" value={form.confirmPassword} onChange={handleChange} />

                <button className="bg-green-600 text-white w-full p-2 rounded">
                    Register
                </button>

            </form>

        </div>

    )
}