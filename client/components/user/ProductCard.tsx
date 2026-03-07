import Link from "next/link"
import Button from "@/components/ui/Button"
import Image from "next/image"

type Props = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export default function ProductCard({ id, name, image, description, price }: Props) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <Link href={`/product/${id}`}>
        <Image src={image} alt={name} className="w-full h-48 object-cover rounded cursor-pointer" />
      </Link>
      <Link href={`/product/${id}`}>
        <h3 className="text-lg font-semibold mt-2 cursor-pointer">{name}</h3>
      </Link>
      <p className="text-gray-600 mt-1">{description}</p>
      <p className="text-primary font-bold mt-2">NPR {price}</p>
      <div className="mt-4">
        <Button text="Add to Cart" />
      </div>
    </div>
  )
}