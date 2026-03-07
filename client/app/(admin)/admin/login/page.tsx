"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin(){
    const router = useRouter()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        if(email==="admin@rk.com" && password==="admin123"){
            localStorage.setItem("admin","true")
            router.push("/admin/dashboard")
        }else{
            alert("Invalid admin credentials")
        }
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md border p-8 rounded space-y-4" >
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>
                <input type="email" placeholder="Email" className="w-full border p-2" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full border p-2" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button className="bg-green-600 text-white w-full p-2 rounded" >Login</button>
            </form>
        </div>
    )
}