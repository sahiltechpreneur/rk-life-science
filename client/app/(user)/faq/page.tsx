"use client"
import { useState } from "react"
import Container from "@/components/ui/Container"
import { FiHelpCircle, FiChevronDown } from "react-icons/fi"

const faqs = [
  {
    question: "Do you supply to individual customers or only pharmacies?",
    answer: "We primarily operate as a B2B wholesale distributor supplying to pharmacies, clinics, and hospitals. However, individual consumers can also register and purchase our over-the-counter nutraceutical products online."
  },
  {
    question: "What is your typical delivery timeframe?",
    answer: "For locations within Kathmandu Valley, we guarantee next-day delivery on all in-stock items. Shipments outside the valley typically arrive within 2-4 business days via our secure logistic partners."
  },
  {
    question: "Are your products certified and authentic?",
    answer: "Absolutely. We strictly partner with WHO-GMP certified manufacturers. All our nutraceuticals and medical products are 100% authentic, passing rigorous quality analysis before distribution."
  },
  {
    question: "How do I return a damaged product?",
    answer: "If you receive a flawed or damaged product, you must notify our support team within 48 hours of delivery. We will arrange a free pickup and offer a complete replacement."
  },
  {
    question: "What payment methods do you accept online?",
    answer: "We accept payments via eSewa, Fonepay, and direct bank transfers. Cash on Delivery (COD) is also available for verified B2B partners within Kathmandu."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gray-900 border-b border-gray-800 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-gray-900 to-gray-900 pointer-events-none"></div>
        <Container className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 text-lightGreen rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-xl">
                <FiHelpCircle className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightGreen to-secondary">Questions</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg font-medium">Everything you need to know about our products, billing, and distribution.</p>
        </Container>
      </div>

      <Container className="relative z-20 -mt-10">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 md:p-12 max-w-4xl mx-auto">
            
            <div className="flex flex-col gap-4">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`border rounded-2xl transition-all duration-300 ${openIndex === index ? 'border-primary shadow-md bg-lightGreen/10' : 'border-gray-200 hover:border-primary/50 bg-white'}`}
                    >
                        <button 
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                        >
                            <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${openIndex === index ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                <FiChevronDown />
                            </div>
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48' : 'max-h-0'}`}>
                            <p className="px-6 pb-6 text-gray-600 font-medium leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
                <p className="text-gray-500 font-medium mb-6">Can't find the answer you're looking for? Please contact our friendly team.</p>
                <a href="/contact" className="inline-block bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-darkGreen transition-colors shadow-lg">
                    Contact Support
                </a>
            </div>

        </div>
      </Container>
    </div>
  )
}
