import Link from "next/link"
import Image from "next/image"
import Container from "@/components/ui/Container"
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight } from "react-icons/fi"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20 pt-20 pb-10 border-t border-gray-800 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-lg group-hover:scale-105 transition-transform duration-300 border border-white/10">
                <Image
                  src="/images/logo.png"
                  alt="R. K. Life Science Logo"
                  width={40} height={40}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors">
                R. K. Life Science
              </span>
            </Link>
            
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Premium wholesale distributor for nutraceutical & non-medicinal products. Empowering health since 2020.
            </p>

            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all duration-300">
                <FiFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all duration-300">
                <FiTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all duration-300">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all duration-300">
                <FiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Useful Links */}
          <div>
            <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Useful Links
            </h3>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms & Conditions', 'FAQs', 'Shipping & Returns'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 font-medium hover:text-emerald-400 flex items-center gap-2 group transition-colors">
                      <FiArrowRight className="w-3 h-3 text-emerald-500/0 group-hover:text-emerald-500 -ml-5 group-hover:ml-0 transition-all duration-300" />
                      {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Navigation */}
          <div>
            <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Products', path: '/product' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Careers', path: '/careers' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 font-medium hover:text-emerald-400 flex items-center gap-2 group transition-colors">
                      <FiArrowRight className="w-3 h-3 text-emerald-500/0 group-hover:text-emerald-500 -ml-5 group-hover:ml-0 transition-all duration-300" />
                      {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Get in Touch
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-gray-400 font-medium">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                    <FiMapPin className="w-5 h-5" />
                </div>
                <span className="mt-2">Shankhamul, Kathmandu,<br/>Nepal, 44600</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 font-medium hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                    <FiPhone className="w-5 h-5" />
                </div>
                <span>+977-9768771762</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400 font-medium hover:text-white transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 text-emerald-400">
                    <FiMail className="w-5 h-5" />
                </div>
                <span>info.rklifescience2080@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm font-medium text-center md:text-left">
            © {currentYear} <strong className="text-gray-300">R. K. Life Science</strong>. All rights reserved. 
          </p>
          
          <div className="flex items-center gap-6 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Accepted Payments</span>
            <div className="flex gap-4 font-black">
              <span className="text-[#60bb46]">eSewa</span>
              <span className="text-[#5c2d91]">Khalti</span>
              <span className="text-gray-300">Fonepay</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}