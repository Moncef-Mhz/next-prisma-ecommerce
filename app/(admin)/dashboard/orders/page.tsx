import DataTable from "@/components/ui/data-table";
import prisma from "@/lib/db";
import { columns } from "./columns";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
  });
  console.log(orders);
  return (
    <div className="container mx-auto py-5">
      <DataTable
        filterText="id"
        columns={columns}
        data={orders}
        createButton={false}
        createLink=""
      />
    </div>
  );
};
export default OrdersPage;
