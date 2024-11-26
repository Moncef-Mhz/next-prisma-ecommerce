"use client";

import { useCallback, useTransition } from "react";
import ProductCard from "@/components/global/Card";
import { filterProducts } from "@/actions/Product";
import { Product, Category } from "@/types/types";
import FilterForm from "./Filter";

type ProductFilterClientProps = {
  categories: Category[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>; // To allow updates to parent state
};

const ProductFilterClient: React.FC<ProductFilterClientProps> = ({
  categories,
  products,
  setProducts,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = useCallback(
    (selectedCategories: string[]) => {
      startTransition(async () => {
        try {
          const filteredProducts = await filterProducts(selectedCategories);
          setProducts(filteredProducts); // Update the parent's state
        } catch (error) {
          console.error("Filtering failed", error);
        }
      });
    },
    [setProducts]
  );

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Filter Form */}
      <FilterForm categories={categories} onFilterChange={handleFilterChange} />
      {/* Product List */}
      {!products.length ? (
        <h1>No Product found</h1>
      ) : (
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {isPending ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilterClient;
