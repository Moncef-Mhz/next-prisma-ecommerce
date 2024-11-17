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

  if (isUserAuthenticated && hasPermission?.isGranted) {
    try {
      const { name, description, price, category, image } = formData;

      if (!name || !description || !category || !image || !price) {
        throw new Error("Missing required fields.");
      }

      await prisma.product.create({
        data: {
          name,
          description,
          price,
          category: { connect: { id: category } },
          image,
        },
      });
      return { success: "product has been created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      throw new Error("Failed to create product");
    }
  } else {
    console.log("User is not authenticated or doesn't have permission.");
    throw new Error("User is not authorized");
  }
};

export const DeleteProduct = async (id: string) => {
  const { isAuthenticated, getPermission } = await getKindeServerSession();

  const hasPermission = await getPermission("delete:product");
  const isUserAuthenticated = await isAuthenticated();

  if (hasPermission?.isGranted && isUserAuthenticated) {
    try {
      const deleteproduct = await prisma.product.delete({ where: { id: id } });

      if (!deleteproduct) {
        throw new Error("Product not found");
      }

      return { success: "Product has been deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      throw new Error("Failed to delete product");
    }
  }
};
