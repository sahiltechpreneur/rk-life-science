import Link from "next/link"
import Image from "next/image"
import Container from "@/components/ui/Container"
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight } from "react-icons/fi"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-20 pt-16 pb-8 border-t border-gray-800 relative overflow-hidden">
      {/* Subtle background glow — adds depth without being distracting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none"></div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Column 1 - Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group inline-flex">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center p-1.5 group-hover:bg-white/20 transition-all duration-300">
                <Image
                  src="/images/logo.png"
                  alt="R. K. Life Science"
                  width={32}
                  height={32}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                R. K. Life Science
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Premium wholesale distributor for nutraceutical and non-medicinal products.
            </p>

            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
                <FiFacebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
                <FiTwitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
                <FiInstagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
                <FiLinkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Useful Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms & Conditions', path: '/terms' },
                { name: 'FAQs', path: '/faq' },
                { name: 'Shipping & Returns', path: '/shipping' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 text-sm hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5">
                    <FiArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Products', path: '/product' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 text-sm hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5">
                    <FiArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FiMapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>Shankhamul, Kathmandu, Nepal 44600</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm hover:text-emerald-400 transition-colors">
                <FiPhone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+9779768771762">+977-9768771762</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm hover:text-emerald-400 transition-colors">
                <FiMail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:info.rklifescience2080@gmail.com">info.rklifescience2080@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left">
            © {currentYear} R. K. Life Science. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">We accept</span>
            <div className="flex gap-2">
              <span className="text-[11px] font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">eSewa</span>
              <span className="text-[11px] font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">Fonepay</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}