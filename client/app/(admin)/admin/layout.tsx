import Sidebar from "@/components/admin/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "R. K. Life Science | Admin Dashboard",
  description: "Wholesale distributor for nutraceutical products",
};

export default function AdminLayout({
 children
}:{children:React.ReactNode}){

 return(

  <div className="flex">

   <Sidebar/>

   <main className="ml-64 w-full p-8 bg-gray-50 min-h-screen">
    {children}
   </main>

  </div>

 )
}