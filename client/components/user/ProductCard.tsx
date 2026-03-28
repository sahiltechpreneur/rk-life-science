"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useNotification } from "@/context/NotificationContext";
import { FiShoppingCart, FiEye, FiBox, FiCreditCard } from "react-icons/fi";

type Props = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export default function ProductCard({ id, name, image, description, price }: Props) {
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Keep navigation separate — user expects this to just add to cart
    if (!user) {
      showNotification("Please log in to add items to your cart", "warning");
      router.push("/auth/login");
      return;
    }
    addToCart({ id, name, image, price, quantity: 1 });
    showNotification(`${name} added to your cart`, "success");
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!user) {
      showNotification("Please log in to buy items", "warning");
      router.push("/auth/login");
      return;
    }
    addToCart({ id, name, image, price, quantity: 1 });
    router.push("/checkout");
  };

  return (
    <Link 
      href={`/product/${id}`} 
      className="group relative flex flex-col bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-md overflow-hidden"
    >
      {/* 
        Quick action button — appears on hover, but not in your face.
        Real shopping interfaces keep secondary actions subtle.
      */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-2">
        <button 
          onClick={handleAddToCart} 
          className="bg-white/95 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 border border-gray-100 shadow-sm transition-all duration-200"
          title="Quick add to cart"
        >
          <FiShoppingCart className="w-4 h-4" />
        </button>
        <button 
          onClick={handleBuyNow} 
          className="bg-emerald-600 p-2 rounded-full text-white hover:bg-emerald-700 shadow-sm transition-all duration-200"
          title="Buy now"
        >
          <FiCreditCard className="w-4 h-4" />
        </button>
      </div>
      
      {/* 
        Image area — clean, simple. No weird overlays or gradient gradients.
        Just the product, presented honestly.
      */}
      <div className="relative h-56 bg-gray-50 flex items-center justify-center p-4">
        {image ? (
          <img 
            src={image} 
            className="max-h-full max-w-full object-contain" 
            alt={name}
          />
        ) : (
          <div className="flex flex-col items-center text-gray-300">
            <FiBox className="w-12 h-12 mb-1" />
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>
      
      {/* 
        Product info — straightforward, no over-design.
        The focus is on readability and quick scanning.
      */}
      <div className="flex-1 p-4">
        <h3 className="font-semibold text-gray-800 text-base line-clamp-2 min-h-[3rem] group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>
      
      {/* 
        Price and action — the moment of truth.
        Kept clean with enough whitespace so it doesn't feel cramped.
      */}
      <div className="flex items-center justify-between p-4 pt-0 mt-auto">
        <div>
          <span className="text-xs text-gray-400 font-medium">Price</span>
          <p className="font-bold text-gray-900 text-lg tracking-tight">
            NPR {Number(price).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-emerald-600 transition-colors">
          View details
          <FiEye className="ml-1.5 w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}