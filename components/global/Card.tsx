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

  console.log(cartItems);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          width={500}
          height={500}
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md"
        />
      </CardContent>
      <CardContent className="space-y-4">
        <p>
          Price:{" "}
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
        </p>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
