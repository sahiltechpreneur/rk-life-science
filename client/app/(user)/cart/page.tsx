"use client"

import Container from "@/components/ui/Container"
import CartItem from "@/components/user/CartItem"
import Button from "@/components/ui/Button"

import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function CartPage() {

  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  )

  const handleQuantityChange = (id: number, qty: number) => {
    updateQuantity(id, qty)
  }

  const handleRemove = (id: number) => {
    removeFromCart(id)
  }

  return (

    <Container>

      <div className="py-20">

        <h1 className="text-3xl font-bold text-primary mb-8">
          Your Cart
        </h1>

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
                  image={`http://localhost:5000/uploads/${p.image}`}
                  price={p.price}
                  quantity={p.quantity}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              ))}

            </div>

            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">

              <p className="text-xl font-bold text-darkGreen">
                Subtotal: Rs. {subtotal}
              </p>

              <Link href="/checkout">
                <Button text="Proceed to Checkout" />
              </Link>

            </div>

          </>

        )}

      </div>

    </Container>
  )
}