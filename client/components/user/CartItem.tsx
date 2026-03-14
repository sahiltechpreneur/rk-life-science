"use client"
import { useState } from "react"
import { FiTrash2, FiMinus, FiPlus, FiBox } from "react-icons/fi"

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

  const handleQtyChange = (val: number) => {
    if (val < 1) return
    setQty(val)
    onQuantityChange(id, val)
  }

  return (
    <div className="bg-white rounded-[2rem] p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-full sm:w-32 h-32 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden relative">
        {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
            <FiBox className="w-10 h-10 text-gray-300" />
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Product Information */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
                <h3 className="text-lg font-black text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-600 transition-colors">{name}</h3>
                <p className="text-emerald-600 font-bold">Rs {Number(price).toLocaleString()}</p>
            </div>
            
            <button 
                onClick={() => onRemove(id)} 
                className="w-10 h-10 flex shrink-0 items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors self-start sm:self-auto"
                title="Remove item"
            >
                <FiTrash2 className="w-5 h-5" />
            </button>
        </div>

        {/* Quantity Controls and Subtotal */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-100 p-1">
            <button 
                onClick={() => handleQtyChange(qty - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white shadow-sm transition-colors"
            >
                <FiMinus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-sm font-bold text-gray-900">{qty}</span>
            <button 
                onClick={() => handleQtyChange(qty + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white shadow-sm transition-colors"
            >
                <FiPlus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Item Subtotal</span>
              <p className="font-black text-gray-900">Rs {(price * qty).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}