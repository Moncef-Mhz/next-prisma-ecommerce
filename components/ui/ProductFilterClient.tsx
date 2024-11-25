"use client";

import { useCallback, useState, useTransition } from "react";
import ProductCard from "@/components/global/Card";
import { filterProducts } from "@/actions/Product";
import { Product, Category } from "@/types/types";
import FilterForm from "./Filter";

type ProductFilterClientProps = {
  categories: Category[];
  initialProducts: Product[];
};

const ProductFilterClient: React.FC<ProductFilterClientProps> = ({
  categories,
  initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = useCallback((selectedCategories: string[]) => {
    startTransition(async () => {
      try {
        const filteredProducts = await filterProducts(selectedCategories);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Filtering failed", error);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Filter Form */}
      <FilterForm categories={categories} onFilterChange={handleFilterChange} />
      {/* Product List */}
      <div className="col-span-3 grid grid-cols-3 gap-6">
        {isPending ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductFilterClient;
