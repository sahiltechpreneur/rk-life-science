import Image from "next/image"
import Button from "@/components/ui/Button"
import { FaArrowRight, FaPhone } from "react-icons/fa"

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-lightGreen to-green-50 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-darkGreen leading-tight">
              Welcome to{' '}
              <span className="block text-primary mt-2">
                R.K Life Science
              </span>
            </h1>

            <p className="mt-6 text-gray-700 text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
              Wholesale distributor of multivitamins, tablets, capsules and non-medicinal products. 
              Quality healthcare solutions for your business needs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                text="Explore Products" 
                href="/product"
                icon={<FaArrowRight />}
                iconPosition="right"
                size="lg"
              />
              <Button 
                text="Contact Us" 
                href="/contact"
                variant="outline"
                icon={<FaPhone />}
                iconPosition="left"
                size="lg"
              />
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-8 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600">100% Authentic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-gray-600">VAT/PAN Nepal Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden md:block">
            <div className="relative w-full h-[500px]">
              {/* Main Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl">
                <Image
                  src="/images/hero.jpg"
                  alt="R.K Life Science Products - Multivitamins, Tablets, and Capsules"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-6 top-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">50+</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Products</p>
                    <p className="text-xs text-gray-600">Available</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -right-6 bottom-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg animate-float animation-delay-2000">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <span className="text-secondary font-bold">3+</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Years</p>
                    <p className="text-xs text-gray-600">Experience</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -z-10 -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="md:hidden relative h-[300px] w-full mt-8">
            <Image
              src="/images/hero.jpg"
              alt="R.K Life Science Products"
              fill
              className="object-cover rounded-2xl shadow-lg"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}