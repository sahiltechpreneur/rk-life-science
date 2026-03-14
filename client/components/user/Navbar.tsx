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

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
      <Container>
        <div className="flex items-center justify-between">
          
          {/* Logo with Image */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
                <div className="w-full h-full bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-1">
                    <Image
                        src="/images/logo.png" 
                        alt="R. K. Life Science Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
            <span className={`text-xl font-black ${scrolled ? 'text-gray-900' : 'text-gray-900'} group-hover:text-emerald-600 transition-colors`}>
              R. K. Life Science
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-md border border-white/50 shadow-sm rounded-full px-8 py-3">
            <Link href="/product" className="text-gray-600 hover:text-emerald-600 font-bold transition-colors text-sm">
              Products
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-emerald-600 font-bold transition-colors text-sm">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-emerald-600 font-bold transition-colors text-sm">
              Contact
            </Link>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Button */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors group">
              <div className="absolute inset-0 bg-emerald-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <FiShoppingCart className="w-5 h-5 relative z-10" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 border-2 border-white text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm z-20 transition-transform group-hover:scale-110">
                  {cart.reduce((tot, item) => tot + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Link href="/profile" className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-emerald-200 transition-all">
                    {user.image ? (
                      <img src={user.image} alt={user.name || "Profile"} className="object-cover w-full h-full" />
                    ) : (
                      <FiUser className="w-4 h-4" />
                    )}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex pl-4 border-l border-gray-200 gap-3">
                <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-emerald-600 font-bold px-3 py-2 text-sm transition-colors"
                >
                    Sign In
                </Link>
                <Link
                    href="/auth/register"
                    className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-600 text-sm shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-bold"
                >
                    Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative p-2 text-gray-700 hover:text-emerald-600 transition-colors group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-emerald-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            {menuOpen ? <FiX className="w-6 h-6 relative z-10" /> : <FiMenu className="w-6 h-6 relative z-10" />}
            
            {/* Mobile cart badge indication */}
            {!menuOpen && cart.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full z-20"></span>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div 
            ref={menuRef}
            className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-2xl border-b border-gray-100 shadow-2xl py-6 px-6 flex flex-col gap-4 origin-top animate-slideDown"
          >
            <div className="flex flex-col gap-2">
                <Link href="/product" onClick={() => setMenuOpen(false)} className="text-gray-900 font-bold text-lg hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-colors">Products</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="text-gray-900 font-bold text-lg hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-colors">About</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-gray-900 font-bold text-lg hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-colors">Contact</Link>
            </div>
            
            <hr className="border-gray-100 my-2" />
            
            <Link 
              href="/cart" 
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between text-gray-900 font-bold text-lg hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                  <FiShoppingCart className="w-5 h-5" />
                  Cart
              </div>
              {cart.length > 0 && (
                <span className="bg-emerald-500 text-white text-xs font-bold rounded-full px-2.5 py-1 shadow-sm">
                  {cart.reduce((tot, item) => tot + item.quantity, 0)} items
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link 
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center overflow-hidden border border-emerald-200">
                    {user.image ? (
                      <img src={user.image} alt="Profile" className="object-cover w-full h-full" />
                    ) : (
                      <FiUser className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Account</p>
                      <p className="font-black text-gray-900">{user.fname}</p>
                  </div>
                </Link>
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }}
                  className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                >
                  <FiLogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link 
                  href="/auth/login" 
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center bg-gray-50 text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/auth/register" 
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-600 shadow-xl transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </Container>
    </nav>
  )
}