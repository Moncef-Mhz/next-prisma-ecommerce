import Collections from "@/components/global/Collections";
import Footer from "@/components/global/Footer";
import Hero from "@/components/global/Hero";
import LatestProducts from "@/components/global/latestProducts";

export default function Home() {
  return (
    <main className="space-y-10 lg:space-y-20 pb-20">
      <Hero />
      <LatestProducts />
      <Collections />
      <Footer />
    </main>
  );
}
