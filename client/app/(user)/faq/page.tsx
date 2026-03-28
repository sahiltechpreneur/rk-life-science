"use client"
import { useState } from "react"
import { FiHelpCircle, FiChevronDown, FiMail } from "react-icons/fi"

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
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pb-12 mb-10">
        <div className="text-center px-4 md:px-8 lg:px-12">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiHelpCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Quick answers to common questions about our products and services
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto">
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800 text-sm">
                    {faq.question}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <FiChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-200 ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
              <FiMail className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Still have questions?</h3>
            <p className="text-xs text-gray-500 mb-4">Can't find what you're looking for? Contact us directly.</p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-1.5 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
            >
              Contact support
              <span className="text-lg">→</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}