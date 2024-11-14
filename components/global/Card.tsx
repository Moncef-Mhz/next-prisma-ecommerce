import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type props = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};
const ProductCard = ({ name, description, price, category, image }: props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover rounded-md"
        />
      </CardContent>
      <CardContent className="space-y-4">
        <p>
          Price: <span className="font-bold text-lg">${price.toFixed(2)}</span>
        </p>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
