"use client"

import Link from "next/link"
import { useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import Container from "@/components/ui/Container"

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (

    <nav className="bg-white shadow">

      <Container>

        <div className="flex items-center justify-between py-4">

          {/* Logo */}

          <Link href="/" className="text-2xl font-bold text-primary">
            RK Life Science
          </Link>

          {/* Desktop Links */}

          <div className="hidden md:flex items-center gap-6">

            <Link href="/" className="hover:text-primary">
              Home
            </Link>

            <Link href="/product" className="hover:text-primary">
              Products
            </Link>

            <Link href="/about" className="hover:text-primary">
              About
            </Link>

            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>

            {/* Cart */}

            <Link href="/cart" className="text-xl">
              <FaShoppingCart />
            </Link>

            {/* Login */}

            <Link
              href="/auth/login"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
            >
              Login
            </Link>

          </div>

          {/* Mobile Menu Button */}

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}

        {menuOpen && (

          <div className="md:hidden flex flex-col gap-4 pb-4">

            <Link href="/">Home</Link>
            <Link href="/product">Products</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/auth/login">Login</Link>

          </div>

        )}

      </Container>

    </nav>
  )
}