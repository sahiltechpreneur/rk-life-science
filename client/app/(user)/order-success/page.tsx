"use client"

import { useSearchParams } from "next/navigation"
import Container from "@/components/ui/Container"

export default function OrderSuccessPage(){

 const params = useSearchParams()
 const orderId = params.get("order")

 return(

  <Container>

   <div className="py-24 text-center">

    <h1 className="text-4xl font-bold text-green-600">
     Order Successful 🎉
    </h1>

    <p className="mt-4">
     Your order number is
    </p>

    <p className="text-2xl font-bold mt-2">
     #{orderId}
    </p>

    <p className="mt-4 text-gray-500">
     Thank you for shopping with us.
    </p>

   </div>

  </Container>

 )
}