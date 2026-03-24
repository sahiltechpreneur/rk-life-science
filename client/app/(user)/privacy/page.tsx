import Container from "@/components/ui/Container"
import { FiShield } from "react-icons/fi"

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gray-900 border-b border-gray-800 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-gray-900 to-gray-900 pointer-events-none"></div>
        <Container className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 text-lightGreen rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-xl">
                <FiShield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightGreen to-secondary">Policy</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg font-medium">Last updated: March 2026. Learn how we collect, use, and protect your data.</p>
        </Container>
      </div>

      <Container className="relative z-20 -mt-10">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 md:p-12 lg:p-16 max-w-4xl mx-auto prose prose-lg prose-emerald text-gray-600 font-medium">
            
            <h2>1. Information We Collect</h2>
            <p>At R.K Life Science, we are committed to protecting your privacy. We collect information that you directly provide to us when creating an account, subscribing to our newsletter, or contacting customer support.</p>
            <ul>
                <li><strong>Personal Data:</strong> Name, email address, postal address, phone number.</li>
                <li><strong>Transaction Data:</strong> Details about payments and the products you have purchased from us.</li>
                <li><strong>Usage Data:</strong> Information on how you interact with our website.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>Your data is safely stored and processed to:</p>
            <ul>
                <li>Process and deliver your medical and nutraceutical orders securely.</li>
                <li>Manage your account and prevent fraudulent transactions.</li>
                <li>Provide customer support and respond to your inquiries.</li>
                <li>Comply with legal obligations concerning medical distribution.</li>
            </ul>

            <h2>3. Data Security measures</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Our servers use SSL technology to ensure that all data passed between the web server and browsers remain private and integral.</p>

            <h2>4. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

            <h2>5. Contact regarding Privacy</h2>
            <p>If there are any questions regarding this privacy policy, you may contact our compliance team using the information below:</p>
            <p><strong>Email:</strong> privacy.rklifescience@gmail.com <br/>
            <strong>Address:</strong> Shankhamul, Kathmandu, Nepal</p>
            
        </div>
      </Container>
    </div>
  )
}
