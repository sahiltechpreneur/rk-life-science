"use client";

import Sidebar from "@/components/admin/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function AdminClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile state
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop state

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const adminFlag = localStorage.getItem("admin");
    if (adminFlag === "true") {
      setIsAuthenticated(true);
      if (isLoginPage) {
        // If already logged in, redirect away from login page
        router.push("/admin/dashboard");
      }
    } else {
      setIsAuthenticated(false);
      if (!isLoginPage) {
        // If not logged in and trying to access secure pages, redirect to login
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  // Don't render content until auth is checked
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If we are on the login page (and not authenticated), render children without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated, the useEffect will redirect. Render nothing to prevent flicker
  if (!isAuthenticated) {
    return null;
  }

  // Render the secure admin layout
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Desktop and Mobile Overlay */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Top Header for Mobile & Quick Actions */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 -ml-2 text-gray-500 hover:text-primary md:hidden"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          
          <div className="md:hidden font-black text-gray-900 text-lg">RK Admin</div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Administrator</p>
              <p className="text-sm font-bold text-gray-900">RK Dashboard</p>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
