"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaSignOutAlt, FaShoppingCart } from "react-icons/fa"

export default function Sidebar(){

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
        <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 text-gray-300 flex flex-col p-6 shadow-2xl z-50">
            
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/50 shadow-inner">
                    <span className="text-primary text-xl font-bold">RK</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                    Admin
                </h1>
            </div>

            <nav className="flex flex-col gap-2 flex-grow">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin")
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                                isActive 
                                ? "bg-primary text-white shadow-md shadow-primary/20" 
                                : "hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <span className={isActive ? "text-white" : "text-gray-400"}>
                                {item.icon}
                            </span>
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <button
                onClick={logout}
                className="mt-6 flex items-center justify-center gap-2 bg-gray-800 w-full hover:bg-red-500/10 text-gray-300 hover:text-red-400 py-3 rounded-lg transition-all duration-300 border border-gray-700 hover:border-red-500/30 font-semibold"
            >
                <FaSignOutAlt />
                Logout
            </button>

        </div>
    )
}