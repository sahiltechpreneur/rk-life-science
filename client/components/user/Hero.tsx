import Image from "next/image"
import Link from "next/link"
import { FiArrowRight, FiPhone, FiCheckCircle, FiStar, FiShield } from "react-icons/fi"

export default function Hero() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-gray-50">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-white to-white"></div>
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-bold mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Premium Healthcare Solutions
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
              Next-Generation <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                Nutraceuticals
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
              Wholesale distributor of premium multivitamins, tablets, capsules and non-medicinal products. Empowering your health and business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/product"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-2xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Explore Products
                <FiArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 shadow-sm hover:shadow-md"
              >
                <FiPhone className="w-5 h-5 mr-2 text-gray-400" />
                Contact Sales
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-gray-200 pt-8">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-gray-900">&gt;50</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Products</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-black text-gray-900">100%</span>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Authentic</span>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden sm:block"></div>
              <div className="flex flex-col gap-1 hidden sm:block">
                <div className="flex text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">5.0 Reviews</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:ml-auto w-full max-w-lg xl:max-w-xl">
            <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-gray-100 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10"></div>
              <Image
                src="/images/hero.jpg"
                alt="R.K Life Science Products"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_3s_infinite]">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                    <FiShield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Certified Quality</p>
                    <p className="text-xs text-gray-500 font-medium">GMP & WHO Standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}