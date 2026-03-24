import Container from "@/components/ui/Container"
import { FiTruck } from "react-icons/fi"

export default function ShippingPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gray-900 border-b border-gray-800 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-gray-900 to-gray-900 pointer-events-none"></div>
        <Container className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-white/5 text-lightGreen rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-xl">
                <FiTruck className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                Shipping & <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightGreen to-secondary">Returns</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-lg font-medium">Seamless logistics to get essential health products to your doorstep safely.</p>
        </Container>
      </div>

      <Container className="relative z-20 -mt-10">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 md:p-12 lg:p-16 max-w-4xl mx-auto prose prose-lg prose-emerald text-gray-600 font-medium">
            
            <h2>Shipping Policies</h2>
            <p>We pride ourselves on an incredibly reliable logistics network dedicated exclusively to nutraceutical and medical distribution.</p>
            <ul>
                <li><strong>Local Deliveries (Kathmandu Valley):</strong> Orders verified before 3:00 PM are delivered the next working day. A standard flat rate applies for orders under NPR 5,000.</li>
                <li><strong>Out of Valley:</strong> Delivered via partnered cargo & courier services within 2-4 business days. Shipping rates calculate automatically based on total weight and destination city at checkout.</li>
                <li><strong>Cold Chain Storage:</strong> Certain supplements require cold chain integrity. These items feature a specialized delivery system preventing heat exposure.</li>
            </ul>

            <h2>Return Policies</h2>
            <p>Because we distribute health products, return parameters are extremely strict to maintain consumer safety and product integrity.</p>
            <ul>
                <li><strong>Non-returnable Items:</strong> Once sealed products leave our logistics chain, they cannot be returned due to change-of-mind. This guarantees 100% untouched products for all buyers.</li>
                <li><strong>Damaged on Arrival:</strong> If an item arrives structurally damaged or completely defected during transit, you are entitled to a free immediate replacement. You must instantly report damages within 48 hours to <code>returns.rklife@gmail.com</code> with photo evidence.</li>
                <li><strong>Order Mistakes:</strong> If R.K Life Science dispatched the incorrect item, we will coordinate a rapid reverse-pickup at our own absolute cost and supply the appropriate product immediately.</li>
            </ul>
            
        </div>
      </Container>
    </div>
  )
}
