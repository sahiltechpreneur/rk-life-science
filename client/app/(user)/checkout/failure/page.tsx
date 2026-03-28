"use client"
import { FiXCircle, FiArrowLeft, FiShoppingBag } from "react-icons/fi"
import { useRouter } from "next/navigation"

export default function CheckoutFailurePage() {
    const router = useRouter()

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-16 flex items-center">
      <div className="px-4 md:px-8 lg:px-12 w-full">
                <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-100 p-8 text-center shadow-sm">
                    
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                        <FiXCircle className="w-7 h-7 text-red-500" />
                    </div>
                    
                    <h1 className="text-xl font-semibold text-gray-800 mb-2">Payment failed</h1>
                    <p className="text-sm text-gray-500 mb-6">
                        Your transaction couldn't be completed. You have not been charged.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button 
                            onClick={() => router.push('/cart')}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            <FiShoppingBag className="w-4 h-4" />
                            Return to cart
                        </button>
                        <button 
                            onClick={() => router.push('/')}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FiArrowLeft className="w-4 h-4" />
                            Continue shopping
                        </button>
                    </div>
                </div>
      </div>
        </div>
    )
}