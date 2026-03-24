import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi"

export default function ContactInfo() {
  return (
    <div className="flex flex-col h-full relative z-10">
      
      <div className="space-y-8 flex-1">
        <div className="flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-lightGreen group-hover:text-darkGreen transition-colors duration-300">
                <FiMapPin className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">Our Location</h4>
                <p className="text-white/80 font-medium leading-relaxed">Shankhamul, Kathmandu<br/>Bagmati, Nepal, 44600</p>
            </div>
        </div>

        <div className="flex items-start gap-4 group cursor-pointer text-white">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-lightGreen group-hover:text-darkGreen transition-colors duration-300">
                <FiPhone className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                <p className="text-white/80 font-medium leading-relaxed group-hover:text-lightGreen transition-colors">+977-9768771762</p>
            </div>
        </div>

        <div className="flex items-start gap-4 group cursor-pointer text-white">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-lightGreen group-hover:text-darkGreen transition-colors duration-300">
                <FiMail className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">Email Address</h4>
                <p className="text-white/80 font-medium leading-relaxed group-hover:text-lightGreen transition-colors">info.rklifescience@gmail.com</p>
            </div>
        </div>

        <div className="flex items-start gap-4 group text-white">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-lightGreen group-hover:text-darkGreen transition-colors duration-300">
                <FiClock className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">Working Hours</h4>
                <p className="text-white/80 font-medium leading-relaxed">Sun to Fri: 10:00 AM - 6:00 PM<br/>Saturday: Closed</p>
            </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/20">
        <h4 className="font-bold mb-4">Connect with us</h4>
        <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-lightGreen hover:text-darkGreen transition-colors hover:scale-110">
                <FiFacebook />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-lightGreen hover:text-darkGreen transition-colors hover:scale-110">
                <FiInstagram />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-lightGreen hover:text-darkGreen transition-colors hover:scale-110">
                <FiTwitter />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-lightGreen hover:text-darkGreen transition-colors hover:scale-110">
                <FiLinkedin />
            </a>
        </div>
      </div>

    </div>
  )
}