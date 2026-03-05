export default function Services() {
  const services = [
    { title: "Fast Delivery", desc: "Quick delivery across Nepal" },
    { title: "Quality Products", desc: "100% genuine nutraceuticals" },
    { title: "Best Support", desc: "Customer-friendly support" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="p-6 border rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-darkGreen">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}