"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/user/ProductCard"
import Filters from "@/components/user/Filters"
import Pagination from "@/components/user/Pagination"
import { FiShoppingBag, FiSearch, FiSliders } from "react-icons/fi"

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

  const perPage = 6 // Increased items per page for a better grid

  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:5000/api/products")
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
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gray-900 border-b border-gray-800 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-gray-900 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 mb-6 shadow-xl">
                <FiShoppingBag className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Products</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg font-medium">Browse our comprehensive catalog of industry-leading healthcare and nutraceutical products.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-6 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
                <span className="font-bold text-gray-900 flex items-center gap-2"><FiSliders /> Filters</span>
                <button 
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold"
                >
                  {showMobileFilters ? "Hide" : "Show"}
                </button>
            </div>

            {/* Filters Sidebar */}
            <div className={`lg:w-1/4 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                    <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        <FiSliders className="text-emerald-500" /> Refine Search
                    </h2>
                    <Filters onFilterChange={handleFilterChange} />
                </div>
            </div>

            {/* Product Grid Area */}
            <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-sm font-bold text-gray-500">
                        Showing <span className="text-gray-900 px-2 py-1 bg-white rounded-lg border border-gray-200">{filteredProducts.length}</span> results
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl p-4 h-[400px] border border-gray-100 shadow-sm flex flex-col">
                                <div className="w-full h-56 bg-gray-100 rounded-2xl mb-5"></div>
                                <div className="h-5 bg-gray-100 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2 mb-auto"></div>
                                <div className="flex justify-between mt-4">
                                    <div className="h-5 bg-gray-100 rounded w-1/3"></div>
                                    <div className="h-8 bg-gray-100 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : currentProducts.length > 0 ? (
                    <>
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {currentProducts.map(p => (
                            <ProductCard
                                key={p.id}
                                id={p.id}
                                name={p.name}
                                image={p.image?.startsWith("http") ? p.image : `http://localhost:5000/uploads/${p.image}`}
                                description={p.description?.substring(0, 60) + "..."}
                                price={p.price}
                            />
                        ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-12 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 inline-block mx-auto">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(p) => setCurrentPage(p)}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-3xl border border-gray-100 border-dashed py-24 px-6 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                            <FiSearch className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500 max-w-sm">We couldn't find any products matching your current filters. Try adjusting them.</p>
                        <button 
                            onClick={() => handleFilterChange({ price: 'all', rating: 'all' })}
                            className="mt-6 font-bold text-emerald-600 bg-emerald-50 px-6 py-3 rounded-xl hover:bg-emerald-100 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}