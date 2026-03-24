"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Container from "@/components/ui/Container"
import { useCart } from "@/context/CartContext"
import { FiCheckCircle, FiCreditCard, FiMapPin, FiUser, FiMail, FiPhone, FiBox } from "react-icons/fi"

export default function CheckoutPage(){
 const router = useRouter()
 const { cart, clearCart } = useCart() // Assuming clearCart exists in context, if not, it should be added or simulated

 const [form,setForm] = useState({
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  city: ""
 })
 const [paymentMethod, setPaymentMethod] = useState("COD")
 const [isSubmitting, setIsSubmitting] = useState(false)

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  setForm({...form, [e.target.name]: e.target.value})
 }

 const total = cart.reduce(
  (acc,p)=> acc + p.price * p.quantity,
  0
 )

 const handleOrder = async(e: React.FormEvent)=>{
  e.preventDefault()
  
  if (cart.length === 0) {
      alert("Your cart is empty!")
      return router.push('/cart')
  }

  const nameRegex = /^[A-Za-z\s]+$/
  if (!nameRegex.test(form.customer_name)) {
      alert("Name must contain only letters and spaces.")
      return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.")
      return
  }

  if (!/^9[87]\d{8}$/.test(form.phone)) {
      alert("Phone must start with 98 or 97 and be exactly 10 digits long.")
      return
  }

  setIsSubmitting(true)
  try {
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
         items:cart,
         payment_method: paymentMethod
        })
       }
      )
    
      const data = await res.json()
    
      if(data.success){
       if (data.payment_method === 'eSewa') {
           const formParams = data.esewaConfig;
           const form = document.createElement("form");
           form.setAttribute("method", "POST");
           form.setAttribute("action", "https://rc-epay.esewa.com.np/api/epay/main/v2/form");
           
           for (const key in formParams) {
               const hiddenField = document.createElement("input");
               hiddenField.setAttribute("type", "hidden");
               hiddenField.setAttribute("name", key);
               hiddenField.setAttribute("value", formParams[key]);
               form.appendChild(hiddenField);
           }
           document.body.appendChild(form);
           form.submit();
       } else if (data.payment_method === 'Khalti') {
           // Khalti returns a direct payment_url to redirect to
           window.location.href = data.payment_url;
       } else {
           // clearCart();
           router.push(`/order-success?order=${data.orderId}`)
       }
      }
  } catch(error) {
      console.error(error)
      alert("Something went wrong during checkout.")
  } finally {
      setIsSubmitting(false)
  }
 }

 return (
  <div className="bg-gray-50 min-h-screen pb-20">
    {/* Header */}
    <div className="bg-gray-900 border-b border-gray-800 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center">
            <h1 className="text-3xl font-black text-white flex items-center gap-3">
                <FiCheckCircle className="text-emerald-400" /> Secure Checkout
            </h1>
        </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12">
        <form onSubmit={handleOrder} className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Delivery Details Section */}
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-sm border border-gray-100">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 mb-2">
                        <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">1</span>
                        Delivery Details
                    </h2>
                    <p className="text-gray-500 font-medium ml-14">Please enter your shipping information below.</p>
                </div>

                <div className="space-y-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="absolute -top-2 left-4 px-1 bg-white text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <FiUser className="w-5 h-5" />
                            </div>
                            <input
                                required
                                name="customer_name"
                                value={form.customer_name}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative">
                                <label className="absolute -top-2 left-4 px-1 bg-white text-xs font-bold uppercase tracking-wider text-gray-400">Email</label>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <FiMail className="w-5 h-5" />
                                </div>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="relative">
                                <label className="absolute -top-2 left-4 px-1 bg-white text-xs font-bold uppercase tracking-wider text-gray-400">Phone</label>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <FiPhone className="w-5 h-5" />
                                </div>
                                <input
                                    required
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                    placeholder="+977 98XXXXXXX"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Address Info */}
                    <div className="space-y-4">
                        <div className="relative">
                            <label className="absolute -top-2 left-4 px-1 bg-white text-xs font-bold uppercase tracking-wider text-gray-400">Street Address</label>
                            <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-gray-400">
                                <FiMapPin className="w-5 h-5" />
                            </div>
                            <textarea
                                required
                                name="address"
                                value={form.address}
                                rows={2}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium resize-none"
                                placeholder="House/Apartment #, Street Name..."
                            />
                        </div>
                        <div className="relative">
                            <label className="absolute -top-2 left-4 px-1 bg-white text-xs font-bold uppercase tracking-wider text-gray-400">City</label>
                            <input
                                required
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-2xl px-4 py-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium"
                                placeholder="Kathmandu"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Summary & Payment Section */}
            <div className="bg-gray-900 rounded-[2.5rem] p-6 sm:p-10 shadow-xl text-white relative overflow-hidden sticky top-24">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-[60px]"></div>
                
                <div className="relative z-10 mb-8">
                    <h2 className="text-2xl font-black flex items-center gap-3 mb-2">
                        <span className="w-10 h-10 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center shrink-0 border border-white/10">2</span>
                        Order Summary
                    </h2>
                </div>

                <div className="space-y-4 mb-8 relative z-10 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 border-b border-gray-800 pb-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                                    {item.image ? (
                                        <img src={item.image.startsWith('http') ? item.image : `http://localhost:5000/uploads/${item.image}`} className="w-full h-full object-cover rounded-lg" alt="" />
                                    ) : (
                                        <FiBox className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                                    <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <span className="font-bold text-emerald-400 text-sm whitespace-nowrap">NPR {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="space-y-4 mb-8 relative z-10">
                    <div className="flex justify-between text-gray-400 font-medium">
                        <span>Subtotal</span>
                        <span className="text-white font-bold">NPR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 font-medium">
                        <span>Shipping</span>
                        <span className="text-emerald-400 font-bold">Free Delivery</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-gray-800 pt-6 mt-6">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">NPR {total.toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8 relative z-10 border-t border-gray-800 pt-6">
                    <h3 className="font-bold mb-3">Payment Method</h3>
                    <div className="flex flex-col gap-3">
                        <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition-all ${paymentMethod === 'COD' ? 'bg-primary/20 border-primary' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-primary w-4 h-4" />
                            <div className="flex-1">
                                <span className="font-bold block">Cash on Delivery</span>
                                <span className="text-xs text-gray-400">Pay when you receive the items</span>
                            </div>
                        </label>
                        <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition-all ${paymentMethod === 'eSewa' ? 'bg-[#60bb46]/20 border-[#60bb46]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            <input type="radio" name="paymentMethod" value="eSewa" checked={paymentMethod === 'eSewa'} onChange={() => setPaymentMethod('eSewa')} className="accent-[#60bb46] w-4 h-4" />
                            <div className="flex-1">
                                <span className="font-bold block text-[#60bb46]">eSewa Digital Wallet</span>
                                <span className="text-xs text-gray-400">Secure online payment via eSewa</span>
                            </div>
                            <img src="https://esewa.com.np/common/images/esewa_logo.png" alt="eSewa" className="h-6 object-contain bg-white rounded-md p-1" />
                        </label>
                        <label className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition-all ${paymentMethod === 'Khalti' ? 'bg-[#5c2d91]/20 border-[#5c2d91]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            <input type="radio" name="paymentMethod" value="Khalti" checked={paymentMethod === 'Khalti'} onChange={() => setPaymentMethod('Khalti')} className="accent-[#5c2d91] w-4 h-4" />
                            <div className="flex-1">
                                <span className="font-bold block text-purple-400">Khalti Digital Wallet</span>
                                <span className="text-xs text-gray-400">Pay securely via Khalti</span>
                            </div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Khalti_Digital_Wallet_Logo.png" alt="Khalti" className="h-6 object-contain bg-white rounded-md p-1" />
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative z-10 group inline-flex items-center justify-center px-8 py-5 text-base font-bold text-gray-900 transition-all duration-300 bg-white border border-transparent rounded-2xl hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Processing...' : (
                        <>
                            <FiCreditCard className="mr-2 w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                            {paymentMethod === 'eSewa' ? 'Pay with eSewa' : paymentMethod === 'Khalti' ? 'Pay with Khalti' : 'Place Order (COD)'}
                        </>
                    )}
                </button>
                <p className="text-center text-xs text-gray-500 font-medium mt-4 relative z-10">
                    {paymentMethod === 'eSewa' ? 'You will be redirected securely to eSewa.' : paymentMethod === 'Khalti' ? 'You will be redirected securely to Khalti.' : 'You will pay with cash upon receiving your items.'}
                </p>
            </div>

        </form>
    </div>
  </div>
 )
}