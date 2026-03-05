"use client"
import { useState } from "react"
import Container from "@/components/ui/Container"
import CartItem from "@/components/user/CartItem"
import Button from "@/components/ui/Button"

type Product = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

export default function CartPage() {

  const initialCart: Product[] = [
    { id: 1, name: "Vitamin C", image: "/images/vitamin-c.jpg", price: 500, quantity: 1 },
    { id: 2, name: "Multivitamin", image: "/images/multivitamin.jpg", price: 1200, quantity: 2 },
  ]

  const [cart, setCart] = useState(initialCart)

  const handleQuantityChange = (id: number, qty: number) => {
    setCart(cart.map(p => p.id === id ? { ...p, quantity: qty } : p))
  }

  const handleRemove = (id: number) => {
    setCart(cart.filter(p => p.id !== id))
  }

  const subtotal = cart.reduce((acc, p) => acc + p.price * p.quantity, 0)

  return (
    <Container>
      <div className="py-20">
        <h1 className="text-3xl font-bold text-primary mb-8">Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map(p => (
                <CartItem 
                  key={p.id} 
                  id={p.id} 
                  name={p.name} 
                  image={p.image} 
                  price={p.price} 
                  quantity={p.quantity} 
                  onQuantityChange={handleQuantityChange} 
                  onRemove={handleRemove} 
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-xl font-bold text-darkGreen">Subtotal: Rs. {subtotal}</p>
              <Button text="Proceed to Checkout" />
            </div>
          </>
        )}

      </div>
    </Container>
  )
}