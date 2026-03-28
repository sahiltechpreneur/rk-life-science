import { FiTruck, FiPackage, FiRotateCcw, FiClock, FiMapPin } from "react-icons/fi"

export default function ShippingPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pb-12 mb-10">
        <div className="text-center px-4 md:px-8 lg:px-12">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FiTruck className="w-5 h-5 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Shipping & Returns
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Fast, reliable delivery across Nepal
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Shipping Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <FiTruck className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Shipping policy</h2>
            </div>
            
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Kathmandu Valley</p>
                  <p className="text-gray-500">Orders confirmed before 3 PM delivered next working day. Free shipping on orders over NPR 5,000.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <FiClock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Outside Valley</p>
                  <p className="text-gray-500">Delivery within 2-4 business days via partnered courier services. Shipping calculated at checkout.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <FiPackage className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-700">Cold Chain Items</p>
                  <p className="text-gray-500">Temperature-sensitive products shipped with special packaging to maintain integrity.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Returns Section */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                <FiRotateCcw className="w-4 h-4 text-emerald-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Return policy</h2>
            </div>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-gray-700 mb-1">Non-returnable items</p>
                <p className="text-gray-500">For safety reasons, sealed products cannot be returned for change of mind.</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Damaged on arrival</p>
                <p className="text-gray-500">If your order arrives damaged, contact us within 48 hours at <span className="text-emerald-600">returns.rklife@gmail.com</span> with photos for a free replacement.</p>
              </div>
              
              <div>
                <p className="font-medium text-gray-700 mb-1">Wrong item received</p>
                <p className="text-gray-500">We'll arrange pickup and send the correct item at no cost to you.</p>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="bg-gray-50 rounded-lg p-4 text-center text-xs text-gray-400 border border-gray-100">
            For questions about your order, email support@rklifescience.com or call +977-9768771762
          </div>
        </div>
      </div>
    </div>
  )
}