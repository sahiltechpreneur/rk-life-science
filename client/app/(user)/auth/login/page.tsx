"use client"

import { useState } from "react"

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (

        <div className="flex justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 border p-8 rounded-lg"
            >

                <h1 className="text-2xl font-bold text-center">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-green-600 text-white w-full p-2 rounded">
                    Login
                </button>

            </form>

        </div>

    )
}