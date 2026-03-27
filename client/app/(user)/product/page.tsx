"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/user/ProductCard"
import Filters from "@/components/user/Filters"
import Pagination from "@/components/user/Pagination"
import { FiShoppingBag, FiSearch, FiSliders, FiArrowRight } from "react-icons/fi"
import Link from "next/link"

type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
  rating: number
}

export default function ProductPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const perPage = 9 // 3x3 grid looks better on desktop

  useEffect(() => {
    setIsLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setAllProducts(data)
        setFilteredProducts(data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleFilterChange = ({ price, rating }: { price: string; rating: string }) => {
    let filtered = [...allProducts]

    if (price !== "all") {
      const [min, max] = price.split("-").map(Number)
      filtered = filtered.filter(p =>
        p.price >= min && (max ? p.price <= max : true)
      )
    }

    if (rating !== "all") {
      filtered = filtered.filter(p => p.rating >= Number(rating))
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const start = (currentPage - 1) * perPage
  const end = start + perPage
  const currentProducts = filteredProducts.slice(start, end)
  const totalPages = Math.ceil(filteredProducts.length / perPage)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header — cleaner, less overwhelming, navbar visible */}
      <div className="bg-white border-b border-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Browse our catalog
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Our Products
            </h1>
            <p className="text-gray-500 text-lg max-w-xl">
              Explore our range of premium nutraceuticals and healthcare products — all rigorously tested and trusted by professionals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
                <div className="sticky top-24 space-y-6">
                    {/* Filter Card */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-base font-semibold text-gray-900">Filters</h2>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-md">
                                {filteredProducts.length} results
                            </span>
                        </div>
                        
                        {/* Mobile Toggle */}
                        <button 
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="w-full lg:hidden mb-4 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-medium"
                        >
                            <FiSliders className="w-4 h-4" />
                            {showMobileFilters ? "Close filters" : "Show filters"}
                        </button>

                        <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
                            <Filters onFilterChange={handleFilterChange} />
                        </div>
                    </div>

                    {/* Support Card — simpler, less overwhelming */}
                    <div className="hidden lg:block bg-gray-50 p-5 rounded-xl border border-gray-100">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">Need bulk pricing?</h3>
                        <p className="text-gray-500 text-sm mb-4">
                            Contact our sales team for wholesale orders and distribution partnerships.
                        </p>
                        <Link 
                          href="/contact" 
                          className="inline-flex items-center text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
                        >
                          Get in touch
                          <FiArrowRight className="ml-1.5 w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Product Grid Area */}
            <main className="lg:w-3/4">
                {isLoading ? (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-xl p-4 h-[380px] border border-gray-100">
                                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4"></div>
                                <div className="h-5 bg-gray-100 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-100 rounded w-full mb-1"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                                <div className="flex justify-between mt-2">
                                    <div className="h-6 bg-gray-100 rounded w-1/3"></div>
                                    <div className="h-8 bg-gray-100 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : currentProducts.length > 0 ? (
                    <>
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {currentProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    image={p.image?.startsWith("http") ? p.image : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/uploads/${p.image}`}
                                    description={p.description?.substring(0, 80) + (p.description?.length > 80 ? "..." : "")}
                                    price={p.price}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(p) => setCurrentPage(p)}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 py-16 px-6 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiSearch className="w-6 h-6 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                            Try adjusting your filters or browse our full collection.
                        </p>
                        <button 
                            onClick={() => handleFilterChange({ price: 'all', rating: 'all' })}
                            className="text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  )
}