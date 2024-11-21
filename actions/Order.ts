"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  categoryId?: string;
  description: string;
  quantity: number; // Ensure this is always defined
}

type OrderType = {
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

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
            quantity: product.quantity,
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
