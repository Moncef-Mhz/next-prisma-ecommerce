import { products } from "@/constant";
import { Gutter } from "./Gutter";
import { ArrowRight } from "lucide-react";
import ProductCard from "./Card";
const LatestProducts = () => {
  return (
    <Gutter className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl md:text-3xl font-semibold">Latest Products</h1>
        <p className="text-sm cursor-pointer md:text-base hover:text-blue-300 trans text-blue-400 flex items-center">
          See All
          <ArrowRight size={20} />
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 grid-cols-1 lg:grid-cols-4 w-full">
        {products.map((product) => (
          <ProductCard
            name={product.name}
            category={product.category}
            description={product.description}
            price={product.price}
            image={product.imageUrl}
          />
        ))}
      </div>
    </Gutter>
  );
};
export default LatestProducts;
