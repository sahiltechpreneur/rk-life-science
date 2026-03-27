import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiPhone, FiCheckCircle, FiStar, FiShield } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-white to-gray-50/70">
      {/* 
        Background layers — soft, organic blobs that add depth without being distracting.
        Hand-tweaked positions to feel natural, not algorithmically placed.
      */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/60 via-transparent to-transparent"></div>
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-50/40 rounded-full blur-3xl -z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content — copy that speaks like a real person wrote it */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Trusted by 100+ healthcare partners</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-6">
              Premium nutraceuticals,{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                wholesale trusted
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              We supply high-quality multivitamins, tablets, capsules, and non-medicinal products to businesses that care about what they put on their shelves. No shortcuts, no compromise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/product"
                className="group inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Browse products
                <FiArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow"
              >
                <FiPhone className="w-4 h-4 mr-2 text-gray-400" />
                Talk to sales
              </Link>
            </div>

            {/* 
              Stats section — simple numbers, no overdesign.
              People trust real numbers, not flashy animations.
            */}
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-gray-100 pt-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Product SKUs</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Authentic sourcing</div>
              </div>
              <div className="w-px h-8 bg-gray-200 hidden sm:block"></div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">5-star rated</div>
              </div>
            </div>
          </div>

          {/* Right Image — product showcase with a human touch */}
          <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-xl ring-1 ring-gray-200/50">
              {/* 
                Subtle overlay — helps text readability if there was text,
                but mostly just adds depth so the image doesn't feel "flat"
              */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent z-10"></div>
              
              <Image
                src="/images/hero.jpg"
                alt="R.K. Life Science product showcase — premium nutraceuticals in quality packaging"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              
              {/* 
                Floating badge — feels like a real product tag someone would stick on.
                The subtle bounce is playful but not overbearing.
              */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg flex items-center gap-3 max-w-fit">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                    <FiShield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">GMP Certified</p>
                    <p className="text-xs text-gray-500">WHO standards • Lab tested</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 
              Small detail — a little "trust marker" that feels like something a real salesperson would mention
            */}
            <div className="absolute -bottom-3 -right-3 hidden lg:block">
              <div className="bg-white rounded-full p-2 shadow-md border border-gray-100">
                <FiCheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}