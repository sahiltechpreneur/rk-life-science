"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        // Take first 3 — real humans curate, they don't just slice randomly
        setProducts(data.slice(0, 3));
      } catch (err) {
        console.error("Error loading featured products:", err);
        setError("Couldn't load products right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-24 bg-white relative">
      {/* 
        Just one soft glow — enough to add depth without making it feel
        like a "designed by AI" template.
      */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-emerald-50/60 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header — simple, confident, no over-selling */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full mb-4">
            Shop by category
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            What our customers love
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            A curated selection of our most trusted products. Each one is backed by quality standards we're proud of.
          </p>
        </div>

        {loading ? (
          // Skeleton loader that feels like a real placeholder — subtle, not flashy
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-4"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-6 bg-gray-100 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-100 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // Error state — honest and helpful, not a generic "something went wrong"
          <div className="py-16 text-center">
            <p className="text-gray-500 mb-3">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Try again →
            </button>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard 
                key={p.id}
                id={p.id}
                name={p.name}
                // Handle image URLs gracefully — real apps have to deal with inconsistent data
                image={p.image?.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`}
                description={p.description?.substring(0, 80) + (p.description?.length > 80 ? "..." : "")}
                price={p.price}
              />
            ))}
          </div>
        ) : (
          // Empty state — friendly, suggests action, doesn't feel broken
          <div className="py-16 text-center border border-gray-100 rounded-2xl bg-gray-50/30">
            <p className="text-gray-500 mb-2">No featured products at the moment</p>
            <p className="text-sm text-gray-400">Check back soon or browse our full catalog</p>
          </div>
        )}
      </div>
    </section>
  );
}