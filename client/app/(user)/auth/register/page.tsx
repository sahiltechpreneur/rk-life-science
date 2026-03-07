"use client"

import { useState } from "react"

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
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const phoneRegex = /^(98|97)[0-9]{8}$/

        if (!phoneRegex.test(form.phone)) {
            alert("Phone must start with 98 or 97")
            return
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        console.log(form)
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

                <input name="fname" placeholder="First Name" className="w-full border p-2" />
                <input name="lname" placeholder="Last Name" className="w-full border p-2" />
                <input name="email" placeholder="Email" className="w-full border p-2" />
                <input name="phone" placeholder="Phone" className="w-full border p-2" />
                <input type="password" name="password" placeholder="Password" className="w-full border p-2" />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full border p-2" />

                <button className="bg-green-600 text-white w-full p-2 rounded">
                    Register
                </button>

            </form>

        </div>

    )
}