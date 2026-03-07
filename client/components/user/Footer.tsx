import Link from "next/link"
import Image from "next/image"
import Container from "@/components/ui/Container"
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 mt-20 border-t border-gray-200">
      <Container>
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 py-12">
          {/* Column 1 - Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-primary group-hover:border-secondary transition-colors">
                <Image
                  src="/images/logo.png"
                  alt="R. K. Life Science Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                R. K. Life Science
              </span>
            </Link>
            
            <p className="text-gray-600 mt-3 leading-relaxed">
              Wholesale distributor for nutraceutical products including
              multivitamins, capsules, tablets and non medicinal products.
              Committed to quality healthcare solutions since 2020.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Useful Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 relative inline-block">
              Useful Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>

            <div className="flex flex-col gap-3">
              <Link 
                href="/privacy-policy" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-conditions" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Terms & Conditions
              </Link>
              <Link 
                href="/faqs" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                FAQs
              </Link>
              <Link 
                href="/shipping-returns" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Shipping & Returns
              </Link>
              <Link 
                href="/rules" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Rules & Regulations
              </Link>
            </div>
          </div>

          {/* Column 3 - Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>

            <div className="flex flex-col gap-3">
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                About Us
              </Link>
              <Link 
                href="/product" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Our Products
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Contact Us
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Blog
              </Link>
              <Link 
                href="/careers" 
                className="text-gray-600 hover:text-primary hover:translate-x-1 transition-all duration-300"
              >
                Careers
              </Link>
            </div>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-gray-800 relative inline-block">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <p>Shankhamul, Kathmandu, Nepal, 44600</p>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FaPhone className="text-primary flex-shrink-0" />
                <p>+977-9768771762</p>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <p>info.rklifescience2080@gmail.com</p>
              </div>

              {/* Business Hours */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Business Hours</h4>
                <p className="text-gray-600 text-sm">Sunday - Friday: 10:00 AM - 6:00 PM</p>
                <p className="text-gray-600 text-sm">Saturday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} R. K. Life Science. All rights reserved. 
              <span className="block md:inline md:ml-1">
                Designed and developed by Sahil Gupta
              </span>
            </p>
            
            {/* Payment Methods */}
            <div className="flex gap-3 text-gray-400">
              <span className="text-sm">Payment Methods:</span>
              <span className="hover:text-primary transition-colors cursor-default">eSewa</span>
              <span className="hover:text-primary transition-colors cursor-default">Khalti</span>
              <span className="hover:text-primary transition-colors cursor-default">Fonepay</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}