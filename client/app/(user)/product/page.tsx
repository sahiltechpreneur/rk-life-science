"use client"
import { useState, useEffect } from "react"
import Container from "@/components/ui/Container"
import ProductCard from "@/components/user/ProductCard"
import Filters from "@/components/user/Filters"
import Pagination from "@/components/user/Pagination"

type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
  rating: number
}

export default function ProductPage() {

  const allProducts: Product[] = [
    { id: 1, name: "Vitamin C", image: "/images/vitamin-c.jpg", description: "Boost immunity", price: 500, rating: 4 },
    { id: 2, name: "Multivitamin", image: "/images/multivitamin.jpg", description: "Complete nutrition", price: 1200, rating: 5 },
    { id: 3, name: "Omega 3", image: "/images/omega3.jpg", description: "Heart health", price: 800, rating: 3 },
    { id: 4, name: "Vitamin D", image: "/images/vitamin-c.jpg", description: "Bone health", price: 600, rating: 4 },
    { id: 5, name: "Zinc", image: "/images/multivitamin.jpg", description: "Immune support", price: 400, rating: 4 },
    { id: 6, name: "Calcium", image: "/images/omega3.jpg", description: "Strong bones", price: 900, rating: 5 },
    { id: 7, name: "Magnesium", image: "/images/vitamin-c.jpg", description: "Muscle support", price: 700, rating: 3 },
  ]

  const [products, setProducts] = useState(allProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 3
  const totalPages = Math.ceil(products.length / perPage)

  const [filteredProducts, setFilteredProducts] = useState(products)

  // Filter handler
  const handleFilterChange = ({ price, rating }: { price: string; rating: string }) => {
    let filtered = [...allProducts]

    // Price filter
    if(price !== "all") {
      const [min, max] = price.split("-").map(Number)
      filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true))
    }

    // Rating filter
    if(rating !== "all") {
      filtered = filtered.filter(p => p.rating >= Number(rating))
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  // Pagination
  const start = (currentPage - 1) * perPage
  const end = start + perPage
  const currentProducts = filteredProducts.slice(start, end)

  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold text-primary mb-6">Our Products</h1>

        <Filters onFilterChange={handleFilterChange} />

        <div className="grid md:grid-cols-3 gap-6">
          {currentProducts.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image}
              description={p.description}
              price={p.price}
            />
          ))}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(p) => setCurrentPage(p)} 
        />
      </div>
    </Container>
  )
}