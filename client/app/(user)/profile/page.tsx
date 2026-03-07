import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function ProfilePage(){

 return(

  <ProtectedRoute>

   <div>
   Profile Page
   </div>

  </ProtectedRoute>

 )
}