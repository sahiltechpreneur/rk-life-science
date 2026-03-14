import { FiTruck, FiShield, FiHeart, FiAward } from "react-icons/fi"

export default function Services() {
  const services = [
    { 
      title: "Fast Delivery", 
      desc: "Quick, reliable delivery across Nepal with real-time tracking.",
      icon: <FiTruck className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-500",
      bgClass: "bg-blue-50"
    },
    { 
      title: "Certified Quality", 
      desc: "100% genuine nutraceuticals sourced directly from verified manufacturers.",
      icon: <FiShield className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500",
      bgClass: "bg-emerald-50"
    },
    { 
      title: "Extensive Support", 
      desc: "Dedicated healthcare professionals available for your inquiries.",
      icon: <FiHeart className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500",
      bgClass: "bg-amber-50"
    },
    { 
        title: "Industry Leading", 
        desc: "Trusted by over 500+ pharmacies and hospitals nationwide.",
        icon: <FiAward className="w-8 h-8" />,
        color: "from-purple-500 to-pink-500",
        bgClass: "bg-purple-50"
    }
  ]

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Why Choose Us</h2>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900">
            Uncompromising <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Excellence</span>
          </h3>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto font-medium">We pride ourselves on providing the highest quality healthcare products combined with unparalleled service.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div 
              key={service.title} 
              className="group bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${service.bgClass} rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700 ease-in-out`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${service.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}