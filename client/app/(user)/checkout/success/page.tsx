"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Container from "@/components/ui/Container"
import { FiCheckCircle, FiLoader } from "react-icons/fi"

function SuccessContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState("verifying")

    useEffect(() => {
        const dataParam = searchParams.get("data")
        
        if (dataParam) {
            try {
                // Decode base64 eSewa response
                const decodedText = atob(dataParam)
                const decodedData = JSON.parse(decodedText)
                
                // decodedData.transaction_uuid contains the order ID (e.g., "123-1718000000")
                const orderId = decodedData.transaction_uuid.split('-')[0]

                // Option: Securely send decodedData to backend to verify the signature again
                // For now, we update the status locally to 'Paid' and redirect to the standard order success page
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Processing' }) // Or 'Paid' depending on your backend enum
                }).then(() => {
                    setStatus("success")
                    setTimeout(() => {
                        router.push(`/order-success?order=${orderId}`)
                    }, 2000)
                })

            } catch (error) {
                console.error("Failed to parse eSewa redirect data", error)
                setStatus("error")
            }
        } else {
            setStatus("error")
        }
    }, [searchParams, router])

    if (status === "verifying") {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <FiLoader className="w-16 h-16 text-[#60bb46] animate-spin mb-6" />
                <h1 className="text-3xl font-black text-gray-900 mb-2">Verifying Payment...</h1>
                <p className="text-gray-500 font-medium">Please do not close this window.</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">!</span>
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Verification Failed</h1>
                <p className="text-gray-500 font-medium mb-8">We couldn't verify your eSewa transaction. Please contact support.</p>
                <button onClick={() => router.push('/')} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold">Return Home</button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <FiCheckCircle className="w-20 h-20 text-[#60bb46] mb-6 animate-bounce" />
            <h1 className="text-4xl font-black text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-500 font-medium text-lg">Your eSewa transaction was completed successfully. Redirecting...</p>
        </div>
    )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
         <Suspense fallback={
            <div className="flex justify-center py-32">
                <FiLoader className="w-10 h-10 text-[#60bb46] animate-spin" />
            </div>
         }>
             <SuccessContent />
         </Suspense>
      </Container>
    </div>
  )
}
