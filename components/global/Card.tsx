"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  image: string;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { AddToCart, clearCart, cartItems } = useStateContext();

  const handleAddToCart = () => {
    AddToCart(product);
  };

  return (
    <div key={product.id} className="group relative">
      <Image
        width={600}
        height={600}
        alt={product.name}
        src={product.image}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-base text-gray-700">
            <Link href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        </div>
        <p className="text-base font-medium text-gray-900">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
