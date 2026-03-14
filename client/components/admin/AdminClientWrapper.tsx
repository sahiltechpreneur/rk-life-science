"use client";

import Sidebar from "@/components/admin/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

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
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-8 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
