"use client";
import { GetAllCategories } from "@/actions/Category";
import { GetAllProducts } from "@/actions/Product";
import { Gutter } from "@/components/global/Gutter";
import ProductFilterClient from "@/components/ui/ProductFilterClient";
import { Category, Product } from "@/types/types";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const FetchHandler = async () => {
      try {
        const fetchedProducts = await GetAllProducts();
        const fetchedCategories = await GetAllCategories();
        setProducts(fetchedProducts);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    FetchHandler();
  }, []);

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
      <ProductFilterClient
        categories={categories}
        products={products}
        setProducts={setProducts} // Pass the setter to allow filtering
      />
    </Gutter>
  );
};

export default Page;
