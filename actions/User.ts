import prisma from "@/lib/db";

export const GetAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw new Error("Failed to fetch users");
  }
};
