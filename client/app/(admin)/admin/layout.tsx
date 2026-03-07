import Sidebar from "@/components/admin/Sidebar";

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