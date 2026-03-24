"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Container from "@/components/ui/Container"
import { FiCheckCircle, FiLoader, FiXCircle } from "react-icons/fi"

function KhaltiCallbackContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [status, setStatus] = useState("verifying")
    const [message, setMessage] = useState("Please wait while we verify your transaction.")

    useEffect(() => {
        const pidx = searchParams.get("pidx")
        const txnStatus = searchParams.get("status")
        const orderId = searchParams.get("purchase_order_id")

        if (pidx && txnStatus && orderId) {
            if (txnStatus === "Completed") {
                // In a production environment, you MUST hit your backend here which then hits:
                // https://a.khalti.com/api/v2/epayment/lookup/ with the pidx to verify payment mathematically.
                // For this demo, we trust the callback status and update our local database.

                fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Processing' }) // Or 'Paid'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setStatus("success")
                        setTimeout(() => {
                            router.push(`/order-success?order=${orderId}`)
                        }, 2000)
                    } else {
                        setStatus("error")
                        setMessage("Payment captured, but order update failed on our server.")
                    }
                })
                .catch(err => {
                    console.error("Order verification error:", err)
                    setStatus("error")
                    setMessage("Network error verifying order status.")
                })

            } else if (txnStatus === "User canceled") {
                setStatus("canceled")
                setMessage("You cancelled the payment process.")
            } else {
                setStatus("error")
                setMessage(`Payment failed with status: ${txnStatus}`)
            }
        } else {
            setStatus("error")
            setMessage("Invalid callback parameters received from Khalti.")
        }
    }, [searchParams, router])

    if (status === "verifying") {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <FiLoader className="w-16 h-16 text-[#5c2d91] animate-spin mb-6" />
                <h1 className="text-3xl font-black text-gray-900 mb-2">Verifying Khalti Payment...</h1>
                <p className="text-gray-500 font-medium">Please do not close this window.</p>
            </div>
        )
    }

    if (status === "canceled") {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <FiXCircle className="w-20 h-20 text-gray-400 mb-6" />
                <h1 className="text-3xl font-black text-gray-900 mb-2">Payment Cancelled</h1>
                <p className="text-gray-500 font-medium mb-8">{message}</p>
                <button onClick={() => router.push('/cart')} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold">Return to Cart</button>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">!</span>
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Transaction Failed</h1>
                <p className="text-gray-500 font-medium mb-8">{message}</p>
                <button onClick={() => router.push('/checkout')} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Try Again</button>
            </div>
        )
    }

    // Success State
    return (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <FiCheckCircle className="w-20 h-20 text-[#5c2d91] mb-6 animate-bounce" />
            <h1 className="text-4xl font-black text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-500 font-medium text-lg">Your Khalti transaction was completed successfully. Redirecting...</p>
        </div>
    )
}

export default function KhaltiCallbackPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container>
         <Suspense fallback={
            <div className="flex justify-center py-32">
                <FiLoader className="w-10 h-10 text-[#5c2d91] animate-spin" />
            </div>
         }>
             <KhaltiCallbackContent />
         </Suspense>
      </Container>
    </div>
  )
}
