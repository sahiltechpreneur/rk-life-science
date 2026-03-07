"use client"

import { useState } from "react"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

type CartItem = {
  id:number
  name:string
  price:number
  quantity:number
}

export default function CheckoutPage(){

  const cart:CartItem[] = [
    {id:1,name:"Vitamin C",price:500,quantity:1},
    {id:2,name:"Multivitamin",price:1200,quantity:2}
  ]

  const total = cart.reduce((sum,item)=> sum + item.price*item.quantity,0)

  const [form,setForm] = useState({
    name:"",
    phone:"",
    address:"",
    city:"",
    payment:"cod"
  })

  const [error,setError] = useState("")

  const handleChange = (e:any)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e:any)=>{
    e.preventDefault()

    if(!form.name || !form.phone || !form.address || !form.city){
      setError("All fields are required")
      return
    }

    const phoneRegex = /^(98|97)[0-9]{8}$/

    if(!phoneRegex.test(form.phone)){
      setError("Phone number must start with 98 or 97 and contain 10 digits")
      return
    }

    setError("")
    console.log("Order Submitted:",form)

    alert("Order placed successfully")
  }

  return(
    <Container>

      <div className="py-20 grid md:grid-cols-2 gap-12">

        {/* Shipping Form */}

        <div>

          <h1 className="text-3xl font-bold text-primary mb-6">
            Checkout
          </h1>

          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

          <form
          onSubmit={handleSubmit}
          className="space-y-4"
          >

            <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            value={form.name}
            onChange={handleChange}
            />

            <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded"
            value={form.phone}
            onChange={handleChange}
            />

            <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full border p-3 rounded"
            value={form.address}
            onChange={handleChange}
            />

            <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full border p-3 rounded"
            value={form.city}
            onChange={handleChange}
            />

            {/* Payment Method */}

            <div>

              <h3 className="font-semibold mb-2">
                Payment Method
              </h3>

              <div className="space-y-2">

                <label className="flex gap-2">
                  <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment==="cod"}
                  onChange={handleChange}
                  />
                  Cash on Delivery
                </label>

                <label className="flex gap-2">
                  <input
                  type="radio"
                  name="payment"
                  value="esewa"
                  onChange={handleChange}
                  />
                  eSewa
                </label>

                <label className="flex gap-2">
                  <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  onChange={handleChange}
                  />
                  Stripe
                </label>

              </div>

            </div>

            <Button text="Place Order"/>

          </form>

        </div>


        {/* Order Summary */}

        <div>

          <h2 className="text-2xl font-bold text-primary mb-6">
            Order Summary
          </h2>

          <div className="border rounded-lg p-6 space-y-4">

            {cart.map(item=>(
              <div
              key={item.id}
              className="flex justify-between"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>

                <span>
                  Rs {item.price*item.quantity}
                </span>
              </div>
            ))}

            <hr/>

            <div className="flex justify-between font-bold text-lg">

              <span>Total</span>

              <span>
                Rs {total}
              </span>

            </div>

          </div>

        </div>

      </div>

    </Container>
  )
}