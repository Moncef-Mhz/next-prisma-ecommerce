"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const CreateProduct = async (formData: {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}) => {
  const { isAuthenticated, getPermission } = await getKindeServerSession();

  const hasPermission = await getPermission("create:product");
  const isUserAuthenticated = await isAuthenticated();

  // const { name, description, price, category, image } = formData;

  if (isUserAuthenticated && hasPermission?.isGranted) {
    try {
      // Ensure you're handling the incoming formData properly
      const { name, description, price, category, image } = formData;

      // Ensure that the price is parsed correctly and not null
      if (!name || !description || !category || !image || !price) {
        throw new Error("Missing required fields.");
      }

      await prisma.product
        .create({
          data: {
            name,
            description,
            price,
            category,
            image,
          },
        })
        .catch((err) => console.error("prisma error: ", err));
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  } else {
    console.log("User is not authenticated or doesn't have permission.");
    throw new Error("User is not authorized");
  }
};
