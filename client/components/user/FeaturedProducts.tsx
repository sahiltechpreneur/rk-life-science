import ProductCard from "./ProductCard"

export default function FeaturedProducts() {

  const products = [
    { name: "Vitamin C", image: "/images/vitamin-c.jpg", description: "Boost immunity", price: 500 },
    { name: "Multivitamin", image: "/images/multivitamin.jpg", description: "Complete nutrition", price: 1200 },
    { name: "Omega 3", image: "/images/omega3.jpg", description: "Heart health", price: 800 },
  ]

  return (
    <section className="py-20 bg-lightGreen">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-primary mb-8">Featured Products</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard 
              key={p.name}
              name={p.name}
              image={p.image}
              description={p.description}
              price={p.price}
            />
          ))}
        </div>
      </div>
    </section>
  )
}