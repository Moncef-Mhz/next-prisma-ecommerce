"use client";
import { useEffect, useState } from "react";
import { GetOrdersByUser } from "@/actions/Order";
import { Gutter } from "@/components/global/Gutter";
import UserOrder from "@/components/global/order/UserOrder";
import { Order } from "@/types/types";

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await GetOrdersByUser();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(true);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Gutter>
      {error ? (
        <p>Error loading orders. Please try again later.</p>
      ) : (
        <UserOrder orders={orders} />
      )}
    </Gutter>
  );
};

export default OrderPage;
