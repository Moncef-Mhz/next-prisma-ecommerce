import prisma from "@/lib/db";

import { columns } from "./columns";

import { DataTable } from "@/components/ui/data-table";

const ProductsPage = async () => {
  const products = (
    await prisma.product.findMany({
      include: { category: true },
    })
  ).map((product) => ({
    ...product,
    categoryId: product.categoryId ?? undefined,
    quantity: product.quantity ?? 0,
  }));

  return (
    <div className="container mx-auto py-5">
      <DataTable
        filterText="name"
        columns={columns}
        data={products}
        createButton={true}
        createLink="products/new"
      />
    </div>
  );
};
export default ProductsPage;
