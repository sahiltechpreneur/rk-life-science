import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Decorative element — subtle, adds personality without being distracting */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 mb-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Stay in the loop
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Get product updates, special offers, and industry insights — straight to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input 
            placeholder="your@email.com" 
            type="email" 
            className="flex-1 px-5 py-3 border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
          />
          <Button 
            text="Subscribe →" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm hover:shadow"
          />
        </div>

        <p className="text-xs text-gray-400 mt-5">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}