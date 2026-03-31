"use client";

import Sidebar from "@/components/admin/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { AuthContext } from "@/context/AuthContext";

export default function AdminClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;

    const adminFlag = localStorage.getItem("admin") === "true";
    const hasAdminRole = user?.role === 'admin';

    if (adminFlag || hasAdminRole) {
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
  }, [pathname, router, user, loading]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
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
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 h-14 flex items-center justify-between px-5 sticky top-0 z-40 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 -ml-1.5 text-slate-400 hover:text-emerald-400 md:hidden rounded-lg hover:bg-slate-700 transition-colors"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          
          <div className="md:hidden font-semibold text-slate-100 text-sm tracking-wide">Admin</div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center shadow-inner">
              <FiUser className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Administrator</p>
              <p className="text-xs font-medium text-slate-200">Admin Panel</p>
            </div>
          </div>
        </header>

        <main className="p-5 md:p-6 text-slate-200">
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