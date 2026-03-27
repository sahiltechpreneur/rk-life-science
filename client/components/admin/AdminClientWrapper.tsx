"use client";

import Sidebar from "@/components/admin/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

export default function AdminClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const adminFlag = localStorage.getItem("admin");
    if (adminFlag === "true") {
      setIsAuthenticated(true);
      if (isLoginPage) {
        router.push("/admin/dashboard");
      }
    } else {
      setIsAuthenticated(false);
      if (!isLoginPage) {
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <header className="bg-white border-b border-gray-100 h-14 flex items-center justify-between px-5 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 -ml-1.5 text-gray-500 hover:text-emerald-600 md:hidden rounded-lg hover:bg-gray-50"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          
          <div className="md:hidden font-semibold text-gray-800 text-sm">Admin</div>
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center">
              <FiUser className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-400">Administrator</p>
              <p className="text-xs font-medium text-gray-700">Admin Panel</p>
            </div>
          </div>
        </header>

        <main className="p-5 md:p-6">
          {children}
        </main>
      </div>
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}