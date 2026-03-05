import ProductCard from "./ProductCard"

type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export default function SimilarProducts() {

  // Example similar products, later fetch from API
  const products: Product[] = [
    { id: 2, name: "Multivitamin", image: "/images/multivitamin.jpg", description: "Complete nutrition", price: 1200 },
    { id: 3, name: "Omega 3", image: "/images/omega3.jpg", description: "Heart health", price: 800 },
  ]

  return (
    <section className="py-12 bg-lightGreen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-6">Similar Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
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