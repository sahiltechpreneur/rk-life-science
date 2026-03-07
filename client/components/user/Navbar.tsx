"use client"

import Link from "next/link"
import { useContext, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import Container from "@/components/ui/Container"
import { AuthContext } from "@/context/AuthContext"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout, user } = useContext(AuthContext)

  return (
    <nav className="bg-white shadow">
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            R. K. Life Science
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
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

            {/* Auth Section: Shows Logout if user exists, otherwise shows Login */}
            {user ? (
              <button 
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/auth/login"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4 border-t pt-4">
            <Link href="/product" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
            
            {user ? (
              <button 
                onClick={() => { logout(); setMenuOpen(false); }}
                className="text-left text-red-600 font-bold"
              >
                Logout
              </button>
            ) : (
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </div>
        )}
      </Container>
    </nav>
  )
}