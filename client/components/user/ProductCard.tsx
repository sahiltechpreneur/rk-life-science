import Button from "@/components/ui/Button"

type Props = {
  name: string
  image: string
  description: string
  price: number
}

export default function ProductCard({ name, image, description, price }: Props) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
      <p className="text-primary font-bold mt-2">Rs. {price}</p>
      <div className="mt-4">
        <Button text="Add to Cart" />
      </div>
    </div>
  )
}