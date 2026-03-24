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
    <div className="bg-gray-50 min-h-screen">
      {/* Premium Header */}
      <div className="bg-gray-900 pt-20 pb-32 lg:pt-32 lg:pb-48 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6 backdrop-blur-md">
                Catalog
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Products</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
                Explore our scientifically formulated range of high-quality nutraceuticals and healthcare products.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 pb-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4">
                <div className="sticky top-24 space-y-6">
                    {/* Search & Stats Card */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-black text-gray-900">Filters</h2>
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-lg uppercase tracking-wider">{filteredProducts.length} Results</span>
                        </div>
                        
                        {/* Mobile Toggle visible on small screens */}
                        <button 
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="w-full lg:hidden mb-4 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-bold text-sm"
                        >
                            <FiSliders />
                            {showMobileFilters ? "Apply & Close" : "Show All Filters"}
                        </button>

                        <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block transition-all duration-300`}>
                            <Filters onFilterChange={handleFilterChange} />
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="hidden lg:block bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <h3 className="text-xl font-bold mb-3 relative z-10">Bulk Order?</h3>
                        <p className="text-gray-400 text-sm mb-6 relative z-10">Contact our sales team for wholesale pricing and distribution partnerships.</p>
                        <Link href="/contact" className="inline-flex items-center text-emerald-400 font-bold text-sm hover:gap-3 transition-all">
                            Contact Us <FiArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Product Grid Area */}
            <main className="lg:w-3/4">
                {isLoading ? (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white rounded-[2rem] p-4 h-[420px] border border-gray-100 shadow-sm flex flex-col">
                                <div className="w-full h-64 bg-gray-100 rounded-3xl mb-5"></div>
                                <div className="h-6 bg-gray-100 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-100 rounded w-1/2 mb-auto"></div>
                                <div className="flex justify-between mt-6">
                                    <div className="h-6 bg-gray-100 rounded w-1/3"></div>
                                    <div className="h-10 bg-gray-100 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : currentProducts.length > 0 ? (
                    <div className="space-y-12">
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {currentProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    name={p.name}
                                    image={p.image?.startsWith("http") ? p.image : `http://localhost:5000/uploads/${p.image}`}
                                    description={p.description?.substring(0, 80) + "..."}
                                    price={p.price}
                                />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-16">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(p) => setCurrentPage(p)}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-[3rem] border border-gray-100 border-dashed py-32 px-6 text-center flex flex-col items-center shadow-inner">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <FiSearch className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">Nothing found</h3>
                        <p className="text-gray-500 max-w-sm mb-8 font-medium">We couldn't find any products matching your specific filters. Try resetting them.</p>
                        <button 
                            onClick={() => handleFilterChange({ price: 'all', rating: 'all' })}
                            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-gray-800 transition-all hover:-translate-y-1"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
      </div>
    </div>
  )
}