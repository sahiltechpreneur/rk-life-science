"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Sidebar(){

 const router = useRouter()

 const logout = ()=>{
  localStorage.removeItem("token")
  router.push("/admin/login")
 }

 return(

 <div className="fixed left-0 top-0 h-screen w-64 bg-green-700 text-white flex flex-col p-6">

  <h1 className="text-2xl font-bold mb-10">
   RK Admin
  </h1>

  <nav className="flex flex-col gap-4">

   <Link href="/admin/dashboard">
   Dashboard
   </Link>

   <Link href="/admin/products">
   Products
   </Link>

   <Link href="/admin/orders">
   Orders
   </Link>

   <Link href="/admin/users">
   Users
   </Link>

   <Link href="/admin/reports">
   Reports
   </Link>

  </nav>

  <button
  onClick={logout}
  className="mt-auto bg-white text-green-700 py-2 rounded"
  >
  Logout
  </button>

 </div>

 )
}