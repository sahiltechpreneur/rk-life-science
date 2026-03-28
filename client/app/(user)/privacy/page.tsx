"use client"
import { FiShield, FiLock, FiEye, FiMail } from "react-icons/fi"

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pb-12 mb-10">
        <div className="text-center px-4 md:px-8 lg:px-12">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiShield className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Last updated: March 2026. We take your privacy seriously.
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-8 md:p-10">
          
          <div className="prose prose-sm max-w-none text-gray-600">
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiLock className="w-4 h-4 text-emerald-500" />
                1. Information we collect
              </h2>
              <p className="text-sm leading-relaxed">
                We collect information you provide directly to us when creating an account, placing an order, or contacting our support team.
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                <li><strong className="text-gray-700">Personal data:</strong> Name, email, phone number, shipping address</li>
                <li><strong className="text-gray-700">Transaction data:</strong> Order details and payment information</li>
                <li><strong className="text-gray-700">Usage data:</strong> How you interact with our website</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiEye className="w-4 h-4 text-emerald-500" />
                2. How we use your information
              </h2>
              <p className="text-sm leading-relaxed">
                We use your information to:
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                <li>Process and deliver your orders securely</li>
                <li>Manage your account and prevent fraud</li>
                <li>Provide customer support</li>
                <li>Send order updates and important notifications</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiShield className="w-4 h-4 text-emerald-500" />
                3. Data security
              </h2>
              <p className="text-sm leading-relaxed">
                We use industry-standard security measures including SSL encryption to protect your personal information. Your data is stored securely and access is limited to authorized personnel only.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Third-party disclosure
              </h2>
              <p className="text-sm leading-relaxed">
                We do not sell, trade, or transfer your personal information to outside parties. Trusted partners who assist in operating our website or fulfilling orders are bound by confidentiality agreements.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FiMail className="w-4 h-4 text-emerald-500" />
                5. Contact us
              </h2>
              <p className="text-sm leading-relaxed">
                If you have questions about this privacy policy, please contact us:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm">
                <p className="mb-1"><strong className="text-gray-700">Email:</strong> privacy.rklifescience@gmail.com</p>
                <p><strong className="text-gray-700">Address:</strong> Shankhamul, Kathmandu, Nepal</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}