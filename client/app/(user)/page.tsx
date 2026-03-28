import Container from "@/components/ui/Container"
import Hero from "@/components/user/Hero";
import Services from "@/components/user/Services";
import FeaturedProducts from "@/components/user/FeaturedProducts";
import Newsletter from "@/components/user/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
