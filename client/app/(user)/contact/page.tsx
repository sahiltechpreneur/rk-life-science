import Container from "@/components/ui/Container"
import ContactForm from "@/components/user/ContactForm"
import ContactInfo from "@/components/user/ContactInfo"
import { FiMail, FiMessageSquare } from "react-icons/fi"

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      
      {/* Hero Section — cleaner, less heavy */}
      <div className="bg-white border-b border-gray-100 pb-12 mb-12">
        <Container className="text-center">
          <span className="inline-block text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full mb-5">
            Get in touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Let's talk
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Questions about our products? Need wholesale pricing? Our team is here to help.
          </p>
        </Container>
      </div>

      <Container>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            
            {/* Contact Info Sidebar */}
            <div className="lg:col-span-2 bg-emerald-600 p-8 md:p-10">
              <div className="flex flex-col">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <FiMessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Contact info</h2>
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Fill out the form and we'll get back to you within 24 hours.
                  </p>
                </div>
                
                <ContactInfo />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 p-8 md:p-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Send us a message</h2>
              <p className="text-gray-500 text-sm mb-8">We'd love to hear from you.</p>
              <ContactForm />
            </div>

          </div>
        </div>
      </Container>
    </div>
  )
}