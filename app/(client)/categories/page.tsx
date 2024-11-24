import { GetAllProducts } from "@/actions/Product";
import ProductCard from "@/components/global/Card";
import { Gutter } from "@/components/global/Gutter";
import { Checkbox } from "@/components/ui/checkbox";

const Category = [
  {
    id: 1,
    name: "Kitchen",
  },
  {
    id: 2,
    name: "Office",
  },
  {
    id: 3,
    name: "Furniture",
  },
];

const page = async () => {
  const products = await GetAllProducts();
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
      <div className="grid grid-cols-4 gap-4 ">
        {/* filters options */}
        <div className="w-full flex-col flex gap-y-4 items-start py-10 h-full ">
          <h3 className="font-medium text-lg">Category</h3>
          <ul className="flex flex-col gap-y-2">
            <li className="flex items-center space-x-2">
              <Checkbox id="all" />
              <label htmlFor="all" className="text-base font-normal ">
                All Products
              </label>
            </li>
            {Category.map((category) => (
              <li className="flex items-center space-x-2" key={category.id}>
                <Checkbox id={category.name} />
                <label
                  htmlFor={category.name}
                  className="text-base font-normal "
                >
                  {category.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* product list */}
        <div className=" w-full h-full col-span-3">
          <div className="w-full h-full grid grid-cols-3 gap-6">
            {products.map((item) => (
              <ProductCard product={item} />
            ))}
          </div>
        </div>
      </div>
    </Gutter>
  );
};
export default page;
