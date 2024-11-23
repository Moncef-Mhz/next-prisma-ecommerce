import { GetOrdersByUser } from "@/actions/Order";
import { Gutter } from "@/components/global/Gutter";
import UserOrder from "@/components/global/order/UserOrder";

const OrderPage = async () => {
  try {
    const orders = await GetOrdersByUser();
    return (
      <Gutter>
        <UserOrder orders={orders} />
      </Gutter>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return (
      <Gutter>
        <p>Error loading orders. Please try again later.</p>
      </Gutter>
    );
  }
};
export default OrderPage;
