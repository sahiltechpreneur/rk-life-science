"use client"
import Container from "@/components/ui/Container"
import { FiXCircle } from "react-icons/fi"
import { useRouter } from "next/navigation"

export default function CheckoutFailurePage() {
    const router = useRouter()

    return (
        <div className="bg-gray-50 min-h-screen flex items-center">
            <Container>
                <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-14 text-center shadow-xl border border-gray-100">
                    <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
                        <FiXCircle className="w-12 h-12 relative z-10" />
                    </div>
                    
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Payment Failed</h1>
                    <p className="text-gray-500 font-medium text-lg mb-10 leading-relaxed">
                        Your eSewa transaction could not be completed. You have not been charged.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => router.push('/cart')}
                            className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-darkGreen transition-colors shadow-lg"
                        >
                            Return to Cart
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}
