import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiTwitter, FiLinkedin } from "react-icons/fi"

export default function ContactInfo() {
  return (
    <div className="flex flex-col h-full">
      
      <div className="space-y-6 flex-1">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <FiMapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white mb-1">Location</h4>
            <p className="text-white/70 text-sm leading-relaxed">Shankhamul, Kathmandu, Nepal 44600</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <FiPhone className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white mb-1">Phone</h4>
            <a href="tel:+9779768771762" className="text-white/70 text-sm hover:text-white transition-colors">
              +977-9768771762
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <FiMail className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white mb-1">Email</h4>
            <a href="mailto:info.rklifescience@gmail.com" className="text-white/70 text-sm hover:text-white transition-colors">
              info.rklifescience@gmail.com
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <FiClock className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-white mb-1">Hours</h4>
            <p className="text-white/70 text-sm leading-relaxed">Sun–Fri: 10am–6pm<br />Saturday: Closed</p>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/20">
        <h4 className="font-semibold text-sm text-white mb-3">Follow us</h4>
        <div className="flex items-center gap-2">
          <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors">
            <FiFacebook className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors">
            <FiInstagram className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors">
            <FiTwitter className="w-3.5 h-3.5" />
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors">
            <FiLinkedin className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

    </div>
  )
}