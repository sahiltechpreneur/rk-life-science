"use client"

import { createContext, useContext, useEffect, useState } from "react"

type CartItem = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if(savedCart){
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: CartItem) => {

    const existing = cart.find(p => p.id === product.id)

    if(existing){
      setCart(
        cart.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      )
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id:number)=>{
    setCart(cart.filter(p => p.id !== id))
  }

  const updateQuantity = (id:number, qty:number)=>{
    setCart(
      cart.map(p =>
        p.id === id ? { ...p, quantity: qty } : p
      )
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {

  const context = useContext(CartContext)

  if(!context){
    throw new Error("useCart must be used inside CartProvider")
  }

  return context
}