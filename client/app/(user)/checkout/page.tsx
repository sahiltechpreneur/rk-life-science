"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { useNotification } from "@/context/NotificationContext"
import { AuthContext } from "@/context/AuthContext"
import { useContext, useEffect } from "react"
import { FiCheckCircle, FiCreditCard, FiMapPin, FiUser, FiMail, FiPhone, FiBox, FiTruck, FiAlertCircle } from "react-icons/fi"

/**
 * CheckoutPage Component
 * Handles the final step of the purchasing process, including:
 * 1. Collecting customer shipping information.
 * 2. Calculating tiered shipping charges (NPR 50 for totals < 2000).
 * 3. Processing different payment methods (COD, eSewa, Khalti).
 * 4. Interfacing with the backend to create orders.
 */
export default function CheckoutPage(){
 const router = useRouter()
 const { cart, clearCart } = useCart()
 const { showNotification } = useNotification()
 const { user, loading } = useContext(AuthContext)

 // Form state for delivery details
 const [form,setForm] = useState({
  customer_name: "",
  email: "",
  phone: "",
  address: "",
  city: ""
 })
 const [paymentMethod, setPaymentMethod] = useState("COD")
 const [isSubmitting, setIsSubmitting] = useState(false)

 // Redirect if not logged in
 useEffect(() => {
   if (!loading && !user) {
       showNotification("Please login to place an order.", "warning")
       router.push("/auth/login")
   }
 }, [user, loading, router])

 // Pre-fill form if user is logged in
 useEffect(() => {
   if (user && !form.email) { // Only pre-fill if not already edited
       setForm(prev => ({
           ...prev,
           customer_name: user.fname ? `${user.fname} ${user.lname || ''}`.trim() : prev.customer_name,
           email: user.email || prev.email,
           phone: user.phone || prev.phone
       }))
   }
 }, [user])

 /**
  * Handles input changes for the shipping form
  */
 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
  setForm({...form, [e.target.name]: e.target.value})
 }

 // Calculate base total from cart items
 const total = cart.reduce(
  (acc,p)=> acc + p.price * p.quantity,
  0
 )

 /**
  * Dynamic Shipping Logic:
  * Default shipping is NPR 50 for orders below NPR 2000.
  * Orders NPR 2000 and above qualify for Free Delivery.
  */
 const shippingCharge = total > 0 && total < 2000 ? 50 : 0;
 const grandTotal = total + shippingCharge;

 /**
  * Processes the order submission
  */
 const handleOrder = async(e: React.FormEvent)=>{
  e.preventDefault()
  
  // Basic validation
  if (cart.length === 0) {
      showNotification("Your cart is empty!", "warning")
      return router.push('/cart')
  }

  // Regex validation for security and data integrity
  const nameRegex = /^[A-Za-z\s]+$/
  if (!nameRegex.test(form.customer_name)) {
      showNotification("Name must contain only letters and spaces.", "error")
      return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
      showNotification("Please enter a valid email address.", "error")
      return
  }

  // Nepali phone number format validation
  if (!/^9[87]\d{8}$/.test(form.phone)) {
      showNotification("Phone must start with 98 or 97 and be exactly 10 digits.", "error")
      return
  }

  setIsSubmitting(true)
  try {
      // Create order in the backend database
      const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/orders`,
       {
        method:"POST",
        headers:{
         "Content-Type":"application/json",
         "Authorization": `Bearer ${user?.token}`
        },
        body:JSON.stringify({
         ...form,
         total: grandTotal,
         shipping_charge: shippingCharge,
         items: cart.map(item => ({
             ...item,
             image: item.image
         })),
         payment_method: paymentMethod
        })
       }
      )
    
      const data = await res.json()
    
      if(data.success){
       // Handle eSewa redirection
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
       } 
       // Handle Cash on Delivery (COD)
       else {
           // Success page handles clearCart() if needed or it can be done here
           router.push(`/order-success?order=${data.orderId}`)
       }
      }
  } catch(error) {
      console.error(error)
      showNotification("Something went wrong during checkout.", "error")
  } finally {
      setIsSubmitting(false)
  }
 }

 return (
  <div className="bg-gray-50 min-h-screen pt-24 pb-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="hover:text-gray-700">Cart</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 text-sm mt-1">Complete your order details below</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Step 1: Shipping Form */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-600">1</span>
                    </div>
                    <h2 className="text-base font-semibold text-gray-900">Delivery details</h2>
                  </div>
                  <p className="text-xs text-gray-500 ml-8">Enter your shipping information</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Full name</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                          required
                          name="customer_name"
                          value={form.customer_name}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                          required
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          placeholder="hello@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Phone</label>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        required
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Street address</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <textarea
                        required
                        name="address"
                        value={form.address}
                        rows={2}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                        placeholder="House/Apartment #, Street Name..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                  <input
                      required
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      placeholder="Kathmandu"
                  />
                </div>
              </div>
          </div>

          {/* Step 2: Order Summary & Review */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-emerald-600">2</span>
                    </div>
                    <h2 className="text-base font-semibold text-gray-900">Order summary</h2>
                  </div>
                  <p className="text-xs text-gray-500 ml-8">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
              </div>

              {/* Items List */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                  {item.image ? (
                                      <img src={item.image.startsWith('http') ? item.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${item.image}`} className="w-full h-full object-cover" alt="" />
                                  ) : (
                                      <FiBox className="w-4 h-4 text-gray-300" />
                                  )}
                              </div>
                              <div>
                                  <p className="text-sm font-medium text-gray-800 line-clamp-1 max-w-[150px]">{item.name}</p>
                                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                              </div>
                          </div>
                          <span className="text-sm font-medium text-gray-800">NPR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                  ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6 pt-3 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-700 font-medium">NPR {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1">
                        <FiTruck className="w-3 h-3" />
                        Shipping
                      </span>
                      <span className={shippingCharge === 0 ? "text-emerald-600 font-medium" : "text-gray-700 font-medium"}>
                          {shippingCharge === 0 ? "Free" : `NPR ${shippingCharge}`}
                      </span>
                  </div>
                  {shippingCharge > 0 && total < 2000 && (
                      <p className="text-[10px] text-emerald-600 text-right">
                          Add NPR {(2000 - total).toLocaleString()} more for free delivery
                      </p>
                  )}
                  <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-100">
                      <span className="text-sm font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-emerald-600">NPR {grandTotal.toLocaleString()}</span>
                  </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment method</h3>
                  <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-emerald-500 w-4 h-4" />
                          <div className="flex-1">
                              <span className="text-sm font-medium text-gray-800 block">Cash on delivery</span>
                              <span className="text-xs text-gray-400">Pay when you receive your order</span>
                          </div>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'eSewa' ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                          <input type="radio" name="paymentMethod" value="eSewa" checked={paymentMethod === 'eSewa'} onChange={() => setPaymentMethod('eSewa')} className="accent-emerald-500 w-4 h-4" />
                          <div className="flex-1">
                              <span className="text-sm font-medium text-gray-800 block">eSewa</span>
                              <span className="text-xs text-gray-400">Pay with digital wallet</span>
                          </div>
                      </label>
                  </div>
              </div>

              {/* Submit Button */}
              <button
                  type="submit"
                  onClick={handleOrder}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                  {isSubmitting ? (
                      <>
                          <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                          Processing...
                      </>
                  ) : (
                      <>
                          <FiCreditCard className="w-4 h-4" />
                          {paymentMethod === 'eSewa' ? 'Pay with eSewa' : 'Place order'}
                      </>
                  )}
              </button>
          </div>

      </div>
    </div>
  </div>
 )
}