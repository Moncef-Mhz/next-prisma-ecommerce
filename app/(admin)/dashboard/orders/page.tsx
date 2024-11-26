import DataTable from "@/components/ui/data-table";
import { columns } from "./columns";
import { GetAllOrders } from "@/actions/Order";

const OrdersPage = async () => {
  const orders = await GetAllOrders();
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
