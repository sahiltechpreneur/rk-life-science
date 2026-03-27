"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Container from "@/components/ui/Container"
import { FiCheckCircle, FiLoader, FiAlertCircle, FiHome } from "react-icons/fi"

function SuccessContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState("verifying")
    const [errorMsg, setErrorMsg] = useState("")

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
                }).catch(() => {
                    setErrorMsg("Could not update order status")
                    setStatus("error")
                })

            } catch (error) {
                console.error("Failed to parse eSewa redirect data", error)
                setErrorMsg("Invalid payment response")
                setStatus("error")
            }
        } else {
            setErrorMsg("No payment data received")
            setStatus("error")
        }
    }, [searchParams, router])

    if (status === "verifying") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-5"></div>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">Verifying payment...</h1>
                <p className="text-sm text-gray-500">Please wait while we confirm your transaction</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5">
                    <FiAlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">Verification failed</h1>
                <p className="text-sm text-gray-500 mb-6 max-w-sm">
                    {errorMsg || "We couldn't verify your payment. Please contact support for assistance."}
                </p>
                <button 
                    onClick={() => router.push('/')} 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <FiHome className="w-4 h-4" />
                    Return home
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5">
                <FiCheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Payment successful!</h1>
            <p className="text-sm text-gray-500">Your transaction was completed. Redirecting...</p>
        </div>
    )
}

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <Container>
         <Suspense fallback={
            <div className="min-h-[60vh] flex justify-center items-center">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
         }>
             <SuccessContent />
         </Suspense>
      </Container>
    </div>
  )
}