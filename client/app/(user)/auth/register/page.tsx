"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import { useAuth } from "@/context/AuthContext"

export default function RegisterPage(){

 const router = useRouter()
 const {login} = useAuth()
 const [form,setForm] = useState({
  fname:"",lname:"",email:"",phone:"",password:"",confirm:""
 })
 const [error,setError] = useState("")

 const handleChange = (e:any)=> setForm({...form,[e.target.name]:e.target.value})

 const handleSubmit = async()=>{

  if(form.password!==form.confirm){
   setError("Passwords do not match")
   return
  }

  if(!/^9[87]\d{8}$/.test(form.phone)){
   setError("Phone must start with 98 or 97 and 10 digits")
   return
  }

  const res = await fetch("http://localhost:5000/api/auth/register",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(form)
  })

  const data = await res.json()
  if(data.success){
   login({user:data.user,token:"dummy_token"})
   router.push("/")
  }else setError(data.error)
 }

 return(
  <Container>
   <div className="py-24 max-w-md mx-auto">
    <h1 className="text-3xl font-bold mb-6">Register</h1>
    <input name="fname" placeholder="First Name" onChange={handleChange} className="border p-3 w-full mb-2"/>
    <input name="lname" placeholder="Last Name" onChange={handleChange} className="border p-3 w-full mb-2"/>
    <input name="email" placeholder="Email" onChange={handleChange} className="border p-3 w-full mb-2"/>
    <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-3 w-full mb-2"/>
    <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-3 w-full mb-2"/>
    <input name="confirm" placeholder="Confirm Password" type="password" onChange={handleChange} className="border p-3 w-full mb-4"/>
    <Button text="Register" onClick={handleSubmit}/>
    {error && <p className="text-red-500 mt-2">{error}</p>}
   </div>
  </Container>
 )
}