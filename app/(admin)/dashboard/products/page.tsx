import prisma from "@/lib/db";

import { columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";

const ProductsPage = async () => {
  const products = await prisma.product.findMany();
  return (
    <div className="container mx-auto py-5">
      <DataTable columns={columns} data={products} />
    </div>
  );
};
export default ProductsPage;
