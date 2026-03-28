"use client"

import Link from "next/link"
import Image from "next/image"
import { useContext, useState, useEffect, useRef } from "react"
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut } from "react-icons/fi"
import Container from "@/components/ui/Container"
import { AuthContext } from "@/context/AuthContext"
import { useCart } from "@/context/CartContext"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle resize and scroll
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Cart item count
  const cartItemCount = cart.reduce((tot, item) => tot + item.quantity, 0)

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
      <Container>
        <div className="flex items-center justify-between">
          
          {/* Logo with Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-[2px] shadow-md group-hover:shadow-lg transition-all">
              <div className="w-full h-full bg-white rounded-[10px] overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/logo.png" 
                  alt="R. K. Life Science"
                  width={36}
                  height={36}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <span className={`hidden md:inline text-lg font-semibold tracking-tight transition-colors ${scrolled ? 'text-gray-800' : 'text-gray-900'}`}>
              R. K. Life Science
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/product" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors rounded-lg">
              Products
            </Link>
            <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors rounded-lg">
              About
            </Link>
            <Link href="/contact" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors rounded-lg">
              Contact
            </Link>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cart Button */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-50">
              <FiShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-1 pl-2">
                <Link href="/profile" className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <img src={user.image} alt={user.name || "Profile"} className="object-cover w-full h-full" />
                    ) : (
                      <FiUser className="w-4 h-4" />
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex gap-1 pl-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div 
            ref={menuRef}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200"
          >
            <Link href="/product" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-gray-700 font-medium hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors">
              Products
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-gray-700 font-medium hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors">
              About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-gray-700 font-medium hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors">
              Contact
            </Link>
            
            <div className="h-px bg-gray-100 my-2"></div>
            
            <Link 
              href="/cart" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 text-gray-700 font-medium hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full px-2 py-0.5">
                  {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
                </span>
              )}
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center overflow-hidden">
                    {user.image ? (
                      <img src={user.image} alt="Profile" className="object-cover w-full h-full" />
                    ) : (
                      <FiUser className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">Account</p>
                    <p className="text-sm font-medium text-gray-800">{user.fname || user.name || 'User'}</p>
                  </div>
                </Link>
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="flex items-center gap-2 px-3 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2 px-1">
                <Link 
                  href="/auth/login" 
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-3 py-3 text-gray-700 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Sign in
                </Link>
                <Link 
                  href="/auth/register" 
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-3 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        )}
      </Container>
    </nav>
  )
}