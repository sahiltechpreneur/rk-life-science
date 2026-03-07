"use client"

import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import API from "@/lib/api"
import { useRouter } from "next/navigation"

export default function LoginPage() {

    const { login } = useContext(AuthContext)
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        try {

            const res = await API.post("/auth/login", {
                email,
                password
            })

            login(res.data.token)

            router.push("/profile")

        } catch (err) {
            alert("Invalid login credentials")
        }

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