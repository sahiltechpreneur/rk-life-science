"use client"
import { useState } from "react"
import Button from "@/components/ui/Button"

type Props = {
  id: number
  name: string
  image: string
  price: number
  quantity: number
  onQuantityChange: (id: number, qty: number) => void
  onRemove: (id: number) => void
}

export default function CartItem({ id, name, image, price, quantity, onQuantityChange, onRemove }: Props) {
  const [qty, setQty] = useState(quantity)

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setQty(val)
    onQuantityChange(id, val)
  }

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <img src={image} alt={name} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-darkGreen">{name}</h3>
        <p className="text-gray-600 mt-1">Rs. {price}</p>
        <div className="mt-2 flex items-center gap-2">
          <input 
            type="number" 
            min={1} 
            value={qty} 
            onChange={handleQtyChange} 
            className="w-16 border rounded px-2 py-1" 
          />
          <Button text="Remove" onClick={() => onRemove(id)} />
        </div>
      </div>
      <p className="font-bold text-primary">Rs. {price * qty}</p>
    </div>
  )
}