import Container from "@/components/ui/Container"
import ContactForm from "@/components/user/ContactForm"
import ContactInfo from "@/components/user/ContactInfo"
import { FiMail } from "react-icons/fi"

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* Hero Banner */}
      <div className="bg-gray-900 text-white pt-24 pb-48 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-gray-900 to-gray-900 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <Container className="relative z-10 text-center">
            <div className="w-16 h-16 bg-white/10 text-lightGreen rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/20 shadow-xl">
                <FiMail className="w-8 h-8" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-lightGreen to-secondary">Touch</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
              Whether you have questions about our products, need wholesale pricing, or require support, our dedicated team is here to assist you immediately.
            </p>
        </Container>
      </div>

      <Container className="relative z-20 -mt-24">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 p-6 md:p-10 lg:p-14 overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 relative">
            
            {/* Contact Info Sidebar - Takes 2 cols on lg */}
            <div className="lg:col-span-2 relative">
                <div className="bg-gradient-to-br from-primary to-darkGreen rounded-[2rem] p-8 md:p-10 text-white h-full shadow-lg relative overflow-hidden border border-primary/50">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    
                    <h2 className="text-3xl font-black mb-2 relative z-10">Contact Information</h2>
                    <p className="text-primary-100 mb-10 text-lightGreen font-medium relative z-10">
                        Fill out the form and our team will get back to you within 24 hours.
                    </p>
                    
                    <ContactInfo />
                </div>
            </div>

            {/* Contact Form - Takes 3 cols on lg */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-500 font-medium mb-10">We would love to hear from you. Please fill out your details below.</p>
              <ContactForm />
            </div>

          </div>
        </div>
      </Container>
    </div>
  )
}