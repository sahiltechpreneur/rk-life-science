import Container from "@/components/ui/Container"
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { FiAward, FiHeart, FiTrendingUp } from "react-icons/fi"

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="bg-gray-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-gray-900 to-gray-900 pointer-events-none"></div>
        <Container className="relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightGreen to-secondary">Story</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              R.K Life Science is a premium wholesale distributor of nutraceutical products, multivitamins, and medical essentials. We are on a mission to empower health with steadfast quality, blazing fast delivery, and unwavering trust.
            </p>
        </Container>
      </div>

      <Container className="-mt-16 relative z-20">
        
        {/* Core Values Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-lightGreen text-darkGreen rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-secondary/30">
                    <FiAward className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Authentic Quality</h3>
                <p className="text-gray-500 font-medium">We partner strictly with certified manufacturers to ensure every product meets global quality standards.</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                    <FiTrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Supply</h3>
                <p className="text-gray-500 font-medium">Our robust distribution network ensures that your pharmacy or clinic never runs out of critical inventory.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-rose-100">
                    <FiHeart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Customer First</h3>
                <p className="text-gray-500 font-medium">We strive for lasting relationships built on mutual trust, transparency, and top-tier customer support.</p>
            </div>
        </div>

        {/* Developer Section */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 md:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-lightGreen to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                
                {/* Designer/Dev Image */}
                <div className="relative group shrink-0">
                    <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-[2rem] -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
                    <img 
                        src="/images/sahil.jpg" 
                        alt="Sahil Gupta" 
                        className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-[2rem] border-4 border-white shadow-2xl z-10 block" 
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute -bottom-6 -left-6 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-gray-800">
                        <span className="w-2 h-2 rounded-full bg-lightGreen animate-pulse"></span>
                        <span className="font-bold text-sm">Lead Developer</span>
                    </div>
                </div>

                {/* Dev Content */}
                <div className="text-center lg:text-left">
                    <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-2">Meet the Creator</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Sahil Gupta</h3>
                    
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mb-8 font-medium">
                        A passionate Full Stack Developer & IT Student dedicated to engineering robust web applications, modern e-commerce systems, and dynamic enterprise solutions that merge striking aesthetics with flawless performance.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <a href="https://github.com/sahiltechpreneur" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-xl font-bold transition-all border border-gray-200 shadow-sm hover:-translate-y-1">
                            <FaGithub className="text-xl" /> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/sahiltechpreneur" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-6 py-3 rounded-xl font-bold transition-all border border-blue-100 shadow-sm hover:-translate-y-1">
                            <FaLinkedin className="text-xl" /> LinkedIn
                        </a>
                        <a href="https://instagram.com/sahiltechpreneur" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-6 py-3 rounded-xl font-bold transition-all border border-rose-100 shadow-sm hover:-translate-y-1">
                            <FaInstagram className="text-xl" /> Instagram
                        </a>
                        <a href="https://www.facebook.com/rklifescience2080" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] px-6 py-3 rounded-xl font-bold transition-all border border-[#1877F2]/20 shadow-sm hover:-translate-y-1">
                            <FaFacebook className="text-xl" /> Facebook
                        </a>
                    </div>
                </div>
            </div>
        </div>

      </Container>
    </div>
  )
}