"use client";

import { Product } from "@/types/types";
import { Gutter } from "../Gutter";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/context/StateContext";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// ProductDetails.tsx
interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const handleQuantityChange = (value: string) => {
    setSelectedQuantity(Number(value));
  };
  const { AddToCart } = useStateContext();

  const handleAddToCart = () => {
    AddToCart(product, selectedQuantity);
  };
  return (
    <Gutter className="container mx-auto py-10">
      <Card className="flex flex-col lg:flex-row items-start gap-8">
        <div className="flex-1 ">
          <Image
            src={product.image}
            alt={product.name}
            className="rounded-lg h-[700px] shadow-md w-full object-cover"
            width={1000}
            height={1000}
          />
        </div>
        <CardContent className="flex-1  py-10">
          <h1 className="text-2xl border-b pb-4 font-bold capitalize">
            {product.name}
          </h1>
          <div className="space-y-2 border-b py-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-muted-foreground"
            >
              Description:
            </label>
            <p className="text-muted-foreground" id="description">
              {product.description}
            </p>
          </div>
          <div className="">
            <div className=" border-b py-4">
              {product.category && (
                <Badge variant="outline" className="text-sm">
                  Category: {product.category.name}
                </Badge>
              )}
            </div>
            <div className="text-lg font-semibold text-primary border-b py-4">
              Price: ${product.price.toFixed(2)}
            </div>

            <div className="border-b py-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-muted-foreground"
              >
                Select Quantity
              </label>
              <Select onValueChange={handleQuantityChange} defaultValue="1">
                <SelectTrigger id="quantity" className="w-full lg:w-auto">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                    <SelectItem key={qty} value={qty.toString()}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border-b py-4">
            <Button
              variant="default"
              className="w-full lg:w-auto "
              onClick={() => handleAddToCart()}
              disabled={selectedQuantity < 1}
            >
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </Gutter>
  );
};

export default ProductDetails;
