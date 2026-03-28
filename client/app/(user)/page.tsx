import Hero from "@/components/user/Hero";
import Services from "@/components/user/Services";
import FeaturedProducts from "@/components/user/FeaturedProducts";
import Newsletter from "@/components/user/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen space-y-12 pb-20 px-4 md:px-8 lg:px-12">
      <Hero />
      <Services />
      <FeaturedProducts />
      <Newsletter />
    </main>
  );
}
