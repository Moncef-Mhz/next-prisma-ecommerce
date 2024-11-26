"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OrderType, Product, OrderStatusEnum, Order } from "@/types/types";

export const CreateOrder = async (
  formData: OrderType,
  totalPrice: number,
  products: Product[]
) => {
  const { isAuthenticated, getUser } = await getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    throw new Error("You need to be authenticated to create an order");
  }

  const User = await getUser();
  if (!User || !User.id) {
    throw new Error("Unable to retrieve user information");
  }

  const { city, street, state, phone, zip } = formData;

  if (!city || !street || !state || !phone || !zip) {
    throw new Error("All fields are required to create an order");
  }

  if (products.length === 0) {
    throw new Error("Order must contain at least one product");
  }

  const DbUser = await prisma.user.findUnique({ where: { kindeId: User.id } });
  if (!DbUser || !DbUser.id) {
    throw new Error("User not found in the database");
  }

  try {
    await prisma.order.create({
      data: {
        user: { connect: { id: DbUser.id } },
        totalPrice,
        street,
        city,
        state,
        phone,
        zip,
        items: {
          create: products.map((product) => ({
            product: { connect: { id: product.id } },
            quantity: product.quantity ?? 1, // Add default value for quantity
            price: product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return { success: "your order has been successfully created", ok: true };
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order. Please try again.");
  }
};

export const UpdateOrderStatus = async (
  status: OrderStatusEnum,
  id: string
) => {
  const { isAuthenticated, getPermission } = await getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    throw new Error("You need to be authenticated to create an order");
  }

  const isPerms = await getPermission("update:product");
  if (!isPerms?.isGranted) {
    throw new Error("You don't have permission to update order status");
  }

  try {
    await prisma.order.update({
      where: { id },
      data: {
        status,
      },
    });
    return { success: "Order status has been updated successfully", ok: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status. Please try again.");
  }
};

export const DeleteOrder = async (id: string) => {
  const { isAuthenticated, getPermission } = await getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    throw new Error("You need to be authenticated to delete an order");
  }

  const isPerms = await getPermission("delete:product");
  if (!isPerms?.isGranted) {
    throw new Error("You don't have permission to delete order");
  }

  if (!id) {
    throw new Error("Order ID cannot be null or undefined");
  }

  try {
    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { orderId: id } }), // Delete related OrderItems
      prisma.order.delete({ where: { id } }), // Delete the Order itself
    ]);
    return { success: "Order has been deleted successfully", ok: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Failed to delete order. Please try again.");
  }
};

export const GetOrdersByUser = async (): Promise<Order[]> => {
  const { isAuthenticated, getUser } = await getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    throw new Error("You need to be authenticated to get orders");
  }

  const user = await getUser();
  if (!user) {
    throw new Error("Unable to retrieve user information");
  }

  try {
    const orders = await prisma.order.findMany({
      where: { user: { kindeId: user.id } },
      include: {
        items: {
          include: {
            product: { include: { category: true } },
          },
        },
        user: true,
      },
    });

    return orders as Order[]; // Explicitly cast to Order[]
  } catch (error) {
    console.error("Error fetching your orders:", error);
    throw new Error("Failed to fetch orders");
  }
};

export const GetAllOrders = async (): Promise<Order[]> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: { include: { category: true } },
          },
        },
        user: true,
      },
    });
    return orders as Order[]; // Explicitly cast to Order[]
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw new Error("Failed to fetch all orders");
  }
};
