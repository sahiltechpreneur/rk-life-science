import Button from "@/components/ui/Button"

export default function Hero() {
  return (
    <section className="bg-lightGreen py-20">
      <div className="max-w-7xl mx-auto text-center px-4">

        <h1 className="text-5xl font-bold text-darkGreen">
          Welcome to R.K Life Science
        </h1>

        <p className="mt-4 text-gray-700 text-lg">
          Wholesale distributor of multivitamins, tablets, capsules and non-medicinal products.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button text="Explore Products" />
          <Button text="Contact Us" />
        </div>

      </div>
    </section>
  )
}