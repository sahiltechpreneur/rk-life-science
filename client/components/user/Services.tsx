import { FiTruck, FiShield, FiHeart, FiAward } from "react-icons/fi";

export default function Services() {
  const services = [
    { 
      title: "Fast Delivery", 
      desc: "Quick, reliable delivery across Nepal with real-time tracking.",
      icon: <FiTruck className="w-7 h-7" />,
      color: "from-sky-500 to-blue-600",
      bgLight: "bg-sky-50",
      borderLight: "border-sky-100"
    },
    { 
      title: "Certified Quality", 
      desc: "100% genuine nutraceuticals sourced directly from verified manufacturers.",
      icon: <FiShield className="w-7 h-7" />,
      color: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50",
      borderLight: "border-emerald-100"
    },
    { 
      title: "Extensive Support", 
      desc: "Dedicated healthcare professionals available for your inquiries.",
      icon: <FiHeart className="w-7 h-7" />,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      borderLight: "border-amber-100"
    },
    { 
      title: "Industry Leading", 
      desc: "Trusted by over 500+ pharmacies and hospitals nationwide.",
      icon: <FiAward className="w-7 h-7" />,
      color: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50",
      borderLight: "border-violet-100"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      {/* 
        Soft background texture — feels like paper, not a screen.
        Just enough to add warmth without competing with content.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>
      
      {/* 
        A single, soft glow behind the section title.
        One is enough — multiple blurs start to feel "designed by committee".
      */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-100/40 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header — simple, confident, no over-explaining */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full mb-4">
            Why partner with us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            What makes us different
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            It's not just about what we sell — it's how we do business. Straightforward, reliable, and built on trust.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div 
              key={service.title} 
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              {/* 
                Subtle hover accent — just a hint of color, not overwhelming.
                Real human designers know that less is often more.
              */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.bgLight} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
              
              <div className="relative">
                {/* Icon container — grounded, not floating in space */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-md mb-5`}>
                  {service.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.desc}
                </p>

                {/* 
                  A tiny visual marker — feels like something a real developer would add
                  to give each card a bit of personality without being flashy.
                */}
                <div className={`absolute bottom-6 right-6 w-8 h-8 rounded-full ${service.bgLight} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 
          A simple footer note — feels like a real business would include this,
          not just a generic "call to action" block.
        */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-400">
            Trusted by pharmacies, clinics, and healthcare professionals across Nepal
          </p>
        </div>
      </div>
    </section>
  );
}