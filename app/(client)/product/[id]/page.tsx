import { GetOneProduct } from "@/actions/Product";
import ProductDetails from "@/components/global/product/ProductDetails";

type Params = Promise<{ id: string }>;

const ProductDetailsPage = async ({ params }: { params: Params }) => {
  const { id } = await params;
  if (!id) {
    throw new Error("Missing product ID");
  }
  const product = await GetOneProduct(id);
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
