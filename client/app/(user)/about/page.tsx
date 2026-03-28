import { FiAward, FiHeart, FiTrendingUp } from "react-icons/fi"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      
      {/* Hero Section — cleaner, less heavy */}
      <div className="bg-white border-b border-gray-100 pb-16 mb-12">
        <div className="text-center px-4 md:px-8 lg:px-12">
          <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full mb-5">
            About us
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            We believe in better{" "}
            <span className="text-emerald-600">healthcare</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            R.K Life Science is a premium wholesale distributor of nutraceutical products, 
            multivitamins, and medical essentials. We're on a mission to empower health 
            with quality you can trust.
          </p>
        </div>
      </div>

      <div className="px-4 md:px-8 lg:px-12">
        
        {/* Core Values Grid — cleaner cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <FiAward className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentic Quality</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Partnering with certified manufacturers to ensure every product meets global quality standards.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <FiTrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Scalable Supply</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Robust distribution network ensuring your pharmacy or clinic never runs out of inventory.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center mb-4">
              <FiHeart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer First</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Lasting relationships built on mutual trust, transparency, and top-tier support.
            </p>
          </div>
        </div>

        </div>
    </div>
  )
}