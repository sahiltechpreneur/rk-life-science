"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaSignOutAlt, FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { FiX, FiMessageSquare, FiMail } from "react-icons/fi"

import { useContext } from "react"
import { AuthContext } from "@/context/AuthContext"

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen, isCollapsed, setIsCollapsed }: SidebarProps){

    const router = useRouter()
    const pathname = usePathname()
    const { logout: globalLogout } = useContext(AuthContext)

    const logout = ()=>{
        globalLogout()
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
        <div className={`fixed left-0 top-0 h-screen bg-slate-800 border-r border-slate-700 flex flex-col transition-all duration-300 z-50 shadow-sm
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
            ${isCollapsed ? 'w-16' : 'w-56'}`}>
            
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-5 ${isCollapsed ? 'flex-col gap-3' : ''}`}>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-emerald-400 text-sm font-bold">RK</span>
                    </div>
                    {!isCollapsed && (
                        <h1 className="text-sm font-semibold text-slate-100 tracking-tight">
                            Admin
                        </h1>
                    )}
                </div>
                
                <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-slate-200 transition-colors">
                    <FiX className="w-4 h-4" />
                </button>

                {!isOpen && (
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 border border-slate-600 hover:bg-emerald-500/10 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 transition-all"
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
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                    : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-transparent"
                                }`}
                            title={isCollapsed ? item.name : ""}
                        >
                            <span className={`text-base transition-colors ${isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                                {item.icon}
                            </span>
                            {!isCollapsed && <span>{item.name}</span>}
                            
                            {isCollapsed && (
                                <span className="absolute left-full ml-3 px-2 py-1 bg-slate-700 border border-slate-600 text-slate-100 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] shadow-lg">
                                    {item.name}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-3 border-t border-slate-700 mt-auto">
                <button
                    onClick={logout}
                    className={`flex items-center justify-center gap-2 w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 py-2 rounded-lg transition-colors text-sm
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