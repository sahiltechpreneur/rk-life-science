"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaSignOutAlt, FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FiX } from "react-icons/fi"

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: SidebarProps){

    const router = useRouter()
    const pathname = usePathname()

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        router.push("/admin/login")
    }

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
        { name: "Products", href: "/admin/products", icon: <FaBoxOpen /> },
        { name: "Orders", href: "/admin/orders", icon: <FaShoppingCart /> },
        { name: "Users", href: "/admin/users", icon: <FaUsers /> },
    ]

    return(
        <div className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-800 text-gray-300 flex flex-col transition-all duration-300 z-50 shadow-2xl
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
            ${isCollapsed ? 'w-20' : 'w-64'}`}>
            
            {/* Header */}
            <div className={`flex items-center justify-between p-6 ${isCollapsed ? 'flex-col gap-4' : ''}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/50 shadow-inner shrink-0">
                        <span className="text-emerald-500 text-xl font-bold">RK</span>
                    </div>
                    {!isCollapsed && (
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">
                            Admin
                        </h1>
                    )}
                </div>
                
                {/* Mobile Close Button */}
                <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                    <FiX className="w-6 h-6" />
                </button>

                {/* Desktop Collapse Toggle */}
                {!isOpen && (
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 hover:bg-emerald-500 hover:text-white transition-all"
                    >
                        {isCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
                    </button>
                )}
            </div>

            <nav className="flex flex-col gap-2 flex-grow px-4 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin")
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium group relative
                                ${isActive 
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                                    : "hover:bg-gray-800 hover:text-white"
                                }`}
                            title={isCollapsed ? item.name : ""}
                        >
                            <span className={`text-lg transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <span>{item.name}</span>}
                            
                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <span className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] border border-gray-800 shadow-xl">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className={`flex items-center justify-center gap-2 bg-gray-800/50 w-full hover:bg-red-500/10 text-gray-400 hover:text-red-400 py-3 rounded-xl transition-all duration-300 border border-gray-700/50 hover:border-red-500/30 font-semibold group
                    ${isCollapsed ? 'px-0' : 'px-4'}`}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <FaSignOutAlt className="shrink-0" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>

        </div>
    )
}