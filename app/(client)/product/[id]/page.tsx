import { GetOneProduct } from "@/actions/Product";
import ProductDetails from "@/components/global/product/ProductDetails";

interface Params {
  id: string;
}

const ProductDetailsPage = async ({ params }: { params: Params }) => {
  const product = await GetOneProduct(params.id);
  return <ProductDetails product={product} />;
};
export default ProductDetailsPage;
