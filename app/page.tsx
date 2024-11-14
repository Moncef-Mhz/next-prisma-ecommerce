import Hero from "@/components/global/Hero";
import LatestProducts from "@/components/global/latestProducts";

export default async function Home() {
  return (
    <main className="space-y-10 lg:space-y-20 pb-20">
      <Hero />
      <LatestProducts />
    </main>
  );
}
