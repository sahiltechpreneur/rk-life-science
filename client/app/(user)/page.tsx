import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

export default function Home() {
  return (
    <Container>
      <div className="py-20 text-center">
        <h1 className="text-4xl font-bold text-primary">
          R.K Life Science
        </h1>

        <p className="mt-4 text-gray-600">
          Wholesale distributor of nutraceutical products
        </p>

        <div className="mt-6">
          <Button text="Explore Products" />
        </div>
      </div>
    </Container>
  );
}
