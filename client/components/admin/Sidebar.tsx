"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaSignOutAlt, FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FiX, FiMessageSquare, FiMail } from "react-icons/fi"

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
        { name: "Contacts", href: "/admin/contacts", icon: <FiMessageSquare /> },
        { name: "Newsletter", href: "/admin/newsletters", icon: <FiMail /> },
    ]

    return(
        <div className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 z-50 shadow-sm
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
            ${isCollapsed ? 'w-16' : 'w-56'}`}>
            
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-5 ${isCollapsed ? 'flex-col gap-3' : ''}`}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-emerald-600 text-sm font-bold">RK</span>
                    </div>
                    {!isCollapsed && (
                        <h1 className="text-sm font-semibold text-gray-800 tracking-tight">
                            Admin
                        </h1>
                    )}
                </div>
                
                <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
                    <FiX className="w-4 h-4" />
                </button>

                {!isOpen && (
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-gray-50 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                    >
                        {isCollapsed ? <FaChevronRight size={10} /> : <FaChevronLeft size={10} />}
                    </button>
                )}
            </div>

            <nav className="flex flex-col gap-1 flex-grow px-2 mt-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin")
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative text-sm
                                ${isActive 
                                    ? "bg-emerald-50 text-emerald-600" 
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                }`}
                            title={isCollapsed ? item.name : ""}
                        >
                            <span className={`text-base transition-colors ${isActive ? "text-emerald-500" : "text-gray-400 group-hover:text-gray-500"}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <span>{item.name}</span>}
                            
                            {isCollapsed && (
                                <span className="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-3 border-t border-gray-100 mt-auto">
                <button
                    onClick={logout}
                    className={`flex items-center justify-center gap-2 w-full text-gray-400 hover:text-red-500 py-2 rounded-lg transition-colors text-sm
                    ${isCollapsed ? 'px-0' : 'px-3'}`}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <FaSignOutAlt className="shrink-0 w-3.5 h-3.5" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>

        </div>
    )
}