"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"

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
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cart, setCart] = useState<CartItem[]>([])
  const { user } = useContext(AuthContext)

  // Load cart initially
  useEffect(() => {
    if (!user) {
      setCart([]) // Clear cart when no user
      return
    }
    const savedCart = localStorage.getItem(`cart_${user.email || 'user'}`)
    if(savedCart){
      setCart(JSON.parse(savedCart))
    }
  }, [user])

  // Save cart
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email || 'user'}`, JSON.stringify(cart))
    }
  }, [cart, user])

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

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
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