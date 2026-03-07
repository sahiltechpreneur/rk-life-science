"use client"

import Link from "next/link"
import Image from "next/image"
import { useContext, useState, useEffect, useRef } from "react"
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa"
import Container from "@/components/ui/Container"
import { AuthContext } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout, user } = useContext(AuthContext)
  const { cart } = useCart()
  const menuRef = useRef<HTMLDivElement>(null)

  // Auto close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Auto close menu when window is resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between py-3">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary group-hover:border-secondary transition-colors">
              <Image
                src="/images/logo.png" // Make sure to add your logo image in public/images/
                alt="R. K. Life Science Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
              R. K. Life Science
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/product" className="text-gray-700 hover:text-primary font-medium transition-colors relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-medium transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>

            {/* Cart with badge */}
            <Link href="/cart" className="text-xl text-gray-700 hover:text-primary transition-colors relative">
              <FaShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((tot, item) => tot + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors group">
                  <div className="bg-primary/10 p-2 rounded-full overflow-hidden w-8 h-8 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    {user.image ? (
                      <img src={user.image} alt={user.name || "Profile"} className="object-cover w-full h-full rounded-full" />
                    ) : (
                      <FaUser className="text-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden lg:inline">{user.name || user.fname || 'Profile'}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 font-medium border border-red-200 hover:border-transparent shadow-sm hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2.5 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700 hover:text-primary transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div 
            ref={menuRef}
            className="md:hidden flex flex-col gap-3 pb-5 border-t border-gray-100 pt-4 animate-slideDown"
          >
            <Link 
              href="/product" 
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-all font-medium"
            >
              Products
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-all font-medium"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-all font-medium"
            >
              Contact
            </Link>
            <Link 
              href="/cart" 
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-all font-medium flex items-center gap-2"
            >
              <FaShoppingCart />
              Cart
              {cart.length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                  {cart.reduce((tot, item) => tot + item.quantity, 0)}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-t border-gray-100 transition-colors mt-2"
                >
                  <div className="bg-primary/10 p-2 rounded-full overflow-hidden w-10 h-10 flex items-center justify-center">
                    {user.image ? (
                      <img src={user.image} alt={user.name || "Profile"} className="object-cover w-full h-full rounded-full" />
                    ) : (
                      <FaUser className="text-primary text-xl" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-semibold text-primary">{user.name || user.fname || 'User'}</p>
                  </div>
                </Link>
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="text-left text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2.5 rounded-lg transition-all font-medium border border-red-100 mx-4 mb-2 mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/auth/login" 
                onClick={() => setMenuOpen(false)}
                className="bg-primary text-white hover:bg-secondary px-4 py-2.5 rounded-lg transition-all font-medium text-center mx-4 shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </Container>
    </nav>
  )
}