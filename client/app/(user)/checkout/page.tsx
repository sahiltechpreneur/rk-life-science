"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"
import { useCart } from "@/context/CartContext"

export default function CheckoutPage(){

 const router = useRouter()

 const { cart } = useCart()

 const [form,setForm] = useState({
  customer_name:"",
  email:"",
  phone:"",
  address:"",
  city:""
 })

 const handleChange = (e:any)=>{
  setForm({...form,[e.target.name]:e.target.value})
 }

 const total = cart.reduce(
  (acc,p)=> acc + p.price * p.quantity,
  0
 )

 const handleOrder = async()=>{

  const res = await fetch(
   "http://localhost:5000/api/orders",
   {
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
     ...form,
     total,
     items:cart
    })
   }
  )

  const data = await res.json()

  if(data.success){
   router.push(`/order-success?order=${data.orderId}`)
  }

 }

 return(

  <Container>

   <div className="py-16 max-w-xl mx-auto">

    <h1 className="text-3xl font-bold mb-6">
     Checkout
    </h1>

    <div className="space-y-4">

     <input
      name="customer_name"
      placeholder="Full Name"
      onChange={handleChange}
      className="border p-3 w-full"
     />

     <input
      name="email"
      placeholder="Email"
      onChange={handleChange}
      className="border p-3 w-full"
     />

     <input
      name="phone"
      placeholder="Phone"
      onChange={handleChange}
      className="border p-3 w-full"
     />

     <textarea
      name="address"
      placeholder="Address"
      onChange={handleChange}
      className="border p-3 w-full"
     />

     <input
      name="city"
      placeholder="City"
      onChange={handleChange}
      className="border p-3 w-full"
     />

    </div>

    <div className="mt-6">

     <p className="text-xl font-bold mb-4">
      Total: Rs {total}
     </p>

     <Button
      text="Place Order"
      onClick={handleOrder}
     />

    </div>

   </div>

  </Container>
 )
}