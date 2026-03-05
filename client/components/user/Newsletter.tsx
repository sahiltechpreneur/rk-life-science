import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function Newsletter() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get updates about our products and offers.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Input placeholder="Enter your email" type="email" />
          <Button text="Subscribe" />
        </div>
      </div>
    </section>
  )
}