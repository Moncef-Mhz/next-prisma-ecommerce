import { GetAllCategories } from "@/actions/Category";
import { GetAllProducts } from "@/actions/Product";
import { Gutter } from "@/components/global/Gutter";
import ProductFilterClient from "@/components/ui/ProductFilterClient";

const page = async () => {
  const products = await GetAllProducts();
  const categories = await GetAllCategories();
  return (
    <Gutter className="w-full h-full flex flex-col space-y-10 my-20">
      <div className="flex flex-col items-start gap-4 pb-8 border-b">
        <h1 className="text-6xl font-semibold text-foreground">New Arrivals</h1>
        <p className="text-base font-normal text-foreground/70">
          Checkout out the latest release of Basic Tees, new and improved with
          four openings!
        </p>
      </div>
      {/* Filter Products */}
      <ProductFilterClient categories={categories} initialProducts={products} />
    </Gutter>
  );
};
export default page;
