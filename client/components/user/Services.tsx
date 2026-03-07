import { FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa"

export default function Services() {
  const services = [
    { 
      title: "Fast Delivery", 
      desc: "Quick delivery across Nepal",
      icon: <FaTruck className="text-4xl text-primary" />
    },
    { 
      title: "Quality Products", 
      desc: "100% genuine nutraceuticals",
      icon: <FaShieldAlt className="text-4xl text-primary" />
    },
    { 
      title: "Best Support", 
      desc: "Customer-friendly support",
      icon: <FaHeadset className="text-4xl text-primary" />
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 relative inline-block">
          Our Services
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-secondary rounded-full"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.title} 
              className="group p-8 border-2 border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 bg-white"
            >
              <div className="flex flex-col items-center">
                {/* Icon Container */}
                <div className="mb-4 p-4 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                  <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-darkGreen mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {service.desc}
                </p>

                {/* Decorative Line */}
                <div className="mt-4 w-12 h-0.5 bg-primary/30 rounded-full group-hover:w-16 group-hover:bg-primary transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}