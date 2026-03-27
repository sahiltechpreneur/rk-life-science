import Container from "@/components/ui/Container"
import { FiCheckSquare, FiFileText, FiShield, FiUserCheck, FiCopy, FiXCircle } from "react-icons/fi"

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pb-12 mb-10">
        <Container className="text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiFileText className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </Container>
      </div>

      <Container>
        <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
          
          <div className="prose prose-sm max-w-none text-gray-600">
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiCheckSquare className="w-4 h-4 text-emerald-500" />
                <h2 className="text-base font-semibold text-gray-900 m-0">1. Acceptance of terms</h2>
              </div>
              <p className="text-sm leading-relaxed">
                By accessing and using the R.K Life Science platform, you agree to be bound by these terms. If you do not agree, please do not use our services.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiShield className="w-4 h-4 text-emerald-500" />
                <h2 className="text-base font-semibold text-gray-900 m-0">2. Product use & liability</h2>
              </div>
              <p className="text-sm leading-relaxed">
                Products are sold for their intended use. We ensure quality upon dispatch. Buyers are responsible for proper storage and use per manufacturer guidelines. We are not liable for misuse, improper storage, or off-label use.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiUserCheck className="w-4 h-4 text-emerald-500" />
                <h2 className="text-base font-semibold text-gray-900 m-0">3. Account registration & security</h2>
              </div>
              <p className="text-sm leading-relaxed">
                You must provide accurate, complete information when creating an account. You are responsible for safeguarding your password and for all activities under your account.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiCopy className="w-4 h-4 text-emerald-500" />
                <h2 className="text-base font-semibold text-gray-900 m-0">4. Intellectual property</h2>
              </div>
              <p className="text-sm leading-relaxed">
                The service and its original content, features, and functionality are the exclusive property of R.K Life Science. Our trademarks may not be used without prior written consent.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FiXCircle className="w-4 h-4 text-emerald-500" />
                <h2 className="text-base font-semibold text-gray-900 m-0">5. Order cancellation</h2>
              </div>
              <p className="text-sm leading-relaxed">
                We reserve the right to refuse or cancel orders due to product availability, pricing errors, or suspected fraudulent activity.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Last updated: March 2026. For questions about these terms, contact us at legal@rklifescience.com
              </p>
            </div>

          </div>
        </div>
      </Container>
    </div>
  )
}