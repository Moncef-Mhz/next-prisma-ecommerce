"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const CreateCategory = async (formData: { name: string }) => {
  const { isAuthenticated, getPermission } = await getKindeServerSession();

  const hasPermission = await getPermission("create:product");
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated && hasPermission?.isGranted) {
    try {
      const { name } = formData;

      if (!name) {
        throw new Error("Missing required fields.");
      }
      await prisma.category.create({ data: { name } });
      return { success: "Category has been created successfully" };
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error("Failed to create category");
    }
  }
};
export const GetAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
export const UpdateCategory = async (
  formData: { name: string },
  id: string
) => {
  const { isAuthenticated, getPermission } = await getKindeServerSession();

  const hasPermission = await getPermission("update:product");
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated && hasPermission?.isGranted && !id) {
    try {
      const { name } = formData;
      if (!name) {
        throw new Error("Missing required fields.");
      }

      await prisma.category.update({ where: { id: id }, data: { name } });
      return { success: "Category has been updated successfully" };
    } catch (error) {
      console.error("Error updated category:", error);
      throw new Error("Failed to updated category");
    }
  }
};

export const DeleteCategory = async (id: string) => {
  const { isAuthenticated, getPermission } = await getKindeServerSession();
  const hasPermission = await getPermission("delete:product");
  const isUserAuthenticated = await isAuthenticated();
  if (isUserAuthenticated && hasPermission?.isGranted) {
    try {
      await prisma.category.delete({ where: { id } });
      return { success: "Category have been deleted successfully" };
    } catch (error) {
      console.error("Error deleting categories:", error);
      throw new Error("Failed to delete categories");
    }
  }
};
