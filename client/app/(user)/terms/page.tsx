import Container from "@/components/ui/Container"
import { FiCheckSquare } from "react-icons/fi"

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gray-900 border-b border-gray-800 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-gray-900 to-gray-900 pointer-events-none"></div>
        <Container className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 text-lightGreen rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-xl">
                <FiCheckSquare className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightGreen to-secondary">Conditions</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg font-medium">Please read these terms carefully before using our platform.</p>
        </Container>
      </div>

      <Container className="relative z-20 -mt-10">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 md:p-12 lg:p-16 max-w-4xl mx-auto prose prose-lg prose-emerald text-gray-600 font-medium">
            
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and utilizing the R.K Life Science platform for wholesale nutraceutical and medical product distribution, you accept and agree to be bound by the terms and provisions of this agreement.</p>

            <h2>2. Product Use & Liability</h2>
            <p>All products distributed by R.K Life Science are sold for their intended use. We ensure products leave our facilities in perfect condition. It is the buyer's (clinics, pharmacies, or individuals) responsibility to store and utilize products per manufacturer guidelines. We hold no liability for misuse, improper storage, or off-label use of any distributed items.</p>

            <h2>3. Account Registration & Security</h2>
            <p>When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are entirely responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>

            <h2>4. Intellectual Property</h2>
            <p>The Service and its original content (excluding products displayed), features, functionality, and aesthetic design are and will remain the exclusive property of R.K Life Science and its licensors. Our trademarks may not be used in connection with any product or service without the prior written consent of R.K Life Science.</p>

            <h2>5. Order Cancellation</h2>
            <p>We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product availability, errors in the description or price of the product, error in your order, or suspicion of fraudulent transaction.</p>
            
        </div>
      </Container>
    </div>
  )
}
