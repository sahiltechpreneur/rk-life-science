import Container from "@/components/ui/Container"
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { FiAward, FiHeart, FiTrendingUp, FiArrowRight } from "react-icons/fi"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      
      {/* Hero Section — cleaner, less heavy */}
      <div className="bg-white border-b border-gray-100 pb-16 mb-12">
        <Container className="text-center">
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
        </Container>
      </div>

      <Container>
        
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

        {/* Developer Section — simpler, more focused */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Profile Image */}
            <div className="shrink-0">
              <img 
                src="/images/sahil.jpg" 
                alt="Sahil Gupta" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-100 shadow-sm" 
              />
            </div>

            {/* Content */}
            <div className="text-center md:text-left flex-1">
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-2">
                Lead Developer
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Sahil Gupta
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mb-4">
                Full Stack Developer & IT Student focused on building robust web applications, 
                e-commerce systems, and enterprise solutions that blend clean design with solid performance.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <a 
                  href="https://github.com/sahiltechpreneur" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm rounded-lg transition-colors"
                >
                  <FaGithub className="w-3.5 h-3.5" /> GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/sahiltechpreneur" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm rounded-lg transition-colors"
                >
                  <FaLinkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
                <a 
                  href="https://instagram.com/sahiltechpreneur" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-500 text-sm rounded-lg transition-colors"
                >
                  <FaInstagram className="w-3.5 h-3.5" /> Instagram
                </a>
                <a 
                  href="https://www.facebook.com/rklifescience2080" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/60 hover:bg-blue-100 text-blue-600 text-sm rounded-lg transition-colors"
                >
                  <FaFacebook className="w-3.5 h-3.5" /> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

      </Container>
    </div>
  )
}