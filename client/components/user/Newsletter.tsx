"use client"
import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage("Thanks for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Try again later.");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Decorative element — subtle */}
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

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input 
            required
            placeholder="your@email.com" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 border-gray-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500"
          />
          <Button 
            disabled={status === 'loading'}
            text={status === 'loading' ? "..." : "Subscribe →"} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm hover:shadow disabled:opacity-70"
          />
        </form>

        {message && (
          <p className={`text-sm mt-4 font-medium ${status === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-5">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}