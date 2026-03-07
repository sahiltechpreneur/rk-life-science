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

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const [currentPage, setCurrentPage] = useState(1)

  const perPage = 3

  useEffect(() => {

    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setAllProducts(data)
        setFilteredProducts(data)
      })

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

    <Container>

      <div className="py-12">

        <h1 className="text-3xl font-bold text-primary mb-6">
          Our Products
        </h1>

        <Filters onFilterChange={handleFilterChange} />

        <div className="grid md:grid-cols-3 gap-6">

          {currentProducts.map(p => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              image={p.image?.startsWith("http") ? p.image : `http://localhost:5000/uploads/${p.image}`}
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